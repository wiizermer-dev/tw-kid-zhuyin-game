/* 重現腳本：開房者強制為 leader（id 最小）+ 房主先選難度晚進房者要看得到
 * 用法：npm run dev -- --port 5179 後 node scripts/duel-repro.mjs */
import { chromium } from '/Users/jimmytang/.claude/skills/gstack/node_modules/playwright/index.mjs';

const BASE = 'http://localhost:5179';
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);

const browser = await chromium.launch();

async function makePlayer(id, name, perms = []) {
  const ctx = await browser.newContext({ permissions: perms });
  await ctx.addInitScript(([pid, pname]) => {
    localStorage.setItem('bpmf_browser_id', pid);
    localStorage.setItem('bpmf_player_name', JSON.stringify(pname));
  }, [id, name]);
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && log(`${name} console.error:`, m.text()));
  return page;
}

const fails = [];
try {
  // A = 開房者，id 最小 → 必為 leader
  const A = await makePlayer('0000-host', '玩家A', ['clipboard-read', 'clipboard-write']);
  await A.goto(BASE);
  await A.getByText('好友對戰').first().click();
  await A.getByText('我來開房').click();

  // 房主先選難度（在別人進房前）
  await A.getByText('超難', { exact: false }).first().click();
  await A.waitForTimeout(500);
  await A.getByRole('button', { name: '複製連結' }).click();
  await A.waitForTimeout(300);
  const invite = await A.evaluate(() => navigator.clipboard.readText());
  log('invite:', invite);

  // B、C 晚進房（id 比 A 大）
  const B = await makePlayer('zzz1-late', '玩家B');
  const C = await makePlayer('zzz2-late', '玩家C');
  for (const [p, n] of [[B, '玩家B'], [C, '玩家C']]) {
    await p.goto(invite);
    await p.getByRole('button', { name: '進房！' }).click();
    await p.waitForSelector('text=房裡的人', { timeout: 10000 });
    log(`${n} 進房`);
  }
  await A.waitForSelector('text=房裡的人（3）', { timeout: 15000 });
  log('OK: 三人都在大廳');

  // 檢查 1：晚進房者看到的難度應為「大師」不是「隨機」
  for (const [p, n] of [[B, '玩家B'], [C, '玩家C']]) {
    const active = await p.locator('.diff-opt.active .diff-label').textContent({ timeout: 3000 }).catch(() => null);
    log(`${n} 看到難度: ${active}`);
    if (!active || !active.includes('超難')) fails.push(`難度不同步: ${n} 看到 ${active}，應為 超難`);
  }

  // 檢查 2：全員 ready → 開房者（leader）應觸發倒數
  for (const p of [A, B, C]) await p.getByRole('button', { name: '我準備好了！' }).click();
  log('三人都按了準備');
  const sawCountdown = await Promise.all([A, B, C].map((p) =>
    p.waitForSelector('.countdown-overlay .count', { timeout: 8000 }).then(() => true).catch(() => false)
  ));
  log('倒數出現狀況 A/B/C:', sawCountdown);
  if (sawCountdown.some((s) => !s)) fails.push(`倒數沒觸發: A=${sawCountdown[0]} B=${sawCountdown[1]} C=${sawCountdown[2]}`);

  if (fails.length) {
    console.log('\nREPRO CONFIRMED:');
    fails.forEach((f) => console.log(' -', f));
    process.exitCode = 1;
  } else {
    console.log('\nALL PASS（沒重現）');
  }
} finally {
  await browser.close();
}
