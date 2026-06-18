# 端午王 — 端午節特別 Event 設計

> 日期：2026-06-17
> 狀態：設計定案，待轉實作計畫

## 一句話

端午節期間限定的「端午王」闖關 event：深度歷史答題 + 龍舟撿粽子 Canvas 小遊戲。5 關各 10 題，每關答完開龍舟採 10 顆粽子，集滿 50 題 + 50 粽子救屈原。

## 設計原則

- **引擎零改動**：`QuizSession`（`src/core/session.svelte.js`）一行都不改。龍舟絕不塞進狀態機。符合 CLAUDE.md「引擎只有一個狀態機，模式只是 config 差異」鐵則。
- **複用 levels 骨架**：闖關推進、localStorage 解鎖直接複製現有 `levels` 模式的 pattern（`Levels.svelte` + `storage.getLevelStars`），但用獨立 storage key 與獨立畫面，不污染正規闖關。
- **三塊互不污染**：題庫（新類別）、流程（orchestrator）、arcade（獨立 Canvas 元件）邊界清楚，可獨立理解與測試。
- **純本地**：event 進度純 localStorage，不碰 Supabase、不進排行榜。
- **Canvas 2D，非 3D**：已評估否決 Three.js（玩法本質 2D、+150KB 依賴、舊裝置掉幀、需生 3D 資產，邊際效益對「小孩端午小遊戲」極低）。

## 三塊架構

```
端午王 event
├── 題庫：新增 duanwu 類別（沿用現有 schema）        ← src/data/bank/duanwu.js + index.js 註冊
├── 流程：端午闖關 orchestrator（複製 levels pattern） ← src/modes.js + src/App.svelte + 新 screen
│         每關 = QuizSession 跑 10 題（引擎零改動）
│         ↕ 答完一關 → 開龍舟 arcade 採 10 粽子
└── arcade：DragonBoat.svelte 獨立 Canvas 元件        ← 全新，跟引擎完全分離
```

---

## 1. 題庫：duanwu 類別

> **題型本質（user 定案，2026-06-17）**：端午 event **不考字音**，全部是**端午史實 fun fact 知識題**（單選）。圍繞端午史實發散找冷知識（屈原星座/生肖考生日、屈原的老闆是誰=楚懷王、汨羅江在中國哪=湖南…），重點是「大家不知道、但帶出歷史」。**唯一例外**：詩詞關（poem）若有值得考的讀音，可加一兩題字音題。這推翻了原 spec「沿用字音對決玩法、target/zhuyin 圍繞端午」的假設——那個方向作廢。

### 1.1 題型與 schema（Devex review D1：向下相容引擎，新增 `kind: 'fact'`）

引擎 `toQuestion()`（`src/core/bank.js:79`）已用 `kind` 切換選項形狀（`'char'`→target、else→zhuyin）。**新增第三種 `kind: 'fact'`**，選項直接是預建多字文字，與既有機制一致，**`QuizSession` 狀態機零改動**（`session.answer` 只讀 `options[i].correct` 與 `difficulty`，已驗證 `session.svelte.js:114,127`）。對齊 CLAUDE.md「引擎只有一個狀態機，不為某模式另寫狀態機」鐵則。

**知識題 schema（主力，約 48-49 題）**：
```js
{
  id: 'dw-001', kind: 'fact', chapter: 'quyuan',
  question: '屈原投江的汨羅江，在今天中國哪個省？',   // 題幹是完整問句（不是「target 在句中」）
  options: ['湖南省', '湖北省', '江西省', '浙江省'],   // 多字選項，第一個為正解（toQuestion 會洗牌）
  answer: 0,                                          // 正解 index（或用 correctText，見下）
  fun: '汨羅江是湘江支流，在湖南省東北部。屈原流放期間在此投江。',  // fun fact / 史實補充
  source: '《史記·屈原列傳》',                          // 史實依據（取代字音題的辭典依據）
  tags: ['屈原', '地理'], difficulty: 2, era: 'classic'
}
```

**字音題 schema（僅 poem 關 1-2 題例外）**：沿用現有字音題 schema（`kind` 省略或 `'char'`、`target`/`zhuyin`/`distractors`），與其他類別同規格，**照走 audit**。

- **id 前綴 `dw`**，連號 `dw-001`～`dw-050`（格式對齊現有 `tk-001` 有 hyphen 慣例）
- **註冊**：`src/data/bank/index.js` 的 `CATEGORIES` 加一筆 `duanwu: { label: '端午', icon: <注音>, items: duanwu }`
- **先寫滿 50 題**（5 關各 10），event 上線即可玩滿全程
- **`toQuestion()` 改動**：加一個 `kind === 'fact'` 分支——選項由 `item.options` 直接建（`{ text, correct }`），正解由 `answer` index 或 `correctText` 標記。字音題分支不動。

### fun fact 取材方向（user 指示：發散找冷知識）

- 一題不用塞滿史實，可拆多題。例：屈原生日 → 星座題 + 生肖題兩題。
- 取材軸：人物（屈原星座/生肖/老闆楚懷王/官職三閭大夫）、地理（汨羅江在湖南/楚國位置）、習俗由來（為何划龍舟/包粽子/掛艾草/喝雄黃酒）、時間（端午是農曆幾月幾日/別稱端陽/重午）、詩詞典故（離騷/天問作者）。
- **同時代對照軸（user 提議：跟屈原同時代/同空間的偉人）**——超強冷知識素材，命中「原來同個時代地球另一邊在幹嘛」：
  - 史實底：屈原約前 340–前 278（戰國中後期）。
  - **東方同代**：孟子（約前 372–前 289）、莊子（約前 369–前 286）幾乎完全重疊。題例：「屈原跟哪位儒家亞聖是同時代人？」
  - **西方同代（跨空間，最有 fun）**：亞里斯多德（前 384–前 322）、亞歷山大大帝（前 356–前 323）。題例：「屈原寫《離騷》前後，古希臘哪位哲學家正在教亞歷山大大帝？」
  - **誠實邊界（對齊 §1.2 冷知識易誤傳風險）**：屈原**確切西曆生日不可考**，**不做「跟誰同一天生日」題**（查不到、必誤傳）。生肖題可做——傳說生於寅年/寅日（《離騷》「惟庚寅吾以降」），可推屬虎，標 source 即安全。
- **科學破迷思軸（user 提議：立蛋等帶科學理論的習俗）**——fun fact 調的甜蜜點，破解「大家以為的」迷思 = 最強的「蛤?真的假的」：
  - **立蛋**：民俗說端午正午陽氣最盛才立得起來；科學真相是**跟端午/節氣無關**，任何天氣任何時間都立得起來，靠的是蛋殼表面凸點 + 重心 + 手穩（NASA/物理學家平常日子也示範過）。fun 點：「所以你平常也能立蛋，只是端午大家才一起玩」。題例：「端午立蛋立得起來，是因為?」誘答放「正午陽氣最盛」（民俗迷思）、正解「其實任何時候都立得起來」。
  - 同軸可發散：雄黃酒能不能喝（其實含砷有毒，現代多改塗不喝）、艾草菖蒲驅蚊是真有效還是純儀式（艾草確有驅蟲成分，半真）。
  - **品管注意**：破迷思題的「真相」必須有科學/權威來源（標 source），別自己變成新的誤傳。
- **台灣在地宗教民俗軸（user 提議）**——把 event 從「中國史實」拉到台灣小孩的在地連結，命中「原來這跟端午有關」+「我玩過/戴過」的雙重共鳴，貼產品「給台灣小孩」定位：
  - **午時水**：台灣民俗，端午正午（午時）取的水傳說能化煞、久放不壞，鹿港龍山寺等宮廟有午時水活動。fun 點：科學上是普通水，但在地信仰玩很大。
  - **鍾馗**：台灣端午掛鍾馗像驅五毒，鍾馗是道教捉鬼的神。題例：「端午掛的不是門神，是專門抓鬼的__?」正解鍾馗。
  - **香包（香囊）**：裝艾草雄黃，台灣小孩端午常戴、廟會常見——在地記憶點，避邪概念。
  - **驅瘟/惡月惡日**：端午本是「惡月惡日」要驅瘟避邪，連得上台灣王爺/瘟神信仰、部分地區送瘟遶境。
  - **誠實邊界**：台灣民俗有地域差異（北中南不一），且碰信仰 vs 史實界線。題用「台灣民俗相信…」「有些地方會…」框架，**不下「午時水真能化煞」這種斷言**（fun fact 角度安全，信仰真偽不評斷）。別硬扯無關習俗（如擲筊跟端午無直接關聯）。
- 「大家不知道但帶出歷史」優先於「課本背得到的」——冷知識才有 fun。

### 題目調性：fun fact 感，不是考歷史（Devex review D4，user 定案）

**核心**：要的是「蛤?真的假的」「原來是這樣」的**驚奇感**，不是「記不記得」的默背壓力。題目是冷知識的載體，**答錯也學到一個好玩的事**。fun 在題幹問法、選項趣味、`fun` 欄位，不在「答對證明你會」。

| | 考歷史（避免） | fun fact 感（要的） |
|---|---|---|
| 題幹 | 「屈原是哪一國人?」 | 「屈原投江那年，地球另一邊的亞歷山大大帝正在幹嘛?」 |
| 誘答選項 | 隨便三個錯的廢答案 | 錯選項本身也好笑/有梗（例：問屈原老闆，誘答放「秦始皇」明顯時代不對但好笑） |
| `fun` 欄位 | 補充說明 | **一句想轉發給別人的冷知識** |
| 重點 | 記得住 | 想講給別人聽 |

