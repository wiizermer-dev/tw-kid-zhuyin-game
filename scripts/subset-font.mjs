/**
 * 教育部楷書 (TW-Kai) 子集化。
 *
 * 原始 edukai woff2 約 8.4MB，含全字庫，嚴重拖累首屏載入 (LCP)。
 * 本腳本掃描整個 src/（題庫文字 + 所有 UI 文案）抓出實際會用到的字元，
 * 加上完整注音符號 / 聲調 / 常用標點 / ASCII，產生 subset woff2。
 *
 * 用法：node scripts/subset-font.mjs
 * 前置：需 pyftsubset (pip install fonttools brotli)。
 *
 * 輸出：public/fonts/edukai-subset.woff2
 * 注意：subset 只覆蓋「現有題庫 + UI」用字。新增題目用到新字時，
 *       務必重跑本腳本，否則該字會 fallback 到系統字型。
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'src');
const TTF = join(ROOT, 'scripts/fonts-src/edukai-5.1_20251208.ttf');
const OUT = join(ROOT, 'public/fonts/edukai-subset.woff2');
const PYFTSUBSET = process.env.PYFTSUBSET
  || `${process.env.HOME}/Library/Python/3.9/bin/pyftsubset`;

// 遞迴收集所有 .js / .svelte 原始碼字串
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (['.js', '.svelte', '.css'].includes(extname(name))) out.push(p);
  }
  return out;
}

const chars = new Set();

// 1. 掃 src/ 所有原始碼，抓 CJK 與注音
for (const file of walk(SRC)) {
  const text = readFileSync(file, 'utf8');
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    // CJK 統一表意 + 擴充 A + 相容 + 注音 + 注音擴充
    if (
      (cp >= 0x4e00 && cp <= 0x9fff) ||   // CJK 基本
      (cp >= 0x3400 && cp <= 0x4dbf) ||   // CJK 擴充 A
      (cp >= 0xf900 && cp <= 0xfaff) ||   // CJK 相容表意
      (cp >= 0x3105 && cp <= 0x312f) ||   // 注音符號
      (cp >= 0x31a0 && cp <= 0x31bf)      // 注音擴充
    ) {
      chars.add(ch);
    }
  }
}

// 2. 補上完整注音符號 + 聲調 + 輕聲，確保任何讀音都能顯示
const ZHUYIN = 'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ';
const TONES = 'ˉˊˇˋ˙';
for (const ch of ZHUYIN + TONES) chars.add(ch);

// 3. 常用中文標點 + 全形符號
const PUNCT = '，。、；：？！「」『』（）《》〈〉〔〕…—－·．／';
for (const ch of PUNCT) chars.add(ch);

const cjkCount = [...chars].filter(c => c.codePointAt(0) >= 0x3105).length;
console.log(`蒐集到 ${chars.size} 個字元 (CJK/注音/標點 ${cjkCount})`);

if (!existsSync(TTF)) {
  console.error(`找不到來源字型：${TTF}`);
  process.exit(1);
}

// 寫出 unicodes 清單供 pyftsubset 讀
const unicodesFile = join(ROOT, 'scripts/.font-unicodes.txt');
const unicodes = [...chars]
  .map(c => 'U+' + c.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'))
  .join(',');
writeFileSync(unicodesFile, unicodes);

console.log('執行 pyftsubset…');
execFileSync(PYFTSUBSET, [
  TTF,
  `--unicodes-file=${unicodesFile}`,
  '--flavor=woff2',
  '--layout-features=*',     // 保留 OpenType layout (注音可能需要)
  '--no-hinting',            // 移除 hinting 大幅縮小
  '--desubroutinize',
  `--output-file=${OUT}`
], { stdio: 'inherit' });

const origSize = statSync(TTF).size;
const newSize = statSync(OUT).size;
console.log(
  `完成：${(origSize / 1e6).toFixed(1)}MB → ${(newSize / 1024).toFixed(0)}KB ` +
  `(${(100 - newSize / origSize * 100).toFixed(1)}% 縮減)`
);
console.log(`輸出：${OUT}`);
