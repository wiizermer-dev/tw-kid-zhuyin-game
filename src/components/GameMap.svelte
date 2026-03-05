<script>
  import { chapters, getChapterProgress, getNextPlayableLevel, isLevelUnlocked } from "../data/chapters.js";
  import { fade, fly, scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  
  export let completedLevels = [];
  export let currentLevel = 1;
  export let onSelectLevel = (level) => {};
  export let onBack = () => {};
  
  let selectedChapter = null;
  let showLevelDetail = false;
  
  // 計算每個章節的進度
  $: chapterProgresses = chapters.map(chapter => ({
    ...chapter,
    progress: getChapterProgress(chapter.id, completedLevels),
    isUnlocked: chapter.levels[0] ? isLevelUnlocked(chapter.levels[0].level, completedLevels) : false
  }));
  
  $: nextLevel = getNextPlayableLevel(completedLevels);
  
  function selectChapter(chapter) {
    if (chapter.isUnlocked) {
      selectedChapter = chapter;
    }
  }
  
  function selectLevel(level) {
    if (isLevelUnlocked(level.level, completedLevels)) {
      onSelectLevel(level.level);
    }
  }
  
  function getStarsForLevel(levelNum) {
    // 從 localStorage 獲取星數
    const starsData = localStorage.getItem("zhuyin_stars_per_level");
    if (starsData) {
      const stars = JSON.parse(starsData);
      return stars[levelNum] || 0;
    }
    return completedLevels.includes(levelNum) ? 1 : 0;
  }
</script>

<div class="map-container">
  <!-- 返回按鈕 -->
  <button class="back-btn" on:click={onBack}>
    ← 返回選單
  </button>
  
  {#if !selectedChapter}
    <!-- 章節選擇畫面 -->
    <div class="map-view" in:fade>
      <h1 class="map-title">🗺️ 台灣環島地圖</h1>
      <p class="map-subtitle">
        目前進度：{completedLevels.length} / 100 關
        {#if nextLevel}
          | 下一關：第 {nextLevel} 關
        {:else}
          | 🎉 全部完成！
        {/if}
      </p>
      
      <div class="chapters-grid">
        {#each chapterProgresses as chapter (chapter.id)}
          <div
            class="chapter-card"
            class:unlocked={chapter.isUnlocked}
            class:locked={!chapter.isUnlocked}
            on:click={() => selectChapter(chapter)}
            animate:flip={{ duration: 300 }}
            in:scale={{ delay: chapter.id * 50 }}
          >
            <div class="chapter-icon">{chapter.icon}</div>
            <h3 class="chapter-name">{chapter.name}</h3>
            <p class="chapter-landmark">📍 {chapter.landmark}</p>
            
            {#if chapter.isUnlocked}
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  style="width: {chapter.progress}%; background: {chapter.color};"
                ></div>
              </div>
              <p class="progress-text">{chapter.progress}% 完成</p>
            {:else}
              <div class="locked-badge">
                🔒 未解鎖
              </div>
            {/if}
            
            <p class="chapter-levels">
              關卡 {chapter.levels[0].level} - {chapter.levels[chapter.levels.length - 1].level}
            </p>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <!-- 關卡選擇畫面 -->
    <div class="levels-view" in:fly={{ x: 300 }}>
      <div class="chapter-header">
        <button class="back-chapter-btn" on:click={() => selectedChapter = null}>
          ← 返回地圖
        </button>
        <div class="header-info">
          <h2 class="chapter-title">
            {selectedChapter.icon} {selectedChapter.name}
          </h2>
          <p class="chapter-desc">{selectedChapter.description}</p>
        </div>
      </div>
      
      <div class="levels-grid">
        {#each selectedChapter.levels as level (level.level)}
          {@const unlocked = isLevelUnlocked(level.level, completedLevels)}
          {@const completed = completedLevels.includes(level.level)}
          {@const stars = getStarsForLevel(level.level)}
          {@const isBoss = selectedChapter.boss.some(b => b.level === level.level)}
          
          <button
            class="level-card"
            class:unlocked
            class:completed
            class:boss={isBoss}
            class:current={level.level === nextLevel}
            disabled={!unlocked}
            on:click={() => selectLevel(level)}
            in:scale={{ delay: (level.level % 10) * 30 }}
          >
            {#if isBoss}
              <div class="boss-badge">👺 BOSS</div>
            {/if}
            
            <div class="level-number">{level.level}</div>
            
            {#if completed}
              <div class="stars">
                {#each Array(3) as _, i}
                  <span class="star" class:filled={i < stars}>⭐</span>
                {/each}
              </div>
            {:else if unlocked}
              <div class="play-icon">▶️</div>
            {:else}
              <div class="lock-icon">🔒</div>
            {/if}
            
            <p class="level-name">{level.name}</p>
          </button>
        {/each}
      </div>
      
      <!-- Boss 資訊 -->
      {#if selectedChapter.boss && selectedChapter.boss.length > 0}
        <div class="boss-list" in:fade={{ delay: 300 }}>
          {#each selectedChapter.boss as boss}
            <div class="boss-info postcard">
              <h3>👺 {boss.name} (第 {boss.level} 關)</h3>
              <p>{boss.description}</p>
              <div class="boss-rule">
                ⚡ 特殊規則：{boss.specialRule}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  .map-container {
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #87CEEB 0%, #FFF8E7 50%, #FFE4B5 100%);
    padding: 1rem;
    position: relative;
    overflow-x: hidden;
  }
  
  .back-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: white;
    border: none;
    border-radius: 12px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
    z-index: 10;
  }
  
  .back-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  
  /* 章節選擇視圖 */
  .map-view {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding-top: 4rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .map-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 900;
    color: #2d3748;
    margin: 0 0 0.5rem 0;
    font-family: 'TW-Kai', 'DFKai-SB', 'BiauKai', '標楷體', serif;
  }
  
  .map-subtitle {
    text-align: center;
    font-size: 1.1rem;
    color: #4a5568;
    margin: 0 0 2rem 0;
    font-weight: 600;
  }
  
  .chapters-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    padding: 0 1rem;
  }
  
  .chapter-card {
    background: white;
    border-radius: 24px;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s;
    border: 3px solid transparent;
    position: relative;
  }
  
  .chapter-card.unlocked:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  }
  
  .chapter-card.locked {
    opacity: 0.6;
    cursor: not-allowed;
    filter: grayscale(0.7);
  }
  
  .chapter-icon {
    font-size: 4rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .chapter-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2d3748;
    text-align: center;
    margin: 0 0 0.5rem 0;
    font-family: 'TW-Kai', 'DFKai-SB', 'BiauKai', '標楷體', serif;
  }
  
  .chapter-landmark {
    text-align: center;
    color: #718096;
    font-size: 0.95rem;
    margin: 0 0 1rem 0;
  }
  
  .progress-bar {
    width: 100%;
    height: 12px;
    background: #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }
  
  .progress-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 0.5s ease;
  }
  
  .progress-text {
    text-align: center;
    font-size: 0.9rem;
    font-weight: 700;
    color: #4a5568;
    margin: 0;
  }
  
  .locked-badge {
    text-align: center;
    background: #f1f5f9;
    padding: 0.5rem;
    border-radius: 8px;
    font-weight: 700;
    color: #64748b;
    margin: 1rem 0;
  }
  
  .chapter-levels {
    text-align: center;
    font-size: 0.85rem;
    color: #a0aec0;
    margin: 1rem 0 0 0;
  }
  
  /* 關卡選擇視圖 */
  .levels-view {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding-top: 4rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  
  .chapter-header {
    background: white;
    border-radius: 24px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .back-chapter-btn {
    background: #f1f5f9;
    border: none;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    font-size: 0.95rem;
    font-weight: 700;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: all 0.2s;
  }
  
  .back-chapter-btn:hover {
    background: #e2e8f0;
  }
  
  .chapter-title {
    font-size: 2rem;
    font-weight: 900;
    color: #2d3748;
    margin: 0 0 0.5rem 0;
    font-family: 'TW-Kai', 'DFKai-SB', 'BiauKai', '標楷體', serif;
  }
  
  .chapter-desc {
    font-size: 1.1rem;
    color: #718096;
    margin: 0;
  }
  
  .levels-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    padding: 0 1rem;
  }
  
  .level-card {
    background: white;
    border: 3px solid #e2e8f0;
    border-radius: 16px;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
  }
  
  .level-card:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .level-card.unlocked:not(:disabled):hover {
    transform: translateY(-4px);
    border-color: #4A90E2;
    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
  }
  
  .level-card.completed {
    background: linear-gradient(135deg, #fff5f5 0%, #fff 100%);
    border-color: #ffd700;
  }
  
  .level-card.current {
    border-color: #4A90E2;
    border-width: 4px;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.7);
    }
    50% {
      box-shadow: 0 0 0 10px rgba(74, 144, 226, 0);
    }
  }
  
  .level-card.boss {
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    border-color: #FF8C00;
    grid-column: span 2;
  }
  
  .boss-badge {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #E74C3C;
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .level-number {
    font-size: 2rem;
    font-weight: 900;
    color: #2d3748;
  }
  
  .stars {
    display: flex;
    gap: 0.25rem;
  }
  
  .star {
    font-size: 1.2rem;
    opacity: 0.3;
  }
  
  .star.filled {
    opacity: 1;
  }
  
  .play-icon {
    font-size: 1.5rem;
  }
  
  .lock-icon {
    font-size: 1.5rem;
    opacity: 0.5;
  }
  
  .level-name {
    font-size: 0.85rem;
    color: #718096;
    text-align: center;
    margin: 0;
  }
  
  .boss-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
    padding: 0 1rem;
  }
  
  .boss-info {
    width: 100%;
    padding: 2rem;
  }
  
  .boss-info h3 {
    font-size: 1.5rem;
    margin: 0 0 1rem 0;
    color: #2d3748;
  }
  
  .boss-info p {
    font-size: 1.1rem;
    color: #4a5568;
    margin: 0 0 1rem 0;
  }
  
  .boss-rule {
    background: #fff5f5;
    border-left: 4px solid #E74C3C;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 700;
    color: #c53030;
  }
  
  /* 響應式 */
  @media (max-width: 640px) {
    .map-container {
      padding: 0.5rem;
    }
    
    .map-view,
    .levels-view {
      padding-top: 3rem;
      padding-left: 0.25rem;
      padding-right: 0.25rem;
    }
    
    .map-title {
      font-size: 1.6rem;
      padding: 0 0.5rem;
    }
    
    .map-subtitle {
      font-size: 0.95rem;
      padding: 0 0.5rem;
    }
    
    .chapters-grid {
      grid-template-columns: 1fr;
      padding: 0 0.5rem;
      gap: 1rem;
    }
    
    .chapter-card {
      padding: 1.5rem;
    }
    
    .levels-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
      padding: 0 0.5rem;
    }
    
    .level-card {
      padding: 1rem 0.5rem;
    }
    
    .level-card.boss {
      grid-column: span 3;
    }
    
    .chapter-header {
      padding: 1.5rem;
    }
    
    .boss-info {
      padding: 1.5rem;
    }
  }
  
  @media (max-width: 380px) {
    .map-title {
      font-size: 1.4rem;
    }
    
    .chapter-icon {
      font-size: 3rem;
    }
    
    .levels-grid {
      gap: 0.5rem;
    }
    
    .level-card {
      padding: 0.75rem 0.25rem;
    }
    
    .level-number {
      font-size: 1.5rem;
    }
  }
</style>
