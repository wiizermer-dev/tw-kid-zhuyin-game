<script>
  /** L2 加速龍舟競渡 —— 連點衝刺 + NPC 對手，終點導向。Canvas 2D + rAF。
      對外契約：onComplete(10) 只在「先到終點」時呼叫；時限到/輸對手 → 再划一次 overlay（不回呼）。 */
  import { onMount, onDestroy } from 'svelte';
  import { BOAT_SVG, BOAT_RIVAL_SVG } from './paddleRaceSprites.js';

  let { onComplete = () => {} } = $props();

  const TRACK = 0.86;       // 終點線相對位置（賽道有效長度比例）
  const TIME_LIMIT = 22;    // 寬鬆時限（秒）
  const STROKE = 0.09;      // 每槳衝量（相對賽道/秒）
  const DRAG = 0.6;         // 速度每秒衰減係數（指數）
  const STROKE_GAP = 0.05;  // 兩槳最小間隔（秒）防按住/連點刷
  const DT_CAP = 0.05;
  const LANES = 3;          // 你 + 2 對手

  let phase = $state('play');   // 'play' | 'win' | 'fail'
  let ctxReady = $state(true);
  let timeLeft = $state(TIME_LIMIT);
  let rank = $state(1);         // 即時名次（HUD）

  let canvasEl, wrapEl, ctx = null, raf = 0, ro = null;
  let W = 0, H = 0, dpr = 1;

  // 你的龍舟（lane 0）+ 對手（lane 1,2）
  let me = { x: 0, v: 0 };
  let rivals = [];              // { x, speed }（NPC 等速 + 輕微抖動）
  let lastStroke = -1;
  let wake = [];                // 船尾水花 particle
  let lastT = 0, raceT = 0, drumT = 0, paddleT = 0;

  function reset() {
    me = { x: 0, v: 0 };
    // 對手速度略低於「穩定連點」的玩家，給得了第一但要努力
    rivals = [
      { lane: 1, x: 0, speed: TRACK / 19, jitter: 0 },
      { lane: 2, x: 0, speed: TRACK / 24, jitter: 0 },
    ];
    timeLeft = TIME_LIMIT; rank = 1; phase = 'play';
    wake = []; raceT = 0; lastStroke = -1; lastT = performance.now();
  }

  // 幾何（相對比例）
  const laneY = (lane) => H * (lane + 0.5) / LANES;
  const startX = () => W * 0.08;
  const finishX = () => W * 0.92;
  const trackLen = () => finishX() - startX();
  const boatPx = (xRel) => startX() + xRel / TRACK * trackLen();
  const boatSize = () => Math.min(H / LANES, W) * 0.34;

  function resize() {
    if (!wrapEl || !canvasEl) return;
    const r = wrapEl.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    W = r.width; H = r.height;
    canvasEl.width = Math.round(W * dpr); canvasEl.height = Math.round(H * dpr);
    canvasEl.style.width = W + 'px'; canvasEl.style.height = H + 'px';
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // 划一槳
  function stroke() {
    if (phase !== 'play') return;
    if (raceT - lastStroke < STROKE_GAP) return;   // 最小間隔
    lastStroke = raceT;
    me.v += STROKE;
    paddleT = 0;                                    // 重啟划槳動畫
    spawnWake();
  }
  function onKey(e) {
    if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); stroke(); }
  }
  function onPointer(e) { e.preventDefault(); stroke(); }

  function spawnWake() {
    const y = laneY(0) + boatSize() * 0.3;
    const x = boatPx(me.x) - boatSize() * 0.4;
    for (let i = 0; i < 4; i++)
      wake.push({ x, y: y + (Math.random() - 0.5) * boatSize() * 0.3,
                  vx: -60 - Math.random() * 80, vy: (Math.random() - 0.5) * 40, life: 0.5 });
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (!ctx) return;
    let dt = (now - lastT) / 1000; lastT = now;
    if (!isFinite(dt) || dt < 0) dt = 0;
    if (dt > DT_CAP) dt = DT_CAP;
    if (phase === 'play') update(dt);
    draw();
  }

  function update(dt) {
    raceT += dt; timeLeft = Math.max(0, TIME_LIMIT - raceT);
    drumT += dt * (2 + me.v * 8);
    paddleT += dt * 9;

    // 你：衝量 + 水阻（指數衰減）
    me.v *= Math.exp(-DRAG * dt);
    me.x += me.v * dt;

    // 對手等速 + 輕微抖動（不會完全機械）
    for (const r of rivals) {
      r.jitter += dt;
      r.x += r.speed * (0.92 + Math.sin(r.jitter * 2 + r.lane) * 0.08) * dt;
    }

    // 名次
    rank = 1 + rivals.filter((r) => r.x > me.x).length;

    // 水花
    const wk = [];
    for (const p of wake) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.life > 0) wk.push(p); }
    wake = wk;

    // 勝負
    if (me.x >= TRACK) return finish('win');
    for (const r of rivals) if (r.x >= TRACK) return finish('fail');   // 對手先到 → 輸
    if (timeLeft <= 0) return finish('fail');                          // 時限到沒到終點 → 輸
  }

  let finishTimer = 0;
  function finish(result) {
    phase = result;
    if (result === 'win') finishTimer = setTimeout(() => onComplete(10), 850);
  }

  // ── 繪製 ──
  const sprites = {};
  function loadSprite(k, svg) { const i = new Image(); i.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg); sprites[k] = i; }
  function drawSprite(k, cx, cy, size, fb) {
    const img = sprites[k];
    if (img && img.complete && img.naturalWidth) ctx.drawImage(img, cx - size / 2, cy - size / 2, size, size);
    else { ctx.fillStyle = fb; ctx.beginPath(); ctx.arc(cx, cy, size / 2, 0, Math.PI * 2); ctx.fill(); }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // 河面青藍漸層
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#5FC0DA'); g.addColorStop(1, '#2E8FAC');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // 賽道波光（橫向流動）
    ctx.strokeStyle = 'rgba(255,255,255,0.18)'; ctx.lineWidth = 2;
    for (let row = 0; row < 9; row++) {
      const y = (row / 9) * H + Math.sin(raceT * 2 + row) * 3;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 14) ctx.lineTo(x - (raceT * 60) % 28, y + Math.sin(x * 0.05 + raceT * 2) * 2);
      ctx.stroke();
    }
    // 道分隔
    ctx.strokeStyle = 'rgba(255,255,255,0.1)'; ctx.setLineDash([10, 12]);
    for (let l = 1; l < LANES; l++) { const y = H * l / LANES; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    ctx.setLineDash([]);
    // 終點線（紅白格）
    drawFinishLine();
    // 水花
    for (const p of wake) { ctx.globalAlpha = Math.max(0, p.life * 2); ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.beginPath(); ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2); ctx.fill(); }
    ctx.globalAlpha = 1;
    // 對手
    for (const r of rivals) drawSprite('rival', boatPx(r.x), laneY(r.lane), boatSize(), '#8a9bb0');
    // 你（划槳俯仰 + 速度前傾）
    const pitch = Math.sin(paddleT) * 0.05 + Math.min(me.v, 0.4) * 0.2;
    ctx.save(); ctx.translate(boatPx(me.x), laneY(0)); ctx.rotate(pitch);
    drawSprite('me', 0, 0, boatSize(), '#E5544A'); ctx.restore();
    // 速度線（衝刺感）
    if (me.v > 0.12) {
      ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const yy = laneY(0) + (i - 1.5) * boatSize() * 0.22;
        const xx = boatPx(me.x) - boatSize() * 0.6;
        ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx - me.v * 120, yy); ctx.stroke();
      }
    }
    drawDrums();
  }

  function drawFinishLine() {
    const x = finishX(), sq = H * 0.04;
    for (let i = 0; i * sq < H; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#fff' : '#E5544A';
      ctx.fillRect(x, i * sq, 8, sq);
    }
  }
  function drawDrums() {
    const n = 5, y = H * 0.95, r = H * 0.014, gap = W * 0.06;
    for (let i = 0; i < n; i++) {
      const x = W / 2 + (i - (n - 1) / 2) * gap;
      const ph = (Math.sin(drumT * Math.PI - i * 0.5) + 1) / 2;
      ctx.globalAlpha = 0.4 + ph * 0.6;
      ctx.fillStyle = i % 2 === 0 ? '#E5544A' : '#FFC93C';
      ctx.beginPath(); ctx.arc(x, y, r * (0.8 + ph * 0.5), 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  onMount(() => {
    loadSprite('me', BOAT_SVG);
    loadSprite('rival', BOAT_RIVAL_SVG);
    ctx = canvasEl.getContext('2d');
    if (!ctx) { ctxReady = false; return; }
    reset(); resize();
    ro = new ResizeObserver(resize); ro.observe(wrapEl);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    lastT = performance.now(); raf = requestAnimationFrame(tick);
    if (import.meta.env?.DEV) window.__paddle = { state: () => ({ phase, x: +me.x.toFixed(3), rank, timeLeft: +timeLeft.toFixed(1) }), stroke };
  });
  onDestroy(() => {
    cancelAnimationFrame(raf); clearTimeout(finishTimer); ro?.disconnect();
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', resize);
    window.removeEventListener('orientationchange', resize);
    if (import.meta.env?.DEV) delete window.__paddle;
  });
</script>

<div class="race-wrap" bind:this={wrapEl}>
  {#if ctxReady}
    <canvas bind:this={canvasEl} onpointerdown={onPointer}
      aria-label="加速龍舟競渡：快速點擊螢幕或按空白鍵划槳，搶在對手之前划到終點"></canvas>
    <p class="sr-only">加速龍舟競渡。快速重複點擊螢幕或按空白鍵划槳，划越快龍舟衝越遠，搶在對手龍舟之前划到右側終點線。</p>

    <div class="hud" aria-hidden="true">
      <div class="rank" class:lead={rank === 1}>第 {rank} 名</div>
      <div class="time">{Math.ceil(timeLeft)}s</div>
    </div>
    <div class="tap-hint" class:hide={me.x > 0.05} aria-hidden="true">狂點划槳！</div>

    {#if phase !== 'play'}
      <div class="overlay" class:win={phase === 'win'}>
        <div class="card pop-in panel">
          {#if phase === 'win'}
            <div class="big">第一個衝過終點！</div>
            <div class="sub">划龍舟高手 — 過關</div>
          {:else}
            <div class="big">{rank === 1 ? '時間到了…' : '被對手超前了…'}</div>
            <div class="sub">再划一次，劃得更快！</div>
            <button class="btn" onclick={reset}>再划一次</button>
          {/if}
        </div>
      </div>
    {/if}
  {:else}
    <div class="fallback card">這個瀏覽器不支援遊戲畫布，請用較新的瀏覽器再試。</div>
  {/if}
</div>

<style>
  .race-wrap { position: relative; width: 100%; height: 100%; border-radius: var(--radius, 24px); overflow: hidden; background: #2E8FAC; touch-action: none; user-select: none; }
  canvas { display: block; width: 100%; height: 100%; }
  .hud { position: absolute; top: 0; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0.6rem 0.9rem; pointer-events: none; font-weight: 800; }
  .rank { background: rgba(255,255,255,0.9); color: #8a7a72; border-radius: 999px; padding: 0.25rem 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .rank.lead { color: #E5544A; }
  .time { background: rgba(255,255,255,0.9); color: #2BB3A9; border-radius: 999px; padding: 0.25rem 0.8rem; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
  .tap-hint { position: absolute; bottom: 12%; left: 50%; transform: translateX(-50%); color: #fff; font-weight: 900; font-size: 1.4rem; text-shadow: 0 2px 6px rgba(0,0,0,0.4); animation: pulse 0.8s ease infinite; pointer-events: none; }
  .tap-hint.hide { display: none; }
  @keyframes pulse { 50% { transform: translateX(-50%) scale(1.12); } }
  .overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(46,143,172,0.55); backdrop-filter: blur(2px); }
  .overlay.win { background: rgba(91,168,107,0.55); }
  .panel { text-align: center; padding: 1.4rem 1.8rem; background: var(--card, #fff); }
  .big { font-family: var(--font-kai, serif); font-size: 1.5rem; font-weight: 800; color: var(--ink, #3D2C29); }
  .sub { color: var(--ink-soft, #8a7a72); margin: 0.4rem 0 1rem; }
  .fallback { padding: 2rem; text-align: center; color: var(--ink-soft, #8a7a72); display: flex; align-items: center; justify-content: center; height: 100%; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
