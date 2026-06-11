<script>
  import { MODES } from '../../modes.js';
  import { storage } from '../../core/storage.js';
  import { dailySeed } from '../../core/rng.js';

  let { onPlay, onLevels, onBoard, challenge = null, onAcceptChallenge, onDeclineChallenge } = $props();

  let name = $state(storage.getPlayerName());
  let editingName = $state(!storage.getPlayerName());

  let streak = $derived(storage.getDailyStreak());
  let dailyDone = $derived(!!storage.getDailyRecord(dailySeed()));
  let sprintBest = $derived(storage.getSprintBest());
  let levelStars = $derived(storage.getLevelStars());
  let totalStars = $derived(Object.values(levelStars).reduce((a, b) => a + b, 0));

  function saveName() {
    name = name.trim().slice(0, 12);
    if (!name) name = '無名氏' + Math.floor(Math.random() * 100);
    storage.setPlayerName(name);
    editingName = false;
  }

  function pick(modeKey) {
    if (!storage.getPlayerName()) saveName();
    if (modeKey === 'levels') onLevels();
    else onPlay(modeKey);
  }
</script>

<div class="screen">
  <header class="hero bounce-in">
    <h1 class="logo">
      <span class="logo-zy">ㄅㄆㄇ</span>
      <span class="logo-txt">你會唸嗎？</span>
    </h1>
    <p class="tagline">生難字注音對決 — 唸錯的人請喝飲料</p>
  </header>

  {#if challenge}
    <div class="card challenge pop-in">
      <div class="challenge-emoji">⚔️</div>
      <p><b>{challenge.name || '神祕對手'}</b> 向你下戰帖！</p>
      <p class="challenge-score">對方拿了 <b>{challenge.score}</b> 分</p>
      <div class="challenge-actions">
        <button class="btn" onclick={onAcceptChallenge}>應戰！</button>
        <button class="btn ghost" onclick={onDeclineChallenge}>先溜了</button>
      </div>
    </div>
  {/if}

  <div class="card name-row bounce-in" style:animation-delay="0.05s">
    {#if editingName}
      <input
        type="text"
        bind:value={name}
        maxlength="12"
        placeholder="輸入你的稱號…"
        onkeydown={(e) => e.key === 'Enter' && saveName()}
      />
      <button class="btn mint" onclick={saveName}>OK</button>
    {:else}
      <span class="hello">嗨，<b>{name}</b></span>
      <button class="edit" onclick={() => (editingName = true)} aria-label="修改名字">✏️</button>
    {/if}
  </div>

  <nav class="modes">
    <button class="card mode bounce-in" style:animation-delay="0.1s" onclick={() => pick('daily')}>
      <span class="mode-icon">{MODES.daily.icon}</span>
      <span class="mode-body">
        <b>{MODES.daily.name}</b>
        <small>{MODES.daily.blurb}</small>
      </span>
      <span class="mode-badge">
        {#if dailyDone}✅ 完成{:else if streak.count > 0}🔥 {streak.count} 天{:else}NEW{/if}
      </span>
    </button>

    <button class="card mode bounce-in" style:animation-delay="0.15s" onclick={() => pick('sprint')}>
      <span class="mode-icon">{MODES.sprint.icon}</span>
      <span class="mode-body">
        <b>{MODES.sprint.name}</b>
        <small>{MODES.sprint.blurb}</small>
      </span>
      {#if sprintBest > 0}<span class="mode-badge">🏆 {sprintBest}</span>{/if}
    </button>

    <button class="card mode bounce-in" style:animation-delay="0.2s" onclick={() => pick('levels')}>
      <span class="mode-icon">{MODES.levels.icon}</span>
      <span class="mode-body">
        <b>{MODES.levels.name}</b>
        <small>{MODES.levels.blurb}</small>
      </span>
      {#if totalStars > 0}<span class="mode-badge">⭐ {totalStars}</span>{/if}
    </button>

    <button class="card mode bounce-in" style:animation-delay="0.25s" onclick={() => pick('duel')}>
      <span class="mode-icon">{MODES.duel.icon}</span>
      <span class="mode-body">
        <b>{MODES.duel.name}</b>
        <small>{MODES.duel.blurb}</small>
      </span>
      <span class="mode-badge hot">🔗 開房</span>
    </button>
  </nav>

  <button class="btn ghost board-btn bounce-in" style:animation-delay="0.3s" onclick={onBoard}>
    🏅 排行榜
  </button>
</div>

<style>
  .hero { text-align: center; margin: 1.5rem 0 1rem; }
  .logo { margin: 0; line-height: 1.1; }
  .logo-zy {
    display: block;
    font-family: var(--font-kai);
    font-size: 4.2rem;
    letter-spacing: 0.08em;
    background: linear-gradient(120deg, var(--berry), var(--sun), var(--mint));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: wiggle 3.5s ease-in-out infinite;
  }
  .logo-txt {
    display: block;
    font-family: var(--font-kai);
    font-size: 2rem;
    color: var(--ink);
    margin-top: 0.2rem;
  }
  .tagline { color: var(--ink-soft); font-size: 0.95rem; margin: 0.6rem 0 0; }

  .challenge {
    text-align: center;
    padding: 1.2rem;
    margin-bottom: 1rem;
    border: 3px dashed var(--berry);
  }
  .challenge p { margin: 0.25rem 0; }
  .challenge-emoji { font-size: 2.2rem; }
  .challenge-score { color: var(--ink-soft); }
  .challenge-actions { display: flex; gap: 0.75rem; justify-content: center; margin-top: 0.8rem; }

  .name-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.1rem;
    margin-bottom: 1.1rem;
  }
  .name-row input {
    flex: 1;
    min-width: 0;
    border: 2.5px solid #eadfd3;
    border-radius: 14px;
    padding: 0.6rem 0.9rem;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
  }
  .name-row input:focus { border-color: var(--mint); }
  .hello { flex: 1; font-size: 1.05rem; }
  .edit { background: none; font-size: 1.1rem; }

  .modes { display: flex; flex-direction: column; gap: 0.8rem; }
  .mode {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1rem 1.1rem;
    text-align: left;
    font-size: 1rem;
    transition: transform 0.15s ease, box-shadow 0.15s;
  }
  .mode:hover { transform: translateY(-3px) scale(1.01); box-shadow: var(--shadow-pop); }
  .mode:active { transform: translateY(0) scale(0.99); }
  .mode-icon { font-size: 2rem; }
  .mode-body { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
  .mode-body b { font-size: 1.12rem; }
  .mode-body small { color: var(--ink-soft); }
  .mode-badge {
    font-size: 0.8rem;
    font-weight: 800;
    background: var(--paper);
    border-radius: 999px;
    padding: 0.3rem 0.7rem;
    color: var(--ink-soft);
    white-space: nowrap;
  }
  .mode-badge.hot { background: var(--berry); color: #fff; }

  .board-btn { margin-top: 1.2rem; align-self: center; }
</style>
