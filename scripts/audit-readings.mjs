/**
 * 對照教育部《重編國語辭典修訂本》(萌典 API) 稽核題庫注音。
 * 規則：
 *  1. 若該詞為辭典收錄詞條 → 取目標字在詞中對應音節，須等於題目答案。
 *  2. 否則查單字 → 答案須出現在該字讀音清單；若答案僅為「又音/語音/讀音」而某個錯項才是「正音(第一條)」→ 標為可疑。
 * 純唯讀稽核，不改檔。
 */
import { BANK } from '../src/data/bank/index.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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

// 萌典聲調記號 → 我們題庫用的格式（輕聲˙、二聲ˊ、三聲ˇ、四聲ˋ；一聲無符號）已一致
// 正規化：去空白 + 統一輕聲位置（題庫寫後置 ㄉㄨㄣ˙、萌典寫前置 ˙ㄉㄨㄣ，內容等價）
const norm = (s) => {
  let t = (s || '').replace(/\s+/g, '').trim();
  if (t.startsWith('˙')) t = t.slice(1) + '˙';
  return t;
};

// 已人工對照教育部辭典確認無誤的破音字（答案為該義項正確讀音，僅非辭典第一條）
const VERIFIED_OK = new Set([
  'id-012', // 一葉扁舟 扁=ㄆㄧㄢ（小舟）
  'md-003', // 囤貨 囤=ㄊㄨㄣˊ（積聚）
  'md-011', // 發票載具 載=ㄗㄞˋ（乘載）
  'md-023', // 吐司夾蛋 夾=ㄐㄧㄚˊ（ㄐㄧㄚ為又音）
  'md-026', // 帥到分泌 泌=ㄇㄧˋ（分泌）
  'md-027', // 大撒幣 撒=ㄙㄚˇ（散布）
  'md-028', // 扛米 扛=ㄎㄤˊ（以肩荷物）
  // 2026-06-11 整句非詞條導致單字 fallback 誤報，已以子詞對萌典覆核
  'tk-116', // 果實累累 累=ㄌㄟˊ（連接成串；簡編本例句）
  'tk-172', // 便給 給=ㄐㄧˇ（口才敏捷，重編本詞條）
  'md-032', // 肉燥飯 燥=ㄙㄠˋ（肉燥 ㄖㄡˋ ㄙㄠˋ）
  'md-034', // 餛飩麵 飩=輕聲（題庫聲調後置寫法 vs 萌典前置，內容相同）
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
  'ly-014', // 蘭亭臨帖 帖=ㄊㄧㄝˋ（碑帖範本義）
  'ly-019', // 鹿茸切片 茸=ㄖㄨㄥˊ（鹿茸 ㄌㄨˋ ㄖㄨㄥˊ）
  'ly-046'  // 煙味瀰漫 瀰=ㄇㄧˊ（瀰漫 ㄇㄧˊ ㄇㄢˋ）
]);

const problems = [];
const unverified = [];

for (const q of BANK) {
  const text = q.text;
  const target = q.target;
  const ans = norm(q.zhuyin);

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
      // 詞條存在但音節對不上 → 收集所有可能音節組
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