**出題原則（每題自檢）**：
1. 題幹用勾奇問法（「其實…」「你知道嗎」「同一時間地球另一邊」），不用考卷句型。
2. 誘答選項要有梗或似是而非，不放廢答案——錯得有道理或錯得好笑。
3. `fun` 欄位必寫一句「想轉發」等級的冷知識補充（答對答錯都讀得到）。
4. 通過測試：這題講給朋友聽，對方會不會「哦~」一聲。不會 → 重寫。

**難度梯度改「驚奇度/冷門度」而非「難背度」（D4）**：
- difficulty 1：大家模糊聽過的端午趣事（為何吃粽子、划龍舟紀念誰）
- difficulty 2-3：知道的人會說「對對對」、不知道的會「原來如此」（汨羅江在湖南、艾草菖蒲為何掛）
- difficulty 4-5：**連大人都會驚呼**的冷知識（屈原與亞里斯多德同時代、端午別稱重午的由來、屈原官職三閭大夫）
- difficulty 仍是 1-5 數字（引擎計分用，§5 難度區分配照舊），只是**選題標準改成驚奇度**——L1 抽「溫和趣味」、L5 抽「最冷最炸」。

### 題庫隔離：event-only 類別不進一般模式選池（Eng review D5，ship blocker）

> Codex #1：daily/sprint/多數 levels 選題 `categories=null`（全選），duanwu 一進 `BANK` 就會在一般模式**全年亂入**（五月以外抽到屈原/龍舟/粽子題很出戲）。

- `src/core/bank.js` 的 `selectQuestions` 加一層**預設排除 event-only 類別**：維護一份 `EVENT_ONLY_CATEGORIES = ['duanwu']`，`categories=null` 時母池排除這些類別；**只有顯式 `categories:['duanwu']`（duanwu 模式）才抽得到**。
- 對齊既有「單一扁平 BANK」架構（duanwu 照樣進 BANK，不另開題池），只在選題層加排除規則。daily/sprint/levels 一行不改。
- validate 加一條：BANK 中標 event-only 的類別，不出現在任一非 event 模式的預設選池抽樣裡。

### 1.2 品管：知識題核史實、字音題走 audit（Devex review D2，混合）

- **知識題（kind: 'fact'）不走字音 audit**：沒有 zhuyin 可稽核。`npm run audit` 跳過 `kind: 'fact'` 題（或 audit 掃描時略過無 zhuyin 的 duanwu 題）。
- **改人工核史實**：知識題品管改為「史實正確性」人工核——每題的 `answer` 與 `fun` 必須有可靠來源（標 `source` 欄位，如《史記·屈原列傳》/教育部資料/可信百科）。**新風險面**：冷知識易誤傳（民間傳說 vs 史實常混），下筆前查證、`source` 標清楚，避免教小孩錯的史實。
- **字音題（poem 關 1-2 題例外）仍走 audit**：照簡編本權威層稽核注音，與其他類別同規格（見 `docs/audit-playbook.md`）。
- **validate（schema）對全部 duanwu 題跑**：`kind: 'fact'` 題驗 `{question, options[2-4], answer/correctText, fun, source, difficulty, chapter}` 齊全；字音題驗原字音 schema。
- **上線長杆變化**：原本「50 題逐題過字音 audit」是最費時長杆（CEO 9A）。改知識題後，**字音 audit 只剩 1-2 題**，但**換成「史實查證 + 寫 fun fact」的新長杆**——查冷知識、確認 source、寫得有趣不枯燥，仍是 event 的關鍵路徑工作量（非機械）。

### 50 題的主題分佈（對應 5 關，全知識題 + poem 關可混 1-2 字音題）

| 關 | chapter | 主題（fun fact 知識題） | 難度 | 題數 |
|---|---|---|---|---|
| 1 汨羅江畔 | `quyuan` | 屈原本人 + **同時代對照軸**（生平/星座/生肖/老闆楚懷王/官職、汨羅江地理、投江典故、孟子莊子同代、亞里斯多德跨空間對照） | 1-2 | 10 |
| 2 划龍舟 | `boat` | 龍舟習俗由來：為何划龍舟、競渡起源、龍舟形制冷知識 | 2-3 | 10 |
| 3 包粽子 | `zongzi` | 粽子 + 避邪習俗 + **科學破迷思軸**（粽子由來、南北粽、艾草菖蒲、**立蛋科學**、雄黃酒含砷） | 2-3 | 10 |
| 4 詩詞關 | `poem` | 端午詩詞典故 + **可混 1-2 題字音題**（值得考的讀音） | 3-4 | 10 |
| 5 端午王 | `king` | 綜合最冷知識 + **台灣在地宗教民俗軸**（別稱端陽/重午、農曆時間、惡月惡日驅瘟、**午時水/鍾馗/香包台灣民俗**、跨主題大雜燴） | 4-5 | 10 |

> **chapter = 主題桶（Devex D5），非嚴格分類**：5 關保留 5×10=50（不動前面 review 過的架構），新取材軸各歸最貼的桶——同時代對照→quyuan、立蛋等科學破迷思→zongzi、台灣在地宗教民俗→king。第 5 關非 boss（Eng D7），靠最高驚奇度 + 綜合主題包裝（也最適合放台灣在地題，給小孩在地共鳴收尾）。poem 關是唯一可混字音題的關卡。難度=驚奇度梯度（見 §1 題目調性 D4）。

**題庫足量驗證（CEO review 2B + Devex D2）**：50 題按 5 關 chapter + 驚奇度（difficulty）分配，確保每關 `selectQuestions(categories:['duanwu'], chapter, minDifficulty, maxDifficulty, count:10)` 選得滿 10 題。`npm run validate` 加斷言：對每個 `DUANWU_LEVELS` 關卡，duanwu 類別中符合其 chapter 且落在難度區間的題數 ≥ 該關 count。題庫不足建置期就紅，不靜默縮關。

---

## 2. 流程：端午闖關 orchestrator

### 2.1 關卡設定（`src/modes.js`）

新增 `DUANWU_LEVELS` 陣列（**獨立於現有 `LEVELS`**，不混用）：

```js
export const DUANWU_LEVELS = [
  // chapter 鎖主題（D6）；duanwu 關全部 escalate:false（D6）；第 5 關不當 boss（D7）
  { n: 1, name: '汨羅江畔', chapter: 'quyuan', min: 1, max: 3, count: 10 }, // max 1→3：足量斷言 quyuan 難度1-2 僅 7 題，含難度3入門冷知識補滿（2026-06-18）
  { n: 2, name: '划龍舟',   chapter: 'boat',   min: 2, max: 3, count: 10 },
  { n: 3, name: '包粽子',   chapter: 'zongzi', min: 2, max: 3, count: 10 },
  { n: 4, name: '詩詞關',   chapter: 'poem',   min: 3, max: 4, count: 10 },
  { n: 5, name: '端午王',   chapter: 'king',   min: 4, max: 5, count: 10 }  // 非 boss
];
```

- **選題鎖主題（Eng review D6）**：每關用 `chapter` 鎖題，不只靠難度。L2(boat)/L3(zongzi) 難度都是 2-3，光靠難度分不開主題 → 龍舟關可能抽到粽子題。需要 `selectQuestions` 支援 chapter 過濾（或關卡用 `onlyIds` 帶該章節題 id 清單）。`categories:['duanwu']` 仍帶（配 D5 隔離），但**主題分關靠 chapter**。
- **端午關一律 `escalate: false`（Eng review D6）**：`levelConfig()` 對非 boss 關預設 `escalate:true`（`src/modes.js:123`），連對提難會把後續題換成同 category 更難題，但**不保證同 chapter** → 粽子關連對後冒出詩詞題。duanwu 關必須關掉 escalate（在 config 覆蓋 `escalate:false`，或 levelConfig 認 `level.chapter` 時自動關）。
- **第 5 關不當 boss（Eng review D7）**：原設 `boss:true, bossHp:10` = 10 題全對才 `won`，與「答完進龍舟」流程矛盾（沒打贏怎麼算未定義），且 10/10 對小孩太硬。第 5 關跟 L1-4 同機制：答 10 題（難度 4-5）→ 進龍舟 → 採滿過關。「端午王」靠最高難度 + 主題包裝，不靠 boss 血條。
- **`calibrated` 注意（Codex #5）**：`levelConfig` 預設 `calibrated:true`，受雲端錯率覆蓋影響。duanwu 是 event-only 類別、樣本少，校正意義不大；實作時確認 calibrated 對 duanwu 不會誤動難度（必要時 duanwu 關 `calibrated:false`）。

### 2.2 畫面流程（`src/App.svelte` + 新 screen）

複製 levels 的 screen 切換邏輯，新增 event 專屬路由：

```
home（端午王入口卡）
  → duanwu-quest（關卡選擇畫面，複製 Levels.svelte 結構）
    → play（QuizSession 跑該關 10 題，modeKey='duanwu'）
      → dragonboat（答完該關 → 龍舟 arcade 採 10 粽子）
        → 採滿 → 記進度 → duanwu-result（本關結算 + 分享卡）→ 回 duanwu-quest（解鎖下一關）
  → 集滿 5 關 + 50 粽子 → save-quyuan（救屈原結局畫面 + 最終分享卡）
```

- `App.svelte` 加 `modeKey === 'duanwu'` 分支：答完一關不直接進 result，而是切到 `dragonboat` screen
- 龍舟結束 callback 回寫進度，再切回 `duanwu-quest`
- **入口**：Home 加一張端午王限定入口卡（節慶 tint），點進 `duanwu-quest`

