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
  const isLive = !!meta.liveState;   // 即時對戰：限時答題 + 全房同步換題

  let wrongFlash = $state(false);
  let scorePop = $state(0); // 觸發 +分數 飛出動畫
  let showIntro = $state(!!meta.intro);

  // 衝刺模式答完自動快轉；其他模式等玩家看完回饋
  let autoTimer = null;
  let reported = false;
  const mountTime = performance.now();

  // 即時房：每答一題回報進度給同房對手
  // 完賽（finished）時附上逐題對錯與題目 id，供結算「本場最雷題／最菜」統計
  function reportProgress(finished = false) {
    meta.onProgress?.({
      index: Math.min(session.index + 1, session.total),
      total: session.total,
      attempted: session.attempted,
      correct: session.correctCount,
      score: session.score,
      finished,
      // 即時對戰排速度用「累計作答秒數」，否則同步換題後大家牆鐘時間都一樣
      elapsedSec: isLive
        ? Math.round(session.answerTimeTotal * 10) / 10
        : Math.round((performance.now() - mountTime) / 1000),
      ...(finished && isLive
        ? {
            results: [...session.results],
            qids: session.questions.slice(0, session.attempted).map((q) => q.id)
          }
        : {})
    });
  }

  /* 即時對戰換題同步：
   * - 全房都答完本題（含超時）→ 提前換題
   * - 否則本地 4 秒到 → 換題（各端各自計時，倒數同時開始所以幾乎同步）
   * 兩者都先留 FEEDBACK 時間讓玩家看正解 */
  const DUEL_FEEDBACK_MS = 1600;
  // 答錯／超時者額外多留 1 秒看詳解（各端依自己本題對錯決定，不影響同步換題時機）
  const DUEL_WRONG_EXTRA_MS = 1000;
  let duelHardTimer = null;
  let duelNextTimer = null;
  let duelAdvancing = false;

  function armDuelQuestion() {
    if (!isLive || session.finished) return;
    clearTimeout(duelHardTimer);
    duelHardTimer = setTimeout(scheduleDuelAdvance, (config.perQuestionSeconds || 5) * 1000);
  }

  function scheduleDuelAdvance() {
    if (!isLive || duelAdvancing || session.finished) return;
    duelAdvancing = true;
    clearTimeout(duelHardTimer);
    // 本題答錯或超時（answered === -1）→ 多留 1 秒看正解詳解
    const wrong = session.answered === -1 || (session.answered !== null && !lastCorrect);
    const wait = DUEL_FEEDBACK_MS + (wrong ? DUEL_WRONG_EXTRA_MS : 0);
    duelNextTimer = setTimeout(() => {
      duelAdvancing = false;
      advance();
    }, wait);
  }

  // 我已作答且全房本題都答完 → 提前換題
  $effect(() => {
    if (!isLive || session.finished || session.answered === null) return;
    const others = Object.values(meta.liveState.progress).filter((p) => p.id !== meta.myId);
    if (others.every((p) => (p.attempted ?? 0) >= session.index + 1)) {
      scheduleDuelAdvance();
    }
  });

  // 超時也要廣播進度，否則對手等不到「我答完了」
  $effect(() => {
    if (isLive && session.answered === -1) untrack(() => reportProgress(false));
  });

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
    // 同步換題時還沒作答（如背景分頁漏掉 timeout tick）→ 先記超時再換
    if (isLive && session.answered === null) session.timeout();
    session.next();
    if (session.finished) return done();
    armDuelQuestion();
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
      endCombo: session.combo,   // 闖關跨關卡連擊用
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
    armDuelQuestion();
  });

  function quit() {
    if (!session.finished && session.attempted > 0) {
      if (!confirm('確定要離開嗎？這局進度不會保留喔')) return;
    }
    onQuit();
  }

  onDestroy(() => {
    clearTimeout(autoTimer);
    clearTimeout(duelHardTimer);
    clearTimeout(duelNextTimer);
    session.destroy();
  });

  let q = $derived(session.current);
  let showFeedback = $derived(session.answered !== null);
  let lastCorrect = $derived(session.answered !== null && session.answered >= 0 && q?.options[session.answered]?.correct);

  // 連擊循序增強：3-5 小火 / 6-9 大火 / 10-19 藍火 / 20+ 金色，可愛度與明顯度逐級拉高
  let comboTier = $derived(
    session.combo >= 20 ? 4 : session.combo >= 10 ? 3 : session.combo >= 6 ? 2 : session.combo >= 3 ? 1 : 0
  );
  const COMBO_FACE = ['', '🔥', '🔥🔥', '💙', '🌟'];

  // 衝刺剩餘時間比例（timer ring 用）
  let sprintFrac = $derived(isSprint ? Math.max(0, session.timeLeft / config.timeLimit) : 1);
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
      <div class="timer" class:warn={sprintFrac <= 0.5 && session.timeLeft > 10} class:urgent={session.timeLeft <= 10}>
        <svg class="ring" viewBox="0 0 48 48" aria-hidden="true">
          <circle class="ring-bg" cx="24" cy="24" r="20" />
          <circle class="ring-fg" cx="24" cy="24" r="20" style:stroke-dashoffset={(1 - sprintFrac) * 125.66} />
        </svg>
        {#key session.timeLeft <= 10 ? Math.ceil(session.timeLeft) : 0}
          <span class="timer-num" class:beat={session.timeLeft <= 10}>{Math.ceil(session.timeLeft)}</span>
        {/key}
      </div>
    {:else}
      <div class="progress-wrap">
        <div class="meter"><i style:width="{(session.index + 1) / session.total * 100}%"></i></div>
        <span class="progress-num">{session.index + 1}/{session.total}</span>
        {#if !isBoss && session.answered === null && config.perQuestionSeconds}
          <span class="qtimer" class:urgent={session.questionTimeLeft <= 2}>
            {Math.ceil(session.questionTimeLeft)}<small>s</small>
          </span>
        {/if}
      </div>
    {/if}

    <div class="score-wrap">
      <span class="score">{session.score}</span>
      {#if scorePop > 0}<span class="score-pop">+{scorePop}</span>{/if}
    </div>
  </header>

  {#if comboTier > 0}
    {#key session.combo}
      <div class="combo t{comboTier} combo-pop">{COMBO_FACE[comboTier]} 連擊 ×{session.combo}</div>
    {/key}
  {/if}

  {#if isSprint && session.timeLeft <= 5 && !session.finished}
    <div class="vignette" aria-hidden="true"></div>
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
        {#if config.perQuestionSeconds && session.answered === null}
          <div class="qbar" aria-hidden="true">
            <i
              class:hurry={session.questionTimeLeft <= 2}
              style:width="{(session.questionTimeLeft / config.perQuestionSeconds) * 100}%"
            ></i>
          </div>
        {/if}
        <div class="qcard card pop-in" class:fact={q.kind === 'fact'} class:shake={showFeedback && !lastCorrect}>
          {#if q.kind === 'fact'}
            <p class="qfact">{q.question}</p>
          {:else if q.kind === 'char'}
            <p class="qprompt">空格是哪個字？</p>
            <p class="qtext">
              {#each [...q.text] as ch}
                {#if ch === q.target}
                  <span class="blank"><ZhuyinCol zhuyin={q.zhuyin} size="1rem" /></span>
                {:else}
                  <span>{ch}</span>
                {/if}
              {/each}
            </p>
          {:else}
            <p class="qprompt">「<b class="qtarget">{q.target}</b>」怎麼唸？</p>
            <p class="qtext">
              {#each [...q.text] as ch}
                <span class:hl={ch === q.target}>{ch}</span>
              {/each}
            </p>
          {/if}
        </div>

        <div class="options" class:locked={showFeedback} class:fact={q.kind === 'fact'}>
          {#each q.options as opt, i}
            <button
              class="opt card"
              class:fact-opt={q.kind === 'fact'}
              class:right={showFeedback && opt.correct}
              class:picked-wrong={showFeedback && session.answered === i && !opt.correct}
              aria-label="{q.kind === 'fact' ? opt.text : q.kind === 'char' ? `選字 ${opt.char}` : `注音選項 ${opt.zhuyin}`}"
              onclick={() => choose(i)}
            >
              {#if q.kind === 'fact'}
                <span class="text-opt">{opt.text}</span>
              {:else if q.kind === 'char'}
                <span class="char-opt">{opt.char}</span>
              {:else}
                <ZhuyinCol zhuyin={opt.zhuyin} size="1.7rem" />
              {/if}
            </button>
          {/each}
        </div>

        {#if showFeedback}
          {@const factAnswer = q.kind === 'fact' ? q.options.find(o => o.correct)?.text : null}
          <div class="feedback card bounce-in" class:good={lastCorrect}>
            <p class="fb-head">
              {#if q.kind === 'fact'}
                {#if session.answered === -1}時間到！答案是「{factAnswer}」
                {:else if lastCorrect}🎉 答對了！
                {:else}原來如此！答案是「{factAnswer}」
                {/if}
              {:else if session.answered === -1}時間到！正解是「{q.kind === 'char' ? q.target : q.zhuyin}」
              {:else if lastCorrect}🎉 答對了！
              {:else}{q.kind === 'char' ? '💥 寫錯啦！' : '💥 唸錯啦！'}正解是「{q.kind === 'char' ? q.target : q.zhuyin}」
              {/if}
            </p>
            <p class="fb-fun">{q.fun}</p>
            {#if q.kind === 'fact'}
              <p class="fb-source">📜 {q.source}</p>
            {:else}
              <p class="fb-meaning">{q.text}：{q.meaning}</p>
            {/if}
            {#if isLive}
              <p class="fb-wait">等大家答完馬上換題…</p>
            {:else if !isSprint}
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
  /* 衝刺計時：環形 drain，綠→黃→紅三段色，倒數 10 秒數字心跳 */
  .timer {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 52px;
  }
  .timer .ring { width: 52px; height: 52px; transform: rotate(-90deg); }
  .ring-bg { fill: none; stroke: #f0e4d8; stroke-width: 5; }
  .ring-fg {
    fill: none;
    stroke: var(--leaf, #4ECDC4);
    stroke-width: 5;
    stroke-linecap: round;
    stroke-dasharray: 125.66;
    transition: stroke-dashoffset 0.3s linear, stroke 0.4s;
  }
  .timer.warn .ring-fg { stroke: var(--sun); }
  .timer.urgent .ring-fg { stroke: var(--berry-deep); }
  .timer-num {
    position: absolute;
    font-size: 1.15rem;
    font-weight: 900;
  }
  .timer.urgent .timer-num { color: var(--berry-deep); }
  .timer-num.beat { animation: heartbeat 0.5s ease-out both; }
  @keyframes heartbeat {
    0% { transform: scale(1.45); }
    100% { transform: scale(1); }
  }
  .qtimer.urgent { color: var(--berry-deep); animation: wiggle 0.4s ease-in-out infinite; }

  /* 最後 5 秒：畫面邊緣紅暈脈動，急迫感拉滿但不遮題目 */
  .vignette {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 40;
    box-shadow: inset 0 0 90px 18px rgba(214, 69, 80, 0.45);
    animation: vignette-pulse 1s ease-in-out infinite;
  }
  @keyframes vignette-pulse {
    0%, 100% { opacity: 0.35; }
    50% { opacity: 0.95; }
  }

  /* 單題倒數：題卡頂部 shrink bar，比角落小數字可感 */
  .qbar {
    height: 8px;
    border-radius: 999px;
    background: #f0e4d8;
    overflow: hidden;
    margin-bottom: 0.6rem;
  }
  .qbar i {
    display: block;
    height: 100%;
    border-radius: 999px;
    background: var(--mint, #4ECDC4);
    transition: width 0.15s linear, background 0.3s;
  }
  .qbar i.hurry { background: var(--berry-deep); }
  .score-wrap { position: relative; min-width: 64px; text-align: right; }
  .score { font-size: 1.3rem; font-weight: 900; color: var(--sun); }
  .score-pop {
    position: absolute;
    right: 0; top: 0;
    font-weight: 900;
    color: var(--leaf);
    animation: score-fly 0.7s ease-out both;
  }

  /* 連擊循序增強：固定位不侵入選項區，pop 只在連擊增加瞬間（#key 重掛） */
  .combo {
    align-self: center;
    margin-top: 0.5rem;
    font-weight: 900;
    color: var(--berry-deep);
    animation: flame-flicker 0.6s ease-in-out infinite;
  }
  .combo-pop { animation: combo-land 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both, flame-flicker 0.6s ease-in-out 0.45s infinite; }
  @keyframes combo-land {
    0% { transform: scale(1.7) rotate(-4deg); }
    60% { transform: scale(0.92) rotate(2deg); }
    100% { transform: scale(1) rotate(0); }
  }
  .combo.t2 {
    font-size: 1.1rem;
    animation-duration: 0.45s, 0.4s;
  }
  .combo.t3 {
    font-size: 1.2rem;
    color: var(--mint-deep, #2a9d8f);
    text-shadow: 0 0 12px rgba(78, 205, 196, 0.55);
  }
  .combo.t4 {
    font-size: 1.35rem;
    background: linear-gradient(90deg, #ffb347, #ff6b6b, #ffb347);
    background-size: 200% auto;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: none;
    filter: drop-shadow(0 0 10px rgba(255, 179, 71, 0.65));
    animation: combo-land 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both, gold-slide 1.4s linear 0.45s infinite;
  }
  @keyframes gold-slide {
    to { background-position: 200% center; }
  }

  @media (prefers-reduced-motion: reduce) {
    .combo, .combo-pop, .combo.t4 { animation: none; }
    .timer-num.beat { animation: none; }
    .vignette { animation: none; opacity: 0.5; }
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
  /* 反考字：挖空格子，內放小注音提示 */
  .qtext .blank {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 1.2em;
    height: 1.2em;
    margin: 0 0.05em;
    border: 3px dashed var(--sun);
    border-radius: 12px;
    background: #fffaf0;
    /* 0.2em 讓框視覺中心對齊 CJK 字 glyph 中心（middle 對齊 x-height 中線會偏低）*/
    vertical-align: 0.2em;
  }
  .char-opt {
    font-family: var(--font-kai);
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1;
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
  .fb-wait { margin: 0.7rem 0 0; color: var(--ink-soft); font-size: 0.85rem; font-weight: 700; }
  .next { margin-top: 0.9rem; width: 100%; }

  /* ── 端午知識題（kind: 'fact'）：完整問句題幹 + 垂直長條選項 ── */
  .qcard.fact { text-align: left; padding: 1.3rem 1.3rem; }
  .qfact {
    margin: 0;
    font-family: var(--font-kai);
    font-size: clamp(1.2rem, 5.2vw, 1.55rem);
    line-height: 1.55;
    color: var(--ink);
    letter-spacing: 0.01em;
  }
  /* 垂直堆疊長條：全寬、左對齊、可換行、觸控目標 ≥44px */
  .options.fact {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .opt.fact-opt {
    min-height: 0;
    padding: 0.95rem 1.1rem;
    justify-content: flex-start;
    text-align: left;
    border: 2.5px solid transparent;
  }
  .opt.fact-opt:hover { transform: translateY(-2px); }
  .text-opt {
    font-family: var(--font-round);
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.4;
    color: var(--ink);
  }
  .fb-source {
    margin: 0.5rem 0 0;
    color: var(--ink-soft);
    font-size: 0.82rem;
    line-height: 1.5;
  }

  /* 端午皮膚：fact 題時答題畫面背景＝關卡頁同一套 DuanwuScene 繪本場景
     （App 在 play+duanwu 時已掛 DuanwuScene；不再蓋不透明漸層，讓場景透出來）。
     卡片本身保留 reed/cinnabar 端午色點綴。 */
  .play:has(.qcard.fact) .qcard { box-shadow: 0 0 0 2.5px color-mix(in srgb, var(--reed) 28%, white), var(--shadow-card); }
  .play:has(.qcard.fact) .meter > i { background: linear-gradient(90deg, var(--river), var(--reed)); }
  .opt.fact-opt.right { background: color-mix(in srgb, var(--reed) 14%, white); box-shadow: 0 0 0 3px var(--reed), var(--shadow-card); }
  .play:has(.qcard.fact) .feedback.good { border-left-color: var(--reed); }
  .play:has(.qcard.fact) .feedback { border-left-color: var(--cinnabar); }
</style>
