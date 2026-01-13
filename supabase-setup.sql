-- ====================================
-- 注音遊戲排行榜 - Supabase SQL 設定
-- ====================================
-- 請在 Supabase Dashboard > SQL Editor 執行此 SQL

-- 1. 玩家表
CREATE TABLE players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    browser_id TEXT NOT NULL UNIQUE,  -- 瀏覽器 UUID
    name TEXT NOT NULL,
    room_code TEXT DEFAULT NULL,      -- 預留房間機制
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 成績表  
CREATE TABLE scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE UNIQUE,
    total_stars INT DEFAULT 0,        -- 總星星數
    max_level INT DEFAULT 1,          -- 最高關卡
    hard_mode_high_score INT DEFAULT 0, -- 困難模式最高分
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 題目統計表
CREATE TABLE question_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_id TEXT NOT NULL UNIQUE, -- 題目識別 (word_target)
    word TEXT NOT NULL,               -- 詞彙
    target_char TEXT,                 -- 目標字
    correct_answer TEXT NOT NULL,     -- 正確答案
    total_attempts INT DEFAULT 0,     -- 總嘗試次數
    wrong_attempts INT DEFAULT 0      -- 錯誤次數
);

-- 索引優化
CREATE INDEX idx_players_browser_id ON players(browser_id);
CREATE INDEX idx_scores_total_stars ON scores(total_stars DESC);
CREATE INDEX idx_scores_hard_mode ON scores(hard_mode_high_score DESC);

-- ====================================
-- Row Level Security (RLS) 設定
-- ====================================

-- 啟用 RLS
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_stats ENABLE ROW LEVEL SECURITY;

-- 允許匿名讀取（排行榜需要）
CREATE POLICY "Allow anonymous read players" ON players 
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read scores" ON scores 
    FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read question_stats" ON question_stats 
    FOR SELECT USING (true);

-- 允許匿名寫入（無登入系統）
CREATE POLICY "Allow anonymous insert players" ON players 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update players" ON players 
    FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous insert scores" ON scores 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update scores" ON scores 
    FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous all question_stats" ON question_stats 
    FOR ALL USING (true);

-- ====================================
-- RPC Function: 記錄答題統計
-- ====================================

CREATE OR REPLACE FUNCTION record_question_attempt(
    p_question_id TEXT,
    p_word TEXT,
    p_target_char TEXT,
    p_correct_answer TEXT,
    p_is_correct BOOLEAN
) RETURNS VOID AS $$
BEGIN
    INSERT INTO question_stats (question_id, word, target_char, correct_answer, total_attempts, wrong_attempts)
    VALUES (p_question_id, p_word, p_target_char, p_correct_answer, 1, CASE WHEN p_is_correct THEN 0 ELSE 1 END)
    ON CONFLICT (question_id) DO UPDATE SET
        total_attempts = question_stats.total_attempts + 1,
        wrong_attempts = question_stats.wrong_attempts + CASE WHEN p_is_correct THEN 0 ELSE 1 END;
END;
$$ LANGUAGE plpgsql;
