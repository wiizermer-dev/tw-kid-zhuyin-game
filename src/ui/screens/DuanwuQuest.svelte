<script>
  /** 端午王關卡選擇 — S 形江水地圖：龍舟順汨羅江而下，5 站闖到救屈原終點。
      複製 Levels 的 unlocked/toast 骨架，但路徑改地圖感（spec §5.2 三層階層 + user：地圖感）。
      進度資料對齊 storage.getDuanwuProgress 的 clearedLevels 形狀（T3 純函式做好直接接）。 */
  import { DUANWU_LEVELS } from '../../modes.js';
  import { storage } from '../../core/storage.js';
  import DuanwuIcon from '../components/DuanwuIcon.svelte';
  import Zongzi from '../components/Zongzi.svelte';

  let { onPick, onHome } = $props();

  let progress = $derived(storage.getDuanwuProgress());
  let cleared = $derived(progress.clearedLevels ?? []);
  let clearedCount = $derived(cleared.length);
  let zongziTotal = $derived(clearedCount * 10);

  let shakeN = $state(0);
  let toastMsg = $state('');
  let toastTimer = null;

  // 每站對應的手繪 icon（各不重複、貼主題）
  const STATION_ICON = { quyuan: 'reed', boat: 'boat', zongzi: 'zongzi', poem: 'wine', king: 'sachet' };

  // S 形江水座標（viewBox 0..100 寬，依關序之字形排，手機直向順）
  const NODE_X = [26, 72, 26, 72, 50];          // 左右交錯，第 5 站置中收束
  const ROW_H = 116;                            // 每站垂直間距(px)
  const PATH_TOP = 70;                          // 第一站 y(px)

  function isCleared(level) { return cleared.includes(level.n); }
  function isUnlocked(level) {
    if (level.n === 1) return true;
    return cleared.includes(level.n - 1);
  }
  function isCurrent(level) { return isUnlocked(level) && !isCleared(level); }

  function tryPick(level) {
    if (isUnlocked(level)) return onPick(level);
    shakeN = level.n;
    toastMsg = `先通過第 ${level.n - 1} 關！`;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { shakeN = 0; toastMsg = ''; }, 1600);
  }

  // 地圖總高度（含終點站）
  const mapHeight = $derived(PATH_TOP + DUANWU_LEVELS.length * ROW_H + 40);
  // S 形江水 path 字串（依 NODE_X 用 cubic bezier 蛇行串起各站 + 終點）
  const xs = [...NODE_X, 50];
  const ys = DUANWU_LEVELS.map((_, i) => PATH_TOP + i * ROW_H).concat(PATH_TOP + DUANWU_LEVELS.length * ROW_H);
  const riverPath = xs.map((x, i) => {
    if (i === 0) return `M ${x} ${ys[i]}`;
    const px = xs[i - 1], py = ys[i - 1];
    const my = (py + ys[i]) / 2;
    return `C ${px} ${my}, ${x} ${my}, ${x} ${ys[i]}`;
  }).join(' ');
</script>

