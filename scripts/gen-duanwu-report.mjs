#!/usr/bin/env node
/**
 * 產端午題庫設計報告 HTML（persistent + read-only artifact，進 docs/）。
 * 讀 report-data.json，輸出 docs/superpowers/duanwu-bank-build/report.html。
 * 單檔 self-contained：inline CSS + inline SVG 漏斗圖。
 */
import { readFileSync, writeFileSync } from 'node:fs'

const d = JSON.parse(readFileSync('docs/superpowers/duanwu-bank-build/report-data.json', 'utf8'))
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const CHAPTER_LABEL = {
  quyuan: '汨羅江畔（屈原本人＋同時代對照）',
  boat: '划龍舟（習俗由來）',
  zongzi: '包粽子＋避邪＋科學破迷思',
  poem: '詩詞關',
  king: '端午王（綜合最冷＋台灣在地）',
}
const CHAPTER_ORDER = ['quyuan', 'boat', 'zongzi', 'poem', 'king']

// ---- 濃縮漏斗 SVG（explanation 型：圖本身是敘事主體）----------------------
const stages = [
  { label: '原始池', n: d.counts.raw, sub: '5 chapter 並行廣建' },
  { label: '輪 1 史實後', n: d.counts.afterRound1, sub: '145 pass · 5 fix · 0 cut' },
  { label: '輪 2 品質後', n: d.counts.afterRound2, sub: '113 keep · 28 polish · 9 drop' },
  { label: '最終題庫', n: d.counts.final, sub: '輪 3 配額收斂' },
]
const maxN = stages[0].n
const funnelW = 720
const rowH = 96
const funnel = stages
  .map((s, i) => {
    const w = (s.n / maxN) * funnelW
    const x = (funnelW - w) / 2 + 40
    const y = 20 + i * rowH
    const colors = ['#3FA7C4', '#5BA86B', '#C97B3A', '#E5544A']
    return `
    <g>
      <rect x="${x.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="64" rx="14"
            fill="${colors[i]}" opacity="0.92"/>
      <text x="${(funnelW / 2 + 40).toFixed(1)}" y="${y + 30}" text-anchor="middle"
            font-size="26" font-weight="700" fill="#fff">${s.n} 題</text>
      <text x="${(funnelW / 2 + 40).toFixed(1)}" y="${y + 52}" text-anchor="middle"
            font-size="13" fill="#fff" opacity="0.92">${esc(s.label)} · ${esc(s.sub)}</text>
      ${
        i < stages.length - 1
          ? `<text x="${(funnelW / 2 + 40).toFixed(1)}" y="${y + 82}" text-anchor="middle" font-size="13" fill="#7a6a55">↓ 砍 ${s.n - stages[i + 1].n} 題</text>`
          : ''
      }
    </g>`
  })
  .join('')
const funnelSvg = `<svg viewBox="0 0 ${funnelW + 80} ${20 + stages.length * rowH}" width="100%" role="img" aria-label="題目濃縮漏斗：150→150→141→89">${funnel}</svg>`

// ---- 長條：難度分佈 / 軸覆蓋 ---------------------------------------------
function barRow(label, n, max, color) {
  const w = (n / max) * 100
  return `<div class="bar-row"><span class="bar-label">${esc(label)}</span>
    <span class="bar-track"><span class="bar-fill" style="width:${w.toFixed(1)}%;background:${color}"></span></span>
    <span class="bar-n">${n}</span></div>`
}
const diffMax = Math.max(...Object.values(d.difficultyCounts))
const diffBars = [1, 2, 3, 4, 5]
  .map((lv) => barRow(`難度 ${lv}`, d.difficultyCounts[lv] || 0, diffMax, '#5BA86B'))
  .join('')
const axisMax = Math.max(...Object.values(d.axisCount))
const axisBars = Object.entries(d.axisCount)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => barRow(k, v, axisMax, '#3FA7C4'))
  .join('')
const chapMax = Math.max(...Object.values(d.chapterCounts))
const chapBars = CHAPTER_ORDER.map((c) =>
  barRow(`${c}（${CHAPTER_LABEL[c].split('（')[0]}）`, d.chapterCounts[c] || 0, chapMax, '#C97B3A')
).join('')

