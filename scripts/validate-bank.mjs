/**
 * 題庫驗證：node scripts/validate-bank.mjs
 * 檢查 schema 完整、注音字元合法、distractor 合理、id 唯一。
 */
import { BANK, bankStats } from '../src/data/bank/index.js';

const ZHUYIN_RE = /^[ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ][ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ]{0,2}[ˊˇˋ˙]?$/;
const ERAS = new Set(['classic', 'modern', 'meme']);

const errors = [];
const ids = new Set();

for (const q of BANK) {
  const where = `${q.id} (${q.text})`;

  if (!q.id || ids.has(q.id)) errors.push(`${where}: id 缺少或重複`);
  ids.add(q.id);

  for (const field of ['text', 'target', 'zhuyin', 'meaning', 'fun']) {
    if (!q[field] || typeof q[field] !== 'string') errors.push(`${where}: 缺少 ${field}`);
  }
  if (q.target && q.text && !q.text.includes(q.target)) {
    errors.push(`${where}: target「${q.target}」不在 text 中`);
  }
  if (q.target && q.target.length !== 1) errors.push(`${where}: target 必須是單一字`);

  if (!ZHUYIN_RE.test(q.zhuyin)) errors.push(`${where}: zhuyin「${q.zhuyin}」格式不合法`);

  if (!Array.isArray(q.distractors) || q.distractors.length < 1 || q.distractors.length > 3) {
    errors.push(`${where}: distractors 需 1–3 個`);
  } else {
    for (const d of q.distractors) {
      if (!ZHUYIN_RE.test(d)) errors.push(`${where}: distractor「${d}」格式不合法`);
      if (d === q.zhuyin) errors.push(`${where}: distractor 與正解相同`);
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

const stats = bankStats();
console.log('📚 題庫統計:', JSON.stringify(stats, null, 2));

if (errors.length) {
  console.error(`\n❌ 驗證失敗，共 ${errors.length} 個問題：`);
  for (const e of errors) console.error('  -', e);
  process.exit(1);
}
console.log(`\n✅ ${BANK.length} 題全部通過驗證`);
