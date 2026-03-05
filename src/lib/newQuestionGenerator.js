/**
 * 新題目生成器 2.0
 * 支援多元題型：成語、古文、多音字、詩詞、諺語、形近音混淆
 */

import {
    allMultiPronunciation,
    allIdioms,
    allClassical,
    allPoetry,
    allProverbs,
    allSimilarSound,
    getAllBankStats
} from '../data/questionBankIndex.js';

// 題目類型
export const QuestionTypes = {
    MULTI_PRONUNCIATION: 'multiPronunciation',  // 多音字判斷
    IDIOM: 'idiom',                              // 成語讀音
    CLASSICAL: 'classical',                      // 古文讀音
    POETRY: 'poetry',                            // 詩詞讀音
    PROVERB: 'proverb',                          // 諺語歇後語
    SIMILAR_SOUND: 'similarSound'                // 形近音混淆
};

// 題目追蹤器 - 確保不重複
class QuestionTracker {
    constructor() {
        this.usedQuestions = new Set();
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const saved = localStorage.getItem('usedQuestions_v2');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.usedQuestions = new Set(parsed);
            }
        } catch (e) {
            console.warn('無法載入題目記錄', e);
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem('usedQuestions_v2', JSON.stringify([...this.usedQuestions]));
        } catch (e) {
            console.warn('無法儲存題目記錄', e);
        }
    }

    markAsUsed(questionId) {
        this.usedQuestions.add(questionId);
        this.saveToStorage();
    }

    isUsed(questionId) {
        return this.usedQuestions.has(questionId);
    }

    filterUnused(questions) {
        return questions.filter(q => !this.isUsed(q.id));
    }

    reset() {
        this.usedQuestions.clear();
        this.saveToStorage();
        console.log('✅ 題目追蹤器已重置');
    }

    getStats() {
        return {
            usedCount: this.usedQuestions.size
        };
    }
}

const tracker = new QuestionTracker();

// 洗牌函數
function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ============================================
// 題目生成函數
// ============================================

/**
 * 生成多音字題目
 */
function generateMultiPronunciationQuestion(item) {
    // 隨機選擇兩個不同讀音的詞語
    const contexts = shuffle(item.contexts);
    const correctContext = contexts[0];
    const wrongContext = contexts.find(c => c.pinyin !== correctContext.pinyin) || contexts[1];

    return {
        type: QuestionTypes.MULTI_PRONUNCIATION,
        id: `${item.id}-${Date.now()}`,
        originalId: item.id,
        displayText: correctContext.word,
        targetChar: item.char,
        questionText: `「${correctContext.word}」的「${item.char}」字讀音為何？`,
        options: shuffle([
            { pinyin: correctContext.pinyin, isCorrect: true, meaning: correctContext.meaning },
            { pinyin: wrongContext.pinyin, isCorrect: false, meaning: wrongContext.meaning }
        ]),
        hint: correctContext.meaning,           // Unified: Meaning as hint
        subInfo: item.source || "常用多音字",   // Unified: Source
        difficulty: item.difficulty
    };
}

// Helper to get random wrong meanings
function getWrongMeanings(correctPinyin, count = 3, pool = []) {
    const wrongs = [];
    const maxTries = 50;
    let tries = 0;

    while (wrongs.length < count && tries < maxTries) {
        const item = pool[Math.floor(Math.random() * pool.length)];
        // Ensure different pinyin (proxy for different item) and valid meaning
        if (item.pinyin !== correctPinyin && item.meaning && !wrongs.includes(item.meaning)) {
            wrongs.push(item.meaning);
        }
        tries++;
    }
    // Fallback if not enough wrongs found
    while (wrongs.length < count) {
        wrongs.push("其他含義");
    }
    return wrongs;
}

