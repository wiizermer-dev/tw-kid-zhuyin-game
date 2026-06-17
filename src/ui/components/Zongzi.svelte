<script>
  /** Q 版粽子 — 全 event 唯一粽子資產（arcade / 進度鉤 / result / 結局 / 分享卡共用）。
      手繪三角粽：粽葉 reed 綠包裹、米色尖角、綁繩。禁 emoji 糰子。 */
  let {
    size = 48,
    reed = '#5BA86B',       // 艾草／粽葉綠（§5.1 --reed）
    reedDeep = '#3E8A52',   // 深粽葉（陰影面）
    rice = '#F3E4C0',       // 糯米米白尖角
    tie = '#C97B3A',        // 綁繩（§5.1 --zong 粽葉烤糯米褐）
  } = $props();
</script>

<svg viewBox="0 0 100 100" width={size} height={size}
     aria-hidden="true" focusable="false" style="display:block;overflow:visible">
  <!-- 圓潤三角粽身：頂尖、底寬，candy 調性圓角 -->
  <path d="M50 12
           C58 12 62 18 70 34
           C78 50 86 64 86 74
           C86 86 70 92 50 92
           C30 92 14 86 14 74
           C14 64 22 50 30 34
           C38 18 42 12 50 12 Z"
        fill={reed} stroke={reedDeep} stroke-width="3" stroke-linejoin="round" />
  <!-- 粽葉摺面（深綠，左下三角，立體感） -->
  <path d="M50 12 C42 12 38 18 30 34 C24 46 18 58 16 68
           C30 70 42 64 48 50 C52 40 52 24 50 12 Z"
        fill={reedDeep} opacity="0.55" />
  <!-- 露出的米白尖角（底緣探出的糯米） -->
  <path d="M34 80 C40 88 46 90 50 90 C54 90 60 88 66 80
           C58 84 42 84 34 80 Z"
        fill={rice} stroke={tie} stroke-width="1.5" stroke-linejoin="round" opacity="0.95" />
  <!-- 綁繩：橫向一圈 + 打結 -->
  <path d="M22 56 C40 64 60 64 78 56" fill="none"
        stroke={tie} stroke-width="4.5" stroke-linecap="round" />
  <path d="M48 58 L44 50 M52 58 L56 50" fill="none"
        stroke={tie} stroke-width="3.5" stroke-linecap="round" />
  <!-- 高光點（果凍感） -->
  <ellipse cx="60" cy="30" rx="6" ry="9" fill="#fff" opacity="0.28"
           transform="rotate(20 60 30)" />
</svg>
