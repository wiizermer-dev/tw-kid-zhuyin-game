import { createClient } from '@supabase/supabase-js';

// 從環境變數讀取 Supabase 設定
// 本地開發: 建立 .env 檔案
// GitHub Actions: 使用 secrets 注入
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 檢查是否有設定環境變數
if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase 環境變數未設定，排行榜功能將無法使用');
}

export const supabase = supabaseUrl && supabaseKey 
    ? createClient(supabaseUrl, supabaseKey) 
    : null;

/**
 * 取得或建立 Browser UUID
 * 用於識別玩家（無登入系統）
 */
export function getBrowserId() {
    let browserId = localStorage.getItem('zhuyin_browser_id');
    if (!browserId) {
        browserId = crypto.randomUUID();
        localStorage.setItem('zhuyin_browser_id', browserId);
    }
    return browserId;
}

/**
 * 註冊或更新玩家
 * @param {string} name - 玩家名稱
 * @param {string|null} roomCode - 房間代碼（預留）
 * @returns {Promise<Object|null>} 玩家資料
 */
export async function upsertPlayer(name, roomCode = null) {
    if (!supabase) return null;
    
    const browserId = getBrowserId();
    
    try {
        const { data, error } = await supabase
            .from('players')
            .upsert(
                { 
                    browser_id: browserId, 
                    name, 
                    room_code: roomCode,
                    updated_at: new Date().toISOString()
                }, 
                { onConflict: 'browser_id' }
            )
            .select()
            .single();
        
        if (error) {
            console.error('Upsert player error:', error);
            return null;
        }
        return data;
    } catch (e) {
        console.error('Upsert player exception:', e);
        return null;
    }
}

/**
 * 取得目前玩家資料
 * @returns {Promise<Object|null>} 玩家資料
 */
export async function getPlayer() {
    if (!supabase) return null;
    const browserId = getBrowserId();
    try {
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .eq('browser_id', browserId)
            .single();
        
        if (error && error.code !== 'PGRST116') {
            console.error('Get player error:', error);
            return null;
        }
        return data;
    } catch (e) {
        console.error('Get player exception:', e);
        return null;
    }
}

/**
 * 更新玩家成績
 * @param {string} playerId - 玩家 ID
 * @param {number} totalStars - 總星星數
 * @param {number} maxLevel - 最高關卡
 * @param {number} hardModeHighScore - 困難模式最高分
 * @param {number} maxCombo - 最高連擊
 * @param {number|null} hardModeTime - 困難模式最快時間（秒）
 */
export async function updateScore(playerId, totalStars, maxLevel, hardModeHighScore, maxCombo = 0, hardModeTime = null) {
    if (!playerId || !supabase) return;
    
    try {
        // 先檢查是否已有成績記錄
        const { data: existing } = await supabase
            .from('scores')
            .select('*')
            .eq('player_id', playerId)
            .single();
        
        const updateData = {
            total_stars: Math.max(totalStars, existing?.total_stars || 0),
            max_level: Math.max(maxLevel, existing?.max_level || 1),
            hard_mode_high_score: Math.max(hardModeHighScore, existing?.hard_mode_high_score || 0),
            max_combo: Math.max(maxCombo, existing?.max_combo || 0),
            updated_at: new Date().toISOString()
        };

        // 競速時間：只有在這次有成績且比舊紀錄快（更小）時才更新
        if (hardModeTime !== null) {
            if (!existing?.hard_mode_fastest_time || hardModeTime < existing.hard_mode_fastest_time) {
                updateData.hard_mode_fastest_time = hardModeTime;
            }
        }
        
        if (existing) {
            // 更新現有記錄
            const { error } = await supabase
                .from('scores')
                .update(updateData)
                .eq('player_id', playerId);
            
            if (error) console.error('Update score error:', error);
        } else {
            // 建立新記錄
            const { error } = await supabase
                .from('scores')
                .insert({ 
                    player_id: playerId, 
                    ...updateData
                });
            
            if (error) console.error('Insert score error:', error);
        }
    } catch (e) {
        console.error('Update score exception:', e);
    }
}

/**
 * 取得排行榜
 * @param {'stars'|'hard_mode'|'combo'|'fastest'} type - 排行榜類型
 * @param {number} limit - 筆數限制
 * @param {string|null} roomCode - 房間代碼過濾
 * @returns {Promise<Array>} 排行榜資料
 */
