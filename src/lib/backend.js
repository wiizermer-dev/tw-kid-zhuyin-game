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

/** 取排行榜（依模式，可選房間）。同一玩家只留最高分那筆，避免一人洗版 */
export async function fetchBoard(mode, { room = null, limit = 20 } = {}) {
  if (!supabase) return null;
  try {
    let q = supabase.from('runs').select('browser_id, name, score, correct, total, max_combo, created_at')
      .eq('mode', mode)
      .order('score', { ascending: false })
      .limit(limit * 5);   // 多抓再去重，去重後仍湊得滿一頁
    if (room) q = q.eq('room', room);
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
