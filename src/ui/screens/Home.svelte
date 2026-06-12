<script>
  import { MODES } from '../../modes.js';
  import { storage } from '../../core/storage.js';
  import { dailySeed } from '../../core/rng.js';
  import ZhuyinGlyph from '../components/ZhuyinGlyph.svelte';

  let { onPlay, onLevels, onBoard, onReview, challenge = null, invalidChallenge = false, onAcceptChallenge, onDeclineChallenge } = $props();

  let name = $state(storage.getPlayerName());
  let editingName = $state(!storage.getPlayerName());

  let streak = $derived(storage.getDailyStreak());
  let dailyDone = $derived(!!storage.getDailyRecord(dailySeed()));
  let sprintBest = $derived(storage.getSprintBest());
  let levelStars = $derived(storage.getLevelStars());
  let totalStars = $derived(Object.values(levelStars).reduce((a, b) => a + b, 0));
  let mistakeCount = $derived(Object.keys(storage.getMistakes()).length);

  let nameShake = $state(false);

  // 審題員暗門：名字欄輸入通關密語 → 不存名字，直接進審題模式
  const REVIEW_PASSPHRASE = '我要審題';

  function saveName() {
    name = name.trim().slice(0, 12);
    if (name === REVIEW_PASSPHRASE) {
      name = storage.getPlayerName();   // 密語不留在輸入框
      editingName = !name;
      onReview();
      return false;
    }
    if (!name) return false;
    storage.setPlayerName(name);
    editingName = false;
    return true;
  }

  function requireName() {
    if (storage.getPlayerName() || saveName()) return true;
    // 名字會印在戰帖跟成績卡上，開玩前一定要取
    editingName = true;
    nameShake = true;
    setTimeout(() => (nameShake = false), 500);
    document.querySelector('.name-edit input')?.focus();
    return false;
  }

  function pick(modeKey) {
    if (!requireName()) return;
    if (modeKey === 'levels') onLevels();
    else onPlay(modeKey);
  }

  function accept() {
    if (!requireName()) return;
    onAcceptChallenge();
  }

  const TINT_COLOR = {
    sun: 'var(--sun)', berry: 'var(--berry)', mint: 'var(--mint-deep)', grape: 'var(--grape)'
  };
</script>

