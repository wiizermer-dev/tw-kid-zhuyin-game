/**
 * 把審題結果（review-report.json）產成給人看的 HTML 報告，依審題員分組。
 *
 * 用法：
 *   node scripts/fetch-reviews.mjs --json review-report.json   # 先拉雲端資料
 *   node scripts/build-review-report.mjs                        # 產 review-report.html
 *
 * 產物 review-report.html 為 ephemeral（可隨時 regenerate），不進 git。
 * 資料嵌在 <script type="application/json">，渲染走 client JS（textContent，無 XSS）。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { REVIEW_VERDICTS } from '../src/lib/review.js';

const report = JSON.parse(readFileSync(new URL('../review-report.json', import.meta.url), 'utf8'));

// 轉置：question 視角 → reviewer 視角
const byReviewer = new Map();
for (const q of report.questions) {
  for (const r of q.reviewers) {
    const name = r.name || '匿名';
    if (!byReviewer.has(name)) byReviewer.set(name, []);
    byReviewer.get(name).push({
      qid: q.id, text: q.text, zhuyin: q.zhuyin, difficulty: q.difficulty,
      category: q.category, verdict: r.verdict, note: r.note ?? null, at: r.at
    });
  }
}

const disputed = report.questions
  .filter((q) => Object.values(q.verdicts).filter(Boolean).length > 1 ||
                 (q.verdicts.pass > 0 && q.issueReviews > 0))
  .filter((q) => Object.entries(q.verdicts).filter(([, v]) => v > 0).length > 1);

const data = {
  fetchedAt: report.fetchedAt,
  totalRows: report.totalRows,
  coveredQuestions: report.questions.length,
  verdictMeta: Object.fromEntries(Object.entries(REVIEW_VERDICTS).map(([k, v]) => [k, v.label])),
  totals: Object.keys(REVIEW_VERDICTS).reduce((acc, k) => {
    acc[k] = report.questions.reduce((s, q) => s + (q.verdicts[k] ?? 0), 0);
    return acc;
  }, {}),
  reviewers: [...byReviewer.entries()]
    .map(([name, items]) => ({ name, items: items.sort((a, b) => a.qid.localeCompare(b.qid)) }))
    .sort((a, b) => b.items.length - a.items.length),
  disputed: disputed.map((q) => ({
    qid: q.id, text: q.text, zhuyin: q.zhuyin, difficulty: q.difficulty,
    verdicts: q.verdicts,
    reviewers: q.reviewers.map((r) => ({ name: r.name || '匿名', verdict: r.verdict, note: r.note ?? null }))
  }))
};

const html = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>審題報告 — 注音王</title>
<style>
  :root {
    --paper: #FFF7E8; --paper-2: #FFE9F0; --card: #FFFDF7;
    --ink: #3D2C29; --ink-soft: #8a7a72; --line: #EADFD3;
    --red: #E5484D; --red-soft: #FF6B6B;
    --green: #7BC96F; --green-deep: #4d9944;
    --amber: #FFB347; --amber-deep: #c77f1b;
    --grape: #A78BFA; --mint: #2BB3A9;
    --kai: 'TW-Kai', 'BiauKai', 'Kaiti TC', 'DFKai-SB', serif;
    --sans: 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: var(--ink); font: 15px/1.75 var(--sans);
    background:
      repeating-linear-gradient(transparent 0 30px, rgba(229,72,77,.045) 30px 31px),
      linear-gradient(160deg, var(--paper) 0%, var(--paper-2) 100%);
    background-attachment: fixed;
  }
  .wrap { max-width: 920px; margin: 0 auto; padding: 3rem 1.25rem 4rem; }

  /* ── 卷頭：批改卷風格 ── */
  header.hero { position: relative; margin-bottom: 2.4rem; }
  .hero-rule { border-left: 5px double var(--red); padding-left: 1.1rem; }
  h1 { font-family: var(--kai); font-size: clamp(1.9rem, 5vw, 2.7rem); margin: 0; letter-spacing: .08em; }
  h1 .zy { color: var(--red); }
  .hero-sub { color: var(--ink-soft); margin: .35rem 0 0; font-size: .92rem; }
  .stamp {
    position: absolute; right: 0; top: -.6rem; transform: rotate(7deg);
    font-family: var(--kai); color: var(--red); border: 3px solid var(--red);
    border-radius: 10px; padding: .15rem .8rem; font-size: 1.15rem; letter-spacing: .25em;
    opacity: .82; background: rgba(255,255,255,.5);
  }

  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: .8rem; margin: 1.6rem 0 0; }
  .stat {
    background: var(--card); border: 1.5px solid var(--line); border-radius: 14px;
    padding: .85rem 1rem; box-shadow: 0 3px 0 var(--line);
  }
  .stat b { display: block; font-size: 1.7rem; font-family: var(--kai); line-height: 1.2; }
  .stat span { color: var(--ink-soft); font-size: .8rem; }

  /* ── 結論分布 ── */
  h2 { font-family: var(--kai); font-size: 1.45rem; letter-spacing: .06em; margin: 2.6rem 0 .9rem; }
  h2::before { content: '◆'; color: var(--red); margin-right: .45rem; font-size: .85em; }
  .dist-bar { display: flex; height: 30px; border-radius: 999px; overflow: hidden; border: 1.5px solid var(--line); background: #fff; }
  .dist-bar i { display: block; height: 100%; }
  .legend { display: flex; flex-wrap: wrap; gap: .35rem .95rem; margin-top: .6rem; font-size: .82rem; color: var(--ink-soft); }
  .legend .dot { display: inline-block; width: 11px; height: 11px; border-radius: 3px; margin-right: .35rem; vertical-align: -1px; }

  /* ── 審題員成績單 ── */
  .reviewer {
    background: var(--card); border: 1.5px solid var(--line); border-radius: 18px;
    box-shadow: 0 4px 0 var(--line); padding: 1.3rem 1.4rem 1.1rem; margin: 1.2rem 0;
  }
  .rv-head { display: flex; align-items: baseline; gap: .8rem; flex-wrap: wrap; }
  .rv-name { font-family: var(--kai); font-size: 1.5rem; letter-spacing: .05em; }
  .rv-meta { color: var(--ink-soft); font-size: .85rem; }
  .rv-strict {
    margin-left: auto; font-family: var(--kai); font-size: .95rem;
    color: var(--red); border-bottom: 2px dotted var(--red);
  }
  .rv-bars { display: flex; flex-wrap: wrap; gap: .4rem .9rem; margin: .8rem 0 .3rem; font-size: .82rem; }
  .rv-bars .vb { display: flex; align-items: center; gap: .4rem; color: var(--ink-soft); }
  .rv-bars .vb i { display: inline-block; height: 9px; border-radius: 99px; min-width: 4px; }

  .notes { margin-top: .8rem; }
  .note-item {
    border-left: 3.5px solid var(--red-soft); background: rgba(255,107,107,.06);
    border-radius: 0 10px 10px 0; padding: .5rem .85rem; margin: .5rem 0; font-size: .9rem;
  }
  .note-item .q { font-weight: 700; }
  .note-item .q small { color: var(--ink-soft); font-weight: 400; margin-left: .4rem; }
  .note-item .remark { font-family: var(--kai); color: var(--red); margin-top: .1rem; }
  .note-item .remark::before { content: '批：'; }

  details { margin-top: .9rem; border-top: 1.5px dashed var(--line); padding-top: .7rem; }
  summary { cursor: pointer; color: var(--mint); font-weight: 700; font-size: .88rem; }
  summary:hover { text-decoration: underline; }
  table { border-collapse: collapse; width: 100%; margin-top: .7rem; font-size: .85rem; }
  th, td { border: 1px solid var(--line); padding: .35rem .6rem; text-align: left; }
  th { background: rgba(255,179,71,.12); font-family: var(--kai); font-weight: 400; letter-spacing: .1em; }
  td.v { white-space: nowrap; }
  .chip { display: inline-block; border-radius: 999px; padding: .05rem .55rem; font-size: .78rem; color: #fff; }

  /* ── 分歧區 ── */
  .dispute {
    background: var(--card); border: 1.5px dashed var(--red-soft); border-radius: 14px;
    padding: .8rem 1rem; margin: .7rem 0; font-size: .9rem;
  }
  .dispute .dq { font-weight: 700; }
  .dispute .dq small { color: var(--ink-soft); font-weight: 400; margin-left: .4rem; }
  .dispute .who { color: var(--ink-soft); margin-top: .15rem; }
  .dispute .who .nm { font-family: var(--kai); color: var(--ink); }

  footer { margin-top: 3.2rem; color: var(--ink-soft); font-size: .8rem; border-top: 1.5px solid var(--line); padding-top: 1rem; }
  @media (max-width: 560px) { .stamp { display: none; } .rv-strict { margin-left: 0; } }
</style>
</head>
<body>
<div class="wrap">
  <header class="hero">
    <div class="stamp">已 批 閱</div>
    <div class="hero-rule">
      <h1><span class="zy">ㄅㄆㄇ</span> 審題報告</h1>
      <p class="hero-sub" id="sub"></p>
    </div>
    <div class="stats" id="stats"></div>
  </header>

  <h2>全體結論分布</h2>
  <div class="dist-bar" id="dist"></div>
  <div class="legend" id="legend"></div>

  <h2>各審題員審理內容</h2>
  <div id="reviewers"></div>

  <h2>意見分歧題（多位審題員結論不同）</h2>
  <div id="disputes"></div>

  <footer id="foot"></footer>
</div>

<script type="application/json" id="data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
<script>
(() => {
  const D = JSON.parse(document.getElementById('data').textContent);
  const COLOR = { pass:'#7BC96F', below_level:'#FFB347', above_level:'#A78BFA',
                  wrong_answer:'#E5484D', not_needed:'#c77f1b', bad_design:'#FF6B6B' };
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  document.getElementById('sub').textContent =
    '好友審題團 ' + D.reviewers.length + ' 人 · 共 ' + D.totalRows + ' 筆審查 · 覆蓋 ' + D.coveredQuestions + ' 題';

  // 總覽
  const issues = Object.entries(D.totals).filter(([k]) => k !== 'pass').reduce((s, [,v]) => s + v, 0);
  const stats = [
    [D.totalRows, '審查總筆數'],
    [D.reviewers.length, '審題員'],
    [D.coveredQuestions, '覆蓋題數'],
    [D.totals.pass, '通過'],
    [issues, '非通過結論'],
    [D.disputed.length, '意見分歧題']
  ];
  const statsBox = document.getElementById('stats');
  for (const [num, label] of stats) {
    const s = el('div', 'stat'); s.append(el('b', null, String(num)), el('span', null, label));
    statsBox.append(s);
  }

  // 分布條
  const total = Object.values(D.totals).reduce((a, b) => a + b, 0) || 1;
  const dist = document.getElementById('dist'), legend = document.getElementById('legend');
  for (const [k, label] of Object.entries(D.verdictMeta)) {
    const v = D.totals[k] ?? 0; if (!v) continue;
    const seg = el('i'); seg.style.width = (v / total * 100) + '%'; seg.style.background = COLOR[k];
    seg.title = label + ' ' + v; dist.append(seg);
    const li = el('span');
    const dot = el('span', 'dot'); dot.style.background = COLOR[k];
    li.append(dot, document.createTextNode(label + ' ' + v + '（' + Math.round(v / total * 100) + '%）'));
    legend.append(li);
  }

  // 審題員成績單
  const box = document.getElementById('reviewers');
  for (const rv of D.reviewers) {
    const card = el('section', 'reviewer');
    const head = el('div', 'rv-head');
    const counts = {};
    for (const it of rv.items) counts[it.verdict] = (counts[it.verdict] ?? 0) + 1;
    const nonPass = rv.items.length - (counts.pass ?? 0);
    head.append(
      el('span', 'rv-name', rv.name),
      el('span', 'rv-meta', '審了 ' + rv.items.length + ' 題'),
      el('span', 'rv-strict', '嚴格度 ' + Math.round(nonPass / rv.items.length * 100) + '%')
    );
    card.append(head);

    // verdict mini bars
    const bars = el('div', 'rv-bars');
    const max = Math.max(...Object.values(counts));
    for (const [k, label] of Object.entries(D.verdictMeta)) {
      if (!counts[k]) continue;
      const vb = el('span', 'vb');
      const bar = el('i'); bar.style.width = (counts[k] / max * 70 + 6) + 'px'; bar.style.background = COLOR[k];
      vb.append(bar, document.createTextNode(label + ' ' + counts[k]));
      bars.append(vb);
    }
    card.append(bars);

    // 批注（有 note 的審理）
    const noted = rv.items.filter((it) => it.note);
    if (noted.length) {
      const nbox = el('div', 'notes');
      for (const it of noted) {
        const item = el('div', 'note-item');
        const q = el('div', 'q', it.qid + ' ' + it.text);
        const small = el('small', null, '正解 ' + it.zhuyin + ' · 難度 ' + it.difficulty + ' · ' + D.verdictMeta[it.verdict]);
        q.append(small);
        item.append(q, el('div', 'remark', it.note));
        nbox.append(item);
      }
      card.append(nbox);
    }

    // 全部非通過審理（收合表格）
    const flagged = rv.items.filter((it) => it.verdict !== 'pass');
    if (flagged.length) {
      const det = el('details');
      det.append(el('summary', null, '展開全部非通過審理（' + flagged.length + ' 筆）'));
      const tbl = el('table');
      const thead = el('tr');
      for (const h of ['題目', '正解', '難度', '結論', '批注']) thead.append(el('th', null, h));
      tbl.append(thead);
      for (const it of flagged) {
        const tr = el('tr');
        tr.append(el('td', null, it.qid + ' ' + it.text), el('td', null, it.zhuyin), el('td', null, String(it.difficulty ?? '?')));
        const tdv = el('td', 'v');
        const chip = el('span', 'chip', D.verdictMeta[it.verdict]); chip.style.background = COLOR[it.verdict];
        tdv.append(chip); tr.append(tdv);
        tr.append(el('td', null, it.note ?? ''));
        tbl.append(tr);
      }
      det.append(tbl);
      card.append(det);
    }
    box.append(card);
  }

  // 分歧題
  const dbox = document.getElementById('disputes');
  for (const q of D.disputed) {
    const d = el('div', 'dispute');
    const dq = el('div', 'dq', q.qid + ' ' + q.text);
    dq.append(el('small', null, '正解 ' + q.zhuyin + ' · 難度 ' + q.difficulty));
    const who = el('div', 'who');
    q.reviewers.forEach((r, i) => {
      if (i) who.append(document.createTextNode('；'));
      who.append(el('span', 'nm', r.name));
      who.append(document.createTextNode('：' + D.verdictMeta[r.verdict] + (r.note ? '（' + r.note + '）' : '')));
    });
    d.append(dq, who);
    dbox.append(d);
  }

  document.getElementById('foot').textContent =
    '資料來源：Supabase question_reviews（fetch-reviews.mjs 於 ' + D.fetchedAt + ' 拉取）· ' +
    '本報告由 scripts/build-review-report.mjs 產生，屬可重複 regenerate 的快照，不進版本控制。';
})();
</script>
</body>
</html>
`;

writeFileSync(new URL('../review-report.html', import.meta.url), html);
console.log('review-report.html 已產出（', data.reviewers.length, '位審題員、', data.totalRows, '筆審查）');