> **完成路徑與結算（Eng review D2 + D2b）**：端午 quiz 關**不可直接複用 `finishGame()`**（`src/App.svelte:251-323`）。現有 `finishGame` 在 `score > 0` 時無條件寫 `local_board` + `submitRun()` 上雲（:309-321）並 `screen='result'`（:323），與「event 不碰排行榜、答完進龍舟」衝突。
> - 端午 quiz 走**獨立完成路徑**：可共用 `finishGame` 可抽出的小件（錯題本 `addMistake`/`clearMistake` + `addRecentIds`，端午題照樣餵全域錯題本），但**不呼叫 `submitRun()`、不寫 `local_board`、不跳 `result`**，改切 dragonboat。
> - **也不呼叫 `recordQuestionAttempts()`（Codex #2）**：`finishGame:262-265` 除榜單外還上傳全體常錯榜資料到雲端，且該資料會回頭影響 `calibrated` 選題。端午完成路徑**連 `recordQuestionAttempts` 也不可呼叫**，否則 event 題的答題統計污染雲端、反過來干擾一般模式選題難度。「不碰雲端」= 不 submitRun + 不 recordQuestionAttempts。
> - **結算畫面（你要的激勵分享）**：每關採滿粽子後過一個 **duanwu-result** 畫面（「這關全對/連擊 X/粽子 +10」），最終 5 關全破進 **save-quyuan**。兩者都掛**一鍵分享卡**。**分享走 `src/lib/share.js`（海報生成），不是 `challenge.js`（Codex #8）**：`challenge.js` 只解析 duel room / score URL，不是通用分享模組；端午分享卡若要帶 URL，需定義獨立 schema 並確保 `challenge.js` parser 不誤判端午 URL 為戰帖。
> - **端午過關榜 = 純本地（D2b）**：成就感走「你救出屈原了！用了 N 天、最高連擊 X」這類**本地個人成就**展示，存 `duanwu_progress`，**不碰 Supabase / 不上雲端排行榜**（守 CEO review 原定調；雲端端午榜列 TODO，節後再評估）。

> **架構決策（CEO review, Approach B）**：App.svelte 的 duanwu 串接寫成一段通用「節慶流程」wrapper（`quiz關 → arcade → 寫進度 → quest`），DUANWU_LEVELS 與 DragonBoat 當第一個實例填進去，而非寫死的 `modeKey==='duanwu'` 一次性特例。現在只多寫一個薄 wrapper，將來中秋/過年只需換題庫類別 + 換 arcade 元件，App.svelte 不再加第二個近乎重複的分支。**不做** festivals registry / 獨立 store（YAGNI，等真有第 2-3 個節慶且 pattern 穩了再抽）。對齊 §3 DragonBoat 介面凍結的同一紀律，往上延伸一層。

> **流程狀態歸屬（Eng review D1）**：App.svelte 現已 14 個 `$state` + ~340 行轉換邏輯（7 畫面 + 對戰房生命週期），已是重 orchestrator。festival 流程本身是個迷你狀態機（在哪一關、quiz 答完沒、boat 結果），**不可**再以散落的 `$state` 欄位塞進 App.svelte（否則 App.svelte 變新 god file，重演 CEO review 對 Play.svelte 的告誡）。抽成一個薄模組 `src/core/duanwu.svelte.js`（與 `advanceDuanwuProgress` 純函式同住或相鄰），持「flow step + 當前關」狀態並暴露推進動作；App.svelte 只認一個 `duanwuStep`/screen 旗號 + 掛對應元件。模組存資料與 store action（`open`/`advance`/`reset`），**不存 caller callback**（對齊 coding-style：callback 走 JSX 邊界）。

### 2.3 跨場進度鉤（CEO review 11A，Phase 1 必做）

DuanwuQuest 畫面頂部常駐一條進度鉤：`[Q版粽子SVG] {zongziTotal}/50 · 還差 {5-levelsCleared} 關救屈原`（圖示用 §5.1/§3 的 Q 版粽子 SVG component，**非 emoji**）。成本極低（讀 progress 推文字），但這是跨場回訪的主動力來源 — 孩子看到「還差 2 關就救出屈原」會明天再玩。屬 Phase 1 scope，不是 polish 後補。

### 2.4 解鎖規則

複製 `Levels.svelte` 的 `unlocked()`：第 1 關常開，第 N 關需第 N-1 關已通關（題答完 + 龍舟採滿）。

---

## 3. Arcade：龍舟撿粽子（`src/ui/components/DragonBoat.svelte`）

### 技術

- **單一 `<canvas>` + `requestAnimationFrame` game loop**。Svelte 只包外層（粽子計數、暫停、結束 callback）；遊戲狀態（龍舟位置、物件陣列、命數）放元件內部變數，**不進任何全域 store / QuizSession**。
- 元件 props：`{ onComplete: (zongziCollected) => void }`（callback 走 JSX prop，不進 store — 對齊 coding-style.md「狀態存資料不存 callback」）。
- `onDestroy` 清掉 rAF。

### 渲染選型決策：Canvas 2D（已評估否決 Three.js / Pixi.js / Phaser）

| 方案 | 包大小 | 對本玩法的實質幫助 | 適合時機 |
|---|---|---|---|
| **Canvas 2D + rAF** | 0 | 全手寫，但此遊戲簡單到手寫很短（碰撞 AABB 十行、輸入三事件、物件一陣列每幀更新 y） | **本案** |
| Pixi.js | ~130KB | 幾乎沒有（純渲染器，邏輯仍自寫；程式碼量一樣，只換 WebGL 後端） | 同屏上千 sprite/particle |
| Phaser | ~250KB | 有（scene/physics/input/tween 現成） | 要做**多個**或更複雜的 arcade |
| Three.js | ~150KB | 無（玩法本質 2D，3D 維度用不到，還要生 3D 資產） | 真 3D 場景 |

本案同屏物件 <20 個，WebGL 批次渲染優勢完全發揮不出來；框架省的 boilerplate 換不回包大小與新心智模型。故選 Canvas 2D。

### 介面凍結（保留未來換框架的彈性，但現在不付框架稅）

> 背景：使用者未定是否走「節慶 arcade 系列」（中秋打月餅、過年放鞭炮…）。若真走系列，Phaser 當共用引擎才划算（一次學多次用，成本攤平）。為此**現在不上框架，但把龍舟對外介面凍結成最小契約**，將來換引擎只改一個檔。

- **對外契約**：`DragonBoat.svelte` 只暴露 `props: { onComplete: (zongziCollected: number) => void }`。內部自管 canvas、game loop、命數；採滿 10 顆或失敗時呼叫 `onComplete`。
- quest orchestrator 與 `App.svelte` **只認這個介面，不知道裡面是 Canvas 還是 Phaser**。
- 將來要換 Phaser/Pixi：只重寫 `DragonBoat.svelte` 內部，props 介面不變，流程一行不改。換引擎成本鎖在單一檔案。
- 對齊 CLAUDE.md「well-defined interfaces，可獨立替換內部不破壞 consumer」。

### 玩法

- **3 條水道**，龍舟在底部某一道
- **操作**：
  - 左右鍵 / 點螢幕左半屏、右半屏 → 切換到左/右道
  - 空白鍵 / 點螢幕中間 → 跳起（短暫無敵躍過障礙）。**滯空中再按跳無效**（忽略輸入直到落地，不做 double-jump）
- **河面向下捲動**，從頂端隨機生成兩種物件：
  - 障礙物（石頭 🪨 / 漩渦 🌀）→ 撞到 -1 條命
  - 粽子（Q 版粽子 SVG，非 emoji）→ 撿到 +1，目標採滿 10 顆
- **碰撞**：AABB（軸對齊矩形），物件陣列每幀更新 y 位置、檢查與龍舟重疊。**物件捲出畫面底部即從陣列移除**（cull），避免陣列在一輪內無上限成長
- **生命**：龍舟 3 條命。撞障礙 -1。**命歸零 = 這輪龍舟失敗，重跑該關龍舟（題目不用重答）**
- **完成合約（CEO review 1A）**：`onComplete(n)` 一律回傳實際採到的粽子數 `n`（0-10），不分成功/失敗走同一個 callback。
  - 採滿 10（`n === 10`）→ 該關過關：進度的 `levelsCleared` 與 `zongziTotal` 在「過關那一刻」一次寫入（zongziTotal += 10），進下一關。
  - 不滿 10（命歸零或中途收手）→ 不過關，停在本關，可重跑龍舟（題目不重答）。
  - **重跑不累加**：zongziTotal 只在過關時 +10，重跑龍舟不會把上一輪採的部分粽子重複計入。`levelsCleared` 是進度的唯一真相，zongziTotal 由它推導（= levelsCleared × 10）。
- **採滿 10 顆 = 過關**，回 quest 流程記進度
- **時長**：約 15-20 秒一輪（生成速率與河面速度調校達標）

### 果汁感（純 Canvas，零 3D）

