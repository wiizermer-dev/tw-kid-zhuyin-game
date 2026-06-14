/**
 * 對照教育部辭典稽核題庫注音。
 *
 * ⚠️ 審題依據優先序：教育部《國語辭典簡編本》(dict.concised.moe.edu.tw) 為第一依據，
 *   簡編本查無才退《重編國語辭典修訂本》。本 script 打的萌典 API (moedict.tw) = 修訂本，
 *   屬「退階粗篩」來源。修訂本收很多冷僻又音，會把簡編本算錯的音當正讀 → 凡輸出牽涉
 *   又讀/多音爭議，必須回簡編本 dictView.jsp 人工覆核才算數（雙層稽核）。
 *   真實案例：tk-013 角色 簡編本收 ㄐㄩㄝˊ+ㄐㄧㄠˇ 兩讀，修訂本粗篩抓不到此題。
 *
 * 規則：
 *  1. 若該詞為辭典收錄詞條 → 取目標字在詞中對應音節，須等於題目答案。
 *  2. 否則查單字 → 答案須出現在該字讀音清單；若答案僅為「又音/語音/讀音」而某個錯項才是「正音(第一條)」→ 標為可疑。
 * 純唯讀稽核，不改檔。
 */
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BANK } from '../src/data/bank/index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// 教育部《國語辭典簡編本》官方離線資料（第一依據，權威來源）。
// 由 scripts/build-concised-dict.mjs 從官方 xlsx 轉出；不存在則退回線上 fallback + moedict 粗篩。
const CONCISED_JSON = join(__dirname, 'data', 'concised-dict.json');
const CONCISED = existsSync(CONCISED_JSON) ? JSON.parse(readFileSync(CONCISED_JSON, 'utf-8')) : null;
if (!CONCISED) {
  console.warn('⚠️  找不到簡編本離線資料 scripts/data/concised-dict.json，將退回 moedict 修訂本粗篩。');
  console.warn('   建議先跑：node scripts/build-concised-dict.mjs（需先下載官方 xlsx）');
}

async function moedict(word) {
  try {
    const res = await fetch(`https://www.moedict.tw/uni/${encodeURIComponent(word)}.json`, {
      headers: { Accept: 'application/json' }
    });
    if (!res.ok) return null;
    const d = await res.json();
    if (d.error) return null;
    return d;
  } catch {
    return null;
  }
}

// 教育部《國語辭典簡編本》= 第一依據（權威來源），用官方離線資料查證。
// 若離線檔缺失需臨時線上查單一詞（純 curl、無套件依賴）：
//   UA='Mozilla/5.0 ... Chrome/120.0 Safari/537.36'
//   curl -sL -A "$UA" --data-urlencode "word=剽竊" -G \
//     https://dict.concised.moe.edu.tw/search.jsp | grep 'name="Description"'
//   → content="字詞:剽竊,注音:ㄆㄧㄠˋ　ㄑㄧㄝˋ,…"（search.jsp 對查得到的詞 302 轉 dictView，-L 直達 meta）

// 簡編本查詞：讀官方離線資料，查無回 null。回傳該詞所有注音字串陣列。
function lookupConcised(word) {
  if (CONCISED && CONCISED[word]) return CONCISED[word];
  return null;
}

// 簡編本整詞注音 → 抽目標字音節，回傳該音節 norm 後的值；對不上回 null。
function concisedSyllable(zhuyinStr, text, target) {
  const syllables = zhuyinStr.split(/[\s　]+/).filter(Boolean);
  const chars = [...text];
  const idx = chars.indexOf(target);
  if (idx < 0 || syllables.length !== chars.length) return null;
  return norm(syllables[idx]);
}

// 萌典聲調記號 → 我們題庫用的格式（輕聲˙、二聲ˊ、三聲ˇ、四聲ˋ；一聲無符號）已一致
// 正規化：去空白 + 統一輕聲位置（題庫寫後置 ㄉㄨㄣ˙、萌典寫前置 ˙ㄉㄨㄣ，內容等價）
const norm = (s) => {
  let t = (s || '').replace(/\s+/g, '').trim();
  if (t.startsWith('˙')) t = t.slice(1) + '˙';
  return t;
};

