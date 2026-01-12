import { enWords, engWords, hardEnWords, hardEngWords } from '../data/wordBank.js';

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
  
  if (type === 'en') {
    if (wrong.includes('ㄣ')) wrong = wrong.replace('ㄣ', 'ㄥ');
    // Also handle un <-> ong cases if they appear in enWords?
    // ㄣ (en) roughly maps to ㄥ (eng)
    // ㄧㄣ (in) -> ㄧㄥ (ing)
    // ㄨㄣ (un) -> ㄨㄥ (ong) 
    // ㄩㄣ (yun) -> ㄩㄥ (yong)
  } else {
    // eng
    if (wrong.includes('ㄥ')) wrong = wrong.replace('ㄥ', 'ㄣ');
  }
  return wrong;
}

export function generateLevelData(levelNumber, questionsCount = 20, isHardMode = false) {
  let allWords;

  if (isHardMode) {
     // In hard mode, we use hard words + some normal words mixed in?
     // Or just hard words? The list of hard words is around 40-50.
     // Let's mix them or prioritize them.
     // For now, let's use ONLY hard words if possible, or mix them.
     // Given the count request, let's merge hard words.
     allWords = [
       ...hardEnWords.map(w => ({ ...w, type: 'en' })),
       ...hardEngWords.map(w => ({ ...w, type: 'eng' }))
     ];
     
     // Shuffle hard words first
     allWords = shuffle(allWords);
     
     // If we need more words than we have hard words, fill with normal words
     if (allWords.length < questionsCount) {
         let normalWords = [
            ...enWords.map(w => ({ ...w, type: 'en' })),
            ...engWords.map(w => ({ ...w, type: 'eng' }))
         ];
        normalWords = shuffle(normalWords);
        
        // Add enough normal words to fill the gap
        const needed = questionsCount - allWords.length;
        allWords = [...allWords, ...normalWords.slice(0, needed)];
     }
     
     // Only slice if we have too many (unlikely for 100 limit but good practice)
     if (allWords.length > questionsCount) {
         allWords = allWords.slice(0, questionsCount);
     }
     // Final shuffle to mix normal words in if any
     allWords = shuffle(allWords);
  } else {
     // Normal Mode
     allWords = [
      ...enWords.map(w => ({ ...w, type: 'en' })),
      ...engWords.map(w => ({ ...w, type: 'eng' }))
    ];
    // Shuffle and slice for normal mode too
    allWords = shuffle(allWords);
    if (allWords.length > questionsCount) {
        allWords = allWords.slice(0, questionsCount);
    }
  }
  
  const levelQuestions = [];
  
  // Use sequential iteration over the prepared unique list
  for (let i = 0; i < allWords.length; i++) {
    const target = allWords[i];
    
    // Identify target char and pinyin
    const correctPinyin = target.pinyin;
    const targetChar = target.target || target.char; // If target not specified, assume the whole string (single char) is target
    
    // Generate wrong pinyin
    const wrongPinyin = generateWrongPinyin(correctPinyin, target.type, target.wrong);
    
    // Safety Check: If wrong pinyin is same as correct, SKIP this word (or try to fix, but skip is safer for now)
    if (wrongPinyin === correctPinyin) {
        console.warn(`Skipping word ${target.char} because wrong pinyin is identical.`);
        continue;
    }

    // Format Display Options (Partial Pinyin)
    // e.g. "門把" -> "ㄇㄣˊ 把"
    // Note: simple replace only replaces first occurrence, which is usually correct for these short phrases.
    const displayCorrect = target.char.replace(targetChar, correctPinyin);
    const displayWrong = target.char.replace(targetChar, wrongPinyin);
    
    // Double check display strings too
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
      target: targetChar, // Pass this to UI
      english: target.english,
      options: shuffle(options)
    });
  }
  
  return levelQuestions;
}