- sprite：**核心碰撞物（粽子、障礙、龍舟）用 inline SVG/path，不用 emoji**（Codex #9 + user 指示）。emoji 跨平台外觀/尺寸/baseline/缺字不穩，拿來當碰撞物 hitbox 會漂、視覺不一致。
- **粽子一律用「Q 版粽子 SVG」，禁用 emoji 糰子（🍡 其實是日式糰子 dango，非粽子）**：手繪一個 Q 版粽子 inline SVG —— 三角粽形、深綠粽葉包裹（用 `--reed`）、露出米白／糯米色尖角、可加一條綁繩，圓潤可愛貼 candy 調性。此 SVG 是**全 event 唯一的粽子資產**，arcade collectible、進度鉤、result/結局慶祝、分享卡全部共用同一個 SVG component（如 `src/ui/components/Zongzi.svelte` 或 theme 內的 SVG symbol），不得各畫面各畫一版。
- 其餘 sprite：龍舟 🐉🛶 改 inline SVG（江上龍舟剪影 + 龍頭）、障礙改 SVG（石頭/漩渦）。emoji 只可用在純裝飾背景點綴（非碰撞、非核心識別物）。
- 河面漸層波光（canvas gradient + 簡單正弦波動）
- 撿粽子彈跳 particle、龍舟左右擺動 tween
- 不做 3D model、相機、光照

### 防雷清單（CEO review 2A，實作時必做）

手寫 game loop 的兩個必踩雷，實作時一定要防：

1. **canvas context null 守衛**：`canvas.getContext('2d')` 可能回 null（極舊瀏覽器 / canvas 未掛載）。loop 啟動前檢查，null 則 early-return 並顯示 fallback 提示，不可讓 rAF 迴圈每幀 throw。
2. **dt clamp（防 tab 切換 tunneling）**：用 `performance.now()` 自算每幀真實 dt（不信 rAF 傳入的 timestamp 一路累積），並 clamp 上限（如 ~50ms）。孩子切去別的 tab 再切回，rAF 暫停後恢復會產生巨大 dt → 物件瞬間飛一大段 → 碰撞檢測穿透（無端扣命或障礙被跳過）。clamp 後超過上限的幀當一幀跳，碰撞不穿透。與 `session.svelte.js` 已採的 deadline 時間戳紀律一致。
3. **canvas resize / 手機轉向（CEO review 4A）**：canvas 尺寸連動容器（`ResizeObserver` 或 `resize`/`orientationchange` 事件重算），並依 `devicePixelRatio` 設 backing store 尺寸（免在 retina 螢幕糊掉）。道寬與所有物件座標用**相對比例**而非絕對像素，裝置轉向時畫面不爆版、龍舟不跑出畫面外。小孩主力在手機，這條是 event 第一印象。
4. **input ownership（Codex outside voice）**：左右鍵/空白鍵要 `preventDefault()`（否則桌機空白鍵捲動頁面），canvas 容器設 `touch-action: none`（否則手機觸控操作會捲動頁面）。遊戲進行中接管這些輸入，遊戲結束後解除。列為驗收項。

---

## 4. 進度與解鎖（`src/core/storage.js`）

複製現有 `getLevelStars` pattern，**獨立 key** 避免污染正規闖關。進度以 `clearedLevels`（已過關關號集合）為唯一真相，其餘欄位皆由它推導（Eng review D3）：

```js
// clearedLevels 是已通關關號陣列（去重），levelsCleared/zongziTotal/rescued 全由它推導
getDuanwuProgress: () => get('duanwu_progress', { clearedLevels: [], rescued: false }),
setDuanwuProgress: (p) => set('duanwu_progress', p),
```

- **跨場累積**：已過關關號存 `clearedLevels`，可分幾次玩
- **救屈原觸發**：`clearedLevels.length >= 5` → 顯示救屈原結局畫面（5 關各 10 題、各 10 粽子，達成即 50/50）
- 結局畫面（`SaveQuyuan`）：見 §2.2 完成路徑（本關結算 + 救屈原 + 分享卡，最小版動畫）

### 進度推導純函式 + 自檢（CEO review 6A + Eng review D3）

進度推導是本 event 唯一「算錯就壞」的邏輯（算錯 → 孩子永遠救不到屈原或提前觸發）。函式**吃關號**，用 set 去重，**根治重玩已過關關卡的超累 bug**（盲 `+1` 會讓重玩第 1 關 5 次就誤觸 rescue）：

```js
// 純函式：吃舊進度 + 剛打的關號 + 本輪龍舟採到的粽子數，回新進度（不 mutate）
export function advanceDuanwuProgress(prev, levelN, collected) {
  if (collected < 10) return prev;                          // 不滿 10 不過關，原樣返回
  if (prev.clearedLevels.includes(levelN)) return prev;     // 重玩已過關卡：set 不變，數字不膨脹
  const clearedLevels = [...prev.clearedLevels, levelN];    // 不 mutate，spread 回新陣列
  return {
    clearedLevels,
    rescued: prev.rescued || (clearedLevels.length >= 5)    // 5 關全破即救出，且不退回
  };
}

// 衍生 getter（UI 用）：
export const zongziTotal = (p) => p.clearedLevels.length * 10;   // 0,10,20...50
export const levelsCleared = (p) => p.clearedLevels.length;
```

配一個 assert-based 自檢（不加測試框架，沿用專案 validate/audit/smoke 調性；放 `scripts/` 或函式檔末的 `// @ts-check` demo）：
- `advanceDuanwuProgress({clearedLevels:[],rescued:false}, 1, 10)` → `clearedLevels:[1]`，`zongziTotal=10`
- `advanceDuanwuProgress({clearedLevels:[1],...}, 2, 7)` → 原樣返回（不滿 10 不過關）
- `advanceDuanwuProgress({clearedLevels:[1],...}, 1, 10)` → 原樣返回（**重玩第 1 關不重複計入**）
- 依序打 1-5 各採滿 → `clearedLevels:[1,2,3,4,5]`，`rescued:true`，`zongziTotal=50`
- 打 1 關後重玩 5 次 → `clearedLevels:[1]`，`rescued:false`（**不會誤觸 rescue**，這是 D3 修的核心 case）

---

## 5. 視覺設計（Design review）

> 校準基準：現有 `src/ui/theme.css` 設計系統 —— 糖果色 × 課本楷書 × 果凍彈跳。所有 event 視覺貼這套，不引入新視覺語言（避免 AI slop；本 event AI-slop 風險低 9/10，因繼承獨特設計系統）。

### 5.1 端午配色（Design review D3 + user：結合端午元素）

現有 5 tint（berry/mint/sun/grape/leaf）已被 daily/sprint/levels/duel 佔用。端午 event 需獨立視覺認同，新增一組**端午專屬配色**，每色綁一個真實端午元素，加進 `theme.css`：

| token | 色值 | 端午元素 | 用途 |
|---|---|---|---|
| `--reed` | `#5BA86B` | 艾草／菖蒲綠（掛門驅邪） | **event 主 tint** — 入口卡、quest hero、主 CTA |
| `--reed-deep` | `#3E8A52` | 深艾草 | jelly 按鈕下緣陰影（對齊 `.btn` offset shadow 慣例） |
| `--river` | `#3FA7C4` | 汨羅江青藍（龍舟競渡） | arcade 河面、次要 accent |
| `--zong` | `#C97B3A` | 粽葉烤糯米褐 | Q 版粽子 SVG 的米色尖角、進度鉤、粽子 collectible 高亮 |
| `--cinnabar` | `#E5544A` | 雄黃酒／硃砂避邪 | 障礙物 / 扣命 accent（與既有 berry 同色系，和諧不衝突） |

- 艾草綠是現有 5 色缺的冷暖中間點，雄黃紅是 berry 的近親 → 整組塞進 candy 系統不打架。
- 視覺敘事：入口卡/quest = 艾草綠（驅邪祈福），arcade = 江水青藍 + 粽褐 + 障礙硃砂，結局 = 艾草綠收束。**一眼是端午，不是某現有模式 recolor。**
- 仍守 theme.css 既有形（`--radius` 24px、jelly `.btn` offset shadow、楷書標題）。

### 5.2 各畫面視覺階層（Design review D4，Pass 1）

**DuanwuQuest（孩子反覆回來的主畫面）— 三層階層：**

```
┌─────────────────────────────────┐
│  ① 進度鉤（情緒錨，艾草綠底）        │  ← hero：[Q版粽子SVG] N/50 · 還差 X 關救屈原
│     楷書大字，視覺重但不可點          │     （5 秒掃描第一眼落這）
├─────────────────────────────────┤
│  ② 關卡路徑（主體佔版面）            │  ← 5 關卡片，沿用 Levels.svelte 路徑排版
│     [1汨羅]→[2龍舟]→[3粽子]...      │     已過關打勾、鎖關灰階
│                                   │
│  ③ ▶ 下一關（唯一主 CTA）           │  ← 當前可玩關用 reed 果凍彈跳高亮
│     果凍彈跳，最搶眼                  │     孩子一眼知道點哪（don't make me think）
└─────────────────────────────────┘
```

- 階層服務（hierarchy as service）：進度鉤給「為何而戰」的情緒，路徑給「打到哪」的位置感，CTA 給「現在點這」的明確動作。三者大小/色彩/動態分明，不互搶。
- 「下一關」CTA 是唯一果凍彈跳元素 → 三秒掃描即知下一步（Krug don't-make-me-think）。

### 5.3 救屈原結局「記憶點」幕（Design review D2，Pass 3）

> save-quyuan 是整個 event 的情緒高潮（孩子磨 50 題 + 5 輪龍舟才到）。**不做純靜態最小版**，做一個有記憶點的 5 秒視覺高潮，全用現有 theme 的 pop/bounce keyframes（不加重依賴）。

