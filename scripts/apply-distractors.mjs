/** 把 workflow 產出的誘答補充套進 bank 檔。
 * 以 id 為錨點，定位該題物件區塊內的單行 distractors: [...]，
 * 用「現有 + fixedAdd」覆寫（補到 3 個），沿用該檔引號風格。
 * 用法：node scripts/apply-distractors.mjs <result.json> [--dry]
 */
import fs from 'node:fs';

const resultPath = process.argv[2];
const dry = process.argv.includes('--dry');
if (!resultPath) {
  console.error('usage: node scripts/apply-distractors.mjs <result.json> [--dry]');
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(resultPath, 'utf8'));

// 偵測檔案引號風格（distractors 陣列元素用單引號還是雙引號）
function detectQuote(src) {
  const m = src.match(/distractors:\s*\[\s*(["'])/);
  return m ? m[1] : "'";
}

let totalApplied = 0;
const report = [];

for (const file of data) {
  const path = file.path;
  let src = fs.readFileSync(path, 'utf8');
  const quote = detectQuote(src);
  let applied = 0;
  const failures = [];

  for (const a of file.additions) {
    const finalDistractors = [...(a.existing || []), ...a.add];
    if (finalDistractors.length !== 3) {
      failures.push(`${a.id}: 補後誘答數=${finalDistractors.length}, 跳過`);
      continue;
    }
    // 定位該 id 的物件起點，再從那裡找下一個 distractors: [...]
    const idIdx = src.indexOf(`id: ${quote}${a.id}${quote}`) >= 0
      ? src.indexOf(`id: ${quote}${a.id}${quote}`)
      : src.indexOf(`id: "${a.id}"`) >= 0
        ? src.indexOf(`id: "${a.id}"`)
        : src.indexOf(`id: '${a.id}'`);
    if (idIdx < 0) { failures.push(`${a.id}: 找不到 id`); continue; }

    const distRe = /distractors:\s*\[[^\]]*\]/g;
    distRe.lastIndex = idIdx;
    const m = distRe.exec(src);
    if (!m) { failures.push(`${a.id}: 找不到 distractors`); continue; }

    const newArr = `distractors: [${finalDistractors.map(d => `${quote}${d}${quote}`).join(', ')}]`;
    src = src.slice(0, m.index) + newArr + src.slice(m.index + m[0].length);
    applied += 1;
    totalApplied += 1;
  }

  if (!dry) fs.writeFileSync(path, src);
  report.push({ cat: file.cat, applied, failures });
}

for (const r of report) {
  console.log(`${r.cat}: 套用 ${r.applied} 題${r.failures.length ? `, 失敗 ${r.failures.length}` : ''}`);
  for (const f of r.failures) console.log(`   ! ${f}`);
}
console.log(`\n總套用: ${totalApplied} 題${dry ? ' (DRY RUN, 未寫檔)' : ''}`);
