<script>
  import { generateLevelData } from '../lib/questionGenerator.js';
  import { fade, fly, scale } from 'svelte/transition';
  import { onMount, tick } from 'svelte';

  // Game State
  let currentLevel = 1;
  let questions = [];
  let currentIndex = 0;
  let score = 0; 
  let totalScore = 0; 
  let showFeedback = false;
  let isCorrect = false;
  let gameState = 'start'; // 'start', 'playing', 'level_complete', 'milestone'
  
  // Confetti helper
  let confettiParticles = [];

  const QUESTIONS_PER_LEVEL = 10; // Reduced for quicker testing/gameplay flow, usually 20

  function initLevel(level) {
    currentLevel = level;
    questions = generateLevelData(level, QUESTIONS_PER_LEVEL);
    currentIndex = 0;
    score = 0;
    gameState = 'playing';
  }

  function handleAnswer(option) {
    if (showFeedback) return; 

    isCorrect = option.isCorrect;
    if (isCorrect) {
      score += 1;
      totalScore += 1;
    }
    
    showFeedback = true;

    setTimeout(() => {
      showFeedback = false;
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
      } else {
        finishLevel();
      }
    }, 800);
  }

  function finishLevel() {
    // Unlock logic
    const maxLevel = parseInt(localStorage.getItem('zhuyin_max_level') || '1');
    if (currentLevel >= maxLevel) {
      localStorage.setItem('zhuyin_max_level', (currentLevel + 1).toString());
    }
    localStorage.setItem('zhuyin_total_stars', totalScore.toString());

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
    if (currentLevel < 100) {
      initLevel(currentLevel + 1);
    } else {
      alert("恭喜你破完全部 100 關！太神啦！");
      initLevel(1);
    }
  }

  function retryLevel() {
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
    
    // Resize on content change (mutation observer ideal, but resize observer on parent works too)
    // For now, just call it immediately and on window resize
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
     totalScore = savedStars;
     currentLevel = savedLevel;
     initLevel(currentLevel);
  });
</script>

<div class="app-layout">
  <div class="fixed-container">
    
    <!-- HEADER -->
    <div class="game-header">
      <div class="badge level">LV {currentLevel}</div>
      <div class="badge stars">🌟 {totalScore}</div>
    </div>

    <!-- MAIN GAME AREA -->
    <div class="game-content">
      {#if gameState === 'playing'}
        {#if questions.length > 0}
          {@const currentQuestion = questions[currentIndex]}

          <!-- PROGRESS -->
          <div class="progress-info">
            題目 {currentIndex + 1} / {QUESTIONS_PER_LEVEL}
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
            </div>
          {/if}

        {/if}

      {:else if gameState === 'level_complete'}
        <div class="result-card" in:scale>
          <h1>🎉 過關！</h1>
          <p class="score-summary">本關星星：{score} / {QUESTIONS_PER_LEVEL}</p>
          <div class="action-buttons">
            <button class="retry-btn" on:click={retryLevel}>重玩</button>
            <button class="next-btn" on:click={nextLevel}>下一關 ➡️</button>
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
          <p class="milestone-text">恭喜通過第 {currentLevel} 關！<br>你是注音小天才！</p>
          <button class="next-btn big" on:click={nextLevel}>繼續挑戰！🚀</button>
        </div>
      {/if}
    </div>
  </div>
</div>

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
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    background: #f7fafc;
    border-bottom: 2px solid #edf2f7;
    flex-shrink: 0;
  }

  .badge {
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: 1px;
  }
  .badge.level { background: #2d3748; color: white; }
  .badge.stars { background: #ecc94b; color: #744210; }

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
    font-size: 6rem;
    line-height: 1;
    margin: 0;
    color: #2d3748;
  }

  .english-word {
    font-size: 5rem;
    color: #ed8936; /* Orange for English */
    margin: 0.5rem 0 0 0;
    font-family: 'Segoe UI', sans-serif;
    font-weight: 700;
  }

  /* OPTIONS */
  .options-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
  }

  .option-btn {
    height: 120px; /* Fixed height! */
    background: white;
    border: 3px solid #4fd1c5;
    color: #2c7a7b;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    overflow: hidden; /* Hide overflow */
  }
  
  .option-btn span {
    white-space: nowrap; /* No wrapping */
  }

  .option-btn:hover:not(:disabled) {
    background: #e6fffa;
  }

  .option-btn:active:not(:disabled) {
    transform: scale(0.98);
  }

  .option-btn.correct { background: #48bb78; color: white; border-color: #38a169; }
  .option-btn.wrong { background: #e53e3e; color: white; border-color: #c53030; }

  /* FEEDBACK */
  .feedback-overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .feedback-icon { font-size: 8rem; filter: drop-shadow(0 0 20px white); }

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
</style>
