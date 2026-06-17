<script>
  /** 端午手繪 SVG 圖標庫 — 全 event 共用（入口卡 / 地圖站點 / 漂浮背景 / 答題皮膚）。
      品味對齊 Zongzi.svelte：圓潤 candy 調、立體摺面、果凍高光、props 化顏色、viewBox 100×100。
      name: boat | reed | sachet | egg | zhongkui | wine
      禁 emoji — 核心識別物一律手繪 SVG（spec §3 Codex #9 + user 指示）。 */
  let {
    name,
    size = 48,
    reed = 'var(--reed, #5BA86B)',
    reedDeep = 'var(--reed-deep, #3E8A52)',
    river = 'var(--river, #3FA7C4)',
    riverDeep = 'var(--river-deep, #2E8AA6)',
    zong = 'var(--zong, #C97B3A)',
    cinnabar = 'var(--cinnabar, #E5544A)',
    ink = 'var(--ink, #3D2C29)',
  } = $props();
</script>

<svg viewBox="0 0 100 100" width={size} height={size}
     aria-hidden="true" focusable="false" style="display:block;overflow:visible">
  {#if name === 'boat'}
    <!-- 龍舟：龍頭 + 船身剪影 + 水波，順水而下 -->
    <!-- 水波底 -->
    <path d="M6 78 C20 72 28 84 42 78 C56 72 64 84 78 78 C88 73 92 76 96 78"
          fill="none" stroke={river} stroke-width="4" stroke-linecap="round" opacity="0.55" />
    <!-- 船身（彎月形龍舟） -->
    <path d="M14 60 C30 74 70 74 90 58 C84 70 70 78 50 78 C32 78 20 72 14 60 Z"
          fill={cinnabar} stroke={ink} stroke-width="2.5" stroke-linejoin="round" />
    <!-- 船身木紋條 -->
    <path d="M24 66 C40 73 62 72 80 63" fill="none" stroke="#fff" stroke-width="2.5"
          stroke-linecap="round" opacity="0.45" />
    <!-- 龍頭（船首昂起） -->
    <path d="M86 58 C92 52 94 44 90 38 C96 40 99 47 96 54 C99 53 100 58 95 60
             C92 62 88 61 86 58 Z" fill={reed} stroke={ink} stroke-width="2.5" stroke-linejoin="round" />
    <!-- 龍角 + 眼 -->
    <path d="M90 40 C90 34 94 33 95 36" fill="none" stroke={ink} stroke-width="2.5" stroke-linecap="round" />
    <circle cx="90" cy="46" r="2.4" fill={ink} />
    <!-- 龍舟槳/旗桿 -->
    <path d="M42 60 L40 44 M58 60 L60 44" fill="none" stroke={zong} stroke-width="3.2" stroke-linecap="round" />
    <!-- 小旗 -->
    <path d="M40 44 L33 46 L40 50 Z" fill={cinnabar} stroke={ink} stroke-width="1.5" stroke-linejoin="round" />
    <!-- 果凍高光 -->
    <ellipse cx="38" cy="64" rx="7" ry="3" fill="#fff" opacity="0.3" />

  {:else if name === 'reed'}
    <!-- 艾草／菖蒲葉束：細長劍葉 + 綁繩 -->
    <path d="M50 88 C44 64 40 40 38 14 C44 38 48 62 50 86 Z" fill={reed} stroke={reedDeep} stroke-width="2" stroke-linejoin="round" />
    <path d="M50 88 C52 62 56 38 62 14 C58 40 54 64 50 86 Z" fill={reed} stroke={reedDeep} stroke-width="2" stroke-linejoin="round" />
    <path d="M50 88 C49 60 49 34 50 10 C51 34 51 60 50 88 Z" fill={reedDeep} stroke={reedDeep} stroke-width="1.5" />
    <!-- 左右菖蒲短葉 -->
    <path d="M50 84 C40 70 28 58 22 40 C34 56 46 68 50 82 Z" fill={reed} stroke={reedDeep} stroke-width="2" stroke-linejoin="round" opacity="0.92" />
    <path d="M50 84 C60 70 72 58 78 40 C66 56 54 68 50 82 Z" fill={reed} stroke={reedDeep} stroke-width="2" stroke-linejoin="round" opacity="0.92" />
    <!-- 綁繩 -->
    <path d="M40 82 C50 86 50 86 60 82" fill="none" stroke={zong} stroke-width="5" stroke-linecap="round" />
    <path d="M48 84 L45 90 M52 84 L55 90" fill="none" stroke={zong} stroke-width="3.5" stroke-linecap="round" />
    <ellipse cx="44" cy="40" rx="3" ry="8" fill="#fff" opacity="0.22" transform="rotate(20 44 40)" />

  {:else if name === 'sachet'}
    <!-- 香包（香囊）：圓潤紅布囊袋 + 金線刺繡 + 束口結 + 飄垂流蘇穗 -->
    <!-- 吊繩 + 頂結（加粗，看得清） -->
    <path d="M50 6 C45 12 45 16 50 20 M50 6 C55 12 55 16 50 20" fill="none" stroke={zong} stroke-width="3.5" stroke-linecap="round" />
    <circle cx="50" cy="20" r="3.5" fill={zong} />
    <!-- 囊袋身（圓鼓布袋，上窄下圓） -->
    <path d="M50 22 C66 22 78 34 78 50 C78 68 65 78 50 78 C35 78 22 68 22 50 C22 34 34 22 50 22 Z"
          fill={cinnabar} stroke={ink} stroke-width="2.5" stroke-linejoin="round" />
    <!-- 束口（袋口收緊，深色折一圈） -->
    <path d="M34 28 C42 34 58 34 66 28" fill="none" stroke="#C0392F" stroke-width="5" stroke-linecap="round" />
    <path d="M40 26 C44 30 56 30 60 26" fill="none" stroke={zong} stroke-width="3" stroke-linecap="round" />
    <!-- 金線刺繡如意紋（reed 綠 + 金邊） -->
    <path d="M50 40 C43 40 41 47 48 51 C41 51 41 60 50 60 C59 60 59 51 52 51 C59 47 57 40 50 40 Z"
          fill={reed} stroke="#E8C24A" stroke-width="2" stroke-linejoin="round" />
    <circle cx="50" cy="50" r="2.5" fill="#E8C24A" />
    <!-- 流蘇穗（三條，明顯飄垂 + 穗頭結） -->
    <path d="M40 78 C39 86 38 92 38 98 M50 78 L50 100 M60 78 C61 86 62 92 62 98"
          fill="none" stroke={zong} stroke-width="3" stroke-linecap="round" />
    <ellipse cx="38" cy="99" rx="3" ry="4" fill={zong} /><ellipse cx="50" cy="100" rx="3" ry="4" fill={zong} /><ellipse cx="62" cy="99" rx="3" ry="4" fill={zong} />
    <!-- 布料果凍高光 -->
    <ellipse cx="64" cy="40" rx="5" ry="9" fill="#fff" opacity="0.3" transform="rotate(22 64 40)" />

  {:else if name === 'egg'}
    <!-- 立蛋：直立的蛋 + 小碗底座 + 平衡光暈 -->
    <!-- 碗底座 -->
    <path d="M28 82 C28 76 40 73 50 73 C60 73 72 76 72 82 C72 88 60 91 50 91 C40 91 28 88 28 82 Z"
          fill={river} stroke={riverDeep} stroke-width="2.5" stroke-linejoin="round" />
    <path d="M32 80 C40 83 60 83 68 80" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.4" />
    <!-- 直立的蛋 -->
    <ellipse cx="50" cy="46" rx="20" ry="28" fill="#FBEFD6" stroke={zong} stroke-width="2.5" />
    <!-- 蛋的暖影 -->
    <path d="M58 24 C68 32 70 52 60 66 C66 50 64 34 56 24 Z" fill={zong} opacity="0.18" />
    <!-- 平衡光暈線（科學破迷思的小巧思） -->
    <path d="M50 73 L50 80" fill="none" stroke={cinnabar} stroke-width="2" stroke-dasharray="2 3" stroke-linecap="round" opacity="0.7" />
    <ellipse cx="44" cy="36" rx="5" ry="10" fill="#fff" opacity="0.5" transform="rotate(-12 44 36)" />

  {:else if name === 'zhongkui'}
    <!-- 鍾馗：威儀國字臉 + 怒眉瞪眼 + 虯髯黑鬍 + 烏紗官帽，端午鎮煞捉鬼神 -->
    <!-- 烏紗帽（黑帽 + 兩側帽翅 reed 綠帽珠） -->
    <path d="M28 32 C30 16 70 16 72 32 C72 30 66 22 50 22 C34 22 28 30 28 32 Z"
          fill={ink} stroke={ink} stroke-width="2" stroke-linejoin="round" />
    <path d="M50 16 L50 11" stroke={ink} stroke-width="3" stroke-linecap="round" />
    <circle cx="50" cy="10" r="3" fill={cinnabar} />
    <path d="M30 30 L14 27 M70 30 L86 27" fill="none" stroke={ink} stroke-width="4.5" stroke-linecap="round" />
    <ellipse cx="13" cy="27" rx="4" ry="3.5" fill={reed} /><ellipse cx="87" cy="27" rx="4" ry="3.5" fill={reed} />
    <!-- 國字臉（方正威儀，下巴寬） -->
    <path d="M32 40 C32 30 38 26 50 26 C62 26 68 30 68 40 C68 54 64 64 56 70 C52 73 48 73 44 70 C36 64 32 54 32 40 Z"
          fill="#EBB87E" stroke={ink} stroke-width="2.5" stroke-linejoin="round" />
    <!-- 怒眉（八字上揚劍眉，鍾馗威） -->
    <path d="M34 42 C40 36 46 38 49 43 M66 42 C60 36 54 38 51 43" fill="none" stroke={ink} stroke-width="4" stroke-linecap="round" />
    <!-- 瞪眼 -->
    <circle cx="43" cy="47" r="3" fill={ink} /><circle cx="57" cy="47" r="3" fill={ink} />
    <!-- 鼻 -->
    <path d="M50 49 L50 56 C48 58 52 58 50 56" fill="none" stroke={ink} stroke-width="2" stroke-linecap="round" />
    <!-- 八字鬍（鼻下兩撇，貼著嘴上沿，不外翹） -->
    <path d="M50 57 C46 58 43 60 41 63 M50 57 C54 58 57 60 59 63" fill="none" stroke={ink} stroke-width="3" stroke-linecap="round" />
    <!-- 虯髯絡腮黑鬍（飽滿整片包下巴，鍾馗威儀） -->
    <path d="M35 52 C34 64 40 75 50 78 C60 75 66 64 65 52
             C63 62 58 66 56 70 C53 73 47 73 44 70 C42 66 37 62 35 52 Z" fill={ink} />
    <!-- 臉頰高光 -->
    <ellipse cx="62" cy="40" rx="3" ry="6" fill="#fff" opacity="0.3" transform="rotate(20 62 40)" />

  {:else if name === 'wine'}
    <!-- 雄黃酒：圓肚酒杯 + 滿杯琥珀橙黃酒液 + 飄香，端午一眼認出「一杯黃酒」 -->
    <!-- 飄香線（酒氣，先畫在杯後） -->
    <path d="M40 30 C37 24 43 21 40 15 M60 30 C63 24 57 21 60 15" fill="none"
          stroke={zong} stroke-width="2.5" stroke-linecap="round" opacity="0.5" />
    <!-- 杯身（圓肚高腳杯，candy 圓潤） -->
    <path d="M24 38 C24 36 76 36 76 38 C75 56 66 70 50 72 C34 70 25 56 24 38 Z"
          fill="#F3EAD6" stroke={ink} stroke-width="2.5" stroke-linejoin="round" />
    <!-- 高腳底座 -->
    <path d="M50 72 L50 84 M38 88 C42 84 58 84 62 88" fill="none"
          stroke={ink} stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- 滿杯琥珀橙黃酒液（飽滿、佔大半杯） -->
    <path d="M28 42 C40 47 60 47 72 42 C70 58 62 68 50 69 C38 68 30 58 28 42 Z"
          fill="#E8A23A" stroke="#C97B3A" stroke-width="1.5" stroke-linejoin="round" />
    <!-- 酒液深色底影（立體） -->
    <path d="M34 58 C40 65 60 65 66 58 C60 67 40 67 34 58 Z" fill={zong} opacity="0.45" />
    <!-- 酒面高光帶 -->
    <ellipse cx="50" cy="44" rx="20" ry="3.5" fill="#fff" opacity="0.5" />
    <!-- 杯緣口 -->
    <path d="M24 38 C24 34 76 34 76 38" fill="none" stroke={ink} stroke-width="2.5" stroke-linecap="round" />
    <!-- 杯身果凍高光 -->
    <ellipse cx="34" cy="48" rx="3.5" ry="9" fill="#fff" opacity="0.4" transform="rotate(-8 34 48)" />
    <!-- cinnabar 雄黃點（液面浮一抹硃砂，端午避邪符號） -->
    <circle cx="58" cy="46" r="3" fill={cinnabar} opacity="0.85" />
  {/if}
</svg>
