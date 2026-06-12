<script>
  /** 好友對戰入口：開房（產生注音房號）/ 輸入邀請碼 / 大廳 */
  import ZhuyinGlyph from '../components/ZhuyinGlyph.svelte';
  import { CODE_CHARS, randomZhuyinCode } from '../../lib/live.js';
  import { DUEL_DIFFICULTIES } from '../../modes.js';
  import { hasCloud } from '../../lib/backend.js';
  import { buildRoomInviteUrl } from '../../lib/challenge.js';
  import { shareText } from '../../lib/share.js';
  import { storage } from '../../core/storage.js';
  import { playClickSound } from '../../lib/audio.js';

  // isHost 由 App 持有（hoist：replay 重掛本元件後房主仍可改難度）；
  // 只有開房者能改本場難度；輸碼進來的人唯讀沿用房主設定（difficulty 由 App 權威下傳）
  let { initialCode = '', players = [], myReady = false, isHost = false, countdown = 0, difficulty = 'random', onReady, onRoom, onPlay, onHome, onDifficulty } = $props();

  // view: pick（選開房或加入）/ enter（輸碼）/ room（大廳）
  let view = $state(initialCode ? 'room' : 'pick');
  let code = $state(initialCode);
  let entered = $state([]);
  let shareState = $state('');
  let copied = $state(false);
  const difficultyList = Object.values(DUEL_DIFFICULTIES);

  function pickDifficulty(key) {
    if (!isHost) return;
    playClickSound();
    onDifficulty?.(key);   // 難度權威在 App（broadcast 全房），這裡只通知，不本地改
  }

  function inviteUrl() {
    return buildRoomInviteUrl({ room: code, name: storage.getPlayerName(), live: hasCloud ? 1 : 0 });
  }

  // 從邀請連結直接進房
  $effect(() => {
    if (initialCode && view === 'room') onRoom?.(initialCode);
  });

  let notReadyNames = $derived(players.filter((p) => !p.ready).map((p) => p.name));

  function host() {
    code = randomZhuyinCode();
    view = 'room';
    onRoom?.(code, true);   // asHost：App 記住房主身分（replay 沿用）
    onDifficulty?.(difficulty);   // 廣播房主預設難度
  }

  function tap(ch) {
    if (entered.length >= 4) return;
    playClickSound();
    entered = [...entered, ch];
    if (entered.length === 4) {
      code = entered.join('');
      view = 'room';
      onRoom?.(code);
    }
  }

  function backspace() {
    entered = entered.slice(0, -1);
  }

  async function shareInvite() {
    const name = storage.getPlayerName();
    const r = await shareText(`${name} 開了注音對戰房「${code}」。少ㄈㄏ（廢話），來ㄉ一場！\n${inviteUrl()}`);
    shareState = r === 'copied' ? '邀請已複製，傳給朋友！' : r === 'shared' ? '邀請已送出！' : '';
  }

  // 純網址複製：貼上即是連結，不含任何文字
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(inviteUrl());
      copied = true;
      shareState = '';
      setTimeout(() => (copied = false), 1800);
    } catch { /* clipboard 不可用時靜默 */ }
  }
</script>

