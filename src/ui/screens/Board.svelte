<script>
  import { storage } from '../../core/storage.js';
  import { hasCloud, fetchBoard } from '../../lib/backend.js';
  import { MODES } from '../../modes.js';

  let { onHome, initialTab = 'sprint' } = $props();

  let tab = $state(initialTab);
  let cloudRows = $state(null);
  let loading = $state(false);

  let localRows = $derived(
    storage.getLocalBoard().filter((r) => r.mode === tab).slice(0, 20)
  );

  $effect(() => {
    if (!hasCloud) return;
    loading = true;
    fetchBoard(tab).then((rows) => {
      cloudRows = rows;
      loading = false;
    });
  });

  let rows = $derived(cloudRows ?? localRows);
  const myName = storage.getPlayerName();
  const MEDALS = ['🥇', '🥈', '🥉'];
</script>

<div class="screen">
  <header class="top">
    <button class="back" onclick={onHome} aria-label="返回">←</button>
    <h2>🏅 排行榜</h2>
    <span class="scope">{hasCloud ? '🌐 全球' : '📱 本機'}</span>
  </header>

  <div class="tabs">
    {#each Object.values(MODES) as m}
      <button class="tab" class:on={tab === m.key} onclick={() => (tab = m.key)}>
        {m.icon} {m.name}
      </button>
    {/each}
  </div>

  {#if loading}
    <p class="empty">載入中…</p>
  {:else if rows.length === 0}
    <p class="empty">還沒有人上榜，現在去玩就是第一名 😎</p>
  {:else}
    <ol class="list">
      {#each rows as r, i}
        <li class="card row pop-in" class:me={r.name === myName} style:animation-delay="{i * 0.03}s">
          <span class="rank">{MEDALS[i] ?? i + 1}</span>
          <span class="name">{r.name}</span>
          {#if (r.maxCombo ?? r.max_combo) > 0}
            <span class="combo" title="最高連擊">🔥×{r.maxCombo ?? r.max_combo}</span>
          {/if}
          <span class="pts">{r.score}</span>
        </li>
      {/each}
    </ol>
  {/if}

  {#if !hasCloud}
    <p class="note">目前是這台裝置的排行榜，想跟朋友比就傳戰帖吧 ⚔️</p>
  {/if}
</div>

<style>
  .top { display: flex; align-items: center; gap: 0.8rem; }
  .top h2 { font-family: var(--font-kai); margin: 0; flex: 1; }
  .scope { font-size: 0.85rem; color: var(--ink-soft); font-weight: 700; }
  .back {
    background: #fff; width: 38px; height: 38px; border-radius: 50%;
    font-size: 1.1rem; color: var(--ink-soft); box-shadow: var(--shadow-card);
  }

  .tabs { display: flex; gap: 0.4rem; margin: 1rem 0; flex-wrap: wrap; }
  .tab {
    background: #fff;
    border-radius: 999px;
    padding: 0.45rem 0.9rem;
    font-weight: 700;
    color: var(--ink-soft);
    font-size: 0.85rem;
    box-shadow: var(--shadow-card);
  }
  .tab.on { background: var(--ink); color: #fff; }

  .list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; }
  .row {
    display: flex; align-items: center; gap: 0.7rem;
    padding: 0.7rem 1rem;
  }
  .row.me { box-shadow: 0 0 0 3px var(--mint), var(--shadow-card); }
  .rank { width: 2rem; text-align: center; font-weight: 900; }
  .name { flex: 1; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .combo { color: var(--berry-deep); font-weight: 800; font-size: 0.85rem; }
  .pts { font-weight: 900; color: var(--sun); font-size: 1.1rem; }

  .empty, .note { text-align: center; color: var(--ink-soft); margin-top: 2rem; }
  .note { font-size: 0.82rem; margin-top: 1.5rem; }
</style>
