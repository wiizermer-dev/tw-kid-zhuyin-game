/** 雲端排行榜（可選）— 沒設定 Supabase 時自動退化為純本地 */
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;
export const hasCloud = !!supabase;

export function browserId() {
  let id = localStorage.getItem('bpmf_browser_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('bpmf_browser_id', id);
  }
  return id;
}

/** 上傳一筆成績（runs 資料表，schema 見 supabase-setup-v2.sql） */
export async function submitRun({ name, score, mode, room = null, correct = 0, total = 0, maxCombo = 0 }) {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('runs').insert({
      browser_id: browserId(), name, score, mode, room, correct, total, max_combo: maxCombo
    });
    if (error) console.error('submitRun:', error);
    return !error;
  } catch (e) {
    console.error('submitRun:', e);
    return false;
  }
}

/** 取排行榜（依模式，可選房間/起始時間）。同一玩家只留最高分那筆，避免一人洗版 */
export async function fetchBoard(mode, { room = null, limit = 20, since = null } = {}) {
  if (!supabase) return null;
  try {
    let q = supabase.from('runs').select('browser_id, name, score, correct, total, max_combo, created_at')
      .eq('mode', mode)
      .order('score', { ascending: false })
      .limit(limit * 5);   // 多抓再去重，去重後仍湊得滿一頁
    if (room) q = q.eq('room', room);
    if (since) q = q.gte('created_at', since);
    const { data, error } = await q;
    if (error) {
      console.error('fetchBoard:', error);
      return null;
    }
    const seen = new Set();
    return data.filter((r) => {
      const key = r.browser_id ?? r.name;
      if (seen.has(key)) return false;   // 已按分數排序，首見即該玩家最高分
      seen.add(key);
      return true;
    }).slice(0, limit);
  } catch (e) {
    console.error('fetchBoard:', e);
    return null;
  }
}

/**
 * 分數百分位（同模式，去重 browser_id 各取最高分）。分享卡「打敗 XX%」用。
 * @returns {Promise<{ beatPct: number, rank: number, sample: number }|null>}
 */
export async function fetchPercentile(mode, score) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from('runs')
      .select('browser_id, score')
      .eq('mode', mode)
      .order('score', { ascending: false })
      .limit(1000);
    if (error || !data?.length) {
      if (error) console.error('fetchPercentile:', error);
      return null;
    }
    const seen = new Set();
    const scores = [];
    for (const r of data) {
      const key = r.browser_id ?? r.name;
      if (seen.has(key)) continue;   // 已按分數排序，首見即該玩家最高分
      seen.add(key);
      scores.push(r.score);
    }
    const sample = scores.length;
    const below = scores.filter((s) => s < score).length;
    const rank = scores.filter((s) => s > score).length + 1;
    return { beatPct: Math.round((below / sample) * 100), rank, sample };
  } catch (e) {
    console.error('fetchPercentile:', e);
    return null;
  }
}

/**
 * 累計一場對局的逐題作答結果到 question_stats（全體常錯榜資料來源）。
 * 走 record_question_attempt RPC（SECURITY DEFINER），前端不直接寫表。
 * @param {Array<{ question, isCorrect: boolean }>} attempts
 *   question 為 BANK 題目物件（需 id/text/target/zhuyin）
 */
export async function recordQuestionAttempts(attempts = []) {
  if (!supabase || !attempts.length) return false;
  try {
    // 逐題並發送出；單場最多 15 題，量小可接受。任一失敗不影響其餘
    await Promise.all(
      attempts.map(({ question: q, isCorrect }) =>
        supabase.rpc('record_question_attempt', {
          p_question_id: q.id,
          p_word: q.text,
          p_target_char: q.target ?? null,
          p_correct_answer: q.zhuyin,
          p_is_correct: !!isCorrect
        })
      )
    );
    return true;
  } catch (e) {
    console.error('recordQuestionAttempts:', e);
    return false;
  }
}

/**
 * 上傳一筆審題結論到 question_reviews（審題模式用，schema 見 supabase-setup-v4）。
 * 走 record_question_review RPC（SECURITY DEFINER），同人同題 upsert 成最新結論。
 * @param {{ question, verdict: string, name?: string, note?: string }} opts question 為 BANK 題目物件
 * @returns {Promise<boolean>} 是否成功（呼叫端據此標 synced，失敗下次補送）
 */
export async function submitQuestionReview({ question, verdict, name = '', note = '' }) {
  if (!supabase) return false;
  try {
    const { error } = await supabase.rpc('record_question_review', {
      p_browser_id: browserId(),
      p_reviewer_name: name,
      p_question_id: question.id,
      p_word: question.text,
      p_correct_answer: question.zhuyin,
      p_difficulty: question.difficulty ?? null,
      p_verdict: verdict,
      p_note: note || null
    });
    if (error) console.error('submitQuestionReview:', error);
    return !error;
  } catch (e) {
    console.error('submitQuestionReview:', e);
    return false;
  }
}

/**
 * 錯率校正：依全體答題統計建議每題難度。樣本不足的題不覆蓋。
 * 映射：錯率 <15%→1、15-35%→2、35-55%→3、55-75%→4、>75%→5
 * @returns {Promise<Object<string, number>|null>} { question_id: difficulty }
 */
export async function fetchDifficultyOverrides({ minAttempts = 30 } = {}) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('question_stats')
      .select('question_id, total_attempts, wrong_attempts')
      .gte('total_attempts', minAttempts);
    if (error) {
      console.error('fetchDifficultyOverrides:', error);
      return null;
    }
    const map = {};
    for (const r of data ?? []) {
      const rate = r.wrong_attempts / r.total_attempts;
      map[r.question_id] = rate < 0.15 ? 1 : rate < 0.35 ? 2 : rate < 0.55 ? 3 : rate < 0.75 ? 4 : 5;
    }
    return map;
  } catch (e) {
    console.error('fetchDifficultyOverrides:', e);
    return null;
  }
}

/**
 * 取全體最常錯題目榜。依錯誤率排序，需達最低樣本數才上榜（避免一兩次就洗榜）。
 * @returns {Array<{ question_id, word, target_char, correct_answer, total_attempts, wrong_attempts, wrongRate }>|null}
 */
export async function fetchWrongBoard({ limit = 20, minAttempts = 5 } = {}) {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('question_stats')
      .select('question_id, word, target_char, correct_answer, total_attempts, wrong_attempts')
      .gte('total_attempts', minAttempts)
      .order('wrong_attempts', { ascending: false })
      .limit(limit * 3); // 多抓再依錯誤率重排
    if (error) {
      console.error('fetchWrongBoard:', error);
      return null;
    }
    return (data ?? [])
      .map((r) => ({ ...r, wrongRate: r.total_attempts ? r.wrong_attempts / r.total_attempts : 0 }))
      .sort((a, b) => b.wrongRate - a.wrongRate || b.wrong_attempts - a.wrong_attempts)
      .slice(0, limit);
  } catch (e) {
    console.error('fetchWrongBoard:', e);
    return null;
  }
}
