<script>
  import { onMount } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { elasticOut } from "svelte/easing";
  
  export let onStartAdventure = () => {};
  export let onContinueGame = () => {};
  export let onOpenLearningNotes = () => {};
  export let onOpenAchievements = () => {};
  export let onOpenLeaderboard = () => {};
  export let onSwitchToClassic = () => {};
  
  let playerName = "";
  let playerLevel = 1;
  let totalStars = 0;
  let hasProgress = false;
  let showModeSwitch = false;
  
  // 台灣景點輪播背景
  const backgrounds = [
    { name: "台北101", color: "from-blue-400 to-blue-600" },
    { name: "日月潭", color: "from-green-400 to-blue-500" },
    { name: "墾丁", color: "from-orange-400 to-pink-500" },
    { name: "阿里山", color: "from-purple-400 to-pink-500" },
  ];
  let currentBg = 0;
  
  onMount(() => {
    // 載入玩家資料
    playerName = localStorage.getItem("zhuyin_player_name") || "旅行者";
    playerLevel = parseInt(localStorage.getItem("zhuyin_max_level") || "1");
    totalStars = parseInt(localStorage.getItem("zhuyin_total_stars") || "0");
    hasProgress = localStorage.getItem("zhuyin_level_progress") !== null;
    
    // 背景輪播
    const interval = setInterval(() => {
      currentBg = (currentBg + 1) % backgrounds.length;
    }, 5000);
    
    return () => clearInterval(interval);
  });
</script>

