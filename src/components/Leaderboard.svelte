<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { getLeaderboard, getBrowserId, getHardestQuestions, calculateWrongRate, getMyRank } from '../lib/supabase.js';
    
    export let onClose = () => {};
    
    let activeTab = 'stars';  // 'stars' | 'hard_mode' | 'hardest'
    let leaderboard = [];
    let hardestQuestions = [];
    let loading = true;
    let currentBrowserId = '';
    let myRank = null;  // 目前用戶排名
    
    onMount(async () => {
        currentBrowserId = getBrowserId();
        await loadData();
    });
    
    async function loadData() {
        loading = true;
        myRank = null;
        try {
            if (activeTab === 'hardest') {
                hardestQuestions = await getHardestQuestions(10);
            } else {
                leaderboard = await getLeaderboard(activeTab);
                myRank = await getMyRank(activeTab);
            }
        } catch (e) {
            console.error('Load data error:', e);
        }
        loading = false;
    }
    
    function switchTab(tab) {
        activeTab = tab;
        loadData();
    }
</script>

<div class="leaderboard-overlay" transition:fade on:click|self={onClose}>
    <div class="leaderboard-card" in:fly={{ y: 50 }}>
        <button class="close-btn" on:click={onClose}>✕</button>
        <h1>🏆 排行榜</h1>
        
        <!-- TABS -->
        <div class="tabs">
            <button class:active={activeTab === 'stars'} on:click={() => switchTab('stars')}>
                🌟 總星星
            </button>
            <button class:active={activeTab === 'hard_mode'} on:click={() => switchTab('hard_mode')}>
                🔥 困難模式
            </button>
            <button class:active={activeTab === 'hardest'} on:click={() => switchTab('hardest')}>
                💀 魔王題
            </button>
        </div>
        
        <!-- CONTENT -->
        <div class="content">
            {#if loading}
                <div class="loading">載入中...</div>
            {:else if activeTab === 'hardest'}
                <!-- 魔王題列表 -->
                <div class="hardest-list">
                    {#each hardestQuestions as q, i}
                        <div class="hardest-item">
                            <span class="rank">{i + 1}</span>
                            <span class="word">{q.word}</span>
                            <span class="answer">{q.correct_answer}</span>
                            <span class="wrong-rate">{calculateWrongRate(q)}% 答錯</span>
                        </div>
                    {:else}
                        <div class="empty">還沒有足夠的統計資料 🧐<br><small>需要至少 10 次答題才會顯示</small></div>
                    {/each}
                </div>
            {:else}
                <!-- 排行榜列表 -->
                <div class="ranking-list">
                    {#each leaderboard as entry, i}
                        {@const isMe = entry.players?.browser_id === currentBrowserId}
                        <div class="rank-item" class:is-me={isMe}>
                            <span class="rank">
                                {#if i === 0}🥇{:else if i === 1}🥈{:else if i === 2}🥉{:else}{i + 1}{/if}
                            </span>
                            <span class="name">
                                {entry.players?.name || '???'}
                                {#if isMe}<span class="me-tag">← 你</span>{/if}
                            </span>
                            <span class="score">
                                {#if activeTab === 'stars'}
                                    🌟 {entry.total_stars}
                                {:else}
                                    💯 {entry.hard_mode_high_score}
                                {/if}
                            </span>
                        </div>
                    {:else}
                        <div class="empty">還沒有人上榜 🏃‍♂️<br><small>成為第一個吧！</small></div>
                    {/each}
                </div>
            {/if}
        </div>
        
        <!-- 排名願示 -->
        {#if myRank && activeTab !== 'hardest'}
            <div class="my-rank-bar">
                🏅 你的排名：第 <strong>{myRank}</strong> 名
            </div>
        {/if}
        
        <!-- 重新整理按鈕 -->
        <button class="refresh-btn" on:click={loadData} disabled={loading}>
            🔄 重新整理
        </button>
    </div>
</div>

<style>
    .leaderboard-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }
    
    .leaderboard-card {
        background: white;
        width: 90%;
        max-width: 400px;
        max-height: 80vh;
        border-radius: 24px;
        padding: 1.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #a0aec0;
        transition: color 0.2s;
    }
    
    .close-btn:hover {
        color: #2d3748;
    }
    
    h1 {
        text-align: center;
        margin: 0 0 1rem;
        font-size: 1.8rem;
        color: #2d3748;
    }
    
    .tabs {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .tabs button {
        flex: 1;
        padding: 0.6rem 0.3rem;
        border: 2px solid #e2e8f0;
        background: white;
        border-radius: 12px;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s;
        font-weight: 600;
        color: #4a5568;  /* 確保文字顏色可見 */
    }
    
    .tabs button:hover {
        border-color: #4fd1c5;
    }
    
    .tabs button.active {
        background: linear-gradient(135deg, #4fd1c5 0%, #319795 100%);
        border-color: transparent;
        color: white;
    }
    
    .content {
        flex: 1;
        overflow-y: auto;
        min-height: 250px;
        max-height: 400px;
    }
    
    .loading, .empty {
        text-align: center;
        color: #a0aec0;
        padding: 3rem 1rem;
        font-size: 1.1rem;
    }
    
    .empty small {
        display: block;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        opacity: 0.7;
    }
    
    .ranking-list, .hardest-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .rank-item, .hardest-item {
        display: flex;
        align-items: center;
        padding: 0.8rem 1rem;
        background: #f7fafc;
        border-radius: 12px;
        gap: 0.8rem;
        transition: transform 0.1s;
    }
    
    .rank-item:hover, .hardest-item:hover {
        transform: translateX(4px);
    }
    
    .rank-item.is-me {
        background: linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%);
        border: 2px solid #4fd1c5;
    }
    
    .rank {
        font-size: 1.2rem;
        min-width: 2rem;
        text-align: center;
    }
    
    .name {
        flex: 1;
        font-weight: 600;
        color: #2d3748;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .me-tag {
        font-size: 0.7rem;
        background: #4fd1c5;
        color: white;
        padding: 0.15rem 0.4rem;
        border-radius: 4px;
    }
    
    .score {
        font-weight: 700;
        color: #d69e2e;
        font-size: 1.1rem;
    }
    
    .hardest-item .word {
        flex: 1;
        font-size: 1.3rem;
        font-weight: 700;
        color: #2d3748;
    }
    
    .hardest-item .answer {
        color: #718096;
        font-size: 0.85rem;
        background: #edf2f7;
        padding: 0.2rem 0.5rem;
        border-radius: 6px;
    }
    
    .wrong-rate {
        background: linear-gradient(135deg, #feb2b2 0%, #fc8181 100%);
        color: #c53030;
        padding: 0.3rem 0.6rem;
        border-radius: 8px;
        font-size: 0.8rem;
        font-weight: 700;
    }
    
    .refresh-btn {
        margin-top: 1rem;
        padding: 0.7rem;
        background: #edf2f7;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        cursor: pointer;
        font-weight: 600;
        color: #4a5568;
        transition: all 0.2s;
    }
    
    .refresh-btn:hover:not(:disabled) {
        background: #e2e8f0;
    }
    
    .refresh-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .my-rank-bar {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #92400e;
        padding: 0.8rem 1rem;
        border-radius: 12px;
        text-align: center;
        font-size: 1rem;
        margin-top: 1rem;
    }
    
    .my-rank-bar strong {
        font-size: 1.3rem;
        color: #b45309;
    }
</style>