export async function getLeaderboard(type = 'stars', limit = 20, roomCode = null) {
    if (!supabase) return [];
    
    try {
        let query = supabase
            .from('scores')
            .select('*, players!inner(name, browser_id, room_code)');
        
        if (roomCode) {
            query = query.eq('players.room_code', roomCode);
        }
        
        if (type === 'stars') {
            query = query.order('total_stars', { ascending: false });
        } else if (type === 'hard_mode') {
            query = query.order('hard_mode_high_score', { ascending: false });
        } else if (type === 'combo') {
            query = query.order('max_combo', { ascending: false });
        } else if (type === 'fastest') {
            query = query.order('hard_mode_fastest_time', { ascending: true })
                      .not('hard_mode_fastest_time', 'is', null);
        }
        
        const { data, error } = await query.limit(limit);
        
        if (error) {
            console.error('Get leaderboard error:', error);
            return [];
        }
        return data || [];
    } catch (e) {
        console.error('Get leaderboard exception:', e);
        return [];
    }
}

/**
 * 取得目前用戶的排名
 * @param {'stars'|'hard_mode'|'combo'|'fastest'} type - 排行榜類型
 * @returns {Promise<number|null>} 排名（1-based），未找到則為 null
 */
export async function getMyRank(type = 'stars') {
    if (!supabase) return null;
    
    const browserId = getBrowserId();
    
    try {
        // 先取得所有排行（簡單實作，大量資料時需優化）
        let query = supabase
            .from('scores')
            .select('*, players!inner(browser_id)');
        
        if (type === 'stars') {
            query = query.order('total_stars', { ascending: false });
        } else if (type === 'hard_mode') {
            query = query.order('hard_mode_high_score', { ascending: false });
        } else if (type === 'combo') {
            query = query.order('max_combo', { ascending: false });
        } else if (type === 'fastest') {
            query = query.order('hard_mode_fastest_time', { ascending: true })
                      .not('hard_mode_fastest_time', 'is', null);
        }
        
        const { data, error } = await query;
        
        if (error || !data) return null;
        
        // 找到目前用戶的位置
        const myIndex = data.findIndex(entry => entry.players?.browser_id === browserId);
        return myIndex >= 0 ? myIndex + 1 : null;
    } catch (e) {
        console.error('Get my rank exception:', e);
        return null;
    }
}

/**
 * 記錄題目答題結果
 * @param {string} questionId - 題目識別碼
 * @param {string} word - 詞彙
 * @param {string} targetChar - 目標字
 * @param {string} correctAnswer - 正確答案
 * @param {boolean} isCorrect - 是否答對
 */
export async function recordQuestionAttempt(questionId, word, targetChar, correctAnswer, isCorrect) {
    if (!supabase) return;
    
    try {
        const { error } = await supabase.rpc('record_question_attempt', {
            p_question_id: questionId,
            p_word: word,
            p_target_char: targetChar || '',
            p_correct_answer: correctAnswer,
            p_is_correct: isCorrect
        });
        
        if (error) {
            console.error('Record attempt error:', error);
        }
    } catch (e) {
        console.error('Record attempt exception:', e);
    }
}

/**
 * 取得魔王題（答錯率最高的題目）
 * @param {number} limit - 筆數限制
 * @returns {Promise<Array>} 魔王題列表
 */
export async function getHardestQuestions(limit = 5) {
    if (!supabase) return [];
    
    try {
        const { data, error } = await supabase
            .from('question_stats')
            .select('*')
            .gt('total_attempts', 10)  // 至少 10 次嘗試才有統計意義
            .order('wrong_attempts', { ascending: false })
            .limit(limit);
        
        if (error) {
            console.error('Get hardest questions error:', error);
            return [];
        }
        return data || [];
    } catch (e) {
        console.error('Get hardest questions exception:', e);
        return [];
    }
}

/**
 * 取得特定題目的統計資料
 * @param {string} questionId - 題目識別碼
 * @returns {Promise<Object|null>} 統計資料
 */
export async function getQuestionStats(questionId) {
    if (!supabase) return null;
    
    try {
        const { data, error } = await supabase
            .from('question_stats')
            .select('*')
            .eq('question_id', questionId)
            .single();
        
        if (error && error.code !== 'PGRST116') {  // 忽略 not found 錯誤
            console.error('Get question stats error:', error);
        }
        return data;
    } catch (e) {
        console.error('Get question stats exception:', e);
        return null;
    }
}

/**
 * 計算答錯率百分比
 * @param {Object} stats - 統計資料
 * @returns {number} 答錯率（0-100）
 */
export function calculateWrongRate(stats) {
    if (!stats || !stats.total_attempts) return 0;
    return Math.round((stats.wrong_attempts / stats.total_attempts) * 100);
}