<div class="screen">
  <header class="top">
    <button class="back" onclick={onHome} aria-label="返回">←</button>
    <h2>好友對戰</h2>
  </header>

  {#if view === 'pick'}
    <div class="picks">
      <button class="card pick bounce-in" onclick={host}>
        <span class="pick-icon grape"><ZhuyinGlyph char="ㄎ" size={30} color="var(--grape)" /></span>
        <b>我來開房</b>
        <small>系統發你一組注音房號，邀朋友進來拚同一組題</small>
      </button>
      <button class="card pick bounce-in" style:animation-delay="0.07s" onclick={() => { entered = []; view = 'enter'; }}>
        <span class="pick-icon mint"><ZhuyinGlyph char="ㄇ" size={30} color="var(--mint-deep)" /></span>
        <b>輸入邀請碼</b>
        <small>朋友報給你的四碼注音，按出來就進房</small>
      </button>
    </div>
  {:else if view === 'enter'}
    <p class="hint">按出朋友給你的四碼注音房號：</p>
    <div class="slots">
      {#each Array(4) as _, i}
        <div class="slot card" class:filled={entered[i]}>
          {#if entered[i]}<ZhuyinGlyph char={entered[i]} size={44} color="var(--ink)" />{/if}
        </div>
      {/each}
      <button class="back-key" onclick={backspace} disabled={entered.length === 0} aria-label="刪除一碼">⌫</button>
    </div>
    <div class="keypad">
      {#each CODE_CHARS as ch, i}
        <button
          class="key"
          class:g1={i < 21}
          class:g2={i >= 21 && i < 24}
          class:g3={i >= 24}
          style:--tilt="{((i * 7) % 5) - 2}deg"
          onclick={() => tap(ch)}
          aria-label="注音 {ch}"
        >
          <ZhuyinGlyph char={ch} size={30} color="currentColor" />
        </button>
      {/each}
    </div>
    <p class="key-legend">
      <span class="dot g1"></span>聲母
      <span class="dot g2"></span>介音
      <span class="dot g3"></span>韻母
    </p>
  {:else}
    <p class="hint">房號（唸出來給朋友，或直接傳邀請）：</p>
    <div class="slots big">
      {#each [...code] as ch, i}
        <div class="slot card filled pop-in" style:animation-delay="{i * 0.08}s">
          <ZhuyinGlyph char={ch} size={52} color="var(--berry-deep)" />
        </div>
      {/each}
    </div>

    <div class="invite-row">
      <button class="btn invite" onclick={shareInvite}>傳邀請給朋友</button>
      <button class="btn mint copy" onclick={copyLink}>{copied ? '已複製 ✓' : '複製連結'}</button>
    </div>
    {#if shareState}<p class="share-state pop-in">{shareState}</p>{/if}

    {#if hasCloud || isHost}
      <div class="card diff-card">
        <b>本場難度{isHost ? '（你決定）' : '（房主決定）'}</b>
        <div class="diff-grid" class:readonly={!isHost}>
          {#each difficultyList as d}
            <button
              class="diff-opt"
              class:active={difficulty === d.key}
              disabled={!isHost}
              onclick={() => pickDifficulty(d.key)}
            >
              <span class="diff-label">{d.label}</span>
              <small>{d.blurb}</small>
            </button>
          {/each}
        </div>
      </div>
    {/if}

    {#if hasCloud}
      <div class="card lobby">
        <b>房裡的人（{players.length}）</b>
        <div class="chips">
          {#each players as p (p.id)}
            <span class="chip pop-in" class:ready={p.ready}>{p.name}{p.ready ? ' ✓' : ''}</span>
          {:else}
            <span class="waiting">等朋友進房中…</span>
          {/each}
        </div>
        <small>
          {#if players.length < 2}至少要兩個人才能開打，快把邀請傳出去！
          {:else if myReady && notReadyNames.length > 0}等 {notReadyNames.join('、')} 按準備…可以開始催了
          {:else}所有人都按「準備好了」就會倒數開戰！
          {/if}
        </small>
      </div>
      <button class="btn start" class:mint={!myReady} onclick={onReady} disabled={players.length < 2}>
        {myReady ? '取消準備' : '我準備好了！'}
      </button>
    {:else}
      <p class="note">大家輸入同一個房號就會拿到同一組題目，各自打完比分數；唸錯的請喝飲料</p>
      <button class="btn mint start" onclick={() => onPlay(code, difficulty)}>開始對戰</button>
    {/if}
  {/if}

  {#if countdown > 0}
    <div class="countdown-overlay">
      {#key countdown}
        <div class="count pop-in">{countdown}</div>
      {/key}
      <p class="count-hint">準備開戰！</p>
    </div>
  {/if}
</div>

<style>
  .top { display: flex; align-items: center; gap: 0.8rem; }
  .top h2 { font-family: var(--font-kai); margin: 0; }
  .back {
    background: #fff; width: 38px; height: 38px; border-radius: 50%;
    font-size: 1.1rem; color: var(--ink-soft); box-shadow: var(--shadow-card);
  }
  .hint { color: var(--ink-soft); margin: 1rem 0 0.8rem; }

  .picks { display: flex; flex-direction: column; gap: 0.9rem; margin-top: 1.2rem; }
  .pick { padding: 1.4rem; display: flex; flex-direction: column; gap: 0.4rem; align-items: center; text-align: center; }
  .pick-icon {
    width: 56px; height: 56px;
    display: grid; place-items: center;
    border-radius: 18px;
  }
  .pick-icon.grape { background: color-mix(in srgb, var(--grape) 14%, white); }
  .pick-icon.mint { background: color-mix(in srgb, var(--mint) 16%, white); }
  .pick b { font-size: 1.15rem; }
  .pick small { color: var(--ink-soft); }

  .slots { display: flex; gap: 0.6rem; align-items: center; justify-content: center; }
  .slot {
    width: 64px; height: 64px;
    display: grid; place-items: center;
    border: 2.5px dashed #e3d3c2;
  }
  .slot.filled { border-style: solid; border-color: var(--mint); }
  .slots.big .slot { width: 76px; height: 76px; }
  .back-key {
    background: #fff; width: 44px; height: 44px; border-radius: 50%;
    font-size: 1.1rem; box-shadow: var(--shadow-card); color: var(--ink-soft);
  }
  .back-key:disabled { opacity: 0.35; }

  .keypad {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    margin-top: 1rem;
  }
  /* 糖果按鍵：分組粉彩 + 厚底陰影 + 手作感微旋轉，按下去會「咬」一下 */
  .key {
    aspect-ratio: 1;
    display: grid; place-items: center;
    padding: 0;
    border-radius: 18px;
    transform: rotate(var(--tilt, 0deg));
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .key.g1 { background: #fff; color: var(--ink); box-shadow: 0 3px 0 #ecdfd2, var(--shadow-card); }
  .key.g2 { background: #e9fbf8; color: var(--mint-deep); box-shadow: 0 3px 0 #c4ebe5, var(--shadow-card); }
  .key.g3 { background: #fff4e3; color: #c77f1b; box-shadow: 0 3px 0 #f3ddb9, var(--shadow-card); }
  .key:active { transform: rotate(var(--tilt, 0deg)) scale(0.85) translateY(2px); }
  .key:hover { transform: rotate(0deg) scale(1.08); }

  .key-legend {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    color: var(--ink-soft);
    font-size: 0.78rem;
    margin-top: 0.8rem;
  }
  .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-left: 0.5rem; }
  .dot.g1 { background: #fff; box-shadow: inset 0 0 0 2px #ecdfd2; }
  .dot.g2 { background: #bdeee6; }
  .dot.g3 { background: #f6dcae; }

  .invite-row { display: flex; gap: 0.6rem; justify-content: center; margin-top: 1.2rem; flex-wrap: wrap; }
  .invite-row .btn { flex: 0 1 auto; }
  .share-state { text-align: center; color: var(--mint-deep); font-weight: 700; margin: 0.5rem 0 0; }

  .diff-card { margin-top: 1.2rem; padding: 1rem 1.1rem; display: flex; flex-direction: column; gap: 0.7rem; }
  .diff-card > b { font-size: 1rem; }
  .diff-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem; }
  .diff-opt {
    display: flex; flex-direction: column; gap: 0.15rem; align-items: flex-start;
    padding: 0.6rem 0.8rem; border-radius: 14px;
    background: var(--paper); color: var(--ink);
    box-shadow: 0 2px 0 #ecdfd2; text-align: left;
    transition: transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .diff-opt:active { transform: scale(0.94); }
  .diff-opt.active {
    background: #f3ecff; color: var(--grape);
    box-shadow: 0 0 0 2px var(--grape) inset;
  }
  .diff-label { font-weight: 800; font-size: 1.05rem; }
  .diff-opt small { color: var(--ink-soft); }
  .diff-opt.active small { color: color-mix(in srgb, var(--grape) 70%, var(--ink-soft)); }
  .diff-grid.readonly .diff-opt:not(.active) { opacity: 0.5; }
  .diff-opt:disabled { cursor: default; }

  .lobby { margin-top: 1.2rem; padding: 1rem 1.1rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .chip { background: var(--paper); border-radius: 999px; padding: 0.3rem 0.8rem; font-weight: 700; }
  .chip.ready { background: #e9fbf3; color: var(--mint-deep); box-shadow: 0 0 0 2px var(--mint) inset; }

  .countdown-overlay {
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-content: center;
    gap: 0.4rem;
    background: rgba(61, 44, 41, 0.55);
    backdrop-filter: blur(4px);
  }
  .count {
    font-size: 7rem;
    font-weight: 900;
    color: #fff;
    text-align: center;
    text-shadow: 0 6px 0 rgba(0, 0, 0, 0.2);
  }
  .count-hint { color: #fff; font-weight: 800; text-align: center; margin: 0; }
  .waiting { color: var(--ink-soft); }
  .lobby small { color: var(--ink-soft); }
  .note { color: var(--ink-soft); margin-top: 1.2rem; text-align: center; }

  .start { margin: 1.4rem auto 0; display: flex; font-size: 1.15rem; padding: 1rem 2.4rem; }
</style>
