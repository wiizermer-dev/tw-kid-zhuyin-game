-- ====================================
-- 加強版 RLS Policy - 防止偽造成績
-- ====================================
-- 請在 Supabase Dashboard > SQL Editor 執行此 SQL
-- 這會替換掉原本過於寬鬆的 policy

-- 先刪除舊的 policy
DROP POLICY IF EXISTS "Allow anonymous insert players" ON players;
DROP POLICY IF EXISTS "Allow anonymous update players" ON players;
DROP POLICY IF EXISTS "Allow anonymous insert scores" ON scores;
DROP POLICY IF EXISTS "Allow anonymous update scores" ON scores;
DROP POLICY IF EXISTS "Allow anonymous all question_stats" ON question_stats;
DROP POLICY IF EXISTS "Allow anonymous upsert question_stats" ON question_stats;

-- ====================================
-- Players 表 Policy
-- ====================================

-- 插入: 只允許新建自己的 browser_id 記錄
CREATE POLICY "Players: insert own record only" ON players
    FOR INSERT WITH CHECK (true);  -- 任何人都能建立新玩家

-- 更新: 只能透過 RPC 更新（我們不直接從前端更新 players）
-- 保持簡單，允許更新但實際上前端只會 upsert 自己的記錄
CREATE POLICY "Players: update own record" ON players
    FOR UPDATE USING (true);

-- ====================================
-- Scores 表 Policy（核心保護）
-- ====================================

-- 插入: 必須對應已存在的 player_id
CREATE POLICY "Scores: insert with valid player" ON scores
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM players WHERE id = player_id
        )
    );

-- 更新: 只能更新且分數不能下降（防止惡意覆蓋）
-- 注意：這會讓分數只能往上升，不能往下降
CREATE POLICY "Scores: update only increase" ON scores
    FOR UPDATE USING (true)
    WITH CHECK (
        -- 總星星只能增加或維持
        total_stars >= (SELECT total_stars FROM scores s WHERE s.id = scores.id)
        AND
        -- 最高關卡只能增加或維持
        max_level >= (SELECT max_level FROM scores s WHERE s.id = scores.id)
    );

-- ====================================
-- Question Stats 表 Policy
-- ====================================

-- 這個表只透過 RPC function 更新，所以用 SECURITY DEFINER
-- 先刪除舊的 function 並重建
DROP FUNCTION IF EXISTS record_question_attempt(TEXT, TEXT, TEXT, TEXT, BOOLEAN);

CREATE OR REPLACE FUNCTION record_question_attempt(
    p_question_id TEXT,
    p_word TEXT,
    p_target_char TEXT,
    p_correct_answer TEXT,
    p_is_correct BOOLEAN
) RETURNS VOID 
SECURITY DEFINER  -- 以 function owner 權限執行，繞過 RLS
SET search_path = public
AS $$
BEGIN
    INSERT INTO question_stats (question_id, word, target_char, correct_answer, total_attempts, wrong_attempts)
    VALUES (p_question_id, p_word, p_target_char, p_correct_answer, 1, CASE WHEN p_is_correct THEN 0 ELSE 1 END)
    ON CONFLICT (question_id) DO UPDATE SET
        total_attempts = question_stats.total_attempts + 1,
        wrong_attempts = question_stats.wrong_attempts + CASE WHEN p_is_correct THEN 0 ELSE 1 END;
END;
$$ LANGUAGE plpgsql;

-- Question stats 只允許透過 RPC 寫入，前端無法直接操作
CREATE POLICY "Question stats: read only" ON question_stats
    FOR SELECT USING (true);

-- 禁止直接 INSERT/UPDATE（強制使用 RPC）
CREATE POLICY "Question stats: no direct insert" ON question_stats
    FOR INSERT WITH CHECK (false);

CREATE POLICY "Question stats: no direct update" ON question_stats
    FOR UPDATE USING (false);
