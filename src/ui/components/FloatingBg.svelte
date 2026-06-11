<script>
  /** 漂浮注音符號背景 */
  const GLYPHS = ['ㄅ', 'ㄆ', 'ㄇ', 'ㄈ', 'ㄉ', 'ㄋ', 'ㄍ', 'ㄎ', 'ㄏ', 'ㄓ', 'ㄔ', 'ㄕ', 'ㄗ', 'ㄙ', 'ㄞ', 'ㄠ', 'ㄢ', 'ㄤ', 'ㄥ', 'ㄦ'];
  const COLORS = ['rgba(255,107,107,0.12)', 'rgba(78,205,196,0.14)', 'rgba(255,179,71,0.14)', 'rgba(167,139,250,0.12)'];

  const items = GLYPHS.map((g, i) => ({
    g,
    left: (i * 53 + 7) % 100,
    top: (i * 37 + 11) % 100,
    size: 2 + ((i * 13) % 30) / 10,
    rot: ((i * 47) % 50) - 25,
    delay: (i % 7) * -0.9,
    color: COLORS[i % COLORS.length]
  }));
</script>

<div class="floaty" aria-hidden="true">
  {#each items as it}
    <span
      style:left="{it.left}%"
      style:top="{it.top}%"
      style:font-size="{it.size}rem"
      style:color={it.color}
      style:--rot="{it.rot}deg"
      style:animation-delay="{it.delay}s">{it.g}</span>
  {/each}
</div>