// 已人工對照教育部辭典確認無誤的破音字（答案為該義項正確讀音，僅非辭典第一條）
const VERIFIED_OK = new Set([
  // 2026-06-12 題庫擴充（id-066~130 / cl-079~156 / ly-049~072）audit 誤報覆核：
  // 多為「破音字第一音排序」或「整句非詞條 fallback」誤報，逐題回簡編本確認
  'tk-034', // 蜿蜒 蜿=ㄨㄢ（簡編本 ㄨㄢ ㄧㄢˊ；修訂本標 ㄨㄢˇ 屬退階來源，依簡編本）
  'pp-067', // 去看大夫 大=ㄉㄞˋ（簡編本「大夫」醫生義 ㄉㄞˋ ㄈㄨ；整句 fallback 誤報）
  'id-089', // 千乘之國 乘=ㄕㄥˋ（兵車量詞，破音；修訂本詞條同）
  'id-107', // 深孚眾望 孚=ㄈㄨˊ（簡編本「孚」「孚眾望」皆 ㄈㄨˊ）
  'id-110', // 杯水車薪 車=ㄔㄜ（簡編本詞條 ㄔㄜ；ㄐㄩ 為修訂本古讀）
  'id-123', // 穿鑿附會 鑿=ㄗㄠˊ（簡編本詞條 ㄗㄠˊ；ㄗㄨㄛˋ 為修訂本古讀）
  'cl-085', // 莫春 莫=ㄇㄨˋ（通「暮」，論語課本注）
  'cl-090', // 敏而好學 好=ㄏㄠˋ（喜好義破音）
  'cl-091', // 石徑斜 斜=ㄒㄧㄝˊ（簡編本只收 ㄒㄧㄝˊ；ㄒㄧㄚˊ 為古音）
  'cl-092', // 見牛羊 見=ㄒㄧㄢˋ（通「現」破音）
  'cl-106', // 飲歸客 飲=ㄧㄣˋ（使動「給喝」破音）
  'cl-112', // 挑燈 挑=ㄊㄧㄠˇ（撥動義破音）
  'cl-120', // 陰翳 翳=ㄧˋ（遮蔽義；簡編本 ㄧˋ）
  'cl-124', // 山川相繆 繆=ㄌㄧㄠˊ（通「繚」，赤壁賦課本注）
  'cl-132', // 碩鼠 碩=ㄕㄨㄛˋ（簡編本「碩」ㄕㄨㄛˋ）
  'cl-134', // 調素琴 調=ㄊㄧㄠˊ（彈奏義破音）
  'cl-136', // 叨陪 叨=ㄊㄠ（謙詞承受義；簡編本「叨擾」ㄊㄠ）
  'cl-138', // 鼎鐺 鐺=ㄔㄥ（鍋義破音；鋃鐺才 ㄉㄤ）
  'cl-142', // 以遺陛下 遺=ㄨㄟˋ（給予義破音）
  'cl-143', // 性行 行=ㄒㄧㄥˋ（品行義破音；修訂本「性行」ㄒㄧㄥˋ ㄒㄧㄥˋ）
  'cl-147', // 窮匱 匱=ㄎㄨㄟˋ（缺乏義；ㄍㄨㄟˋ 通櫃才用）
  'cl-150', // 堂前燕 燕=ㄧㄢˋ（燕子；ㄧㄢ 限國名地名）
  'cl-151', // 廣廈 廈=ㄕㄚˋ（簡編本「大廈」ㄕㄚˋ；ㄒㄧㄚˋ 限廈門）
  'cl-154', // 俄頃 頃=ㄑㄧㄥˇ（片刻義；簡編本「頃刻」ㄑㄧㄥˇ）
  'ly-056', // 黃金葛 葛=ㄍㄜˊ（簡編本植物義 ㄍㄜˊ；ㄍㄜˇ 為俗讀）
  'ly-071', // 刻 刻=ㄎㄜˋ（簡編本 ㄎㄜˋ；ㄎㄜ 為修訂本讀音欄）
  'id-012', // 一葉扁舟 扁=ㄆㄧㄢ（小舟）
  'md-003', // 囤貨 囤=ㄊㄨㄣˊ（積聚）
  'md-011', // 發票載具 載=ㄗㄞˋ（乘載）
  'md-023', // 吐司夾蛋 夾=ㄐㄧㄚˊ（ㄐㄧㄚ為又音）
  'md-027', // 大撒幣 撒=ㄙㄚˇ（散布）
  'md-028', // 扛米 扛=ㄎㄤˊ（以肩荷物）
  // 2026-06-12 Andrea 審查員供題：簡編本覆核定案
  'pp-101', // 自力更生 更=ㄍㄥ（簡編本 ㄗˋ ㄌㄧˋ ㄍㄥ ㄕㄥ；修訂本標 ㄍㄥˋ 屬退階來源，同 id-110 先例）
  // 2026-06-11 整句非詞條導致單字 fallback 誤報，已以子詞對萌典覆核
  'tk-116', // 果實累累 累=ㄌㄟˊ（連接成串；簡編本例句）
  'tk-172', // 便給 給=ㄐㄧˇ（口才敏捷，重編本詞條）
  'md-032', // 肉燥飯 燥=ㄙㄠˋ（肉燥 ㄖㄡˋ ㄙㄠˋ）
  'md-077', // 投資標的 的=ㄉㄧˋ（簡編本「標的」ㄅㄧㄠ ㄉㄧˋ；修訂本誤報 ㄉㄜ˙ 為正音）
  'md-057', // 應援棒 應=ㄧㄥˋ（應援 ㄧㄥˋ ㄩㄢˊ）
  'md-060', // 通緝 緝=ㄑㄧˋ（通緝 ㄊㄨㄥ ㄑㄧˋ）
  'md-073', // 疫苗接種 種=ㄓㄨㄥˋ（接種 ㄐㄧㄝ ㄓㄨㄥˋ）
  'md-074', // 儲值 儲=ㄔㄨˊ（儲蓄 ㄔㄨˊ ㄒㄩˋ）
  'md-084', // 熨斗 熨=ㄩㄣˋ（熨斗 ㄩㄣˋ ㄉㄡˇ）
  'md-086', // 露營 露=ㄌㄨˋ（露營 ㄌㄨˋ ㄧㄥˊ）
  'md-088', // 熬夜 熬=ㄠˊ（熬夜 ㄠˊ ㄧㄝˋ）
  'cl-009', // 雨雪霏霏 雨=ㄩˋ（動詞「降下」，詩經）
  'cl-010', // 不亦說乎 說=ㄩㄝˋ（通「悅」，論語）
  'cl-043', // 以彰其咎 咎=ㄐㄧㄡˋ（過失；ㄍㄠ 僅用於咎繇）
  'cl-050', // 陶後鮮有聞 鮮=ㄒㄧㄢˇ（少，愛蓮說）
  'ly-008', // 伽藍寺 伽=ㄑㄧㄝˊ（伽藍 ㄑㄧㄝˊ ㄌㄢˊ）
  'ly-019', // 鹿茸切片 茸=ㄖㄨㄥˊ（鹿茸 ㄌㄨˋ ㄖㄨㄥˊ）
  'ly-046', // 煙味瀰漫 瀰=ㄇㄧˊ（瀰漫 ㄇㄧˊ ㄇㄢˋ）
  // 2026-06-11 簡編本全題覆核：以下正解經簡編本(或傳統正音)確認無誤，
  // 屬簡編本未收冷僻字(修訂本支持)或簡編本明確收錄我方正解，標記避免重複報
  'tk-005', // 一暴十寒 暴=ㄆㄨˋ（簡編本字形作「一曝十寒」，暴/曝同 ㄆㄨˋ 曬義）
  'tk-055', // 標識 識=ㄓˋ（簡編本「識」收 ㄓˋ/ㄕˋ 兩讀，ㄓˋ 為記號義）
  'tk-116', // 果實累累 累=ㄌㄟˊ（簡編本未收，修訂本「纍纍」ㄌㄟˊ）
  'tk-169', // 畏葸不前 葸=ㄒㄧˇ（簡編本未收字，修訂本 ㄒㄧˇ）
  'pp-044', // 便宜 便=ㄆㄧㄢˊ（簡編本收 ㄆㄧㄢˊ/ㄅㄧㄢˋ 兩讀，價低義 ㄆㄧㄢˊ）
  'pp-045', // 水滸傳 傳=ㄓㄨㄢˋ（傳記/書名傳統正音）
  'pp-079', // 仁者樂山 樂=ㄧㄠˋ（喜好義，簡編本「樂」收 ㄌㄜˋ/ㄧㄠˋ/ㄩㄝˋ）
  'pp-099', // 葉公好龍 葉=ㄕㄜˋ（人名傳統正音）
  'rr-021', // 髑髏 髑=ㄉㄨˊ（簡編本未收字，修訂本 ㄉㄨˊ）
  'rr-063', // 暌違 暌=ㄎㄨㄟˊ（簡編本未收字，修訂本 ㄎㄨㄟˊ）
  'rr-067', // 旱魃 魃=ㄅㄚˊ（簡編本未收字，修訂本 ㄅㄚˊ）
  'rr-068', // 山魈 魈=ㄒㄧㄠ（簡編本未收字，修訂本 ㄒㄧㄠ）
  'md-035', // 雞胗 胗=ㄓㄣ（簡編本未收字，通行讀音）
  'md-048', // 哏圖 哏=ㄍㄣˊ（簡編本未收字，通行讀音）
  'md-090', // 大稻埕 埕=ㄔㄥˊ（簡編本未收字，地名通行讀音）
  'cl-018', // 滄浪之水 浪=ㄌㄤˊ（古音破讀，簡編本未收此音）
  'cl-028', // 燕山胡騎 騎=ㄐㄧˋ（騎兵古讀，簡編本未收此音）
  // 2026-06-11 簡編本覆核後「依簡編本修正」的正解。萌典(修訂本)收音與簡編本不同，
  // 會反向報警，但簡編本為審題第一依據，以下以簡編本為準，標記免重複報。
  'tk-002', // 呱呱墜地 呱=ㄍㄨ（簡編本 ID=16641 ㄍㄨ ㄍㄨ ㄓㄨㄟˋ ㄉㄧˋ；修訂本另收 ㄨㄚ 啼哭聲義）
  'tk-007', // 良莠不齊 莠=ㄧㄡˋ（簡編本 ㄧㄡˋ；修訂本 ㄧㄡˇ）
  'tk-026', // 模樣 模=ㄇㄛˊ（簡編本「模」一律 ㄇㄛˊ；修訂本另收 ㄇㄨˊ）
  'tk-066', // 蛻變 蛻=ㄊㄨㄟˋ（簡編本 ㄊㄨㄟˋ；修訂本另收 ㄕㄨㄟˋ）
  'tk-127', // 邋遢 邋=ㄌㄚ（簡編本一聲 ㄌㄚ；修訂本 ㄌㄚˊ）
  'tk-133', // 字帖 帖=ㄊㄧㄝˇ（簡編本 ㄊㄧㄝˇ；修訂本另收 ㄊㄧㄝˋ）
  'id-027', // 熙來攘往 攘=ㄖㄤˊ（簡編本 ㄖㄤˊ；修訂本 ㄖㄤˇ）
  'id-062', // 桀驁不馴 驁=ㄠˊ（簡編本 ㄠˊ；修訂本 ㄠˋ）
  'cl-006', // 死生契闊 契=ㄑㄧˋ（簡編本 ㄑㄧˋ，未收修訂本古音 ㄑㄧㄝˋ）
  'ly-010', // 楔形文字 楔=ㄒㄧㄝ（簡編本一聲 ㄒㄧㄝ；修訂本 ㄒㄧㄝˋ）
  'ly-014', // 蘭亭臨帖 帖=ㄊㄧㄝˇ（簡編本 ㄊㄧㄝˇ；修訂本另收 ㄊㄧㄝˋ）
  'rr-011', // 步履蹣跚 蹣=ㄇㄢˊ（簡編本 ㄇㄢˊ；修訂本 ㄆㄢˊ）
  // 2026-06-12 新增題覆核：多音/簡編本未收字，修訂本第一正音誤報。
  'cl-062', // 怫然作色 怫=ㄈㄨˊ（簡編本未收字；採教學常讀音 ㄈㄨˊ，修訂本「怫然」另歸 ㄈㄟˋ）
  'cl-074', // 嬛嬛一裊楚宮腰 嬛=ㄒㄩㄢ（修訂本「便嬛：輕飄美麗」正讀 ㄒㄩㄢ；第一正音 ㄏㄨㄢˊ 為「嫏嬛」義，非此詞）
  // 2026-06-13 注音王正名 + pickchar 擴題後 audit 誤報覆核：
  'cl-079', // 學而不思則罔 罔=ㄨㄤˇ（論語課本標準音；整句非詞條，單字 fallback 誤報「辭典查無」）
  // 2026-06-13 新一輪審題覆核：審題員標 wrong_answer，回簡編本確認後修正/維持：
  'cl-114', // 唧唧復唧唧 唧=ㄐㄧˊ（簡編本只收 ㄐㄧˊ 二聲，原題誤標 ㄐㄧ 一聲已修；修訂本把 ㄐㄧ 當第一正音屬退階來源，依簡編本）
  // 2026-06-14 常見誤讀音表（圖片 490/491）匯入：題目 text 為「語境句」非辭典詞條，
  // 簡編本層查無整句 → 退 moedict 粗篩誤報。核心詞已逐一回簡編本離線資料覆核確認：
  'tk-195', // 菜脯蛋 脯=ㄈㄨˇ（菜脯為台語借音詞，簡編本未收「菜脯」詞條；果脯義 ㄈㄨˇ，胸脯才 ㄆㄨˊ）
  'tk-216', // 毫無瓜葛 葛=ㄍㄜˊ（簡編本「瓜葛」ㄍㄨㄚ ㄍㄜˊ；ㄍㄜˇ 限姓氏與諸葛）
  'tk-217', // 偶然邂逅 逅=ㄏㄡˋ（簡編本「邂逅」ㄒㄧㄝˋ ㄏㄡˋ）
  'tk-239', // 衣服褪色 褪=ㄊㄨㄣˋ（簡編本「褪色」ㄊㄨㄣˋ ㄙㄜˋ）
  'tk-242', // 全民連署 署=ㄕㄨˋ（簡編本「連署」ㄌㄧㄢˊ ㄕㄨˋ；moedict 把布署義 ㄕㄨˇ 當第一正音屬退階）
  'tk-254'  // 湮滅證據 湮=ㄧㄣ（簡編本「湮滅」ㄧㄣ ㄇㄧㄝˋ；moedict 把 ㄧㄢ 當第一正音屬退階）
]);

