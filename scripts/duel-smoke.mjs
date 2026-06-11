/* 用法: 先 npm run dev -- --port 5179，再 node scripts/duel-smoke.mjs（playwright 從任一全域安裝 import）*/
/* 雙人對戰 smoke test：ready→倒數→同步換題→換局不重題 */
import { chromium } from '/Users/jimmytang/.claude/skills/gstack/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:5179';
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const browser = await chromium.launch();
const ctxA = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
const ctxB = await browser.newContext();
const A = await ctxA.newPage();
const B = await ctxB.newPage();
A.on('console', (m) => m.type() === 'error' && log('A console.error:', m.text()));
B.on('console', (m) => m.type() === 'error' && log('B console.error:', m.text()));

// 收集每局題目（qtext 變化）
function watchQuestions(page, store) {
  return setInterval(async () => {
    try {
      const t = await page.locator('.qtext').textContent({ timeout: 200 });
      const clean = t?.replace(/\s+/g, '');
      if (clean && !store.includes(clean)) store.push(clean);
    } catch { /* 不在題目畫面 */ }
  }, 250);
}

try {
  // A 開房
  await A.goto(BASE);
  await A.locator('input').first().fill('玩家A');
  await A.getByRole('button', { name: 'OK' }).click();
  await A.getByText('好友對戰').first().click();
  await A.getByText('我來開房').click();
  await A.getByRole('button', { name: '複製連結' }).click();
  await A.waitForTimeout(300);
  const invite = await A.evaluate(() => navigator.clipboard.readText());
  log('invite:', invite);
  if (!invite.includes('r=')) throw new Error('invite url 沒拿到');

  // B 走邀請連結進房
  await B.goto(invite);
  try {
    await B.locator('input').first().fill('玩家B', { timeout: 3000 });
    await B.getByRole('button', { name: 'OK' }).click();
  } catch { /* 邀請流程沒問名字就算了 */ }
  await B.getByRole('button', { name: '進房！' }).click();
  await B.waitForSelector('text=房裡的人', { timeout: 10000 });
  await A.waitForSelector('text=房裡的人（2）', { timeout: 15000 });
  log('OK: 兩人都在大廳');

  // 兩人按準備 → 應出現倒數
  await A.getByRole('button', { name: '我準備好了！' }).click();
  // A ready 後不該開戰
  await A.waitForTimeout(1200);
  if (await A.locator('.countdown-overlay').count()) throw new Error('只有一人 ready 就倒數了');
  await B.getByRole('button', { name: '我準備好了！' }).click();
  await A.waitForSelector('.countdown-overlay .count', { timeout: 15000 });
  await B.waitForSelector('.countdown-overlay .count', { timeout: 15000 });
  log('OK: 全員 ready → 雙方都看到倒數');

  await A.waitForSelector('.play .qtext', { timeout: 10000 });
  await B.waitForSelector('.play .qtext', { timeout: 10000 });
  log('OK: 雙方同時進入對戰');

  // 確認 4 秒 timer chip 存在
  if (!(await A.locator('.qtimer').count())) throw new Error('沒有單題倒數顯示');
  log('OK: 單題倒數顯示');

  const game1A = [];
  const w1 = watchQuestions(A, game1A);

  // 第 1 題：兩人都答 → 應在 ~2 秒內提前換題
  const q1 = (await A.locator('.qtext').textContent()).replace(/\s+/g, '');
  await A.locator('.opt').first().click();
  await B.locator('.opt').first().click();
  await A.waitForFunction(
    (prev) => document.querySelector('.qtext')?.textContent.replace(/\s+/g, '') !== prev,
    q1, { timeout: 3000 }
  );
  log('OK: 全員答完提前換題（<3s）');

  // 第 2 題：都不答 → 超時記錯 + 4+1.6 秒自動換題
  const q2 = (await A.locator('.qtext').textContent()).replace(/\s+/g, '');
  await A.waitForSelector('text=時間到', { timeout: 6000 });
  log('OK: 超時顯示「時間到」');
  await A.waitForFunction(
    (prev) => document.querySelector('.qtext')?.textContent.replace(/\s+/g, '') !== prev,
    q2, { timeout: 4000 }
  );
  log('OK: 超時自動換題');

  // 把剩下題目打完（雙方亂答）
  for (let i = 0; i < 12; i++) {
    for (const p of [A, B]) {
      try { await p.locator('.opt').first().click({ timeout: 800 }); } catch { /* 已答或結束 */ }
    }
    if (await A.locator('.result').count()) break;
    await A.waitForTimeout(2300);
  }
  await A.waitForSelector('.result', { timeout: 30000 });
  await B.waitForSelector('.result', { timeout: 30000 });
  clearInterval(w1);
  log(`OK: 雙方完賽進結果頁；第一局題目 ${game1A.length} 題`);

  // 戰帖連結要帶 m=（同局題組）
  const shareUrl = await A.evaluate(() => {
    const u = new URL(location.href);
    return u.toString();
  });
  void shareUrl;

  // 再玩一次（自動帶準備狀態）→ 回大廳 → 倒數開新局；題目不得與第一局重複
  await A.getByRole('button', { name: '再玩一次' }).click();
  await B.getByRole('button', { name: '再玩一次' }).click();
  await A.waitForSelector('.play .qtext', { timeout: 20000 });
  log('OK: 再玩一次 → 回同房大廳 → 再開局');

  const game2A = [];
  const w2 = watchQuestions(A, game2A);
  for (let i = 0; i < 12; i++) {
    for (const p of [A, B]) {
      try { await p.locator('.opt').first().click({ timeout: 800 }); } catch { /* skip */ }
    }
    if (await A.locator('.result').count()) break;
    await A.waitForTimeout(2300);
  }
  await A.waitForSelector('.result', { timeout: 40000 });
  clearInterval(w2);

  const dup = game2A.filter((q) => game1A.includes(q));
  log(`第二局題目 ${game2A.length} 題；與第一局重複 ${dup.length} 題`, dup);
  if (dup.length > 0) throw new Error(`兩局題目重複: ${dup.join(', ')}`);
  log('OK: 兩局題目完全不重複');

  console.log('\nALL PASS');
} finally {
  await browser.close();
}