**美術參考（user 提供，`A_joyful_cinematic_first_perso.mp4` + 兩張截圖）**：第一人稱 POV，**屈原雙手緊握「你」的雙手，把你拉起來轉**（不只單向拉上岸，是互握帶轉的動感），開懷大笑露齒、飄逸長髮、**髮髻上插一片粽葉/菖蒲葉**（綠、超端午），白漢服＋綠草葉紋＋綠腰帶＋寬袖飄動；三角粽（粽葉＋綁繩，非糰子）大小不一往天空飛散，混粉色花瓣；陽光汨羅江（青藍）＋綠草坡＋大量野花＋遠山藍天，左遠處紅色看台/廟，廣角魚眼＋動態模糊。**此影片/截圖是美術參照（mood/構圖），不是資產**——用手繪 Q 版 SVG/CSS 重現「構圖與感覺」，貼糖果色×楷書×果凍彈跳調性（寫實 3D 與兒童遊戲調性不合；Q 版更可愛、零依賴、端午趕得上）。選型決策見 Design review D5（否決嵌影片）。

> 必留的高識別細節（重現時別丟）：(1) **雙手互握、他拉你轉**的姿態（情緒核心）；(2) 屈原**髮髻插粽葉**（一眼端午）；(3) 三角粽＋綁繩（非糰子，對齊 §5.1 Q版粽子 SVG）；(4) 漢服**艾草綠緣**（對上 `--reed`，你的手臂袖口也是這個綠 → POV 一致）。

**重現方式（純 SVG/CSS，分層）**：

```
  ┌──────────────────────────────────────┐
  │  天空藍 + 暖陽光暈（CSS radial gradient）  │  背景層：汨羅江水(river青藍,左)+綠草坡(reed,右)
  │      ☁      ☀     [遠山/紅看台]          │  + 野花點點 + 遠山，輕微 parallax
  │     Q版屈原(置中偏上)                      │  主體：手繪 SVG，開懷笑臉、長髮往側飛、
  │   髮髻插粽葉🌿  ＼笑／                     │        髮髻插粽葉、白漢服(reed綠緣+草葉紋+綠腰帶)
  │      ╲手  握  手╱                        │  動作：屈原雙手往下緣伸，與「你的手」緊握
  │   [你的手臂]🤝  🤝[你的手臂]               │  POV：下緣左右兩條「你的手臂」剪影(reed綠緣袖)
  │                                        │        往上握住屈原 → 第一人稱「他拉你轉」
  └──────────────────────────────────────┘
   三角粽(Q版SVG,大小不一) + 粉花瓣 從中心往外放射飛散
   （CSS staggered transform + 果凍彈跳，仿廣角魚眼的放射感）
```

- **視覺高潮**（CSS keyframes，複用 theme 果凍彈跳，約 5 秒一次性播放）：
  1. 屈原從畫面遠處彈跳放大進場（pop-in scale + overshoot），雙手往下緣「你的手」伸來
  2. **互握瞬間**：屈原手與你的手相接，整個畫面輕微 `rotate`（仿「拉你轉一圈」的旋轉動感）+ 屈原長髮/袖口往側飄（transform）
  3. 三角粽（§5.1 Q 版粽子 SVG）＋粉花瓣從中心放射狀飛散（多個元素 staggered transform，仿參考的「四散飛舞」）
  4. 微魚眼/放射感用 `scale` + 邊緣輕微 `rotate` 模擬廣角（不上 3D，純 transform）
  5. 收束定格：屈原笑臉（髮髻粽葉）+ 「你救出屈原了！」楷書大字，艾草綠收束底
- **POV 呼應**：畫面下緣左右放兩條「你的手臂」剪影（漢服 reed 綠緣袖，對上你穿的同色），往上與屈原雙手緊握——呼應參考第一人稱「他拉你起來轉」。Q 版扁平剪影，不寫實。
- **成就文字**：一句讀者文 + 戰績數字（用了 N 天、最高連擊 X、答對率）。
- **一鍵分享卡**：走 `src/lib/share.js` 海報（見 §2.2），海報構圖沿用這幕（Q 版屈原 + 飛散粽子 + 戰績）。
- 時間視野：5 秒視覺（彈跳動畫）+ 5 分鐘行為（分享）+ 長期（這個 moment 是孩子記得這 event 的原因）。
- **資產**：Q 版屈原 SVG 為本幕專屬新增（`src/ui/components/Quyuan.svelte` 或結局畫面內聯）——含開懷笑臉、**髮髻插粽葉**、白漢服 reed 綠緣 + 草葉紋 + 綠腰帶、**雙手前伸**姿態；粽子複用 §5.1 共用 Zongzi SVG。

### 5.3a 結局呈現選型（Design review D5）

> user 參考影片為 AI 生成電影級 3D（寫實、魚眼 POV、動態模糊、7MB mp4）。評估三案後選**手繪 Q 版 SVG/CSS 重現構圖**：

| 方案 | 取捨 | 結論 |
|---|---|---|
| **A 手繪 Q 版 SVG/CSS（選用）** | 零依賴、零 build step、貼糖果色調、端午趕得上；視覺非電影級但更可愛、一致 | ✅ 採用 |
| B 嵌預渲染 mp4 | 視覺最炸，但寫實 3D 脫節兒童糖果調、影片進 git/bundle 肥大(~7MB)、穩定品質的屈原影片非 2 天事、手機自動播放/頻寬限制要踩 | ❌ 否決 |
| C 混合（SVG 主 + 背景輕量影片層） | 多一點電影感，但仍以手繪為主；背景影片層可列 Phase 2 | 暫不做（YAGNI，先 A） |

對齊專案「純前端、無 build step 以外工具鏈」慣例與 ponytail（不為一個結局幕引入影片管線）。

### 5.4 互動狀態與空狀態（Pass 2）

- **DuanwuQuest 首次空狀態**（只開 L1、0/50）：不可冷清。進度鉤顯「[Q版粽子SVG] 0/50 · 救屈原大冒險開始！」+ L1 卡果凍彈跳召喚，其餘關卡灰階預告主題（給「還有什麼可玩」的期待）。空狀態是 feature 不是空白。
- **duanwu-result 兩態**：全對 → 滿分慶祝（粽子+10 彈跳、艾草綠）；有錯 → 仍正向（「採滿 10 顆粽子！下關見」），不羞辱答錯。
- 鎖關 toast 沿用 Levels.svelte（「先通過第 N 關」）。

### 5.5 RWD 與無障礙（Pass 6）

- **DragonBoat 觸控目標 ≥ 44px**：左右切道/跳躍的觸控熱區（點螢幕左右/中）本就是大區塊，確認熱區 ≥ 44px。
- **DuanwuQuest 關卡卡鍵盤可達**：沿用 Levels.svelte 的 `<button>` 結構（原生 focus/Enter 可達），新卡片維持 button 語意。
- **Canvas a11y fallback**：Canvas 遊戲本質純視覺，`<canvas>` 加 `aria-label="龍舟撿粽子小遊戲"`，並在 canvas 旁放 sr-only 文字說明操作（左右鍵切道、空白鍵跳）。龍舟非核心學習內容（答題才是），a11y 以「可感知+可跳過」為度，不強求螢幕報讀者完整可玩。
- **配色對比**：reed/river/zong/cinnabar 用於大色塊與圖示，文字仍走既有 `--ink`（深褐）on candy paper，維持 ≥4.5:1；端午色不用於小字本文。

### 5.6 知識題長選項 UI（Devex review D3）

> 現有答題畫面選項是為「注音」設計（短，`Play.svelte` 字音題用大字/格子排）。端午知識題選項是多字句子（「湖南省」「楚懷王」「划龍舟是為了驅趕江中魚蝦」），塞進短注音格子會爆格、高度不一、手機難點。

- **知識題（kind: 'fact'）選項改垂直堆疊清單**：每選項一整橫條、全寬、左對齊文字、可自動換行（多字/長句不爆格）、觸控目標高度 ≥ 44px。沿用 theme `.card` 圓角 + jelly press，但**不用字音題的格子排版**。
- **`Play.svelte` 依 `kind` 切換選項排版**：`kind === 'fact'` → 垂直長條清單（讀文字）；`kind === 'char'`/字音 → 維持原格子/大字（`ZhuyinCol`）。題幹也依 kind 切：fact → 顯示 `question` 完整問句；字音 → 原「target 在句中 / 怎麼唸」。
- **題幹區**：知識題題幹是完整問句（可能兩行），用楷書 + 適當行高，與選項清單拉開間距（heading 靠近其選項，遠離上一題殘影）。
- **回饋態**：答完顯示正解選項高亮（綠）+ 選錯紅 + `fun` 史實補充（知識題的 fun 是史實冷知識，比字音題的「唸錯啦」更長，回饋區要容得下）。
- 對齊 Krug「選項可讀 > 形式一致」：知識題與字音題排版不同是對的（clarity trumps consistency）。

## 上線時機與分階段（CEO review 9A）

> 今天 2026-06-17，端午節 2026-06-19/20。節慶 event 過了節點價值掃半。最費時的長杆是 50 題逐題過簡編本 audit（部分詞簡編本查無要退 moedict 覆核）。兩天未必跑得完整包 → 拆兩階段，arcade 與骨架不被 audit 卡住。

> **修正（Eng review D8 + Codex #4/#7）**：原 Phase 1「題庫不足也先上、關卡動態降級」**作廢**。理由：(a) `selectQuestions` 題池不足會**靜默放寬難度/類別**，caller 拿不到「降級了」的訊號，動態 count 不可靠；(b)「降級先上」與「5 關全破=50 題救屈原」自相矛盾 → 孩子湊不到 5 關 = 看得到完不了的 event。**不以 workaround 當解法。**