// ---- 審查判定卡（fix / drop）---------------------------------------------
const fixCards = d.fixList
  .map(
    (f) => `<div class="verdict-card fix">
    <div class="vc-head"><span class="tag tag-fix">FIX</span><code>${esc(f.pid)}</code>${f.checkedOnline ? '<span class="tag tag-online">線上查證</span>' : ''}</div>
    <p>${esc(f.reason)}</p></div>`
  )
  .join('')
const dropCards = d.dropList
  .map(
    (f) => `<div class="verdict-card drop">
    <div class="vc-head"><span class="tag tag-drop">DROP</span><code>${esc(f.pid)}</code>
      <span class="score">fun ${f.funScore}/5 · 誘答 ${f.distractorScore}/5</span>
      ${f.dupOf ? `<span class="tag tag-dup">重複於 ${esc(f.dupOf)}</span>` : ''}</div>
    <p>${esc(f.reason)}</p></div>`
  )
  .join('')

// ---- 各 chapter 入選題表 --------------------------------------------------
function qRow(q) {
  const opts = q.options
    .map((o) => (o === q.answerText ? `<b>${esc(o)}</b>` : esc(o)))
    .join(' · ')
  return `<tr>
    <td class="diff d${q.difficulty}">${q.difficulty}</td>
    <td class="axis">${esc(q.axis)}</td>
    <td class="q">${esc(q.question)}<div class="opts">${opts}</div>
      <div class="fun">${esc(q.fun)}</div>
      <div class="src">來源：${esc(q.source)}</div></td>
    <td class="sc">${q.funScore ?? '–'}/${q.distractorScore ?? '–'}</td>
  </tr>`
}
const chapterSections = CHAPTER_ORDER.map((c) => {
  const qs = d.byChapter[c].slice().sort((a, b) => a.difficulty - b.difficulty)
  return `<details class="chapter"${c === 'quyuan' ? ' open' : ''}>
    <summary><span class="chap-key">${c}</span> ${esc(CHAPTER_LABEL[c])} <span class="chap-n">${qs.length} 題</span></summary>
    <table class="qtable"><thead><tr><th>難</th><th>軸</th><th>題目 / 選項（粗體為正解）/ fun / 來源</th><th>fun/誘答</th></tr></thead>
    <tbody>${qs.map(qRow).join('')}</tbody></table>
  </details>`
}).join('')

