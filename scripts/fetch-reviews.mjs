/**
 * 拉雲端審題結論（question_reviews）並依題目彙整，產出題庫優化清單。
 *
 * 用法：node scripts/fetch-reviews.mjs [--json review-report.json]
 *   - .env 需有 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY（RLS 開放讀取，anon key 即可）
 *   - stdout 印「非通過題」彙整（依嚴重度排序），--json 另存完整報告供後續 session 處理
 *
 * 純唯讀，不改題庫。改題流程：看報告 → 回簡編本覆核 → 改 src/data/bank/* → validate + audit。
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { BANK } from '../src/data/bank/index.js';
import { REVIEW_VERDICTS, VERDICT_KEYS } from '../src/lib/review.js';

// 嚴重度排序：答案錯誤最優先處理
const SEVERITY = ['wrong_answer', 'bad_design', 'above_level', 'below_level', 'not_needed', 'pass'];

function loadEnv() {
  const env = { ...process.env };
  try {
    for (const line of readFileSync(new URL('../.env', import.meta.url), 'utf8').split('\n')) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && !(m[1] in env)) env[m[1]] = m[2];
    }
  } catch { /* 無 .env 時只看 process.env */ }
  return env;
}

const env = loadEnv();
const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error('缺 VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY（.env 或環境變數）');
  process.exit(1);
}

const res = await fetch(`${url}/rest/v1/question_reviews?select=*&order=updated_at.desc`, {
  headers: { apikey: key, authorization: `Bearer ${key}` }
});
if (!res.ok) {
  console.error(`question_reviews 讀取失敗：HTTP ${res.status} ${await res.text()}`);
  process.exit(1);
}
const rows = await res.json();

const bankById = new Map(BANK.map((q) => [q.id, q]));
const byQuestion = new Map();
for (const r of rows) {
  if (!byQuestion.has(r.question_id)) {
    byQuestion.set(r.question_id, { verdicts: Object.fromEntries(VERDICT_KEYS.map((k) => [k, 0])), reviewers: [] });
  }
  const agg = byQuestion.get(r.question_id);
  agg.verdicts[r.verdict] = (agg.verdicts[r.verdict] ?? 0) + 1;
  agg.reviewers.push({ name: r.reviewer_name, verdict: r.verdict, note: r.note ?? null, at: r.updated_at });
}

const report = [...byQuestion.entries()].map(([id, agg]) => {
  const q = bankById.get(id);
  const total = agg.reviewers.length;
  const issues = total - agg.verdicts.pass;
  // 主要問題 = 非通過結論中票數最多者（同票按嚴重度）
  const top = SEVERITY.filter((k) => k !== 'pass' && agg.verdicts[k] > 0)
    .sort((a, b) => agg.verdicts[b] - agg.verdicts[a] || SEVERITY.indexOf(a) - SEVERITY.indexOf(b))[0] ?? null;
  return {
    id,
    inBank: !!q,
    text: q?.text ?? agg.reviewers[0]?.word ?? '',
    zhuyin: q?.zhuyin ?? '',
    category: q?.category ?? '',
    difficulty: q?.difficulty ?? null,
    totalReviews: total,
    issueReviews: issues,
    topIssue: top,
    verdicts: agg.verdicts,
    reviewers: agg.reviewers
  };
});

const flagged = report
  .filter((r) => r.issueReviews > 0)
  .sort((a, b) =>
    SEVERITY.indexOf(a.topIssue) - SEVERITY.indexOf(b.topIssue) ||
    b.issueReviews - a.issueReviews
  );

console.log(`question_reviews 共 ${rows.length} 筆，覆蓋 ${byQuestion.size} 題（題庫 ${BANK.length} 題）`);
console.log(`需處理：${flagged.length} 題\n`);
for (const r of flagged) {
  const counts = SEVERITY.filter((k) => r.verdicts[k] > 0)
    .map((k) => `${REVIEW_VERDICTS[k].label}×${r.verdicts[k]}`)
    .join('、');
  console.log(`[${REVIEW_VERDICTS[r.topIssue].label}] ${r.id} ${r.text}（${r.zhuyin}）難度${r.difficulty ?? '?'} — ${counts}${r.inBank ? '' : '（題已不在題庫）'}`);
  for (const rev of r.reviewers) {
    if (rev.note) console.log(`    └ ${rev.name || '匿名'}：${rev.note}`);
  }
}

const jsonIdx = process.argv.indexOf('--json');
if (jsonIdx !== -1) {
  const out = process.argv[jsonIdx + 1] ?? 'review-report.json';
  writeFileSync(out, JSON.stringify({ fetchedAt: new Date().toISOString(), totalRows: rows.length, questions: report }, null, 2));
  console.log(`\n完整報告已存 ${out}`);
}