<div class="screen">
  <header class="hero bounce-in">
    <h1 class="logo">
      <span class="logo-zy">
        <i class="b">ㄅ</i><i class="p">ㄆ</i><i class="m">ㄇ</i>
      </span>
      <span class="logo-txt">你有ㄅ級分嗎？</span>
    </h1>
    <p class="tagline">生難字注音對決，唸錯的人請喝飲料</p>
  </header>

  {#if challenge}
    <div class="card challenge pop-in">
      {#if challenge.score === null}
        <p><b>{challenge.name || '神祕對手'}</b> 邀你進對戰房「{challenge.room}」！</p>
      {:else}
        <p><b>{challenge.name || '神祕對手'}</b> 向你下戰帖！</p>
        <p class="challenge-score">對方拿了 <b>{challenge.score}</b> 分</p>
      {/if}
      <div class="challenge-actions">
        <button class="btn" onclick={accept}>{challenge.score === null ? '進房！' : '應戰！'}</button>
        <button class="btn ghost" onclick={onDeclineChallenge}>先溜了</button>
      </div>
    </div>
  {:else if invalidChallenge}
    <p class="bad-link pop-in">這張戰帖怪怪的（可能被改過），已自動忽略</p>
  {/if}

  <div class="card name-row bounce-in" class:shake={nameShake} style:animation-delay="0.05s">
    {#if editingName}
      <div class="name-edit">
        <input
          type="text"
          bind:value={name}
          maxlength="12"
          placeholder="輸入你的稱號…"
          onkeydown={(e) => e.key === 'Enter' && saveName()}
        />
        <small class="name-hint" class:hot={nameShake}>名字會印在戰帖跟成績卡上，取個帥的再開玩</small>
      </div>
      <button class="btn mint" onclick={saveName}>OK</button>
    {:else}
      <span class="hello">嗨，<b>{name}</b></span>
      <button class="edit" onclick={() => (editingName = true)} aria-label="修改名字">改</button>
    {/if}
  </div>

  <nav class="modes">
    <p class="group-label friends">揪朋友一起</p>

    <button class="card mode duel bounce-in" style:animation-delay="0.08s" onclick={() => pick('duel')}>
      <span class="mode-icon" style:background="color-mix(in srgb, {TINT_COLOR.grape} 16%, white)">
        <ZhuyinGlyph char={MODES.duel.icon} size={26} color={TINT_COLOR.grape} />
      </span>
      <span class="mode-body">
        <b>{MODES.duel.name}</b>
        <small>{MODES.duel.blurb}</small>
      </span>
      <span class="mode-badge hot">2 人起</span>
    </button>

    <p class="group-label solo">一個人練</p>

    <button class="card mode bounce-in" style:animation-delay="0.12s" onclick={() => pick('daily')}>
      <span class="mode-icon" style:background="color-mix(in srgb, {TINT_COLOR.sun} 18%, white)">
        <ZhuyinGlyph char={MODES.daily.icon} size={26} color={TINT_COLOR.sun} />
      </span>
      <span class="mode-body">
        <b>{MODES.daily.name}</b>
        <small>{MODES.daily.blurb}</small>
      </span>
      <span class="mode-badge">
        {#if dailyDone}看今日成績{:else if streak.count > 0}連 {streak.count} 天{:else}NEW{/if}
      </span>
    </button>

    <button class="card mode bounce-in" style:animation-delay="0.15s" onclick={() => pick('sprint')}>
      <span class="mode-icon" style:background="color-mix(in srgb, {TINT_COLOR.berry} 14%, white)">
        <ZhuyinGlyph char={MODES.sprint.icon} size={26} color={TINT_COLOR.berry} />
      </span>
      <span class="mode-body">
        <b>{MODES.sprint.name}</b>
        <small>{MODES.sprint.blurb}</small>
      </span>
      {#if sprintBest > 0}<span class="mode-badge">最佳 {sprintBest}</span>{/if}
    </button>

    <button class="card mode bounce-in" style:animation-delay="0.2s" onclick={() => pick('levels')}>
      <span class="mode-icon" style:background="color-mix(in srgb, {TINT_COLOR.mint} 16%, white)">
        <ZhuyinGlyph char={MODES.levels.icon} size={26} color={TINT_COLOR.mint} />
      </span>
      <span class="mode-body">
        <b>{MODES.levels.name}</b>
        <small>{MODES.levels.blurb}</small>
      </span>
      {#if totalStars > 0}<span class="mode-badge">★ {totalStars}</span>{/if}
    </button>

    {#if mistakeCount >= 3}
      <button class="card mode bounce-in" style:animation-delay="0.24s" onclick={() => pick('practice')}>
        <span class="mode-icon" style:background="color-mix(in srgb, var(--ink-soft) 14%, white)">
          <ZhuyinGlyph char="ㄊ" size={26} color="var(--ink-soft)" />
        </span>
        <span class="mode-body">
          <b>錯題特訓</b>
          <small>你還有 {mistakeCount} 個字在等你復仇</small>
        </span>
      </button>
    {/if}

  </nav>

  <button class="btn ghost board-btn bounce-in" style:animation-delay="0.32s" onclick={onBoard}>
    排行榜
  </button>
</div>

<style>
  .hero { text-align: center; margin: 0.5rem 0 1rem; }
  .logo { margin: 0; line-height: 1.1; }
  .logo-zy {
    display: block;
    font-family: var(--font-kai);
    font-size: 4rem;
    letter-spacing: 0.06em;
  }
  .logo-zy i { font-style: normal; display: inline-block; }
  .logo-zy .b { color: var(--berry); transform: rotate(-4deg); }
  .logo-zy .p { color: var(--sun); transform: translateY(-3px); }
  .logo-zy .m { color: var(--mint-deep); transform: rotate(3deg); }
  .logo-txt {
    display: block;
    font-family: var(--font-kai);
    font-size: 1.9rem;
    color: var(--ink);
    margin-top: 0.15rem;
  }
  .tagline { color: var(--ink-soft); font-size: 0.92rem; margin: 0.5rem 0 0; }

  .challenge {
    text-align: center;
    padding: 1.2rem;
    margin-bottom: 1rem;
    border: 3px dashed var(--berry);
  }
  .challenge p { margin: 0.25rem 0; }
  .challenge-score { color: var(--ink-soft); }
  .challenge-actions { display: flex; gap: 0.75rem; justify-content: center; margin-top: 0.8rem; }
  .bad-link { text-align: center; color: var(--ink-soft); font-size: 0.88rem; margin: 0 0 0.8rem; }

  .name-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.1rem;
    margin-bottom: 1rem;
  }
  .name-edit { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.3rem; }
  .name-edit input {
    width: 100%;
    border: 2.5px solid #eadfd3;
    border-radius: 14px;
    padding: 0.6rem 0.9rem;
    font-size: 1rem;
    font-family: inherit;
    outline: none;
  }
  .name-edit input:focus { border-color: var(--mint); }
  .name-hint { color: var(--ink-soft); font-size: 0.72rem; padding-left: 0.2rem; }
  .name-hint.hot { color: var(--berry-deep); font-weight: 800; }
  .hello { flex: 1; font-size: 1.05rem; }
  .edit {
    background: var(--paper);
    border-radius: 999px;
    padding: 0.35rem 0.8rem;
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--ink-soft);
  }

  .modes { display: flex; flex-direction: column; gap: 0.7rem; }
  .group-label {
    margin: 0.3rem 0 0;
    font-size: 0.8rem;
    font-weight: 800;
    color: var(--ink-soft);
    padding-left: 0.3rem;
  }
  .group-label.solo { margin-top: 0.7rem; }
  .mode {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    padding: 0.95rem 1.1rem;
    text-align: left;
    font-size: 1rem;
    transition: transform 0.15s ease, box-shadow 0.15s;
  }
  .mode:hover { transform: translateY(-3px) scale(1.01); box-shadow: var(--shadow-pop); }
  .mode:active { transform: translateY(0) scale(0.99); }
  .mode.duel { border: 2.5px solid color-mix(in srgb, var(--grape) 45%, white); }
  .mode-icon {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 14px;
  }
  .mode-body { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
  .mode-body b { font-size: 1.1rem; }
  .mode-body small { color: var(--ink-soft); }
  .mode-badge {
    font-size: 0.78rem;
    font-weight: 800;
    background: var(--paper);
    border-radius: 999px;
    padding: 0.3rem 0.7rem;
    color: var(--ink-soft);
    white-space: nowrap;
  }
  .mode-badge.hot { background: var(--grape); color: #fff; }

  .board-btn { margin-top: 1.1rem; align-self: center; }
</style>