- **Phase 1（節前，目標 6/19 前）— 完整可玩**：
  - **題庫必須湊滿 5 關 × 10 題 = 50 題全過 audit** 才上線。這是硬門檻，不降級。
  - 並行加速：arcade/骨架（Session A）與題庫（Session B）平行做；arcade 不被 audit 卡。題庫是長杆，全力衝 50 題過 audit。
  - 救屈原門檻恆為 5 關全破，不掛鉤、不打折。
- **Phase 2（節後，選配）— 打磨**：手感微調、結局動畫加強、雲端端午榜（若 D2b-mix TODO 採納）等非阻上線項。

> 若 6/19 前 50 題真的趕不出來：**寧可晚一兩天上完整版，也不上「看得到完不了」的半成品**（對齊 user「不以 workaround 當解法」原則）。時機固然重要，但殘缺 event 的負面第一印象比晚兩天更傷。

## 不做（YAGNI）

- 不碰雲端 / 排行榜 / Supabase
- 不上遊戲框架（Three.js / Pixi.js / Phaser）— 詳見 §3 渲染選型。介面凍結後將來真走系列再抽 Phaser，現在不付框架稅
- 不重寫或污染 QuizSession 狀態機
- 救屈原結局做「記憶點」幕（§5.3）：5 秒果凍彈跳高潮 + 成就文字 + 分享卡，**不做**過場動畫大片 / 多場景過場（Design review D2 把「純靜態最小版」升級為單畫面記憶點幕，仍是單畫面，但有情緒高潮）
- 龍舟不做關卡難度遞增（每關龍舟同難度即可，先求能玩；之後要加再說）

---

## 動到的檔案清單

| 檔案 | 動作 | Session |
|---|---|---|
| `src/ui/components/DragonBoat.svelte` | 新增（Canvas arcade） | **A** |
| `src/ui/components/Zongzi.svelte`（或 theme SVG symbol） | 新增（Q 版粽子 SVG，全 event 共用，arcade 也用） | **A**（資產，B 也引用） |
| `src/ui/components/Quyuan.svelte` | 新增（Q 版屈原 SVG，結局幕用：髮髻粽葉/reed 綠緣漢服/雙手前伸） | B（結局幕） |
| `src/ui/theme.css` | 加端午配色 token（reed/river/zong/cinnabar，§5.1） | B |
| `src/data/bank/duanwu.js` | 新增（50 題，按難度區分配） | B |
| `src/data/bank/index.js` | 註冊 duanwu 類別 | B |
| `src/modes.js` | 新增 `DUANWU_LEVELS` + 鎖 category wrapper | B |
| `src/ui/screens/DuanwuQuest.svelte` | 新增（關卡選擇 + 進度鉤，複製 Levels.svelte） | B |
| `src/ui/screens/SaveQuyuan.svelte`（或元件） | 新增（救屈原結局，最小版） | B |
| `src/ui/screens/Home.svelte` | 加端午王入口卡 | B |
| `src/App.svelte` | festival wrapper 路由 + 進度純函式接線（唯一交集：import DragonBoat） | B（接 A） |
| `src/core/storage.js` | 加 `duanwu_progress` key + `advanceDuanwuProgress` 純函式 + 自檢 | B |

## 平行實作拆分（兩個 agent session 同時做）

§3 的 DragonBoat 介面凍結（`onComplete(n: number)`）讓「龍舟 arcade」與「答題/闖關流程」可完全平行開發、零檔案衝突。**契約先凍，兩邊各自對著契約做，最後在 App.svelte 接線。**

### 凍結的契約（兩 session 動工前先共識，之後不准單方改）

```js
// DragonBoat.svelte 對外介面（唯一接點）
// props: { onComplete: (zongziCollected: number /* 0-10 */) => void }
// 行為: 內部自管 canvas/loop/命數/resize；採滿 10 或命歸零或收手時呼叫 onComplete(實際採到數)

// 進度推導純函式（Session B 提供，Session A 不需要，但 App.svelte 接線時會用）
// advanceDuanwuProgress(prev, collected) → newProgress   （見 §4 6A）
```

### Session A — 龍舟 arcade（純獨立，無依賴）

- **唯一檔案**：`src/ui/components/DragonBoat.svelte`（新增）
- **做什麼**：Canvas 2D + rAF game loop、3 條道、左右切道、跳躍躲障礙、撿粽子、3 條命、果汁感。落實 §3 全部（防雷清單 2A：ctx null 守衛 + dt clamp；4A：resize/DPR；cull）。
- **對外**：只接受 `onComplete(n)` prop，採滿 10 / 命歸零 / 收手時呼叫它回傳實際採到數。
- **自驗**：元件可獨立掛一個 demo 頁（或暫時在 Home 加臨時按鈕）跑起來測手感，不必等答題流程。**不碰** App.svelte / storage / modes / bank 任何檔。

### Session B — 答題 + 闖關流程 + 題庫 + 接線

- **檔案**：`src/data/bank/duanwu.js`（新增題庫）、`src/data/bank/index.js`（註冊類別）、`src/modes.js`（`DUANWU_LEVELS` + 鎖 category wrapper）、`src/ui/screens/DuanwuQuest.svelte`（新增，複製 Levels）、`src/ui/screens/SaveQuyuan.svelte`（新增結局）、`src/ui/screens/Home.svelte`（入口卡）、`src/App.svelte`（festival wrapper 路由 + 進度推導純函式接線）、`src/core/storage.js`（`duanwu_progress` key + advanceDuanwuProgress）
- **做什麼**：§1 題庫、§2 闖關流程與 festival wrapper（Approach B）、§2.3 進度鉤、§4 進度純函式與自檢（6A）、2B validate 斷言、9A Phase 1 動態降級。
- **對 DragonBoat 的依賴**：只用 `<DragonBoat onComplete={...} />` 這一個介面。開發期間若 DragonBoat 還沒好，**用一個 stub**（一個按鈕「假裝採滿 10 顆」呼叫 `onComplete(10)`）替身，接線邏輯照樣完整可測。Session A 完成後把 stub 換成真元件即可。

### 衝突面（唯一交集）

- **只有 `App.svelte` 的 `import DragonBoat`** 是交集點，且只是一行 import + 一個 `<DragonBoat>` 標籤。Session B 用 stub 開發、Session A 交付真元件，最後 Session B 把 import 指到真檔。**無其他共用檔。**
- 兩 session 都會跑 `npm run build`；合併時各自分支 rebase 後 build 一次確認。

### 合併順序

1. Session A 先合（DragonBoat 純新增檔，零風險）。
2. Session B 合（把 stub 換成真 import），跑 build + validate + 手動走查全流程。

## 驗收

- `npm run build` 編譯過
- `npm run validate` 題庫 schema 過 + 2B 足量斷言過（Phase 2 硬性；Phase 1 容許動態降級並標示）
- `npm run audit` 注音對簡編本權威層過（或誤報入白名單並註明依據）
- 進度推導純函式自檢（6A）通過
- 手動走查：Home → 端午王 → 各關「答題 → 龍舟採 10 粽子 → 本關結算+分享卡」→ 進度鉤更新 → 5 關全破觸發救屈原結局+分享卡
- 手機走查：轉向不爆版（4A）、切 tab 再回來碰撞不穿透（2A）
- **REGRESSION（Eng review D2，鐵則必驗）**：玩完端午 event 後，**全域排行榜（local_board + 雲端）零筆 duanwu 紀錄** — 端午 quiz 完成路徑絕不可呼叫 `submitRun()` / `addLocalScore()`。反向驗證：暫時讓 duanwu 走 `finishGame` 確認榜上冒出 duanwu 筆數（RED），改回獨立路徑確認消失（GREEN）。
- 進度自檢（6A+D3）：`node scripts/duanwu-progress-check.mjs` 全綠，含「重玩第 1 關 5 次不誤觸 rescue」case

## Implementation Tasks
Synthesized from CEO + Eng review findings. P1 blocks ship; P2 same-branch follow-up.

> 估算修正（Codex #11）：50 題逐題查簡編本 + 合理 distractors + 過 audit + 白名單，是**真實長杆**，非機械任務；Canvas mobile arcade 含手感調校也遠超 25min。下列 CC 估算已上修。

- [x] **T1 (P1, human: ~2d / CC: ~1.5h)** — DragonBoat arcade（Session A）— Canvas 2D 3 道/切道/跳躍/障礙/粽子/3命/`onComplete(n)` 契約 + SVG sprite + 手感調校 ✅ **DONE 2026-06-18**
  - Surfaced by: Sec1 1A + Sec2 2A（ctx null + dt clamp）+ Sec4 4A（resize/DPR）+ Codex #9（SVG sprite）+ input ownership
  - Files: `src/ui/components/DragonBoat.svelte`（新增）, `src/ui/components/dragonBoatSprites.js`（新增 SVG sprite 字串：龍舟/粽子/石頭/漩渦）
  - Verify: 獨立 demo 頁測手感；切 tab 碰撞不穿透；手機轉向不爆版；空白鍵不捲頁/canvas touch-action:none
  - **實作狀態**：全部防雷項落實（ctx null 守衛 / dt clamp 50ms / ResizeObserver+DPR / preventDefault+touch-action:none / 出界 cull）。果汁感：SVG sprite（禁 emoji）+ 河面漸層波光 + 撿粽 particle + 龍舟擺動。a11y：aria-label + sr-only 操作說明。
  - **agent-browser 三輪實測迭代（demo 頁 `dragonboat-demo.html`，dev-only `window.__boat` hook 經 `import.meta.env.DEV` 守衛、production tree-shake 掉）**：
    - R1 難度爆表（幾秒冤死）→ 障礙 44%→28%、捲動 0.32→0.26、生成間隔 0.62→0.85、粽子 hitbox 放大/障礙 hitbox 縮小。
    - R2 邊角驗證：碰撞扣命/跳躍躲避/retry 歸零/橫式轉向不爆版 皆通過，無元件 bug。
    - R3 程式碼隱患：finish() setTimeout 對 stale 元件回呼 → onDestroy + retry 清 finishTimer；無解障礙牆取樣 61 次 0 命中。
    - 最終：`npm run build` 過；bot 完整跑通 win→`onComplete(10)`、fail→回傳實際採到數。
  - **demo 頁（ephemeral 測試）**：`dragonboat-demo.html` + `src/DragonBoatDemo.svelte` + `src/dragonBoatDemo.js`，未進 vite rollupOptions build input（不入正式產物）。
  - **未做（YAGNI，移交 Session B/上層）**：「收手」中途離開的 onComplete 部分回傳路徑屬 App.svelte 接線層，非元件範圍。
