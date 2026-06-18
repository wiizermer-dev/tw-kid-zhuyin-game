<script>
  /** L3 包粽子節奏 —— 依序點 粽葉→料→繩 包好一顆，包滿 10 顆過關。純 DOM/CSS。
      放鬆關：無時限、無失敗（點錯順序該顆 reset，不罰）。光圈引導手感（juice，非 fail 來源）。
      對外契約：包滿 10 → onComplete(10)。 */
  import { onDestroy } from 'svelte';
  import Zongzi from '../Zongzi.svelte';

  let { onComplete = () => {} } = $props();

  const GOAL = 10;
  const STEPS = ['leaf', 'rice', 'tie'];       // 粽葉 → 料 → 繩
  const STEP_LABEL = { leaf: '粽葉', rice: '糯米', tie: '綁繩' };
  const STEP_ICON = { leaf: '🍃', rice: '🍚', tie: '🪢' };  // 純裝飾按鈕標（非碰撞物，可用 emoji）

  let wrapped = $state(0);          // 已包好的粽子數
  let step = $state(0);             // 當前在第幾步（0=粽葉,1=料,2=繩）
  let combo = $state(0);            // 連續完美包（不點錯）
  let comboBest = $state(0);
  let done = $state(false);
  let pulse = $state('leaf');       // 光圈現在引導哪個鈕（節奏脈動）
  let north = $state(false);        // 南北粽彩蛋：true=北部粽
  let toast = $state('');           // 彈出提示
  let steamer = $state([]);         // 蒸籠堆疊的粽子（視覺）

  // 節奏光圈：每拍跳到「當前該點的步驟」，給跟拍手感
  const beat = setInterval(() => { if (!done) pulse = STEPS[step]; }, 480);

  // 偶爾南北粽彩蛋（呼應 L3 知識題「南北粽」）
  function maybeEgg() {
    if (Math.random() < 0.18) { north = Math.random() < 0.5; flash(north ? '這顆包北部粽！' : '這顆包南部粽！'); }
    else north = null;
  }

  let toastTimer = 0;
  function flash(msg) { toast = msg; clearTimeout(toastTimer); toastTimer = setTimeout(() => (toast = ''), 900); }

  function tap(which) {
    if (done) return;
    if (which !== STEPS[step]) {              // 點錯順序：該顆重來（放鬆關，不罰只 reset）
      if (step > 0) { step = 0; combo = 0; flash('順序不對，重包這顆～'); }
      return;
    }
    step++;
    if (step >= STEPS.length) {               // 三步完成一顆
      step = 0;
      wrapped = Math.min(GOAL, wrapped + 1);
      combo++; if (combo > comboBest) comboBest = combo;
      steamer = [...steamer, { id: wrapped, north }];
      if (combo >= 3) flash(combo + ' 連包！');
      if (wrapped >= GOAL) finish();
      else maybeEgg();
    }
  }

  let finishTimer = 0;
  function finish() {
    done = true;
    finishTimer = setTimeout(() => onComplete(GOAL), 1000);   // 看蒸籠冒煙再回呼
  }

  function reset() {
    wrapped = 0; step = 0; combo = 0; comboBest = 0; done = false;
    steamer = []; north = null; toast = '';
  }

  onDestroy(() => { clearInterval(beat); clearTimeout(finishTimer); clearTimeout(toastTimer); });
</script>

