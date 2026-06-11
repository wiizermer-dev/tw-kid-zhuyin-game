<script>
  import { onMount, onDestroy, untrack } from 'svelte';
  import { QuizSession } from '../../core/session.svelte.js';
  import ZhuyinCol from '../components/ZhuyinCol.svelte';
  import LiveBoard from '../components/LiveBoard.svelte';
  import { playCorrectSound, playWrongSound, playComboSound, playLevelUpSound } from '../../lib/audio.js';

  let { config: configProp, meta, onFinish, onQuit } = $props();

  // 掛載時固定設定（App 以 {#key} 重新掛載本元件）
  const config = untrack(() => ({ ...configProp }));

  const session = new QuizSession();
  session.start(config);

  const isSprint = !!config.timeLimit;
  const isBoss = (config.bossHp ?? 0) > 0;

  let wrongFlash = $state(false);
  let scorePop = $state(0); // 觸發 +分數 飛出動畫
  let showIntro = $state(!!meta.intro);

  // 衝刺模式答完自動快轉；其他模式等玩家看完回饋
  let autoTimer = null;
  let reported = false;
  const mountTime = performance.now();

  // 即時房：每答一題回報進度給同房對手
  function reportProgress(finished = false) {
    meta.onProgress?.({
      index: Math.min(session.index + 1, session.total),
      total: session.total,
      attempted: session.attempted,
      correct: session.correctCount,
      score: session.score,
      finished,
      elapsedSec: Math.round((performance.now() - mountTime) / 1000)
    });
  }

  function choose(i) {
    if (session.answered !== null || session.finished) return;
    const beforeScore = session.score;
    const correct = session.answer(i);
    if (correct) {
      session.combo >= 3 ? playComboSound() : playCorrectSound();
      scorePop = session.score - beforeScore;
      setTimeout(() => (scorePop = 0), 700);
    } else {
      playWrongSound();
      wrongFlash = true;
      setTimeout(() => (wrongFlash = false), 450);
    }

    reportProgress(false);

    if (session.finished) return done();

    if (isSprint) {
      // 答錯多停一下讓正解至少留個印象，完整解說在結果頁的錯題回顧
      autoTimer = setTimeout(advance, correct ? 650 : 2200);
    }
  }

  function advance() {
    clearTimeout(autoTimer);
    session.next();
    if (session.finished) done();
  }

  function done() {
    if (reported) return;
    reported = true;
    reportProgress(true);
    if (isBoss && session.won) playLevelUpSound();
    onFinish({
      score: session.score,
      correct: session.correctCount,
      total: session.attempted,
      maxCombo: session.maxCombo,
      results: [...session.results],
      questions: session.questions.slice(0, session.attempted),
      won: session.won,
      elapsedSec: Math.round((performance.now() - mountTime) / 1000)
    });
  }

  // 計時歸零（衝刺全域時間到）由 session 內部 end()，這裡監聽收尾
  $effect(() => {
    if (session.finished) done();
  });

  // 掛載即廣播一次，讓同房對手立刻在排行榜看到你（第 1 題、0 分）
  onMount(() => {
    if (!showIntro) reportProgress(false);
  });

  function quit() {
    if (!session.finished && session.attempted > 0) {
      if (!confirm('確定要離開嗎？這局進度不會保留喔')) return;
    }
    onQuit();
  }

  onDestroy(() => {
    clearTimeout(autoTimer);
    session.destroy();
  });

  let q = $derived(session.current);
  let showFeedback = $derived(session.answered !== null);
  let lastCorrect = $derived(session.answered !== null && session.answered >= 0 && q?.options[session.answered]?.correct);
</script>

