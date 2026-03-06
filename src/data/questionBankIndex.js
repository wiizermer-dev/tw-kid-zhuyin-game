/**
 * 題庫整合索引
 * 統一匯出所有題庫，方便題目生成器使用
 */

// 基礎題庫
import {
    multiPronunciationWords,
    idiomPronunciation,
    classicalPronunciation,
    poetryPronunciation,
    proverbPronunciation,
    similarSoundWords,
    getNewBankStats
} from './newQuestionBank.js';

// 擴充題庫 1
import {
    examQuestions,
    moreIdioms,
    moreMultiPronunciation,
    competitionQuestions,
    getExpandedBankStats
} from './expandedQuestionBank.js';

// 成語擴充
import {
    idiomBatch1,
    idiomBatch2,
    idiomBatch3,
    getIdiomBatchStats
} from './idiomExpansion.js';

// 古文擴充
import {
    classicalBatch1,
    classicalBatch2,
    classicalBatch3,
    getClassicalBatchStats
} from './classicalExpansion.js';

// 詩詞擴充
import {
    poetryBatch1,
    poetryBatch2,
    poetryBatch3,
    getPoetryBatchStats
} from './poetryExpansion.js';

// 多音字、諺語、形近音擴充
import {
    multiPronBatch,
    proverbBatch,
    similarSoundBatch,
    getMixedBatchStats
} from './mixedExpansion.js';

// 更多成語擴充
import {
    idiomBatch4,
    idiomBatch5,
    idiomBatch6,
    getMoreIdiomStats
} from './moreIdiomExpansion.js';

// 更多古文擴充
import {
    classicalBatch4,
    classicalBatch5,
    getMoreClassicalStats
} from './moreClassicalExpansion.js';

// 更多詩詞和多音字
import {
    poetryBatch4,
    poetryBatch5,
    multiPronBatch2,
    getMoreMixedStats
} from './moreMixedExpansion.js';

// 額外擴充（成語+諺語+形近音）
import {
    idiomBatch7,
    idiomBatch8,
    proverbBatch2,
    similarSoundBatch2,
    getExtraExpansionStats
} from './extraExpansion.js';

// 成語終極擴充
import {
    idiomBatch9,
    idiomBatch10,
    idiomBatch11,
    getUltimateIdiomStats
} from './ultimateIdiomExpansion.js';

// 最終擴充（多音字+古文+詩詞）
import {
    multiPronBatch3,
    classicalBatch6,
    poetryBatch6,
    getFinalExpansionStats
} from './finalExpansion.js';

// 超級擴充(成語+古文+詩詞+多音字)
import {
    idiomBatch12,
    idiomBatch13,
    idiomBatch14,
    classicalBatch7,
    classicalBatch8,
    poetryBatch7,
    poetryBatch8,
    multiPronBatch4,
    multiPronBatch5
} from './megaExpansion.js';

// ============================================
// 合併所有題目
// ============================================

// 多音字/破音字
export const allMultiPronunciation = [
    ...multiPronunciationWords,          // 15 題
    ...moreMultiPronunciation,            // 15 題
    ...multiPronBatch,                    // 25 題
    ...multiPronBatch2,                   // 20 題
    ...multiPronBatch3,                   // 20 題
    ...multiPronBatch4,                   // 10 題
    ...multiPronBatch5                    // 10 題
];

// 成語讀音
const examIdiomFormat = examQuestions.map(q => ({
    ...q,
    idiom: q.word
}));
const competitionFormat = competitionQuestions.map(q => ({
    ...q,
    idiom: q.word
}));

export const allIdioms = [
    ...idiomPronunciation,                // 30 題
    ...moreIdioms,                        // 30 題
    ...examIdiomFormat,                   // 21 題
    ...competitionFormat,                 // 10 題
    ...idiomBatch1,                       // 50 題
    ...idiomBatch2,                       // 50 題
    ...idiomBatch3,                       // 40 題
    ...idiomBatch4,                       // 40 題
    ...idiomBatch5,                       // 40 題
    ...idiomBatch6,                       // 40 題
    ...idiomBatch7,                       // 40 題
    ...idiomBatch8,                       // 40 題
    ...idiomBatch9,                       // 40 題
    ...idiomBatch10,                      // 40 題
    ...idiomBatch11,                      // 40 題
    ...idiomBatch12,                      // 20 題
    ...idiomBatch13,                      // 20 題
    ...idiomBatch14                       // 20 題
];

// 古文讀音
export const allClassical = [
    ...classicalPronunciation,            // 25 題
    ...classicalBatch1,                   // 30 題
    ...classicalBatch2,                   // 30 題
    ...classicalBatch3,                   // 30 題
    ...classicalBatch4,                   // 40 題
    ...classicalBatch5,                   // 30 題
    ...classicalBatch6,                   // 30 題
    ...classicalBatch7,                   // 20 題
    ...classicalBatch8                    // 20 題
];

// 詩詞讀音
export const allPoetry = [
    ...poetryPronunciation,               // 15 題
    ...poetryBatch1,                      // 30 題
    ...poetryBatch2,                      // 30 題
    ...poetryBatch3,                      // 30 題
    ...poetryBatch4,                      // 30 題
    ...poetryBatch5,                      // 30 題
    ...poetryBatch6,                      // 30 題
    ...poetryBatch7,                      // 20 題
    ...poetryBatch8                       // 20 題
];

// 諺語歇後語
export const allProverbs = [
    ...proverbPronunciation,              // 10 題
    ...proverbBatch,                      // 25 題
    ...proverbBatch2                      // 20 題
];

// 形近音混淆
export const allSimilarSound = [
    ...similarSoundWords,                 // 10 題
    ...similarSoundBatch,                 // 15 題
    ...similarSoundBatch2                 // 10 題
];

// ============================================
// 統計資訊
// ============================================
export function getAllBankStats() {
    const stats = {
        multiPronunciation: allMultiPronunciation.length,
        idioms: allIdioms.length,
        classical: allClassical.length,
        poetry: allPoetry.length,
        proverbs: allProverbs.length,
        similarSound: allSimilarSound.length,
    };

    stats.total = Object.values(stats).reduce((a, b) => a + b, 0);

    return stats;
}

// 按難度分類
export function getStatsByDifficulty() {
    const allQuestions = [
        ...allMultiPronunciation,
        ...allIdioms,
        ...allClassical,
        ...allPoetry,
        ...allProverbs,
        ...allSimilarSound
    ];

    const normal = allQuestions.filter(q => q.difficulty === 'normal').length;
    const hard = allQuestions.filter(q => q.difficulty === 'hard').length;

    return {
        normal,
        hard,
        total: normal + hard
    };
}

// 快速預覽
export function previewQuestions(category, count = 5) {
    const categories = {
        multiPronunciation: allMultiPronunciation,
        idioms: allIdioms,
        classical: allClassical,
        poetry: allPoetry,
        proverbs: allProverbs,
        similarSound: allSimilarSound
    };

    const questions = categories[category] || [];
    return questions.slice(0, count);
}

