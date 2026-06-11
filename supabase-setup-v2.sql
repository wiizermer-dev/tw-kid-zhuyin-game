-- 你ㄅㄆㄇ有ㄅ級分ㄇv2 雲端排行榜 schema
-- 在 Supabase SQL Editor 執行

create table if not exists runs (
  id uuid primary key default gen_random_uuid(),
  browser_id uuid not null,
  name text not null check (char_length(name) <= 24),
  score integer not null check (score >= 0 and score < 100000),
  mode text not null check (mode in ('daily', 'sprint', 'levels', 'duel')),
  room text,
  correct integer default 0,
  total integer default 0,
  max_combo integer default 0,
  created_at timestamptz default now()
);

create index if not exists runs_mode_score on runs (mode, score desc);
create index if not exists runs_room on runs (room) where room is not null;

alter table runs enable row level security;

create policy "anyone can read runs" on runs for select using (true);
create policy "anyone can insert runs" on runs for insert with check (true);
