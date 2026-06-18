<script>
  /** L5 食人魚救屈原 —— 屈原中心被圍攻，操龍舟粽子炮船走位、自動發射粽子炮擊退食人魚。
      Canvas 2D + rAF。虛擬搖桿（按住拖動）/ WASD / 方向鍵控船。撐到擊退目標數 = 救起。
      對外契約：擊退足夠魚 → onComplete(10)；屈原體力歸零 → 再救一次 overlay（不回呼）。 */
  import { onMount, onDestroy } from 'svelte';
  import { PIRANHA_SVG, QUYUAN_STRUGGLE_SVG, CANNON_BOAT_SVG } from './piranhaSprites.js';
  import { ZONGZI_SVG } from './dragonBoatSprites.js';

  let { onComplete = () => {} } = $props();

  const GOAL_REPEL = 35;     // 擊退這麼多魚 = 救起
  const HP_MAX = 100;
  const FISH_BITE = 12;      // 魚咬到扣血
  const DT_CAP = 0.05;
  const FIRE_GAP = 0.5;      // 自動發炮間隔（秒）
  const SHOT_SPEED = 0.7;    // 炮速（相對/秒）
  const BLAST_R = 0.1;       // 炮炸開半徑（相對）
  const FIRE_RANGE = 0.4;    // 炮船有效射程（相對）—— 射程外的魚打不到，逼玩家開過去守

  let phase = $state('play');
  let ctxReady = $state(true);
  let hp = $state(HP_MAX);
  let repelled = $state(0);
  let wave = $state(1);

  let canvasEl, wrapEl, ctx = null, raf = 0, ro = null;
  let W = 0, H = 0, dpr = 1, R = 0;       // R = min(W,H) 當相對基準

  // 實體（相對座標，中心 0.5,0.5）
  let boat = { x: 0.5, y: 0.78, ang: 0 };
  let fish = [];        // { x, y, vx, vy, dead }
  let shots = [];       // { x, y, vx, vy }
  let blasts = [];      // { x, y, r, life }
  let bubbles = [];     // 屈原求救泡泡
  let spawnTimer = 0, fireTimer = 0, t = 0, lastT = 0, hurtFlash = 0;

  // 虛擬搖桿
  let stick = { active: false, baseX: 0, baseY: 0, dx: 0, dy: 0 };
  const keys = { up: false, down: false, left: false, right: false };

  const QY = { x: 0.5, y: 0.5 };   // 屈原位置（中心）

  function reset() {
    hp = HP_MAX; repelled = 0; wave = 1; phase = 'play';
    boat = { x: 0.5, y: 0.78, ang: 0 };
    fish = []; shots = []; blasts = []; bubbles = [];
    spawnTimer = 0.5; fireTimer = 0; t = 0; hurtFlash = 0;
    for (let i = 0; i < 4; i++) spawnFish();   // 四面圍攻起手
    lastT = performance.now();
  }

  function resize() {
    if (!wrapEl || !canvasEl) return;
    const r = wrapEl.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    W = r.width; H = r.height; R = Math.min(W, H);
    canvasEl.width = Math.round(W * dpr); canvasEl.height = Math.round(H * dpr);
    canvasEl.style.width = W + 'px'; canvasEl.style.height = H + 'px';
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // rel→px
  const px = (rx) => rx * W, py = (ry) => ry * H;

  // 魚從畫面邊緣外隨機生成，游向屈原
  function spawnFish() {
    const edge = Math.floor(Math.random() * 4);
    let x, y;
    if (edge === 0) { x = Math.random(); y = -0.05; }
    else if (edge === 1) { x = 1.05; y = Math.random(); }
    else if (edge === 2) { x = Math.random(); y = 1.05; }
    else { x = -0.05; y = Math.random(); }
    const speed = 0.06 + wave * 0.012 + Math.random() * 0.02;   // wave 升溫
    const a = Math.atan2(QY.y - y, QY.x - x);
    fish.push({ x, y, vx: Math.cos(a) * speed, vy: Math.sin(a) * speed, dead: false });
  }

  function spawnGap() { return Math.max(0.34, 0.85 - wave * 0.08); }   // 魚密但後段不至於淹沒

  // 控制輸入
  function onKey(e, down) {
    const k = e.key;
    if (k === 'ArrowUp' || k === 'w') { keys.up = down; e.preventDefault(); }
    else if (k === 'ArrowDown' || k === 's') { keys.down = down; e.preventDefault(); }
    else if (k === 'ArrowLeft' || k === 'a') { keys.left = down; e.preventDefault(); }
    else if (k === 'ArrowRight' || k === 'd') { keys.right = down; e.preventDefault(); }
  }
  function onDown(e) {
    if (phase !== 'play') return;
    e.preventDefault();
    const r = canvasEl.getBoundingClientRect();
    stick = { active: true, baseX: e.clientX - r.left, baseY: e.clientY - r.top, dx: 0, dy: 0 };
  }
  function onMove(e) {
    if (!stick.active) return;
    const r = canvasEl.getBoundingClientRect();
    const dx = (e.clientX - r.left) - stick.baseX, dy = (e.clientY - r.top) - stick.baseY;
    const max = R * 0.12, len = Math.hypot(dx, dy) || 1;
    const cl = Math.min(len, max);
    stick = { ...stick, dx: dx / len * cl, dy: dy / len * cl };
  }
  function onUp() { stick = { ...stick, active: false, dx: 0, dy: 0 }; }

  let paused = false;   // tab 隱藏暫停（屈原不會在你不在時被咬死）
  function onVis() { paused = document.hidden; if (!paused) lastT = performance.now(); }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (!ctx) return;
    let dt = (now - lastT) / 1000; lastT = now;
    if (!isFinite(dt) || dt < 0) dt = 0;
    if (dt > DT_CAP) dt = DT_CAP;
    if (phase === 'play' && !paused) update(dt);
    draw();
  }

  function update(dt) {
    t += dt;
    if (hurtFlash > 0) hurtFlash = Math.max(0, hurtFlash - dt);
    wave = 1 + Math.floor(repelled / 8);

    // 船移動：搖桿 or 鍵盤
    let mx = 0, my = 0;
    if (stick.active) { const max = R * 0.12; mx = stick.dx / max; my = stick.dy / max; }
    else { mx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0); my = (keys.down ? 1 : 0) - (keys.up ? 1 : 0); }
    const SPEED = 0.62;   // 炮船夠快才追得上四面的魚
    boat.x = Math.max(0.06, Math.min(0.94, boat.x + mx * SPEED * dt));
    boat.y = Math.max(0.08, Math.min(0.94, boat.y + my * SPEED * dt));
    if (mx || my) boat.ang = Math.atan2(my, mx) + Math.PI / 2;

    // 自動發炮：朝「射程內」最近的活魚。射程外的魚打不到 → 逼玩家把船開過去守
    fireTimer -= dt;
    if (fireTimer <= 0 && fish.length) {
      let near = null, best = FIRE_RANGE * FIRE_RANGE;   // 只考慮射程內
      for (const f of fish) { if (f.dead) continue; const d = (f.x - boat.x) ** 2 + (f.y - boat.y) ** 2; if (d < best) { best = d; near = f; } }
      if (near) {
        const a = Math.atan2(near.y - boat.y, near.x - boat.x);
        shots.push({ x: boat.x, y: boat.y, vx: Math.cos(a) * SHOT_SPEED, vy: Math.sin(a) * SHOT_SPEED });
        fireTimer = FIRE_GAP;
      }
    }

    // 生成魚（wave 升溫 → 多面同時來，圍攻感）
    spawnTimer -= dt;
    if (spawnTimer <= 0) { spawnFish(); if (wave >= 2 && Math.random() < 0.6) spawnFish(); if (wave >= 4 && Math.random() < 0.5) spawnFish(); spawnTimer = spawnGap(); }

    // 魚移動 + 咬屈原
    const fk = [];
    for (const f of fish) {
      if (f.dead) continue;
      f.x += f.vx * dt; f.y += f.vy * dt;
      const d = Math.hypot(f.x - QY.x, f.y - QY.y);
      if (d < 0.08) { hp = Math.max(0, hp - FISH_BITE); hurtFlash = 0.3; bubbles.push({ x: QY.x, y: QY.y - 0.08, life: 0.6 }); if (hp <= 0) return finish('fail'); continue; }
      fk.push(f);
    }
    fish = fk;

    // 炮飛行 + 命中
    const sk = [];
    for (const s of shots) {
      s.x += s.vx * dt; s.y += s.vy * dt;
      if (s.x < -0.1 || s.x > 1.1 || s.y < -0.1 || s.y > 1.1) continue;   // 出界 cull
      // 命中最近魚
      let hit = false;
      for (const f of fish) {
        if (f.dead) continue;
        if (Math.hypot(f.x - s.x, f.y - s.y) < 0.06) {
          f.dead = true; hit = true;
          blasts.push({ x: s.x, y: s.y, r: 0, life: 0.35 });
          repelled = Math.min(GOAL_REPEL, repelled + 1);
          if (repelled >= GOAL_REPEL) return finish('win');
          break;
        }
      }
      if (!hit) sk.push(s);
    }
    shots = sk;
    fish = fish.filter((f) => !f.dead);

    // 炸開動畫 + 泡泡
    blasts = blasts.filter((b) => { b.life -= dt; b.r += dt * BLAST_R * 8; return b.life > 0; });
    bubbles = bubbles.filter((b) => { b.life -= dt; b.y -= dt * 0.08; return b.life > 0; });
  }

  let finishTimer = 0;
  function finish(result) {
    phase = result;
    if (result === 'win') finishTimer = setTimeout(() => onComplete(10), 1000);
  }

  // ── 繪製 ──
  const sprites = {};
  function loadSprite(k, svg) { const i = new Image(); i.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg); sprites[k] = i; }
  function drawSprite(k, cx, cy, w, h, ang, fb) {
    const img = sprites[k];
    ctx.save(); ctx.translate(cx, cy); if (ang) ctx.rotate(ang);
    if (img && img.complete && img.naturalWidth) ctx.drawImage(img, -w / 2, -h / 2, w, h);
    else { ctx.fillStyle = fb; ctx.beginPath(); ctx.arc(0, 0, w / 2, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // 江水
    const g = ctx.createRadialGradient(px(0.5), py(0.5), R * 0.1, px(0.5), py(0.5), R * 0.7);
    g.addColorStop(0, '#4FB3D0'); g.addColorStop(1, '#1C6E88');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // 受傷紅閃
    if (hurtFlash > 0) { ctx.fillStyle = `rgba(229,84,74,${hurtFlash})`; ctx.fillRect(0, 0, W, H); }

    // 屈原體力環
    const ringR = R * 0.11;
    ctx.lineWidth = R * 0.018;
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath(); ctx.arc(px(QY.x), py(QY.y), ringR, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = hp > 30 ? '#5BA86B' : '#E5544A';
    ctx.beginPath(); ctx.arc(px(QY.x), py(QY.y), ringR, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (hp / HP_MAX)); ctx.stroke();
    // 屈原
    drawSprite('quyuan', px(QY.x), py(QY.y), R * 0.16, R * 0.16, 0, '#FBE3C6');
    // 求救泡泡
    for (const b of bubbles) { ctx.globalAlpha = b.life; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px(b.x), py(b.y), R * 0.012, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1;

    // 魚（朝游向）
    for (const f of fish) { const a = Math.atan2(f.vy, f.vx); drawSprite('fish', px(f.x), py(f.y), R * 0.11, R * 0.077, a, '#6B8E3A'); }
    // 粽子炮
    for (const s of shots) drawSprite('zong', px(s.x), py(s.y), R * 0.06, R * 0.06, 0, '#5BA86B');
    // 炸開
    for (const b of blasts) { ctx.globalAlpha = b.life * 2.5; ctx.strokeStyle = '#FFE9A8'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(px(b.x), py(b.y), b.r * R, 0, Math.PI * 2); ctx.stroke(); }
    ctx.globalAlpha = 1;
    // 炮船
    drawSprite('boat', px(boat.x), py(boat.y), R * 0.1, R * 0.15, boat.ang, '#E5544A');

    // 虛擬搖桿
    if (stick.active) {
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(stick.baseX, stick.baseY, R * 0.12, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(stick.baseX + stick.dx, stick.baseY + stick.dy, R * 0.05, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  onMount(() => {
    loadSprite('fish', PIRANHA_SVG);
    loadSprite('quyuan', QUYUAN_STRUGGLE_SVG);
    loadSprite('boat', CANNON_BOAT_SVG);
    loadSprite('zong', ZONGZI_SVG);
    ctx = canvasEl.getContext('2d');
    if (!ctx) { ctxReady = false; return; }
    reset(); resize();
    ro = new ResizeObserver(resize); ro.observe(wrapEl);
    const kd = (e) => onKey(e, true), ku = (e) => onKey(e, false);
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('visibilitychange', onVis);
    lastT = performance.now(); raf = requestAnimationFrame(tick);
    if (import.meta.env?.DEV) window.__piranha = { state: () => ({ phase, hp, repelled, wave, fish: fish.length }), reset };
    cleanup = () => { window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); };
  });

  let cleanup = () => {};
  onDestroy(() => {
    cancelAnimationFrame(raf); clearTimeout(finishTimer); ro?.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('orientationchange', resize);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    document.removeEventListener('visibilitychange', onVis);
    cleanup();
    if (import.meta.env?.DEV) delete window.__piranha;
  });
</script>

<div class="piranha-wrap" bind:this={wrapEl}>
  {#if ctxReady}
    <canvas bind:this={canvasEl} onpointerdown={onDown}
      aria-label="食人魚救屈原：按住拖動螢幕操控龍舟炮船走位，炮船會自動丟粽子擊退食人魚，保護中央的屈原"></canvas>
    <p class="sr-only">食人魚救屈原。按住並拖動螢幕（或用方向鍵）操控龍舟粽子炮船在水面走位，炮船會自動朝最近的食人魚發射粽子炮。撐住保護中央掙扎的屈原，擊退足夠的食人魚就能把他救起。</p>

    <div class="hud" aria-hidden="true">
      <div class="wave">第 {wave} 波</div>
      <div class="repel">擊退 {repelled}/{GOAL_REPEL}</div>
    </div>
    <div class="hint" class:hide={repelled > 0 || stick.active} aria-hidden="true">按住螢幕拖動炮船！</div>

    {#if phase !== 'play'}
      <div class="overlay" class:win={phase === 'win'}>
        <div class="card pop-in panel">
          {#if phase === 'win'}
            <div class="big">擊退魚群，救起屈原！</div>
            <div class="sub">英雄 — 過關</div>
          {:else}
            <div class="big">屈原撐不住了…</div>
            <div class="sub">再救一次，守得更緊！</div>
            <button class="btn" onclick={reset}>再救一次</button>
          {/if}
        </div>
      </div>
    {/if}
  {:else}
    <div class="fallback card">這個瀏覽器不支援遊戲畫布，請用較新的瀏覽器再試。</div>
  {/if}
</div>

<style>
  .piranha-wrap { position: relative; width: 100%; height: 100%; border-radius: var(--radius, 24px); overflow: hidden; background: #1C6E88; touch-action: none; user-select: none; }
  canvas { display: block; width: 100%; height: 100%; }
  .hud { position: absolute; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0.6rem 0.9rem; pointer-events: none; font-weight: 800; }
  .wave { background: rgba(255,255,255,0.9); color: #E5544A; border-radius: 999px; padding: 0.25rem 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .repel { background: rgba(255,255,255,0.9); color: #3E8A52; border-radius: 999px; padding: 0.25rem 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .hint { position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); color: #fff; font-weight: 900; font-size: 1.2rem; text-shadow: 0 2px 6px rgba(0,0,0,0.5); animation: pulse 0.9s ease infinite; pointer-events: none; }
  .hint.hide { display: none; }
  @keyframes pulse { 50% { transform: translateX(-50%) scale(1.1); } }
  .overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(28,110,136,0.6); backdrop-filter: blur(2px); }
  .overlay.win { background: rgba(91,168,107,0.55); }
  .panel { text-align: center; padding: 1.4rem 1.8rem; background: var(--card, #fff); }
  .big { font-family: var(--font-kai, serif); font-size: 1.4rem; font-weight: 800; color: var(--ink, #3D2C29); }
  .sub { color: var(--ink-soft, #8a7a72); margin: 0.4rem 0 1rem; }
  .fallback { padding: 2rem; text-align: center; color: var(--ink-soft, #8a7a72); display: flex; align-items: center; justify-content: center; height: 100%; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
