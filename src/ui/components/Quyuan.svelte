<script>
  /** Q 版屈原吉祥物 — 全 event 共用的擬人角色（入口卡 / 地圖終點 / 場景龍舟 / 結局）。
      童話繪本調：招牌高冠（《離騷》「高余冠之岌岌兮」）、和善大眼、寬袖漢服、手持蘭草。
      pose: 'wave'（招手） | 'cheer'（歡呼） | 'help'（溺水求救） | 'rescued'（獲救＋光環星芒）。
      暖墨描邊（去 AI 冷灰線）、次級動作（袖／蘭草／冠帶／水波）；純 SVG，
      prefers-reduced-motion 由 theme.css 全域降速。 */
  let {
    size = 64,
    pose = 'wave',
    float = true,           // 是否輕輕上下浮動
    shadow = false,         // 腳下接地陰影（站立場景用，獎章上關閉）
    robe = '#F4ECD6',       // 漢服米白
    robeShade = '#E4D3A8',  // 漢服陰影摺面
    sash = 'var(--reed, #5BA86B)',     // 艾草綠腰封
    sashDeep = 'var(--reed-deep, #3E8A52)',
    skin = '#F5D6AC',
    hat = '#3D2C29',        // 高冠（墨）
    hair = '#2A2320',
    accent = 'var(--cinnabar, #E5544A)',
  } = $props();

  const ink = '#4A3A30';    // 暖墨描邊（取代冷灰，繪本手感）
  const worried = $derived(pose === 'help');
  const armsUp = $derived(pose === 'cheer' || pose === 'rescued');
</script>

