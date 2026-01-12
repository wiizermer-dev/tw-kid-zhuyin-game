import { enWords, engWords } from '../data/wordBank.js';

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

function generateWrongPinyin(originalPinyin, type) {
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

export function generateLevelData(levelNumber, questionsCount = 20) {
  const allWords = [
    ...enWords.map(w => ({ ...w, type: 'en' })),
    ...engWords.map(w => ({ ...w, type: 'eng' }))
  ];
  
  const levelQuestions = [];
  
  for (let i = 0; i < questionsCount; i++) {
    const target = allWords[Math.floor(Math.random() * allWords.length)];
    
    // Identify target char and pinyin
    const correctPinyin = target.pinyin;
    const targetChar = target.target || target.char; // If target not specified, assume the whole string (single char) is target
    
    // Generate wrong pinyin
    const wrongPinyin = generateWrongPinyin(correctPinyin, target.type);
    
    // Format Display Options (Partial Pinyin)
    // e.g. "門把" -> "ㄇㄣˊ 把"
    // Note: simple replace only replaces first occurrence, which is usually correct for these short phrases.
    const displayCorrect = target.char.replace(targetChar, correctPinyin);
    const displayWrong = target.char.replace(targetChar, wrongPinyin);
    
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
