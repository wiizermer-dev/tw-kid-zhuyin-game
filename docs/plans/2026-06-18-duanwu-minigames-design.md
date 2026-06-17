# 端午王 — 五關 mini-game 設計

> 日期：2026-06-18
> 狀態：設計定案（brainstorming 產出），待轉實作
> 緣由：end-user 親測發現「每關都玩同一個龍舟撿粽子有點無聊」，要每關各配不同 mini-game。

## 一句話

端午王 5 關闖關，每關答完 10 題知識題後，玩一個**該關專屬的 mini-game**（玩法各不同），完成即過關。五個 mini-game 全部貼現有 `onComplete(n)` 契約，只是換元件。

## 設計原則（延續龍舟 Session A 的紀律）

- **契約凍結不變**：每個 mini-game 是獨立 Svelte 元件，唯一對外介面 `onComplete(zongziCollected)`，完成（採滿/到終點/包滿/拼滿/救起）回呼 `onComplete(10)`；失敗只顯示「再來一次」overlay、不回呼、不回傳部分數。App.svelte / quest 只認介面，不知道裡面是哪種玩法。
- **引擎零依賴**：mini-game 跟 `QuizSession` 完全分離，內部自管 canvas/loop/狀態，不進任何全域 store。
- **不抽框架（YAGNI）**：五個玩法的 game-loop 差異大（canvas / 純 DOM），不抽共用 base class。共用的只有「契約 + 端午 palette + 粽子 SVG 資產」，那些已是獨立檔可直接 import。
- **防雷沿用 DragonBoat 規格**：canvas 關一律 ctx null 守衛 + dt clamp 50ms + ResizeObserver/DPR + input ownership（preventDefault + touch-action:none）+ 物件 cull；a11y aria-label + sr-only 操作說明。

## 玩法軸（為何五關不膩）

| 軸 | 關 | 玩法本質 |
|---|---|---|
| 採集 | L1 龍舟撿粽子 | 切道閃避 + 撿物 |
| 競速 | L2 加速龍舟競渡 | 連點衝刺 + 對手競賽 |
| 節奏 | L3 包粽子 | 跟拍子三連點完成步驟 |
| 解謎 | L4 詩句拼句 | 拖曳排序（非反射神經，腦力調劑） |
| 防守 | L5 食人魚救屈原 | 走位巡防 + 自動火力，撐住不失守 |

五關手感全不同，且 L4 是唯一非手速關（讀+排），給節奏多樣性。

---

## 共用架構：mini-game registry（最小做法）

**關卡 → mini-game 對照**：`src/modes.js` 的 `DUANWU_LEVELS` 每關加 `game` 欄位：

```js
export const DUANWU_LEVELS = [
  { n: 1, name: '汨羅江畔', chapter: 'quyuan', game: 'dragonboat', ... },
  { n: 2, name: '划龍舟',   chapter: 'boat',   game: 'paddle',     ... },
  { n: 3, name: '包粽子',   chapter: 'zongzi', game: 'wrap',       ... },
  { n: 4, name: '詩詞關',   chapter: 'poem',   game: 'poem',       ... },
  { n: 5, name: '端午王',   chapter: 'king',   game: 'piranha',    ... },
];
```

**App.svelte 用一個 map 對到元件**：

```js
import DragonBoat from './ui/components/minigames/DragonBoat.svelte';
import PaddleRace from './ui/components/minigames/PaddleRace.svelte';
import WrapZongzi from './ui/components/minigames/WrapZongzi.svelte';
import PoemPuzzle from './ui/components/minigames/PoemPuzzle.svelte';
import Piranha    from './ui/components/minigames/Piranha.svelte';

const MINIGAMES = { dragonboat: DragonBoat, paddle: PaddleRace, wrap: WrapZongzi, poem: PoemPuzzle, piranha: Piranha };
```

進 arcade：`<svelte:component this={MINIGAMES[level.game]} onComplete={...} />`

**檔案搬移**：把現有 `DragonBoat.svelte` + `dragonBoatSprites.js` 移進新資料夾 `src/ui/components/minigames/`，五個 mini-game 同住。

**不做**：festivals registry / 獨立 store / 共用 game-loop 框架。等真有第二個節慶且 pattern 穩了再抽（對齊 spec §2.2 Approach B 同紀律）。

---

## L1 — 龍舟撿粽子（DragonBoat）✅ 已實作

見 `docs/superpowers/specs/2026-06-17-duanwu-king-event-design.md` §3 與 PR #8。
- 3 道、切道 + 跳躍躲障礙、撿粽子、3 命、combo + 升溫、金粽、雄黃酒護盾、划槳體感、鼓點條。
- 採滿 10 → `onComplete(10)`；命歸零 → 再划一次 overlay。
- 本案唯一動作：搬進 `minigames/`，其餘不改。

---

## L2 — 加速龍舟競渡（PaddleRace）

**主題**：划龍舟 → 連點體感 = 奮力划槳衝刺。

