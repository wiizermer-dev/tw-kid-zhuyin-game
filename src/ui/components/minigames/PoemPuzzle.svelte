<script>
  /** L4 詩句拼句 —— 拖曳（主）/ 點擊（fallback）把詞組卡依序排回端午/屈原名句。純 DOM。
      拼對 10 句過關。無失敗（排錯回位重排）。
      對外契約：拼滿 10 句 → onComplete(10)。 */
  import { onDestroy } from 'svelte';
  import { POEMS } from './poemData.js';

  let { onComplete = () => {} } = $props();

  const GOAL = 10;

  let order = $state([]);        // 本輪題目順序（洗亂 10 句）
  let qi = $state(0);            // 第幾句
  let slots = $state([]);        // 上方空格：null 或 word
  let pool = $state([]);         // 下方可選詞組卡（洗亂）
  let solvedCount = $state(0);
  let lit = $state(false);       // 整句拼對的金光
  let done = $state(false);
  let dragging = $state(null);   // { word, idx, x, y } 拖曳中

  function shuffle(a) {          // 決定性無所謂，玩家體感要亂即可（用 index 擾動避免 Math.random 也行，但這裡視覺用）
    const r = [...a];
    for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
    return r;
  }

  function loadQuestion() {
    const p = order[qi];
    slots = p.words.map(() => null);
    pool = shuffle(p.words.map((w, i) => ({ w, key: i })));
    lit = false;
  }

  function start() {
    order = shuffle(POEMS).slice(0, GOAL);
    qi = 0; solvedCount = 0; done = false;
    loadQuestion();
  }

  const current = () => order[qi];
  const nextEmptySlot = () => slots.findIndex((s) => s === null);

  // 點擊 fallback：點詞組卡 → 填入下一個空格
  function place(card) {
    if (lit || done) return;
    const empty = nextEmptySlot();
    if (empty === -1) return;
    slots[empty] = card;
    slots = [...slots];
    pool = pool.filter((c) => c !== card);
    checkSolved();
  }

  // 點已填的空格 → 退回 pool（改正）
  function unplace(i) {
    if (lit || done || slots[i] === null) return;
    pool = [...pool, slots[i]];
    slots[i] = null;
    slots = [...slots];
  }

  function checkSolved() {
    if (slots.some((s) => s === null)) return;
    const correct = slots.every((s, i) => s.w === current().words[i]);
    if (correct) {
      lit = true;
      setTimeout(() => {
        solvedCount = Math.min(GOAL, solvedCount + 1);
        if (solvedCount >= GOAL) finish();
        else { qi++; loadQuestion(); }
      }, 1100);
    } else {
      // 排錯：全部退回 pool 重排（不罰）
      setTimeout(() => { pool = shuffle([...pool, ...slots.filter(Boolean)]); slots = slots.map(() => null); }, 450);
    }
  }

  // ── 拖曳（pointer，桌機+手機統一）──
  let slotEls = [];
  function onCardDown(e, card) {
    if (lit || done) return;
    e.preventDefault();
    dragging = { card, x: e.clientX, y: e.clientY };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }
  function onMove(e) { if (dragging) dragging = { ...dragging, x: e.clientX, y: e.clientY }; }
  function onUp(e) {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    if (!dragging) return;
    // 落點命中哪個空格？
    let hit = -1;
    slotEls.forEach((el, i) => {
      if (!el || slots[i] !== null) return;
      const r = el.getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) hit = i;
    });
    const card = dragging.card;
    dragging = null;
    if (hit !== -1) { slots[hit] = card; slots = [...slots]; pool = pool.filter((c) => c !== card); checkSolved(); }
    else place(card);   // 沒命中空格 = 當點擊填下一格（fallback，拖了等於選了）
  }

  let finishTimer = 0;
  function finish() { done = true; finishTimer = setTimeout(() => onComplete(GOAL), 1000); }

  onDestroy(() => {
    clearTimeout(finishTimer);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    if (import.meta.env?.DEV) delete window.__poem;
  });

  start();

  // dev-only：暴露當前正解與 place，供自動化測試拼句（production tree-shake）
  $effect(() => {
    if (!import.meta.env?.DEV) return;
    window.__poem = {
      state: () => ({ solvedCount, done, answer: current()?.words ?? [], slots: slots.map((s) => s?.w ?? null) }),
      placeWord: (w) => { const c = pool.find((c) => c.w === w); if (c) place(c); },
    };
  });
</script>

