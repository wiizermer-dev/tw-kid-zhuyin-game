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
 * @param {Object} d - { title, emoji, quip, score, correct, total, combo, modeName, name, hardest }
 *   hardest: 可選 { text, zhuyin } 「這題你會唸嗎」鉤子
 */
export async function renderShareCard(d) {
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const kai = `'TW-Kai', 'BiauKai', 'Kaiti TC', serif`;
  const round = `'Nunito', 'Helvetica Rounded', system-ui, sans-serif`;

  // 背景漸層
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, PALETTE.bg1);
  grad.addColorStop(1, PALETTE.bg2);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // 漂浮注音符號（淡色裝飾）
  ctx.save();
  for (let i = 0; i < 26; i++) {
    const x = (i * 263) % W;
    const y = (i * 419 + 130) % H;
    const size = 60 + (i * 37) % 90;
    ctx.font = `${size}px ${kai}`;
    ctx.fillStyle = i % 2 ? 'rgba(255,107,107,0.08)' : 'rgba(78,205,196,0.10)';
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(((i * 53) % 60 - 30) * Math.PI / 180);
    ctx.fillText(FLOATING[i % FLOATING.length], 0, 0);
    ctx.restore();
  }
  ctx.restore();

  ctx.textAlign = 'center';

  // 頂部品牌
  ctx.font = `bold 64px ${kai}`;
  ctx.fillStyle = PALETTE.ink;
  ctx.fillText('ㄅㄆㄇ你會唸嗎？', W / 2, 180);
  ctx.font = `34px ${round}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText(`—— ${d.modeName} ——`, W / 2, 248);

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
  ctx.fillText(statsLine, W / 2, cardY + 910);

  // 玩家名
  if (d.name) {
    ctx.font = `36px ${round}`;
    ctx.fillStyle = '#b0a49e';
    ctx.fillText(`by ${d.name}`, W / 2, cardY + 60);
  }

  // 底部鉤子：這題你會唸嗎
  if (d.hardest) {
    ctx.font = `bold 52px ${kai}`;
    ctx.fillStyle = PALETTE.ink;
    ctx.fillText('這題你會唸嗎？', W / 2, 1480);
    ctx.font = `bold 110px ${kai}`;
    ctx.fillStyle = PALETTE.accent2;
    ctx.fillText(d.hardest.text, W / 2, 1620);
  }

  ctx.font = `36px ${round}`;
  ctx.fillStyle = '#8a7a72';
  ctx.fillText(`來 ${location.host} 跟我對戰`, W / 2, 1790);

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
