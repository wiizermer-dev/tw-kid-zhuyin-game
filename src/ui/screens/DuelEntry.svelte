<script>
  /** 好友對戰入口：開房（產生注音房號）/ 輸入邀請碼 / 大廳 */
  import ZhuyinGlyph from '../components/ZhuyinGlyph.svelte';
  import { CODE_CHARS, randomZhuyinCode } from '../../lib/live.js';
  import { hasCloud } from '../../lib/backend.js';
  import { buildRoomInviteUrl } from '../../lib/challenge.js';
  import { shareText } from '../../lib/share.js';
  import { storage } from '../../core/storage.js';
  import { playClickSound } from '../../lib/audio.js';

  let { initialCode = '', players = [], onRoom, onPlay, onHome } = $props();

  // view: pick（選開房或加入）/ enter（輸碼）/ room（大廳）
  let view = $state(initialCode ? 'room' : 'pick');
  let code = $state(initialCode);
  let entered = $state([]);
  let shareState = $state('');

  // 從邀請連結直接進房
  $effect(() => {
    if (initialCode && view === 'room') onRoom?.(initialCode);
  });

  function host() {
    code = randomZhuyinCode();
    view = 'room';
    onRoom?.(code);
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
    const url = buildRoomInviteUrl({ room: code, name, live: hasCloud ? 1 : 0 });
    const r = await shareText(`${name} 開了注音對戰房「${code}」。少ㄈㄏ（廢話），來ㄉ一場！\n${url}`);
    shareState = r === 'copied' ? '邀請已複製，傳給朋友！' : r === 'shared' ? '邀請已送出！' : '';
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

    <button class="btn invite" onclick={shareInvite}>傳邀請給朋友</button>
    {#if shareState}<p class="share-state pop-in">{shareState}</p>{/if}

    {#if hasCloud}
      <div class="card lobby">
        <b>房裡的人（{players.length}）</b>
        <div class="chips">
          {#each players as p}
            <span class="chip pop-in">{p}</span>
          {:else}
            <span class="waiting">等朋友進房中…</span>
          {/each}
        </div>
        <small>人到齊後任何人按開始，全房同時開打！</small>
      </div>
    {:else}
      <p class="note">大家輸入同一個房號就會拿到同一組題目，各自打完比分數；唸錯的請喝飲料</p>
    {/if}

    <button class="btn mint start" onclick={() => onPlay(code)}>開始對戰</button>
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

  .invite { margin: 1.2rem auto 0; display: flex; }
  .share-state { text-align: center; color: var(--mint-deep); font-weight: 700; margin: 0.5rem 0 0; }

  .lobby { margin-top: 1.2rem; padding: 1rem 1.1rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .chip { background: var(--paper); border-radius: 999px; padding: 0.3rem 0.8rem; font-weight: 700; }
  .waiting { color: var(--ink-soft); }
  .lobby small { color: var(--ink-soft); }
  .note { color: var(--ink-soft); margin-top: 1.2rem; text-align: center; }

  .start { margin: 1.4rem auto 0; display: flex; font-size: 1.15rem; padding: 1rem 2.4rem; }
</style>
