-- 你ㄅㄆㄇ有ㄅ級分ㄇ v3 — 全體玩家「最常錯題目」統計
-- 在 Supabase SQL Editor 執行（可獨立於 v2 runs schema 套用）
-- 設計沿用 v1 supabase-setup.sql / supabase-security-upgrade.sql 的 question_stats + RPC，
-- 但去除對 players/scores 的依賴，讓 v2 (runs) 環境也能單獨啟用。

create table if not exists question_stats (
  id uuid primary key default gen_random_uuid(),
  question_id text not null unique,   -- 題目 id（對應 BANK 的 q.id，如 tk-180）
  word text not null,                 -- 詞彙（q.text）
  target_char text,                   -- 考點字（q.target）
  correct_answer text not null,       -- 正確注音（q.zhuyin）
  total_attempts integer default 0,   -- 總作答次數
  wrong_attempts integer default 0    -- 答錯次數
);

-- 常錯榜查詢：先按錯誤率、再按錯誤次數排序（樣本數門檻在前端或 view 過濾）
create index if not exists question_stats_wrong on question_stats (wrong_attempts desc);

alter table question_stats enable row level security;

-- 只允許讀取；寫入一律走 RPC（SECURITY DEFINER 繞過 RLS），前端無法直接竄改
drop policy if exists "question_stats read" on question_stats;
create policy "question_stats read" on question_stats for select using (true);

drop policy if exists "question_stats no direct insert" on question_stats;
create policy "question_stats no direct insert" on question_stats for insert with check (false);

drop policy if exists "question_stats no direct update" on question_stats;
create policy "question_stats no direct update" on question_stats for update using (false);

-- 累計一題的作答結果（upsert）。答對只加 total，答錯 total + wrong 都加。
drop function if exists record_question_attempt(text, text, text, text, boolean);
create or replace function record_question_attempt(
  p_question_id text,
  p_word text,
  p_target_char text,
  p_correct_answer text,
  p_is_correct boolean
) returns void
security definer
set search_path = public
as $$
begin
  insert into question_stats (question_id, word, target_char, correct_answer, total_attempts, wrong_attempts)
  values (p_question_id, p_word, p_target_char, p_correct_answer, 1, case when p_is_correct then 0 else 1 end)
  on conflict (question_id) do update set
    total_attempts = question_stats.total_attempts + 1,
    wrong_attempts = question_stats.wrong_attempts + case when p_is_correct then 0 else 1 end;
end;
$$ language plpgsql;