- [ ] **T2 (P1, human: ~1d / CC: ~30min)** — festival 流程 + flow 模組（Session B）— Approach B wrapper（quiz關→arcade→結算→寫進度），流程狀態抽 `src/core/duanwu.svelte.js`（不堆進 App.svelte），對 DragonBoat stub 開發
  - Surfaced by: Sec1 architecture（Approach B）+ Eng D1（flow 狀態歸屬）
  - Files: `src/core/duanwu.svelte.js`(新增 flow 模組), `src/App.svelte`(只認 duanwuStep 旗號), `src/ui/screens/DuanwuQuest.svelte`, `src/ui/screens/Home.svelte`
  - Verify: 用 stub（假裝採滿10）跑通整條流程；App.svelte 不新增散落 festival $state
- [ ] **T2b (P1, human: ~3h / CC: ~25min)** — 端午完成路徑 + 結算/分享（Eng D2/D2b + Codex #2/#8）— 獨立完成路徑（不 submitRun / 不 addLocalScore / **不 recordQuestionAttempts** / 不跳 result），新增 duanwu-result + save-quyuan 分享卡，分享走 `share.js`
  - Surfaced by: Sec2 D2 + D2b + Codex #2（recordQuestionAttempts 雲端污染）+ Codex #8（用 share.js 非 challenge.js）
  - Files: `src/App.svelte`(完成路徑分流), `src/ui/screens/SaveQuyuan.svelte`, `src/ui/screens/DuanwuResult.svelte`(新增), `src/lib/share.js`(擴海報)
  - Verify: REGRESSION — 玩完 event 後全域榜零 duanwu 筆數 + 雲端 question stats 零 duanwu（反向驗 RED→GREEN）
- [ ] **T3 (P1, human: ~2h / CC: ~15min)** — 進度純函式（吃關號 set，Eng D3）— `advanceDuanwuProgress(prev, levelN, collected)` + `scripts/duanwu-progress-check.mjs` 自檢
  - Surfaced by: Sec6 6A + Sec1 1A + Eng D3（盲 +1 重玩超累 bug）
  - Files: `src/core/duanwu.js`(純函式), `src/core/storage.js`(clearedLevels key), `scripts/duanwu-progress-check.mjs`(自檢)
  - Verify: 5 案例全綠，含「重玩第 1 關 5 次不誤觸 rescue」
