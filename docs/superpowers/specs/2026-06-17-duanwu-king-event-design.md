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

- **新檔** `src/data/bank/duanwu.js`，沿用現有題目 schema：
  `{ id, text, target, zhuyin, distractors[1-3], meaning, fun, tags[], difficulty(1-5), era }`
- **id 前綴 `dw`**，連號 `dw-001`～`dw-050`（格式對齊現有 `tk-001` 有 hyphen 慣例）
- **註冊**：`src/data/bank/index.js` 的 `CATEGORIES` 加一筆 `duanwu: { label: '端午', icon: <注音>, items: duanwu }`
- **先寫滿 50 題**（5 關各 10），event 上線即可玩滿全程
- **題目走 audit/validate**：簡編本權威層優先，與其他類別同規格。注音以教育部《國語辭典簡編本》為第一依據（見 `docs/audit-playbook.md`）

### 50 題的主題分佈（對應 5 關）

| 關 | 主題 | 難度 | 題數 |
|---|---|---|---|
| 1 汨羅江畔 | 屈原生平、楚辭 | 1-2 | 10 |
| 2 划龍舟 | 龍舟、競渡習俗 | 2-3 | 10 |
| 3 包粽子 | 粽子、飲食、艾草菖蒲雄黃 | 2-3 | 10 |
| 4 詩詞關 | 端午詩詞、典故 | 3-4 | 10 |
| 5 端午王（BOSS）| 綜合深度歷史 | 4-5 | 10 |

> 題目仍是「給語境＋注音的字音對決」（沿用引擎玩法），只是 text/target/meaning/fun 全圍繞端午主題。例：target 取自端午相關生難字（如「菖蒲」「角黍」「汨羅」等）。

**題庫足量驗證（CEO review 2B）**：50 題必須**按 5 關的難度區間分配**（L1 難度 1-2 ×10、L2 難度 2-3 ×10、L3 難度 2-3 ×10、L4 難度 3-4 ×10、L5 難度 4-5 ×10），確保每關 `selectQuestions(categories:['duanwu'], minDifficulty, maxDifficulty, count:10)` 都選得滿 10 題。`npm run validate` 加一條斷言：對每個 `DUANWU_LEVELS` 關卡，duanwu 類別中落在其難度區間的題數 ≥ 該關 count。題庫不足會在建置期就紅，不會到孩子手上才發現關卡變短（靜默失敗）。

---

## 2. 流程：端午闖關 orchestrator

### 2.1 關卡設定（`src/modes.js`）

新增 `DUANWU_LEVELS` 陣列（**獨立於現有 `LEVELS`**，不混用）：

```js
export const DUANWU_LEVELS = [
  { n: 1, name: '汨羅江畔', min: 1, max: 2, count: 10 },
  { n: 2, name: '划龍舟',   min: 2, max: 3, count: 10 },
  { n: 3, name: '包粽子',   min: 2, max: 3, count: 10 },
  { n: 4, name: '詩詞關',   min: 3, max: 4, count: 10 },
  { n: 5, name: '端午王', min: 4, max: 5, count: 10, boss: true,
    bossName: '端午王', bossHp: 10, hearts: 3, perQuestionSeconds: 12,
    bossIntro: '...' }
];
```

- 選題鎖定 `categories: ['duanwu']`（每關 config 帶入），確保只出端午題
- 關卡 config 複用 `levelConfig()`（或加一個薄 wrapper 鎖 category），不另寫狀態機
- BOSS 關沿用現有 boss 機制（血條、限時、hearts）

### 2.2 畫面流程（`src/App.svelte` + 新 screen）

複製 levels 的 screen 切換邏輯，新增 event 專屬路由：

```
home（端午王入口卡）
  → duanwu-quest（關卡選擇畫面，複製 Levels.svelte 結構）
    → play（QuizSession 跑該關 10 題，modeKey='duanwu'）
      → dragonboat（答完該關 → 龍舟 arcade 採 10 粽子）
        → 採滿 → 記進度 → 回 duanwu-quest（解鎖下一關）
  → 集滿 5 關 + 50 粽子 → save-quyuan（救屈原結局畫面）
```

