# 注音審題流程 Playbook

> 審題庫注音的標準流程與血淚教訓。改任何 `src/data/bank/*` 的 `zhuyin` 前必讀。
> 核心鐵則：**簡編本是唯一第一依據；moedict 是退階粗篩，會把人帶歪；白名單可能掩蓋真錯。**

## 辭典優先序（不可動搖）

1. **教育部《國語辭典簡編本》(concised)** — 第一依據。中小學教學標準，收音嚴謹貼課綱。
2. **《重編國語辭典修訂本》(moedict / revised)** — **僅在簡編本查無該字／該義項時**才退查。修訂本收大量冷僻又音、古音、通假音，會把這些當「第一正音」，對台灣教學標準而言屬退階來源。

簡編本與修訂本衝突時，**一律以簡編本為準**，不要憑記憶、不要憑 moedict、不要憑「我印象中讀某音」。

## 資料源與工具

| 用途 | 工具 | 說明 |
|---|---|---|
| 簡編本權威查證（離線） | `scripts/data/concised-dict.json` | 官方 xlsx 轉出，44399 詞。`npm run build-dict` 重建（需先下載官方 xlsx）。 |
| 簡編本線上查單詞 | curl search.jsp | 見下方「線上查證」 |
| 題庫稽核（日常） | `npm run audit` | 簡編本優先、moedict 退階；走 `VERIFIED_OK` 白名單 |
| 題庫全庫重審（揪白名單盲區） | `node scripts/reaudit-concised.mjs` | **忽略白名單**、純簡編本權威，揪出白名單可能掩蓋的真錯 |

官方簡編本 xlsx 下載頁（CC 授權可商用）：
`https://language.moe.gov.tw/001/Upload/Files/site_content/M0001/respub/dict_concised_download.html`

### 線上查證（離線檔缺時，或要確認單一爭議詞）

```bash
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
curl -sL -A "$UA" --data-urlencode "word=剽竊" -G \
  https://dict.concised.moe.edu.tw/search.jsp | grep 'name="Description"'
# → content="字詞:剽竊,注音:ㄆㄧㄠˋ　ㄑㄧㄝˋ,…"
```

- `search.jsp?word=X` 對**查得到的詞**會 302 redirect 到 `dictView.jsp?ID=N`，`-L` 跟著就直達含注音的 `<meta name="Description">`。
- **必須帶瀏覽器 User-Agent**，否則回空。
- 查無詞時不 redirect、meta 無注音。
- ⚠️ **不要用 WebFetch 查簡編本**：WebFetch 用小模型解析，且 search 頁是 302/JS，常回「查無資料」造成誤判（見教訓 1）。curl 才可靠。

## 標準審題流程

```
改某題 zhuyin →
  1. 查 concised-dict.json[詞條]（整詞優先）
       命中 → 抽目標字音節比對；對得上 ✓ 收工
       對不上 → 簡編本權威打臉，改題（依簡編本）
  2. 整詞查無（多為語境句，如「全民連署」非詞條）→ 抽核心詞（「連署」）再查 concised
       命中 → 同上
  3. 核心詞也查無 → 退查單字 concised-dict.json[字]
       答案在清單內 ✓；不在 → 需判斷是否古音/通假/專名
  4. 簡編本完全查無該字／該義項 → 退 moedict 修訂本，並在 fun 註明依據
  5. 改完跑 npm run audit（須 0 紅）+ 定期 node scripts/reaudit-concised.mjs
```

## 血淚教訓（真實 incident，2026-06-14）

### 教訓 1：別因為 WebFetch 抓不到就斷定「簡編本沒辦法對齊」
一開始用 WebFetch 打 `search.jsp` 回「查無資料」，就誤判簡編本無法程式化查證、退回靠記憶判斷。**錯。** 真相是 search.jsp 是 302 redirect（ID 在 Location header），且 WebFetch 解析不了；curl + 瀏覽器 UA + `-L` 一發就到。**抓不到 ≠ 不存在，先換工具再下結論。**

### 教訓 2：moedict（修訂本）會把人帶歪
靠 moedict + 記憶判定，一次寫錯 5 處，全被簡編本權威糾正：

| 詞 | 我（憑 moedict/記憶）寫 | 簡編本權威 |
|---|---|---|
| 熙熙攘攘 攘 | ㄖㄤˇ | **ㄖㄤˊ** |
| 逮捕 逮 | ㄉㄞˋ | **ㄉㄞˇ** |
| 連署 署 | ㄕㄨˇ | **ㄕㄨˋ** |
| 湮滅 湮 | ㄧㄢ | **ㄧㄣ** |
| 棋高一著 著 | ㄓㄠˊ | **ㄓㄨㄛˊ** |
| 剽竊 剽 | ㄆㄧㄠ | **ㄆㄧㄠˋ** |

### 教訓 3：白名單會掩蓋真錯，要定期「忽略白名單」全庫重審
`VERIFIED_OK` 白名單裡的題會被 audit `continue` 跳過。但白名單條目本身可能基於**沒真查證的錯誤前提**。

實例：`cl-151 廣廈` 的舊白名單註記「簡編本大廈ㄕㄚˋ」——這前提是錯的（從沒真查簡編本，ㄕㄚˋ 其實是大陸音）。簡編本「大廈」實為 **ㄒㄧㄚˋ**。靠 `reaudit-concised.mjs`（忽略白名單跑全庫）才揪出。

→ **加白名單時，註解必須寫明「真的查過簡編本、依據是什麼」；定期跑 reaudit 掃白名單盲區。**

### 教訓 4：簡編本查無的義項才退修訂本，且要明確標記
有些古文義項簡編本沒收：
- `cl-018 滄浪 浪=ㄌㄤˊ`（專名古音，簡編本單字浪只 ㄌㄤˋ）
- `cl-068 柔荑 荑=ㄊㄧˊ`（詩經嫩芽義；簡編本單字荑只收 ㄧˊ 除草義，無「柔荑」詞條）
- `cl-124 相繆 繆=ㄌㄧㄠˊ`（通「繚」，赤壁賦課本注）

這類維持傳統/修訂本音，但**必須加白名單並在 fun + 白名單註解寫清楚「簡編本未收此義項，退修訂本/課本依據」**，否則下次審題又會被當錯。
注意：`distractor 不得是 target 在簡編本的合法讀音`（如柔荑題不可拿 ㄧˊ 當誘答，會變成「選項其實也對」的不公平題）。

## 一句話總結

審注音的順序永遠是：**concised-dict.json → 核心詞 → 單字 → 才 moedict**。
別信記憶、別信 moedict 第一音、別信沒查證的舊白名單。