- [x] **T4 (P1, human: ~3-4d / CC: ~3-4h)** — duanwu 題庫（**fun fact 知識題**，Devex D1/D2/D4 + user）— 50 題 `kind:'fact'`（5 chapter 各 10，難度=驚奇度梯度），題幹勾奇問法、誘答有梗、`fun` 一句想轉發、每題標 `source` 史實/科學來源。poem 關可混 1-2 字音題。**長杆改「史實查證+寫 fun fact」非字音 audit** ✅ **DONE 2026-06-18（Session B）— 交付 89 題（80~100 範圍，超原 50 題目標），multi-agent workflow 廣建 150 → 3 輪獨立審查濃縮（史實查證 81 題實查/5 fix、fun 品質去重、配額收斂）→ 89。每 chapter ≥10、難度 1-5 全覆蓋、8 取材軸全有。審查紀錄+報告見 docs/superpowers/duanwu-bank-build/**
  - Surfaced by: Devex D1（kind:fact schema）+ D2（核史實非字音 audit）+ D4（fun fact 調/驚奇度）+ user（同時代對照/科學破迷思取材）
  - Files: `src/data/bank/duanwu.js`, `src/data/bank/index.js`
  - Verify: `npm run validate` 過（fact schema 齊全）；每題 source 可靠；fun fact「講給朋友會哦一聲」測試；poem 字音題過 audit；50 題各掛正確 chapter
- [x] **T4b (P1, human: ~1h / CC: ~15min)** — 引擎 `toQuestion` 支援 `kind:'fact'`（Devex D1）— 加分支：選項由 `item.options` 直接建 `{text, correct}`、正解由 answer/correctText 標。字音題分支不動，QuizSession 零改動 ✅ **DONE 2026-06-18（Session B）— fact 分支用 `item.options.map((text,i)=>({text,correct:i===item.answer}))` 洗牌；字音/反考字分支零改動；回歸自檢驗過**
  - Surfaced by: Devex D1（向下相容引擎）
  - Files: `src/core/bank.js`(toQuestion)
  - Verify: fact 題選項正確洗牌+判定；既有字音題回歸無破壞
- [x] **T5 (P1, human: ~45min / CC: ~10min)** — validate 斷言 — 每關 chapter 題數 ≥ count（硬性，無降級）+ event-only 類別不進一般模式選池 ✅ **DONE 2026-06-18（Session B）— validate-bank.mjs 加 fact schema 分支 + 兩條足量斷言（chapter+難度 ≥count、隔離抽樣）。斷言當場抓出 quyuan 難度 1-2 僅 7 題，據此把該關 max 1→3**
  - Surfaced by: Sec2 2B + Eng D5（類別隔離）+ D8（取消動態降級）
  - Files: `scripts/validate-bank.mjs`, `src/modes.js`
  - Verify: 某 chapter 題不足時 validate 紅；duanwu 不出現在 daily/sprint 抽樣
- [x] **T6 (P1, human: ~45min / CC: ~10min)** — 跨場進度鉤 — DuanwuQuest 頂部「[Q版粽子SVG] N/50 · 還差 X 關救屈原」 ✅ **DONE 2026-06-18（Session B）— 進度鉤 hero（Zongzi SVG + N/50 + 還差 X 關 + meter），讀 storage.getDuanwuProgress 推導**
  - Surfaced by: Sec11 11A
  - Files: `src/ui/screens/DuanwuQuest.svelte`
  - Verify: 進度變動即時更新文字
- [ ] **T7 (P1, human: ~4h / CC: ~40min)** — 救屈原「記憶點」結局幕（Design D2/D5 + user 美術參考）— 第一人稱 POV 構圖：Q 版屈原雙手拉你轉、髮髻插粽葉、三角粽+花瓣放射飛散、汨羅江草坡背景，5 秒 CSS 果凍彈跳高潮 + 成就文字 + 分享卡。手繪 SVG/CSS 重現，**不嵌影片**（D5）
  - Surfaced by: Design review D2（Pass 3 情緒弧 4/10）+ D5（否決嵌影片）+ §5.3 + user 提供 `A_joyful_cinematic_first_perso.mp4` 美術參考
  - Files: `src/ui/screens/SaveQuyuan.svelte`, `src/ui/components/Quyuan.svelte`（Q 版屈原 SVG，髮髻粽葉/reed 綠緣漢服/雙手前伸）；粽子複用 Zongzi SVG
  - Verify: 5 關全破觸發；雙手互握→轉→粽子飛散彈跳動畫順；rescued idempotent；分享卡走 share.js；零嵌影片/零新依賴
- [x] **T8 (P1, 阻擋項)** — duanwu 題庫隔離 — `selectQuestions` 加 `EVENT_ONLY_CATEGORIES` 預設排除，一般模式不抽到端午題（**ship blocker**）✅ **DONE 2026-06-18（Session B）— `EVENT_ONLY_CATEGORIES=['duanwu']`，母池+兩處 fallback 都套；daily/sprint 抽樣零 duanwu，顯式 categories:['duanwu'] 仍抽得到。隔離測試逆向驗證有鑑別力**
  - Surfaced by: Codex #1（端午題全年亂入）= Eng D5
  - Files: `src/core/bank.js`
  - Verify: daily/sprint/levels 抽樣零 duanwu；duanwu 模式顯式抽得到
- [x] **T9 (P1, human: ~1h / CC: ~15min)** — 關卡主題鎖 + escalate 關 — DUANWU_LEVELS 加 chapter，selectQuestions 支援 chapter 過濾，端午關 escalate:false（+ 視情況 calibrated:false），第 5 關非 boss ✅ **DONE 2026-06-18（Session B）— modes.js DUANWU_LEVELS（5 關 chapter 鎖題）+ duanwuLevelConfig（escalate:false、calibrated:false、無 boss）+ selectQuestions chapter 參數。回歸自檢：5 關各選滿 10 題且全鎖對 chapter**
  - Surfaced by: Eng D6（主題分關 + escalate）+ Eng D7（第 5 關非 boss）+ Codex #3/#5/#6
  - Files: `src/modes.js`, `src/core/bank.js`(chapter 過濾)
  - Verify: 龍舟關只出 boat 題、粽子關只出 zongzi 題；連對後不冒出跨 chapter 題；第 5 關答完進龍舟不卡 boss
- [ ] **T10 (P1, 規劃項)** — 上線時機 — Phase 1 = 50 題全過 audit 才上（無降級）；趕不上寧晚一兩天上完整版
  - Surfaced by: Sec9 9A + Eng D8 + Codex #4/#7（取消動態降級的自相矛盾）
  - Files: 本 spec（執行紀律）
  - Verify: 不上「看得到完不了」的半成品
- [x] **T11 (P1, human: ~30min / CC: ~5min)** — 端午配色 token（Design D3 + user）— theme.css 加 reed/reed-deep/river/zong/cinnabar，各綁端午元素（§5.1） ✅ **DONE 2026-06-18（Session B）— theme.css 加 reed/reed-deep/river/river-deep/zong/cinnabar，各綁端午元素**
  - Surfaced by: Design review D3（Pass 5 設計系統對齊 6/10）+ user「結合端午元素」
  - Files: `src/ui/theme.css`
  - Verify: 入口卡/quest 用 reed；arcade 用 river+zong+cinnabar；不與現有 5 tint 撞色
- [x] **T12 (P1, human: ~1h / CC: ~15min)** — Q 版粽子 SVG（user 指示）— 手繪三角粽形 inline SVG（粽葉 reed 綠 + 米色尖角 + 綁繩），全 event 唯一粽子資產，arcade/進度鉤/result/結局/分享卡共用，**禁 emoji 糰子** ✅ **DONE 2026-06-18（Session A 先交付資產）**
  - Surfaced by: user 指示 + Codex #9（SVG sprite）
  - Files: `src/ui/components/Zongzi.svelte`（DOM 用，props: size/reed/reedDeep/rice/tie）
  - Verify: 全 event 粽子皆此 SVG；零 emoji 糰子（🍡）出現
  - **實作狀態**：Zongzi.svelte 供 DOM 場景（進度鉤/result/結局/分享卡）；arcade canvas 內用 `dragonBoatSprites.js` 的 `ZONGZI_SVG` 字串（同造型同色，drawImage 繪製）保證視覺一致。色值直接寫端午 palette（reed #5BA86B / reedDeep #3E8A52 / rice #F3E4C0 / tie #C97B3A），**未依賴 theme.css token**（token 屬 Session B T11，避免跨 session 衝突）；T11 落地後可改引 var()。
- [x] **T13 (P1, human: ~1h / CC: ~10min)** — DuanwuQuest 視覺階層（Design D4）— 進度鉤 hero / 關卡路徑主體 / 「下一關」唯一果凍彈跳 CTA（§5.2）+ 首次空狀態暖場（§5.4） ✅ **DONE 2026-06-18（Session B）— 三層階層：進度鉤 hero + S 形江水地圖（path snap 站點 offBy:0）+ 當前關 medal 脈動當唯一焦點。改地圖感（user 指示）。空狀態暖場文案未獨立做（進度鉤 0/50 已暖場），列 polish**
  - Surfaced by: Design review D4（Pass 1 IA 5/10）+ Pass 2 空狀態
  - Files: `src/ui/screens/DuanwuQuest.svelte`
  - Verify: 三秒掃描即知下一步；首次進場（0/50 只開 L1）不冷清
- [ ] **T14 (P2, human: ~30min / CC: ~8min)** — 無障礙 + RWD（Design Pass 6）— canvas aria-label + sr-only 操作說明；觸控熱區 ≥44px；端午色不用於小字本文（對比 ≥4.5:1）
  - Surfaced by: Design review Pass 6（6/10）
  - Files: `src/ui/components/DragonBoat.svelte`, `src/ui/screens/DuanwuQuest.svelte`
  - Verify: 鍵盤可達關卡卡；canvas 有 aria-label；觸控目標夠大
- [x] **T15 (P1, human: ~1.5h / CC: ~20min)** — 知識題長選項 UI（Devex D3）— Play.svelte 依 `kind` 切換：fact → 垂直堆疊長條清單（全寬/左對齊/可換行/≥44px）+ 題幹顯完整 question；字音 → 維持原格子。回饋區容得下長 fun fact 史實補充 ✅ **DONE 2026-06-18（Session B）— kind:'fact' 垂直長條選項 + 完整 question 題幹 + fun/source 回饋；字音/反考字維持 ZhuyinCol。額外加端午背景皮膚（:has(.qcard.fact)）**
  - Surfaced by: Devex review D3（長選項排版）
  - Files: `src/ui/screens/Play.svelte`
  - Verify: 長選項不爆格/可換行；fact 與字音題排版各自正確；手機觸控目標夠大

_Sec3 (Security)、Sec5 (Quality)、Sec7 (Perf)、Sec8 (Observability)、Sec10 (Trajectory): No new tasks。_

### 題型 pivot 對前面 review 的影響（2026-06-17 user 定案後補記）
> end-user 澄清「端午不考字音、全 fun fact 知識題」是在 CEO/Eng/Design 三 review **之後**才定案，推翻了原 spec「沿用字音對決」假設。影響評估：
> - **架構（Eng）仍成立**：QuizSession 零改動（kind:'fact' 向下相容，Devex D1 已驗證），festival wrapper/進度純函式/排行榜隔離全不受影響。
> - **CEO 9A 長杆改變**：字音 audit 不再是長杆（剩 poem 1-2 題），換成「史實/科學查證 + 寫 fun fact」新長杆，時程量級相當，Phase 1「50 題才上」原則不變。
> - **Design 不受影響**：arcade/結局/配色/SVG 與題型無關；唯一新增 Play.svelte 長選項 UI（T15）。
> - **未重跑三 review**：題型 pivot 不動架構骨幹，屬內容層 + 一個 UI 排版，不需重跑 CEO/Eng/Design；但若實作時發現 kind:'fact' 牽動更多引擎，回頭補 Eng review。

### 敘事框架定案（Codex #10，user 拍板 2026-06-18）

> **決定：保留「救屈原」作遊戲化願望框架**，不改「護屈原/祭屈原/送屈原」。
> 理由：「救屈原」是小孩跨場回訪的最強情緒鉤（spec §2.3 進度鉤「還差 X 關救屈原」、§5.3 結局高潮全靠它），熱血感無可取代。改成「護遺體」會讓 5-12 歲玩家的動力斷掉。

**但 event 主打「不教錯史實」（輪 1 還砍了 5 個史實誤傳），因此「救屈原」必須被明確框定為「我們的願望」，不可讓孩子真的以為粽子救活了屈原。** 化解動作（T7 結局幕必做，ship blocker 級內容要求）：

- **救屈原結局幕（SaveQuyuan）的成就文字，必須含一句史實點睛**，把「救活」明確還原成「記得」。範例文案（實作可微調語氣，但「他沒被救回來 + 粽子真正意義是被記得」兩個訊息點不可省）：
  > 「**你救出屈原了！**……其實啊，兩千多年前屈原投江後並沒有被救回來。當時的人們划船、丟粽子，是想讓魚蝦別咬壞他的身體。但因為大家年年都這樣記得他，屈原就用另一種方式——活在每一個端午節裡，活了兩千多年。**這次，換你把他的故事記住了。**」
- **進度鉤（§2.3）的「救屈原」字樣維持不變**（遊戲化動力來源，過程中保持願望感即可，史實校正集中在結局幕一次講清楚，不在每個畫面碎碎念）。
- **題庫已對齊**：duanwu 題庫（dw 系列）對「粽子由來」的題目皆據史實寫「餵魚蝦、護遺體、防蛟龍搶飯」（見 dw-006/dw-020 等，輪 1 史實已查證），**不存在任何「粽子救活屈原」的題目**——題庫層沒有誤導，誤導風險只在結局幕文案，已由上句點睛句封住。

> 對齊 user CLAUDE.md「不以 workaround 當解法」與本 event「破迷思、不誤傳」立意：用一句誠實的點睛把遊戲化框架與史實接上，而非偷偷迴避或假裝沒衝突。

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 1 | clean | SELECTIVE EXPANSION, 0 scope expansions, 7 findings resolved (1A/2A/2B/4A/6A/9A/11A) |
| Codex Review | outside voice | Independent 2nd opinion | 1 | issues_found | 11 raised, 8 folded into spec, 1 deferred (narrative), 2 already-covered |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | clean | 9 issues, 0 critical gaps (D1 flow module, D2/D2b completion path, D3 progress fn, + 5 Codex-driven) |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | clean | score 6/10 → 9/10, 4 decisions (D2 ending, D3 palette, D4 hierarchy, + Q版粽子 SVG per user) |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | not run |

- **CODEX:** found the ship blocker both Claude passes missed — duanwu questions leak into daily/sprint/levels year-round (D5). Also caught the Phase-1 vs rescue contradiction (D8), BOSS/flow conflict (D7), theme-vs-difficulty modeling gap (D6), and cloud question-stats pollution (D2 ext). 8 of 11 folded in.
- **DESIGN:** plan was strong on interaction logic (Eng pass) but weak on visual decisions (6/10). Added: 端午 palette (reed/river/zong/cinnabar tied to festival elements), DuanwuQuest hierarchy, memory-point 救屈原 ending, Q版粽子 SVG (no emoji dango per user). Now 9/10.
- **CROSS-MODEL:** No tension — Codex found a layer under the Claude findings (concrete code-level leaks); design review found an orthogonal axis (visual decisions) the eng review correctly didn't cover.
- **UNRESOLVED:** 0 blocking. 1 deferred taste call (救屈原 narrative, your decision).
- **VERDICT:** CEO + ENG + DESIGN CLEARED — ready to implement. 14 P1/P2 tasks (T1-T14). Ship blockers: T8 bank isolation, T4 bank-50, T2b leaderboard isolation, T9 theme lock.
