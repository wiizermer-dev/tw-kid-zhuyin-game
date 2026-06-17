<script>
  /** 端午版漂浮背景 — 注音漂浮字升級成手繪 SVG 小圖（粽子/龍舟/艾草/香包）。
      比照 FloatingBg 的決定性排布 + float-slow keyframe，低透明度純裝飾。 */
  import DuanwuIcon from './DuanwuIcon.svelte';
  import Zongzi from './Zongzi.svelte';

  // 漂浮元素：粽子(Zongzi) + 4 種 DuanwuIcon，交錯鋪滿
  const KINDS = ['zongzi', 'boat', 'reed', 'sachet', 'zongzi', 'boat', 'reed', 'sachet', 'zongzi', 'boat'];

  const items = KINDS.map((kind, i) => ({
    kind,
    left: (i * 53 + 7) % 100,
    top: (i * 37 + 11) % 100,
    size: 30 + ((i * 13) % 30),
    rot: ((i * 47) % 50) - 25,
    delay: (i % 7) * -0.9,
    opacity: 0.1 + ((i * 7) % 8) / 100
  }));
</script>

<div class="floaty" aria-hidden="true">
  {#each items as it}
    <span
      style:left="{it.left}%"
      style:top="{it.top}%"
      style:--rot="{it.rot}deg"
      style:opacity={it.opacity}
      style:animation-delay="{it.delay}s">
      {#if it.kind === 'zongzi'}
        <Zongzi size={it.size} />
      {:else}
        <DuanwuIcon name={it.kind} size={it.size} />
      {/if}
    </span>
  {/each}
</div>
