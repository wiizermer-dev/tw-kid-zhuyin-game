/**
 * 從教育部楷書字型抽取 37 個注音符號的向量外框，
 * 烘焙成 src/ui/zhuyinPaths.js（純 SVG path，零執行期字型依賴）。
 * 用法：node scripts/gen-zhuyin-svg.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import opentype from 'opentype.js';

const FONT = 'public/fonts/edukai-5.1_20251208.ttf';
const OUT = 'src/ui/zhuyinPaths.js';
const SIZE = 100; // viewBox 100x100

const ZHUYIN = [...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ'];

const font = opentype.parse(readFileSync(FONT).buffer.slice(0));

const entries = {};
for (const ch of ZHUYIN) {
  const glyph = font.charToGlyph(ch);
  if (!glyph || glyph.index === 0) {
    console.error(`⚠️ 字型缺字: ${ch}`);
    continue;
  }
  // 先取原始外框算 bounding box，置中縮放到 viewBox
  const raw = glyph.getPath(0, 0, SIZE);
  const bb = raw.getBoundingBox();
  const w = bb.x2 - bb.x1;
  const h = bb.y2 - bb.y1;
  const scale = (SIZE * 0.78) / Math.max(w, h);
  const ox = (SIZE - w * scale) / 2 - bb.x1 * scale;
  const oy = (SIZE - h * scale) / 2 - bb.y1 * scale;

  const path = glyph.getPath(0, 0, SIZE);
  // 手動套 transform：opentype Path 指令逐點換算
  let d = '';
  for (const cmd of path.commands) {
    const t = (x, y) => `${(x * scale + ox).toFixed(1)},${(y * scale + oy).toFixed(1)}`;
    if (cmd.type === 'M') d += `M${t(cmd.x, cmd.y)}`;
    else if (cmd.type === 'L') d += `L${t(cmd.x, cmd.y)}`;
    else if (cmd.type === 'Q') d += `Q${t(cmd.x1, cmd.y1)} ${t(cmd.x, cmd.y)}`;
    else if (cmd.type === 'C') d += `C${t(cmd.x1, cmd.y1)} ${t(cmd.x2, cmd.y2)} ${t(cmd.x, cmd.y)}`;
    else if (cmd.type === 'Z') d += 'Z';
  }
  entries[ch] = d;
}

const js = `/**
 * 注音符號 SVG 路徑（自教育部標準楷書字型烘焙，viewBox 0 0 ${SIZE} ${SIZE}）
 * 由 scripts/gen-zhuyin-svg.mjs 產生，請勿手改。
 */
export const ZHUYIN_VIEWBOX = '0 0 ${SIZE} ${SIZE}';
export const ZHUYIN_PATHS = ${JSON.stringify(entries, null, 0)};
`;
writeFileSync(OUT, js);
console.log(`✅ 已產生 ${Object.keys(entries).length} 個注音 SVG path → ${OUT}`);
