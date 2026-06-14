# CLAUDE.md

注音王 — 台灣生難字注音對決遊戲（給小孩與大人同樂）。Svelte 5 + Vite，雲端排行榜與好友對戰走 Supabase（可選，無設定時退化為純本地）。

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
- **題庫扁平陣列**：`src/data/bank/index.js` 匯總 8 類（tricky / polyphone / rare / idiom / modern / classical / lyrics / pickchar）成單一 `BANK`。新增類別要在 index.js 註冊 `CATEGORIES`。
- **模式設定**：`src/modes.js` 的 `MODES`（daily / sprint / levels / duel）+ `LEVELS`（10 關，第 5、10 為 BOSS）。
- **畫面**：`src/App.svelte` 是 state orchestrator（screen 切換 + 房間/連線生命週期）；`src/ui/screens/*` 為各畫面；`src/ui/components/*` 共用元件。
- **無後端時可玩**：`hasCloud=false` 排行榜走本地、對戰退化為同題碼比分。所有雲端呼叫都先檢查 `supabase` 是否存在。

## 題庫品管（改題必讀）

- 題目 schema：`{ id, text, target(單字，須在 text 中), zhuyin, distractors[1-3], meaning, fun, tags[], difficulty(1-5), era }`。id 前綴對應類別（tk/pp/rr/id/md/cl/ly/fc）連號。
- **反考字題（pickchar，`kind: 'char'`）**：給語境＋注音挑「正確的字」，distractors 放形近／常見誤寫字（非注音）；正解選項 = target。誘答字不得是教育部辭典收錄的同語境異形寫法（如「再接再礪」辭典也收，不可當誘答）。zhuyin 仍為 target 正讀，audit 照常稽核。
- **辭典優先序**：審注音一律以教育部《國語辭典簡編本》(concised, `dict.concised.moe.edu.tw`) 為第一依據（中小學教學標準，收音嚴謹貼課綱）。**只有簡編本查不到才退查《重編國語辭典修訂本》(moedict, `moedict.tw`)**。
- **audit 雙層架構（2026-06-14 升級）**：`scripts/audit-readings.mjs` 先查**簡編本官方離線資料** `scripts/data/concised-dict.json`（權威層，第一依據）—— 詞條收錄即抽目標字音節，對得上 pass、對不上即高信度錯誤；簡編本查無該詞才退 **moedict 修訂本 API**（退階粗篩層）。離線資料由 `npm run build-dict` 從教育部官方 xlsx 轉出（44399 詞，CC 授權；xlsx 6.7MB 不進 git，json 1.6MB 進 git）。
- **moedict 退階層仍會誤報**：moedict 會把修訂本冷僻又音/語音當正讀，對「整句非詞條」的題退回單字比對時常**誤報「答案非第一正音」**。判讀牽涉又讀/多音爭議的 moedict 輸出，必須回簡編本覆核才算數（簡編本 `dict[詞]` 查詞、或 build-dict 註解內的 curl 線上查單詞）。**真實教訓**：曾靠 moedict + 記憶把「熙熙攘攘」改成 ㄖㄤˇ（修訂本音）、「逮捕」寫 ㄉㄞˋ、「連署」寫 ㄕㄨˇ、「湮滅」寫 ㄧㄢ，全被簡編本權威層打臉糾正回 ㄖㄤˊ / ㄉㄞˇ / ㄕㄨˋ / ㄧㄣ。
- **誤報處置**：題目 text 為「語境句」非辭典詞條時，簡編本層查無整句 → 退 moedict 粗篩誤報。確認核心詞已回簡編本覆核正確後，把 id 加進 `VERIFIED_OK` 白名單並註明簡編本依據，**不要改題**。輕聲位置題庫寫後置（`ㄉㄨㄣ˙`）、萌典寫前置（`˙ㄉㄨㄣ`），`norm()` 已統一。
- distractor 不得是 target 該字的另一個合法讀音（會變成「選項其實也對」的不公平題）。

## Realtime 好友對戰

- `src/lib/live.js`：Supabase presence + broadcast，無資料表。presence metadata 帶 `ready` 旗標，`setReady()` 重新 track 即廣播。
- 開局流程：全員 ready → leader（presence id 最小者，避免多人同時廣播）發 `start` payload → 全房 3 秒倒數齊進場。
- **presence metadata 只放會「同步收斂」的狀態（`ready`），會獨立變動的旗號（如難度）一律走獨立 broadcast event，不可混進同一份 `myMeta` + `track()`**。曾把房主難度塞進 presence metadata，與 `ready` 共用 `track()`：房主選難度 track 一次、按 ready 又 track 一次，presence sync 競態把對方的 `ready` 旗號洗掉 → 全房互相看不到對方 ready，leader 的開戰 `$effect` 永遠不觸發、永遠不倒數。難度改走 `broadcast event 'difficulty'`（房主單向通知）後解決。本房定案難度記在 channel 的 `hostDifficulty`（`getDifficulty()` 供 leader 發 start、`rememberDifficulty()` 供收 start 的人純記本地不回授），故換 leader / 再玩一次都不會掉回 random。
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
