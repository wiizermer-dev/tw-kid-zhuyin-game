/** 審題模式 — 審查結論定義（UI 與彙整腳本共用，key 須與 SQL check constraint 一致） */
export const REVIEW_VERDICTS = {
  pass: { key: 'pass', label: '通過', blurb: '題目沒問題', tone: 'good' },
  below_level: { key: 'below_level', label: '難度低於等級', blurb: '比標示難度簡單，該降級', tone: 'warn' },
  above_level: { key: 'above_level', label: '難度高於等級', blurb: '比標示難度難，該升級', tone: 'warn' },
  wrong_answer: { key: 'wrong_answer', label: '答案錯誤', blurb: '正解注音有誤', tone: 'bad' },
  not_needed: { key: 'not_needed', label: '不需要此題', blurb: '沒什麼值得考的意義', tone: 'warn' },
  bad_design: { key: 'bad_design', label: '題目設計不佳', blurb: '誘答不公平、題意不清等，可補充說明', tone: 'bad', needsNote: true }
};

export const VERDICT_KEYS = Object.keys(REVIEW_VERDICTS);

/** 難度分級判準 — 審題員判「難度低/高於等級」的依據（例題取自題庫各級代表題） */
export const DIFFICULTY_GUIDE = [
  {
    level: 1, name: '入門',
    rule: '日常高頻詞的基本讀音，國小中低年級該會',
    test: '一般大人幾乎不會唸錯',
    examples: '蛋撻、垃圾、因為'
  },
  {
    level: 2, name: '基礎',
    rule: '常用詞與入門成語，課堂常見、大眾偶爾唸錯',
    test: '細心的國小高年級生答得出，沒注意過的路人會中招',
    examples: '倔強、蛤蜊、莘莘學子'
  },
  {
    level: 3, name: '進階',
    rule: '常考常錯的破音字與易錯成語，國中～高中考題等級',
    test: '要學過才會，沒特別學過的大人多半會錯',
    examples: '心寬體胖、一暴十寒、草菅人命'
  },
  {
    level: 4, name: '困難',
    rule: '生難字與高級成語，閱讀量大才見過',
    test: '多數大人會錯，國文強者才穩',
    examples: '虛與委蛇、濫觴、一語成讖'
  },
  {
    level: 5, name: '魔王',
    rule: '冷僻字與罕用讀音，辭典魔王等級',
    test: '沒查過辭典幾乎不可能會',
    examples: '沆瀣一氣、胼手胝足、踽踽獨行'
  }
];
