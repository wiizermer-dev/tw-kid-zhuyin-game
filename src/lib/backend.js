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

/**
 * 上傳一筆成績。走 submit_run RPC（SECURITY DEFINER），server 端做合理性驗算 +
 * 頻率限制後才寫入；前端不再直接 insert runs（insert policy 已收緊為 false）。
 * schema/RPC 見 supabase-setup-v5-submit-run-rpc.sql。
 */
export async function submitRun({ name, score, mode, room = null, correct = 0, total = 0, maxCombo = 0 }) {
  if (!supabase) return false;
  try {
    const { error } = await supabase.rpc('submit_run', {
      p_browser_id: browserId(),
      p_name: name,
      p_score: score,
      p_mode: mode,
      p_room: room,
      p_correct: correct,
      p_total: total,
      p_max_combo: maxCombo
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

/** 台灣時區（UTC+8）日期字串 YYYY-MM-DD，霸榜以「日」為單位 */
function twDateKey(iso) {
  const t = new Date(iso).getTime() + 8 * 60 * 60 * 1000;
  return new Date(t).toISOString().slice(0, 10);
}

/**
 * 榜首連霸：每日「截至當日為止 all-time 累積最高分」最高者為當日王座持有者，連續霸佔即連霸。
 * 純前端用 runs 既有資料推算（不動 DB schema），跨裝置一致性靠每次重抓重算。
 *
 * 王座口徑刻意與 fetchBoard 一致（all-time 最高分），故 current 榜首必然 = 分數榜第一名，
 * 不會出現「橫幅說你登頂但榜上有人更高」的矛盾。
 * （舊版用「當日單日最高分」當榜首，與 all-time 排序的分數榜口徑不符，已修正。）
 *
 * @returns {Promise<{ current: { browserId, name, days, since }|null, longest: { name, days } }|null>}
 *   current 為「目前連霸中」的王座持有者（最近一日往前連續同人的天數）；longest 為歷代最長連霸。
 */
export async function fetchReignStreak(mode, { room = null, lookbackDays = 120 } = {}) {
  if (!supabase) return null;
  try {
    const since = new Date(Date.now() - lookbackDays * 24 * 60 * 60 * 1000).toISOString();
    let q = supabase.from('runs').select('browser_id, name, score, created_at')
      .eq('mode', mode)
      .gte('created_at', since)
      .order('created_at', { ascending: true });
    if (room) q = q.eq('room', room);
    const { data, error } = await q;
    if (error) {
      console.error('fetchReignStreak:', error);
      return null;
    }
    if (!data?.length) return { current: null, longest: { name: '', days: 0 } };

    // 當日王座 = 截至當日為止「各人 all-time 最高分」中分數最高者。
    // 逐筆按時間累積各人歷史最高分，每天結束時取榜首快照，得出該日王座持有者。
    // 同分時王座留給先達到該分數者（先達成者保有寶座，後來者追平不奪位）。
    const champByDay = new Map(); // dateKey -> { browser_id, name, score }
    const bestById = new Map();   // browser_id -> { name, score, since }（all-time 累積最高分）
    let curDay = null;
    const snapshotChamp = (day) => {
      let top = null;
      for (const [id, b] of bestById) {
        if (!top || b.score > top.score || (b.score === top.score && b.since < top.since)) {
          top = { browser_id: id, name: b.name, score: b.score, since: b.since };
        }
      }
      if (top) champByDay.set(day, { browser_id: top.browser_id, name: top.name, score: top.score });
    };
    for (const r of data) {
      const day = twDateKey(r.created_at);
      if (curDay !== null && day !== curDay) snapshotChamp(curDay);
      curDay = day;
      const id = r.browser_id ?? r.name;
      const prev = bestById.get(id);
      if (!prev || r.score > prev.score) {
        // since 記「達到此最高分的時間」，供同分王座爭奪時讓先達成者保有寶座
        bestById.set(id, { name: r.name, score: r.score, since: r.created_at });
      }
    }
    if (curDay !== null) snapshotChamp(curDay);

    // 依日期排序後掃連續同人段落
    const days = [...champByDay.keys()].sort();
    let longest = { name: '', days: 0 };
    let runId = null, runName = '', runLen = 0, runStart = null;
    const flushLongest = () => {
      if (runLen > longest.days) longest = { name: runName, days: runLen };
    };
    for (const day of days) {
      const champ = champByDay.get(day);
      if (champ.browser_id === runId) {
        runLen += 1;
      } else {
        flushLongest();
        runId = champ.browser_id;
        runName = champ.name;
        runLen = 1;
        runStart = day;
      }
    }
    flushLongest();

    // current = 最後一段（含最近一日）
    const current = runLen > 0
      ? { browserId: runId, name: runName, days: runLen, since: runStart }
      : null;
    return { current, longest };
  } catch (e) {
    console.error('fetchReignStreak:', e);
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
