# CLAUDE.md

你ㄅㄆㄇ有ㄅ級分ㄇ — 台灣生難字注音對決遊戲（給小孩與大人同樂）。Svelte 5 + Vite，雲端排行榜與好友對戰走 Supabase（可選，無設定時退化為純本地）。

## 開發指令

```bash
npm run dev        # vite dev server
npm run build      # vite build（改完務必跑過確認編譯）
npm run validate   # 題庫 schema 驗證（改任何 src/data/bank/* 必跑）
npm run audit      # 對教育部辭典稽核題庫注音（改題庫必跑）
```

雙人對戰 e2e：先 `npm run dev -- --port 5179`，再 `node scripts/duel-smoke.mjs`（playwright 從全域安裝 import；本機 .env 需指向活的 Supabase project）。

## 架構

- **引擎只有一個狀態機**：`src/core/session.svelte.js` 的 `QuizSession`（Svelte 5 runes）所有模式共用。模式只是 config 參數差異（見 `src/modes.js`），不要為某模式另寫狀態機。
- **選題唯一入口**：`src/core/bank.js` 的 `selectQuestions()`。所有玩法取題都走它，吃 seed（決定性 PRNG `rng.js`）/ 難度 / 類別 / excludeIds / onlyIds。連對提難另有 `drawHarderQuestion()`。
- **題庫扁平陣列**：`src/data/bank/index.js` 匯總 7 類（tricky / polyphone / rare / idiom / modern / classical / lyrics）成單一 `BANK`。新增類別要在 index.js 註冊 `CATEGORIES`。
- **模式設定**：`src/modes.js` 的 `MODES`（daily / sprint / levels / duel）+ `LEVELS`（10 關，第 5、10 為 BOSS）。
- **畫面**：`src/App.svelte` 是 state orchestrator（screen 切換 + 房間/連線生命週期）；`src/ui/screens/*` 為各畫面；`src/ui/components/*` 共用元件。
- **無後端時可玩**：`hasCloud=false` 排行榜走本地、對戰退化為同題碼比分。所有雲端呼叫都先檢查 `supabase` 是否存在。

## 題庫品管（改題必讀）

- 題目 schema：`{ id, text, target(單字，須在 text 中), zhuyin, distractors[1-3], meaning, fun, tags[], difficulty(1-5), era }`。id 前綴對應類別（tk/pp/rr/id/md/cl/ly）連號。
- **辭典優先序**：審注音一律以教育部《國語辭典簡編本》(concised, `dict.concised.moe.edu.tw`) 為第一依據（中小學教學標準，收音嚴謹貼課綱）。**只有簡編本查不到才退查《重編國語辭典修訂本》(moedict, `moedict.tw`)**。
- **audit 腳本打的是 moedict（修訂本），屬退階來源**：`scripts/audit-readings.mjs` 用 moedict API，會把修訂本收的冷僻又音/語音當正讀，對「整句非詞條」的題退回單字比對時常**誤報「答案非第一正音」**。判讀其輸出時，凡牽涉又讀/多音爭議，必須回簡編本覆核才算數。
- **誤報處置**：確認題目正確（子詞覆核）後，把 id 加進 `audit-readings.mjs` 的 `VERIFIED_OK` 白名單並註明依據，**不要改題**。輕聲位置題庫寫後置（`ㄉㄨㄣ˙`）、萌典寫前置（`˙ㄉㄨㄣ`），`norm()` 已統一。
- distractor 不得是 target 該字的另一個合法讀音（會變成「選項其實也對」的不公平題）。

## Realtime 好友對戰

- `src/lib/live.js`：Supabase presence + broadcast，無資料表。presence metadata 帶 `ready` 旗標，`setReady()` 重新 track 即廣播。
- 開局流程：全員 ready → leader（presence id 最小者，避免多人同時廣播）發 `start` payload → 全房 3 秒倒數齊進場。
- **換題不重複**：每局 leader 產唯一 `match` id，selectQuestions 的 seed 為 `room-<房號>-<match>`，配 `excludeIds`（本房已出題）。戰帖分享 URL 帶 `m=` 讓對手拿同一組題（`src/lib/challenge.js`）。
- 單題 4 秒：複用 `perQuestionSeconds`，超時走 `timeout()` 算錯。全房都答完提前換題，否則本地 4 秒到換；排名速度欄用 `answerTimeTotal`（同步換題後牆鐘時間失去鑑別度，不可用）。
- **本機 .env 雷**：曾有舊 Supabase project DNS NXDOMAIN 導致 realtime 本機測不動。改 realtime 前先確認 `.env` 的 `VITE_SUPABASE_URL` project 還活著（publishable key 是公開值，可從 prod bundle 抽）。

## 排行榜

- `fetchBoard` 多抓後按 `browser_id` 去重，**一人只留最高分一筆**（避免單人洗版整個榜）；本機榜按名字同樣去重。
- 闖關送「戰役累積分」= 各關最佳分加總（`storage.getLevelBest`），非單關分數；連擊跨關卡續燒（`initialCombo`，答錯歸零），榜上連擊顯示戰役歷史最高。

## 慣例

- 純前端、無 build step 以外的工具鏈。檔案以 feature/domain 組織，避免巨檔。
- 不可變更新（spread 回新物件，勿 mutate）。
- 改完跑 `npm run build` 確認編譯；動題庫跑 `validate` + `audit`。
- 回答用 zh-tw（技術術語可英文）；commit message 與 PR title 用英文；不使用 emoji。
