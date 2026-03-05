<script>
  import { onMount, tick } from "svelte";
  import { fade, fly, scale } from "svelte/transition";
  import { elasticOut } from "svelte/easing";
  import { generateLevelData } from "../lib/newQuestionGenerator.js";
  import { getLevelInfo } from "../data/chapters.js";
  import {
    playCorrectSound,
    playWrongSound,
    playComboSound,
    playLevelUpSound,
    speakWord,
  } from "../lib/audio.js";

  export let level = 1;
  export let onBack = () => {};
  export let completedLevels = [];

  // 遊戲狀態
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let showFeedback = false;
  let isCorrect = false;
  let gameState = "playing"; // 'playing', 'level_complete', 'game_over', 'scenario'
  let comboCount = 0;
  let showScenario = true;

  // 戰鬥狀態
  let playerHP = 3;
  let maxPlayerHP = 3;
  let bossHP = 0;
  let maxBossHP = 0;
  let isBossLevel = false;
  let bossInfo = null;
  let shakeScreen = false;
  let isFoggy = false;
  let timeLeft = 0;
  let timerInterval = null;

  // 關卡資訊
  let levelInfo = null;
  let chapterInfo = null;

  // 答題統計
  let startTime = Date.now();
  let questionTimes = [];

  onMount(() => {
    loadLevel();
    return () => clearInterval(timerInterval);
  });

  function loadLevel() {
    levelInfo = getLevelInfo(level);
    if (levelInfo) {
      chapterInfo = levelInfo.chapter;
      bossInfo = levelInfo.bossInfo;
      isBossLevel = !!bossInfo;
      
      questions = generateLevelData(level, levelInfo.questionsCount || 10, levelInfo.difficulty === 'hard' || levelInfo.difficulty === 'expert');
      
      currentIndex = 0;
      score = 0;
      comboCount = 0;
      playerHP = 3;
      isFoggy = false;
      
      if (isBossLevel) {
        bossHP = bossInfo.hp || 10;
        maxBossHP = bossHP;
      }
      
      gameState = "playing";
      showScenario = true;
      startTime = Date.now();
      questionTimes = [];
    }
  }

  function startQuest() {
    showScenario = false;
    startTime = Date.now();
    if (isBossLevel) {
      applyBossMechanics();
      startTimer();
    }
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    // 魔王關卡每題限時，依難度而定
    timeLeft = levelInfo.difficulty === 'expert' ? 8 : levelInfo.difficulty === 'hard' ? 12 : 15;
    
    timerInterval = setInterval(() => {
      if (showFeedback || gameState !== "playing" || showScenario) return;
      
      timeLeft -= 1;
      if (timeLeft <= 0) {
        handleTimeout();
      }
    }, 1000);
  }

  function handleTimeout() {
    if (showFeedback) return;
    
    // 時間到視同答錯
    comboCount = 0;
    playerHP -= 1;
    triggerShake();
    playWrongSound();
    
    if (playerHP <= 0) {
      gameState = "game_over";
      clearInterval(timerInterval);
    } else {
      showFeedback = true;
      setTimeout(() => {
        showFeedback = false;
        nextQuestion();
      }, 800);
    }
  }

  function applyBossMechanics() {
    if (!isBossLevel || !bossInfo.mechanics) return;
    
    // 迷霧效果
    if (bossInfo.mechanics.includes('fog')) {
      isFoggy = Math.random() < 0.4;
    }
    
    // 洗牌效果
    if (bossInfo.mechanics.includes('shuffle') && Math.random() < 0.3) {
      const q = questions[currentIndex];
      if (q && q.options) {
        q.options = shuffleArray(q.options);
      }
    }
  }

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  async function handleAnswer(option) {
    if (showFeedback || gameState !== "playing") return;

    const currentQuestion = questions[currentIndex];
    isCorrect = option.isCorrect;

    // 記錄答題時間
    const questionTime = Date.now() - startTime;
    questionTimes.push(questionTime);

    if (isCorrect) {
      score += 1;
      comboCount += 1;

      // 戰鬥邏輯：對魔王造成傷害
      if (isBossLevel) {
        const damage = comboCount >= 3 ? 2 : 1;
        bossHP = Math.max(0, bossHP - damage);
      }

      // 播放音效
      if (comboCount >= 3) {
        playComboSound();
      } else {
        playCorrectSound();
      }
    } else {
      comboCount = 0;
      playWrongSound();
      
      // 戰鬥邏輯：玩家受擊
      playerHP -= 1;
      triggerShake();
      
      if (playerHP <= 0) {
        setTimeout(() => {
          gameState = "game_over";
          clearInterval(timerInterval);
        }, 600);
        return;
      }
    }

    showFeedback = true;

    // 檢查魔王是否被打敗
    if (isBossLevel && bossHP <= 0) {
      setTimeout(() => {
        clearInterval(timerInterval);
        finishLevel();
      }, 800);
      return;
    }

    setTimeout(() => {
      showFeedback = false;
      nextQuestion();
    }, 600);
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      startTime = Date.now();
      if (isBossLevel) {
        applyBossMechanics();
        startTimer();
      }
    } else {
      clearInterval(timerInterval);
      finishLevel();
    }
  }

  function triggerShake() {
    shakeScreen = true;
    setTimeout(() => {
      shakeScreen = false;
    }, 500);
  }

  function finishLevel() {
    gameState = "level_complete";

    // 播放完成音效
    playLevelUpSound();

    // 計算星級（基於得分）
    const stars = calculateStars();

    // 保存進度
    if (!completedLevels.includes(level)) {
      completedLevels = [...completedLevels, level];
      localStorage.setItem(
        "zhuyin_completed_levels",
        JSON.stringify(completedLevels),
      );
    }

    // 保存星級
    const starsData = JSON.parse(
      localStorage.getItem("zhuyin_stars_per_level") || "{}",
    );
    if (!starsData[level] || starsData[level] < stars) {
      starsData[level] = stars;
      localStorage.setItem("zhuyin_stars_per_level", JSON.stringify(starsData));
    }

    // 更新總星數
    const totalStars = parseInt(
      localStorage.getItem("zhuyin_total_stars") || "0",
    );
    localStorage.setItem("zhuyin_total_stars", (totalStars + score).toString());
  }

  function calculateStars() {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return 3;
    if (percentage >= 80) return 2;
    if (percentage >= 60) return 1;
    return 0;
  }

  function retryLevel() {
    loadLevel();
  }

  function nextLevel() {
    level += 1;
    loadLevel();
  }

  // 格式化題目文字，在目標字加上「」標記
  function formatQuestionText(question) {
    if (!question) return "";

    const displayText = question.displayText || "";
    const targetChar = question.targetChar || "";

    // 如果已經有「」標記，直接返回
    if (displayText.includes("「") || displayText.includes("」")) {
      return displayText;
    }

    // 如果有目標字，嘗試加上標記
    if (targetChar && displayText) {
      // 找到目標字的位置並加上「」
      const targetIndex = displayText.indexOf(targetChar);
      if (targetIndex !== -1) {
        return (
          displayText.substring(0, targetIndex) +
          "「" +
          targetChar +
          "」" +
          displayText.substring(targetIndex + targetChar.length)
        );
      }
    }

    return displayText;
  }
