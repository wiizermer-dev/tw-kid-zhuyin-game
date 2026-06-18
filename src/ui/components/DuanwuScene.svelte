<script>
  /** 端午童話繪本場景 — 全 event 共用的氛圍背景（取代舊 FloatingDuanwu 的純漂浮圖）。
      手繪繪本調：暖陽天空 + 水彩雲 + 圓丘遠山 + 汨羅江波光 + 飄落花瓣與粽子。
      純 CSS/SVG、只用 transform 動畫、prefers-reduced-motion 由 theme.css 全域降速。
      固定滿屏置於內容後方（z-index 0，content .screen 為 z-index 1）。 */
  import Zongzi from './Zongzi.svelte';

  // 飄落花瓣（櫻粉/暖白，呼應參考圖空中花瓣）— 決定性排布，不用亂數
  const petals = Array.from({ length: 14 }, (_, i) => ({
    left: (i * 37 + 6) % 100,
    size: 9 + ((i * 7) % 9),
    delay: -(i * 1.7) % 16,
    dur: 13 + ((i * 5) % 9),
    sway: 14 + ((i * 11) % 18),
    hue: i % 3,            // 0 粉 / 1 暖白 / 2 嫩綠
  }));

  // 空中飄的粽子（少量、低調，呼應參考圖飛舞的粽子）
  const zongzis = Array.from({ length: 4 }, (_, i) => ({
    left: (i * 53 + 18) % 96,
    size: 26 + ((i * 9) % 16),
    delay: -(i * 3.3) % 18,
    dur: 17 + ((i * 4) % 8),
    rot: ((i * 47) % 40) - 20,
  }));

  // 遠方掠過的小鳥（手繪 m 形），各自高度與速度
  const birds = Array.from({ length: 3 }, (_, i) => ({
    top: 12 + i * 7,
    delay: -(i * 7),
    dur: 26 + i * 6,
    scale: 0.7 + i * 0.18,
  }));

  // 江面波光點點（閃爍）
  const sparkles = Array.from({ length: 7 }, (_, i) => ({
    left: (i * 14 + 5) % 96,
    top: 2 + ((i * 5) % 11),
    delay: -(i * 0.6),
    size: 3 + (i % 3),
  }));
</script>

