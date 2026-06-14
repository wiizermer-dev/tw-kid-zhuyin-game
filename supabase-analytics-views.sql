-- ============================================================
-- 使用者行為分析 views（純讀，零成本，不動現有 schema）
-- ============================================================
-- 在 Supabase Dashboard > SQL Editor 執行。建立後可在 Dashboard 直接 query，
-- 或之後接 Metabase / Grafana。所有時間以台灣時區 (UTC+8) 計日。
--
-- 資料來源：
--   runs            — 每場成績（browser_id 約等於「裝置/玩家」）
--   question_stats  — 逐題全體答對/答錯累積
--
-- 限制：browser_id 是 localStorage UUID，清快取/換瀏覽器會變新人，
--   故「玩家數」實為「裝置數」，會略高估真實人數。可接受的代理指標。
-- ============================================================

-- 1. 每日活躍裝置 (DAU) + 每日場次
CREATE OR REPLACE VIEW analytics_daily AS
SELECT
    (created_at AT TIME ZONE 'Asia/Taipei')::date AS day,
    count(DISTINCT browser_id)                    AS active_devices,
    count(*)                                      AS total_runs,
    round(avg(score))                             AS avg_score
FROM runs
GROUP BY 1
ORDER BY 1 DESC;

-- 2. 各模式熱度（哪個玩法最多人玩）
CREATE OR REPLACE VIEW analytics_mode_popularity AS
SELECT
    mode,
    count(*)                    AS runs,
    count(DISTINCT browser_id)  AS devices,
    round(avg(score))           AS avg_score,
    round(avg(NULLIF(total, 0))::numeric, 1) AS avg_questions_per_run,
    round(100.0 * sum(correct) / NULLIF(sum(total), 0), 1) AS overall_accuracy_pct
FROM runs
GROUP BY mode
ORDER BY runs DESC;

-- 3. 留存：新裝置首玩日 → 是否隔日/7日內回來
CREATE OR REPLACE VIEW analytics_retention AS
WITH first_seen AS (
    SELECT browser_id,
           min((created_at AT TIME ZONE 'Asia/Taipei')::date) AS first_day
    FROM runs GROUP BY browser_id
),
activity AS (
    SELECT DISTINCT browser_id,
           (created_at AT TIME ZONE 'Asia/Taipei')::date AS day
    FROM runs
)
SELECT
    f.first_day,
    count(DISTINCT f.browser_id) AS new_devices,
    count(DISTINCT CASE WHEN a.day = f.first_day + 1 THEN f.browser_id END) AS returned_d1,
    count(DISTINCT CASE WHEN a.day BETWEEN f.first_day + 1 AND f.first_day + 7 THEN f.browser_id END) AS returned_w1
FROM first_seen f
LEFT JOIN activity a ON a.browser_id = f.browser_id
GROUP BY f.first_day
ORDER BY f.first_day DESC;

-- 4. 黏著度：每裝置玩幾場（分布）
CREATE OR REPLACE VIEW analytics_engagement AS
WITH per_device AS (
    SELECT browser_id, count(*) AS runs
    FROM runs GROUP BY browser_id
)
SELECT
    CASE
        WHEN runs = 1 THEN '1 (玩一次就走)'
        WHEN runs BETWEEN 2 AND 5 THEN '2-5'
        WHEN runs BETWEEN 6 AND 20 THEN '6-20'
        ELSE '20+'
    END AS run_bucket,
    count(*) AS devices
FROM per_device
GROUP BY 1
ORDER BY min(runs);

-- 5. 最常被答錯的題（已有 fetchWrongBoard，這裡給 Dashboard 直查版）
--    達最低樣本數才上榜，避免一兩次就洗榜。
CREATE OR REPLACE VIEW analytics_hardest_questions AS
SELECT
    question_id,
    word,
    target_char,
    correct_answer,
    total_attempts,
    wrong_attempts,
    round(100.0 * wrong_attempts / NULLIF(total_attempts, 0), 1) AS wrong_rate_pct
FROM question_stats
WHERE total_attempts >= 10
ORDER BY wrong_rate_pct DESC, wrong_attempts DESC
LIMIT 50;

-- 6. 「太簡單」的題（錯率極低，候選汰除/提供別的價值）
CREATE OR REPLACE VIEW analytics_easiest_questions AS
SELECT
    question_id, word, target_char,
    total_attempts,
    round(100.0 * wrong_attempts / NULLIF(total_attempts, 0), 1) AS wrong_rate_pct
FROM question_stats
WHERE total_attempts >= 30
ORDER BY wrong_rate_pct ASC, total_attempts DESC
LIMIT 50;

-- ============================================================
-- 用法：建好後在 SQL Editor 跑 e.g.
--   select * from analytics_daily limit 30;
--   select * from analytics_mode_popularity;
--   select * from analytics_retention limit 14;
-- ============================================================