**玩法**：龍舟在賽道起點，**終點導向**（畫面有終點線）。狂點/狂按螢幕 → 龍舟往前衝；停手 → 水阻減速。先到終點過關。**有 1-2 條 NPC 對手龍舟**陪划（競渡感）。

**速度模型**：
```
每點一下：velocity += STROKE_IMPULSE
每幀：    velocity *= DRAG(0.96)；position += velocity * dt
```
連點疊加衝很快，停手緩緩滑行。

**契約對位**：划到終點 = `onComplete(10)`。寬鬆時限（~20s）內沒到終點，或輸給對手 → 「再划一次」overlay（不回呼）。

**funny point**：連點 combo → 船尾水花爆量 + 前傾衝刺 + 速度線；NPC 對手 AI（等速前進，給「贏過它」緊張）；鼓點隨划槳頻率變快；衝線船身彈跳 + 慶祝噴發。

**防雷**：ctx null / dt clamp / DPR / resize / input ownership；連點最小間隔（~50ms）防按住不放刷過（對小孩寬鬆）。a11y：「快速點擊螢幕划龍舟到終點」。

**資產**：複用龍舟 SVG；NPC 對手龍舟換色；新畫終點線 / 水花 / 速度線。時長 15-20s。

---

## L3 — 包粽子節奏（WrapZongzi）

**主題**：包粽子 → 動手包粽的步驟節奏。**定位：放鬆關**（5 關裡唯一不緊張的喘息關，無時限、無失敗）。

**玩法（節奏點擊）**：每顆粽子完成三步驟序列 ① 鋪粽葉 → ② 放料 → ③ 綁繩。三個區域按鈕（粽葉/料/繩），一個**提示光圈**依序停在「現在該點哪個」，對準時點對 = 完美（粽子漂亮 + combo），點錯/太慢 = 該顆重來（不罰、只是慢）。包滿 10 顆過關。

**完成回饋**：每包好一顆，Q 版粽子（複用 Zongzi SVG）彈進右側**蒸籠**堆疊，堆滿 10 顆 → 蒸籠冒煙過關。

**契約對位**：包好 N 顆 = 進度 N，包滿 10 → `onComplete(10)`。無失敗（包錯重包該顆），無時限。

**funny point**：完美三連 → combo「N 連包!」；**南北粽彩蛋**（偶爾提示「這顆包北部粽/南部粽」，點對加分，把 L3 知識題「南北粽」fun fact 帶進玩法）；蒸籠堆疊 + 集滿冒蒸氣。

**防雷**：點擊 input ownership；時機判定用 dt 累積（非牆鐘）；ctx/DPR/resize 同規格。a11y 操作說明。

**資產**：粽葉/料/繩三步驟圖示（新畫，簡單）、蒸籠（新畫）、粽子複用 Zongzi SVG。時長 15-20s。

---

## L4 — 詩句拼句（PoemPuzzle）

**主題**：詩詞關 → 屈原《離騷》《天問》與端午名句。spec 本就是唯一可混字音題的關。**唯一非反射神經關**（讀 + 排序），給五關腦力調劑。

**玩法（拖曳主 + 點擊 fallback）**：給一句打散的端午/屈原名句，字卡洗亂排下方，**拖曳**字卡依序拉進上方空格拼回正確順序。拖對 = 卡進去，拖錯/放空 = 彈回原位（不罰）。全句排對 → 整句金光 + 下一句。拼滿 10 句過關。

例：打散 `兮　長太息　涕　以掩　哀民生之　多艱　余` → 正解 `長太息以掩涕兮，哀民生之多艱`（離騷）。

**契約對位**：拼對 N 句 = 進度 N，拼滿 10 → `onComplete(10)`。無失敗（拼錯回位重排）。輕度計時加成（不限時，結算秀「神速詩人」），不逼迫。

**實作取捨（必做）**：
- **純 DOM（非 canvas）**：字卡是 button、排版 flexbox，更簡單、a11y 天然好。
- **拖曳主 + 點擊 fallback**：拖曳為主手感，但保留「點字卡也能依序填格」當無障礙/小小孩 fallback（拖不動可用點的）。
- 拖移要 `touch-action: none` + 防頁面捲動（手機 input ownership，同 canvas 紀律）。

**funny point**：拼對整句 → 字逐個 staggered bounce + 金光；**出處彩蛋**（拼完顯示「— 屈原《離騷》」+ 一句白話，把 fun fact 帶進玩法）；連續拼對 combo「文思泉湧」。字卡用楷書 `--font-kai`。

**Session B TODO（內容工作量）**：
- 備一份**端午/屈原詩句資料**（10+ 句，含正解順序、出處、白話翻譯），跟知識題一樣**查證可靠出處**（離騷/天問真句，簡編本/可信典籍）。
- 元件先用佔位示例句可開發；正式詩句資料交 Session B 查證流程。

時長 20-30s（讀+排，腦力關慢一點合理）。

---

## L5 — 食人魚救屈原（Piranha）— 救屈原高潮

