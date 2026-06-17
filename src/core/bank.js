/** 選題器 — 所有玩法唯一的取題入口 */
import { BANK } from '../data/bank/index.js';
import { mulberry32, shuffleWith, dailySeed } from './rng.js';

/** Event 限定類別：categories=null（一般模式全選）時母池排除這些，
 * 只有顯式 categories 帶到才抽得到。避免端午題全年亂入 daily/sprint/levels。 */
export const EVENT_ONLY_CATEGORIES = ['duanwu'];

/** 錯率校正後的難度覆蓋 { id: difficulty }。
 * 只有單人非共享 seed 模式（sprint / levels）吃覆蓋：
 * daily / duel 全玩家同 seed 同題，各人覆蓋 fetch 時間不同會選出不同題，破壞決定性。 */
let DIFFICULTY_OVERRIDES = {};

export function setDifficultyOverrides(map) {
  DIFFICULTY_OVERRIDES = map ?? {};
}

function diffOf(q, calibrated) {
  return calibrated ? (DIFFICULTY_OVERRIDES[q.id] ?? q.difficulty) : q.difficulty;
}

/**
 * 依條件選題並組成可直接渲染的題目物件。
 * @param {Object} opts
 * @param {number} opts.count 題數
 * @param {string|number} [opts.seed] 種子；不給則隨機
 * @param {number} [opts.minDifficulty=1]
 * @param {number} [opts.maxDifficulty=5]
 * @param {string[]} [opts.categories] 限定類別（bank index 的 key）；不給時排除 event-only 類別
 * @param {string} [opts.chapter] 限定章節（duanwu 關用，鎖主題；只在帶 categories 時有意義）
 * @param {string[]} [opts.excludeIds] 排除的題目 id（近期出過；超過池子可容納上限時只保留最近的）
 * @param {string[]} [opts.onlyIds] 只從這些 id 選（錯題特訓用）
 * @param {boolean} [opts.calibrated=false] 套用錯率校正難度（僅限非共享 seed 模式）
 * @returns 題目陣列，每題含 options（已洗牌，正解標記 correct: true）
 */
export function selectQuestions({
  count,
  seed = `${Date.now()}-${Math.random()}`,
  minDifficulty = 1,
  maxDifficulty = 5,
  categories = null,
  chapter = null,
  excludeIds = [],
  onlyIds = null,
  calibrated = false
} = {}) {
  const rand = mulberry32(String(seed));

  if (onlyIds) {
    const wanted = new Set(onlyIds);
    const pool = BANK.filter(q => wanted.has(q.id));
    return shuffleWith(rand, pool).slice(0, count).map(q => toQuestion(q, rand));
  }

  // 類別範圍：顯式 categories 用 includes；categories=null 排除 event-only 類別。
  // chapter 另外鎖主題（只在 duanwu 這種帶 chapter 的題上有意義；其他題無 chapter 欄位）。
  const inCategory = q =>
    (categories ? categories.includes(q.category) : !EVENT_ONLY_CATEGORIES.includes(q.category)) &&
    (!chapter || q.chapter === chapter);

  // 符合難度/類別的母池（不含排除）
  const inScope = BANK.filter(q =>
    diffOf(q, calibrated) >= minDifficulty &&
    diffOf(q, calibrated) <= maxDifficulty &&
    inCategory(q)
  );

  // 排除清單上限：最多排到「母池容得下且本場仍抽得滿」的程度。
  // 小池關卡（如 BOSS）若把整份近期清單照單全排，會被鎖到只剩固定殘餘題反覆輪替；
  // 故只排最近的一段，較舊的題目隨輪替重新有機會出現，提升跨場多樣性。
  const maxExclude = Math.max(0, inScope.length - count);
  // 注意 slice(-0) === slice(0) 會取整段，maxExclude 為 0 時須給空陣列
  const excluded = new Set(maxExclude > 0 ? excludeIds.slice(-maxExclude) : []);

  let pool = inScope.filter(q => !excluded.has(q.id));

  // 仍不夠（排除上限已收斂，理論上罕見）時放寬難度限制（仍守類別/章節範圍）
  if (pool.length < count) {
    pool = BANK.filter(q => !excluded.has(q.id) && inCategory(q));
  }
  if (pool.length < count) {
    pool = BANK.filter(q => inCategory(q));
  }

  return shuffleWith(rand, pool).slice(0, count).map(q => toQuestion(q, rand));
}

// 每題呈現選項物件陣列，正解標記 correct: true，決定性洗牌（同 seed 同題組選項一致）。
// kind: 'fact'（端午知識題）選項是預建多字文字陣列（item.options），正解由 item.answer index 標；
//   4 選項全留、只洗牌（無 distractors 機制）。
// kind: 'char'（反考字）選項是「字」（正解 = target）；其餘為注音題（正解 = zhuyin），取至多 3 個 distractors 的前 2 個。
function toQuestion(item, rand) {
  if (item.kind === 'fact') {
    const options = shuffleWith(
      rand,
      item.options.map((text, i) => ({ text, correct: i === item.answer }))
    );
    return { ...item, options };
  }
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
export function drawHarderQuestion({ wantDifficulty, categories = null, usedIds = [], seed, calibrated = false } = {}) {
  const rand = mulberry32(String(seed ?? `${Date.now()}-${Math.random()}`));
  const used = usedIds instanceof Set ? usedIds : new Set(usedIds);
  const matches = (q, d) =>
    diffOf(q, calibrated) === d && !used.has(q.id) && (!categories || categories.includes(q.category));

  for (let d = wantDifficulty; d >= 1; d -= 1) {
    const pool = BANK.filter(q => matches(q, d));
    if (pool.length) return toQuestion(shuffleWith(rand, pool)[0], rand);
  }
  return null;
}

/**
 * 算出今天每日挑戰要排除的題 id：逐日往前重現過去 `days` 天各自選出的題。
 * 全球同日得到同一份排除清單（皆由日期決定），不破壞「全世界今天同一份考卷」。
 * 難度下限由呼叫端傳入的 `minForDate` 提供（真相來源在 modes.js，避免複製檔位邏輯）。
 * @param {Date} date 今天
 * @param {number} days 往前回溯天數
 * @param {number} count 每日題數（須與 daily config 一致）
 * @param {(d: Date) => number} minForDate 給日期回傳該天 minDifficulty
 * @returns {string[]} 近期出過的題 id
 */
export function dailyExcludeIds(date, days, count, minForDate) {
  const seen = [];
  // 由最舊往今天逐日重現，每天帶入「更早已出過的題」與 daily 實際取題一致
  for (let d = days; d >= 1; d -= 1) {
    const day = new Date(date.getTime() - d * 86400000);
    const ids = selectQuestions({
      count,
      seed: dailySeed(day),
      minDifficulty: minForDate(day),
      maxDifficulty: 5,
      excludeIds: seen
    }).map(q => q.id);
    seen.push(...ids);
  }
  return [...new Set(seen)];
}

export { BANK };