<div class="scene" aria-hidden="true">
  <!-- 手繪粗邊濾鏡（去 AI 味：把完美向量邊抖成繪本手感）-->
  <svg class="defs" width="0" height="0"><defs>
    <filter id="qy-rough"><feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="6"/></filter>
  </defs></svg>

  <!-- 天空：暖陽漸層 -->
  <div class="sky"></div>
  <!-- 柔陽光暈（右上）-->
  <div class="sun-spin"></div>
  <div class="sun"></div>
  <div class="sun-rays"></div>

  <!-- 掠過的小鳥 -->
  {#each birds as b}
    <span class="bird" style:top="{b.top}%" style:--bs={b.scale}
          style:animation-delay="{b.delay}s" style:animation-duration="{b.dur}s">
      <svg viewBox="0 0 24 10" width="24" height="10"><path d="M1 8 Q6 1 12 6 Q18 1 23 8" fill="none" stroke="#5a4a42" stroke-width="1.6" stroke-linecap="round"/></svg>
    </span>
  {/each}

  <!-- 水彩雲（多層視差緩飄）-->
  <svg class="clouds far" viewBox="0 0 400 120" preserveAspectRatio="xMidYMin slice">
    <g fill="#ffffff" opacity="0.7">
      <path d="M40 70 q-22 0 -22 -20 q0 -18 22 -18 q6 -16 28 -16 q24 0 28 18 q20 0 20 18 q0 18 -22 18 z"/>
      <path d="M250 58 q-18 0 -18 -16 q0 -15 18 -15 q5 -13 23 -13 q20 0 23 15 q17 0 17 15 q0 14 -18 14 z"/>
    </g>
  </svg>
  <svg class="clouds near" viewBox="0 0 400 140" preserveAspectRatio="xMidYMin slice">
    <g fill="#ffffff" opacity="0.92">
      <path d="M120 86 q-26 0 -26 -24 q0 -22 26 -22 q7 -19 33 -19 q28 0 33 21 q24 0 24 22 q0 22 -26 22 z"/>
      <path d="M320 78 q-20 0 -20 -18 q0 -17 20 -17 q5 -15 26 -15 q22 0 26 17 q19 0 19 17 q0 16 -20 16 z"/>
    </g>
  </svg>

  <!-- 遠山圓丘（兩層）-->
  <svg class="hills back" viewBox="0 0 400 120" preserveAspectRatio="xMidYMax slice">
    <path d="M0 120 V70 q40 -34 90 -22 q44 10 84 -6 q52 -22 100 -8 q70 18 126 -10 V120 Z" fill="#bfe39a"/>
  </svg>
  <svg class="hills front" viewBox="0 0 400 120" preserveAspectRatio="xMidYMax slice">
    <path d="M0 120 V82 q56 -30 110 -14 q50 14 96 0 q60 -18 110 0 q40 12 78 -4 V120 Z" fill="#8fcf72"/>
  </svg>

  <!-- 汨羅江（底部水帶 + 波光）-->
  <div class="river">
    <svg class="ripples" viewBox="0 0 400 60" preserveAspectRatio="none">
      <path d="M0 18 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.35" stroke-linecap="round"/>
      <path d="M-20 36 q40 -10 80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.22" stroke-linecap="round"/>
    </svg>
    {#each sparkles as s}
      <span class="sparkle" style:left="{s.left}%" style:top="{s.top}%"
            style:width="{s.size}px" style:height="{s.size}px" style:animation-delay="{s.delay}s"></span>
    {/each}
  </div>

  <!-- 空中飄的粽子 -->
  {#each zongzis as z}
    <span class="floatz" style:left="{z.left}%" style:--rot="{z.rot}deg"
          style:animation-delay="{z.delay}s" style:animation-duration="{z.dur}s">
      <Zongzi size={z.size} />
    </span>
  {/each}

  <!-- 飄落花瓣 -->
  {#each petals as p}
    <span class="petal h{p.hue}" style:left="{p.left}%" style:width="{p.size}px" style:height="{p.size}px"
          style:--sway="{p.sway}px" style:animation-delay="{p.delay}s" style:animation-duration="{p.dur}s"></span>
  {/each}

  <!-- 暖光 + 角落暈影（繪本景深，去 AI 平塗味）-->
  <div class="lightwarm"></div>
  <div class="vignette"></div>
  <!-- 紙感顆粒（繪本紙質）-->
  <div class="grain"></div>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    pointer-events: none;
  }

  /* 天空：上方天藍 → 地平線暖奶油（繪本暖陽午後）*/
  .sky {
    position: absolute; inset: 0;
    background:
      linear-gradient(180deg,
        #8fd3f0 0%,
        #bfe6f2 30%,
        #ecf6e8 58%,
        #fdf3da 78%,
        #fce9c8 100%);
  }
  .sun {
    position: absolute; top: 5%; right: 8%;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,247,214,0.95) 0%, rgba(255,224,150,0.55) 38%, rgba(255,210,120,0) 72%);
    animation: sun-breathe 7s ease-in-out infinite;
  }
  .sun-rays {
    position: absolute; top: -4%; right: -2%;
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(255,236,176,0.4) 0%, rgba(255,236,176,0) 60%);
    animation: sun-breathe 9s ease-in-out infinite reverse;
  }
  /* 緩轉光芒（conic 放射）*/
  .sun-spin {
    position: absolute; top: 5%; right: 8%;
    width: 200px; height: 200px; margin: -70px -70px 0 0;
    transform-origin: center;
    background: repeating-conic-gradient(from 0deg,
      rgba(255,238,170,0.28) 0deg 7deg, rgba(255,238,170,0) 7deg 20deg);
    border-radius: 50%;
    -webkit-mask: radial-gradient(circle, #000 18%, transparent 62%);
            mask: radial-gradient(circle, #000 18%, transparent 62%);
    animation: sun-rotate 60s linear infinite;
  }
  @keyframes sun-rotate { to { transform: rotate(360deg); } }
  @keyframes sun-breathe {
    0%, 100% { transform: scale(1); opacity: 0.95; }
    50% { transform: scale(1.08); opacity: 1; }
  }

  /* 小鳥掠空 */
  .bird {
    position: absolute; left: -8%;
    transform: scale(var(--bs, 1));
    animation-name: bird-glide; animation-timing-function: linear; animation-iteration-count: infinite;
    opacity: 0.55;
  }
  .bird svg { animation: bird-flap 0.5s ease-in-out infinite; }
  @keyframes bird-glide {
    0%   { transform: translate(0, 0) scale(var(--bs,1)); }
    50%  { transform: translate(58vw, -3vh) scale(var(--bs,1)); }
    100% { transform: translate(116vw, 2vh) scale(var(--bs,1)); }
  }
  @keyframes bird-flap { 0%,100% { transform: scaleY(1); } 50% { transform: scaleY(0.6); } }

  /* 江面波光閃爍 */
  .sparkle {
    position: absolute; border-radius: 50%;
    background: radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0) 70%);
    animation: twinkle 2.6s ease-in-out infinite;
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(0.4); }
    50% { opacity: 0.9; transform: scale(1.2); }
  }

  /* 暖光 + 暈影（景深）*/
  .lightwarm {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(120% 90% at 86% 12%, rgba(255,236,170,0.35) 0%, rgba(255,236,170,0) 45%);
    mix-blend-mode: soft-light;
  }
  .vignette {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(130% 120% at 50% 42%, rgba(40,60,40,0) 58%, rgba(40,60,40,0.14) 100%);
  }

  .clouds {
    position: absolute; left: 0; width: 240%; height: 18vh;
    will-change: transform;
  }
  .clouds.far { top: 4%; opacity: 0.75; animation: drift 78s linear infinite; }
  .clouds.near { top: 11%; opacity: 0.9; animation: drift 52s linear infinite; }
  @keyframes drift {
    from { transform: translateX(0); }
    to { transform: translateX(-41.6%); }   /* 移動一個 400/960 週期，無縫 */
  }

  .hills { position: absolute; left: 0; width: 100%; filter: url(#qy-rough); }
  .hills.back { bottom: 12vh; height: 22vh; opacity: 0.9; }
  .hills.front { bottom: 8vh; height: 20vh; }
  .defs { position: absolute; }

  .river {
    position: absolute; left: 0; right: 0; bottom: 0; height: 16vh;
    background: linear-gradient(180deg, #6fc4dd 0%, #4aa9c9 55%, #3793b6 100%);
  }
  .ripples { position: absolute; inset: 0; width: 100%; height: 100%;
    animation: ripple-slide 6s ease-in-out infinite; }
  @keyframes ripple-slide {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
  }

  /* 空中粽子：緩慢左右飄 + 自轉 */
  .floatz {
    position: absolute; top: -8%;
    animation-name: fall-float;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    opacity: 0.85;
    filter: drop-shadow(0 4px 6px rgba(61,44,41,0.18));
  }
  @keyframes fall-float {
    0%   { transform: translateY(-10vh) rotate(var(--rot, 0deg)); }
    100% { transform: translateY(118vh) rotate(calc(var(--rot, 0deg) + 40deg)); }
  }

  /* 花瓣：圓潤葉形，飄落 + 左右搖 + 翻轉 */
  .petal {
    position: absolute; top: -6%;
    border-radius: 60% 0 60% 0;
    transform: rotate(0deg);
    animation-name: petal-fall;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .petal.h0 { background: linear-gradient(135deg, #ffd2e0, #ff9fc0); }
  .petal.h1 { background: linear-gradient(135deg, #fff6e6, #ffe0b0); }
  .petal.h2 { background: linear-gradient(135deg, #d8f1bf, #a9da82); }
  @keyframes petal-fall {
    0%   { transform: translate(0, -8vh) rotate(0deg); opacity: 0; }
    10%  { opacity: 0.9; }
    50%  { transform: translate(var(--sway, 16px), 52vh) rotate(220deg); }
    90%  { opacity: 0.9; }
    100% { transform: translate(calc(var(--sway, 16px) * -0.6), 112vh) rotate(440deg); opacity: 0; }
  }

  /* 紙感顆粒 */
  .grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
    opacity: 0.05;
    mix-blend-mode: multiply;
  }
</style>
