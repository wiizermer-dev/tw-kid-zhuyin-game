<script>
  import { LEVELS } from '../../modes.js';
  import { storage } from '../../core/storage.js';

  let { onPick, onHome } = $props();

  let stars = $derived(storage.getLevelStars());
  let shakeN = $state(0);
  let toastMsg = $state('');
  let toastTimer = null;

  function unlocked(level) {
    if (level.n === 1) return true;
    return (stars[level.n - 1] ?? 0) >= 1;
  }

  function tryPick(level) {
    if (unlocked(level)) return onPick(level);
    shakeN = level.n;
    toastMsg = `先在第 ${level.n - 1} 關拿到 1 顆星！`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { shakeN = 0; toastMsg = ''; }, 1600);
  }
</script>

<div class="screen">
  <header class="top">
    <button class="back" onclick={onHome} aria-label="返回">←</button>
    <h2>闖關冒險</h2>
  </header>
  <p class="hint">每關拿 1 星以上解鎖下一關，BOSS 關有血條跟限時！</p>

  {#if toastMsg}<div class="toast pop-in">{toastMsg}</div>{/if}

  <div class="path">
    {#each LEVELS as level, i}
      {@const isUnlocked = unlocked(level)}
      {@const s = stars[level.n] ?? 0}
      <button
        class="card level bounce-in"
        class:boss={level.boss}
        class:locked={!isUnlocked}
        class:shake={shakeN === level.n}
        style:animation-delay="{i * 0.05}s"
        onclick={() => tryPick(level)}
      >
        <span class="ln">{level.boss ? '👹' : level.n}</span>
        <span class="body">
          <b>{level.name}</b>
          <small>
            {#if !isUnlocked}🔒 未解鎖
            {:else if level.boss}BOSS 戰・{level.count} 題・限時作答
            {:else}{level.count} 題・難度 {'●'.repeat(level.max)}{'○'.repeat(5 - level.max)}
            {/if}
          </small>
        </span>
        <span class="stars">
          {#each Array(3) as _, j}<i class:on={j < s}>★</i>{/each}
        </span>
      </button>
    {/each}
  </div>
</div>

<style>
  .top { display: flex; align-items: center; gap: 0.8rem; }
  .top h2 { font-family: var(--font-kai); margin: 0; }
  .back {
    background: #fff; width: 38px; height: 38px; border-radius: 50%;
    font-size: 1.1rem; color: var(--ink-soft); box-shadow: var(--shadow-card);
  }
  .hint { color: var(--ink-soft); font-size: 0.9rem; margin: 0.6rem 0 1rem; }

  .path { display: flex; flex-direction: column; gap: 0.7rem; }
  .level {
    display: flex; align-items: center; gap: 0.9rem;
    padding: 0.9rem 1rem; text-align: left;
    transition: transform 0.15s ease;
  }
  .level:hover:not(.locked) { transform: translateY(-2px); }
  .level.boss { border: 3px solid var(--berry); }
  .level.locked { opacity: 0.55; cursor: not-allowed; }
  .toast {
    position: fixed;
    top: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 60;
    background: var(--ink);
    color: #fff;
    font-weight: 700;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    box-shadow: var(--shadow-pop);
    white-space: nowrap;
  }
  .ln {
    width: 44px; height: 44px; flex-shrink: 0;
    display: grid; place-items: center;
    background: var(--paper); border-radius: 50%;
    font-weight: 900; font-size: 1.15rem;
  }
  .boss .ln { background: #fdecec; }
  .body { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }
  .body small { color: var(--ink-soft); }
  .stars { display: flex; gap: 0.1rem; font-style: normal; }
  .stars i { color: #e3d7ca; font-style: normal; }
  .stars i.on { color: var(--sun); }
</style>