<span class="quyuan" class:float class:rescued={pose === 'rescued'} class:help={pose === 'help'}
      style:width="{size}px" style:height="{size * 1.2}px">
  {#if pose === 'rescued'}
    <span class="halo" aria-hidden="true"></span>
    {#each ['s1','s2','s3','s4'] as s}<span class="spark {s}" aria-hidden="true"></span>{/each}
  {/if}

  <svg viewBox="0 0 100 122" width={size} height={size * 1.22}
       aria-hidden="true" focusable="false" style="display:block;overflow:visible">
    {#if shadow}<ellipse class="contact" cx="50" cy="116" rx="26" ry="5" fill="#2e5a3a" opacity="0.18"/>{/if}

    <!-- 高冠（招牌特徵：高聳禮冠 + 冠帶飄）-->
    <path class="ribbon" d="M40 30 C36 42 37 50 41 58 M60 30 C64 42 63 50 59 58" fill="none" stroke={sashDeep} stroke-width="2" stroke-linecap="round" opacity="0.75"/>
    <path d="M37 29 L39.5 9 C39.5 4 60.5 4 60.5 9 L63 29 Z" fill={hat} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="35" y="25.5" width="30" height="6.5" rx="3.2" fill={hat} stroke={ink} stroke-width="1.4"/>
    <path d="M40 14 L60 14" stroke={accent} stroke-width="2.6" stroke-linecap="round"/>

    <!-- 頭髮（冠下兩鬢）-->
    <path d="M32 39 C30 30 37 25 50 25 C63 25 70 30 68 39 C66 33 58 30 50 30 C42 30 34 33 32 39 Z" fill={hair}/>

    <!-- 臉 -->
    <circle cx="50" cy="43" r="16.5" fill={skin} stroke={ink} stroke-width="1.8"/>
    <circle cx="33.5" cy="44" r="3.4" fill={skin} stroke={ink} stroke-width="1.4"/>
    <circle cx="66.5" cy="44" r="3.4" fill={skin} stroke={ink} stroke-width="1.4"/>

    <!-- 眉 -->
    {#if worried}
      <path d="M39 35 C42 34 46 35 47.5 38 M61 35 C58 34 54 35 52.5 38" fill="none" stroke={ink} stroke-width="2.2" stroke-linecap="round"/>
    {:else}
      <path d="M40 37 C43.5 34.5 47 34.5 48.5 37 M60 37 C56.5 34.5 53 34.5 51.5 37" fill="none" stroke={ink} stroke-width="2.2" stroke-linecap="round"/>
    {/if}

    <!-- 眼（會眨）-->
    <g class="eyes">
      <ellipse cx="43.5" cy="44" rx="2.9" ry="3.6" fill={ink}/>
      <ellipse cx="56.5" cy="44" rx="2.9" ry="3.6" fill={ink}/>
      <circle cx="44.8" cy="42.8" r="1.1" fill="#fff"/>
      <circle cx="57.8" cy="42.8" r="1.1" fill="#fff"/>
    </g>
    <!-- 腮紅（加大、更甜）-->
    <ellipse cx="38" cy="49.5" rx="4.4" ry="2.8" fill={accent} opacity="0.3"/>
    <ellipse cx="62" cy="49.5" rx="4.4" ry="2.8" fill={accent} opacity="0.3"/>

    <!-- 嘴 -->
    {#if worried}
      <ellipse cx="50" cy="53" rx="3.2" ry="3.8" fill="#9a4a3a"/>
      <path d="M47 51 Q50 49 53 51" fill="none" stroke="#7a3528" stroke-width="1.2" stroke-linecap="round"/>
    {:else}
      <path d="M44.5 51.5 C48 56 52 56 55.5 51.5 C52 54 48 54 44.5 51.5 Z" fill="#c25a44"/>
      <path d="M44.5 51.5 C48 55.5 52 55.5 55.5 51.5" fill="none" stroke="#9a4a3a" stroke-width="1.8" stroke-linecap="round"/>
    {/if}
    <!-- 八字鬚 + 小山羊鬍 -->
    <path d="M50 50 C47 51 45 52 43.5 54 M50 50 C53 51 55 52 56.5 54" fill="none" stroke={ink} stroke-width="1.6" stroke-linecap="round"/>
    <path d="M47.5 56.5 C47.5 60.5 52.5 60.5 52.5 56.5 Z" fill={ink} opacity="0.92"/>

    {#if worried}
      <!-- 汗滴（緊張）-->
      <path class="sweat" d="M70 36 C70 39 73 40 73 37 C73 35 71.5 33 70 36 Z" fill="#7fc4dd" stroke="#4aa9c9" stroke-width="0.8"/>
    {/if}

    <!-- 身體：寬袖漢服 -->
    <g class="torso">
      <path d="M37 61 C40 59 60 59 63 61 C70 65 76 92 78 112 C66 116 34 116 22 112 C24 92 30 65 37 61 Z"
            fill={robe} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
      <path d="M50 61 L42 75 L50 73 L58 75 Z" fill={robeShade}/>
      <path d="M50 61 C47 67 47 71 50 73 C53 71 53 67 50 61 Z" fill="#fff" opacity="0.55"/>
      <!-- 腰封 + 蝴蝶結 -->
      <path d="M28 87 C40 91 60 91 72 87 L70 97 C58 100 42 100 30 97 Z" fill={sash} stroke={sashDeep} stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M50 89 C45 86 41 90 44 94 C47 97 50 93 50 91 C50 93 53 97 56 94 C59 90 55 86 50 89 Z" fill={sash} stroke={sashDeep} stroke-width="1.4" stroke-linejoin="round"/>
      <circle cx="50" cy="91.5" r="2.4" fill={sashDeep}/>
      <path d="M34 109 C34 101 36 93 38 87 M66 109 C66 101 64 93 62 87" fill="none" stroke="#cdb988" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
    </g>

    <!-- 手臂 / 寬袖（依姿勢）-->
    {#if pose === 'help'}
      <!-- 溺水：雙手撲打求救（左右交替）-->
      <path class="flail-l" d="M37 66 C28 60 21 50 19 41 C16 49 19 62 30 73 Z" fill={robe} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
      <path class="flail-r" d="M63 66 C72 60 79 50 81 41 C84 49 81 62 70 73 Z" fill={robe} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="18" cy="40" r="4.6" fill={skin} stroke={ink} stroke-width="1.4"/>
      <circle cx="82" cy="40" r="4.6" fill={skin} stroke={ink} stroke-width="1.4"/>
      <!-- 江水半淹 + 水波圈 -->
      <g class="water">
        <path d="M16 96 Q26 90 36 96 T56 96 T76 96 T96 96 L96 122 L4 122 L4 96 Q10 92 16 96 Z" fill="#4aa9c9" opacity="0.92"/>
        <path d="M14 100 Q26 94 38 100 T62 100 T86 100" fill="none" stroke="#fff" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
      </g>
      <circle class="ripple r1" cx="50" cy="98" r="14" fill="none" stroke="#fff" stroke-width="2" opacity="0.5"/>
      <circle class="ripple r2" cx="50" cy="98" r="14" fill="none" stroke="#fff" stroke-width="2" opacity="0.5"/>
    {:else if armsUp}
      <!-- 雙袖上舉歡呼（左右輕擺）-->
      <path class="arm-l sway-l" d="M37 65 C26 59 18 47 16 37 C14 45 18 61 28 73 Z" fill={robe} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
      <path class="arm-r sway-r" d="M63 65 C74 59 82 47 84 37 C86 45 82 61 72 73 Z" fill={robe} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="15" cy="36" r="4.6" fill={skin} stroke={ink} stroke-width="1.4"/>
      <circle cx="85" cy="36" r="4.6" fill={skin} stroke={ink} stroke-width="1.4"/>
    {:else}
      <!-- 右袖招手、左袖垂（握蘭草）-->
      <path class="arm-r wave-arm" d="M63 65 C74 61 82 51 85 41 C88 49 84 63 72 73 Z" fill={robe} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="86" cy="40" r="4.6" fill={skin} stroke={ink} stroke-width="1.4"/>
      <path d="M37 67 C30 73 26 85 26 97 C30 99 36 97 40 91 Z" fill={robe} stroke={ink} stroke-width="2.2" stroke-linejoin="round"/>
      <circle cx="28" cy="97" r="4.2" fill={skin} stroke={ink} stroke-width="1.4"/>
      <!-- 蘭草（香草美人，輕晃）-->
      <g class="orchid">
        <path d="M28 97 C24 89 22 81 24 73 M28 97 C30 89 32 83 31 75 M28 97 C32 91 36 87 39 83"
              fill="none" stroke={sashDeep} stroke-width="2" stroke-linecap="round"/>
        <ellipse cx="24" cy="72" rx="2.2" ry="3.8" fill={accent} opacity="0.9" transform="rotate(-12 24 72)"/>
        <ellipse cx="39" cy="83" rx="1.8" ry="3" fill={accent} opacity="0.7" transform="rotate(40 39 83)"/>
      </g>
    {/if}
  </svg>
</span>

<style>
  .quyuan { position: relative; display: inline-block; }
  .quyuan.float { animation: qy-bob 3.2s ease-in-out infinite; }
  .quyuan.rescued { animation: qy-hop 1.1s cubic-bezier(.3,1.5,.5,1) infinite; }
  @keyframes qy-bob {
    0%, 100% { transform: translateY(0) rotate(-1deg); }
    50% { transform: translateY(-6px) rotate(1deg); }
  }
  @keyframes qy-hop {
    0%, 100% { transform: translateY(0) scale(1); }
    40% { transform: translateY(-10px) scale(1.04, 0.97); }
    70% { transform: translateY(0) scale(1.02, 0.98); }
  }

  .eyes { animation: qy-blink 4.5s infinite; transform-origin: center; }
  @keyframes qy-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    96% { transform: scaleY(0.1); }
  }

  /* 次級動作：自然彈簧緩動、各自相位 */
  .wave-arm { transform-origin: 70px 67px; animation: qy-wave 1.3s ease-in-out infinite; }
  @keyframes qy-wave { 0%,100% { transform: rotate(-9deg); } 50% { transform: rotate(11deg); } }

  .sway-l { transform-origin: 35px 68px; animation: qy-sway 2.4s ease-in-out infinite; }
  .sway-r { transform-origin: 65px 68px; animation: qy-sway 2.4s ease-in-out infinite reverse; }
  @keyframes qy-sway { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }

  .flail-l { transform-origin: 36px 69px; animation: qy-flail 0.5s ease-in-out infinite; }
  .flail-r { transform-origin: 64px 69px; animation: qy-flail 0.5s ease-in-out infinite reverse; }
  @keyframes qy-flail { 0%,100% { transform: rotate(-14deg); } 50% { transform: rotate(8deg); } }

  .orchid { transform-origin: 28px 97px; animation: qy-orchid 2.8s ease-in-out infinite; }
  @keyframes qy-orchid { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }

  .ribbon { animation: qy-ribbon 3s ease-in-out infinite; transform-origin: 50px 30px; }
  @keyframes qy-ribbon { 0%,100% { transform: skewX(-3deg); } 50% { transform: skewX(3deg); } }

  .sweat { animation: qy-sweat 1.4s ease-in infinite; }
  @keyframes qy-sweat { 0% { opacity: 0; transform: translateY(-2px); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateY(6px); } }

  .water { animation: qy-waterbob 1.6s ease-in-out infinite; transform-origin: center bottom; }
  @keyframes qy-waterbob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(1.5px); } }
  .ripple { animation: qy-ripple 2s ease-out infinite; transform-origin: 50px 98px; }
  .ripple.r2 { animation-delay: 1s; }
  @keyframes qy-ripple {
    0% { transform: scale(0.4); opacity: 0.55; }
    100% { transform: scale(1.3); opacity: 0; }
  }

  .halo {
    position: absolute; inset: -10% -8% auto -8%; height: 72%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,236,170,0.9) 0%, rgba(255,236,170,0) 68%);
    animation: qy-bob 3.2s ease-in-out infinite;
  }
  /* 四角星芒（取代陽春加號）*/
  .spark {
    position: absolute; width: 11px; aspect-ratio: 1;
    background: #ffe08a;
    clip-path: polygon(50% 0, 60% 40%, 100% 50%, 60% 60%, 50% 100%, 40% 60%, 0 50%, 40% 40%);
    filter: drop-shadow(0 0 2px rgba(255,200,80,0.95));
    animation: qy-spark 1.7s ease-in-out infinite;
  }
  .spark.s1 { top: 2%;  left: 4%;  animation-delay: 0s; }
  .spark.s2 { top: 10%; right: 2%; animation-delay: 0.4s; }
  .spark.s3 { top: 38%; left: -6%; width: 8px; animation-delay: 0.8s; }
  .spark.s4 { top: 30%; right: -5%; width: 8px; animation-delay: 1.2s; }
  @keyframes qy-spark {
    0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
    50% { opacity: 1; transform: scale(1) rotate(35deg); }
  }
</style>