<div class="poem-game">
  <div class="head" aria-hidden="true">
    <span class="counter">第 {solvedCount + (done ? 0 : 1)}/{GOAL} 句</span>
  </div>

  <!-- 上方：句子空格 -->
  <div class="line" class:lit aria-hidden="true">
    {#each slots as s, i}
      <button class="slot" class:filled={s} bind:this={slotEls[i]} onclick={() => unplace(i)}>
        {s ? s.w : ''}
      </button>
    {/each}
  </div>

  {#if lit}
    <div class="src bounce-in" aria-hidden="true">{current().src}<small>{current().gloss}</small></div>
  {:else}
    <div class="src-hint" aria-hidden="true">把詞語排成一句詩</div>
  {/if}

  <!-- 下方：詞組卡 -->
  <div class="pool" aria-hidden="true">
    {#each pool as c (c.key)}
      <button class="word" onpointerdown={(e) => onCardDown(e, c)} onclick={() => place(c)}>{c.w}</button>
    {/each}
  </div>

  {#if dragging}
    <div class="drag-ghost" style="left:{dragging.x}px; top:{dragging.y}px" aria-hidden="true">{dragging.card.w}</div>
  {/if}

  <p class="sr-only">詩句拼句遊戲。把下方打散的詞語，依正確順序拖曳或點擊填進上方空格，排成一句端午或屈原的名句。排錯會退回重排，不會失敗，拼滿十句過關。</p>

  {#if done}
    <div class="overlay win">
      <div class="card pop-in panel">
        <div class="big">拼出 10 句詩！</div>
        <div class="sub">文思泉湧 — 過關</div>
      </div>
    </div>
  {/if}
</div>

<style>
  .poem-game {
    position: relative; width: 100%; height: 100%;
    border-radius: var(--radius, 24px); overflow: hidden;
    background: linear-gradient(160deg, #FFF7E8, #EFE6FF);
    display: flex; flex-direction: column; align-items: center;
    padding: 1.2rem 1rem; gap: 1rem; user-select: none;
  }
  .head { width: 100%; text-align: center; }
  .counter { font-weight: 800; color: #A78BFA; background: #fff; border-radius: 999px; padding: 0.2rem 0.9rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .line {
    display: flex; flex-wrap: wrap; gap: 8px; justify-content: center;
    min-height: 60px; align-items: center; margin-top: 1rem;
    padding: 0.6rem; border-radius: 16px; transition: box-shadow 0.3s;
  }
  .line.lit { box-shadow: 0 0 0 3px #FFC93C, 0 0 24px #FFD84A; }
  .slot {
    min-width: 64px; min-height: 52px; padding: 0.4rem 0.7rem;
    border-radius: 12px; background: rgba(255,255,255,0.55);
    box-shadow: inset 0 0 0 2.5px #d8cce8;
    font-family: var(--font-kai, serif); font-size: 1.5rem; font-weight: 700; color: var(--ink, #3D2C29);
  }
  .slot.filled { background: #fff; box-shadow: inset 0 0 0 2.5px #A78BFA, var(--shadow-card, 0 8px 24px rgba(0,0,0,0.12)); }
  .src { text-align: center; color: #A78BFA; font-weight: 800; }
  .src small { display: block; color: var(--ink-soft, #8a7a72); font-weight: 600; margin-top: 4px; font-size: 0.85rem; }
  .src-hint { color: var(--ink-soft, #8a7a72); }
  .pool { margin-top: auto; display: flex; flex-wrap: wrap; gap: 0.6rem; justify-content: center; padding-bottom: 0.5rem; }
  .word {
    padding: 0.6rem 1rem; border-radius: 14px; background: #fff;
    box-shadow: 0 5px 0 #c9b8e8, var(--shadow-card, 0 8px 24px rgba(0,0,0,0.12));
    font-family: var(--font-kai, serif); font-size: 1.4rem; font-weight: 700; color: var(--ink, #3D2C29);
    transition: transform 0.1s, box-shadow 0.1s; touch-action: none;
  }
  .word:active { transform: translateY(3px); box-shadow: 0 2px 0 #c9b8e8; }
  .drag-ghost {
    position: fixed; transform: translate(-50%, -50%); pointer-events: none; z-index: 10;
    padding: 0.6rem 1rem; border-radius: 14px; background: #fff;
    font-family: var(--font-kai, serif); font-size: 1.4rem; font-weight: 700; color: #A78BFA;
    box-shadow: var(--shadow-pop, 0 12px 32px rgba(0,0,0,0.18)); opacity: 0.95;
  }
  .overlay { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(167,139,250,0.5); backdrop-filter: blur(2px); }
  .panel { text-align: center; padding: 1.4rem 1.8rem; background: var(--card, #fff); }
  .big { font-family: var(--font-kai, serif); font-size: 1.5rem; font-weight: 800; color: var(--ink, #3D2C29); }
  .sub { color: var(--ink-soft, #8a7a72); margin: 0.4rem 0 0; }
  .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
</style>
