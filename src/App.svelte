<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  
  // 經典模式組件
  import ClassicGame from './components/original/ReadingGame.svelte';
  
  // 冒險模式組件
  import MainMenu from './components/MainMenu.svelte';
  import GameMap from './components/GameMap.svelte';
  import ReadingGame from './components/ReadingGameNew.svelte';
  import Leaderboard from './components/Leaderboard.svelte';
  
  // 導入主題樣式
  import './styles/theme.css';
  
  // 遊戲模式
  let gameMode = 'adventure'; // 'classic' | 'adventure'
  
  // 冒險模式狀態
  let adventureView = 'menu'; // 'menu' | 'map' | 'game' | 'leaderboard'
  let selectedLevel = 1;
  let completedLevels = [];
  
  onMount(() => {
    // 載入遊戲模式設定
    const savedMode = localStorage.getItem('zhuyin_game_mode') || 'adventure';
    gameMode = savedMode;
    
    // 載入冒險模式進度
    const savedCompleted = localStorage.getItem('zhuyin_completed_levels');
    if (savedCompleted) {
      completedLevels = JSON.parse(savedCompleted);
    }
  });
  
  function switchToClassic() {
    gameMode = 'classic';
    localStorage.setItem('zhuyin_game_mode', 'classic');
  }
  
  function switchToAdventure() {
    gameMode = 'adventure';
    adventureView = 'menu';
    localStorage.setItem('zhuyin_game_mode', 'adventure');
  }
  
  function startAdventure() {
    adventureView = 'map';
  }
  
  function continueGame() {
    // 檢查是否有進行中的遊戲
    const progress = localStorage.getItem('zhuyin_level_progress');
    if (progress) {
      adventureView = 'game';
    } else {
      adventureView = 'map';
    }
  }
  
  function openLearningNotes() {
    // TODO: 實作學習筆記功能
    alert('學習筆記功能即將推出！');
  }
  
  function openAchievements() {
    // TODO: 實作成就系統
    alert('成就收藏功能即將推出！');
  }
  
  function openLeaderboard() {
    adventureView = 'leaderboard';
  }
  
  function selectLevel(level) {
    selectedLevel = level;
    adventureView = 'game';
  }
  
  function backToMenu() {
    adventureView = 'menu';
  }
  
  function backToMap() {
    adventureView = 'map';
  }
</script>

<main>
  {#if gameMode === 'classic'}
    <!-- 經典模式 -->
    <div class="classic-container" in:fade>
      <button class="mode-switch-btn" on:click={switchToAdventure}>
        🚀 切換到冒險模式
      </button>
      <ClassicGame />
    </div>
  {:else}
    <!-- 冒險模式 -->
    {#if adventureView === 'menu'}
      <MainMenu 
        onStartAdventure={startAdventure}
        onContinueGame={continueGame}
        onOpenLearningNotes={openLearningNotes}
        onOpenAchievements={openAchievements}
        onOpenLeaderboard={openLeaderboard}
        onSwitchToClassic={switchToClassic}
      />
    {:else if adventureView === 'map'}
      <GameMap 
        {completedLevels}
        currentLevel={selectedLevel}
        onSelectLevel={selectLevel}
        onBack={backToMenu}
      />
    {:else if adventureView === 'game'}
      <ReadingGame 
        level={selectedLevel}
        onBack={backToMap}
        bind:completedLevels
      />
    {:else if adventureView === 'leaderboard'}
      <Leaderboard onClose={backToMenu} />
    {/if}
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background-color: #f7fafc;
    font-family: 'system-ui', sans-serif;
  }

  main {
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .classic-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background: linear-gradient(135deg, #a0ced9 0%, #fff9c4 100%);
    position: relative;
    padding: 1rem;
  }
  
  .mode-switch-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    transition: all 0.3s;
    z-index: 100;
  }
  
  .mode-switch-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
  }
  
  .mode-switch-btn:active {
    transform: translateY(0);
  }
</style>
