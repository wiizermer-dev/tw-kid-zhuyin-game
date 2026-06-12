<script>
  import { storage } from '../../core/storage.js';
  import { hasCloud, fetchBoard, fetchWrongBoard } from '../../lib/backend.js';
  import { MODES } from '../../modes.js';
  import { BANK } from '../../core/bank.js';

  let { onHome, initialTab = 'sprint' } = $props();

  const QMAP = new Map(BANK.map((q) => [q.id, q]));

  let tab = $state(initialTab);
  let cloudRows = $state(null);
  let wrongRows = $state(null);   // 雲端常錯榜（tab==='wrong'）
  let loading = $state(false);

  let isWrongTab = $derived(tab === 'wrong');

  // 本機榜同樣一人一筆（按名字去重；榜已按分數排序，首見即最高分）
  let localRows = $derived.by(() => {
    const seen = new Set();
    return storage.getLocalBoard()
      .filter((r) => r.mode === tab)
      .filter((r) => (seen.has(r.name) ? false : (seen.add(r.name), true)))
      .slice(0, 20);
  });

  // 無雲端時的常錯題：用本機 mistakes（個人錯題本）排序
  let localWrong = $derived.by(() =>
    Object.entries(storage.getMistakes())
      .map(([id, missCount]) => {
        const q = QMAP.get(id);
        return q ? { question_id: id, word: q.text, correct_answer: q.zhuyin, missCount } : null;
      })
      .filter(Boolean)
      .sort((a, b) => b.missCount - a.missCount)
      .slice(0, 20)
  );

  // 分數榜：雲端 fetchBoard（非常錯 tab）
  $effect(() => {
    if (!hasCloud || isWrongTab) return;
    loading = true;
    fetchBoard(tab).then((rows) => {
      cloudRows = rows;
      loading = false;
    });
  });

  // 常錯榜：雲端 fetchWrongBoard
  $effect(() => {
    if (!hasCloud || !isWrongTab) return;
    loading = true;
    fetchWrongBoard().then((rows) => {
      wrongRows = rows;
      loading = false;
    });
  });

  let rows = $derived(cloudRows ?? localRows);
  let wrongList = $derived(isWrongTab ? (wrongRows ?? localWrong) : []);
  const myName = storage.getPlayerName();
  const MEDALS = ['🥇', '🥈', '🥉'];
</script>

<div class="screen">
  <header class="top">
    <button class="back" onclick={onHome} aria-label="返回">←</button>
    <h2>排行榜</h2>
    <span class="scope">{hasCloud ? '全球榜' : '本機榜'}</span>
  </header>

  <div class="tabs">
    {#each Object.values(MODES) as m}
      <button class="tab" class:on={tab === m.key} onclick={() => (tab = m.key)}>
        {m.name}
      </button>
    {/each}
    <button class="tab" class:on={isWrongTab} onclick={() => (tab = 'wrong')}>
      最常錯
    </button>
  </div>

  {#if isWrongTab}
    <p class="board-note">
      {hasCloud ? '全體玩家最常答錯的題目（依錯誤率，達一定作答數才上榜）' : '你最常答錯的題目（這台裝置的錯題本）'}
    </p>
    {#if loading}
      <p class="empty">載入中…</p>
    {:else if wrongList.length === 0}
      <p class="empty">{hasCloud ? '還沒有足夠的作答資料，多玩幾場就有了' : '錯題本是空的，你太強了'}</p>
    {:else}
      <ol class="list">
        {#each wrongList as w, i (w.question_id)}
          <li class="card row pop-in" style:animation-delay="{i * 0.03}s">
            <span class="rank">{i + 1}</span>
            <span class="wq">
              <b>{w.word}</b>
              <small>正解 {w.correct_answer}</small>
            </span>
            {#if hasCloud}
              <span class="wrate">錯 {Math.round((w.wrongRate ?? 0) * 100)}%</span>
              <span class="wcnt">{w.wrong_attempts}/{w.total_attempts}</span>
            {:else}
              <span class="wcnt">錯過 {w.missCount} 次</span>
            {/if}
          </li>
        {/each}
      </ol>
    {/if}
  {:else}
    {#if tab === 'levels'}
      <p class="board-note">闖關榜計「戰役累積分」：各關最佳成績加總，連擊跨關卡累計</p>
    {/if}

    {#if loading}
      <p class="empty">載入中…</p>
    {:else if rows.length === 0}
      <p class="empty">還沒有人上榜，現在去玩就是第一名</p>
    {:else}
      <ol class="list">
        {#each rows as r, i}
          <li class="card row pop-in" class:me={r.name === myName} style:animation-delay="{i * 0.03}s">
            <span class="rank">{MEDALS[i] ?? i + 1}</span>
            <span class="name">{r.name}</span>
            {#if (r.maxCombo ?? r.max_combo) > 0}
              <span class="combo" title="最高連擊">連擊 ×{r.maxCombo ?? r.max_combo}</span>
            {/if}
            <span class="pts">{r.score}</span>
          </li>
        {/each}
      </ol>
    {/if}
  {/if}

  {#if !hasCloud && !isWrongTab}
    <p class="note">目前是這台裝置的排行榜，想跟朋友比就開房對戰吧</p>
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

  /* 最常錯題 */
  .wq { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; overflow: hidden; }
  .wq b { font-family: var(--font-kai); font-size: 1.05rem; }
  .wq small { color: var(--berry-deep); font-weight: 700; font-size: 0.78rem; }
  .wrate { font-weight: 900; color: var(--berry-deep); font-size: 1rem; white-space: nowrap; }
  .wcnt { color: var(--ink-soft); font-size: 0.78rem; white-space: nowrap; min-width: 3.2rem; text-align: right; }

  .empty, .note { text-align: center; color: var(--ink-soft); margin-top: 2rem; }
  .note { font-size: 0.82rem; margin-top: 1.5rem; }
  .board-note { color: var(--ink-soft); font-size: 0.8rem; margin: -0.3rem 0 0.7rem; }
</style>
