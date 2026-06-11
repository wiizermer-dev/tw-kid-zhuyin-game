/**
 * 成語難讀字 — 只收真的會唸錯的
 * schema 同 tricky.js
 */
export default [
  {
    id: 'id-001', text: '暴虎馮河', target: '馮', zhuyin: 'ㄆㄧㄥˊ',
    distractors: ['ㄈㄥˊ'],
    meaning: '空手打虎、徒步渡河，比喻有勇無謀',
    fun: '馮在這裡唸ㄆㄧㄥˊ，是徒步渡河的意思，姓馮的人從小被唸錯到大的反擊題',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-002', text: '退避三舍', target: '舍', zhuyin: 'ㄕㄜˋ',
    distractors: ['ㄕㄜˇ'],
    meaning: '主動退讓，不與人相爭',
    fun: '一舍是三十里，三舍九十里。古人吵架先退九十里，比已讀不回狠多了',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-003', text: '簞食壺漿', target: '食', zhuyin: 'ㄙˋ',
    distractors: ['ㄕˊ'],
    meaning: '人民帶著食物迎接軍隊，表示歡迎',
    fun: '食 = 給人吃的飯時唸ㄙˋ。大考最愛考，唸錯的人簞食壺漿變成乾飯人',
    tags: ['成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-004', text: '戛然而止', target: '戛', zhuyin: 'ㄐㄧㄚˊ',
    distractors: ['ㄍㄚ', 'ㄓㄠˊ'],
    meaning: '聲音突然中斷',
    fun: '音樂戛然而止，全場安靜，只剩你唸錯的「ㄍㄚ然而止」迴盪',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-005', text: '力能扛鼎', target: '扛', zhuyin: 'ㄍㄤ',
    distractors: ['ㄎㄤˊ'],
    meaning: '力氣大到能舉起鼎',
    fun: '雙手舉重物唸ㄍㄤ，扛東西在肩上才唸ㄎㄤˊ。健力選手請筆記',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-006', text: '鍥而不舍', target: '鍥', zhuyin: 'ㄑㄧㄝˋ',
    distractors: ['ㄑㄧˋ', 'ㄐㄧㄝˊ'],
    meaning: '不斷刻下去不放棄，比喻有恆心',
    fun: '鍥唸ㄑㄧㄝˋ。每天上線解每日挑戰的你，就是鍥而不舍本人',
    tags: ['成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-007', text: '莞爾一笑', target: '莞', zhuyin: 'ㄨㄢˇ',
    distractors: ['ㄍㄨㄢˇ', 'ㄨㄢˊ'],
    meaning: '微笑的樣子',
    fun: '莞爾的莞唸ㄨㄢˇ。東莞的莞才唸ㄍㄨㄢˇ，地理和國文同時上課',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-008', text: '相形見絀', target: '絀', zhuyin: 'ㄔㄨˋ',
    distractors: ['ㄓㄨㄛˊ', 'ㄑㄩ'],
    meaning: '互相比較之下顯得不足',
    fun: '絀唸ㄔㄨˋ不唸「拙」。唸錯的瞬間，你就相形見絀了',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-009', text: '鞭辟入裡', target: '辟', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˋ', 'ㄆㄧ'],
    meaning: '分析透徹、切中要點',
    fun: '教育部辭典標準唸ㄅㄧㄢ ㄅㄧˋ ㄖㄨˋ ㄌㄧˇ，很多人唸成ㄆㄧˋ。評論寫得鞭辟入裡，字唸對才算入裡',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-010', text: '怙惡不悛', target: '悛', zhuyin: 'ㄑㄩㄢ',
    distractors: ['ㄐㄩㄣˋ', 'ㄙㄨㄛ'],
    meaning: '堅持作惡，不肯悔改',
    fun: '悛唸ㄑㄩㄢ（悔改）。法院判決書常客，唸對直接升級法律系',
    tags: ['成語', '新聞常錯'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-011', text: '風流倜儻', target: '儻', zhuyin: 'ㄊㄤˇ',
    distractors: ['ㄉㄤˇ', 'ㄕㄤˇ'],
    meaning: '灑脫不拘、才華出眾',
    fun: '倜儻唸「ㄊㄧˋ ㄊㄤˇ」。自稱風流倜儻卻唸不出來，扣分',
    tags: ['成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-012', text: '一葉扁舟', target: '扁', zhuyin: 'ㄆㄧㄢ',
    distractors: ['ㄅㄧㄢˇ'],
    meaning: '一艘小船',
    fun: '扁舟的扁唸ㄆㄧㄢ。船很小，但這題的錯誤率很大',
    tags: ['成語', '破音字', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-013', text: '篳路藍縷', target: '篳', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˊ', 'ㄅㄚ'],
    meaning: '駕柴車穿破衣去開墾，形容創業艱辛',
    fun: '政治人物演講最愛用，記者打字最常錯。唸對你就贏過半個立法院',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-014', text: '含飴弄孫', target: '飴', zhuyin: 'ㄧˊ',
    distractors: ['ㄊㄞˊ', 'ㄙˋ'],
    meaning: '含著糖逗孫子，形容晚年生活悠閒',
    fun: '飴是麥芽糖。阿公阿嬤的退休夢想，注音的隱藏考題',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-015', text: '面面相覷', target: '覷', zhuyin: 'ㄑㄩˋ',
    distractors: ['ㄒㄩ', 'ㄐㄩˋ'],
    meaning: '互相對看，不知如何是好',
    fun: '分組報告沒人想上台的時候，全組就是這個成語',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-016', text: '振聾發聵', target: '聵', zhuyin: 'ㄎㄨㄟˋ',
    distractors: ['ㄍㄨㄟˋ', 'ㄎㄨㄟ'],
    meaning: '比喻喚醒糊塗麻木的人',
    fun: '聵 = 天生耳聾。這個成語的音量，連戴耳機的人都聽得到',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-017', text: '杯盤狼藉', target: '藉', zhuyin: 'ㄐㄧˊ',
    distractors: ['ㄐㄧㄝˋ'],
    meaning: '宴飲後桌面凌亂的樣子',
    fun: '狼藉的藉唸ㄐㄧˊ，慰藉的藉才唸ㄐㄧㄝˋ。聚餐結束的桌面 = 這題的考點',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-018', text: '心無旁騖', target: '騖', zhuyin: 'ㄨˋ',
    distractors: ['ㄇㄠˋ', 'ㄠˊ'],
    meaning: '專心一意，沒有別的念頭',
    fun: '騖是馬亂跑。寫作業不滑手機就是心無旁騖，做得到嗎？',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-019', text: '趨之若鶩', target: '鶩', zhuyin: 'ㄨˋ',
    distractors: ['ㄇㄨˋ', 'ㄐㄧㄤˇ'],
    meaning: '像鴨群一樣成群跑去，形容爭相追逐',
    fun: '鶩是鴨子。排隊名店的人潮，就是字面意思的趨之若鶩',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-020', text: '萬馬齊瘖', target: '瘖', zhuyin: 'ㄧㄣ',
    distractors: ['ㄢ', 'ㄧㄣˇ'],
    meaning: '比喻人們都沉默不敢說話',
    fun: '瘖 = 啞。群組裡丟出敏感話題後的已讀無回狀態',
    tags: ['成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-021', text: '披荊斬棘', target: '荊', zhuyin: 'ㄐㄧㄥ',
    distractors: ['ㄐㄧㄥˋ', 'ㄔㄨˊ'],
    meaning: '克服重重困難',
    fun: '荊棘唸「ㄐㄧㄥ ㄐㄧˊ」，兩個字都常被唸錯，雙倍荊棘',
    tags: ['成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-022', text: '怨聲載道', target: '載', zhuyin: 'ㄗㄞˋ',
    distractors: ['ㄗㄞˇ'],
    meaning: '到處都是抱怨的聲音',
    fun: '載 = 充滿時唸四聲。每次系統改版後的留言區',
    tags: ['成語', '破音字', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-023', text: '一蹴可幾', target: '蹴', zhuyin: 'ㄘㄨˋ',
    distractors: ['ㄐㄧㄡˋ', 'ㄔㄨˋ'],
    meaning: '一步就能達成，形容輕而易舉',
    fun: '蹴 = 踏。學注音不能一蹴可幾，但這題可以',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-024', text: '同仇敵愾', target: '愾', zhuyin: 'ㄎㄞˋ',
    distractors: ['ㄑㄧˋ', 'ㄒㄧˋ'],
    meaning: '共同懷著對敵人的憤恨',
    fun: '愾唸ㄎㄞˋ。電競比賽輸了之後，全隊看教練的眼神',
    tags: ['成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-025', text: '厲兵秣馬', target: '秣', zhuyin: 'ㄇㄛˋ',
    distractors: ['ㄇㄨˋ', 'ㄨㄟˋ'],
    meaning: '磨利兵器、餵飽戰馬，準備作戰',
    fun: '秣 = 餵馬。期末考前一晚的你（理論上）',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-026', text: '暴殄天物', target: '暴', zhuyin: 'ㄅㄠˋ',
    distractors: ['ㄆㄨˋ'],
    meaning: '任意糟蹋東西',
    fun: '陷阱題！這裡的暴唸ㄅㄠˋ（殘害），一暴十寒的暴才唸ㄆㄨˋ。剛剛答對的人小心翻車',
    tags: ['成語', '破音字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-027', text: '熙來攘往', target: '攘', zhuyin: 'ㄖㄤˇ',
    distractors: ['ㄋㄤˊ', 'ㄖㄤˊ'],
    meaning: '形容人來人往非常熱鬧',
    fun: '夜市的標準狀態。攘唸三聲，跟你擠過人群的氣勢一樣',
    tags: ['成語', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-028', text: '咄咄逼人', target: '咄', zhuyin: 'ㄉㄨㄛˋ',
    distractors: ['ㄔㄨㄛ', 'ㄉㄨ'],
    meaning: '氣勢凌人，使人難堪',
    fun: '咄咄唸「ㄉㄨㄛˋ ㄉㄨㄛˋ」。辯論社學長的氣場',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-029', text: '繁文縟節', target: '縟', zhuyin: 'ㄖㄨˋ',
    distractors: ['ㄖㄨˊ', 'ㄋㄨˋ'],
    meaning: '繁瑣多餘的禮節或手續',
    fun: '辦個證件要跑三個櫃檯蓋五個章，就是繁文縟節',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-030', text: '令人髮指', target: '髮', zhuyin: 'ㄈㄚˇ',
    distractors: ['ㄈㄚ', 'ㄈㄚˋ'],
    meaning: '憤怒到頭髮豎起來',
    fun: '髮唸三聲。氣到頭髮站起來，聲調也要站對位置',
    tags: ['成語', '新聞常錯'], difficulty: 2, era: 'classic'
  }
];