// Helper to get random wrong sources
function getWrongSources(correctSource, count = 3, pool = []) {
    const wrongs = [];
    const maxTries = 50;
    let tries = 0;

    while (wrongs.length < count && tries < maxTries) {
        const item = pool[Math.floor(Math.random() * pool.length)];
        const source = item.article || item.source;
        if (source && source !== correctSource && !wrongs.includes(source)) {
            wrongs.push(source);
        }
        tries++;
    }
    // Fallback
    while (wrongs.length < count) {
        wrongs.push("其他出處");
    }
    return wrongs;
}

/**
 * 生成成語讀音題目 (Updated with Meaning Challenge)
 */
function generateIdiomQuestion(item) {
    // 30% chance to be a Meaning Challenge if meaning exists
    if (item.meaning && Math.random() < 0.3) {
        const wrongMeanings = getWrongMeanings(item.pinyin, 3, allIdioms);
        return {
            type: QuestionTypes.IDIOM,
            id: `${item.id}-${Date.now()}-meaning`,
            originalId: item.id,
            displayText: item.idiom,
            targetChar: "", // No target char highlight for meaning question
            questionText: `成語「${item.idiom}」的意思是？`,
            options: shuffle([
                { text: item.meaning, isCorrect: true, pinyin: "" },
                ...wrongMeanings.map(m => ({ text: m, isCorrect: false, pinyin: "" }))
            ]),
            hint: "請選擇正確的解釋",
            subInfo: "成語釋義",
            difficulty: "hard"
        };
    }

    // Normal Pronunciation Question
    const wrongOptions = item.wrongOptions || [];
    const wrongPinyin = wrongOptions[Math.floor(Math.random() * wrongOptions.length)] ||
        item.pinyin.replace(/ˇ|ˋ|ˊ/g, '');

    return {
        type: QuestionTypes.IDIOM,
        id: `${item.id}-${Date.now()}`,
        originalId: item.id,
        displayText: item.idiom,
        targetChar: item.target,
        questionText: `「${item.idiom}」的「${item.target}」字讀音為何？`,
        options: shuffle([
            { pinyin: item.pinyin, isCorrect: true },
            { pinyin: wrongPinyin, isCorrect: false }
        ]),
        hint: item.meaning,                        // Unified: Meaning as hint
        subInfo: item.source || "成語典",          // Unified: Source
        difficulty: item.difficulty
    };
}

/**
 * 生成古文讀音題目 (Updated with Source Challenge)
 */
function generateClassicalQuestion(item) {
    const source = item.article || item.source;

    // 20% chance to be a Source Challenge if source is specific enough
    // Filter out generic sources if necessary, though 'article' is usually good
    if (source && source !== "經典古文" && Math.random() < 0.2) {
        const wrongSources = getWrongSources(source, 3, allClassical);
        return {
            type: QuestionTypes.CLASSICAL,
            id: `${item.id}-${Date.now()}-source`,
            originalId: item.id,
            displayText: item.context || item.text,
            targetChar: "",
            questionText: `「${item.context || item.text}」出自哪部典籍？`,
            options: shuffle([
                { text: source, isCorrect: true, pinyin: "" },
                ...wrongSources.map(s => ({ text: s, isCorrect: false, pinyin: "" }))
            ]),
            hint: item.meaning,
            subInfo: "出典辨析",
            difficulty: "hard"
        };
    }

    // Normal Pronunciation Question
    const wrongOptions = item.wrongOptions || [];
    const wrongPinyin = wrongOptions[Math.floor(Math.random() * wrongOptions.length)] ||
        item.pinyin.replace(/ˇ|ˋ|ˊ/g, '');

    return {
        type: QuestionTypes.CLASSICAL,
        id: `${item.id}-${Date.now()}`,
        originalId: item.id,
        displayText: item.context || item.text,    // Unified: Context/Text as main display
        targetChar: item.target,
        questionText: `《${item.article}》中「${item.context || item.target}」的「${item.target}」字讀音為何？`,
        options: shuffle([
            { pinyin: item.pinyin, isCorrect: true, meaning: item.meaning },
            { pinyin: wrongPinyin, isCorrect: false }
        ]),
        hint: item.meaning,                        // Unified: Meaning as hint
        subInfo: item.article || item.source,      // Unified: Article title as subInfo
        difficulty: item.difficulty
    };
}

