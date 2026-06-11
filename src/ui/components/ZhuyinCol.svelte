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
  .tone {
    font-size: calc(var(--zy-size) * 0.8);
    color: var(--berry-deep);
    font-weight: bold;
  }
  .tone.side { margin-left: 0.08em; align-self: center; }
  .tone.neutral { position: absolute; top: -0.9em; left: 50%; transform: translateX(-50%); }
</style>
