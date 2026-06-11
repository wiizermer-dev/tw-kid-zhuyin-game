/** 選題器 — 所有玩法唯一的取題入口 */
import { BANK } from '../data/bank/index.js';
import { mulberry32, shuffleWith } from './rng.js';

/**
 * 依條件選題並組成可直接渲染的題目物件。
 * @param {Object} opts
 * @param {number} opts.count 題數
 * @param {string|number} [opts.seed] 種子；不給則隨機
 * @param {number} [opts.minDifficulty=1]
 * @param {number} [opts.maxDifficulty=5]
 * @param {string[]} [opts.categories] 限定類別（bank index 的 key）
 * @param {string[]} [opts.excludeIds] 排除的題目 id
 * @param {string[]} [opts.onlyIds] 只從這些 id 選（錯題特訓用）
 * @returns 題目陣列，每題含 options（已洗牌，正解標記 correct: true）
 */
export function selectQuestions({
  count,
  seed = `${Date.now()}-${Math.random()}`,
  minDifficulty = 1,
  maxDifficulty = 5,
  categories = null,
  excludeIds = [],
  onlyIds = null
} = {}) {
  const rand = mulberry32(String(seed));
  const excluded = new Set(excludeIds);

  if (onlyIds) {
    const wanted = new Set(onlyIds);
    const pool = BANK.filter(q => wanted.has(q.id));
    return shuffleWith(rand, pool).slice(0, count).map(q => toQuestion(q, rand));
  }

  let pool = BANK.filter(q =>
    q.difficulty >= minDifficulty &&
    q.difficulty <= maxDifficulty &&
    !excluded.has(q.id) &&
    (!categories || categories.includes(q.category))
  );

  // 池子不夠時放寬難度限制（但仍排除已用過的題目）
  if (pool.length < count) {
    pool = BANK.filter(q => !excluded.has(q.id) && (!categories || categories.includes(q.category)));
  }
  if (pool.length < count) {
    pool = BANK.filter(q => !categories || categories.includes(q.category));
  }

  return shuffleWith(rand, pool).slice(0, count).map(q => toQuestion(q, rand));
}

function toQuestion(item, rand) {
  const options = shuffleWith(rand, [
    { zhuyin: item.zhuyin, correct: true },
    ...item.distractors.map(d => ({ zhuyin: d, correct: false }))
  ]);
  return { ...item, options };
}

/**
 * 連對提難用：抽一題更難的新題（難度 == wantDifficulty，限定類別、排除已用 id）。
 * 找不到該難度題時往下退一級找，再找不到回 null（呼叫端維持原題）。
 * @param {Object} opts
 * @param {number} opts.wantDifficulty 目標難度
 * @param {string[]} [opts.categories] 限定類別
 * @param {Set<string>|string[]} [opts.usedIds] 已用過的題 id
 * @param {string|number} [opts.seed] 種子
 */
export function drawHarderQuestion({ wantDifficulty, categories = null, usedIds = [], seed } = {}) {
  const rand = mulberry32(String(seed ?? `${Date.now()}-${Math.random()}`));
  const used = usedIds instanceof Set ? usedIds : new Set(usedIds);
  const matches = (q, d) =>
    q.difficulty === d && !used.has(q.id) && (!categories || categories.includes(q.category));

  for (let d = wantDifficulty; d >= 1; d -= 1) {
    const pool = BANK.filter(q => matches(q, d));
    if (pool.length) return toQuestion(shuffleWith(rand, pool)[0], rand);
  }
  return null;
}

export { BANK };
