/**
 * 把教育部《國語辭典簡編本》官方 xlsx 轉成精簡的 字詞→注音 lookup JSON。
 *
 * 資料源（CC-姓名標示-禁止改作 3.0 臺灣，允許商業重製散布）：
 *   https://language.moe.gov.tw/001/Upload/Files/site_content/M0001/respub/dict_concised_download.html
 *   下載「文字資料庫」zip，內含單一 .xlsx。
 *
 * 用法：
 *   1. 下載並解壓 xlsx 到本機（預設讀 scripts/data/dict_concised.xlsx，或用 argv[2] 指定）。
 *   2. node scripts/build-concised-dict.mjs [path/to.xlsx]
 *   3. 產出 scripts/data/concised-dict.json：{ "字詞": ["注音一式", ...多音] }
 *
 * audit-readings.mjs 會優先讀這份（簡編本=第一依據），查無才退萌典修訂本粗篩。
 * 純 Node，不依賴 openpyxl / xlsx 套件，直接解 xlsx 內的 XML。
 */
import { readFileSync, writeFileSync, existsSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const XLSX = process.argv[2] || join(__dirname, 'data', 'dict_concised.xlsx');
const OUT = join(__dirname, 'data', 'concised-dict.json');

if (!existsSync(XLSX)) {
  console.error(`找不到 xlsx: ${XLSX}`);
  console.error('請先從教育部下載頁取得「文字資料庫」zip，解壓出 .xlsx 放到 scripts/data/dict_concised.xlsx');
  process.exit(1);
}

// xlsx = zip。用系統 unzip 解到暫存資料夾（避免引入 zip 解析套件）。
const work = mkdtempSync(join(tmpdir(), 'concised-'));
execFileSync('unzip', ['-o', XLSX, '-d', work], { stdio: 'ignore' });

const sharedXml = readFileSync(join(work, 'xl', 'sharedStrings.xml'), 'utf-8');
const sheetXml = readFileSync(join(work, 'xl', 'worksheets', 'sheet1.xml'), 'utf-8');

// 解 sharedStrings：每個 <si> 一筆，內含一或多個 <t>。
const shared = [];
for (const si of sharedXml.match(/<si>[\s\S]*?<\/si>/g) || []) {
  const texts = [...si.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) =>
    m[1]
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
  );
  shared.push(texts.join(''));
}

// 欄位順序（依 sheet 第一列）：A=字詞名, G=注音一式, H=變體注音, F=多音排序
const COL = (letter) => letter.charCodeAt(0) - 'A'.charCodeAt(0);
const COL_WORD = COL('A');
const COL_ZHUYIN = COL('G');

// 解某 row 的指定欄字串值（t="s" 走 sharedStrings；否則取 <v> 原值）。
function cellValue(rowXml, colIdx) {
  // 逐 cell 掃，比對欄位字母
  const cells = rowXml.matchAll(/<c r="([A-Z]+)\d+"([^>]*)>(?:<f>[\s\S]*?<\/f>)?(?:<v>([\s\S]*?)<\/v>)?<\/c>/g);
  for (const c of cells) {
    const colLetters = c[1];
    const idx = [...colLetters].reduce((acc, ch) => acc * 26 + (ch.charCodeAt(0) - 'A'.charCodeAt(0) + 1), 0) - 1;
    if (idx !== colIdx) continue;
    const isShared = /t="s"/.test(c[2]);
    const raw = c[3];
    if (raw == null) return '';
    return isShared ? shared[Number(raw)] || '' : raw;
  }
  return '';
}

const dict = {};
let count = 0;
const rows = sheetXml.match(/<row[^>]*>[\s\S]*?<\/row>/g) || [];
for (const row of rows) {
  const rNum = Number((row.match(/<row r="(\d+)"/) || [])[1] || 0);
  if (rNum <= 1) continue; // 跳過表頭
  const word = cellValue(row, COL_WORD).trim();
  const zhuyin = cellValue(row, COL_ZHUYIN).trim();
  if (!word || !zhuyin) continue;
  if (!dict[word]) dict[word] = [];
  if (!dict[word].includes(zhuyin)) dict[word].push(zhuyin);
  count++;
}

writeFileSync(OUT, JSON.stringify(dict, null, 0), 'utf-8');
console.log(`簡編本轉換完成：${Object.keys(dict).length} 個字詞（${count} 筆讀音）→ ${OUT}`);
