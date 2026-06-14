-- ============================================================
-- v5: runs 表防灌票 — submit_run RPC + 收緊 insert policy
-- ============================================================
-- 在 Supabase Dashboard > SQL Editor 執行。
--
-- 背景：
--   線上 runs 表的 insert policy 是 `with check (true)`，任何人用公開
--   anon key 從瀏覽器 console 就能 insert 任意分數洗榜 / 冒名。
--   （注意：先前的 supabase-security-upgrade.sql 保護的是 scores/players
--    表，但前端排行榜實際用的是 runs 表，等於防錯了表。）
--
-- 對策：
--   1. 新增 submit_run RPC（SECURITY DEFINER），server 端做合理性驗算 +
--      頻率限制後才寫入。
--   2. 收緊 runs 的 insert policy 為 false，強制所有寫入走 RPC。
--   3. 前端 submitRun 改呼叫此 RPC（見 src/lib/backend.js）。
--
-- 驗算策略（誠實揭露限制）：
--   各模式計分演算法在前端 JS（core/scoring.js: 單題最高 BASE_SCORE 100
--   × 3.1 = 310），DB 無法完整重算。故採「合理性上界 + 頻率限制」：
--   - daily/sprint/duel 為單場：score 上界 = correct × 310（+ 緩衝）
--   - levels 為跨關累積分：無法用單場 correct 卡，改用絕對寬上界
--     （擋極端值），主防線靠頻率限制。
--   這擋住絕大多數自動化洗榜與離譜假分，但非密碼學等級防作弊
--   （前端遊戲的固有限制；要完全防需把計分搬進 server，成本不成比例）。
-- ============================================================

-- 單題理論最高分：BASE_SCORE(100) × (1 + comboBonus 1.0 + diffBonus 0.6 + speedBonus 0.5)
-- = 310。留 1.2x 緩衝吸收前端計分微調，上界用 372。
-- levels 累積分絕對上界：10 關 × 每關最多 15 題 × 372 ≈ 55800，取整 60000。

CREATE OR REPLACE FUNCTION submit_run(
    p_browser_id UUID,
    p_name TEXT,
    p_score INTEGER,
    p_mode TEXT,
    p_room TEXT,
    p_correct INTEGER,
    p_total INTEGER,
    p_max_combo INTEGER
) RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_recent_count INTEGER;
    v_max_score INTEGER;
    v_per_q_max CONSTANT INTEGER := 372;  -- 單題上界（含緩衝）
BEGIN
    -- 1. 基本欄位驗證（與 runs CHECK 約束一致，提前擋）
    IF p_name IS NULL OR char_length(p_name) = 0 OR char_length(p_name) > 24 THEN
        RAISE EXCEPTION 'invalid name';
    END IF;
    IF p_mode NOT IN ('daily', 'sprint', 'levels', 'duel') THEN
        RAISE EXCEPTION 'invalid mode';
    END IF;
    IF p_score < 0 OR p_score >= 100000 THEN
        RAISE EXCEPTION 'score out of range';
    END IF;
    IF p_correct < 0 OR p_total < 0 OR p_correct > p_total THEN
        RAISE EXCEPTION 'invalid correct/total';
    END IF;

    -- 2. 分數合理性上界
    IF p_mode = 'levels' THEN
        v_max_score := 60000;  -- 跨關累積分絕對寬上界
    ELSE
        -- 單場：答對題數 × 單題上界（至少給 372 容單題場景）
        v_max_score := GREATEST(p_correct, 1) * v_per_q_max;
    END IF;
    IF p_score > v_max_score THEN
        RAISE EXCEPTION 'score exceeds plausible max for mode % (% > %)', p_mode, p_score, v_max_score;
    END IF;

    -- 3. 頻率限制：同一 browser_id 過去 10 秒最多 1 筆（防自動化洗榜）
    SELECT count(*) INTO v_recent_count
    FROM runs
    WHERE browser_id = p_browser_id
      AND created_at > now() - interval '10 seconds';
    IF v_recent_count >= 1 THEN
        RAISE EXCEPTION 'rate limited: too many submissions';
    END IF;

    -- 4. 通過所有檢查，寫入
    INSERT INTO runs (browser_id, name, score, mode, room, correct, total, max_combo)
    VALUES (p_browser_id, p_name, p_score, p_mode, p_room, p_correct, p_total, p_max_combo);

    RETURN true;
END;
$$ LANGUAGE plpgsql;

-- 收緊 insert policy：禁止直接 insert，強制走 submit_run RPC
DROP POLICY IF EXISTS "anyone can insert runs" ON runs;
CREATE POLICY "runs: no direct insert (use submit_run RPC)" ON runs
    FOR INSERT WITH CHECK (false);

-- 讀仍開放（排行榜要讀）
-- 既有 "anyone can read runs" (SELECT using true) 保留，不動。
