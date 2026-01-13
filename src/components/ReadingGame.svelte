<script>
  import { generateLevelData } from '../lib/questionGenerator.js';
  import { fade, fly, scale } from 'svelte/transition';
  import { onMount, tick } from 'svelte';
  import { upsertPlayer, updateScore, recordQuestionAttempt, getQuestionStats, calculateWrongRate } from '../lib/supabase.js';
  import Leaderboard from './Leaderboard.svelte';

  // Game State
  let currentLevel = 1;
  let questions = [];
  let currentIndex = 0;
  let score = 0; 
  let totalScore = 0; 
  let showFeedback = false;
  let isCorrect = false;
  let gameState = 'loading'; // 'loading', 'welcome', 'playing', 'level_complete', 'milestone'
  
  // Player
  let playerName = '';
  let inputName = ''; // Temp storage for typing
  let showNameModal = true;
  let showConfirmModal = false;
  let showUnlockHardModeModal = false;

  // Hard Mode
  let isHardModeUnlocked = false;
  let isHardMode = false;
  
  // Confetti helper
  let confettiParticles = [];

  // Hard Mode State
  let hardModeScore = 0;
  let hardModeHighScore = 0;

  // Supabase Integration
  let playerId = null;
  let showLeaderboard = false;
  let wrongRateMessage = '';  // 答錯時顯示統計訊息
  
  // Stats
  let comboCount = 0;

  const QUESTIONS_PER_LEVEL = 10; 
  const HARD_MODE_QUESTIONS = 100; 

  function initLevel(level) {
    currentLevel = level;
    const qCount = isHardMode ? HARD_MODE_QUESTIONS : QUESTIONS_PER_LEVEL;
    questions = generateLevelData(level, qCount, isHardMode);
    currentIndex = 0; // Reset index
    score = 0; // Reset level score
    gameState = 'playing';
    
    saveProgress();
  }

  function saveProgress() {
    const progress = {
      level: currentLevel,
      questions: questions,
      currentIndex: currentIndex,
      score: score,
      isHardMode: isHardMode,
      hardModeScore: hardModeScore
    };
    localStorage.setItem('zhuyin_level_progress', JSON.stringify(progress));
  }
  
  function clearLevelProgress() {
    localStorage.removeItem('zhuyin_level_progress');
  }

  function resetUserData() {
    localStorage.removeItem('zhuyin_level_progress');
    localStorage.removeItem('zhuyin_total_stars');
    localStorage.removeItem('zhuyin_max_level');
    localStorage.removeItem('zhuyin_hard_mode_unlocked');
    
    // Reset local state
    currentLevel = 1;
    score = 0;
    totalScore = 0;
    isHardModeUnlocked = false;
    isHardMode = false;
  }

  function tryLoadProgress() {
    try {
      const saved = localStorage.getItem('zhuyin_level_progress');
      if (saved) {
        const p = JSON.parse(saved);
        // Validate if it matches current max level logic or just trust it?
        // Let's trust it if the player matches.
        if (p.level && p.questions && typeof p.currentIndex === 'number') {
           currentLevel = p.level;
           questions = p.questions;
           currentIndex = p.currentIndex;
           currentIndex = p.currentIndex;
           score = p.score || 0;
           isHardMode = p.isHardMode || false;
           hardModeScore = p.hardModeScore || 0;
           gameState = 'playing';
           return true;
        }
      }
    } catch (e) {
      console.error("Failed to load progress", e);
    }
    return false;
  }

  async function handleNameSubmit() {
    if (!inputName.trim()) return;
    playerName = inputName.trim();
    localStorage.setItem('zhuyin_player_name', playerName);
    showNameModal = false;
    
    // 註冊/更新玩家到 Supabase
    const player = await upsertPlayer(playerName);
    if (player) {
      playerId = player.id;
    }
    
    // Check if we should resume or start fresh
    if (!tryLoadProgress()) {
      initLevel(currentLevel);
    }
  }
  
  async function confirmIdentity(isMe) {
    showConfirmModal = false;
    if (isMe) {
      // 更新 Supabase 玩家資料
      const player = await upsertPlayer(playerName);
      if (player) {
        playerId = player.id;
      }
      
      if (!tryLoadProgress()) {
        initLevel(currentLevel);
      }
    } else {
      // Reset
      playerName = '';
      inputName = '';
      localStorage.removeItem('zhuyin_player_name');
      resetUserData(); // Full reset for new user
      showNameModal = true;
    }
  }

  async function handleAnswer(option) {
    if (showFeedback) return; 

    const currentQuestion = questions[currentIndex];
    isCorrect = option.isCorrect;
    wrongRateMessage = '';  // 重置訊息
    
    if (isCorrect) {
      score += 1;
      totalScore += 1;
      comboCount += 1;
      // Autosave stars immediately
      localStorage.setItem('zhuyin_total_stars', totalScore.toString());
    } else {
      comboCount = 0;
    }
    
    showFeedback = true;
    
    // 記錄答題統計到 Supabase（背景執行）
    const questionId = `${currentQuestion.word}_${currentQuestion.target || currentQuestion.word}`;
    const correctPinyin = currentQuestion.options.find(o => o.isCorrect)?.pinyin || '';
    recordQuestionAttempt(
      questionId,
      currentQuestion.word,
      currentQuestion.target || currentQuestion.word,
      correctPinyin,
      isCorrect
    );
    
    // 如果答錯，取得並顯示統計
    if (!isCorrect) {
      const stats = await getQuestionStats(questionId);
      if (stats && stats.total_attempts > 5) {
        const rate = calculateWrongRate(stats);
        if (rate > 30) {
          wrongRateMessage = `這題有 ${rate}% 的人答錯！`;
        }
      }
    }

    setTimeout(() => {
      showFeedback = false;
      wrongRateMessage = '';
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        saveProgress(); // Checking point: New index, updated score
      } else {
        finishLevel();
      }
    }, 1200);  // 稍微延長以顯示統計訊息
  }

  async function finishLevel() {
    clearLevelProgress(); // Clear level progress only

    if (isHardMode) {
        // Hard Mode Finish Logic
        if (score > hardModeHighScore) {
            hardModeHighScore = score;
            localStorage.setItem('zhuyin_hard_high_score', hardModeHighScore.toString());
        }
        gameState = 'level_complete';
        
        // 同步成績到 Supabase
        if (playerId) {
          const maxLevel = parseInt(localStorage.getItem('zhuyin_max_level') || '1');
          await updateScore(playerId, totalScore, maxLevel, hardModeHighScore);
        }
        return;
    }

    // Normal Mode Logic
    const maxLevel = parseInt(localStorage.getItem('zhuyin_max_level') || '1');
    if (currentLevel >= maxLevel) {
      localStorage.setItem('zhuyin_max_level', (currentLevel + 1).toString());
    }
    
    // Hard Mode Unlock Check (Only in Normal Mode)
    if (!isHardModeUnlocked && score === QUESTIONS_PER_LEVEL) {
        // Unlock Hard Mode!
        isHardModeUnlocked = true;
        localStorage.setItem('zhuyin_hard_mode_unlocked', 'true');
        showUnlockHardModeModal = true;
        // Don't show regular level complete if unlocking
        gameState = 'playing'; // Stay in playing but show modal overlay? Or just use overlay on top of level complete?
        // Let's use a specific state or overlay. 
        // Using `showUnlockHardModeModal` overlay is better.
    }
    
    localStorage.setItem('zhuyin_total_stars', totalScore.toString());
    
    // 同步成績到 Supabase
    if (playerId) {
      const maxLevel = parseInt(localStorage.getItem('zhuyin_max_level') || '1');
      await updateScore(playerId, totalScore, maxLevel, hardModeHighScore);
    }

    // Check Milestones
    if ([10, 50, 100].includes(currentLevel)) {
      gameState = 'milestone';
      triggerConfetti();
    } else {
      gameState = 'level_complete';
    }
  }

  function triggerConfetti() {
    confettiParticles = Array(50).fill(0).map((_, i) => ({
      left: Math.random() * 100 + '%',
      animationDelay: Math.random() * 2 + 's',
      backgroundColor: ['#ff0', '#f00', '#0f0', '#00f', '#f0f'][Math.floor(Math.random() * 5)]
    }));
  }

  function nextLevel() {
    if (isHardMode) {
       // In hard mode, "next level" essentially means replay or go back?
       // Actually user might want to retry.
       // Let's just re-init hard mode (new set of 100).
       initLevel(currentLevel); 
       return;
    }

    if (currentLevel < 100) {
      initLevel(currentLevel + 1);
    } else {
      alert(`恭喜 ${playerName} 破完全部 100 關！太神啦！`);
      initLevel(1);
    }
  }

  function retryLevel() {
    clearLevelProgress(); // Clear level progress only
    comboCount = 0;
    initLevel(currentLevel);
  }

  // Action for fitting text
  function fitText(node) {
    const resize = () => {
      const parent = node.parentElement;
      const parentWidth = parent.clientWidth;
      // Reset first
      node.style.fontSize = '2.5rem';
      
      // Simple shrink loop
      let size = 2.5;
      while (node.scrollWidth > parentWidth - 20 && size > 1) {
        size -= 0.1;
        node.style.fontSize = `${size}rem`;
      }
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    return {
      destroy() {
        window.removeEventListener('resize', resize);
      }
    };
  }

  onMount(() => {
     const savedLevel = parseInt(localStorage.getItem('zhuyin_max_level') || '1');
     const savedStars = parseInt(localStorage.getItem('zhuyin_total_stars') || '0');
     // Hard Mode
     const savedHardUnlock = localStorage.getItem('zhuyin_hard_mode_unlocked') === 'true';
     isHardModeUnlocked = savedHardUnlock;
     hardModeHighScore = parseInt(localStorage.getItem('zhuyin_hard_high_score') || '0');
     
     const savedName = localStorage.getItem('zhuyin_player_name');
     
     totalScore = savedStars;
     currentLevel = savedLevel;

     if (savedName) {
       playerName = savedName;
       showConfirmModal = true;
     } else {
       showNameModal = true;
     }
  });
</script>

<div class="app-layout">
  <div class="fixed-container">
    
    <!-- HEADER -->
    <div class="game-header">
      <div class="left-info">
         {#if !isHardMode}
           <span class="level-text">Lv.{currentLevel}</span>
         {:else}
           <span class="hard-mode-text">🔥 困難 (最高:{hardModeHighScore})</span>
         {/if}
         {#if playerName && !showNameModal && !showConfirmModal && !showUnlockHardModeModal}
           <span class="player-name">{playerName}</span>
         {/if}
      </div>
    </div>

    <!-- MAIN GAME AREA -->
    <div class="game-content">
    
      <!-- MODAL: PLAYER NAME INPUT -->
      {#if showNameModal}
        <div class="modal-overlay" transition:fade>
          <div class="modal-card" in:scale>
            <h1>👋哩賀逮灣郎</h1>
            <h2>歡迎來到注音台挑戰小遊戲</h2>
            <p>請問你的名字是？</p>
            <input 
              type="text" 
              placeholder="輸入名字" 
              bind:value={inputName} 
              on:keydown={(e) => e.key === 'Enter' && handleNameSubmit()}
            />
            <button class="start-btn" on:click={handleNameSubmit} disabled={!inputName.trim()}>
               開始遊戲 🚀
            </button>
            
            {#if isHardModeUnlocked}
                 <div class="hard-mode-toggle">
                    <label>
                        <input type="checkbox" bind:checked={isHardMode}>
                        <span>開啟困難模式 🔥</span>
                    </label>
                 </div>
            {/if}
          </div>
        </div>
      {/if}

      <!-- MODAL: CONFIRM IDENTITY -->
      {#if showConfirmModal}
        <div class="modal-overlay" transition:fade>
          <div class="modal-card" in:scale>
            <h1>🤔 請問是...</h1>
            <p class="confirm-name">{playerName} 嗎？</p>
            <div class="action-buttons-col">
              <button class="start-btn" on:click={() => confirmIdentity(true)}>
                 沒錯，是我！😎
              </button>
              <button class="retry-btn" on:click={() => confirmIdentity(false)}>
                 不是，我是別人
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- MODAL: HARD MODE UNLOCKED -->
      {#if showUnlockHardModeModal}
        <div class="modal-overlay" transition:fade>
          <div class="modal-card" in:scale>
            <h1>🔥 困難模式解鎖！</h1>
            <p>太厲害了！你獲得了滿分！<br>想要現在就挑戰更難的題目嗎？</p>
            <div class="action-buttons-col">
              <button class="start-btn hard" on:click={() => {
                  showUnlockHardModeModal = false;
                  isHardMode = true;
                  nextLevel();
              }}>
                 😈 挑戰困難模式
              </button>
              <button class="retry-btn" on:click={() => {
                  showUnlockHardModeModal = false;
                  isHardMode = false;
                  nextLevel();
              }}>
                 😌 繼續普通模式
              </button>
            </div>
          </div>
        </div>
      {/if}

      <!-- GAME CONTENT -->
      {#if gameState === 'playing'}
        {#if questions.length > 0}
          {@const currentQuestion = questions[currentIndex]}

          <!-- PROGRESS -->
          <div class="progress-info">
            題目 {currentIndex + 1} / {isHardMode ? HARD_MODE_QUESTIONS : QUESTIONS_PER_LEVEL}
          </div>

          <!-- STATS BOARD -->
          <div class="stats-board" in:fade>
            <div class="stat-pill">
              <span class="stat-label">🌟</span>
              <span class="stat-value">{totalScore}</span>
            </div>
            {#if comboCount > 1}
              <div class="stat-pill combo" in:scale>
                <span class="stat-label">🔥 COMBO</span>
                <span class="stat-value">{comboCount}</span>
              </div>
            {/if}
          </div>

          <!-- CARD -->
          {#key currentQuestion.id}
            <div class="question-card" in:fly={{ y: 20, duration: 200 }}>
              
              <!-- VISUAL REMOVED -->

              <!-- TEXT -->
              <div class="text-area">
                <h1 class="chinese-word">{currentQuestion.word}</h1>
                <h2 class="english-word">{currentQuestion.english}</h2>
              </div>
              
              <!-- OPTIONS -->
              <div class="options-container">
                {#each currentQuestion.options as option}
                  <button 
                    class="option-btn" 
                    class:correct={showFeedback && option.isCorrect}
                    class:wrong={showFeedback && !option.isCorrect && !isCorrect} 
                    on:click={() => handleAnswer(option)}
                    disabled={showFeedback}
                  >
                    <!-- Span wrapper for fitText action -->
                    <span use:fitText>{option.pinyin}</span>
                  </button>
                {/each}
              </div>
            </div>
          {/key}
          
          <!-- FEEDBACK POPUP -->
          {#if showFeedback}
            <div class="feedback-overlay" transition:fade={{ duration: 100 }}>
              <div class="feedback-icon" transition:scale>
                {#if isCorrect}⭕️{:else}❌{/if}
              </div>
              {#if wrongRateMessage}
                <div class="wrong-rate-message" in:fly={{ y: 20 }}>
                  {wrongRateMessage}
                </div>
              {/if}
            </div>
          {/if}

        {/if}

      {:else if gameState === 'level_complete'}
        <div class="result-card" in:scale>
          <h1>
            {#if isHardMode}
                🔥 挑戰結束！
            {:else}
                🎉 {playerName} 好棒！
            {/if}
          </h1>
          <p class="score-summary">
            {#if isHardMode}
                本次得分：{score} / 100
                {#if score >= 90}<br>太強了吧！？🙀{/if}
            {:else}
                本關星星：{score} / {QUESTIONS_PER_LEVEL}
            {/if}
          </p>
          <div class="action-buttons">
            <button class="retry-btn" on:click={retryLevel}>重玩</button>
            <button class="next-btn" on:click={nextLevel}>
                {#if isHardMode}再來一局 😈{:else}下一關 ➡️{/if}
            </button>
          </div>
        </div>

      {:else if gameState === 'milestone'}
        <div class="result-card milestone" in:scale>
          <div class="confetti-container">
            {#each confettiParticles as p}
              <div class="confetti" style="left: {p.left}; animation-delay: {p.animationDelay}; background: {p.backgroundColor}"></div>
            {/each}
          </div>
          <h1>🏆 里程碑達成！</h1>
          <p class="milestone-text">恭喜 <strong>{playerName}</strong><br>通過第 {currentLevel} 關！<br>你是注音小天才！</p>
          <button class="next-btn big" on:click={nextLevel}>繼續挑戰！🚀</button>
        </div>
      {/if}
    </div>

    <!-- FLOATING LEADERBOARD -->
    {#if !showNameModal && !showConfirmModal && !showUnlockHardModeModal && gameState === 'playing'}
      <button class="floating-status" on:click={() => showLeaderboard = true} transition:fade>
        <span class="float-icon">🏆</span>
        <span class="float-text">排行榜</span>
      </button>
    {/if}
  </div>
</div>

<!-- LEADERBOARD MODAL -->
{#if showLeaderboard}
  <Leaderboard onClose={() => showLeaderboard = false} />
{/if}

<style>
  /* GLOBAL LAYOUT */
  .app-layout {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, #a0ced9 0%, #fff9c4 100%);
    overflow: hidden; /* Prevent body scroll */
  }

  .fixed-container {
    width: 100%;
    max-width: 450px; /* Mobile optimal width */
    height: 800px;    /* Fixed height */
    max-height: 95vh;
    background: white;
    border-radius: 30px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Clip content inside */
    position: relative;
    border: 6px solid #fff;
  }

  /* HEADER */
  .game-header {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
    flex-shrink: 0;
  }

  .left-info, .right-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .level-text {
    font-weight: 700;
    font-size: 1.5rem;
    color: #222;
  }

  .hard-mode-text {
    font-weight: 600;
    font-size: 0.9rem;
    color: #dc2626;
  }

  .player-name {
    font-weight: 700;
    font-size: 1.5rem;
    color: #efb814;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  .score-text {
    font-weight: 700;
    font-size: 1rem;
    color: #d97706;
  }

  .leaderboard-btn {
    display: none; /* Removed from header */
  }

  /* FLOATING STATUS */
  .floating-status {
    position: absolute;
    bottom: 30px;
    right: 20px;
    background: white;
    padding: 0.6rem 1rem;
    border-radius: 50px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: 3px solid #f0f4f8;
    cursor: pointer;
    z-index: 100;
    transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .floating-status:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.2);
    border-color: #e2e8f0;
  }

  .floating-status:active {
    transform: scale(0.95);
  }

  .float-icon {
    font-size: 1.4rem;
  }

  .float-text {
    font-weight: 800;
    font-size: 1rem;
    color: #475569;
  }

  /* STATS BOARD */
  .stats-board {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
    height: 40px; /* Space reserved */
  }

  .stat-pill {
    background: white;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    border: 2px solid #f1f5f9;
  }

  .stat-pill.combo {
    background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
    border-color: #feb2b2;
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  .stat-label {
    font-size: 0.9rem;
    font-weight: 800;
    color: #e53e3e;
  }

  .stat-value {
    font-weight: 900;
    font-size: 1.2rem;
    color: #2d3748;
  }

  /* CONTENT AREA */
  .game-content {
    flex: 1;
    position: relative;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center vertically */
  }

  .progress-info {
    text-align: center;
    color: #a0aec0;
    font-weight: bold;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  /* CARD */
  .question-card, .result-card {
    background: white;
    width: 100%;
    height: 100%;
    max-height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly; /* Distribute space */
    padding-bottom: 1rem;
  }

  /* VISUAL AREA REMOVED */

  .text-area {
    text-align: center;
    margin: 1rem 0;
  }

  .chinese-word {
    font-size: 5rem;
    line-height: 1;
    margin: 0;
    color: #000000;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
    font-weight: 700;
  }

  .english-word {
    font-size: 1.8rem;
    color: #6b7280;
    margin: 0.5rem 0 0 0;
    font-family: 'Segoe UI', system-ui, sans-serif;
    font-weight: 600;
  }

  /* OPTIONS */
  .options-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
  }

  .option-btn {
    height: 120px;
    background: white;
    border: 3px solid #d1d5db;
    color: #000000;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.15s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .option-btn span {
    white-space: nowrap;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
    font-weight: 700;
    color: #000000;
  }

  @media (hover: hover) {
    .option-btn:hover:not(:disabled) {
      background: #f9fafb;
      border-color: #9ca3af;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
  }

  .option-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .option-btn.correct { 
    background: #10b981; 
    color: white; 
    border-color: #059669; 
  }
  .option-btn.correct span { color: white; }
  
  .option-btn.wrong { 
    background: #ef4444; 
    color: white; 
    border-color: #dc2626; 
  }
  .option-btn.wrong span { color: white; }

  /* FEEDBACK */
  .feedback-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
    gap: 1rem;
  }
  .feedback-icon { font-size: 8rem; filter: drop-shadow(0 0 20px white); }
  
  .wrong-rate-message {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    color: #92400e;
    padding: 0.8rem 1.5rem;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 700;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  /* (moved to header section) */

  /* RESULT & MILESTONE */
  .result-card {
    justify-content: center;
  }
  .result-card h1 { font-size: 3rem; color: #2d3748; }
  .result-card.milestone h1 { color: #d69e2e; }
  .score-summary { font-size: 1.5rem; color: #718096; margin-bottom: 2rem; }
  .milestone-text { font-size: 1.5rem; color: #2d3748; margin-bottom: 2rem; line-height: 1.5; }

  .action-buttons { display: flex; gap: 1rem; }
  .next-btn, .retry-btn {
    padding: 1rem 2rem; font-size: 1.2rem; border-radius: 50px; border: none; cursor: pointer; font-weight: bold;
  }
  .next-btn { background: #48bb78; color: white; box-shadow: 0 4px 0 #2f855a; }
  .next-btn:active { transform: translateY(4px); box-shadow: none; }
  .next-btn.big { font-size: 1.5rem; padding: 1.2rem 3rem; background: #ecc94b; box-shadow: 0 5px 0 #b7791f; color: #744210; }
  .retry-btn { background: #edf2f7; color: #4a5568; }

  /* CONFETTI ANIMATION */
  .confetti-container {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none;
    overflow: hidden;
  }
  .confetti {
    position: absolute;
    top: -10px;
    width: 10px; height: 10px;
    background: #f00;
    animation: fall 3s linear infinite;
  }
  @keyframes fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(800px) rotate(720deg); opacity: 0; }
  }
  /* MODAL OVERLAY & CARD */
  .modal-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
    width: 100%;
    height: 100%;
  }

  .modal-card {
    background: white;
    padding: 2.5rem;
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    width: 85%;
    max-width: 380px;
    border: 4px solid #fff;
    background: linear-gradient(180deg, #ffffff 0%, #f7fafc 100%);
  }

  .modal-card h1 { font-size: 32px; margin: 0; color: #2d3748; }
  .modal-card h2 { font-size: 24px; margin: 0; color: #2d3748; }
  .modal-card p { font-size: 1.2rem; color: #718096; margin: 0; }
  
  .confirm-name {
    font-size: 2.5rem !important;
    font-weight: 800;
    color: #319795 !important;
    margin: 1rem 0 !important;
  }

  .modal-card input {
    font-size: 1.8rem;
    padding: 0.8rem 1.5rem;
    border: 3px solid #e2e8f0;
    border-radius: 15px;
    text-align: center;
    width: 100%;
    outline: none;
    color: #2d3748; /* Explicit text color */
    background: white;
  }
  
  .modal-card input:focus {
    border-color: #4fd1c5;
    box-shadow: 0 0 0 3px rgba(79, 209, 197, 0.2);
  }

  .action-buttons-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }
  .action-buttons-col button { width: 100%; }

  .start-btn {
    font-size: 1.4rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #4fd1c5 0%, #319795 100%);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(50, 151, 149, 0.2);
    transition: transform 0.1s;
    width: 100%;
  }
  
  .start-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .start-btn:active:not(:disabled) { transform: scale(0.96); }

  /* UTILS */
  .left-badges {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  
  .badge.name {
    background: #bee3f8;
    color: #2b6cb0;
  }
  
  .hard-mode-toggle {
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #e53e3e;
    font-weight: bold;
  }
  .hard-mode-toggle input {
      width: auto !important;
      margin-right: 0.5rem;
      transform: scale(1.5);
  }
  
  .start-btn.hard {
      background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);
      box-shadow: 0 4px 6px rgba(197, 48, 48, 0.2);
  }
</style>