<div class="wrap-game">
  <!-- 蒸籠（粽子越堆越多） -->
  <div class="steamer" aria-hidden="true">
    <div class="steam" class:on={done}><span>～</span><span>～</span><span>～</span></div>
    <div class="basket">
      {#each steamer as z (z.id)}
        <div class="z-slot bounce-in" class:north={z.north}>
          <Zongzi size={34} />
        </div>
      {/each}
    </div>
    <div class="basket-label">蒸籠 {wrapped}/{GOAL}</div>
  </div>

  {#if toast}<div class="toast pop-in" aria-hidden="true">{toast}</div>{/if}

  <!-- 工作台：當前粽子組裝進度 -->
  <div class="bench" aria-hidden="true">
    <div class="progress">
      {#each STEPS as s, i}
        <span class="dot" class:filled={i < step}></span>
      {/each}
    </div>
    <div class="hint">下一步：<b>{STEP_LABEL[STEPS[step]]}</b></div>
  </div>

  <!-- 三步驟按鈕 -->
  <div class="pad">
    {#each STEPS as s}
      <button class="step-btn" class:glow={pulse === s} onclick={() => tap(s)}
        aria-label={'包粽子步驟：' + STEP_LABEL[s]}>
        <span class="icon">{STEP_ICON[s]}</span>
        <span class="lbl">{STEP_LABEL[s]}</span>
      </button>
    {/each}
  </div>

  <p class="sr-only">包粽子遊戲。依照「粽葉、糯米、綁繩」的順序點按鈕，完成一顆粽子放進蒸籠，包滿十顆過關。順序點錯只會重包這顆，不會失敗。</p>

  {#if done}
    <div class="overlay win">
      <div class="card pop-in panel">
        <div class="big">蒸好 10 顆粽子！</div>
        <div class="sub">香噴噴 — 過關</div>
        {#if comboBest >= 3}<div class="brag">最高 {comboBest} 連包 🔥</div>{/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .wrap-game {
    position: relative; width: 100%; height: 100%;
    border-radius: var(--radius, 24px); overflow: hidden;
    background: linear-gradient(160deg, #FFF7E8, #FFE9D2);
    display: flex; flex-direction: column; align-items: center;
    padding: 1rem; gap: 0.8rem; user-select: none;
  }
  .steamer { width: 100%; max-width: 360px; display: flex; flex-direction: column; align-items: center; }
  .steam { height: 22px; display: flex; gap: 10px; opacity: 0; transition: opacity 0.4s; }
  .steam.on { opacity: 1; }
  .steam span { color: #cbb; font-size: 1.3rem; animation: rise 1.2s ease-in-out infinite; }
  .steam span:nth-child(2) { animation-delay: 0.3s; }
  .steam span:nth-child(3) { animation-delay: 0.6s; }
  @keyframes rise { 0% { transform: translateY(6px); opacity: 0.2; } 50% { opacity: 0.9; } 100% { transform: translateY(-8px); opacity: 0; } }
  .basket {
    width: 100%; min-height: 90px;
    background: #C97B3A; border: 4px solid #9A5E2A; border-radius: 14px;
    display: flex; flex-wrap: wrap; gap: 2px; padding: 8px; justify-content: center; align-content: flex-start;
    box-shadow: inset 0 -6px 0 rgba(0,0,0,0.15);
  }
  .z-slot.north { filter: brightness(1.08) saturate(1.2); }
  .basket-label { margin-top: 6px; font-weight: 800; color: #9A5E2A; }
  .toast { position: absolute; top: 30%; left: 50%; transform: translateX(-50%); background: #fff; color: #E5544A; font-weight: 800; padding: 0.4rem 1rem; border-radius: 999px; box-shadow: var(--shadow-card, 0 8px 24px rgba(0,0,0,0.12)); z-index: 3; }
  .bench { text-align: center; }
  .progress { display: flex; gap: 8px; justify-content: center; margin-bottom: 6px; }
  .dot { width: 14px; height: 14px; border-radius: 50%; background: #e8dcd2; box-shadow: inset 0 0 0 2px #d8c8b8; transition: background 0.15s; }
  .dot.filled { background: #5BA86B; box-shadow: inset 0 0 0 2px #3E8A52; }
  .hint { color: var(--ink-soft, #8a7a72); font-weight: 700; }
  .hint b { color: #5BA86B; }
  .pad { margin-top: auto; width: 100%; max-width: 360px; display: flex; gap: 0.6rem; }
  .step-btn {
    flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: 0.9rem 0.4rem; border-radius: 18px; background: #fff;
    box-shadow: 0 5px 0 #d8c8b8, var(--shadow-card, 0 8px 24px rgba(0,0,0,0.12));
    font-weight: 800; color: var(--ink, #3D2C29); transition: transform 0.1s, box-shadow 0.1s;
  }
  .step-btn:active { transform: translateY(4px); box-shadow: 0 1px 0 #d8c8b8; }
  .step-btn.glow { box-shadow: 0 5px 0 #3E8A52, 0 0 0 4px #5BA86B, var(--shadow-pop, 0 12px 32px rgba(0,0,0,0.18)); }
  .step-btn .icon { font-size: 1.8rem; }
  .step-btn .lbl { font-size: 0.95rem; }
  .overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(91,168,107,0.55); backdrop-filter: blur(2px); }
  .panel { text-align: center; padding: 1.4rem 1.8rem; background: var(--card, #fff); }
  .big { font-family: var(--font-kai, serif); font-size: 1.5rem; font-weight: 800; color: var(--ink, #3D2C29); }
  .sub { color: var(--ink-soft, #8a7a72); margin: 0.4rem 0 0; }
  .brag { margin-top: 0.6rem; font-weight: 800; color: #E5544A; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