**主題 + 敘事收尾**：屈原在水中掙扎，食人魚（民間「投粽餵魚護屍」傳說的遊戲化）從四面圍攻，玩家操龍舟粽子炮船護住屈原撐到救起。**唯一防守型**玩法（前四關採集/競速/節奏/解謎，這關保護不失守）。難度最高（spec L5 難度 4-5）。

**玩法**：
- 屈原在**畫面中心**（水中掙扎、露出雙手），周圍一圈體力/血量環。
- 食人魚從**四面八方**游向中心屈原，碰到屈原 = 扣體力。
- 玩家操一艘**龍舟粽子炮船**繞場巡防：**螢幕虛擬搖桿**（按住拖動控方向；桌機 WASD/方向鍵 fallback）控炮船上下左右走位。
- 炮船**自動發射**：自動朝最近的魚連發粽子炮（玩家只管走位，單手操作，小孩不手忙腳亂）。
- 撐住屈原體力不歸零 + 擊退魚潮（撐過 waves）→ 救起。

**契約對位**：救援進度條（擊退魚數 / 撐過時間）撐滿 → `onComplete(10)`。屈原體力歸零 = 失敗 → 「再救一次」overlay（不回呼）。**過關先暫定回 quest**（結局幕由 Session B 觸發；玩法→敘事的 fade 接 §5.3 列 Session B 後續）。

**funny point**：粽子炮拋物線 + 落點炸開水花 + 魚被擊退翻肚；連續擊退 combo「N 連擊退!」；**魚潮一波波（wave）升溫**，最後一波最兇；屈原求救氣泡（「快救我！」）增情感；擊退最後一條魚 → 慢動作 → 屈原浮起。

**防雷（最複雜的一關）**：多魚同屏 → 物件池 + cull；AABB 碰撞（魚 vs 屈原體力環、粽子炮炸開範圍 vs 魚）；ctx null / dt clamp（魚潮下尤其關鍵，切 tab 不能讓魚瞬移穿過屈原）/ DPR / resize；input ownership（虛擬搖桿 pointer 事件 preventDefault + touch-action:none）。a11y：「操控炮船保護屈原，擊退食人魚」。

**資產**：食人魚 SVG（新畫，Q 版兇魚）、水中掙扎屈原 SVG（可複用/簡化 §5.3 Quyuan SVG）、龍舟粽子炮船（複用龍舟 SVG）、粽子炮複用 Zongzi、水花炸開。時長 20-30s。

---

## 動到的檔案清單

| 檔案 | 動作 |
|---|---|
| `src/ui/components/minigames/DragonBoat.svelte` | 從 `components/` 搬入（L1，已實作） |
| `src/ui/components/minigames/dragonBoatSprites.js` | 同上搬入 |
| `src/ui/components/minigames/PaddleRace.svelte` | 新增（L2） |
| `src/ui/components/minigames/WrapZongzi.svelte` | 新增（L3） |
| `src/ui/components/minigames/PoemPuzzle.svelte` | 新增（L4，純 DOM） |
| `src/ui/components/minigames/Piranha.svelte` | 新增（L5） |
| 各 mini-game 的 sprite 檔 | 視需要新增（同 dragonBoatSprites 模式） |
| `src/modes.js` | `DUANWU_LEVELS` 每關加 `game` 欄位 |
| `src/App.svelte` | mini-game registry map + `<svelte:component>` 派發 |
| `src/data/poem/duanwu-poems.js`（暫名） | 新增（L4 詩句資料，Session B 查證） |

## 實作順序建議

1. 搬 DragonBoat 進 `minigames/` + 建 registry map（最小骨架，先讓 L1 走 registry 跑通）。
2. L2 PaddleRace（canvas，玩法簡單，先驗 registry 換元件可行）。
3. L3 WrapZongzi（節奏點擊）。
4. L5 Piranha（最複雜，canvas 多物件 + 虛擬搖桿，留充裕時間）。
5. L4 PoemPuzzle（純 DOM，獨立性最高，可平行；詩句資料等 Session B）。

每個 mini-game 各自建獨立 demo 頁測手感（沿用 `dragonboat-demo.html` 模式），agent-browser 實測，再接 registry。

## 驗收（每個 mini-game）

- `npm run build` 過
- 獨立 demo 頁手感測 + agent-browser 實測
- 契約：完成 → `onComplete(10)`；失敗 → overlay 不回呼（反向驗證）
- 防雷：切 tab 碰撞/狀態不穿透、手機轉向不爆版、輸入不捲頁
- a11y：aria-label + 操作說明 + 鍵盤/觸控 fallback

## 不做（YAGNI）

- 不抽共用 game-loop 框架 / base class（五玩法差異大）
- 不做「小遊戲區」單獨入口（mini-game 綁關卡，重玩走重玩該關）
- 不做難度動態校正（每關 mini-game 固定難度即可）
- L5 玩法→結局幕的 fade 接續列 Session B 後續（本 doc 暫定回 quest）