</script>

<div class="game-container" class:shake={shakeScreen}>
  <!-- 頂部工具列 -->
  <div class="game-header">
    <button class="back-btn" on:click={onBack}> ← 返回 </button>

    {#if chapterInfo}
      <div class="chapter-badge">
        {chapterInfo.icon}
        {chapterInfo.name}
      </div>
    {/if}

    <div class="stats-bar">
      <!-- 玩家 HP 與神獸 -->
      <div class="player-info">
        <span class="mascot">🐻</span>
        <div class="player-hearts">
          {#each Array(maxPlayerHP) as _, i}
            <span class="heart" class:empty={i >= playerHP}>❤️</span>
          {/each}
        </div>
      </div>
      
      <span class="stat">⭐ {score}</span>
      {#if comboCount > 1}
        <span class="combo" in:scale>🔥 {comboCount}</span>
      {/if}
    </div>
  </div>

  {#if showScenario}
    <!-- 劇情任務遮罩 -->
    <div class="overlay" transition:fade>
      <div class="scenario-card postcard" in:fly={{ y: 50, duration: 500 }}>
        <h2 class="scenario-title">📜 任務簡報</h2>
        <div class="scenario-content">
          <p class="chapter-scenario">{chapterInfo?.scenario || "展開冒險吧！"}</p>
          <div class="divider"></div>
          <p class="level-scenario">{levelInfo?.scenario || "準備好了嗎？"}</p>
        </div>
        
        {#if isBossLevel}
          <div class="boss-preview">
            <div class="boss-icon">👺</div>
            <div class="boss-details">
              <h3>{bossInfo.name}</h3>
              <p>{bossInfo.description}</p>
              <div class="boss-hp-preview">生命值: {bossInfo.hp}</div>
            </div>
          </div>
        {/if}
        
        <button class="btn-primary large" on:click={startQuest}>
          {isBossLevel ? "⚔️ 開始戰鬥" : "🚀 開始任務"}
        </button>
      </div>
    </div>
  {/if}

  {#if gameState === "playing"}
    <!-- 遊戲畫面 -->
    <div class="game-content">
      {#if isBossLevel}
        <!-- 魔王戰鬥區域 -->
        <div class="boss-section" in:fly={{ y: -20 }}>
          <div class="boss-header">
            <span class="boss-name">👺 {bossInfo.name}</span>
            <div class="boss-stats">
              <span class="boss-hp-text">HP: {bossHP} / {maxBossHP}</span>
              {#if timeLeft > 0}
                <span class="timer-text" class:danger={timeLeft <= 3}>⏱️ {timeLeft}s</span>
              {/if}
            </div>
          </div>
          <div class="hp-bar-container">
            <div 
              class="hp-fill" 
              style="width: {(bossHP / maxBossHP) * 100}%"
            ></div>
          </div>
          {#if timeLeft > 0}
            <div class="timer-bar-container">
              <div 
                class="timer-fill" 
                style="width: {(timeLeft / (levelInfo.difficulty === 'expert' ? 8 : levelInfo.difficulty === 'hard' ? 12 : 15)) * 100}%"
                class:danger={timeLeft <= 3}
              ></div>
            </div>
          {/if}
        </div>
      {/if}

      <!-- 進度 -->
      <div class="progress-section">
        <div class="progress-bar">
          <div
            class="progress-fill"
            style="width: {((currentIndex + 1) / questions.length) *
              100}%; background: {chapterInfo?.color || '#4A90E2'};"
          ></div>
        </div>
        <p class="progress-text">
          第 {currentIndex + 1} / {questions.length} 題
        </p>
      </div>

      {#if questions.length > 0}
        {@const currentQuestion = questions[currentIndex]}

        <!-- 題目卡片 -->
        {#key currentQuestion.id}
          <div
            class="question-card postcard"
            class:foggy={isFoggy}
            in:fly={{ y: 50, duration: 400, easing: elasticOut }}
          >
            <!-- 中文字 -->
            <div class="word-display">
              <h1 class="chinese-word">
                {formatQuestionText(currentQuestion)}
              </h1>
            </div>

            <!-- 題型標籤與額外資訊 -->
            {#if currentQuestion.type}
              <div class="question-info">
                {#if currentQuestion.type === "idiom"}
                  <div class="question-type-badge idiom">📚 成語讀音</div>
                {:else if currentQuestion.type === "classical"}
                  <div class="question-type-badge classical">📜 古文讀音</div>
                {:else if currentQuestion.type === "poetry"}
                  <div class="question-type-badge poetry">🎋 詩詞讀音</div>
                {:else if currentQuestion.type === "multiPronunciation"}
                  <div class="question-type-badge multi">🔤 多音字辨析</div>
                {:else if currentQuestion.type === "proverb"}
                  <div class="question-type-badge proverb">💬 諺語讀音</div>
                {:else if currentQuestion.type === "similarSound"}
                  <div class="question-type-badge similar">🎯 形近音辨析</div>
                {/if}

                {#if currentQuestion.subInfo}
                  <p class="source-info">{currentQuestion.subInfo}</p>
                {/if}

                {#if currentQuestion.hint}
                  <p class="hint">💡 {currentQuestion.hint}</p>
                {/if}
              </div>
            {/if}

            <!-- 選項 -->
            <div class="options-grid">
              {#each currentQuestion.options as option, idx}
                <button
                  class="option-btn"
                  class:correct={showFeedback && option.isCorrect}
                  class:wrong={showFeedback && !option.isCorrect && !isCorrect}
                  disabled={showFeedback}
                  on:click={() => handleAnswer(option)}
                  in:scale={{ delay: idx * 100, duration: 300 }}
                >
                  <span class="option-text">
                    {#if option.text}
                      {option.text}
                    {:else}
                      {option.pinyin}
                    {/if}
                  </span>
                </button>
              {/each}
            </div>
          </div>
        {/key}

        <!-- 答題回饋 -->
        {#if showFeedback}
          <div class="feedback-overlay" transition:fade={{ duration: 200 }}>
            <div
              class="feedback-icon"
              in:scale={{ duration: 300, easing: elasticOut }}
            >
              {#if isCorrect}
                <div class="success-icon">💥</div>
              {:else}
                <div class="error-icon">💔</div>
              {/if}
            </div>
          </div>
        {/if}
      {/if}
    </div>
  {:else if gameState === "level_complete"}
    <!-- 完成畫面 -->
    <div class="complete-screen" in:scale>
      <div class="complete-card postcard">
        <h1 class="complete-title">🎉 {isBossLevel ? "大獲全勝！" : "任務完成！"}</h1>

        <div class="score-display">
          <p class="score-text">答對題數</p>
          <p class="score-number">{score} / {questions.length}</p>

          <div class="stars-display">
            {#each Array(3) as _, i}
              <span
                class="star"
                class:filled={i < calculateStars()}
                in:scale={{ delay: i * 200 }}
              >
                ⭐
              </span>
            {/each}
          </div>
        </div>

        {#if chapterInfo}
          <div class="chapter-complete-badge">
            <p>{chapterInfo.icon} {chapterInfo.name}</p>
            <p class="level-name">第 {level} 關成功解救！</p>
          </div>
        {/if}

        <div class="action-buttons">
          <button class="btn-secondary" on:click={retryLevel}>
            🔄 重新挑戰
          </button>
          <button class="btn-primary" on:click={nextLevel}> ▶️ 下一關 </button>
        </div>

        <button class="btn-outline" on:click={onBack}> 🗺️ 返回地圖 </button>
      </div>
    </div>
  {:else if gameState === "game_over"}
    <!-- 失敗畫面 -->
    <div class="complete-screen" in:scale>
      <div class="complete-card postcard game-over">
        <h1 class="complete-title">💔 體力耗盡...</h1>
        <p class="game-over-text">不要氣餒，再試一次吧！</p>
        
        <div class="boss-preview mini">
          <div class="boss-icon">👹</div>
          <p>魔王還剩 {bossHP} HP</p>
        </div>

        <div class="action-buttons single">
          <button class="btn-primary" on:click={retryLevel}> 🔄 再次挑戰 </button>
        </div>

        <button class="btn-outline" on:click={onBack}> 🗺️ 返回地圖 </button>
      </div>
    </div>
  {/if}
</div>

<style>
  .game-container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #87ceeb 0%, #fff8e7 100%);
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  .shake {
    animation: shake-animation 0.5s cubic-bezier(.36,.07,.19,.97) both;
  }

  @keyframes shake-animation {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
    40%, 60% { transform: translate3d(4px, 0, 0); }
  }

  /* 頂部工具列 */
  .game-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .back-btn {
    background: #f1f5f9;
    border: none;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
  }

  .back-btn:hover {
    background: #e2e8f0;
    transform: translateX(-2px);
  }

  .chapter-badge {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2d3748;
  }

  .stats-bar {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .player-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #fff5f5;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    border: 1px solid #feb2b2;
  }

  .mascot {
    font-size: 1.4rem;
    filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.1));
  }

  .player-hearts {
    display: flex;
    gap: 2px;
  }

  .heart {
    font-size: 1.2rem;
    filter: drop-shadow(0 0 2px rgba(255, 0, 0, 0.3));
  }

  .heart.empty {
    filter: grayscale(1) opacity(0.3);
  }

  .stat {
    font-size: 1.2rem;
    font-weight: 700;
    color: #4a5568;
  }

  .combo {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    animation: pulse-glow 1s infinite;
  }

  @keyframes pulse-glow {
    0%,
    100% {
      box-shadow: 0 0 10px rgba(255, 107, 107, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 107, 107, 0.8);
    }
  }

  /* 劇情任務遮罩 */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
  }

  .scenario-card {
    width: 100%;
    max-width: 500px;
    padding: 2.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .scenario-title {
    font-size: 1.8rem;
    font-weight: 900;
    color: #2d3748;
    margin: 0;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
  }

  .scenario-content {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 16px;
    border-left: 6px solid #4a90e2;
  }

  .chapter-scenario {
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.6;
    margin: 0;
  }

  .divider {
    height: 1px;
    background: #e2e8f0;
    margin: 1rem 0;
  }

  .level-scenario {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
  }

  .boss-preview {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fff5f5;
    padding: 1rem;
    border-radius: 16px;
    border: 2px solid #feb2b2;
    text-align: left;
  }

  .boss-icon {
    font-size: 3rem;
  }

  .boss-details h3 {
    margin: 0;
    color: #c53030;
    font-size: 1.2rem;
  }

  .boss-details p {
    margin: 0.25rem 0;
    font-size: 0.9rem;
    color: #718096;
  }

  .boss-hp-preview {
    font-weight: 700;
    color: #e53e3e;
    font-size: 0.9rem;
  }

  .btn-primary.large {
    padding: 1.2rem;
    font-size: 1.3rem;
    width: 100%;
  }

  /* 魔王血條 */
  .boss-section {
    width: 100%;
    margin-bottom: 1.5rem;
    background: white;
    padding: 1rem;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(197, 48, 48, 0.15);
    border: 2px solid #feb2b2;
  }

  .boss-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .boss-stats {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .timer-text {
    font-size: 0.9rem;
    font-weight: 900;
    color: #4a5568;
    background: #edf2f7;
    padding: 2px 8px;
    border-radius: 8px;
  }

  .timer-text.danger {
    color: #e53e3e;
    animation: blink 0.5s infinite;
  }

  @keyframes blink {
    50% { opacity: 0.5; }
  }

  .boss-name {
    font-weight: 900;
    color: #c53030;
    font-size: 1.1rem;
  }

  .boss-hp-text {
    font-size: 0.9rem;
    font-weight: 700;
    color: #718096;
  }

  .hp-bar-container {
    height: 12px;
    background: #edf2f7;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 4px;
  }

  .hp-fill {
    height: 100%;
    background: linear-gradient(90deg, #ff4d4d, #c53030);
    border-radius: 6px;
    transition: width 0.3s ease;
  }

  .timer-bar-container {
    height: 4px;
    background: #e2e8f0;
    border-radius: 2px;
    overflow: hidden;
  }

  .timer-fill {
    height: 100%;
    background: #4a90e2;
    transition: width 1s linear;
  }

  .timer-fill.danger {
    background: #e53e3e;
  }

  /* 迷霧效果 */
  .foggy {
    filter: blur(4px);
    transition: filter 0.5s ease;
  }

  .foggy:hover {
    filter: blur(0px); /* 滑鼠指上去可以暫時看清楚，增加互動性 */
  }

  /* 遊戲內容 */
  .game-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
  }

  .progress-section {
    width: 100%;
    margin-bottom: 2rem;
  }

  .progress-bar {
    width: 100%;
    height: 12px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .progress-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 0.5s ease;
  }

  .progress-text {
    text-align: center;
    margin: 0.5rem 0 0 0;
    font-size: 0.9rem;
    font-weight: 700;
    color: #4a5568;
  }

  /* 題目卡片 */
  .question-card {
    width: 100%;
    max-width: 100%;
    padding: 2rem 1.5rem;
    background: white;
  }

  .word-display {
    text-align: center;
    margin-bottom: 2rem;
  }

  .chinese-word {
    font-size: 4rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
    line-height: 1.2;
  }

  /* 題型資訊 */
  .question-info {
    text-align: center;
    margin: 1rem 0 2rem 0;
  }

  .question-type-badge {
    display: inline-block;
    padding: 0.4rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .question-type-badge.idiom { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
  .question-type-badge.classical { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
  .question-type-badge.poetry { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; }
  .question-type-badge.multi { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; }
  .question-type-badge.proverb { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; }
  .question-type-badge.similar { background: linear-gradient(135deg, #30cfd0 0%, #330867 100%); color: white; }

  .hint, .source-info {
    font-size: 0.9rem;
    color: #718096;
    margin: 0.25rem 0 0 0;
    line-height: 1.4;
    font-weight: 500;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .option-btn {
    background: white;
    border: 3px solid #e2e8f0;
    border-radius: 16px;
    padding: 1.5rem 0.5rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.2s;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
    box-shadow: 0 4px 0 #cbd5e0;
  }

  .option-btn:hover:not(:disabled) {
    border-color: #4a90e2;
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #cbd5e0;
  }

  .option-btn.correct { background: linear-gradient(135deg, #6fcf97 0%, #56b67e 100%); border-color: #3d9c64; color: white; }
  .option-btn.wrong { background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); border-color: #c0392b; color: white; }

  /* 答題回饋 */
  .feedback-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255, 255, 255, 0.2);
    z-index: 100;
    pointer-events: none;
  }

  .feedback-icon { font-size: 8rem; }
  .success-icon { filter: drop-shadow(0 0 20px rgba(111, 207, 151, 0.8)); }
  .error-icon { filter: drop-shadow(0 0 20px rgba(255, 107, 107, 0.8)); }

  /* 完成與失敗畫面 */
  .complete-screen {
    flex: 1; display: flex; align-items: center; justify-content: center; padding: 1.5rem;
  }

  .complete-card {
    width: 100%; max-width: 500px; padding: 2.5rem; text-align: center;
  }

  .game-over { border: 4px solid #feb2b2; }
  .game-over-text { font-size: 1.2rem; color: #e53e3e; font-weight: 700; margin-bottom: 1.5rem; }

  .complete-title {
    font-size: 2.2rem; font-weight: 900; color: #2d3748; margin-bottom: 1.5rem;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
  }

  .score-display { margin-bottom: 2rem; }
  .score-number { font-size: 2.8rem; font-weight: 900; color: #4a90e2; margin: 0.5rem 0; }

  .stars-display { display: flex; justify-content: center; gap: 0.5rem; }
  .star { font-size: 2.5rem; opacity: 0.2; }
  .star.filled { opacity: 1; }

  .chapter-complete-badge { background: #f7fafc; border-radius: 16px; padding: 1rem; margin-bottom: 1.5rem; }
  .chapter-complete-badge p { margin: 0.25rem 0; font-weight: 700; color: #4a5568; }

  .action-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
  .action-buttons.single { grid-template-columns: 1fr; }

  .btn-primary, .btn-secondary, .btn-outline {
    padding: 1rem; border-radius: 16px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; border: none;
  }

  .btn-primary { background: linear-gradient(135deg, #4a90e2 0%, #3a7bc8 100%); color: white; box-shadow: 0 4px 0 #2a5ba8; }
  .btn-secondary { background: white; color: #4a5568; border: 3px solid #e2e8f0; }
  .btn-outline { background: transparent; color: #4a5568; border: 2px solid #e2e8f0; }

  .mini { transform: scale(0.9); margin-bottom: 1.5rem; }

  /* 響應式 */
  @media (max-width: 480px) {
    .chinese-word { font-size: 3rem; }
    .option-btn { font-size: 1.2rem; padding: 1.2rem 0.2rem; }
    .scenario-card { padding: 1.5rem; }
    .scenario-title { font-size: 1.5rem; }
  }
</style>
