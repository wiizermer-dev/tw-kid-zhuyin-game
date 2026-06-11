<script>
  /** 單一注音符號 — 純 SVG path（楷書外框烘焙），不依賴字型載入 */
  import { ZHUYIN_PATHS, ZHUYIN_VIEWBOX } from '../zhuyinPaths.js';
  let { char, size = 36, color = 'currentColor' } = $props();
</script>

<svg viewBox={ZHUYIN_VIEWBOX} width={size} height={size} aria-hidden="true" focusable="false">
  <path d={ZHUYIN_PATHS[char] ?? ''} fill={color} />
</svg>
