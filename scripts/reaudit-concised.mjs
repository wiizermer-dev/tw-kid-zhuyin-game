/**
 * 一次性稽核：用「簡編本權威層」對全題庫重審，**完全忽略 VERIFIED_OK 白名單**。
 * 目的：白名單是基於舊 moedict 流程逐題加的，可能掩蓋簡編本會抓出的真錯。
 * 本腳本只讀簡編本官方離線資料，純報告、不改檔。
 *
 * 判定（對每題的 target 字）：
 *  - 整詞 text 在簡編本 → 抽 target 音節比對答案。
 *  - 整詞查無（多為語境句）→ 從 text 掃出簡編本收錄的「最長含 target 子詞」覆核。
 *  - 子詞也查無 → 退查單字：答案須在該字簡編本讀音清單內（多音題無法定位語境義，只標「待人工」不算錯）。
 *
 * 用法：node scripts/reaudit-concised.mjs
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BANK } from '../src/data/bank/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONCISED_JSON = join(__dirname, 'data', 'concised-dict.json');
if (!existsSync(CONCISED_JSON)) {
  console.error('找不到 scripts/data/concised-dict.json，請先 npm run build-dict');
  process.exit(1);
}
const CONCISED = JSON.parse(readFileSync(CONCISED_JSON, 'utf-8'));

const norm = (s) => {
  let t = (s || '').replace(/\s+/g, '').trim();
  if (t.startsWith('˙')) t = t.slice(1) + '˙';
  return t;
};

// 整詞注音字串 → 抽 word 中 target 字的音節（norm 後）；對不上回 null。
function syllableOf(zhuyinStr, word, target) {
  const syl = zhuyinStr.split(/[\s　]+/).filter(Boolean);
  const chars = [...word];
  const idx = chars.indexOf(target);
  if (idx < 0 || syl.length !== chars.length) return null;
  return norm(syl[idx]);
}

// 從 text 掃出簡編本收錄、且含 target、長度>=2 的最長子詞。回傳 {word, readings} 或 null。
function longestSubwordWithTarget(text, target) {
  const chars = [...text];
  let best = null;
  for (let len = chars.length; len >= 2; len--) {
    for (let i = 0; i + len <= chars.length; i++) {
      const sub = chars.slice(i, i + len).join('');
      if (!sub.includes(target)) continue;
      if (CONCISED[sub]) {
        if (!best || sub.length > best.word.length) best = { word: sub, readings: CONCISED[sub] };
      }
    }
    if (best) return best; // 已找到最長
  }
  return null;
}

const wrong = [];     // 簡編本明確打臉
const needHuman = [];  // 簡編本查無詞條、單字多音無法定位
let checked = 0;

for (const q of BANK) {
  // pickchar（反考字題）正解是「字」不是讀音，zhuyin 仍為 target 正讀，照常稽核
  const { id, text, target } = q;
  const ans = norm(q.zhuyin);

  // 1. 整詞
  let readings = CONCISED[text] || null;
  let matchedWord = text;

  // 2. 整詞查無 → 最長含 target 子詞
  if (!readings) {
    const sub = longestSubwordWithTarget(text, target);
    if (sub) { readings = sub.readings; matchedWord = sub.word; }
  }

  if (readings) {
    const seen = [];
    let ok = false;
    for (const z of readings) {
      const s = syllableOf(z, matchedWord, target);
      if (s == null) continue;
      seen.push(s);
      if (s === ans) { ok = true; break; }
    }
    if (seen.length) {
      checked++;
      if (!ok) {
        wrong.push({ id, text, target, ans, word: matchedWord, dict: seen.join(' / ') });
      }
      continue;
    }
  }

  // 3. 退查單字（簡編本單字注音清單）
  const single = CONCISED[target];
  if (single) {
    const readingsSingle = single.map((z) => norm(z));
    checked++;
    if (!readingsSingle.includes(ans)) {
      wrong.push({ id, text, target, ans, word: target, dict: readingsSingle.join(' / ') + '（單字）' });
    }
    continue;
  }

  needHuman.push({ id, text, target, ans });
}

console.log(`\n簡編本權威重審（忽略白名單）：全 ${BANK.length} 題，簡編本可查證 ${checked} 題`);
console.log(`\n🔴 簡編本判定不符 (${wrong.length})`);
for (const w of wrong) {
  console.log(`  [${w.id}] ${w.text}（${w.target}）題庫答案=${w.ans}｜簡編本「${w.word}」=${w.dict}`);
}
console.log(`\n⚪ 簡編本查無、需人工 (${needHuman.length})`);
for (const u of needHuman) {
  console.log(`  [${u.id}] ${u.text}（${u.target}）=${u.ans}`);
}
