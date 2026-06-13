# 成長飛輪 Roadmap 設計（分享 / 對戰 / 解釋 / 校正 / 留存 / 手感）

日期：2026-06-13
狀態：已驗證（與 Jimmy 逐段確認）

## 背景與排序原則

外部總評結論：遊戲已可玩，但 fun 主要來自題目本身，缺「競賽張力、分享結果、答錯學到東西」的系統設計。盤點後發現缺口比清單小——多數基礎設施已存在：

- `src/lib/share.js`：Canvas 限動成績卡（1080x1920）已含分數/連擊/稱號/最難題鉤子 + Web Share fallback。
- `designs/ig-story-duel-update.html/.png`：對戰勝負卡設計稿已畫好，未接 code。
- `src/lib/backend.js`：`recordQuestionAttempts()` + `question_stats` 表 + `fetchWrongBoard()`——答題記錄管道已在收資料。
- `src/ui/screens/Play.svelte:289`：答錯 feedback 已顯示 `meaning`。
- `src/core/storage.js`：`getDailyStreak/setDailyStreak` 已存在，無 UI。

排序三原則：

1. **傳播優先於留存**——玩家基數小，先讓每局結束都產生拉新動作。
2. **吃現成資產優先**——已有 80% 的先收尾，不開新坑。
3. **資料先行**——校正與朋友榜都吃答題記錄，管道已通，早收資料晚收 feature 不虧。

## Milestone 總表

| # | Milestone | 現成度 | 工程量 | 依賴 |
|---|---|---|---|---|
| M1 | 分享卡 v2：打敗百分比 + 挑釁文案 + 挑戰連結進卡 | 70% | 小 | 百分比需 query runs 表 |
| M2 | 對戰勝負卡接 code | 60% | 小 | M1 卡片管線重構 |
| M3 | 答錯解釋：局後錯題複習頁 + fun 欄位 | 50% | 中 | 無 |
| M4 | 錯率校正：question_stats → 動態 difficulty 覆蓋 | 60% | 中 | 樣本累積（已在收） |
| M5 | 每日挑戰留存包：每日榜 + streak UI + 每日稱號 | 40% | 中 | 無 |
| M6 | 朋友榜（房間制最小版） | 10% | 小* | M5 |
| M7 | 手感強化：倒數感 + 連擊循序增強 | 30% | 中 | 無，可與 M1-M2 並行 |

順序 M1→M2→M3→M4→M5→M6，M7 穿插。M1+M2 是傳播飛輪起點。

## M1 分享卡 v2

**打敗百分比**
- backend.js 新增 `fetchPercentile(mode, score)`：`count(score < :score) / count(*)`，去重 `browser_id`（同 `fetchBoard` 邏輯）。
- 無雲端 fallback：不顯示該欄，不放假數字。
- 樣本 < 30：改顯示「前 N 名」，小樣本百分比失真。

**挑釁文案**
- 按表現分檔，每檔 3-5 句隨機抽：
  - 高分檔：「我拿 X 分，你敢進房嗎？」
  - 中分檔：「這題我居然錯了，你一定也會」（配最難題）
  - 低分檔：「注音被小學生屌打，求救」（自嘲也是傳播）
- 卡片底部 + share text 同步帶。

**挑戰連結進卡**
- IG 限動圖不可點 → 雙軌：圖上印人讀得懂的口令（「輸入 ㄅㄆㄇㄈ 對戰」+ 短碼），share text 帶 `challenge.js` 的 seed/match URL。

## M2 對戰勝負卡

- 不重畫，從 `designs/ig-story-duel-update.html` 抽 spec。
- share.js 重構：canvas helper（背景/浮動注音/roundRect）抽成共用 base，新增 `renderDuelCard(d)`——`{ 我方/對方 name+score, 勝負稱號, 比分條, 關鍵題 }`。
- Result.svelte 對戰結束切 duel 卡。
- 勝者文案「屌打 X」；**敗者卡帶 rematch 連結**——輸的人最有動機拉人。

## M3 答錯解釋

**計時規則（定案）**：凡有計時（sprint 限時、duel 同步 4 秒、任何 per-question 倒數），答錯一律不暫停節奏，解釋全走局後複習頁。即時解釋卡只在純練習（無計時）情境出現；若目前無此模式，全走複習頁，不做即時卡。

