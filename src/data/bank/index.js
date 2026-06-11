/**
 * 題庫總索引 — 單一扁平陣列，玩法無關。
 * 所有玩法透過 src/core/bank.js 的選題器取題。
 */
import tricky from './tricky.js';
import polyphone from './polyphone.js';
import rare from './rare.js';
import idiom from './idiom.js';
import modern from './modern.js';

export const CATEGORIES = {
  tricky: { label: '易讀錯', icon: 'ㄘ', items: tricky },
  polyphone: { label: '破音字', icon: 'ㄆ', items: polyphone },
  rare: { label: '生僻字', icon: 'ㄕ', items: rare },
  idiom: { label: '成語', icon: 'ㄔ', items: idiom },
  modern: { label: '現代梗', icon: 'ㄇ', items: modern }
};

export const BANK = Object.entries(CATEGORIES).flatMap(([key, cat]) =>
  cat.items.map(item => ({ ...item, category: key }))
);

export function bankStats() {
  const byCategory = Object.fromEntries(
    Object.entries(CATEGORIES).map(([k, c]) => [k, c.items.length])
  );
  const byDifficulty = {};
  for (const q of BANK) byDifficulty[q.difficulty] = (byDifficulty[q.difficulty] || 0) + 1;
  return { total: BANK.length, byCategory, byDifficulty };
}