/**
 * 生成詩詞讀音題目
 */
function generatePoetryQuestion(item) {
    const wrongOptions = item.wrongOptions || [];
    const wrongPinyin = wrongOptions[0] || item.modernPinyin || item.pinyin;

    return {
        type: QuestionTypes.POETRY,
        id: `${item.id}-${Date.now()}`,
        originalId: item.id,
        displayText: item.line,                    // Unified: Line as main display
        targetChar: item.target,
        questionText: `「${item.line}」中「${item.target}」的讀音為何？`,
        options: shuffle([
            { pinyin: item.pinyin, isCorrect: true },
            { pinyin: wrongPinyin, isCorrect: false }
        ]),
        hint: item.note || "",                     // Unified: Note as hint
        subInfo: `${item.author}《${item.poem}》`, // Unified: Author + Poem Name
        difficulty: item.difficulty
    };
}

/**
 * 生成諺語歇後語題目
 */
function generateProverbQuestion(item) {
    const wrongOptions = item.wrongOptions || [];
    const wrongPinyin = wrongOptions[0] || item.pinyin.replace(/ˇ|ˋ|ˊ/g, '');

    return {
        type: QuestionTypes.PROVERB,
        id: `${item.id}-${Date.now()}`,
        originalId: item.id,
        displayText: item.phrase,
        targetChar: item.target,
        questionText: `「${item.phrase}」中「${item.target}」的讀音為何？`,
        options: shuffle([
            { pinyin: item.pinyin, isCorrect: true },
            { pinyin: wrongPinyin, isCorrect: false }
        ]),
        hint: item.meaning || item.explanation,    // Unified: Meaning/Explanation as hint
        subInfo: item.type,                        // Unified: Type (諺語/歇後語)
        difficulty: item.difficulty
    };
}

/**
 * 生成形近音混淆題目
 */
function generateSimilarSoundQuestion(item) {
    const wrongChar = item.confusedChars[Math.floor(Math.random() * item.confusedChars.length)];

    return {
        type: QuestionTypes.SIMILAR_SOUND,
        id: `${item.id}-${Date.now()}`,
        originalId: item.id,
        displayText: item.targetWord,
        targetChar: item.correctChar,
        questionText: `「${item.targetWord}」的「${item.correctChar}」字讀音為何？`,
        options: shuffle([
            { pinyin: item.pinyin, isCorrect: true },
            { pinyin: wrongChar.pinyin, isCorrect: false, confusedWith: wrongChar.word }
        ]),
        hint: item.note || "",                     // Unified: Note as hint
        subInfo: item.source || "形近字辨析",      // Unified: Source
        difficulty: item.difficulty
    };
}

// ============================================
// 主要生成函數
// ============================================

/**
 * 根據難度和題型比例生成關卡題目
 * @param {number} levelNumber - 關卡編號
 * @param {number} questionsCount - 題目數量
 * @param {boolean} isHardMode - 是否困難模式
 * @param {Object} typeWeights - 題型權重 (可選)
 */
