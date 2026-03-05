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
  let gameState = "playing"; // 'playing', 'level_complete'
  let comboCount = 0;

  // 關卡資訊
  let levelInfo = null;
  let chapterInfo = null;

  // 答題統計
  let startTime = Date.now();
  let questionTimes = [];

  onMount(() => {
    loadLevel();
  });

  function loadLevel() {
    levelInfo = getLevelInfo(level);
    if (levelInfo) {
      chapterInfo = levelInfo.chapter;
      questions = generateLevelData(level, 10, false);
      currentIndex = 0;
      score = 0;
      comboCount = 0;
      gameState = "playing";
      startTime = Date.now();
      questionTimes = [];
    }
  }

  async function handleAnswer(option) {
    if (showFeedback) return;

    const currentQuestion = questions[currentIndex];
    isCorrect = option.isCorrect;

    // 記錄答題時間
    const questionTime = Date.now() - startTime;
    questionTimes.push(questionTime);

    if (isCorrect) {
      score += 1;
      comboCount += 1;

      // 播放音效
      if (comboCount > 3) {
        playComboSound(); // Combo 特殊音效
      } else {
        playCorrectSound();
      }
    } else {
      comboCount = 0;
      playWrongSound();
    }

    showFeedback = true;

    // Speed run 模式：快速切換到下一題
    setTimeout(() => {
      showFeedback = false;
      if (currentIndex < questions.length - 1) {
        currentIndex += 1;
        startTime = Date.now();
      } else {
        finishLevel();
      }
    }, 500); // 從 1200ms 降至 500ms，加快 speed run 節奏
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

<div class="game-container">
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
      <span class="stat">⭐ {score}</span>
      {#if comboCount > 1}
        <span class="combo" in:scale>🔥 {comboCount}</span>
      {/if}
    </div>
  </div>

  {#if gameState === "playing"}
    <!-- 遊戲畫面 -->
    <div class="game-content">
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
            in:fly={{ y: 50, duration: 400, easing: elasticOut }}
          >
            <!-- 中文字 -->
            <div class="word-display">
              <h1 class="chinese-word">
                {formatQuestionText(currentQuestion)}
              </h1>
              <!-- English is no longer in unified schema but might be needed for basic words? 
                   Basic words used 'word' which is now 'displayText'. 
                   If legacy basic words exist, we assume they map to this schema. 
                   If 'english' field is missing from generator, we can omit it or add it if generator supports it.
                   Generator refactor didn't include english for basic words explicitly but covered all Expansion types. 
                   Assuming Expansion questions mostly. -->
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
                <div class="success-icon">✅</div>
              {:else}
                <div class="error-icon">❌</div>
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
        <h1 class="complete-title">🎉 關卡完成！</h1>

        <div class="score-display">
          <p class="score-text">得分</p>
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
            <p class="level-name">第 {level} 關完成</p>
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
  {/if}
</div>

<style>
  .game-container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #87ceeb 0%, #fff8e7 100%);
    display: flex;
    flex-direction: column;
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

  /* 遊戲內容 */
  .game-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 1rem;
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
    height: 16px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .progress-fill {
    height: 100%;
    border-radius: 8px;
    transition: width 0.5s ease;
  }

  .progress-text {
    text-align: center;
    margin: 0.5rem 0 0 0;
    font-size: 1rem;
    font-weight: 700;
    color: #4a5568;
  }

  /* 題目卡片 */
  .question-card {
    width: 100%;
    max-width: 100%;
    padding: 2.5rem 1.5rem;
    background: white;
  }

  .word-display {
    text-align: center;
    margin-bottom: 3rem;
  }

  .chinese-word {
    font-size: 5rem;
    font-weight: 700;
    color: #2d3748;
    margin: 0 0 1rem 0;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
    line-height: 1;
  }

  .english-word {
    font-size: 1.8rem;
    color: #718096;
    margin: 0;
    font-weight: 600;
  }

  /* 題型資訊 */
  .question-info {
    text-align: center;
    margin: 1.5rem 0 2rem 0;
  }

  .question-type-badge {
    display: inline-block;
    padding: 0.5rem 1.25rem;
    border-radius: 20px;
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .question-type-badge.idiom {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .question-type-badge.classical {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  .question-type-badge.poetry {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
  }

  .question-type-badge.multi {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    color: white;
  }

  .question-type-badge.proverb {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    color: white;
  }

  .question-type-badge.similar {
    background: linear-gradient(135deg, #30cfd0 0%, #330867 100%);
    color: white;
  }

  .hint,
  .source-info,
  .author-info {
    font-size: 0.95rem;
    color: #718096;
    margin: 0.5rem 0 0 0;
    line-height: 1.5;
    font-weight: 500;
  }

  .options-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .option-btn {
    background: white;
    border: 4px solid #e2e8f0;
    border-radius: 20px;
    padding: 2rem 1rem;
    font-size: 1.8rem;
    font-weight: 700;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.3s;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
    box-shadow: 0 4px 0 #cbd5e0;
  }

  .option-btn:hover:not(:disabled) {
    border-color: #4a90e2;
    transform: translateY(-4px);
    box-shadow: 0 8px 0 #cbd5e0;
  }

  .option-btn:active:not(:disabled) {
    transform: translateY(4px);
    box-shadow: none;
  }

  .option-btn.correct {
    background: linear-gradient(135deg, #6fcf97 0%, #56b67e 100%);
    border-color: #3d9c64;
    color: white;
  }

  .option-btn.wrong {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
    border-color: #c0392b;
    color: white;
  }

  .option-text {
    display: block;
  }

  /* 答題回饋 */
  .feedback-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
    z-index: 100;
    pointer-events: none;
  }

  .feedback-icon {
    font-size: 10rem;
  }

  .success-icon {
    filter: drop-shadow(0 0 30px rgba(111, 207, 151, 0.8));
  }

  .error-icon {
    filter: drop-shadow(0 0 30px rgba(255, 107, 107, 0.8));
  }

  /* 完成畫面 */
  .complete-screen {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .complete-card {
    width: 100%;
    max-width: 500px;
    padding: 3rem 2rem;
    text-align: center;
  }

  .complete-title {
    font-size: 2.5rem;
    font-weight: 900;
    color: #2d3748;
    margin: 0 0 2rem 0;
    font-family: "TW-Kai", "DFKai-SB", "BiauKai", "標楷體", serif;
  }

  .score-display {
    margin-bottom: 2rem;
  }

  .score-text {
    font-size: 1.2rem;
    color: #718096;
    margin: 0 0 0.5rem 0;
  }

  .score-number {
    font-size: 3rem;
    font-weight: 900;
    color: #4a90e2;
    margin: 0 0 1rem 0;
  }

  .stars-display {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .star {
    font-size: 3rem;
    opacity: 0.3;
    transition: opacity 0.3s;
  }

  .star.filled {
    opacity: 1;
  }

  .chapter-complete-badge {
    background: #f7fafc;
    border-radius: 16px;
    padding: 1rem;
    margin-bottom: 2rem;
  }

  .chapter-complete-badge p {
    margin: 0.25rem 0;
    font-weight: 700;
    color: #4a5568;
  }

  .level-name {
    font-size: 0.95rem;
    color: #a0aec0 !important;
  }

  .action-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .btn-primary,
  .btn-secondary,
  .btn-outline {
    padding: 1rem 1.5rem;
    border-radius: 16px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
    border: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4a90e2 0%, #3a7bc8 100%);
    color: white;
    box-shadow: 0 4px 0 #2a5ba8;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 0 #2a5ba8;
  }

  .btn-primary:active {
    transform: translateY(4px);
    box-shadow: none;
  }

  .btn-secondary {
    background: white;
    color: #4a5568;
    border: 3px solid #e2e8f0;
  }

  .btn-secondary:hover {
    border-color: #cbd5e0;
    background: #f7fafc;
  }

  .btn-outline {
    background: transparent;
    color: #4a5568;
    border: 2px solid #e2e8f0;
  }

  .btn-outline:hover {
    background: white;
  }

  /* 響應式 */
  @media (max-width: 640px) {
    .game-content {
      padding: 1rem 0.75rem;
    }

    .question-card {
      padding: 2rem 1rem;
    }

    .word-display {
      margin-bottom: 2rem;
    }

    .chinese-word {
      font-size: 3.5rem;
    }

    .english-word {
      font-size: 1.3rem;
    }

    .options-grid {
      gap: 1rem;
    }

    .option-btn {
      padding: 1.25rem 0.5rem;
      font-size: 1.3rem;
      border-width: 3px;
    }

    .complete-screen {
      padding: 1rem;
    }

    .complete-card {
      padding: 2rem 1.5rem;
    }

    .complete-title {
      font-size: 1.8rem;
    }

    .score-number {
      font-size: 2.5rem;
    }

    .star {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 380px) {
    .question-card {
      padding: 1.5rem 0.75rem;
    }

    .chinese-word {
      font-size: 3rem;
    }

    .english-word {
      font-size: 1.1rem;
    }

    .options-grid {
      gap: 0.75rem;
    }

    .option-btn {
      padding: 1rem 0.25rem;
      font-size: 1.1rem;
    }

    .complete-title {
      font-size: 1.5rem;
    }

    .action-buttons {
      gap: 0.75rem;
    }

    .btn-primary,
    .btn-secondary {
      padding: 0.875rem 1rem;
    }
  }
</style>
