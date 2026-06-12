<script>
  /** 審題員模式：逐題照常作答 → 看正解 → 給審查結論，結論即時上傳雲端 + 本地留底。
   * 共用 QuizSession（無計時、不計榜、不進錯題本），已審過的題自動跳過、可隨時續審。 */
  import { onMount, onDestroy } from 'svelte';
  import { QuizSession } from '../../core/session.svelte.js';
  import { BANK, CATEGORIES } from '../../data/bank/index.js';
  import ZhuyinCol from '../components/ZhuyinCol.svelte';
  import { storage } from '../../core/storage.js';
  import { submitQuestionReview, hasCloud } from '../../lib/backend.js';
  import { REVIEW_VERDICTS, DIFFICULTY_GUIDE } from '../../lib/review.js';

  let { onHome } = $props();

  let stage = $state('setup');           // setup | play | done
  let category = $state('all');
  let difficulty = $state(0);            // 0 = 全部難度
  let reviews = $state(storage.getReviews());
  let sessionCounts = $state({});        // 本輪各結論數（done 摘要用）

  const session = new QuizSession();
  const reviewerName = storage.getPlayerName() || '審題員';

  let pool = $derived(BANK.filter((q) =>
    (category === 'all' || q.category === category) &&
    (difficulty === 0 || q.difficulty === difficulty)
  ));
  let pendingIds = $derived(pool.filter((q) => !reviews[q.id]).map((q) => q.id));
  let reviewedTotal = $derived(Object.keys(reviews).length);
  let unsyncedCount = $derived(Object.values(reviews).filter((r) => !r.synced).length);

  // 上次雲端沒送成功的結論，進畫面時補送一次
  onMount(() => {
    if (hasCloud) flushUnsynced();
  });

  async function flushUnsynced() {
    const byId = new Map(BANK.map((q) => [q.id, q]));
    for (const [id, rec] of Object.entries(storage.getReviews())) {
      if (rec.synced || !byId.has(id)) continue;
      const ok = await submitQuestionReview({
        question: byId.get(id), verdict: rec.verdict, note: rec.note ?? '', name: reviewerName
      });
      if (ok) markSynced(id);
    }
  }

  function markSynced(id) {
    const next = { ...storage.getReviews() };
    if (!next[id]) return;
    next[id] = { ...next[id], synced: true };
    storage.setReviews(next);
    reviews = next;
  }

  function begin() {
    if (!pendingIds.length) return;
    session.start({ count: pendingIds.length, onlyIds: pendingIds, seed: `review-${Date.now()}` });
    sessionCounts = {};
    notingVerdict = null;
    stage = 'play';
  }

  // 「題目設計不佳」要附文字說明：先開輸入框，送出時才真正記結論
  let notingVerdict = $state(null);   // 等待補充說明的 verdict key（null = 沒在輸入）
  let noteText = $state('');

  function pickVerdict(key) {
    if (REVIEW_VERDICTS[key].needsNote) {
      notingVerdict = key;
      noteText = '';
      return;
    }
    commitVerdict(key, '');
  }

  function commitVerdict(key, note) {
    const q = session.current;
    if (!q || session.answered === null) return;
    notingVerdict = null;

    // 本地先留底（synced=false），雲端成功再翻旗 — 旗子只能在送達後立
    const rec = { verdict: key, at: Date.now(), synced: false, ...(note ? { note } : {}) };
    const next = { ...storage.getReviews(), [q.id]: rec };
    storage.setReviews(next);
    reviews = next;
    sessionCounts = { ...sessionCounts, [key]: (sessionCounts[key] ?? 0) + 1 };

    submitQuestionReview({ question: q, verdict: key, note, name: reviewerName })
      .then((ok) => { if (ok) markSynced(q.id); });

    session.next();
    if (session.finished) stage = 'done';
  }

  function resetAll() {
    if (!confirm(`要清掉本機 ${reviewedTotal} 筆審題紀錄、全部重審嗎？\n（雲端已收到的結論不會消失，重審會覆蓋成新結論）`)) return;
    storage.setReviews({});
    reviews = {};
  }

  function quit() {
    // 進度逐題即存，離開不丟資料
    session.end();
    stage = 'setup';
  }

  onDestroy(() => session.destroy());

  let q = $derived(session.current);
  let showFeedback = $derived(session.answered !== null);
  let lastCorrect = $derived(showFeedback && session.answered >= 0 && q?.options[session.answered]?.correct);
  let sessionReviewed = $derived(Object.values(sessionCounts).reduce((a, b) => a + b, 0));
