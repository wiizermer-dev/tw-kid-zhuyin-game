<script>
  import { titleFor, starsFor, emojiGrid } from '../../core/scoring.js';
  import { storage } from '../../core/storage.js';
  import { renderShareCard, renderDuelCard, shareCard, shareText } from '../../lib/share.js';
  import { tauntFor } from '../../lib/taunts.js';
  import { fetchPercentile } from '../../lib/backend.js';
  import { buildScoreChallengeUrl } from '../../lib/challenge.js';
  import { randomZhuyinCode } from '../../lib/live.js';
  import { dailySeed } from '../../core/rng.js';
  import LiveBoard from '../components/LiveBoard.svelte';
  import DuelRoast from '../components/DuelRoast.svelte';

  let { summary, modeKey, modeName, level = null, challenge = null, duelSeed = null,
        liveState = null, myId = null, onReplay, onHome, onBoard, onNextLevel = null, onLevels = null } = $props();

  const name = storage.getPlayerName();
  // 衝刺模式稱號需要量：少於 10 題不能只靠正確率封神
  let title = $derived(titleFor(
    summary.correct,
    modeKey === 'sprint' ? Math.max(summary.total, 10) : summary.total
  ));
  let stars = $derived(starsFor(summary.correct, summary.total));
  let rate = $derived(summary.total ? Math.round((summary.correct / summary.total) * 100) : 0);

  // 對戰勝負
  let duelOutcome = $derived.by(() => {
    if (!challenge) return null;
    if (summary.score > challenge.score) return 'win';
    if (summary.score < challenge.score) return 'lose';
    return 'tie';
  });

  // 最難的一題（答錯優先，否則 difficulty 最高）作為分享鉤子
  let hardest = $derived.by(() => {
    const wrongs = summary.questions.filter((q, i) => !summary.results[i]);
    const pool = wrongs.length ? wrongs : summary.questions;
    return [...pool].sort((a, b) => b.difficulty - a.difficulty)[0] ?? null;
  });

  let shareState = $state('');
  let busy = $state(false);

  // 打敗百分比（雲端可用才有，進場抓一次）
  let percentile = $state(null);
  $effect(() => {
    fetchPercentile(modeKey, summary.score).then((p) => { percentile = p; });
  });

  // 挑釁文案：每次進結算抽一句，卡片與 share text 共用（deps 靜態，實際只算一次）
  let taunt = $derived(tauntFor({
    rate: summary.total ? summary.correct / summary.total : 0,
    score: summary.score,
    hardestText: hardest?.text ?? ''
  }));

  let wrongOnes = $derived(summary.questions.filter((q, i) => !summary.results[i]));

  // 同房是否全部完賽（決定要不要顯示「等其他人完成中」）
  let allFinished = $derived(
    liveState ? Object.values(liveState.progress).every((p) => p.finished) : true
  );

  // 已按「再玩一次」回大廳準備的人數 — 提醒還在看結果的人有人在等
  let rematchReady = $derived(liveState ? liveState.players.filter((p) => p.ready) : []);

  // 闖關星等：BOSS 關沒打贏一律 0 星
  let levelStars = $derived(level?.boss && !summary.won ? 0 : stars);
  let remainMistakes = $derived(Object.keys(storage.getMistakes()).length);

  // 對戰連結（自己當開房者，或接受挑戰後回敬）
  // seed 格式 'room-<四碼房號>[-<局次 match id>]'；match 讓對手拿到同一組題
  let duelParts = $derived(duelSeed?.startsWith('room-') ? duelSeed.slice(5).split('-') : []);
  let duelRoomCode = $derived(duelParts[0] ?? null);
  let duelMatch = $derived(duelParts[1] ?? null);
  let challengeUrl = $derived(
    modeKey === 'duel' && duelRoomCode
      ? buildScoreChallengeUrl({ room: duelRoomCode, score: summary.score, name, count: summary.total, match: duelMatch })
      : null
  );

  // 對戰卡素材：非同步戰帖直接用 challenge，live 對戰取分數最高的對手
  let duelOpp = $derived.by(() => {
    if (challenge) return { name: challenge.name, score: challenge.score };
    if (!liveState) return null;
    const others = Object.values(liveState.progress).filter((p) => p.id !== myId && p.finished);
    if (!others.length) return null;
    const best = [...others].sort((a, b) => b.score - a.score)[0];
    return { name: best.name, score: best.score };
  });
  let liveOutcome = $derived.by(() => {
    if (duelOutcome) return duelOutcome;
    if (!duelOpp) return null;
    if (summary.score > duelOpp.score) return 'win';
    if (summary.score < duelOpp.score) return 'lose';
    return 'tie';
  });

  async function doShareCard() {
    busy = true;
    try {
      const blob = modeKey === 'duel' && duelOpp
        ? await renderDuelCard({
            outcome: liveOutcome,
            me: { name, score: summary.score },
            opp: duelOpp,
            roomCode: duelRoomCode,
            hardest: hardest ? { text: hardest.text, zhuyin: hardest.zhuyin } : null
          })
        : await renderShareCard({
            title: title.title, emoji: title.emoji, quip: title.quip,
            score: summary.score, correct: summary.correct, total: summary.total,
            combo: summary.maxCombo, modeName, name,
            hardest: hardest ? { text: hardest.text, zhuyin: hardest.zhuyin } : null,
            percentile, taunt, roomCode: duelRoomCode
          });
      const text = `我在「你ㄅㄆㄇ有ㄅ級分ㄇ」拿到 ${summary.score} 分，獲得稱號【${title.title}】。${taunt}\n${challengeUrl ?? location.origin}`;
      const r = await shareCard(blob, text, challengeUrl ?? location.origin);
      shareState = r === 'downloaded' ? '圖片已下載！'
        : r === 'shared' ? '已分享！'
        : r === 'timeout' ? '分享視窗沒回應，再試一次？' : '';
    } finally {
      busy = false;
    }
  }

  async function doShareChallenge() {
    const url = challengeUrl ?? buildScoreChallengeUrl({
      room: duelRoomCode ?? randomZhuyinCode(),
      score: summary.score, name, count: summary.total
    });
    const r = await shareText(`${name} 在「你ㄅㄆㄇ有ㄅ級分ㄇ」轟出 ${summary.score} 分。少ㄈㄏ，來ㄉ一場！\n${url}`);
    shareState = r === 'copied' ? '連結已複製，傳給朋友吧！' : r === 'shared' ? '戰帖已送出！' : '';
  }

  async function doShareDaily() {
    const grid = emojiGrid(summary.results);
    const streak = storage.getDailyStreak();
    const r = await shareText(
      `你ㄅㄆㄇ有ㄅ級分ㄇ每日挑戰 ${dailySeed().replace('daily-', '')}\n${grid}\n${summary.correct}/${summary.total}・${summary.score} 分・🔥連續 ${streak.count} 天\n${location.origin}`
    );
    shareState = r === 'copied' ? '成績已複製，去貼吧！' : r === 'shared' ? '已分享！' : '';
  }
