/** 分享 — Canvas 限動成績卡 + Web Share / 剪貼簿 fallback */

const W = 1080, H = 1920; // IG 限動 9:16

const PALETTE = {
  bg1: '#FFF7E8', bg2: '#FFE3EC',
  ink: '#3D2C29', accent: '#FF6B6B', accent2: '#4ECDC4',
  gold: '#FFB347', card: '#FFFFFF'
};

const FLOATING = ['ㄅ', 'ㄆ', 'ㄇ', 'ㄈ', 'ㄉ', 'ㄊ', 'ㄋ', 'ㄌ', 'ㄍ', 'ㄎ', 'ㄏ', 'ㄓ', 'ㄔ', 'ㄕ', 'ㄖ', 'ㄗ', 'ㄘ', 'ㄙ', 'ㄞ', 'ㄠ', 'ㄡ', 'ㄢ', 'ㄤ', 'ㄥ'];

/**
 * 產生成績卡 PNG blob。
 * @param {Object} d - { title, emoji, quip, score, correct, total, combo, modeName, name, hardest, percentile, taunt, roomCode }
 *   hardest: 可選 { text, zhuyin } 「這題你會唸嗎」鉤子
 *   percentile: 可選 { beatPct, rank, sample }；樣本 < 30 顯示名次，否則顯示打敗百分比
 *   taunt: 可選挑釁文案（卡片底部）
 *   roomCode: 可選對戰房號，印成行動口令
 */
const KAI = `'TW-Kai', 'BiauKai', 'Kaiti TC', serif`;
const ROUND = `'Nunito', 'Helvetica Rounded', system-ui, sans-serif`;

