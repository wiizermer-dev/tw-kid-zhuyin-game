/**
 * 題庫驗證：node scripts/validate-bank.mjs
 * 檢查 schema 完整、注音字元合法、distractor 合理、id 唯一。
 */
import { BANK, bankStats } from '../src/data/bank/index.js';
import { DUANWU_LEVELS } from '../src/modes.js';
import { selectQuestions, EVENT_ONLY_CATEGORIES } from '../src/core/bank.js';

const ZHUYIN_RE = /^[ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ][ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ]{0,2}[ˊˇˋ˙]?$/;
const ERAS = new Set(['classic', 'modern', 'meme']);

const errors = [];
const ids = new Set();

for (const q of BANK) {
  const where = `${q.id} (${q.text ?? q.question?.slice(0, 16)})`;

  if (!q.id || ids.has(q.id)) errors.push(`${where}: id 缺少或重複`);
  ids.add(q.id);

  // fun fact 知識題（端午 event）走獨立 schema：question/options/answer/fun/source/difficulty/chapter，無字音。
  if (q.kind === 'fact') {
    for (const field of ['question', 'fun', 'source', 'chapter']) {
      if (!q[field] || typeof q[field] !== 'string') errors.push(`${where}: 缺少 ${field}`);
    }
    if (!Array.isArray(q.options) || q.options.length < 2 || q.options.length > 4) {
      errors.push(`${where}: options 需 2–4 個`);
    } else {
      if (q.options.some(o => typeof o !== 'string' || !o)) errors.push(`${where}: option 須為非空字串`);
      if (new Set(q.options).size !== q.options.length) errors.push(`${where}: options 重複`);
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) {
      errors.push(`${where}: answer 須為合法 option index`);
    }
    if (!Array.isArray(q.tags) || q.tags.length === 0) errors.push(`${where}: 缺少 tags`);
    if (!Number.isInteger(q.difficulty) || q.difficulty < 1 || q.difficulty > 5) {
      errors.push(`${where}: difficulty 需為 1–5 整數`);
    }
    if (!ERAS.has(q.era)) errors.push(`${where}: era「${q.era}」不合法`);
    continue;
  }

  for (const field of ['text', 'target', 'zhuyin', 'meaning', 'fun']) {
    if (!q[field] || typeof q[field] !== 'string') errors.push(`${where}: 缺少 ${field}`);
  }
  if (q.target && q.text && !q.text.includes(q.target)) {
    errors.push(`${where}: target「${q.target}」不在 text 中`);
  }
  if (q.target && q.target.length !== 1) errors.push(`${where}: target 必須是單一字`);

  if (!ZHUYIN_RE.test(q.zhuyin)) errors.push(`${where}: zhuyin「${q.zhuyin}」格式不合法`);

  if (q.kind !== undefined && q.kind !== 'char') {
    errors.push(`${where}: kind「${q.kind}」不合法（僅允許省略或 'char'）`);
  }

  if (!Array.isArray(q.distractors) || q.distractors.length < 1 || q.distractors.length > 3) {
    errors.push(`${where}: distractors 需 1–3 個`);
  } else {
    for (const d of q.distractors) {
      if (q.kind === 'char') {
        // 反考字：誘答是「字」，須為單一字且非正解字
        if (typeof d !== 'string' || [...d].length !== 1) errors.push(`${where}: 誘答字「${d}」須為單一字`);
        if (d === q.target) errors.push(`${where}: 誘答字與正解 target 相同`);
      } else {
        if (!ZHUYIN_RE.test(d)) errors.push(`${where}: distractor「${d}」格式不合法`);
        if (d === q.zhuyin) errors.push(`${where}: distractor 與正解相同`);
      }
    }
    if (new Set(q.distractors).size !== q.distractors.length) {
      errors.push(`${where}: distractors 重複`);
    }
  }

  if (!Array.isArray(q.tags) || q.tags.length === 0) errors.push(`${where}: 缺少 tags`);
  if (!Number.isInteger(q.difficulty) || q.difficulty < 1 || q.difficulty > 5) {
    errors.push(`${where}: difficulty 需為 1–5 整數`);
  }
  if (!ERAS.has(q.era)) errors.push(`${where}: era「${q.era}」不合法`);
}

// === 端午 event 足量斷言（spec §1.2 2B + Eng D5）===
// (1) 每個 DUANWU_LEVELS 關卡：duanwu 中符合 chapter + 難度區間的題數 ≥ count（選得滿一關，不靜默縮關）
for (const lv of DUANWU_LEVELS) {
  const n = BANK.filter(
    q => q.category === 'duanwu' && q.chapter === lv.chapter && q.difficulty >= lv.min && q.difficulty <= lv.max
  ).length;
  if (n < lv.count) {
    errors.push(`端午關 ${lv.n}「${lv.name}」(chapter=${lv.chapter}, 難度 ${lv.min}-${lv.max}) 只有 ${n} 題 < count ${lv.count}`);
  }
}

// (2) event-only 類別不出現在一般模式預設選池（categories=null）抽樣裡
const sample = selectQuestions({ count: 200, seed: 'validate-event-isolation', minDifficulty: 1, maxDifficulty: 5 });
const leaked = sample.filter(q => EVENT_ONLY_CATEGORIES.includes(q.category));
if (leaked.length) {
  errors.push(`event-only 類別洩漏進一般選池：${[...new Set(leaked.map(q => q.category))].join(',')}（${leaked.length} 題）`);
}

const stats = bankStats();
console.log('📚 題庫統計:', JSON.stringify(stats, null, 2));

if (errors.length) {
  console.error(`\n❌ 驗證失敗，共 ${errors.length} 個問題：`);
  for (const e of errors) console.error('  -', e);
  process.exit(1);
}
console.log(`\n✅ ${BANK.length} 題全部通過驗證`);