- `App.svelte` 加 `modeKey === 'duanwu'` 分支：答完一關不直接進 result，而是切到 `dragonboat` screen
- 龍舟結束 callback 回寫進度，再切回 `duanwu-quest`
- **入口**：Home 加一張端午王限定入口卡（節慶 tint），點進 `duanwu-quest`

> **架構決策（CEO review, Approach B）**：App.svelte 的 duanwu 串接寫成一段通用「節慶流程」wrapper（`quiz關 → arcade → 寫進度 → quest`），DUANWU_LEVELS 與 DragonBoat 當第一個實例填進去，而非寫死的 `modeKey==='duanwu'` 一次性特例。現在只多寫一個薄 wrapper，將來中秋/過年只需換題庫類別 + 換 arcade 元件，App.svelte 不再加第二個近乎重複的分支。**不做** festivals registry / 獨立 store（YAGNI，等真有第 2-3 個節慶且 pattern 穩了再抽）。對齊 §3 DragonBoat 介面凍結的同一紀律，往上延伸一層。

### 2.3 跨場進度鉤（CEO review 11A，Phase 1 必做）

DuanwuQuest 畫面頂部常駐一條進度鉤：`🍡 {zongziTotal}/50 · 還差 {5-levelsCleared} 關救屈原`。成本極低（讀 progress 推文字），但這是跨場回訪的主動力來源 — 孩子看到「還差 2 關就救出屈原」會明天再玩。屬 Phase 1 scope，不是 polish 後補。

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
  - 粽子 🍡 → 撿到 +1，目標採滿 10 顆
- **碰撞**：AABB（軸對齊矩形），物件陣列每幀更新 y 位置、檢查與龍舟重疊。**物件捲出畫面底部即從陣列移除**（cull），避免陣列在一輪內無上限成長
- **生命**：龍舟 3 條命。撞障礙 -1。**命歸零 = 這輪龍舟失敗，重跑該關龍舟（題目不用重答）**
- **完成合約（CEO review 1A）**：`onComplete(n)` 一律回傳實際採到的粽子數 `n`（0-10），不分成功/失敗走同一個 callback。
  - 採滿 10（`n === 10`）→ 該關過關：進度的 `levelsCleared` 與 `zongziTotal` 在「過關那一刻」一次寫入（zongziTotal += 10），進下一關。
  - 不滿 10（命歸零或中途收手）→ 不過關，停在本關，可重跑龍舟（題目不重答）。
  - **重跑不累加**：zongziTotal 只在過關時 +10，重跑龍舟不會把上一輪採的部分粽子重複計入。`levelsCleared` 是進度的唯一真相，zongziTotal 由它推導（= levelsCleared × 10）。
- **採滿 10 顆 = 過關**，回 quest 流程記進度
- **時長**：約 15-20 秒一輪（生成速率與河面速度調校達標）

### 果汁感（純 Canvas，零 3D）

- sprite 用 emoji / inline SVG：🐉🛶 龍舟、🪨🌀 障礙、🍡 粽子
- 河面漸層波光（canvas gradient + 簡單正弦波動）
- 撿粽子彈跳 particle、龍舟左右擺動 tween
- 不做 3D model、相機、光照

### 防雷清單（CEO review 2A，實作時必做）

手寫 game loop 的兩個必踩雷，實作時一定要防：

1. **canvas context null 守衛**：`canvas.getContext('2d')` 可能回 null（極舊瀏覽器 / canvas 未掛載）。loop 啟動前檢查，null 則 early-return 並顯示 fallback 提示，不可讓 rAF 迴圈每幀 throw。
2. **dt clamp（防 tab 切換 tunneling）**：用 `performance.now()` 自算每幀真實 dt（不信 rAF 傳入的 timestamp 一路累積），並 clamp 上限（如 ~50ms）。孩子切去別的 tab 再切回，rAF 暫停後恢復會產生巨大 dt → 物件瞬間飛一大段 → 碰撞檢測穿透（無端扣命或障礙被跳過）。clamp 後超過上限的幀當一幀跳，碰撞不穿透。與 `session.svelte.js` 已採的 deadline 時間戳紀律一致。
3. **canvas resize / 手機轉向（CEO review 4A）**：canvas 尺寸連動容器（`ResizeObserver` 或 `resize`/`orientationchange` 事件重算），並依 `devicePixelRatio` 設 backing store 尺寸（免在 retina 螢幕糊掉）。道寬與所有物件座標用**相對比例**而非絕對像素，裝置轉向時畫面不爆版、龍舟不跑出畫面外。小孩主力在手機，這條是 event 第一印象。

