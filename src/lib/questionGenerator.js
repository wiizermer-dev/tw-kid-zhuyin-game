import { enWords, engWords, hardEnWords, hardEngWords, hardAnAngWords, hardZhiChiWords, hardRiLiWords, hardFuHuWords, hardNaLiWords, hardZiZhiWords, hardWoOWords, hardEEiWords } from '../data/wordBank.js';
import { questionTracker, getTotalQuestionCount, getQuestionStats } from './questionTracker.js';

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function generateWrongPinyin(originalPinyin, type, manualWrong) {
  if (manualWrong) {
      return manualWrong;
  }

  let wrong = originalPinyin;
  
  // Confusion rules
  const rules = {
    'en': (p) => p.includes('ㄣ') ? p.replace('ㄣ', 'ㄥ') : p,
    'eng': (p) => p.includes('ㄥ') ? p.replace('ㄥ', 'ㄣ') : p,
    'an': (p) => p.includes('ㄢ') ? p.replace('ㄢ', 'ㄤ') : p,
    'ang': (p) => p.includes('ㄤ') ? p.replace('ㄤ', 'ㄢ') : p,
    'zhi': (p) => p.includes('ㄓ') ? p.replace('ㄓ', 'ㄗ') : p,
    'chi': (p) => p.includes('ㄔ') ? p.replace('ㄔ', 'ㄘ') : p
  };

  if (rules[type]) {
    wrong = rules[type](originalPinyin);
  }
  
  return wrong;
}

export function generateLevelData(levelNumber, questionsCount = 20, isHardMode = false) {
  // 收集所有可用的題目
  let allWords;
  
  if (isHardMode) {
     // 困難模式：包含所有類別
     allWords = [
       ...hardEnWords.map(w => ({ ...w, type: 'en' })),
       ...hardEngWords.map(w => ({ ...w, type: 'eng' })),
       ...hardAnAngWords.map(w => ({ ...w, type: w.pinyin.includes('ㄢ') ? 'an' : 'ang' })),
       ...hardZhiChiWords.map(w => ({ ...w, type: w.pinyin.includes('ㄓ') ? 'zhi' : 'chi' })),
       ...hardRiLiWords.map(w => ({ ...w, type: 'manual' })),
       ...hardFuHuWords.map(w => ({ ...w, type: 'manual' })),
       ...hardNaLiWords.map(w => ({ ...w, type: 'manual' })),
       ...hardZiZhiWords.map(w => ({ ...w, type: 'manual' })),
       ...hardWoOWords.map(w => ({ ...w, type: 'manual' })),
       ...hardEEiWords.map(w => ({ ...w, type: 'manual' }))
     ];
  } else {
     // 一般模式：基礎詞彙
     allWords = [
       ...enWords.map(w => ({ ...w, type: 'en' })),
       ...engWords.map(w => ({ ...w, type: 'eng' }))
    ];
  }
  
  // 顯示題庫使用狀態（開發用）
  const stats = getQuestionStats(allWords);
  console.log(`📊 題庫狀態: ${stats.used}/${stats.total} 已使用 (${stats.usageRate}%)`);
  
  // 如果使用率超過 80%，自動重置
  if (stats.shouldReset) {
    console.warn('⚠️  題目使用率超過 80%，自動重置題庫');
    questionTracker.reset();
  }
  
  // 篩選出未使用過的題目
  let availableWords = questionTracker.filterUnused(allWords);
  
  // 如果可用題目不足，警告並使用全部題目
  if (availableWords.length < questionsCount) {
    console.warn(`⚠️  可用題目不足 (${availableWords.length}/${questionsCount})，將重用部分題目`);
    // 重置追蹤器，重新開始
    questionTracker.reset();
    availableWords = allWords;
  }
  
  console.log(`✅ 可用題目: ${availableWords.length} 題`);
  
  // 隨機排序
  availableWords = shuffle([...availableWords]);
  
  // 選取所需數量
  const selectedWords = availableWords.slice(0, questionsCount);
  
  // 生成題目
  const levelQuestions = [];
  
  for (let i = 0; i < selectedWords.length; i++) {
    const target = selectedWords[i];
    const correctPinyin = target.pinyin;
    const targetChar = target.target || target.char;
    
    // 生成錯誤注音
    const wrongPinyin = generateWrongPinyin(correctPinyin, target.type, target.wrong);
    
    if (wrongPinyin === correctPinyin) {
        console.warn(`⏭️  跳過 ${target.char} (錯誤注音相同)`);
        continue;
    }

    const displayCorrect = target.char.replace(targetChar, correctPinyin);
    const displayWrong = target.char.replace(targetChar, wrongPinyin);
    
    if (displayCorrect === displayWrong) {
        console.warn(`⏭️  跳過 ${target.char} (顯示選項相同)`);
        continue;
    }
    
    const options = [
      { id: 'correct', pinyin: displayCorrect, isCorrect: true },
      { id: 'wrong', pinyin: displayWrong, isCorrect: false }
    ];
    
    levelQuestions.push({
      id: `${levelNumber}-${i}-${Date.now()}`,
      word: target.char,
      target: targetChar,
      english: target.english,
      options: shuffle(options)
    });
    
    // 標記此題目為已使用
    questionTracker.markAsUsed(target);
  }
  
  console.log(`🎯 生成 ${levelQuestions.length} 題 (關卡 ${levelNumber})`);
  
  return levelQuestions;
}

// 匯出題庫統計函數供外部使用
export function getWordBankStats() {
  const normalWords = [
    ...enWords.map(w => ({ ...w, type: 'en' })),
    ...engWords.map(w => ({ ...w, type: 'eng' }))
  ];
  
  const hardWords = [
    ...hardEnWords.map(w => ({ ...w, type: 'en' })),
    ...hardEngWords.map(w => ({ ...w, type: 'eng' })),
    ...hardAnAngWords,
    ...hardZhiChiWords,
    ...hardRiLiWords,
    ...hardFuHuWords,
    ...hardNaLiWords,
    ...hardZiZhiWords,
    ...hardWoOWords,
    ...hardEEiWords
  ];
  
  return {
    normal: getQuestionStats(normalWords),
    hard: getQuestionStats(hardWords),
    total: getQuestionStats([...normalWords, ...hardWords])
  };
}

// 重置題目追蹤器（供外部呼叫）
export function resetQuestionTracker() {
  questionTracker.reset();
  console.log('✅ 題目追蹤器已重置');
}