/** 共用底圖：漸層背景 + 漂浮注音 + 頂部品牌。回傳 ctx 已置中對齊 */
function drawBase(canvas, subtitle) {
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, PALETTE.bg1);
  grad.addColorStop(1, PALETTE.bg2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.save();
  for (let i = 0; i < 26; i++) {
    const x = (i * 263) % W;
    const y = (i * 419 + 130) % H;
    const size = 60 + (i * 37) % 90;
    ctx.font = `${size}px ${KAI}`;
    ctx.fillStyle = i % 2 ? 'rgba(255,107,107,0.08)' : 'rgba(78,205,196,0.10)';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(((i * 53) % 60 - 30) * Math.PI / 180);
    ctx.fillText(FLOATING[i % FLOATING.length], 0, 0);
    ctx.restore();
  }
  ctx.restore();

  ctx.textAlign = 'center';

  ctx.font = `bold 64px ${KAI}`;
  ctx.fillStyle = PALETTE.ink;
  ctx.fillText('你ㄅㄆㄇ有ㄅ級分ㄇ', W / 2, 180);
  ctx.font = `34px ${ROUND}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText(subtitle, W / 2, 248);
  return ctx;
}

export async function renderShareCard(d) {
  const canvas = document.createElement('canvas');
  const ctx = drawBase(canvas, d.modeName);
  const kai = KAI;
  const round = ROUND;

  // 中央卡片
  const cardX = 90, cardY = 330, cardW = W - 180, cardH = 980, r = 48;
  ctx.save();
  ctx.shadowColor = 'rgba(61,44,41,0.18)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 16;
  roundRect(ctx, cardX, cardY, cardW, cardH, r);
  ctx.fillStyle = PALETTE.card;
  ctx.fill();
  ctx.restore();

  // 稱號
  ctx.font = `200px ${round}`;
  ctx.fillText(d.emoji, W / 2, cardY + 300);
  ctx.font = `bold 96px ${kai}`;
  ctx.fillStyle = PALETTE.accent;
  ctx.fillText(d.title, W / 2, cardY + 470);
  ctx.font = `40px ${kai}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText(d.quip, W / 2, cardY + 545);

  // 分數
  ctx.font = `bold 170px ${round}`;
  ctx.fillStyle = PALETTE.ink;
  ctx.fillText(String(d.score), W / 2, cardY + 760);
  ctx.font = `38px ${round}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText('SCORE', W / 2, cardY + 820);

  // 統計列
  ctx.font = `44px ${kai}`;
  ctx.fillStyle = PALETTE.ink;
  const statsLine = `答對 ${d.correct}/${d.total} ・ 最高連擊 ${d.combo}`;
  ctx.fillText(statsLine, W / 2, cardY + 880);

  // 打敗百分比 / 名次（小樣本百分比失真，改顯示名次）
  if (d.percentile) {
    const p = d.percentile;
    ctx.font = `bold 46px ${kai}`;
    ctx.fillStyle = PALETTE.gold;
    const line = p.sample >= 30 ? `打敗了 ${p.beatPct}% 的玩家` : `目前全站第 ${p.rank} 名`;
    ctx.fillText(line, W / 2, cardY + 950);
  }

  // 玩家名
  if (d.name) {
    ctx.font = `36px ${round}`;
    ctx.fillStyle = '#b0a49e';
    ctx.fillText(`by ${d.name}`, W / 2, cardY + 60, cardW - 120);
  }

  // 底部鉤子：這題你會唸嗎
  if (d.hardest) {
    ctx.font = `bold 52px ${kai}`;
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText('這題你會唸嗎？', W / 2, 1480);
    ctx.font = `bold 110px ${kai}`;
    ctx.fillStyle = PALETTE.accent2;
    ctx.fillText(d.hardest.text, W / 2, 1620, W - 160);
  }

  // 挑釁文案
  if (d.taunt) {
    ctx.font = `bold 46px ${kai}`;
    ctx.fillStyle = PALETTE.accent;
    ctx.fillText(d.taunt, W / 2, 1720, W - 140);
  }

  // 行動指令：IG 圖不可點，印人讀得懂的口令
  ctx.font = `36px ${round}`;
  ctx.fillStyle = '#8a7a72';
  const cta = d.roomCode
    ? `去 ${location.host} 輸入房號 ${d.roomCode} 對戰`
    : `來 ${location.host} 跟我對戰`;
  ctx.fillText(cta, W / 2, 1810, W - 140);

  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

/**
 * 對戰勝負卡（spec 取自 designs/ig-story-duel-update.html 的 VS 面板語言）。
 * @param {Object} d - { outcome: 'win'|'lose'|'tie', me: {name, score}, opp: {name, score}, roomCode, hardest }
 */
export async function renderDuelCard(d) {
  const canvas = document.createElement('canvas');
  const ctx = drawBase(canvas, '好友對戰');

  // 勝負稱號
  const head = d.outcome === 'win'
    ? { emoji: '🏆', title: '獲勝', quip: `${d.opp.name || '對手'} 被屌打` }
    : d.outcome === 'lose'
      ? { emoji: '🫠', title: '敗北', quip: '求 rematch，這把不算' }
      : { emoji: '🤝', title: '平手', quip: '勢均力敵，再來一場分高下' };
  ctx.font = `180px ${ROUND}`;
  ctx.fillText(head.emoji, W / 2, 470);
  ctx.font = `bold 110px ${KAI}`;
  ctx.fillStyle = d.outcome === 'win' ? PALETTE.accent : PALETTE.ink;
  ctx.fillText(head.title, W / 2, 640);
  ctx.font = `42px ${KAI}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText(head.quip, W / 2, 715, W - 160);

  // VS 面板
  const px = 90, py = 800, pw = W - 180, ph = 460;
  ctx.save();
  ctx.shadowColor = 'rgba(61,44,41,0.18)';
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 16;
  roundRect(ctx, px, py, pw, ph, 48);
  ctx.fillStyle = PALETTE.card;
  ctx.fill();
  ctx.restore();

  const colMe = px + pw * 0.27, colOpp = px + pw * 0.73;
  ctx.font = `bold 52px ${KAI}`;
  ctx.fillStyle = PALETTE.ink;
  ctx.fillText(d.me.name || '你', colMe, py + 130, pw * 0.38);
  ctx.fillText(d.opp.name || '對手', colOpp, py + 130, pw * 0.38);
  ctx.font = `bold 72px ${ROUND}`;
  ctx.fillStyle = PALETTE.accent2;
  ctx.fillText('VS', W / 2, py + 230);
  ctx.font = `bold 130px ${ROUND}`;
  ctx.fillStyle = d.outcome === 'lose' ? '#b0a49e' : PALETTE.accent;
  ctx.fillText(String(d.me.score), colMe, py + 320);
  ctx.fillStyle = d.outcome === 'win' ? '#b0a49e' : PALETTE.accent;
  ctx.fillText(String(d.opp.score), colOpp, py + 320);
  ctx.font = `34px ${ROUND}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText('SCORE', colMe, py + 380);
  ctx.fillText('SCORE', colOpp, py + 380);

  // 比分條：雙方分數佔比
  const total = Math.max(1, d.me.score + d.opp.score);
  const barX = px + 60, barW = pw - 120, barY = py + ph + 80, barH = 36;
  const meW = Math.round(barW * (d.me.score / total));
  roundRect(ctx, barX, barY, barW, barH, 18);
  ctx.fillStyle = '#eadfd6';
  ctx.fill();
  if (meW > 0) {
    roundRect(ctx, barX, barY, Math.max(meW, 36), barH, 18);
    ctx.fillStyle = PALETTE.accent;
    ctx.fill();
  }

  // 最難題鉤子
  if (d.hardest) {
    ctx.font = `bold 50px ${KAI}`;
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText('這題你會唸嗎？', W / 2, 1500);
    ctx.font = `bold 100px ${KAI}`;
    ctx.fillStyle = PALETTE.accent2;
    ctx.fillText(d.hardest.text, W / 2, 1630, W - 160);
  }

  // 行動口令
  ctx.font = `bold 44px ${KAI}`;
  ctx.fillStyle = PALETTE.accent;
  ctx.fillText(d.outcome === 'lose' ? '我要報仇，進來陪打' : '不服？進房來戰', W / 2, 1740);
  ctx.font = `36px ${ROUND}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText(d.roomCode ? `去 ${location.host} 輸入房號 ${d.roomCode}` : `來 ${location.host}`, W / 2, 1810, W - 140);

  return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** share sheet 偶爾 pending 不回，用 timeout 保護避免按鈕永久卡死 */
function withTimeout(promise, ms = 12000) {
  return Promise.race([
    promise,
    new Promise((resolve) => setTimeout(() => resolve('timeout'), ms))
  ]);
}

/** 分享圖片：行動裝置走 Web Share（可直接傳 IG/LINE），失敗則下載 */
export async function shareCard(blob, text, url) {
  const file = new File([blob], 'bpmf-score.png', { type: 'image/png' });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      const r = await withTimeout(navigator.share({ files: [file], text, url }));
      return r === 'timeout' ? 'timeout' : 'shared';
    } catch (e) {
      if (e.name === 'AbortError') return 'cancelled';
    }
  }
  // 桌機 fallback：下載圖片
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'bpmf-score.png';
  a.click();
  URL.revokeObjectURL(a.href);
  return 'downloaded';
}

/** 純文字分享（挑戰連結、每日方格） */
export async function shareText(text) {
  if (navigator.share) {
    try {
      const r = await withTimeout(navigator.share({ text }));
      if (r !== 'timeout') return 'shared';
    } catch (e) {
      if (e.name === 'AbortError') return 'cancelled';
    }
  }
  await navigator.clipboard.writeText(text);
  return 'copied';
}