<div class="screen play" class:wrong-flash={wrongFlash}>
  {#if showIntro}
    <div class="intro-overlay">
      <div class="card intro pop-in">
        <p class="intro-text">{meta.intro}</p>
        <button class="btn" onclick={() => (showIntro = false)}>開打！</button>
        <button class="btn ghost intro-leave" onclick={onQuit}>先溜了</button>
      </div>
    </div>
  {/if}
  <header class="hud">
    <button class="quit" onclick={quit} aria-label="離開">✕</button>

    {#if isSprint}
      <div class="timer" class:urgent={session.timeLeft <= 10}>
        {Math.ceil(session.timeLeft)}<small>s</small>
      </div>
    {:else}
      <div class="progress-wrap">
        <div class="meter"><i style:width="{(session.index + 1) / session.total * 100}%"></i></div>
        <span class="progress-num">{session.index + 1}/{session.total}</span>
      </div>
    {/if}

    <div class="score-wrap">
      <span class="score">{session.score}</span>
      {#if scorePop > 0}<span class="score-pop">+{scorePop}</span>{/if}
    </div>
  </header>

  {#if session.combo >= 3}
    <div class="combo pop-in">🔥 連擊 ×{session.combo}</div>
  {/if}

  {#if meta.liveState}
    <div class="live-wrap">
      <LiveBoard progress={meta.liveState.progress} myId={meta.myId} variant="play" />
    </div>
  {/if}

  {#if isBoss}
    <div class="boss-panel card">
      <div class="boss-row">
        <span class="boss-name">👹 {meta.bossName}</span>
        <span class="boss-hp-num">{session.bossHp}/{session.bossMaxHp}</span>
      </div>
      <div class="meter boss"><i style:width="{session.bossHp / session.bossMaxHp * 100}%"></i></div>
      <div class="hearts">
        {#each Array(3) as _, i}
          <span class:lost={i >= session.hearts}>{i < session.hearts ? '❤️' : '🤍'}</span>
        {/each}
        {#if session.answered === null && config.perQuestionSeconds}
          <span class="qtimer" class:urgent={session.questionTimeLeft <= 3}>
            {Math.ceil(session.questionTimeLeft)}<small>s</small>
          </span>
        {/if}
      </div>
    </div>
  {/if}

  {#if q}
    {#key q.id}
      <main class="qarea">
        <div class="qcard card pop-in" class:shake={showFeedback && !lastCorrect}>
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
              onclick={() => choose(i)}
            >
              <ZhuyinCol zhuyin={opt.zhuyin} size="1.7rem" />
            </button>
          {/each}
        </div>

        {#if showFeedback}
          <div class="feedback card bounce-in" class:good={lastCorrect}>
            <p class="fb-head">
              {#if session.answered === -1}時間到！正解是「{q.zhuyin}」
              {:else if lastCorrect}🎉 答對了！
              {:else}💥 唸錯啦！正解是「{q.zhuyin}」
              {/if}
            </p>
            <p class="fb-fun">{q.fun}</p>
            <p class="fb-meaning">{q.text}：{q.meaning}</p>
            {#if !isSprint}
              <button class="btn mint next" onclick={advance}>
                {session.index >= session.total - 1 || (isBoss && (session.bossHp <= 0 || session.hearts <= 0)) ? '看結果 →' : '下一題 →'}
              </button>
            {/if}
          </div>
        {/if}
      </main>
    {/key}
  {/if}
</div>

<style>
  .play { padding-top: calc(env(safe-area-inset-top, 0px) + 0.9rem); }
  .wrong-flash { animation: shake 0.4s ease; }

  .intro-overlay {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: grid;
    place-items: center;
    background: rgba(61, 44, 41, 0.45);
    backdrop-filter: blur(4px);
    padding: 1.5rem;
  }
  .intro { padding: 1.6rem 1.4rem; text-align: center; max-width: 340px; }
  .intro-icon { font-size: 2.6rem; }
  .intro-text { margin: 0.8rem 0 1.1rem; line-height: 1.6; }
  .intro-leave { margin-left: 0.6rem; }

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
  .timer {
    flex: 1;
    font-size: 1.3rem;
    font-weight: 900;
    text-align: center;
  }
  .timer.urgent, .qtimer.urgent { color: var(--berry-deep); animation: wiggle 0.4s ease-in-out infinite; }
  .score-wrap { position: relative; min-width: 64px; text-align: right; }
  .score { font-size: 1.3rem; font-weight: 900; color: var(--sun); }
  .score-pop {
    position: absolute;
    right: 0; top: 0;
    font-weight: 900;
    color: var(--leaf);
    animation: score-fly 0.7s ease-out both;
  }

  .combo {
    align-self: center;
    margin-top: 0.5rem;
    font-weight: 900;
    color: var(--berry-deep);
    animation: flame-flicker 0.6s ease-in-out infinite;
  }

  .live-wrap { margin-top: 0.7rem; }

  .boss-panel { margin-top: 0.8rem; padding: 0.8rem 1rem; }
  .boss-row { display: flex; justify-content: space-between; font-weight: 800; margin-bottom: 0.4rem; }
  .boss-hp-num { color: var(--berry-deep); }
  .hearts { display: flex; gap: 0.2rem; margin-top: 0.5rem; align-items: center; }
  .hearts .lost { opacity: 0.5; }
  .qtimer { margin-left: auto; font-weight: 900; font-size: 1.35rem; }

  /* 題目區在剩餘空間垂直置中，避免底部大片留白 */
  .qarea { display: flex; flex-direction: column; flex: 1; margin-top: 1rem; justify-content: center; padding-bottom: 8vh; }

  .qcard { padding: 1.4rem 1.2rem; text-align: center; }
  .qprompt { margin: 0 0 0.6rem; color: var(--ink-soft); font-size: 1rem; }
  .qtarget { color: var(--berry-deep); font-family: var(--font-kai); font-size: 1.4em; }
  .qtext {
    margin: 0;
    font-family: var(--font-kai);
    font-size: clamp(2rem, 9vw, 3rem);
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
    margin-top: 1.1rem;
  }
  .options.locked .opt { pointer-events: none; }
  .opt {
    padding: 1.1rem 0.5rem;
    display: flex;
    justify-content: center;
    min-height: 120px;
    align-items: center;
    transition: transform 0.12s ease, box-shadow 0.2s, background 0.2s;
  }
  .opt:hover { transform: translateY(-3px); box-shadow: var(--shadow-pop); }
  .opt:active { transform: scale(0.96); }
  .opt.right { background: #e9fbf3; box-shadow: 0 0 0 3px var(--leaf), var(--shadow-card); }
  .opt.picked-wrong { background: #fdecec; box-shadow: 0 0 0 3px var(--berry), var(--shadow-card); }

  .feedback {
    margin-top: 1rem;
    padding: 1.1rem 1.2rem;
    border-left: 6px solid var(--berry);
  }
  .feedback.good { border-left-color: var(--leaf); }
  .fb-head { margin: 0; font-weight: 900; font-size: 1.1rem; }
  .fb-fun { margin: 0.5rem 0 0; color: var(--ink); }
  .fb-meaning { margin: 0.4rem 0 0; color: var(--ink-soft); font-size: 0.9rem; }
  .next { margin-top: 0.9rem; width: 100%; }
</style>
