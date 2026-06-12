-- 你ㄅㄆㄇ有ㄅ級分ㄇ v4 — 審題模式（question_reviews）
-- 在 Supabase SQL Editor 執行（可獨立於 v2 runs / v3 question_stats 套用）
-- 設計沿用 v3：RLS 鎖直接寫入，前端一律走 SECURITY DEFINER RPC。
-- 同一審題員（browser_id）對同一題只留最新一筆結論（upsert），方便事後彙整。

create table if not exists question_reviews (
  id uuid primary key default gen_random_uuid(),
  browser_id text not null,           -- 審題員裝置 id（lib/backend.js browserId()）
  reviewer_name text,                 -- 審題員稱號（玩家名）
  question_id text not null,          -- 題目 id（對應 BANK 的 q.id，如 tk-180）
  word text not null,                 -- 詞彙（q.text）
  correct_answer text not null,       -- 題庫當下的正解注音（q.zhuyin）
  difficulty integer,                 -- 題庫當下標示的難度（1-5）
  verdict text not null check (verdict in (
    'pass', 'below_level', 'above_level', 'wrong_answer', 'not_needed', 'bad_design'
  )),
  note text,                          -- 補充說明（目前「題目設計不佳」會附）
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (browser_id, question_id)
);

-- 彙整查詢：依題目聚合各結論數
create index if not exists question_reviews_question on question_reviews (question_id);

alter table question_reviews enable row level security;

-- 只允許讀取；寫入一律走 RPC（SECURITY DEFINER 繞過 RLS），前端無法直接竄改
drop policy if exists "question_reviews read" on question_reviews;
create policy "question_reviews read" on question_reviews for select using (true);

drop policy if exists "question_reviews no direct insert" on question_reviews;
create policy "question_reviews no direct insert" on question_reviews for insert with check (false);

drop policy if exists "question_reviews no direct update" on question_reviews;
create policy "question_reviews no direct update" on question_reviews for update using (false);

-- 寫入一筆審查結論（同人同題 upsert 成最新結論）
drop function if exists record_question_review(text, text, text, text, text, integer, text);
drop function if exists record_question_review(text, text, text, text, text, integer, text, text);
create or replace function record_question_review(
  p_browser_id text,
  p_reviewer_name text,
  p_question_id text,
  p_word text,
  p_correct_answer text,
  p_difficulty integer,
  p_verdict text,
  p_note text default null
) returns void
security definer
set search_path = public
as $$
begin
  insert into question_reviews (browser_id, reviewer_name, question_id, word, correct_answer, difficulty, verdict, note)
  values (p_browser_id, p_reviewer_name, p_question_id, p_word, p_correct_answer, p_difficulty, p_verdict, nullif(trim(p_note), ''))
  on conflict (browser_id, question_id) do update set
    reviewer_name = excluded.reviewer_name,
    word = excluded.word,
    correct_answer = excluded.correct_answer,
    difficulty = excluded.difficulty,
    verdict = excluded.verdict,
    note = excluded.note,
    updated_at = now();
end;
$$ language plpgsql;