</script>

<div class="screen result">
  <div class="trophy pop-in">{title.emoji}</div>
  <h2 class="title bounce-in">{title.title}</h2>
  <p class="quip">{title.quip}</p>

  {#if liveState}
    <div class="live-final pop-in">
      <LiveBoard progress={liveState.progress} {myId} variant="result" />
      {#if !allFinished}<p class="waiting-note">等其他人完成中…（會即時更新）</p>{/if}
      {#if allFinished}
        <DuelRoast progress={liveState.progress} {myId} />
      {/if}
    </div>
  {/if}

  {#if duelOutcome}
    <div class="card duel pop-in">
      {#if duelOutcome === 'win'}
        你贏了 <b>{challenge.name || '對手'}</b>！（{summary.score} vs {challenge.score}）
      {:else if duelOutcome === 'lose'}
        輸給 <b>{challenge.name || '對手'}</b>（{summary.score} vs {challenge.score}），再戰一場？
      {:else}
        跟 <b>{challenge.name || '對手'}</b> 平手！（{summary.score} 分）
      {/if}
    </div>
  {/if}

  {#if modeKey === 'levels' && level}
    <div class="stars pop-in">
      {#each Array(3) as _, i}
        <span class="star" class:on={i < levelStars} style:animation-delay="{0.2 + i * 0.15}s">★</span>
      {/each}
    </div>
    {#if level.boss}
      <p class="boss-result">{summary.won ? `👹 ${level.bossName} 被你打爆了！` : `👹 ${level.bossName}：就這？`}</p>
    {/if}
    {#if levelStars === 0}
      <p class="fail-note">這關還沒過，拿到 1 顆星（答對 6 成）就能解鎖下一關，再衝一次！</p>
    {/if}
  {/if}

  {#if modeKey === 'practice'}
    <p class="avenge pop-in">雪恥成功 {summary.correct} 個字{remainMistakes > 0 ? `，還有 ${remainMistakes} 個等你復仇` : '，錯題本清空了，太神啦！'}</p>
  {/if}

  <div class="card stats bounce-in">
    <div class="stat"><b>{summary.score}</b><small>分數</small></div>
    <div class="stat"><b>{summary.correct}/{summary.total}</b><small>答對（{rate}%）</small></div>
    <div class="stat"><b>×{summary.maxCombo}</b><small>最高連擊</small></div>
  </div>

  {#if modeKey === 'daily'}
    <div class="grid-line">{emojiGrid(summary.results)}</div>
    {@const streak = storage.getDailyStreak()}
    {#if streak.count > 0}
      <p class="streak pop-in">
        🔥 連續挑戰 <b>{streak.count}</b> 天<small>明天沒來就歸零，記得回來</small>
      </p>
    {/if}
  {/if}

  {#if wrongOnes.length > 0}
    <details class="card review bounce-in">
      <summary>錯題回顧（{wrongOnes.length} 題）看完再走，下次就會了</summary>
      <ul>
        {#each wrongOnes as q}
          <li>
            <span class="rv-word">{q.text}</span>
            {#if q.kind === 'char'}
              <span class="rv-ans">{q.zhuyin} 是「<b>{q.target}</b>」</span>
            {:else}
              <span class="rv-ans">「{q.target}」唸 <b>{q.zhuyin}</b></span>
            {/if}
            {#if q.meaning}<small class="rv-meaning">{q.meaning}</small>{/if}
            {#if q.fun}<small class="rv-fun">{q.fun}</small>{/if}
          </li>
        {/each}
      </ul>
    </details>
  {/if}

  <div class="actions">
    {#if modeKey === 'daily'}
      <button class="btn" onclick={doShareDaily}>分享今日成績</button>
    {/if}
    {#if modeKey === 'duel' || challenge}
      <button class="btn" onclick={doShareChallenge}>把戰帖傳出去</button>
    {/if}
    <button class="btn mint" onclick={doShareCard} disabled={busy}>
      {busy ? '製作中…' : '存成限動成績卡'}
    </button>
    {#if shareState}<p class="share-state pop-in">{shareState}</p>{/if}

    {#if modeKey === 'levels' && onNextLevel && levelStars > 0}
      <button class="btn" onclick={onNextLevel}>下一關 →</button>
    {/if}
    {#if modeKey !== 'daily' && !(modeKey === 'practice' && remainMistakes === 0)}
      {#if rematchReady.length > 0}
        <p class="rematch-note pop-in">🔥 {rematchReady.map((p) => p.name).join('、')} 已經準備好再戰，等你！</p>
        <button class="btn" onclick={onReplay}>再玩一次</button>
      {:else}
        <button class="btn ghost" onclick={onReplay}>再玩一次</button>
      {/if}
    {/if}
    {#if modeKey === 'levels' && onLevels}
      <button class="btn ghost" onclick={onLevels}>回關卡列表</button>
    {/if}
    <button class="btn ghost" onclick={onBoard}>排行榜</button>
    <button class="btn ghost" onclick={onHome}>回首頁</button>
  </div>
</div>

<style>
  .result { align-items: center; text-align: center; }
  .trophy { font-size: 4.5rem; margin-top: 2rem; }
  .title {
    font-family: var(--font-kai);
    font-size: 2.4rem;
    margin: 0.4rem 0 0;
    color: var(--berry-deep);
  }
  .quip { color: var(--ink-soft); margin: 0.3rem 0 1rem; }

  .duel { padding: 1rem 1.3rem; margin-bottom: 1rem; font-size: 1.05rem; }

  .live-final { width: 100%; margin-bottom: 1rem; }
  .waiting-note { text-align: center; color: var(--ink-soft); font-size: 0.82rem; margin: 0.5rem 0 0; }

  .stars { display: flex; gap: 0.5rem; font-size: 3rem; margin: 0.3rem 0 0.5rem; }
  .star { color: #e3d7ca; animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .star.on { color: var(--sun); text-shadow: 0 3px 0 rgba(216, 146, 20, 0.4); }
  .boss-result { font-weight: 800; margin: 0.2rem 0 0.6rem; }
  .fail-note { color: var(--berry-deep); font-weight: 700; margin: 0.2rem 0 0.6rem; max-width: 320px; }
  .avenge { font-weight: 800; color: var(--grape); margin: 0.2rem 0 0.6rem; }

  .stats {
    display: flex;
    width: 100%;
    justify-content: space-around;
    padding: 1.1rem 0.5rem;
    margin: 0.6rem 0 1rem;
  }
  .stat { display: flex; flex-direction: column; gap: 0.2rem; }
  .stat b { font-size: 1.5rem; }
  .stat small { color: var(--ink-soft); }

  .grid-line { font-size: 1.4rem; letter-spacing: 0.1em; margin-bottom: 0.8rem; }
  .streak { display: flex; flex-direction: column; gap: 0.1rem; margin: -0.3rem 0 0.8rem; font-weight: 800; color: var(--berry-deep); }
  .streak small { color: var(--ink-soft); font-weight: 600; }

  .review {
    width: 100%;
    text-align: left;
    padding: 0.9rem 1.1rem;
    margin-bottom: 1rem;
  }
  .review summary { font-weight: 800; cursor: pointer; font-size: 0.95rem; }
  .review ul { list-style: none; padding: 0; margin: 0.6rem 0 0; display: flex; flex-direction: column; gap: 0.7rem; }
  .review li { display: flex; flex-direction: column; gap: 0.15rem; border-top: 1.5px dashed #f0e4d8; padding-top: 0.6rem; }
  .rv-word { font-family: var(--font-kai); font-size: 1.25rem; }
  .rv-ans b { color: var(--berry-deep); font-family: var(--font-kai); }
  .rv-meaning { color: var(--ink); }
  .rv-fun { color: var(--ink-soft); }

  .actions { display: flex; flex-direction: column; gap: 0.7rem; width: 100%; max-width: 340px; }
  .rematch-note { margin: 0; color: var(--berry-deep); font-weight: 800; font-size: 0.92rem; }
  .share-state { margin: 0; color: var(--mint-deep); font-weight: 700; }
</style>
