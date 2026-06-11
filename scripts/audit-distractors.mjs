/**
 * 稽核誘答（distractors）是否含「該字的另一個讀音」（萌典/修訂本單字讀音）。
 *
 * ⚠️ 重要：本 script 的命中**不等於 bug**。對破音字/易讀錯題型而言，「用該字在別詞的
 *   正讀當誘答」正是考點（如『胖』考 ㄆㄢˊ、誘答放最常見的 ㄆㄤˋ）。命中清單只是
 *   「又讀爭議題的線索」，需逐題回簡編本 dictView.jsp 判斷：
 *     - 真 bug：誘答在「這個詞的情境下也是教育部認可的讀音」→ 出現兩個正解（如 tk-013 角色）
 *     - 非 bug：誘答只是該字在「別的詞」的正讀，本詞情境下是錯的 → 正確考點，不動
 *   萌典(moedict.tw)=修訂本，又音收得寬，誤報率高；簡編本(dict.concised)才是審題第一依據。
 *
 * 純唯讀，不改檔。用法：node scripts/audit-distractors.mjs [--json out.json]
 */
import { BANK } from '../src/data/bank/index.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function moedict(word) {
  try {
    const res = await fetch(`https://www.moedict.tw/uni/${encodeURIComponent(word)}.json`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) return null;
    const d = await res.json();
    if (d.error) return null;
    return d;
  } catch {
    return null;
  }
}

const norm = (s) => {
  let t = (s || '').replace(/\s+/g, '').trim();
  if (t.startsWith('˙')) t = t.slice(1) + '˙';
  return t;
};

const jsonArg = process.argv.indexOf('--json');
const jsonOut = jsonArg >= 0 ? process.argv[jsonArg + 1] : null;

const bad = [];      // 誘答誤含真實讀音
const unchecked = []; // 萌典查無，無法判定

for (const q of BANK) {
  const single = await moedict(q.target);
  await sleep(100);
  if (!single || !single.heteronyms?.length) {
    unchecked.push({ id: q.id, target: q.target });
    continue;
  }
  const readings = new Set(single.heteronyms.map((h) => norm(h.bopomofo)));
  const ans = norm(q.zhuyin);
  // 誘答若等於該字任一真實讀音（且不是正解本身）→ 誤導
  const offending = q.distractors
    .map(norm)
    .filter((d) => readings.has(d) && d !== ans);
  if (offending.length) {
    bad.push({
      id: q.id, text: q.text, target: q.target, ans,
      distractors: q.distractors,
      offending,
      allReadings: [...readings].join(' / ')
    });
  }
}

console.log(`\n誘答稽核完成：${BANK.length} 題`);
console.log(`\n🔴 誘答誤含真實讀音 (${bad.length})`);
for (const b of bad) {
  console.log(`  [${b.id}] ${b.text}（${b.target}）正解=${b.ans}｜誤導誘答=${b.offending.join(',')}｜該字讀音: ${b.allReadings}`);
}
console.log(`\n⚪ 萌典查無 (${unchecked.length})`);

if (jsonOut) {
  const fs = await import('node:fs');
  fs.writeFileSync(jsonOut, JSON.stringify({ bad, unchecked }, null, 2));
  console.log(`\n寫入 ${jsonOut}`);
}
