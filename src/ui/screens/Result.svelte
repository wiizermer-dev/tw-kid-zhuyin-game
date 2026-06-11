<script>
  import { titleFor, starsFor, emojiGrid } from '../../core/scoring.js';
  import { storage } from '../../core/storage.js';
  import { renderShareCard, shareCard, shareText } from '../../lib/share.js';
  import { buildChallengeUrl } from '../../lib/challenge.js';
  import { dailySeed } from '../../core/rng.js';

  let { summary, modeKey, modeName, level = null, challenge = null, duelSeed = null,
        onReplay, onHome, onBoard, onNextLevel = null } = $props();

  const name = storage.getPlayerName();
  let title = $derived(titleFor(summary.correct, summary.total));
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

  // 對戰連結（自己當開房者，或接受挑戰後回敬）
  let challengeUrl = $derived(
    modeKey === 'duel' && duelSeed
      ? buildChallengeUrl({ seed: duelSeed, mode: 'duel', score: summary.score, name, count: summary.total })
      : null
  );

  async function doShareCard() {
    busy = true;
    try {
      const blob = await renderShareCard({
        title: title.title, emoji: title.emoji, quip: title.quip,
        score: summary.score, correct: summary.correct, total: summary.total,
        combo: summary.maxCombo, modeName, name,
        hardest: hardest ? { text: hardest.text, zhuyin: hardest.zhuyin } : null
      });
      const text = `我在「ㄅㄆㄇ你會唸嗎？」拿到 ${summary.score} 分，獲得稱號【${title.title}】！這題你會唸嗎：「${hardest?.text ?? ''}」`;
      const r = await shareCard(blob, text, challengeUrl ?? location.origin);
      shareState = r === 'downloaded' ? '圖片已下載！' : r === 'shared' ? '已分享！' : '';
    } finally {
      busy = false;
    }
  }

  async function doShareChallenge() {
    const url = challengeUrl ?? buildChallengeUrl({
      seed: duelSeed ?? `duel-${Date.now()}`, mode: 'duel',
      score: summary.score, name, count: summary.total
    });
    const r = await shareText(`⚔️ ${name} 在「ㄅㄆㄇ你會唸嗎？」拿了 ${summary.score} 分，跟你拚同一組題目，敢來嗎？\n${url}`);
    shareState = r === 'copied' ? '連結已複製，傳給朋友吧！' : r === 'shared' ? '戰帖已送出！' : '';
  }

  async function doShareDaily() {
    const grid = emojiGrid(summary.results);
    const streak = storage.getDailyStreak();
    const r = await shareText(
      `ㄅㄆㄇ你會唸嗎？每日挑戰 ${dailySeed().replace('daily-', '')}\n${grid}\n${summary.correct}/${summary.total}・${summary.score} 分・🔥連續 ${streak.count} 天\n${location.origin}`
    );
    shareState = r === 'copied' ? '成績已複製，去貼吧！' : r === 'shared' ? '已分享！' : '';
  }
</script>

<div class="screen result">
  <div class="trophy pop-in">{title.emoji}</div>
  <h2 class="title bounce-in">{title.title}</h2>
  <p class="quip">{title.quip}</p>

  {#if duelOutcome}
    <div class="card duel pop-in">
      {#if duelOutcome === 'win'}
        🏆 你贏了 <b>{challenge.name || '對手'}</b>！（{summary.score} vs {challenge.score}）
      {:else if duelOutcome === 'lose'}
        😤 輸給 <b>{challenge.name || '對手'}</b>（{summary.score} vs {challenge.score}）— 再戰一場？
      {:else}
        🤝 跟 <b>{challenge.name || '對手'}</b> 平手！（{summary.score} 分）
      {/if}
    </div>
  {/if}

  {#if modeKey === 'levels' && level}
    <div class="stars pop-in">
      {#each Array(3) as _, i}
        <span class="star" class:on={i < stars} style:animation-delay="{0.2 + i * 0.15}s">★</span>
      {/each}
    </div>
    {#if level.boss}
      <p class="boss-result">{summary.won ? `👹 ${level.bossName} 被你打爆了！` : `👹 ${level.bossName}：就這？`}</p>
    {/if}
  {/if}

  <div class="card stats bounce-in">
    <div class="stat"><b>{summary.score}</b><small>分數</small></div>
    <div class="stat"><b>{summary.correct}/{summary.total}</b><small>答對（{rate}%）</small></div>
    <div class="stat"><b>×{summary.maxCombo}</b><small>最高連擊</small></div>
  </div>

  {#if modeKey === 'daily'}
    <div class="grid-line">{emojiGrid(summary.results)}</div>
  {/if}

  <div class="actions">
    {#if modeKey === 'daily'}
      <button class="btn" onclick={doShareDaily}>📋 分享今日成績</button>
    {/if}
    {#if modeKey === 'duel' || challenge}
      <button class="btn" onclick={doShareChallenge}>⚔️ 把戰帖傳出去</button>
    {/if}
    <button class="btn mint" onclick={doShareCard} disabled={busy}>
      {busy ? '製作中…' : '📸 產生限動成績卡'}
    </button>
    {#if shareState}<p class="share-state pop-in">{shareState}</p>{/if}

    {#if modeKey === 'levels' && onNextLevel && stars > 0}
      <button class="btn" onclick={onNextLevel}>下一關 →</button>
    {/if}
    {#if modeKey !== 'daily'}
      <button class="btn ghost" onclick={onReplay}>🔄 再玩一次</button>
    {/if}
    <button class="btn ghost" onclick={onBoard}>🏅 排行榜</button>
    <button class="btn ghost" onclick={onHome}>🏠 回首頁</button>
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

  .stars { display: flex; gap: 0.5rem; font-size: 3rem; margin: 0.3rem 0 0.5rem; }
  .star { color: #e3d7ca; animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .star.on { color: var(--sun); text-shadow: 0 3px 0 rgba(216, 146, 20, 0.4); }
  .boss-result { font-weight: 800; margin: 0.2rem 0 0.6rem; }

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

  .actions { display: flex; flex-direction: column; gap: 0.7rem; width: 100%; max-width: 340px; }
  .share-state { margin: 0; color: var(--mint-deep); font-weight: 700; }
</style>