---

## 4. 進度與解鎖（`src/core/storage.js`）

複製現有 `getLevelStars` pattern，**獨立 key** 避免污染正規闖關：

```js
getDuanwuProgress: () => get('duanwu_progress', { levelsCleared: 0, zongziTotal: 0, rescued: false }),
setDuanwuProgress: (p) => set('duanwu_progress', p),
```

- **跨場累積**：答對題數（以通關數計）+ 粽子數存起來，可分幾次玩
- **救屈原觸發**：`levelsCleared >= 5 && zongziTotal >= 50` → 顯示救屈原結局畫面
- 結局畫面（`SaveQuyuan` / 一個 screen 或元件）：一張畫面 + 文字 + 簡單動畫（**最小版**，不做過場大片）

### 進度推導純函式 + 自檢（CEO review 6A）

進度推導是本 event 唯一「算錯就壞」的邏輯（算錯 → 孩子永遠救不到屈原或提前觸發）。抽成純函式：

```js
// 純函式：吃舊進度 + 本輪龍舟採到的粽子數，回新進度（不 mutate）
export function advanceDuanwuProgress(prev, collected) {
  if (collected < 10) return prev;                 // 不滿 10 不過關，原樣返回
  const levelsCleared = prev.levelsCleared + 1;
  return {
    levelsCleared,
    zongziTotal: levelsCleared * 10,               // zongzi 由 cleared 推導，重跑不重複加
    rescued: prev.rescued || (levelsCleared >= 5)  // 5 關全破即救出，且不退回
  };
}
```

配一個 assert-based 自檢（不加測試框架，沿用專案 validate/audit/smoke 調性；放 `scripts/` 或函式檔末的 `// @ts-check` demo）：
- `advanceDuanwuProgress({levelsCleared:0,zongziTotal:0,rescued:false}, 10)` → `levelsCleared:1, zongziTotal:10`
- `advanceDuanwuProgress({levelsCleared:1,...}, 7)` → 原樣返回（不過關）
- 連跑 5 次採滿 → `levelsCleared:5, zongziTotal:50, rescued:true`
- 過關後再跑（重玩同關情境）→ levelsCleared 不超過實際關數，zongziTotal 不重複膨脹

---

## 上線時機與分階段（CEO review 9A）

> 今天 2026-06-17，端午節 2026-06-19/20。節慶 event 過了節點價值掃半。最費時的長杆是 50 題逐題過簡編本 audit（部分詞簡編本查無要退 moedict 覆核）。兩天未必跑得完整包 → 拆兩階段，arcade 與骨架不被 audit 卡住。

- **Phase 1（節前，目標 6/19 前）— 能玩的最小可上線**：
  - festival 骨架 + DragonBoat arcade + DuanwuQuest + storage + 進度純函式（全部不依賴題庫完整度）。
  - 題庫先出**已過 audit 的題**，按難度區分配；若某關難度區暫時不足 10 題，**關卡 count 動態取「該區現有題數與 10 的較小值」**（不靜默截斷，UI 標示「題庫擴充中」），先有幾關玩幾關。孩子端午當天就玩得到龍舟+答題。
  - 救屈原結局可先上，門檻仍是 5 關全破；題庫沒滿 5 關足量前，達不到也合理（孩子會回訪）。
- **Phase 2（節後幾天）— 題庫補齊**：把剩餘題逐題過 audit 補滿 50 題/5 關足量，移除 Phase 1 的「題庫擴充中」動態降級，validate 2B 斷言轉為硬性（每關 ≥10）。

註：Phase 1 的動態降級是**過渡手段**，不是永久設計。Phase 2 必須恢復 2B 的足量硬斷言。

## 不做（YAGNI）

