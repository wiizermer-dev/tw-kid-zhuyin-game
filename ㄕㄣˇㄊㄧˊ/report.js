/** 審題報告 hosted page（/ㄕㄣˇㄊㄧˊ/）— 從 Supabase 拉活資料、依審題員分組渲染。
 * 與 scripts/build-review-report.mjs（離線快照版）呈現一致；本頁永遠顯示最新審查。 */
import { supabase, hasCloud } from '../src/lib/backend.js';
import { REVIEW_VERDICTS } from '../src/lib/review.js';
import { BANK } from '../src/data/bank/index.js';

const COLOR = {
  pass: '#7BC96F', below_level: '#FFB347', above_level: '#A78BFA',
  wrong_answer: '#E5484D', not_needed: '#c77f1b', bad_design: '#FF6B6B'
};

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

/** 分頁抓整張表（Supabase 單次預設上限 1000 筆） */
async function fetchAllReviews() {
  const PAGE = 1000;
  const rows = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from('question_reviews')
      .select('reviewer_name, question_id, word, correct_answer, difficulty, verdict, note, updated_at')
      .order('updated_at', { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(error.message);
    rows.push(...data);
    if (data.length < PAGE) return rows;
  }
}

function aggregate(rows) {
  const bankById = new Map(BANK.map((q) => [q.id, q]));
  const byReviewer = new Map();
  const byQuestion = new Map();

  for (const r of rows) {
    const name = r.reviewer_name || '匿名';
    const bankQ = bankById.get(r.question_id);
    const item = {
      qid: r.question_id,
      text: bankQ?.text ?? r.word,
      zhuyin: bankQ?.zhuyin ?? r.correct_answer,
      difficulty: bankQ?.difficulty ?? r.difficulty,
      verdict: r.verdict, note: r.note ?? null
    };
    if (!byReviewer.has(name)) byReviewer.set(name, []);
    byReviewer.get(name).push(item);
    if (!byQuestion.has(r.question_id)) byQuestion.set(r.question_id, []);
    byQuestion.get(r.question_id).push({ name, ...item });
  }

  const totals = Object.fromEntries(Object.keys(REVIEW_VERDICTS).map((k) => [k, 0]));
  for (const r of rows) totals[r.verdict] = (totals[r.verdict] ?? 0) + 1;

  const disputed = [...byQuestion.values()]
    .filter((revs) => new Set(revs.map((r) => r.verdict)).size > 1)
    .map((revs) => ({ ...revs[0], reviewers: revs }));

  return {
    totals,
    coveredQuestions: byQuestion.size,
    reviewers: [...byReviewer.entries()]
      .map(([name, items]) => ({ name, items: items.sort((a, b) => a.qid.localeCompare(b.qid)) }))
      .sort((a, b) => b.items.length - a.items.length),
    disputed
  };
}

function render(rows, agg) {
  document.getElementById('sub').textContent =
    `好友審題團 ${agg.reviewers.length} 人 · 共 ${rows.length} 筆審查 · 覆蓋 ${agg.coveredQuestions} 題（題庫 ${BANK.length} 題）`;

  const issues = Object.entries(agg.totals).filter(([k]) => k !== 'pass').reduce((s, [, v]) => s + v, 0);
  const statsBox = document.getElementById('stats');
  for (const [num, label] of [
    [rows.length, '審查總筆數'], [agg.reviewers.length, '審題員'], [agg.coveredQuestions, '覆蓋題數'],
    [agg.totals.pass, '通過'], [issues, '非通過結論'], [agg.disputed.length, '意見分歧題']
  ]) {
    const s = el('div', 'stat');
    s.append(el('b', null, String(num)), el('span', null, label));
    statsBox.append(s);
  }

  const total = Object.values(agg.totals).reduce((a, b) => a + b, 0) || 1;
  const dist = document.getElementById('dist');
  const legend = document.getElementById('legend');
  for (const [k, meta] of Object.entries(REVIEW_VERDICTS)) {
    const v = agg.totals[k] ?? 0;
    if (!v) continue;
    const seg = el('i');
    seg.style.width = `${(v / total) * 100}%`;
    seg.style.background = COLOR[k];
    seg.title = `${meta.label} ${v}`;
    dist.append(seg);
    const li = el('span');
    const dot = el('span', 'dot');
    dot.style.background = COLOR[k];
    li.append(dot, document.createTextNode(`${meta.label} ${v}（${Math.round((v / total) * 100)}%）`));
    legend.append(li);
  }

  const box = document.getElementById('reviewers');
  for (const rv of agg.reviewers) {
    const card = el('section', 'reviewer');
    const counts = {};
    for (const it of rv.items) counts[it.verdict] = (counts[it.verdict] ?? 0) + 1;
    const nonPass = rv.items.length - (counts.pass ?? 0);

    const head = el('div', 'rv-head');
    head.append(
      el('span', 'rv-name', rv.name),
      el('span', 'rv-meta', `審了 ${rv.items.length} 題`),
      el('span', 'rv-strict', `嚴格度 ${Math.round((nonPass / rv.items.length) * 100)}%`)
    );
    card.append(head);

    const bars = el('div', 'rv-bars');
    const max = Math.max(...Object.values(counts));
    for (const [k, meta] of Object.entries(REVIEW_VERDICTS)) {
      if (!counts[k]) continue;
      const vb = el('span', 'vb');
      const bar = el('i');
      bar.style.width = `${(counts[k] / max) * 70 + 6}px`;
      bar.style.background = COLOR[k];
      vb.append(bar, document.createTextNode(`${meta.label} ${counts[k]}`));
      bars.append(vb);
    }
    card.append(bars);

    const noted = rv.items.filter((it) => it.note);
    if (noted.length) {
      const nbox = el('div', 'notes');
      for (const it of noted) {
        const item = el('div', 'note-item');
        const q = el('div', 'q', `${it.qid} ${it.text}`);
        q.append(el('small', null, `正解 ${it.zhuyin} · 難度 ${it.difficulty} · ${REVIEW_VERDICTS[it.verdict].label}`));
        item.append(q, el('div', 'remark', it.note));
        nbox.append(item);
      }
      card.append(nbox);
    }

    const flagged = rv.items.filter((it) => it.verdict !== 'pass');
    if (flagged.length) {
      const det = el('details');
      det.append(el('summary', null, `展開全部非通過審理（${flagged.length} 筆）`));
      const tbl = el('table');
      const thead = el('tr');
      for (const h of ['題目', '正解', '難度', '結論', '批注']) thead.append(el('th', null, h));
      tbl.append(thead);
      for (const it of flagged) {
        const tr = el('tr');
        tr.append(
          el('td', null, `${it.qid} ${it.text}`),
          el('td', null, it.zhuyin),
          el('td', null, String(it.difficulty ?? '?'))
        );
        const tdv = el('td', 'v');
        const chip = el('span', 'chip', REVIEW_VERDICTS[it.verdict].label);
        chip.style.background = COLOR[it.verdict];
        tdv.append(chip);
        tr.append(tdv, el('td', null, it.note ?? ''));
        tbl.append(tr);
      }
      det.append(tbl);
      card.append(det);
    }
    box.append(card);
  }

  const dbox = document.getElementById('disputes');
  for (const q of agg.disputed) {
    const d = el('div', 'dispute');
    const dq = el('div', 'dq', `${q.qid} ${q.text}`);
    dq.append(el('small', null, `正解 ${q.zhuyin} · 難度 ${q.difficulty}`));
    const who = el('div', 'who');
    q.reviewers.forEach((r, i) => {
      if (i) who.append(document.createTextNode('；'));
      who.append(el('span', 'nm', r.name));
      who.append(document.createTextNode(`：${REVIEW_VERDICTS[r.verdict].label}${r.note ? `（${r.note}）` : ''}`));
    });
    d.append(dq, who);
    dbox.append(d);
  }

  document.getElementById('foot').textContent =
    `資料來源：question_reviews 即時讀取（${new Date().toLocaleString('zh-TW')}）· 重新整理即更新`;
}

(async () => {
  const loading = document.getElementById('loading');
  try {
    if (!hasCloud) throw new Error('此部署未設定 Supabase，沒有審題資料可看');
    const rows = await fetchAllReviews();
    if (!rows.length) throw new Error('還沒有任何審題紀錄，先去遊戲首頁輸入通關密語審個幾題吧');
    loading.hidden = true;
    document.getElementById('content').hidden = false;
    render(rows, aggregate(rows));
  } catch (e) {
    loading.className = 'error';
    loading.textContent = `調卷失敗：${e.message}`;
  }
})();
