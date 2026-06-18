<script>
  /** 四個新 mini-game 統一 demo —— 下拉切換，不碰 App/storage/modes/bank。純測手感。 */
  import PaddleRace from './ui/components/minigames/PaddleRace.svelte';
  import WrapZongzi from './ui/components/minigames/WrapZongzi.svelte';
  import PoemPuzzle from './ui/components/minigames/PoemPuzzle.svelte';
  import Piranha from './ui/components/minigames/Piranha.svelte';

  const GAMES = {
    paddle: { label: 'L2 加速龍舟競渡', comp: PaddleRace, hint: '快速點擊/空白鍵划槳，搶第一到終點' },
    wrap:   { label: 'L3 包粽子節奏',   comp: WrapZongzi, hint: '依序點 粽葉→糯米→綁繩，包滿 10 顆' },
    poem:   { label: 'L4 詩句拼句',     comp: PoemPuzzle, hint: '拖曳/點詞語排成詩句，拼滿 10 句' },
    piranha:{ label: 'L5 食人魚救屈原', comp: Piranha,    hint: '按住拖動炮船走位，自動發炮護屈原' },
  };

  let key = $state('paddle');
  let lastResult = $state(null);
  let runId = $state(0);

  function pick(k) { key = k; lastResult = null; runId++; }
  function done(n) { lastResult = n; }
  function replay() { lastResult = null; runId++; }

  const Current = $derived(GAMES[key].comp);
</script>

<div class="demo">
  <header>
    <h1>端午 mini-game demo</h1>
    <div class="tabs">
      {#each Object.entries(GAMES) as [k, g]}
        <button class="tab" class:on={key === k} onclick={() => pick(k)}>{g.label}</button>
      {/each}
    </div>
    <p class="hint">{GAMES[key].hint}</p>
  </header>

  <div class="stage">
    {#key runId}
      <Current onComplete={done} />
    {/key}
  </div>

  <footer>
    <div class="result">onComplete：<strong>{lastResult === null ? '— 進行中' : lastResult}</strong></div>
    <button class="btn" onclick={replay}>重玩</button>
  </footer>
</div>

<style>
  .demo { max-width: 440px; margin: 0 auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.7rem; min-height: 100dvh; }
  header h1 { font-family: var(--font-kai, serif); font-size: 1.2rem; margin: 0; }
  .tabs { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 0.5rem 0; }
  .tab { padding: 0.35rem 0.7rem; border-radius: 999px; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1); font-weight: 700; font-size: 0.85rem; color: var(--ink-soft, #8a7a72); }
  .tab.on { background: var(--berry, #FF6B6B); color: #fff; }
  .hint { color: var(--ink-soft, #8a7a72); font-size: 0.82rem; margin: 0; }
  .stage { width: 100%; aspect-ratio: 3 / 4; max-height: 66vh; }
  footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .result strong { color: var(--mint-deep, #2BB3A9); }
</style>
