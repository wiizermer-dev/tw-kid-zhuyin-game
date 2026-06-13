/** 錯率校正啟動器 — App 啟動時抓一次難度覆蓋，cache 一天。
 * 無雲端或 fetch 失敗時退回題庫原難度（或沿用過期 cache）。 */
import { fetchDifficultyOverrides } from './backend.js';
import { setDifficultyOverrides } from '../core/bank.js';

const KEY = 'bpmf_diff_overrides';
const TTL_MS = 24 * 60 * 60 * 1000;

export async function initCalibration() {
  let cached = null;
  try {
    cached = JSON.parse(localStorage.getItem(KEY));
  } catch { /* 壞 cache 當沒有 */ }

  if (cached?.map && Date.now() - cached.at < TTL_MS) {
    setDifficultyOverrides(cached.map);
    return;
  }

  const map = await fetchDifficultyOverrides();
  if (map) {
    setDifficultyOverrides(map);
    localStorage.setItem(KEY, JSON.stringify({ at: Date.now(), map }));
  } else if (cached?.map) {
    setDifficultyOverrides(cached.map); // fetch 失敗沿用過期 cache，總比沒有準
  }
}