<div class="menu-container bg-gradient-to-br {backgrounds[currentBg].color}">
  <!-- 版本切換按鈕 -->
  <button 
    class="version-switch"
    on:click={() => showModeSwitch = !showModeSwitch}
    transition:fade
    aria-label="遊戲設定與版本切換"
    title="遊戲設定與版本切換"
  >
    ⚙️
  </button>
  
  {#if showModeSwitch}
    <div class="mode-switch-panel" transition:fly={{ y: -20 }}>
      <button class="classic-mode-btn" on:click={onSwitchToClassic}>
        📖 切換到經典模式
      </button>
      <button
        class="close-switch"
        on:click={() => showModeSwitch = false}
        aria-label="關閉設定"
        title="關閉設定"
      >
        ✕
      </button>
    </div>
  {/if}
  
  <!-- 主標題 -->
  <div class="title-section" in:fly={{ y: -50, duration: 800, easing: elasticOut }}>
    <div class="title-bg">
      <h1 class="game-title">
        <span class="title-emoji">🏝️</span>
        台灣注音大冒險
        <span class="title-emoji">🎒</span>
      </h1>
      <p class="subtitle">跟著注音遊台灣！</p>
    </div>
  </div>
  
  <!-- 玩家資訊卡 -->
  <div class="player-card postcard" in:scale={{ delay: 200, duration: 400 }}>
    <div class="player-info">
      <div class="avatar">👤</div>
      <div class="player-details">
        <h3 class="player-name">{playerName}</h3>
        <div class="stats">
          <span class="stat-item">
            <span class="stat-icon">🎯</span>
            Lv.{playerLevel}
          </span>
          <span class="stat-item">
            <span class="stat-icon">⭐</span>
            {totalStars}
          </span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 主選單按鈕 -->
  <div class="menu-buttons" in:fly={{ y: 50, delay: 400, duration: 600 }}>
    <button class="menu-btn primary" on:click={onStartAdventure}>
      <span class="btn-icon">🚀</span>
      <span class="btn-text">開始新冒險</span>
    </button>
    
    {#if hasProgress}
      <button class="menu-btn secondary" on:click={onContinueGame}>
        <span class="btn-icon">▶️</span>
        <span class="btn-text">繼續遊戲</span>
      </button>
    {/if}
    
    <div class="button-row">
      <button class="menu-btn small" on:click={onOpenLearningNotes}>
        <span class="btn-icon">📚</span>
        <span class="btn-text">學習筆記</span>
      </button>
      
      <button class="menu-btn small" on:click={onOpenAchievements}>
        <span class="btn-icon">🏆</span>
        <span class="btn-text">成就收藏</span>
      </button>
    </div>
    
    <button class="menu-btn outline" on:click={onOpenLeaderboard}>
      <span class="btn-icon">👥</span>
      <span class="btn-text">排行榜</span>
    </button>
  </div>
  
  <!-- 裝飾元素 -->
  <div class="decorations">
    <div class="cloud cloud-1">☁️</div>
    <div class="cloud cloud-2">☁️</div>
    <div class="cloud cloud-3">☁️</div>
  </div>
</div>

<style>
  .menu-container {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    position: relative;
    overflow-x: hidden;
    overflow-y: auto;
    transition: background 1s ease-in-out;
  }
  
  /* 版本切換 */
  .version-switch {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }
  
  .version-switch:hover,
  .version-switch:focus-visible {
    transform: rotate(90deg) scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
  
  .mode-switch-panel {
    position: absolute;
    top: 5rem;
    right: 1rem;
    background: white;
    border-radius: 16px;
    padding: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    z-index: 99;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .classic-mode-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .classic-mode-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
  
  .close-switch {
    background: #f1f5f9;
    border: none;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
  }
  
  .close-switch:hover,
  .close-switch:focus-visible {
    background: #e2e8f0;
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
  
  /* 標題區 */
  .title-section {
    margin-bottom: 2rem;
  }
  
  .title-bg {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 32px;
    padding: 1.5rem 2rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 100%;
    max-width: 90vw;
  }
  
  .game-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: #2d3748;
    margin: 0;
    font-family: 'TW-Kai', 'DFKai-SB', 'BiauKai', '標楷體', serif;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  
  .title-emoji {
    font-size: 2rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: #718096;
    margin: 0.5rem 0 0 0;
    font-weight: 600;
  }
  
  /* 玩家卡片 */
  .player-card {
    width: 100%;
    max-width: 400px;
    margin-bottom: 2rem;
    background: white;
    padding: 1.5rem;
  }
  
  .player-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .avatar {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .player-details {
    flex: 1;
  }
  
  .player-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 0.5rem 0;
  }
  
  .stats {
    display: flex;
    gap: 1.5rem;
  }
  
  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #4a5568;
  }
  
  .stat-icon {
    font-size: 1.2rem;
  }
  
  /* 選單按鈕 */
  .menu-buttons {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.25rem 2rem;
    border: none;
    border-radius: 24px;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  
  .menu-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  .menu-btn:hover::before {
    width: 100%;
    height: 100%;
  }
  
  .btn-icon {
    font-size: 1.5rem;
    position: relative;
    z-index: 1;
  }
  
  .btn-text {
    position: relative;
    z-index: 1;
  }
  
  .menu-btn.primary {
    background: linear-gradient(135deg, #4A90E2 0%, #3A7BC8 100%);
    color: white;
    box-shadow: 0 6px 0 #2A5BA8;
  }
  
  .menu-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 0 #2A5BA8;
  }
  
  .menu-btn.primary:active {
    transform: translateY(6px);
    box-shadow: none;
  }
  
  .menu-btn.secondary {
    background: linear-gradient(135deg, #6FCF97 0%, #56B67E 100%);
    color: white;
    box-shadow: 0 4px 0 #3D9C64;
  }
  
  .menu-btn.secondary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #3D9C64;
  }
  
  .menu-btn.secondary:active {
    transform: translateY(4px);
    box-shadow: none;
  }
  
  .menu-btn.outline {
    background: white;
    color: #4a5568;
    border: 3px solid #e2e8f0;
  }
  
  .menu-btn.outline:hover {
    border-color: #4A90E2;
    color: #4A90E2;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(74, 144, 226, 0.2);
  }
  
  .button-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .menu-btn.small {
    background: white;
    color: #4a5568;
    border: 3px solid #e2e8f0;
    padding: 1rem;
    font-size: 1rem;
  }
  
  .menu-btn.small:hover {
    border-color: #FFB84D;
    color: #FFB84D;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 184, 77, 0.2);
  }
  
  /* 裝飾雲朵 */
  .decorations {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
  }
  
  .cloud {
    position: absolute;
    font-size: 3rem;
    opacity: 0.6;
    animation: float 20s infinite;
  }
  
  .cloud-1 {
    top: 10%;
    left: -10%;
    animation-delay: 0s;
  }
  
  .cloud-2 {
    top: 30%;
    right: -10%;
    animation-delay: 7s;
  }
  
  .cloud-3 {
    bottom: 20%;
    left: -10%;
    animation-delay: 14s;
  }
  
  @keyframes float {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(100vw + 10%)); }
  }
  
  /* 響應式 */
  @media (max-width: 640px) {
    .menu-container {
      padding: 0.75rem;
    }
    
    .title-bg {
      padding: 1.25rem 1rem;
      border-radius: 24px;
    }
    
    .game-title {
      font-size: 1.6rem;
      flex-wrap: wrap;
    }
    
    .title-emoji {
      font-size: 1.4rem;
    }
    
    .subtitle {
      font-size: 0.95rem;
    }
    
    .player-card {
      padding: 1rem;
    }
    
    .player-name {
      font-size: 1.25rem;
    }
    
    .menu-btn {
      padding: 0.875rem 1.25rem;
      font-size: 1rem;
    }
    
    .btn-icon {
      font-size: 1.2rem;
    }
    
    .menu-btn.small {
      padding: 0.75rem 0.5rem;
      font-size: 0.9rem;
    }
  }
  
  @media (max-width: 380px) {
    .game-title {
      font-size: 1.4rem;
    }
    
    .menu-buttons {
      max-width: 100%;
    }
  }
</style>