- 不碰雲端 / 排行榜 / Supabase
- 不上遊戲框架（Three.js / Pixi.js / Phaser）— 詳見 §3 渲染選型。介面凍結後將來真走系列再抽 Phaser，現在不付框架稅
- 不重寫或污染 QuizSession 狀態機
- 救屈原結局先做最小版（單畫面 + 文字 + 簡單動畫）
- 龍舟不做關卡難度遞增（每關龍舟同難度即可，先求能玩；之後要加再說）

---

## 動到的檔案清單

| 檔案 | 動作 | Session |
|---|---|---|
| `src/ui/components/DragonBoat.svelte` | 新增（Canvas arcade） | **A** |
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
- 手動走查：Home → 端午王 → 各關「答題 → 龍舟採 10 粽子」→ 進度鉤更新 → 5 關全破觸發救屈原結局
- 手機走查：轉向不爆版（4A）、切 tab 再回來碰撞不穿透（2A）

## Implementation Tasks
Synthesized from this CEO review's findings. P1 blocks ship; P2 same-branch follow-up.

- [ ] **T1 (P1, human: ~1.5d / CC: ~25min)** — DragonBoat arcade（Session A）— Canvas 2D 3 道/切道/跳躍/障礙/粽子/3命/`onComplete(n)` 契約
  - Surfaced by: Sec1 1A（完成合約）+ Sec2 2A（ctx null + dt clamp）+ Sec4 4A（resize/DPR）
  - Files: `src/ui/components/DragonBoat.svelte`
  - Verify: 獨立 demo 頁跑起來測手感；切 tab 回來碰撞不穿透；手機轉向不爆版
- [ ] **T2 (P1, human: ~1d / CC: ~20min)** — festival 流程（Session B）— App.svelte Approach B wrapper（quiz關→arcade→寫進度），對 DragonBoat stub 開發
  - Surfaced by: Sec1 architecture（Approach B）
  - Files: `src/App.svelte`, `src/ui/screens/DuanwuQuest.svelte`, `src/ui/screens/Home.svelte`
  - Verify: 用 stub（假裝採滿10）跑通整條流程
- [ ] **T3 (P1, human: ~2h / CC: ~10min)** — 進度純函式 — `advanceDuanwuProgress` + assert 自檢
  - Surfaced by: Sec6 6A + Sec1 1A
  - Files: `src/core/storage.js`
  - Verify: 自檢 4 案例（採滿過關/不滿不過/5關觸發rescue/重跑不重複加）全綠
- [ ] **T4 (P1, human: ~2d / CC: ~1.5h)** — duanwu 題庫 — 50 題按 5 難度區分配，全過 audit，註冊類別
  - Surfaced by: Sec2 2B
  - Files: `src/data/bank/duanwu.js`, `src/data/bank/index.js`
  - Verify: `npm run validate` + `npm run audit` 過
- [ ] **T5 (P1, human: ~30min / CC: ~5min)** — validate 足量斷言 — 每關難度區 ≥ count（Phase 2 硬性 / Phase 1 動態降級）
  - Surfaced by: Sec2 2B + Sec9 9A
  - Files: `scripts/validate.mjs`(或現有 validate 入口), `src/modes.js`
  - Verify: 題庫不足時 validate 紅
- [ ] **T6 (P1, human: ~45min / CC: ~8min)** — 跨場進度鉤 — DuanwuQuest 頂部「🍡 N/50 · 還差 X 關救屈原」
  - Surfaced by: Sec11 11A
  - Files: `src/ui/screens/DuanwuQuest.svelte`
  - Verify: 進度變動即時更新文字
- [ ] **T7 (P2, human: ~1h / CC: ~12min)** — 救屈原結局 — 最小版單畫面+文字+簡單動畫
  - Surfaced by: Sec11 design
  - Files: `src/ui/screens/SaveQuyuan.svelte`
  - Verify: 5 關全破觸發、rescued flag idempotent
- [ ] **T8 (P1, 規劃項)** — 兩階段上線 — Phase 1 節前能玩（題庫分批）/ Phase 2 補滿 50 題
  - Surfaced by: Sec9 9A
  - Files: 本 spec（執行紀律，非 code）
  - Verify: 6/19 前 Phase 1 可玩；節後 Phase 2 移除動態降級

_Sec3 (Security)、Sec5 (Quality)、Sec7 (Perf)、Sec8 (Observability)、Sec10 (Trajectory): No new tasks._
