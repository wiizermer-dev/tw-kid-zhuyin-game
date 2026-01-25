# 🐛 Bug 修復日誌

## 2026-01-25

### 問題：導入路徑錯誤

**錯誤訊息：**
```
Failed to resolve import "../lib/questionGenerator.js" from "src/components/original/ReadingGame.svelte"
```

**原因：**
當我們將原版遊戲組件移動到 `src/components/original/` 目錄時，相對路徑需要調整。從子目錄需要向上多一層才能訪問 `src/lib/` 和 `src/data/`。

**修復內容：**

1. **src/components/original/ReadingGame.svelte**
   - ❌ `"../lib/questionGenerator.js"` 
   - ✅ `"../../lib/questionGenerator.js"`
   - ❌ `"../lib/supabase.js"`
   - ✅ `"../../lib/supabase.js"`

2. **src/components/original/Leaderboard.svelte**
   - ❌ `"../lib/supabase.js"`
   - ✅ `"../../lib/supabase.js"`

3. **src/lib/original/questionGenerator.js**
   - ❌ `'../data/wordBank.js'`
   - ✅ `'../../data/wordBank.js'`

**路徑規則：**

從 `src/components/original/` 訪問：
- `src/lib/` → 使用 `../../lib/`
- `src/data/` → 使用 `../../data/`
- 同目錄檔案 → 使用 `./檔案名`

從 `src/lib/original/` 訪問：
- `src/data/` → 使用 `../../data/`
- `src/lib/` → 使用 `../檔案名`

**測試方法：**
```bash
npm run dev
```

開啟 `http://localhost:5173` 確認：
1. 冒險模式正常運作
2. 可以切換到經典模式
3. 經典模式遊戲可以正常進行

**狀態：** ✅ 已修復

---

## 相對路徑備忘錄

### 目錄結構
```
src/
├── components/
│   ├── original/         # 經典模式備份
│   │   ├── ReadingGame.svelte
│   │   └── Leaderboard.svelte
│   ├── MainMenu.svelte
│   └── GameMap.svelte
├── lib/
│   ├── original/
│   │   └── questionGenerator.js
│   ├── audio.js
│   └── supabase.js
└── data/
    ├── chapters.js
    └── wordBank.js
```

### 路徑對照表

| 從哪裡 | 到哪裡 | 路徑 |
|--------|--------|------|
| components/ | lib/ | `../lib/` |
| components/original/ | lib/ | `../../lib/` |
| components/original/ | data/ | `../../data/` |
| lib/ | data/ | `../data/` |
| lib/original/ | data/ | `../../data/` |
| lib/original/ | lib/ | `../` |

### 檢查清單

在移動檔案後，檢查：
- [ ] import 語句的相對路徑
- [ ] 動態 import（如果有）
- [ ] 圖片或資源的路徑（如果有）
- [ ] CSS 中的 url() 路徑（如果有）

---

**提醒：** 當重構目錄結構時，記得更新所有相關的導入路徑！