1. **局後錯題複習頁**：Result 加「錯了 N 題，看解釋」入口。session `results` 已記錯題，取 target/zhuyin/meaning/fun 列出。此頁同時是 M1 分享卡「最難題」素材來源。
2. **`fun` 欄位上場**：schema 已有 `fun`（冷知識）但 UI 未用。解釋卡 = meaning（正經）+ fun（記憶鉤）。fun 為空字串就不顯示，不補寫。

## M4 錯率校正

1. **`fetchDifficultyOverrides()`**：取 `attempts >= 30` 的題，錯率映射 difficulty：<15%→1、15-35%→2、35-55%→3、55-75%→4、>75%→5。回傳 `{ id: suggestedDifficulty }`。
2. **覆蓋點在 `selectQuestions()` 入口**：bank 載入後 merge overrides，原 difficulty 留作 fallback。App 啟動 fetch 一次，cache localStorage（TTL 1 天），無雲端走原值。
3. **決定性限制**：daily 全玩家同 seed 同題，但各人 overrides fetch 時間不同會選出不同題——**daily 不吃 overrides**，只有 sprint/levels 吃。
4. **先 dashboard 後自動化**：第一步只把 `fetchWrongBoard` 錯率 vs 標示 difficulty 對照列給人工看，確認映射閾值合理再開自動覆蓋。錯率高可能是題爛（誘答不公）而非題難，自動化前必須人眼過一輪。

## M5 每日挑戰留存包

1. **每日榜（先做，工程量極小）**：`fetchBoard` 加 `dateSeed` filter（runs 已有 created_at + mode）。「今日平均」同 query 順手算。
2. **Streak UI**：Home 的 daily 入口顯示「連續 N 天」；Result 顯示 streak 進度 + 斷簽警告（「明天沒來就歸零」）。storage API 已備。
3. **每日稱號**：按當日分數檔發稱號（「今日注音之神」等），進分享卡，與 M1 文案檔共用結構。

## M6 朋友榜（房間制最小版）

不做好友系統。duel 已有 room code，`fetchBoard` 本來就支援 `room` 參數：

- 加「常駐房」概念——同一群朋友記住房號，朋友榜 = 房內榜。
- 零新資料模型，把「建好友關係」偷換成「記住共同房號」。夠用再升級成真好友系統。

## M7 手感強化（倒數感 + 連擊循序增強）

現狀（Play.svelte）：timer 為純數字 + ≤10s wiggle；combo 為單一樣式 badge（≥3 顯示「連擊 ×N」），連擊 3 和連擊 30 長一樣。

**倒數感**

- 全局 timer：數字外加環形（或條狀）progress drain，顏色三段 綠→黃→紅。
- ≤10s：數字每秒 scale pulse（心跳感），配 tick 音效。
- ≤5s：畫面邊緣紅暈 vignette pulse，急迫感拉滿但不遮題目。
- per-question 4 秒（duel）：題卡頂部加 shrink bar，比角落小數字可感得多。

**連擊循序增強**

原則：可愛度與明顯度拉高，但以不影響作答為最大邊界——badge 位置固定不侵入選項區；答對瞬間允許 burst 動畫，平時收斂回小 badge。層級：

| 連擊 | 視覺 | 附加 |
|---|---|---|
| 3-5 | 小火苗 badge pop | 現有 combo 音效 |
| 6-9 | 火焰加大 + 輕微抖動 | 答對時小粒子 |
| 10-19 | 換色（藍火）+ 標籤字樣升級 | 答對瞬間輕微 screen shake |
| 20+ | 金色/彩虹 + 注音符號粒子噴發 | combo 音效 pitch 隨層級升 |

- 動畫全走 CSS transform/opacity（不觸發 layout），尊重 `prefers-reduced-motion`。
- 斷連擊：badge 碎裂/熄滅小動畫，損失感也是張力。

## 不做清單（YAGNI）

- 真好友關係資料模型（M6 房間制替代）。
- 答錯即時解釋卡（計時模式全走複習頁）。
- 全自動 difficulty 覆蓋上線前的人工審核不可省。
- 陌生人全站榜的進一步投資——朋友榜優先。