const problems = [];
const unverified = [];

for (const q of BANK) {
  const text = q.text;
  const target = q.target;
  const ans = norm(q.zhuyin);

  // === 簡編本權威覆核（第一依據）===
  // 簡編本收此詞 → 抽目標字音節，對得上即 pass；對不上即高信度錯誤（權威打臉，不必再退 moedict）。
  // 多音字詞（同詞多注音）只要任一讀音的目標字音節對得上即 pass。
  const concisedReadings = lookupConcised(text);
  if (concisedReadings && concisedReadings.length) {
    let okByConcised = false;
    const seen = [];
    for (const zhuyinStr of concisedReadings) {
      const syl = concisedSyllable(zhuyinStr, text, target);
      if (syl == null) continue;
      seen.push(syl);
      if (syl === ans) { okByConcised = true; break; }
    }
    if (okByConcised) continue; // 簡編本權威確認正確
    if (seen.length) {
      // 簡編本明確收錄、音節抽得出來，但都不等於答案 → 高信度錯誤
      problems.push({
        id: q.id, text, target, ans,
        kind: '簡編本音節不符(權威)',
        dict: `簡編本=${seen.join(' / ')}`
      });
      continue;
    }
    // 音節抽不出來（詞長與注音音節數不一致，如含輕聲變體）→ 落到 moedict 流程粗篩
  }

  // 先嘗試整個詞條
  const compound = await moedict(text);
  await sleep(120);

  let resolved = false;

  if (compound && compound.heteronyms?.length) {
    // 取第一個讀音的 bopomofo，依字序對齊目標字音節
    const chars = [...text];
    const idx = chars.indexOf(target);
    for (const h of compound.heteronyms) {
      const syllables = (h.bopomofo || '').split(/\s+/);
      if (syllables.length === chars.length && idx >= 0) {
        const expect = norm(syllables[idx]);
        if (expect === ans) { resolved = true; break; }
      }
    }
    if (!resolved) {
      // 詞條存在但音節對不上。萌典=修訂本，與簡編本收音不同時會誤報；
      // 已用簡編本人工覆核(VERIFIED_OK)的依簡編本為準，跳過。
      if (VERIFIED_OK.has(q.id)) continue;
      // 收集所有可能音節組
      const opts = compound.heteronyms
        .map((h) => h.bopomofo)
        .filter(Boolean);
      problems.push({ id: q.id, text, target, ans, kind: '詞條音節不符', dict: opts.join(' / ') });
      continue;
    }
  }

  if (resolved) continue;

  // 退而查單字
  const single = await moedict(target);
  await sleep(120);

  if (!single || !single.heteronyms?.length) {
    unverified.push({ id: q.id, text, target, ans, why: compound ? '詞條無對應音節且單字查無' : '辭典查無' });
    continue;
  }

  const readings = single.heteronyms.map((h) => norm(h.bopomofo));
  const primary = readings[0];

  if (!readings.includes(ans)) {
    problems.push({ id: q.id, text, target, ans, kind: '答案不在讀音清單', dict: readings.join(' / ') });
    continue;
  }

  // 答案在清單內，但檢查是否有錯項其實才是第一條正音
  const wrongIsPrimary = q.distractors.map(norm).find((d) => d === primary && ans !== primary);
  // 答案是否被標為「又音/語音」
  const ansHet = single.heteronyms.find((h) => norm(h.bopomofo) === ans);
  const ansDef = (ansHet?.definitions?.[0]?.def || '');
  const isAlt = /又音|語音|讀音/.test(ansDef);
  if ((wrongIsPrimary || (isAlt && ans !== primary)) && !VERIFIED_OK.has(q.id)) {
    problems.push({
      id: q.id, text, target, ans,
      kind: '答案非第一正音(錯項才是正音?)',
      dict: `正音=${primary}；答案註=${ansDef.slice(0, 20) || '—'}`
    });
  }
}

console.log(`\n稽核完成：${BANK.length} 題`);
console.log(`\n🔴 疑似錯誤 (${problems.length})`);
for (const p of problems) {
  console.log(`  [${p.id}] ${p.text}（${p.target}）答案=${p.ans}｜${p.kind}｜辭典: ${p.dict}`);
}
console.log(`\n⚪ 無法自動查證 (${unverified.length})（多為梗詞/罕用/口語，需人工）`);
for (const u of unverified) {
  console.log(`  [${u.id}] ${u.text}（${u.target}）答案=${u.ans}｜${u.why}`);
}