</script>

<div class="screen review">
  {#if stage === 'setup'}
    <header class="head bounce-in">
      <h1>審題員模式</h1>
      <p class="sub">逐題玩過、給結論，結論即時回傳供題庫優化</p>
      {#if !hasCloud}
        <p class="offline">目前無雲端設定：結論只存在這台裝置，之後接上雲端會自動補送</p>
      {:else if unsyncedCount > 0}
        <p class="offline">有 {unsyncedCount} 筆結論還沒送達雲端，將自動補送</p>
      {/if}
    </header>

    <div class="card panel pop-in">
      <p class="panel-label">類別</p>
      <div class="chips">
        <button class="chip" class:on={category === 'all'} onclick={() => (category = 'all')}>全部</button>
        {#each Object.entries(CATEGORIES) as [key, cat]}
          <button class="chip" class:on={category === key} onclick={() => (category = key)}>{cat.label}</button>
        {/each}
      </div>

      <p class="panel-label">難度</p>
      <div class="chips">
        <button class="chip" class:on={difficulty === 0} onclick={() => (difficulty = 0)}>全部</button>
        {#each [1, 2, 3, 4, 5] as d}
          <button class="chip" class:on={difficulty === d} onclick={() => (difficulty = d)}>{d}</button>
        {/each}
      </div>

      <p class="pool-stat">
        此範圍 {pool.length} 題，待審 <b>{pendingIds.length}</b> 題
        {#if pool.length - pendingIds.length > 0}（已審 {pool.length - pendingIds.length}）{/if}
      </p>

      <button class="btn mint start" disabled={!pendingIds.length} onclick={begin}>
        {pendingIds.length ? '開始審題' : '此範圍都審完了'}
      </button>
    </div>

    <div class="card guide pop-in">
      <p class="panel-label">難度分級判準（判「難度低/高於等級」用）</p>
      {#each DIFFICULTY_GUIDE as g}
        <div class="guide-row">
          <span class="guide-badge">{g.level}</span>
          <div class="guide-body">
            <b>{g.name}</b> — {g.rule}
            <small>判準：{g.test}｜例：{g.examples}</small>
          </div>
        </div>
      {/each}
    </div>

    <div class="setup-foot">
      {#if reviewedTotal > 0}
        <button class="btn ghost" onclick={resetAll}>清除紀錄重審（{reviewedTotal}）</button>
      {/if}
      <button class="btn ghost" onclick={onHome}>回首頁</button>
    </div>

  {:else if stage === 'play' && q}
    <header class="hud">
      <button class="quit" onclick={quit} aria-label="結束審題">✕</button>
      <div class="progress-wrap">
        <div class="meter"><i style:width="{(session.index + 1) / session.total * 100}%"></i></div>
        <span class="progress-num">{session.index + 1}/{session.total}</span>
      </div>
    </header>

    {#key q.id}
      <main class="qarea">
        <div class="qmeta">
          <span class="tag">{CATEGORIES[q.category]?.label ?? q.category}</span>
          <span class="tag">難度 {q.difficulty}</span>
          <span class="tag id">{q.id}</span>
        </div>

        <div class="qcard card pop-in">
          <p class="qprompt">「<b class="qtarget">{q.target}</b>」怎麼唸？</p>
          <p class="qtext">
            {#each [...q.text] as ch}
              <span class:hl={ch === q.target}>{ch}</span>
            {/each}
          </p>
        </div>

        <div class="options" class:locked={showFeedback}>
          {#each q.options as opt, i}
            <button
              class="opt card"
              class:right={showFeedback && opt.correct}
              class:picked-wrong={showFeedback && session.answered === i && !opt.correct}
              aria-label="注音選項 {opt.zhuyin}"
              onclick={() => session.answer(i)}
            >
              <ZhuyinCol zhuyin={opt.zhuyin} size="1.7rem" />
            </button>
          {/each}
        </div>

        {#if showFeedback}
          <div class="feedback card bounce-in" class:good={lastCorrect}>
            <p class="fb-head">
              {#if lastCorrect}答對了，正解「{q.zhuyin}」{:else}答錯，正解是「{q.zhuyin}」{/if}
            </p>
            <p class="fb-meaning">{q.text}：{q.meaning}</p>
            <p class="fb-fun">{q.fun}</p>

            <p class="verdict-label">這題的審查結論？</p>
            {#if notingVerdict}
              <div class="note-box">
                <p class="note-label">{REVIEW_VERDICTS[notingVerdict].label} — 哪裡不佳？（選填）</p>
                <textarea
                  rows="3"
                  bind:value={noteText}
                  placeholder="例：誘答 ㄒㄧㄤˋ 在此情境也算對／句子不像人話…"
                ></textarea>
                <div class="note-actions">
                  <button class="btn mint" onclick={() => commitVerdict(notingVerdict, noteText.trim())}>送出結論</button>
                  <button class="btn ghost" onclick={() => (notingVerdict = null)}>返回</button>
                </div>
              </div>
            {:else}
              <div class="verdicts">
                {#each Object.values(REVIEW_VERDICTS) as v}
                  <button class="verdict {v.tone}" onclick={() => pickVerdict(v.key)}>
                    <b>{v.label}</b>
                    <small>{v.blurb}</small>
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        {/if}
      </main>
    {/key}

  {:else if stage === 'done'}
    <div class="card done pop-in">
      <h2>這輪審完，辛苦了</h2>
      <p class="done-sub">本輪共審 {sessionReviewed} 題</p>
      <ul class="done-list">
        {#each Object.values(REVIEW_VERDICTS) as v}
          {#if sessionCounts[v.key]}
            <li><span class="dot {v.tone}"></span>{v.label}<b>{sessionCounts[v.key]}</b></li>
          {/if}
        {/each}
      </ul>
      {#if unsyncedCount > 0}
        <p class="offline">{unsyncedCount} 筆還沒送達雲端，下次進審題模式會自動補送</p>
      {/if}
      <div class="done-actions">
        <button class="btn mint" onclick={() => (stage = 'setup')}>再審其他範圍</button>
        <button class="btn ghost" onclick={onHome}>回首頁</button>
      </div>
    </div>
  {/if}
</div>

<style>
  .review { padding-top: calc(env(safe-area-inset-top, 0px) + 0.9rem); }

  .head { text-align: center; margin: 0.4rem 0 1rem; }
  .head h1 { margin: 0; font-family: var(--font-kai); font-size: 1.8rem; }
  .sub { margin: 0.4rem 0 0; color: var(--ink-soft); font-size: 0.9rem; }
  .offline { margin: 0.5rem 0 0; color: var(--berry-deep); font-size: 0.8rem; font-weight: 700; }

  .panel { padding: 1.1rem 1.2rem; }
  .panel-label { margin: 0.6rem 0 0.4rem; font-size: 0.8rem; font-weight: 800; color: var(--ink-soft); }
  .panel-label:first-child { margin-top: 0; }
  .chips { display: flex; flex-wrap: wrap; gap: 0.45rem; }
  .chip {
    background: var(--paper);
    border-radius: 999px;
    padding: 0.4rem 0.85rem;
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--ink-soft);
  }
  .chip.on { background: var(--mint); color: #fff; }
  .pool-stat { margin: 0.9rem 0 0; font-size: 0.9rem; color: var(--ink-soft); }
  .pool-stat b { color: var(--ink); font-size: 1.05rem; }
  .start { margin-top: 0.9rem; width: 100%; }
  .start:disabled { opacity: 0.5; }
  .setup-foot { display: flex; gap: 0.7rem; justify-content: center; margin-top: 1.1rem; flex-wrap: wrap; }

  .guide { margin-top: 0.9rem; padding: 1rem 1.1rem; display: flex; flex-direction: column; gap: 0.55rem; }
  .guide-row { display: flex; gap: 0.6rem; align-items: flex-start; }
  .guide-badge {
    flex-shrink: 0;
    width: 24px; height: 24px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: var(--paper);
    font-size: 0.8rem;
    font-weight: 900;
    color: var(--ink-soft);
  }
  .guide-body { font-size: 0.85rem; line-height: 1.45; }
  .guide-body small { display: block; color: var(--ink-soft); font-size: 0.74rem; margin-top: 0.1rem; }

  .hud { display: flex; align-items: center; gap: 0.8rem; }
  .quit {
    background: #fff;
    width: 38px; height: 38px;
    border-radius: 50%;
    font-size: 1rem;
    color: var(--ink-soft);
    box-shadow: var(--shadow-card);
    flex-shrink: 0;
  }
  .progress-wrap { flex: 1; display: flex; align-items: center; gap: 0.5rem; }
  .progress-wrap .meter { flex: 1; }
  .progress-num { font-size: 0.85rem; font-weight: 800; color: var(--ink-soft); }

  .qarea { display: flex; flex-direction: column; flex: 1; margin-top: 0.9rem; padding-bottom: 4vh; }
  .qmeta { display: flex; gap: 0.4rem; margin-bottom: 0.6rem; }
  .tag {
    font-size: 0.74rem;
    font-weight: 800;
    background: #fff;
    border-radius: 999px;
    padding: 0.25rem 0.65rem;
    color: var(--ink-soft);
    box-shadow: var(--shadow-card);
  }
  .tag.id { font-family: monospace; }

  .qcard { padding: 1.2rem 1.2rem; text-align: center; }
  .qprompt { margin: 0 0 0.6rem; color: var(--ink-soft); font-size: 1rem; }
  .qtarget { color: var(--berry-deep); font-family: var(--font-kai); font-size: 1.4em; }
  .qtext {
    margin: 0;
    font-family: var(--font-kai);
    font-size: clamp(1.7rem, 8vw, 2.6rem);
    letter-spacing: 0.1em;
    line-height: 1.3;
  }
  .qtext .hl {
    color: var(--berry-deep);
    text-decoration: underline wavy var(--sun) 3px;
    text-underline-offset: 8px;
  }

  .options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    gap: 0.8rem;
    margin-top: 1rem;
  }
  .options.locked .opt { pointer-events: none; }
  .opt {
    padding: 1rem 0.5rem;
    display: flex;
    justify-content: center;
    min-height: 110px;
    align-items: center;
  }
  .opt.right { background: #e9fbf3; box-shadow: 0 0 0 3px var(--leaf), var(--shadow-card); }
  .opt.picked-wrong { background: #fdecec; box-shadow: 0 0 0 3px var(--berry), var(--shadow-card); }

  .feedback { margin-top: 1rem; padding: 1rem 1.1rem; border-left: 6px solid var(--berry); }
  .feedback.good { border-left-color: var(--leaf); }
  .fb-head { margin: 0; font-weight: 900; }
  .fb-meaning { margin: 0.4rem 0 0; color: var(--ink-soft); font-size: 0.9rem; }
  .fb-fun { margin: 0.3rem 0 0; color: var(--ink); font-size: 0.88rem; }

  .verdict-label { margin: 0.9rem 0 0.5rem; font-weight: 800; font-size: 0.9rem; }
  .verdicts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
  .verdict {
    background: var(--paper);
    border-radius: 14px;
    padding: 0.6rem 0.7rem;
    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    border: 2px solid transparent;
  }
  .verdict b { font-size: 0.92rem; }
  .verdict small { color: var(--ink-soft); font-size: 0.72rem; }
  .verdict.good { border-color: var(--leaf); }
  .verdict.warn { border-color: var(--sun); }
  .verdict.bad { border-color: var(--berry); }
  .verdict:active { transform: scale(0.97); }

  .note-box { display: flex; flex-direction: column; gap: 0.5rem; }
  .note-label { margin: 0; font-size: 0.85rem; font-weight: 800; }
  .note-box textarea {
    width: 100%;
    border: 2.5px solid #eadfd3;
    border-radius: 14px;
    padding: 0.6rem 0.8rem;
    font-size: 0.92rem;
    font-family: inherit;
    outline: none;
    resize: vertical;
  }
  .note-box textarea:focus { border-color: var(--mint); }
  .note-actions { display: flex; gap: 0.6rem; }

  .done { margin-top: 12vh; padding: 1.6rem 1.4rem; text-align: center; }
  .done h2 { margin: 0; font-family: var(--font-kai); }
  .done-sub { color: var(--ink-soft); margin: 0.5rem 0 0.8rem; }
  .done-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; }
  .done-list li { display: flex; align-items: center; gap: 0.5rem; justify-content: center; }
  .done-list b { margin-left: 0.3rem; }
  .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  .dot.good { background: var(--leaf); }
  .dot.warn { background: var(--sun); }
  .dot.bad { background: var(--berry); }
  .done-actions { display: flex; gap: 0.7rem; justify-content: center; margin-top: 1.2rem; }
</style>
