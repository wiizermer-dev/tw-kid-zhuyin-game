<script>
  /** 
   * 吉卜力風格屈原元件 (Ghibli-style Quyuan)
   * 取代舊有的 SVG 版本，使用高品質 PNG 資產。
   * 支持多種表情狀態、進場動畫與環境互動。
   */
  import { onMount } from 'svelte';

  let {
    size = 120,             // 圖片基礎寬度
    pose = 'wave',          // 'wave' | 'cheer' | 'help' | 'think'
    float = true,           // 是否有呼吸/浮動感
    shadow = true,          // 是否顯示腳下陰影
    vibrant = true,         // 是否加強對比度（適配遊戲介面）
    entrance = 'bounce',    // 'bounce' | 'fade' | 'none'
  } = $props();

  // 表情圖片映射
  const IMAGES = {
    wave: '/quyuan-wave.png',
    cheer: '/quyuan-cheer.png',
    help: '/quyuan-help.png',
    think: '/quyuan-help.png', // 目前共用提示圖
  };

  let mounted = $state(false);
  onMount(() => {
    mounted = true;
  });

  const currentImg = $derived(IMAGES[pose] || IMAGES.wave);
</script>

<div 
  class="quyuan-container" 
  class:mounted
  class:float
  class:vibrant
  class:is-help={pose === 'help'}
  class:is-cheer={pose === 'cheer'}
  style:--size="{size}px"
  style:--entrance-anim="qy-entrance-{entrance}"
>
  {#if shadow}
    <div class="shadow-ground" aria-hidden="true"></div>
  {/if}

  <div class="character-wrapper">
    <img 
      src={currentImg} 
      alt="屈原" 
      class="quyuan-img"
      class:shake={pose === 'help'}
    />
    
    {#if pose === 'cheer'}
      <div class="particles" aria-hidden="true">
        {#each Array(6) as _, i}
          <span class="sparkle" style:--delay="{i * 0.2}s" style:--left="{i * 20}%">✨</span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  :root {
    --qy-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .quyuan-container {
    position: relative;
    width: var(--size);
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    opacity: 0;
    pointer-events: none;
    transform: translateY(20px);
    transition: opacity 0.3s ease, transform 0.3s var(--qy-bounce);
  }

  .quyuan-container.mounted {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
    /* 進場動畫 */
    animation: var(--entrance-anim, none) 0.8s var(--qy-bounce) forwards;
  }

  @keyframes qy-entrance-bounce {
    0% { opacity: 0; transform: scale(0.5) translateY(40px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }

  @keyframes qy-entrance-fade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .character-wrapper {
    position: relative;
    width: 100%;
    z-index: 2;
    transition: transform 0.3s var(--qy-bounce);
  }

  .quyuan-img {
    width: 100%;
    height: auto;
    display: block;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
    transition: filter 0.3s ease;
  }

  /* 視覺加強：對比度與飽和度 */
  .vibrant .quyuan-img {
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15)) contrast(1.1) saturate(1.1);
  }

  /* 呼吸感動畫 */
  .float .character-wrapper {
    animation: qy-float 3s ease-in-out infinite;
  }

  @keyframes qy-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  /* 腳下陰影 */
  .shadow-ground {
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 10px;
    background: radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%);
    z-index: 1;
    border-radius: 50%;
    transition: transform 3s ease-in-out infinite;
  }

  .float .shadow-ground {
    animation: qy-shadow-scale 3s ease-in-out infinite;
  }

  @keyframes qy-shadow-scale {
    0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.2; }
    50% { transform: translateX(-50%) scale(0.8); opacity: 0.1; }
  }

  /* 驚慌/求救時的晃動 */
  .shake {
    animation: qy-shake 0.4s ease-in-out infinite;
  }

  @keyframes qy-shake {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }

  /* 撒花特效 */
  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .sparkle {
    position: absolute;
    font-size: 1.2rem;
    bottom: 20%;
    left: var(--left);
    opacity: 0;
    animation: qy-sparkle 1.5s ease-out infinite;
    animation-delay: var(--delay);
  }

  @keyframes qy-sparkle {
    0% { transform: translateY(0) scale(0); opacity: 0; }
    50% { opacity: 1; transform: translateY(-30px) scale(1.2) rotate(20deg); }
    100% { opacity: 0; transform: translateY(-50px) scale(0.5); }
  }

  /* 針對對話頭像的適配 (如果父層有特定 class) */
  :global(.chat-avatar) .quyuan-container {
    --size: 60px !important;
  }
</style>