const notesList = d.notes.map((n) => `<li>${esc(n)}</li>`).join('')

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>端午王 event 題庫設計報告</title>
<style>
  :root{
    --reed:#5BA86B; --reed-deep:#3E8A52; --river:#3FA7C4; --zong:#C97B3A; --cinnabar:#E5544A;
    --ink:#3a2e22; --muted:#7a6a55; --paper:#fbf7ef; --card:#fff; --line:#e7ddc9;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--paper);color:var(--ink);
    font-family:"PingFang TC","Noto Sans TC","Microsoft JhengHei",system-ui,sans-serif;
    line-height:1.65;font-size:15px}
  .wrap{max-width:960px;margin:0 auto;padding:32px 20px 80px}
  header{text-align:center;padding:28px 0 8px}
  h1{font-size:30px;margin:0 0 6px;color:var(--reed-deep)}
  .lede{color:var(--muted);margin:0 auto;max-width:680px}
  h2{font-size:21px;margin:44px 0 14px;padding-bottom:8px;border-bottom:2px solid var(--reed);color:var(--reed-deep)}
  h3{font-size:16px;margin:24px 0 10px;color:var(--zong)}
  .kpis{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:18px 0}
  .kpi{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:14px 22px;text-align:center;min-width:120px}
  .kpi .big{font-size:28px;font-weight:800;color:var(--river)}
  .kpi .lab{font-size:12px;color:var(--muted);margin-top:2px}
  .funnel{background:var(--card);border:1px solid var(--line);border-radius:20px;padding:16px}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:24px}
  @media(max-width:680px){.grid2{grid-template-columns:1fr}}
  .panel{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px}
  .bar-row{display:flex;align-items:center;gap:10px;margin:7px 0;font-size:13px}
  .bar-label{flex:0 0 120px;color:var(--muted)}
  .bar-track{flex:1;background:#f0e8d8;border-radius:8px;height:18px;overflow:hidden}
  .bar-fill{display:block;height:100%;border-radius:8px}
  .bar-n{flex:0 0 32px;text-align:right;font-variant-numeric:tabular-nums;font-weight:700}
  .verdict-card{border:1px solid var(--line);border-radius:14px;padding:12px 14px;margin:10px 0;background:var(--card)}
  .verdict-card.fix{border-left:4px solid var(--zong)}
  .verdict-card.drop{border-left:4px solid var(--cinnabar)}
  .vc-head{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px}
  .verdict-card p{margin:0;font-size:13.5px;color:#52443490}
  .verdict-card p{color:#4a3c2c}
  code{background:#f0e8d8;border-radius:6px;padding:1px 7px;font-size:12.5px;color:var(--reed-deep)}
  .tag{font-size:11px;font-weight:700;border-radius:20px;padding:2px 9px;color:#fff}
  .tag-fix{background:var(--zong)} .tag-drop{background:var(--cinnabar)}
  .tag-online{background:var(--river)} .tag-dup{background:var(--muted)}
  .score{font-size:12px;color:var(--muted)}
  details.chapter{background:var(--card);border:1px solid var(--line);border-radius:16px;margin:12px 0;overflow:hidden}
  details.chapter summary{cursor:pointer;padding:14px 18px;font-size:15px;font-weight:700;list-style:none;display:flex;align-items:center;gap:10px}
  details.chapter summary::-webkit-details-marker{display:none}
  .chap-key{font-family:monospace;font-size:12px;background:var(--reed);color:#fff;border-radius:6px;padding:2px 8px}
  .chap-n{margin-left:auto;font-size:12px;color:var(--muted);font-weight:500}
  table.qtable{width:100%;border-collapse:collapse;font-size:13px}
  .qtable th{background:#f4eedf;text-align:left;padding:8px 10px;font-size:12px;color:var(--muted);border-bottom:1px solid var(--line)}
  .qtable td{padding:10px;border-bottom:1px solid #f0e8d8;vertical-align:top}
  .qtable td.diff{font-weight:800;text-align:center;width:30px;border-radius:0}
  .d1{color:#3FA7C4}.d2{color:#5BA86B}.d3{color:#C2922A}.d4{color:#D97A2F}.d5{color:#E5544A}
  td.axis{width:74px;color:var(--muted);font-size:12px}
  td.q b{color:var(--reed-deep)}
  .opts{margin-top:5px;color:#6a5a44;font-size:12.5px}
  .fun{margin-top:6px;background:#f4f8f2;border-radius:8px;padding:6px 10px;font-size:12.5px;color:#3c5a3c}
  .src{margin-top:4px;font-size:11px;color:#9a8a72}
  td.sc{width:54px;text-align:center;font-variant-numeric:tabular-nums;color:var(--muted);font-size:12px}
  ul.notes{padding-left:20px}ul.notes li{margin:8px 0;font-size:13.5px}
  .rationale{background:#f4f8f2;border-left:4px solid var(--reed);border-radius:0 12px 12px 0;padding:14px 18px;font-size:14px}
  footer{text-align:center;color:var(--muted);font-size:12px;margin-top:50px}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>端午王 event 題庫設計報告</h1>
    <p class="lede">Session B 交付物。150 題廣建 → 三輪獨立審查濃縮 → ${d.counts.final} 題定案。
    全 <code>kind:'fact'</code> 端午史實 fun fact 知識題，品管走史實人工核（非字音 audit）。</p>
  </header>

  <div class="kpis">
    <div class="kpi"><div class="big">${d.counts.raw}</div><div class="lab">原始池</div></div>
    <div class="kpi"><div class="big">${d.counts.final}</div><div class="lab">最終題數</div></div>
    <div class="kpi"><div class="big">${d.factStats.online}</div><div class="lab">線上查證題（輪1）</div></div>
    <div class="kpi"><div class="big">5</div><div class="lab">chapter（各 ≥10）</div></div>
    <div class="kpi"><div class="big">8</div><div class="lab">取材軸全覆蓋</div></div>
  </div>

  <h2>1 · 三輪濃縮漏斗</h2>
  <div class="funnel">${funnelSvg}</div>
  <p class="lede" style="margin-top:12px">三輪皆獨立 fan-out 審查（multi-agent workflow）：輪 1 只查史實、輪 2 只評趣味與重複、輪 3 看全池配額收斂。每輪判定全程留存於 <code>workflow-result.json</code>。</p>

  <h2>2 · 審查方法論</h2>
  <div class="grid2">
    <div class="panel">
      <h3 style="margin-top:0;color:var(--reed-deep)">輪 1 — 史實查證</h3>
      <p style="font-size:13.5px;margin:6px 0 10px;color:var(--muted)">目標：絕不教小孩錯史實。破迷思／跨時代／地理／台灣在地題實際 WebSearch/WebFetch 查官方來源。</p>
      ${barRow('pass 史實正確', d.factStats.pass, d.counts.raw, '#5BA86B')}
      ${barRow('fix 修正事實錯誤', d.factStats.fix, d.counts.raw, '#C97B3A')}
      ${barRow('cut 誤傳砍除', d.factStats.cut, d.counts.raw, '#E5544A')}
      ${barRow('其中線上查證', d.factStats.online, d.counts.raw, '#3FA7C4')}
    </div>
    <div class="panel">
      <h3 style="margin-top:0;color:var(--reed-deep)">輪 2 — fun fact 品質＋去重</h3>
      <p style="font-size:13.5px;margin:6px 0 10px;color:var(--muted)">史實已過，本輪只評「講給朋友會不會哦一聲」＋誘答有沒有梗＋是否重複。</p>
      ${barRow('keep 好題直留', d.funStats.keep, d.counts.afterRound1, '#5BA86B')}
      ${barRow('polish 打磨', d.funStats.polish, d.counts.afterRound1, '#C97B3A')}
      ${barRow('drop 平庸/重複', d.funStats.drop, d.counts.afterRound1, '#E5544A')}
      ${barRow('其中標記重複', d.funStats.dup, d.counts.afterRound1, '#7a6a55')}
    </div>
  </div>

  <h3>輪 1 抓到並修正的史實錯誤（${d.fixList.length} 題）</h3>
  <p style="font-size:13px;color:var(--muted)">這些正是 spec §1.2 警告的「冷知識易誤傳」陷阱——若靠記憶不查證會教錯小孩。</p>
  ${fixCards}

  <h3>輪 2 剔除的弱題／重複（${d.dropList.length} 題）</h3>
  ${dropCards}

  <h2>3 · 最終題庫分佈</h2>
  <div class="grid2">
    <div class="panel"><h3 style="margin-top:0">各關題數（每關 ≥10 確保選滿）</h3>${chapBars}</div>
    <div class="panel"><h3 style="margin-top:0">難度＝驚奇度梯度</h3>${diffBars}</div>
  </div>
  <div class="panel" style="margin-top:24px"><h3 style="margin-top:0">取材軸覆蓋（8 軸全有代表）</h3>
    <p style="font-size:13px;color:var(--muted);margin-top:0">同時代對照／科學破迷思／台灣在地三個 user 特別指定的軸都有足量題。</p>
    ${axisBars}</div>

  <h2>4 · 收斂取捨總述（輪 3）</h2>
  <div class="rationale">${esc(d.rationale)}</div>
  <h3>逐關覆蓋備註</h3>
  <ul class="notes">${notesList}</ul>

  <h2>5 · 最終題庫全覽（依關卡，難度排序）</h2>
  <p class="lede" style="margin-bottom:6px">展開各關看入選題。fun/誘答欄為輪 2 評分（1-5）。粗體為正解，引擎洗牌後呈現。</p>
  ${chapterSections}

  <footer>
    由 build-duanwu-bank workflow（26 agents）生成 · 資料源 workflow-result.json ·
    端午王 event 設計 spec：docs/superpowers/specs/2026-06-17-duanwu-king-event-design.md
  </footer>
</div>
</body>
</html>`

writeFileSync('docs/superpowers/duanwu-bank-build/report.html', html)
console.log(`report.html written (${(html.length / 1024).toFixed(1)} KB)`)
