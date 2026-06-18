# 端午王 Session B — Recap / Next-session Catch-up Prompt

> 日期：2026-06-18
> 用途：整段貼給接手的新 session，自帶完整 context。延續 `session-b-handoff.md`，反映「registry 接線已完成」後的最新狀態。

---

## 整段貼給新 session 的 prompt

```
你接手端午王 event 的收尾工作（branch feat/duanwu-dragonboat-arcade，PR #8）。

先讀（按順序）：
1. docs/superpowers/specs/2026-06-17-duanwu-king-event-design.md — 主 spec（架構鐵則、完成路徑、排行榜隔離、敘事框架定案）
2. docs/plans/session-b-handoff.md — Session B 進度總表（已完成 vs 待做）
3. docs/plans/2026-06-18-duanwu-minigames-design.md — 5 關 mini-game 設計

## 已經可玩的完整迴圈（別重做）

Home → 端午王入口卡 → DuanwuQuest S 形江水地圖選關 → 答 10 題 fun fact 知識題 → 進該關專屬 mini-game（registry 派發）→ 採滿 10 粽子(onComplete 10) → 過關記進度（純本地，clearedLevels set 去重，絕不碰雲端）→ 回地圖更新進度鉤/解鎖 → 5 關全破 rescued。

已完成並驗證（build/validate/duanwu-select-check/agent-browser e2e 全綠）：
- 題庫 89 題 kind:'fact'（workflow 3 輪審查濃縮）+ index 註冊 + validate fact schema/足量斷言 + audit 跳過 fact
- 選題鏈：toQuestion fact 分支、EVENT_ONLY_CATEGORIES 隔離、DUANWU_LEVELS chapter 鎖題、session.start 透傳 chapter
- UI：theme.css 端午 token、DuanwuIcon.svelte 6 手繪 SVG、FloatingDuanwu、Home 入口卡、DuanwuQuest 地圖、Play fact 長選項+皮膚
- registry：DUANWU_LEVELS.game 欄位、App.svelte MINIGAMES map + svelte:component 派發、流程改造、DragonBoat 搬進 minigames/
- 5 個 mini-game 元件（Session A）：DragonBoat/PaddleRace/WrapZongzi/PoemPuzzle/Piranha，全貼 onComplete(10) 契約
- 敘事拍板：「救屈原」保留為願望框架，結局幕點睛文案還原史實（寫進 spec §敘事框架定案）

## 你的 TODO（按優先序）

1. **T7 救屈原結局幕 SaveQuyuan.svelte**（最該做，event 情緒高潮缺席）
   - 目前 L5 過關直接回 quest、5 關全破只在進度鉤顯「你救出屈原了」，無結局幕。
   - spec §5.3 + §敘事框架定案：第一人稱 POV 手繪 Q 版屈原雙手拉你轉、髮髻插粽葉、三角粽+花瓣放射飛散、汨羅江草坡、5 秒 CSS 果凍彈跳高潮 + 成就文字（必含史實點睛句：屈原沒被救回、粽子真正意義是被記得）+ 分享卡走 share.js。Q 版屈原 SVG 對齊 DuanwuIcon/Zongzi 品味。
   - 接線：App.svelte 偵測 clearedLevels>=5（或 L5 onComplete）→ 切 save-quyuan screen，而非回 quest。

2. **T3 advanceDuanwuProgress 抽純函式**（目前 inline 在 App.svelte duanwuArcadeComplete）
   - spec §4：純函式吃關號 set 去重 + scripts/duanwu-progress-check.mjs 自檢（含「重玩第 1 關 5 次不誤觸 rescue」case）。目前邏輯對但沒抽出、沒自檢。

3. **T2 flow 模組 duanwu.svelte.js**（Eng D1，optional refactor）
   - 流程狀態（startDuanwuLevel/finishDuanwuQuiz/duanwuArcadeComplete）目前散在 App.svelte，spec 建議抽薄模組避免 App.svelte 變 god file。已可動，但接線正常運作，屬整理而非阻塞。

4. **T4 詩句 L4 真資料 poemData.js**（內容工作）
   - 目前佔位句。需 10+ 句端午/屈原名句（離騷/天問/端午詩）+ 查證可靠出處 + 白話。跟題庫一樣走簡編本/可信典籍查證。

5. **T2b DuanwuResult 本關結算 + 反向驗證**（optional polish）
   - 答完每關過個結算卡（全對/連擊/粽子+10）+ 分享；反向驗 RED→GREEN 確認端午零雲端筆數。

## 鐵則（CLAUDE.md + spec）

- QuizSession 狀態機零改動（chapter 是 config 透傳，已加）
- 不可變更新；端午絕不碰雲端排行榜（不 submitRun/不 addLocalScore/不 recordQuestionAttempts）
- 改題庫跑 npm run validate + audit；改選題/modes 跑 node scripts/duanwu-select-check.mjs
- 回答 zh-tw、commit message 英文、不用 emoji
- 視覺打磨判定一律進站量 DOM（agent-browser getComputedStyle/getBoundingClientRect），不靠截圖目測——上次三輪 reviewer 兩個 HIGH 都是截圖假象
- 新增選題 config 欄位，同步補 src/core/session.svelte.js start() 的列舉清單（漏接過 chapter）

## 驗證指令

- npm run build / npm run validate / npm run audit
- node scripts/duanwu-select-check.mjs（選題鏈 13 斷言）
- agent-browser 走查：Home→端午王→答10題→mini-game→過關→進度更新（手機尺寸也走一次）
```

---

## 速查（非 prompt）

- **branch**: `feat/duanwu-dragonboat-arcade`（PR #8）
- **最新 commit**: `482648d` registry 接線
- **本 session log**: `notes/AI-Sessions/2026-06-18-duanwu-bank-ui-registry.md`
- **已寫 memory**: `session_config_field_manual_passthrough`（含「進站量 DOM 不靠截圖」方法論）
