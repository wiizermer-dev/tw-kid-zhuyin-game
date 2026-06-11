<script>
  /** 直書注音 — 符號直排、聲調靠右、輕聲在頂 */
  let { zhuyin, size = '1.6rem' } = $props();

  const TONES = ['ˊ', 'ˇ', 'ˋ', '˙'];
  let symbols = $derived([...zhuyin].filter((c) => !TONES.includes(c)));
  let tone = $derived([...zhuyin].find((c) => TONES.includes(c)) ?? '');
  let neutral = $derived(tone === '˙');
</script>

<span class="zy" style:--zy-size={size}>
  {#if neutral}<span class="tone neutral">˙</span>{/if}
  <span class="stack">
    {#each symbols as s}<span class="sym">{s}</span>{/each}
  </span>
  {#if tone && !neutral}<span class="tone side">{tone}</span>{/if}
</span>

<style>
  .zy {
    display: inline-flex;
    align-items: center;
    font-family: var(--font-kai);
    line-height: 1;
    position: relative;
  }
  .stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.1em;
    font-size: var(--zy-size);
  }
  .sym { display: block; }
  /* 調號與注音同為深墨色、放大加粗，清楚可辨（對錯回饋是綠/紅外框，不會混淆） */
  .tone {
    font-family: var(--font-kai);
    font-size: calc(var(--zy-size) * 1.05);
    color: var(--ink);
    font-weight: 900;
    line-height: 0.8;
  }
  .tone.side { margin-left: 0.06em; align-self: center; }
  .tone.neutral { position: absolute; top: -0.75em; left: 50%; transform: translateX(-50%); }
</style>