<div class="screen quest">
  <header class="top">
    <button class="back" onclick={onHome} aria-label="返回">←</button>
    <h2>端午王</h2>
  </header>

  <!-- ① 進度鉤 hero（情緒錨，艾草綠底，不可點） -->
  <div class="progress-hook bounce-in">
    <span class="ph-zongzi"><Zongzi size={44} /></span>
    <div class="ph-text">
      <b class="ph-count">{zongziTotal}<span>/50</span></b>
      <small>
        {#if clearedCount >= 5}你救出屈原了！{:else}還差 {5 - clearedCount} 關救屈原{/if}
      </small>
    </div>
    <div class="ph-meter" aria-hidden="true"><i style:width="{(zongziTotal / 50) * 100}%"></i></div>
  </div>

  {#if toastMsg}<div class="toast pop-in">{toastMsg}</div>{/if}

  <!-- ② S 形江水地圖（主體） -->
  <div class="map" style:height="{mapHeight}px">
    <svg class="river" viewBox="0 0 100 {mapHeight}" preserveAspectRatio="none" aria-hidden="true">
      <!-- 江水底（淡） -->
      <path d={riverPath} fill="none" stroke="color-mix(in srgb, var(--river) 22%, white)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
      <!-- 已點亮段（過關進度） -->
      <path d={riverPath} fill="none" stroke="var(--river)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"
            stroke-dasharray="1000" stroke-dashoffset={1000 - (clearedCount / DUANWU_LEVELS.length) * 1000}
            style="transition: stroke-dashoffset 0.6s ease" opacity="0.85" />
    </svg>

    {#each DUANWU_LEVELS as level, i}
      {@const unlocked = isUnlocked(level)}
      {@const done = isCleared(level)}
      {@const current = isCurrent(level)}
      <button
        class="station bounce-in"
        class:done class:current class:locked={!unlocked}
        class:shake={shakeN === level.n}
        style:left="{NODE_X[i]}%"
        style:top="{PATH_TOP + i * ROW_H}px"
        style:animation-delay="{i * 0.06}s"
        onclick={() => tryPick(level)}
      >
        <span class="st-medal">
          {#if level.chapter === 'zongzi'}<Zongzi size={52} />{:else}<DuanwuIcon name={STATION_ICON[level.chapter]} size={54} />{/if}
          {#if done}<span class="st-check" aria-hidden="true">✓</span>{/if}
          {#if !unlocked}<span class="st-lock" aria-hidden="true">🔒</span>{/if}
        </span>
        <span class="st-label">
          <b>{level.n}・{level.name}</b>
          <small>{level.count} 題{#if current}・點我開始{/if}</small>
        </span>
      </button>
    {/each}

    <!-- 終點：救屈原（圓心對齊 path 終點 x=50%） -->
    <div class="station finale" class:reached={clearedCount >= 5}
         style:left="50%" style:top="{PATH_TOP + DUANWU_LEVELS.length * ROW_H}px">
      <span class="st-medal finale-medal">
        <span class="finale-glyph">屈</span>
      </span>
      <span class="st-label"><b>救屈原</b><small>{clearedCount >= 5 ? '達成！' : '5 關全破解鎖'}</small></span>
    </div>
  </div>
</div>

<style>
  .top { display: flex; align-items: center; gap: 0.8rem; }
  .top h2 { font-family: var(--font-kai); margin: 0; color: var(--reed-deep); }
  .back {
    background: #fff; width: 38px; height: 38px; border-radius: 50%;
    font-size: 1.1rem; color: var(--ink-soft); box-shadow: var(--shadow-card);
  }

  /* ① 進度鉤 hero */
  .progress-hook {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas: "zongzi text" "meter meter";
    align-items: center;
    gap: 0.3rem 0.9rem;
    padding: 0.9rem 1.1rem;
    margin: 0.7rem 0 0.4rem;
    border-radius: var(--radius);
    background: linear-gradient(135deg, color-mix(in srgb, var(--reed) 16%, white), color-mix(in srgb, var(--reed) 8%, white));
    border: 2.5px solid color-mix(in srgb, var(--reed) 40%, white);
    box-shadow: var(--shadow-card);
  }
  .ph-zongzi { grid-area: zongzi; animation: float-slow 4s ease-in-out infinite; }
  .ph-text { grid-area: text; display: flex; flex-direction: column; gap: 0.05rem; }
  .ph-count { font-family: var(--font-kai); font-size: 1.9rem; line-height: 1; color: var(--zong); }
  .ph-count span { font-size: 1rem; color: var(--ink-soft); }
  .ph-text small { color: var(--reed-deep); font-weight: 700; font-size: 0.9rem; }
  .ph-meter { grid-area: meter; height: 12px; background: #fff; border-radius: 999px; overflow: hidden; margin-top: 0.3rem; }
  .ph-meter > i { display: block; height: 100%; border-radius: 999px;
    background: linear-gradient(90deg, var(--reed), var(--zong)); transition: width 0.5s ease; }

  /* ② 地圖 */
  .map { position: relative; margin-top: 0.6rem; }
  .river { position: absolute; inset: 0; width: 100%; height: 100%; }

  /* 定位錨點 = medal 圓心（對齊 river path 的節點座標）。
     medal translate(-50%,-50%) 居中於 left%/top；label 絕對定位掛 medal 下方，不影響圓心。 */
  .station {
    position: absolute;
    background: none; padding: 0;
    width: 0; height: 0;       /* 零尺寸錨點，medal/label 各自相對它定位 */
  }
  .station.locked { cursor: not-allowed; }
  .st-medal {
    position: absolute;
    left: 0; top: 0;
    transform: translate(-50%, -50%);
    width: 72px; height: 72px;
    display: grid; place-items: center;
    border-radius: 50%;
    background: #fff;
    border: 3px solid color-mix(in srgb, var(--reed) 45%, white);
    box-shadow: 0 5px 0 color-mix(in srgb, var(--reed-deep) 25%, white), var(--shadow-card);
    transition: transform 0.15s ease;
  }
  .station:hover:not(.locked) .st-medal { transform: translate(-50%, -50%) translateY(-3px); }
  .station:active:not(.locked) .st-medal { transform: translate(-50%, -50%) translateY(2px); box-shadow: 0 2px 0 color-mix(in srgb, var(--reed-deep) 25%, white); }
  .station.done .st-medal { border-color: var(--reed); background: color-mix(in srgb, var(--reed) 12%, white); }
  .station.current .st-medal {
    border-color: var(--reed);
    box-shadow: 0 0 0 0 color-mix(in srgb, var(--reed) 55%, transparent), 0 5px 0 var(--reed-deep), var(--shadow-card);
    animation: medal-pulse 1.8s ease-in-out infinite;
  }
  .station.locked .st-medal { opacity: 0.5; filter: grayscale(0.7); border-color: #e0d6c8; box-shadow: var(--shadow-card); }
  @keyframes medal-pulse {
    0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--reed) 50%, transparent), 0 5px 0 var(--reed-deep), var(--shadow-card); transform: translate(-50%, -50%) translateY(0); }
    50% { box-shadow: 0 0 0 12px color-mix(in srgb, var(--reed) 0%, transparent), 0 5px 0 var(--reed-deep), var(--shadow-card); transform: translate(-50%, -50%) translateY(-3px); }
  }
  .st-check {
    position: absolute; right: -4px; top: -4px;
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--reed); color: #fff; font-size: 0.85rem; font-weight: 900;
    display: grid; place-items: center; box-shadow: var(--shadow-card);
  }
  .st-lock { position: absolute; right: -2px; bottom: -2px; font-size: 0.95rem; }
  /* label 絕對定位掛 medal 下方（medal 半徑 36 + 間距），不撐開錨點、不偏移圓心 */
  .st-label {
    position: absolute;
    left: 0; top: 46px;
    transform: translateX(-50%);
    width: 108px;
    text-align: center; line-height: 1.2;
  }
  .st-label b { font-family: var(--font-kai); font-size: 0.95rem; color: var(--ink); display: block; }
  .st-label small { font-size: 0.76rem; color: var(--ink-soft); }
  .station.current .st-label small { color: var(--reed-deep); font-weight: 800; }
  .station.locked .st-label { opacity: 0.6; }

  /* 終點：救屈原 */
  .finale { width: 110px; }
  .finale-medal {
    width: 78px; height: 78px;
    border: 3px dashed color-mix(in srgb, var(--cinnabar) 50%, white);
    background: color-mix(in srgb, var(--cinnabar) 8%, white);
  }
  .finale-glyph { font-family: var(--font-kai); font-size: 2rem; color: color-mix(in srgb, var(--cinnabar) 60%, var(--ink)); opacity: 0.5; }
  .finale.reached .finale-medal { border-style: solid; border-color: var(--cinnabar); animation: medal-pulse 1.8s ease-in-out infinite; }
  .finale.reached .finale-glyph { opacity: 1; color: var(--cinnabar); }
  .finale .st-label b { color: var(--cinnabar); }

  .toast {
    position: fixed; top: 1.2rem; left: 50%; transform: translateX(-50%); z-index: 60;
    background: var(--ink); color: #fff; font-weight: 700;
    padding: 0.6rem 1.2rem; border-radius: 999px; box-shadow: var(--shadow-pop); white-space: nowrap;
  }
</style>
