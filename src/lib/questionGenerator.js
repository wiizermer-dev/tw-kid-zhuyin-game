import { enWords, engWords, hardEnWords, hardEngWords, hardAnAngWords, hardZhiChiWords, hardRiLiWords, hardFuHuWords, hardNaLiWords, hardZiZhiWords, hardWoOWords, hardEEiWords } from '../data/wordBank.js';

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
  let allWords;

  if (isHardMode) {
     // Merge all hard mode categories
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
     
     allWords = shuffle(allWords);
     
     // Mix in some normal words if not enough hard words
     if (allWords.length < questionsCount) {
         let normalWords = [
            ...enWords.map(w => ({ ...w, type: 'en' })),
            ...engWords.map(w => ({ ...w, type: 'eng' }))
         ];
        normalWords = shuffle(normalWords);
        const needed = questionsCount - allWords.length;
        allWords = [...allWords, ...normalWords.slice(0, needed)];
     }
     
     if (allWords.length > questionsCount) {
         allWords = allWords.slice(0, questionsCount);
     }
     allWords = shuffle(allWords);
  } else {
     // Normal Mode
     allWords = [
       ...enWords.map(w => ({ ...w, type: 'en' })),
       ...engWords.map(w => ({ ...w, type: 'eng' }))
    ];
    allWords = shuffle(allWords);
    if (allWords.length > questionsCount) {
        allWords = allWords.slice(0, questionsCount);
    }
  }
  
  const levelQuestions = [];
  
  for (let i = 0; i < allWords.length; i++) {
    const target = allWords[i];
    const correctPinyin = target.pinyin;
    const targetChar = target.target || target.char;
    
    // Generate wrong pinyin
    const wrongPinyin = generateWrongPinyin(correctPinyin, target.type, target.wrong);
    
    if (wrongPinyin === correctPinyin) {
        console.warn(`Skipping word ${target.char} because wrong pinyin is identical.`);
        continue;
    }

    const displayCorrect = target.char.replace(targetChar, correctPinyin);
    const displayWrong = target.char.replace(targetChar, wrongPinyin);
    
    if (displayCorrect === displayWrong) {
        console.warn(`Skipping word ${target.char} because display options are identical.`);
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
  }
  
  return levelQuestions;
}
