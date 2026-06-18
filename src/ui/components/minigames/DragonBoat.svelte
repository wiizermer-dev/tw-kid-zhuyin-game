<script>
  /** 龍舟撿粽子 arcade（端午 event）—— Canvas 2D + rAF，引擎完全分離。
      對外唯一契約：onComplete(zongziCollected) —— 只在「採滿 10 顆過關」時呼叫，回傳 10。
      命歸零(fail)只顯示 overlay，玩家按「再划一次」原地重跑（不回呼、不回傳部分數）；
      離開該關交給上層導航。內部自管 canvas / loop / 命數 / resize；不進任何全域 store。 */
  import { onMount, onDestroy } from 'svelte';
  import { ZONGZI_SVG, GOLD_ZONGZI_SVG, SHIELD_SVG, BOAT_SVG, ROCK_SVG, WHIRL_SVG } from './dragonBoatSprites.js';

  let { onComplete = () => {} } = $props();

  const GOAL = 10;        // 採滿幾顆過關
  const LIVES = 3;        // 龍舟命數
  const LANES = 3;        // 水道數
  const DT_CAP = 0.05;    // dt clamp 上限（秒），防 tab 切換 tunneling

  // 對外可見的 HUD 狀態（Svelte 響應）
  let lives = $state(LIVES);
  let collected = $state(0);
  let combo = $state(0);        // 連撿不漏的連擊數（撞擊/漏接歸零）
  let comboBest = $state(0);    // 本輪最高連擊（HUD 炫耀）
  let phase = $state('play');   // 'play' | 'win' | 'fail'
  let ctxReady = $state(true);  // ctx null 守衛失敗時轉 false 顯示 fallback

  let canvasEl;
  let wrapEl;
  let ctx = null;
  let raf = 0;
  let ro = null;

  // 畫布 CSS 尺寸（相對座標基準）
  let W = 0, H = 0, dpr = 1;

  // 遊戲狀態（純元件內部變數，不進 store）
  let boatLane = 1;             // 0..LANES-1
  let boatJumpT = 0;            // 跳躍剩餘秒數（>0 = 滯空無敵）
  let items = [];               // { lane, y, type:'zong'|'gold'|'shield'|'rock'|'whirl', hit }
  let particles = [];           // 撿粽彈跳 + 船尾水花 particle
  let floats = [];              // combo/事件飄字 { x, y, text, life, color }
  let spawnTimer = 0;
  let bobT = 0;                 // 龍舟左右擺動相位
  let paddleT = 0;              // 划槳相位（隨速度加快）
  let drumT = 0;                // 鼓點脈動相位
  let lastT = 0;
  let invuln = 0;               // 撞擊後短暫無敵（閃爍 + 不重複扣命）
  let shieldT = 0;              // 雄黃酒護盾剩餘秒數（>0 = 無敵且不歸零 combo）

  const JUMP_DUR = 0.6;         // 跳躍滯空時間（秒）
  const SCROLL = 0.22;          // 河面下捲基速（佔高/秒）—— 開頭慢、友善
  const SCROLL_MAX = 0.42;      // 升溫到末段的捲速 —— 漸進升溫（前慢後刺激）
  const SPAWN_GAP = 0.85;       // 生成間隔基值（秒）—— 隨升溫縮短
  const HIT_INVULN = 1.4;       // 撞擊無敵秒數
  const SHIELD_DUR = 4;         // 雄黃酒護盾秒數

  // 升溫進度 0→1（隨採粽數），驅動捲速 / 生成密度 / 鼓點節奏
  const ramp = () => Math.min(1, collected / GOAL);
  const currentScroll = () => SCROLL + (SCROLL_MAX - SCROLL) * ramp();
  const currentSpawnGap = () => SPAWN_GAP - 0.3 * ramp();   // 末段物件更密

  // sprite 圖（SVG data URI → Image），preload。drawSprite 用 img.complete 判就緒，未載完走 fallback 形狀
  const sprites = {};
  function loadSprite(key, svg) {
    const img = new Image();
    img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
    sprites[key] = img;
  }

  // ── 幾何（全用相對比例，resize 不爆版）──
  const laneX = (lane) => W * (lane + 0.5) / LANES;
  const boatY = () => H * 0.82;
  const boatR = () => Math.min(W / LANES, H) * 0.16;   // 龍舟「半徑」（AABB 用方框近似）
  const itemR = () => Math.min(W / LANES, H) * 0.11;

  function resize() {
    if (!wrapEl || !canvasEl) return;
    const rect = wrapEl.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    W = rect.width;
    H = rect.height;
    canvasEl.width = Math.round(W * dpr);
    canvasEl.height = Math.round(H * dpr);
    canvasEl.style.width = W + 'px';
    canvasEl.style.height = H + 'px';
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // ── 輸入 ──
  function moveLane(dir) {
    if (phase !== 'play') return;
    boatLane = Math.max(0, Math.min(LANES - 1, boatLane + dir));
  }
  function jump() {
    if (phase !== 'play') return;
    if (boatJumpT > 0) return;          // 滯空中再按無效（無 double-jump）
    boatJumpT = JUMP_DUR;
  }

  function onKey(e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); moveLane(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); moveLane(1); }
    else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); jump(); }
  }
  function onPointer(e) {
    if (phase !== 'play') return;
    const rect = canvasEl.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const third = rect.width / 3;
    if (x < third) moveLane(-1);
    else if (x > third * 2) moveLane(1);
    else jump();
  }

  // ── 生成 ──
  function spawn() {
    const lane = Math.floor(Math.random() * LANES);
    // 粽子佔多數（要採滿 10），障礙穿插。金粽/雄黃酒護盾低機率穿插打破節奏。
    const roll = Math.random();
    let type;
    if (roll < 0.06) type = 'gold';                          // 金粽（限時驚喜，+3）
    else if (roll < 0.06 + (lives < LIVES ? 0.05 : 0.02)) type = 'shield'; // 護盾（缺命時較常出，友善）
    else if (roll < 0.74) type = 'zong';
    else if (roll < 0.87) type = 'rock';
    else type = 'whirl';
    items.push({ lane, y: -0.08, type, hit: false, born: bobT });
  }

  // ── 碰撞（AABB，相對座標）──
  // 粽子 hitbox 放大（好撿）、障礙 hitbox 縮小（不易冤死）— 對小孩友善
  function overlap(it) {
    if (it.lane !== boatLane) return false;
    const iy = it.y * H;
    const by = boatY();
    const br = boatR(), ir = itemR();
    const lift = boatJumpT > 0 ? br * 1.1 : 0;
    const dy = Math.abs(iy - (by - lift));
    const isObstacle = it.type === 'rock' || it.type === 'whirl';
    const tol = isObstacle ? 0.42 : 0.62;   // 可撿物 hitbox 大、障礙小（友善）
    return dy < (br + ir) * tol;
  }

  // ── 主迴圈 ──
  let paused = false;   // tab 隱藏暫停（切走不會偷跑遊戲）
  function onVis() {
    paused = document.hidden;
    if (!paused) lastT = performance.now();   // 回來重設時間基準，避免累積大 dt
  }

  function tick(now) {
    raf = requestAnimationFrame(tick);
    if (!ctx) return;
    let dt = (now - lastT) / 1000;
    lastT = now;
    if (!isFinite(dt) || dt < 0) dt = 0;
    if (dt > DT_CAP) dt = DT_CAP;       // clamp，切 tab 回來不穿透

    if (phase === 'play' && !paused) update(dt);
    draw();
  }

  function update(dt) {
    bobT += dt * 3;
    paddleT += dt * (5 + 4 * ramp());        // 升溫 → 划槳變快
    drumT += dt * (2.2 + 2.5 * ramp());      // 升溫 → 鼓點變快
    if (boatJumpT > 0) boatJumpT = Math.max(0, boatJumpT - dt);
    if (invuln > 0) invuln = Math.max(0, invuln - dt);
    if (shieldT > 0) shieldT = Math.max(0, shieldT - dt);

    spawnTimer -= dt;
    if (spawnTimer <= 0) { spawn(); spawnTimer = currentSpawnGap(); }

    const scroll = currentScroll();
    const protectedNow = boatJumpT > 0 || shieldT > 0;   // 跳躍/護盾期：撞障礙不扣命、不斷 combo

    // 物件下捲 + 碰撞 + cull
    const keep = [];
    for (const it of items) {
      it.y += scroll * dt;
      if (!it.hit && overlap(it)) {
        it.hit = true;
        if (it.type === 'zong' || it.type === 'gold') {
          const gain = it.type === 'gold' ? 3 : 1;
          collected = Math.min(GOAL, collected + gain);
          combo++;
          if (combo > comboBest) comboBest = combo;
          burst(laneX(it.lane), it.y * H, it.type === 'gold');
          boatPop = 1;                          // 撿到船身彈一下
          if (it.type === 'gold') addFloat(laneX(it.lane), it.y * H, '金粽 +3', '#FFC93C');
          else if (combo >= 3) addFloat(laneX(it.lane), it.y * H, combo + ' 連撿!', '#FFE9A8');
          if (collected >= GOAL) return finish('win');
          continue;
        } else if (it.type === 'shield') {
          shieldT = SHIELD_DUR;
          addFloat(laneX(it.lane), it.y * H, '雄黃酒護盾!', '#E5544A');
          continue;
        } else if (protectedNow) {
          // 滯空 / 護盾：躍過或擋下障礙，不扣命、不斷 combo
        } else {
          combo = 0;                            // 漏接以外：撞障礙也斷 combo
          if (invuln <= 0) {
            lives--;
            invuln = HIT_INVULN;
            if (lives <= 0) return finish('fail');
          }
        }
      }
      if (it.y < 1.12) keep.push(it);
      else if (!it.hit && (it.type === 'zong' || it.type === 'gold')) combo = 0;  // 粽子漏接 → 斷 combo
    }
    items = keep;

    if (boatPop > 0) boatPop = Math.max(0, boatPop - dt * 4);

    // 船尾水花（隨划槳節奏噴）
    wakeTimer -= dt;
    if (wakeTimer <= 0) { spawnWake(); wakeTimer = 0.12; }

    // particle
    const pk = [];
    for (const p of particles) {
      p.life -= dt;
      p.x += p.vx * dt; p.y += p.vy * dt; p.vy += (p.grav ?? 900) * dt;
      if (p.life > 0) pk.push(p);
    }
    particles = pk;

    // 飄字
    const fk = [];
    for (const f of floats) {
      f.life -= dt; f.y -= 40 * dt;
      if (f.life > 0) fk.push(f);
    }
    floats = fk;
  }

  let boatPop = 0;       // 撿到粽子船身彈跳量 0..1
  let wakeTimer = 0;

  function burst(x, y, gold = false) {
    const n = gold ? 18 : 10;
    const col = gold ? '#FFC93C' : '#C97B3A';
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 * i) / n + Math.random();
      const sp = 80 + Math.random() * (gold ? 200 : 120);
      particles.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60, life: gold ? 0.7 : 0.5, col });
    }
  }

  function spawnWake() {
    const cx = laneX(boatLane);
    const cy = boatY() + boatR() * 0.5;
    particles.push({
      x: cx + (Math.random() - 0.5) * boatR(), y: cy,
      vx: (Math.random() - 0.5) * 40, vy: 30 + Math.random() * 40,
      life: 0.4, grav: 0, col: 'rgba(255,255,255,0.7)',
    });
  }

  function addFloat(x, y, text, color) {
    floats.push({ x, y, text, color, life: 0.9 });
  }

  let finishTimer = 0;
  function finish(result) {
    phase = result;
    // 只在「採滿 10 過關」回呼 parent；命歸零(fail)純顯示 overlay，玩家按「再划一次」重跑該關
    // 龍舟（題目不重答），離開該關交給上層導航 —— 不在 fail 時回傳部分數。
    if (result === 'win') {
      // 短暫定格讓孩子看到結果（onDestroy 會清掉，不對 stale 元件回呼）
      finishTimer = setTimeout(() => onComplete(collected), 850);
    }
  }

  // ── 繪製 ──
  function draw() {
    ctx.clearRect(0, 0, W, H);
    drawRiver();
    for (const it of items) drawItem(it);
    drawBoat();
    for (const p of particles) {
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life * 2));
      ctx.fillStyle = p.col ?? '#C97B3A';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    drawFloats();
    drawDrums();
  }

  // combo / 事件飄字
  function drawFloats() {
    ctx.textAlign = 'center';
    ctx.font = '700 ' + Math.round(H * 0.04) + 'px var(--font-round, sans-serif)';
    for (const f of floats) {
      ctx.globalAlpha = Math.max(0, Math.min(1, f.life * 1.6));
      ctx.fillStyle = f.color;
      ctx.strokeStyle = 'rgba(255,255,255,0.9)';
      ctx.lineWidth = 3;
      ctx.strokeText(f.text, f.x, f.y);
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.globalAlpha = 1;
  }

  // 底部鼓點節奏條：N 顆鼓燈隨節奏脈動，升溫越打越快（划龍舟感）
  function drawDrums() {
    const n = 5, y = H * 0.965, r = H * 0.013, gap = W * 0.07;
    const beat = (Math.sin(drumT * Math.PI) + 1) / 2;   // 0..1 脈動
    for (let i = 0; i < n; i++) {
      const x = W / 2 + (i - (n - 1) / 2) * gap;
      const phase = (Math.sin(drumT * Math.PI - i * 0.5) + 1) / 2;
      ctx.globalAlpha = 0.4 + phase * 0.6;
      ctx.fillStyle = i % 2 === 0 ? '#E5544A' : '#FFC93C';
      ctx.beginPath();
      ctx.arc(x, y, r * (0.8 + phase * 0.5), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function drawRiver() {
    // 河面青藍漸層（§5.1 --river）
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, '#5FC0DA');
    g.addColorStop(1, '#2E8FAC');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // 波光：數條正弦線往下捲
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 2;
    const t = bobT;
    for (let row = 0; row < 7; row++) {
      const baseY = ((row / 7 + (t * 0.04)) % 1) * H;
      ctx.beginPath();
      for (let x = 0; x <= W; x += 12) {
        const y = baseY + Math.sin(x * 0.04 + t + row) * 4;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    // 道分隔（淡）
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.setLineDash([8, 10]);
    for (let l = 1; l < LANES; l++) {
      const x = (W * l) / LANES;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function drawSprite(key, cx, cy, size, fallbackColor) {
    const img = sprites[key];
    if (img && img.complete && img.naturalWidth) {
      ctx.drawImage(img, cx - size / 2, cy - size / 2, size, size);
    } else {
      ctx.fillStyle = fallbackColor;
      ctx.beginPath();
      ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawItem(it) {
    const cx = laneX(it.lane);
    const cy = it.y * H;
    const size = itemR() * 2;
    if (it.type === 'zong') {
      drawSprite('zong', cx, cy, size, '#5BA86B');
    } else if (it.type === 'gold') {
      // 金粽脈動光暈（限時驚喜，最搶眼）
      const pulse = (Math.sin(bobT * 4) + 1) / 2;
      ctx.save();
      ctx.shadowColor = '#FFD84A';
      ctx.shadowBlur = (10 + pulse * 18);
      drawSprite('gold', cx, cy, size * (1.05 + pulse * 0.12), '#FFC93C');
      ctx.restore();
    } else if (it.type === 'shield') {
      const pulse = (Math.sin(bobT * 3) + 1) / 2;
      ctx.save();
      ctx.shadowColor = '#E5544A';
      ctx.shadowBlur = 8 + pulse * 10;
      drawSprite('shield', cx, cy, size, '#E5544A');
      ctx.restore();
    } else if (it.type === 'rock') {
      drawSprite('rock', cx, cy, size, '#8a7a72');
    } else {
      drawSprite('whirl', cx, cy, size * 1.05, '#2E8FAC');
    }
  }

  function drawBoat() {
    const lift = boatJumpT > 0 ? boatR() * 1.1 : 0;
    const sway = Math.sin(bobT) * (W / LANES) * 0.04;
    const cx = laneX(boatLane) + sway;
    const cy = boatY() - lift;
    // 划槳俯仰：船頭隨划槳節奏點頭；撿到粽子 pop 放大
    const pitch = Math.sin(paddleT) * 0.06;
    const popScale = 1 + boatPop * 0.18;
    const size = boatR() * 2.2 * popScale;

    const blink = invuln > 0 && Math.floor(invuln * 12) % 2 === 0;
    // 跳躍陰影
    if (lift > 0) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = 'rgba(0,0,0,0.18)';
      ctx.beginPath();
      ctx.ellipse(laneX(boatLane) + sway, boatY() + size * 0.18, size * 0.32, size * 0.12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    // 護盾光環（雄黃酒）—— 旋轉發光環，快結束時閃爍提示
    if (shieldT > 0) {
      const ending = shieldT < 1.2 && Math.floor(shieldT * 8) % 2 === 0;
      ctx.globalAlpha = ending ? 0.3 : 0.6;
      ctx.strokeStyle = '#E5544A';
      ctx.lineWidth = 4;
      ctx.setLineDash([10, 8]);
      ctx.lineDashOffset = -bobT * 10;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.62, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    }
    if (blink) ctx.globalAlpha = 0.4;
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(pitch);
    drawSprite('boat', 0, 0, size, '#E5544A');
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  // ── 生命週期 ──
  onMount(() => {
    loadSprite('zong', ZONGZI_SVG);
    loadSprite('gold', GOLD_ZONGZI_SVG);
    loadSprite('shield', SHIELD_SVG);
    loadSprite('boat', BOAT_SVG);
    loadSprite('rock', ROCK_SVG);
    loadSprite('whirl', WHIRL_SVG);

    ctx = canvasEl.getContext('2d');
    if (!ctx) { ctxReady = false; return; }   // ctx null 守衛
    resize();

    ro = new ResizeObserver(resize);
    ro.observe(wrapEl);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', resize);
    document.addEventListener('visibilitychange', onVis);

    lastT = performance.now();
    raf = requestAnimationFrame(tick);

    // dev-only：暴露狀態給自動化測試讀（production build 不掛，零污染）
    if (import.meta.env?.DEV) {
      window.__boat = {
        state: () => ({
          lives, collected, combo, comboBest, phase, boatLane,
          jumping: boatJumpT > 0, shielded: shieldT > 0, ramp: +ramp().toFixed(2),
          items: items.map((it) => ({ lane: it.lane, y: +it.y.toFixed(3), type: it.type })),
        }),
        move: (dir) => moveLane(dir),
        jump,
      };
    }
  });

  onDestroy(() => {
    cancelAnimationFrame(raf);
    clearTimeout(finishTimer);
    ro?.disconnect();
    window.removeEventListener('keydown', onKey);
    window.removeEventListener('resize', resize);
    window.removeEventListener('orientationchange', resize);
    document.removeEventListener('visibilitychange', onVis);
  });

  function retry() {
    clearTimeout(finishTimer);
    lives = LIVES; collected = 0; combo = 0; comboBest = 0; phase = 'play';
    boatLane = 1; boatJumpT = 0; items = []; particles = []; floats = [];
    spawnTimer = 0; invuln = 0; shieldT = 0; boatPop = 0; wakeTimer = 0;
    lastT = performance.now();
  }
</script>

<div class="boat-wrap" bind:this={wrapEl}>
  {#if ctxReady}
    <canvas
      bind:this={canvasEl}
      onpointerdown={onPointer}
      aria-label="龍舟撿粽子小遊戲：左右切換水道，跳躍躲避石頭與漩渦，採滿十顆粽子過關"
    ></canvas>
    <p class="sr-only">
      龍舟撿粽子遊戲。使用左右方向鍵或點螢幕左右半邊切換水道，按空白鍵或點螢幕中間跳躍躲避障礙。
      撿滿十顆粽子即可救屈原。
    </p>

    <!-- HUD -->
    <div class="hud" aria-hidden="true">
      <div class="lives">
        {#each Array(LIVES) as _, i}
          <span class="heart" class:gone={i >= lives}>♥</span>
        {/each}
      </div>
      <div class="count"><span class="z">粽</span> {collected}/{GOAL}</div>
    </div>

    {#if combo >= 2 && phase === 'play'}
      {#key combo}
        <div class="combo pop-in" aria-hidden="true">{combo}<small>連撿</small></div>
      {/key}
    {/if}

    {#if phase !== 'play'}
      <div class="overlay" class:win={phase === 'win'}>
        <div class="card pop-in panel">
          {#if phase === 'win'}
            <div class="big">採滿 10 顆粽子！</div>
            <div class="sub">過關 — 救屈原又近一步</div>
            {#if comboBest >= 3}<div class="brag">最高 {comboBest} 連撿 🔥</div>{/if}
          {:else}
            <div class="big">龍舟翻了…</div>
            <div class="sub">撿到 {collected} 顆，再划一次！</div>
            <button class="btn" onclick={retry}>再划一次</button>
          {/if}
        </div>
      </div>
    {/if}
  {:else}
    <div class="fallback card">這個瀏覽器不支援遊戲畫布，請用較新的瀏覽器再試。</div>
  {/if}
</div>

<style>
  .boat-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: var(--radius, 24px);
    overflow: hidden;
    background: #2E8FAC;
    touch-action: none;            /* input ownership：手機觸控不捲頁 */
    user-select: none;
  }
  canvas { display: block; width: 100%; height: 100%; }

  .hud {
    position: absolute;
    top: 0; left: 0; right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0.9rem;
    pointer-events: none;
    font-weight: 800;
  }
  .lives { font-size: 1.4rem; letter-spacing: 2px; }
  .heart { color: #E5544A; text-shadow: 0 1px 2px rgba(0,0,0,0.3); transition: opacity 0.2s; }
  .heart.gone { opacity: 0.25; color: #fff; }
  .count {
    background: rgba(255,255,255,0.9);
    color: #3E8A52;
    border-radius: 999px;
    padding: 0.25rem 0.8rem;
    font-size: 1.05rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .count .z { color: #C97B3A; }

  /* combo badge：撿連擊時跳出，越高越搶眼 */
  .combo {
    position: absolute;
    top: 22%; left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    font-family: var(--font-kai, serif);
    font-weight: 900;
    font-size: 2.6rem;
    color: #FFE9A8;
    text-shadow: 0 2px 0 #C97B3A, 0 4px 12px rgba(0,0,0,0.3);
    line-height: 1;
    text-align: center;
  }
  .combo small { display: block; font-size: 0.9rem; color: #fff; font-weight: 800; margin-top: 2px; }

  .brag {
    margin-top: 0.6rem;
    font-weight: 800;
    color: #E5544A;
  }

  .overlay {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(46, 143, 172, 0.55);
    backdrop-filter: blur(2px);
  }
  .overlay.win { background: rgba(91, 168, 107, 0.55); }
  .panel {
    text-align: center;
    padding: 1.4rem 1.8rem;
    background: var(--card, #fff);
  }
  .big { font-family: var(--font-kai, serif); font-size: 1.6rem; font-weight: 800; color: var(--ink, #3D2C29); }
  .sub { color: var(--ink-soft, #8a7a72); margin: 0.4rem 0 1rem; }

  .fallback {
    padding: 2rem; text-align: center; color: var(--ink-soft, #8a7a72);
    display: flex; align-items: center; justify-content: center; height: 100%;
  }

  .sr-only {
    position: absolute; width: 1px; height: 1px;
    padding: 0; margin: -1px; overflow: hidden;
    clip: rect(0,0,0,0); white-space: nowrap; border: 0;
  }
</style>
