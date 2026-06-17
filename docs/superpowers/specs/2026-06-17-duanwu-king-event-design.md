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

### 2.3 解鎖規則

複製 `Levels.svelte` 的 `unlocked()`：第 1 關常開，第 N 關需第 N-1 關已通關（題答完 + 龍舟採滿）。

---

## 3. Arcade：龍舟撿粽子（`src/ui/components/DragonBoat.svelte`）

### 技術

- **單一 `<canvas>` + `requestAnimationFrame` game loop**。Svelte 只包外層（粽子計數、暫停、結束 callback）；遊戲狀態（龍舟位置、物件陣列、命數）放元件內部變數，**不進任何全域 store / QuizSession**。
- 元件 props：`{ onComplete: (zongziCollected) => void }`（callback 走 JSX prop，不進 store — 對齊 coding-style.md「狀態存資料不存 callback」）。
- `onDestroy` 清掉 rAF。

### 玩法

- **3 條水道**，龍舟在底部某一道
- **操作**：
  - 左右鍵 / 點螢幕左半屏、右半屏 → 切換到左/右道
  - 空白鍵 / 點螢幕中間 → 跳起（短暫無敵躍過障礙）
- **河面向下捲動**，從頂端隨機生成兩種物件：
  - 障礙物（石頭 🪨 / 漩渦 🌀）→ 撞到 -1 條命
  - 粽子 🍡 → 撿到 +1，目標採滿 10 顆
- **碰撞**：AABB（軸對齊矩形），物件陣列每幀更新 y 位置、檢查與龍舟重疊
- **生命**：龍舟 3 條命。撞障礙 -1。**命歸零 = 這輪龍舟失敗，重跑該關龍舟（題目不用重答）**
- **採滿 10 顆 = 過關**，回 quest 流程記進度
- **時長**：約 15-20 秒一輪（生成速率與河面速度調校達標）

### 果汁感（純 Canvas，零 3D）

- sprite 用 emoji / inline SVG：🐉🛶 龍舟、🪨🌀 障礙、🍡 粽子
- 河面漸層波光（canvas gradient + 簡單正弦波動）
- 撿粽子彈跳 particle、龍舟左右擺動 tween
- 不做 3D model、相機、光照

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

---

## 不做（YAGNI）

- 不碰雲端 / 排行榜 / Supabase
- 不做 Three.js / 3D
- 不重寫或污染 QuizSession 狀態機
- 救屈原結局先做最小版（單畫面 + 文字 + 簡單動畫）
- 龍舟不做關卡難度遞增（每關龍舟同難度即可，先求能玩；之後要加再說）

---

## 動到的檔案清單

| 檔案 | 動作 |
|---|---|
| `src/data/bank/duanwu.js` | 新增（50 題） |
| `src/data/bank/index.js` | 註冊 duanwu 類別 |
| `src/modes.js` | 新增 `DUANWU_LEVELS`（+ 可能薄 wrapper 鎖 category） |
| `src/ui/components/DragonBoat.svelte` | 新增（Canvas arcade） |
| `src/ui/screens/DuanwuQuest.svelte` | 新增（關卡選擇，複製 Levels.svelte） |
| `src/ui/screens/SaveQuyuan.svelte`（或元件） | 新增（救屈原結局，最小版） |
| `src/ui/screens/Home.svelte` | 加端午王入口卡 |
| `src/App.svelte` | 加 duanwu 路由 + 龍舟 screen 切換 |
| `src/core/storage.js` | 加 `duanwu_progress` key |

## 驗收

- `npm run build` 編譯過
- `npm run validate` 題庫 schema 過（50 題 duanwu）
- `npm run audit` 注音對簡編本權威層過（或誤報入白名單並註明依據）
- 手動走查：Home → 端午王 → 5 關各「答 10 題 → 龍舟採 10 粽子」→ 救屈原結局觸發
