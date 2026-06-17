# Session B Handoff — 端午王 event

> 日期：2026-06-18
> 用途：給接手 Session B 的 agent 的 catch-up prompt。可整段貼給新 session，自帶完整 context，不依賴任何前對話。

## Session A 進度（已完成 ✅）

PR #8（branch `feat/duanwu-dragonboat-arcade`）已含：

| 項目 | 內容 | commit |
|---|---|---|
| L1 龍舟撿粽子 | DragonBoat + funny points（combo/金粽/護盾/鼓點/划槳） | `ceab…` → `70d08da` 系列 |
| L2-L5 四個 mini-game | PaddleRace / WrapZongzi / PoemPuzzle / Piranha | `70d08da` |
| 設計文件 + 進度回填 | minigames design doc | `1b29af0` / `7c23e56` |

全部 agent-browser 實測過、`onComplete(10)` 契約驗證、`npm run build` 過、dev hook production bundle 確認乾淨。

---

## Catch-up Prompt（整段貼給新 Session B agent）

```
你接手端午王 event 的 Session B（答題流程 + 闖關 orchestrator + 題庫 + 五關 mini-game 接線）。

先讀這兩份（按順序）：
1. docs/superpowers/specs/2026-06-17-duanwu-king-event-design.md — 端午 event 主 spec（架構鐵則、完成路徑、排行榜隔離、進度純函式、Phase 1 規律）
2. docs/plans/2026-06-18-duanwu-minigames-design.md — 五關 mini-game 設計 + 共用 registry 架構 + 實作進度 section

Session A（已完成，PR #8 branch feat/duanwu-dragonboat-arcade）交付了五個 mini-game 元件，全部貼凍結契約 onComplete(zongziCollected)——只在「完成過關」時回傳 10，fail 不回呼。它們互不依賴、各自獨立元件：
- L1 src/ui/components/DragonBoat.svelte (+dragonBoatSprites.js) — 注意還在 components/ 沒搬進 minigames/
- L2-L5 src/ui/components/minigames/{PaddleRace,WrapZongzi,PoemPuzzle,Piranha}.svelte (+各 sprites/poemData.js)

你的工作（互不阻塞，可平行或依序）：

A. registry 接線（mini-game 與流程的唯一交集）：
   - src/modes.js 的 DUANWU_LEVELS 每關加 game 欄位：L1='dragonboat' L2='paddle' L3='wrap' L4='poem' L5='piranha'
   - App.svelte 建 MINIGAMES map（game字串→元件）+ 用 <svelte:component this={MINIGAMES[level.game]} onComplete={...}/> 派發
   - 把 L1 DragonBoat.svelte + dragonBoatSprites.js 搬進 src/ui/components/minigames/，更新所有 import
   - 開發期可先用 stub（按鈕假裝 onComplete(10)）跑通流程，再接真元件

B. spec 原本 Session B 範圍（見端午 spec）：
   - src/data/bank/duanwu.js 50 題 fun fact 知識題（kind:'fact'）+ index.js 註冊
   - src/core/bank.js toQuestion 支援 kind:'fact' + EVENT_ONLY_CATEGORIES 隔離（duanwu 不漏進 daily/sprint/levels）
   - src/core/duanwu.svelte.js flow 模組 + advanceDuanwuProgress 純函式（吃關號 set，重玩不誤觸 rescue）+ scripts/duanwu-progress-check.mjs 自檢
   - 獨立完成路徑：不 submitRun / 不 addLocalScore / 不 recordQuestionAttempts / 不跳 result（端午不碰排行榜，反向驗 RED→GREEN）
   - DuanwuQuest/SaveQuyuan/Home 入口卡/DuanwuResult 畫面 + 進度鉤
   - src/ui/screens/Play.svelte 依 kind 切選項排版（fact→垂直長條清單）
   - theme.css 端午配色 token（reed/river/zong/cinnabar）

C. 兩個 mini-game 的內容 TODO：
   - L4 poemData.js 目前是佔位示例句，需備 10+ 句真端午/屈原名句（離騷/天問/端午詩）+ 查證出處 + 白話
   - L5 過關目前回 quest；玩法→救屈原結局幕(§5.3)的 fade 接續是後續

鐵則（CLAUDE.md + spec）：QuizSession 狀態機零改動；不可變更新；改題庫跑 npm run validate + audit；端午絕不碰雲端排行榜；回答用 zh-tw、commit message 英文、不用 emoji。

合併順序：Session A 已先合進 PR #8（純新增零風險）；你接 registry 後跑 build + validate + 手動走查全流程（Home→端午王→各關答題→mini-game 採滿→進度鉤更新→5 關全破觸發救屈原）。
```

---

## 給人看的速查（非 prompt 一部分）

### Session A 已凍結的契約（Session B 不准單方改）

```js
// 每個 mini-game 對外唯一介面
// props: { onComplete: (zongziCollected: number /* 完成時為 10 */) => void }
// 只在「完成過關」呼叫 onComplete(10)；fail 顯示 retry overlay、不回呼、不回傳部分數
```

### 唯一交集點

- 只有 `src/modes.js`（加 game 欄位）+ `src/App.svelte`（registry map + 派發 + 搬 L1 的 import）。
- 五個 mini-game 元件本身 Session B 不需改（除非 L4 詩句資料 / L5 結局 fade 的內容工作）。

### demo 頁（驗手感用，不進 build input）

- `dragonboat-demo.html` — L1
- `minigames-demo.html` — L2-L5 下拉切換
```
