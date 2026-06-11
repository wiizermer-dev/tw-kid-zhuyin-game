<script>
  /** 即時對戰排行榜 — Play 用 compact、Result 用 final
   * progress: { [id]: { id, name, index, total, attempted, correct, score, finished, elapsedSec } }
   */
  let { progress = {}, myId, variant = 'play' } = $props();

  let rows = $derived.by(() =>
    Object.values(progress).sort((a, b) =>
      (Number(b.finished || 0) - Number(a.finished || 0)) ||
      (b.score - a.score) ||
      ((b.attempted || 0) - (a.attempted || 0)) ||
      ((a.elapsedSec ?? 1e9) - (b.elapsedSec ?? 1e9))
    )
  );
  let myRank = $derived(rows.findIndex((r) => r.id === myId) + 1);
  const MEDAL = ['🥇', '🥈', '🥉'];
</script>

{#if rows.length > 0}
  <div class="lb" class:final={variant === 'result'}>
    {#if variant === 'play'}
      <div class="lb-head">
        <span>即時戰況</span>
        {#if myRank > 0}<span class="myrank">你目前第 {myRank} 名 / {rows.length} 人</span>{/if}
      </div>
    {:else}
      <div class="lb-head"><span>最終排名</span><span class="myrank">{rows.length} 人對戰</span></div>
    {/if}

    <ol>
      {#each rows as r, i (r.id)}
        <li class:me={r.id === myId} class:done={r.finished}>
          <span class="rk">{variant === 'result' ? (MEDAL[i] ?? i + 1) : i + 1}</span>
          <span class="nm">{r.name}{r.id === myId ? '（你）' : ''}</span>
          <span class="info">
            {#if r.finished}
              {r.correct}/{r.total} 對{#if r.elapsedSec != null} ・{r.elapsedSec}s{/if}
            {:else}
              第 {r.index ?? 0}/{r.total ?? '?'} 題{#if (r.attempted ?? 0) - (r.correct ?? 0) > 0} ・錯 {r.attempted - r.correct}{/if}
            {/if}
          </span>
          <span class="sc">{r.score ?? 0}</span>
        </li>
      {/each}
    </ol>
  </div>
{/if}

<style>
  .lb {
    background: #fff;
    border-radius: var(--radius);
    box-shadow: var(--shadow-card);
    padding: 0.7rem 0.9rem;
  }
  .lb.final { width: 100%; padding: 0.9rem 1.1rem; }
  .lb-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-weight: 800;
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
  .myrank { color: var(--berry-deep); font-size: 0.8rem; }
  .lb.final .lb-head { font-size: 1rem; }

  ol { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    padding: 0.3rem 0.4rem;
    border-radius: 10px;
    transition: background 0.3s;
  }
  li.me { background: color-mix(in srgb, var(--mint) 16%, white); font-weight: 800; }
  li.done .info { color: var(--leaf); font-weight: 700; }
  .lb.final li { font-size: 0.95rem; padding: 0.45rem 0.5rem; }

  .rk { width: 1.7rem; text-align: center; font-weight: 900; color: var(--ink-soft); flex-shrink: 0; }
  .nm { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .info { color: var(--ink-soft); font-size: 0.78rem; white-space: nowrap; }
  .sc { font-weight: 900; color: var(--sun); min-width: 2.5rem; text-align: right; }
</style>
