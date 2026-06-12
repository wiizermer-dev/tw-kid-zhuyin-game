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
 * @param {string[]} [opts.excludeIds] 排除的題目 id（近期出過；超過池子可容納上限時只保留最近的）
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

  if (onlyIds) {
    const wanted = new Set(onlyIds);
    const pool = BANK.filter(q => wanted.has(q.id));
    return shuffleWith(rand, pool).slice(0, count).map(q => toQuestion(q, rand));
  }

  // 符合難度/類別的母池（不含排除）
  const inScope = BANK.filter(q =>
    q.difficulty >= minDifficulty &&
    q.difficulty <= maxDifficulty &&
    (!categories || categories.includes(q.category))
  );

  // 排除清單上限：最多排到「母池容得下且本場仍抽得滿」的程度。
  // 小池關卡（如 BOSS）若把整份近期清單照單全排，會被鎖到只剩固定殘餘題反覆輪替；
  // 故只排最近的一段，較舊的題目隨輪替重新有機會出現，提升跨場多樣性。
  const maxExclude = Math.max(0, inScope.length - count);
  // 注意 slice(-0) === slice(0) 會取整段，maxExclude 為 0 時須給空陣列
  const excluded = new Set(maxExclude > 0 ? excludeIds.slice(-maxExclude) : []);

  let pool = inScope.filter(q => !excluded.has(q.id));

  // 仍不夠（排除上限已收斂，理論上罕見）時放寬難度限制
  if (pool.length < count) {
    pool = BANK.filter(q => !excluded.has(q.id) && (!categories || categories.includes(q.category)));
  }
  if (pool.length < count) {
    pool = BANK.filter(q => !categories || categories.includes(q.category));
  }

  return shuffleWith(rand, pool).slice(0, count).map(q => toQuestion(q, rand));
}

// 每題呈現 3 選項（1 正解 + 2 誘答）。題庫每題備至多 3 個 distractors，
// 決定性洗牌後取前 2 個，保留 seed 可重現性（同房同題組選項一致）。
// kind: 'char'（反考字）選項是「字」（正解 = target）；預設選項是注音（正解 = zhuyin）。
function toQuestion(item, rand) {
  const picks = shuffleWith(rand, item.distractors).slice(0, 2);
  const isChar = item.kind === 'char';
  const key = isChar ? 'char' : 'zhuyin';
  const options = shuffleWith(rand, [
    { [key]: isChar ? item.target : item.zhuyin, correct: true },
    ...picks.map(d => ({ [key]: d, correct: false }))
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