export function generateLevelData(levelNumber, questionsCount = 10, isHardMode = false, typeWeights = null) {
    // 預設題型權重
    const defaultWeights = isHardMode ? {
        [QuestionTypes.MULTI_PRONUNCIATION]: 0.20,
        [QuestionTypes.IDIOM]: 0.25,
        [QuestionTypes.CLASSICAL]: 0.25,
        [QuestionTypes.POETRY]: 0.15,
        [QuestionTypes.PROVERB]: 0.10,
        [QuestionTypes.SIMILAR_SOUND]: 0.05
    } : {
        [QuestionTypes.MULTI_PRONUNCIATION]: 0.30,
        [QuestionTypes.IDIOM]: 0.25,
        [QuestionTypes.CLASSICAL]: 0.15,
        [QuestionTypes.POETRY]: 0.10,
        [QuestionTypes.PROVERB]: 0.10,
        [QuestionTypes.SIMILAR_SOUND]: 0.10
    };

    const weights = typeWeights || defaultWeights;

    // 使用已合併的題庫
    const allPools = {
        [QuestionTypes.MULTI_PRONUNCIATION]: tracker.filterUnused(
            allMultiPronunciation.filter(q => isHardMode || q.difficulty !== 'hard')
        ),
        [QuestionTypes.IDIOM]: tracker.filterUnused(
            allIdioms.filter(q => isHardMode || q.difficulty !== 'hard')
        ),
        [QuestionTypes.CLASSICAL]: tracker.filterUnused(
            allClassical.filter(q => isHardMode || q.difficulty !== 'hard')
        ),
        [QuestionTypes.POETRY]: tracker.filterUnused(
            allPoetry.filter(q => isHardMode || q.difficulty !== 'hard')
        ),
        [QuestionTypes.PROVERB]: tracker.filterUnused(
            allProverbs.filter(q => isHardMode || q.difficulty !== 'hard')
        ),
        [QuestionTypes.SIMILAR_SOUND]: tracker.filterUnused(
            allSimilarSound.filter(q => isHardMode || q.difficulty !== 'hard')
        )
    };

    // 計算每種題型需要的數量
    const typeCounts = {};
    let remaining = questionsCount;

    for (const type of Object.keys(weights)) {
        const count = Math.round(questionsCount * weights[type]);
        const available = allPools[type].length;
        typeCounts[type] = Math.min(count, available);
        remaining -= typeCounts[type];
    }

    // 處理餘數：分配給有剩餘題目的類型
    const typesWithRemaining = Object.keys(allPools).filter(
        type => allPools[type].length > typeCounts[type]
    );

    while (remaining > 0 && typesWithRemaining.length > 0) {
        for (const type of typesWithRemaining) {
            if (remaining <= 0) break;
            if (allPools[type].length > typeCounts[type]) {
                typeCounts[type]++;
                remaining--;
            }
        }
    }

    // 生成題目
    const levelQuestions = [];
    const generators = {
        [QuestionTypes.MULTI_PRONUNCIATION]: generateMultiPronunciationQuestion,
        [QuestionTypes.IDIOM]: generateIdiomQuestion,
        [QuestionTypes.CLASSICAL]: generateClassicalQuestion,
        [QuestionTypes.POETRY]: generatePoetryQuestion,
        [QuestionTypes.PROVERB]: generateProverbQuestion,
        [QuestionTypes.SIMILAR_SOUND]: generateSimilarSoundQuestion
    };

    for (const [type, count] of Object.entries(typeCounts)) {
        const pool = shuffle(allPools[type]).slice(0, count);
        const generator = generators[type];

        for (const item of pool) {
            try {
                const question = generator(item);
                levelQuestions.push(question);
                tracker.markAsUsed(item.id);
            } catch (e) {
                console.warn(`生成題目失敗: ${item.id}`, e);
            }
        }
    }

    // 最終洗牌
    const shuffledQuestions = shuffle(levelQuestions);

    console.log(`🎯 關卡 ${levelNumber} 生成 ${shuffledQuestions.length} 題`);
    console.log(`   題型分布:`, typeCounts);

    return shuffledQuestions;
}

// ============================================
// 匯出工具函數
// ============================================

export function getQuestionBankStats() {
    const bankStats = getAllBankStats();
    const trackerStats = tracker.getStats();

    return {
        ...bankStats,
        used: trackerStats.usedCount,
        available: bankStats.total - trackerStats.usedCount,
        usageRate: ((trackerStats.usedCount / bankStats.total) * 100).toFixed(1) + '%'
    };
}

export function resetQuestionTracker() {
    tracker.reset();
}
