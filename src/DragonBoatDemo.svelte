<script>
  /** DragonBoat 獨立 demo —— 不碰 App/storage/modes/bank，純測手感。 */
  import DragonBoat from './ui/components/DragonBoat.svelte';

  let lastResult = $state(null);
  let runId = $state(0);   // key 換新 → 重建元件重玩

  function done(n) {
    lastResult = n;
  }
  function replay() {
    lastResult = null;
    runId++;
  }
</script>

<div class="demo">
  <header>
    <h1>龍舟撿粽子 — DragonBoat demo</h1>
    <p>左右鍵 / 點左右半屏切道 · 空白鍵 / 點中間跳躍 · 採滿 10 顆過關</p>
  </header>

  <div class="stage">
    {#key runId}
      <DragonBoat onComplete={done} />
    {/key}
  </div>

  <footer>
    <div class="result">
      onComplete 回傳：<strong>{lastResult === null ? '— 進行中' : lastResult}</strong>
    </div>
    <button class="btn" onclick={replay}>重玩</button>
  </footer>
</div>

<style>
  .demo {
    max-width: 440px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    min-height: 100dvh;
  }
  header h1 { font-family: var(--font-kai, serif); font-size: 1.3rem; margin: 0 0 0.2rem; }
  header p { color: var(--ink-soft, #8a7a72); font-size: 0.85rem; margin: 0; }
  .stage {
    width: 100%;
    aspect-ratio: 3 / 4;
    max-height: 70vh;
  }
  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .result { color: var(--ink, #3D2C29); font-size: 0.95rem; }
  .result strong { color: var(--mint-deep, #2BB3A9); }
</style>
