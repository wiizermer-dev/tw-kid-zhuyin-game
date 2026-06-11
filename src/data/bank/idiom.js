/**
 * 成語難讀字 — 只收真的會唸錯的
 * schema 同 tricky.js
 */
export default [
  {
    id: 'id-001', text: '暴虎馮河', target: '馮', zhuyin: 'ㄆㄧㄥˊ',
    distractors: ['ㄈㄥˊ', 'ㄆㄧㄥ', 'ㄅㄧㄥˊ'],
    meaning: '空手打虎、徒步渡河，比喻有勇無謀',
    fun: '馮在這裡唸ㄆㄧㄥˊ，是徒步渡河的意思，姓馮的人從小被唸錯到大的反擊題',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-002', text: '退避三舍', target: '舍', zhuyin: 'ㄕㄜˋ',
    distractors: ['ㄕㄜˇ', 'ㄕㄜ', 'ㄕㄜˊ'],
    meaning: '主動退讓，不與人相爭',
    fun: '一舍是三十里，三舍九十里。古人吵架先退九十里，比已讀不回狠多了',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-003', text: '簞食壺漿', target: '食', zhuyin: 'ㄙˋ',
    distractors: ['ㄕˊ', 'ㄙ', 'ㄕˋ'],
    meaning: '人民帶著食物迎接軍隊，表示歡迎',
    fun: '食 = 給人吃的飯時唸ㄙˋ。大考最愛考，唸錯的人簞食壺漿變成乾飯人',
    tags: ['成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-004', text: '戛然而止', target: '戛', zhuyin: 'ㄐㄧㄚˊ',
    distractors: ['ㄍㄚ', 'ㄓㄠˊ', 'ㄐㄧㄚ'],
    meaning: '聲音突然中斷',
    fun: '音樂戛然而止，全場安靜，只剩你唸錯的「ㄍㄚ然而止」迴盪',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-005', text: '力能扛鼎', target: '扛', zhuyin: 'ㄍㄤ',
    distractors: ['ㄎㄤˊ', 'ㄍㄤˊ', 'ㄎㄤ'],
    meaning: '力氣大到能舉起鼎',
    fun: '雙手舉重物唸ㄍㄤ，扛東西在肩上才唸ㄎㄤˊ。健力選手請筆記',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-006', text: '鍥而不舍', target: '鍥', zhuyin: 'ㄑㄧㄝˋ',
    distractors: ['ㄑㄧˋ', 'ㄐㄧㄝˊ', 'ㄑㄧㄝˊ'],
    meaning: '不斷刻下去不放棄，比喻有恆心',
    fun: '鍥唸ㄑㄧㄝˋ。每天上線解每日挑戰的你，就是鍥而不舍本人',
    tags: ['成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-007', text: '莞爾一笑', target: '莞', zhuyin: 'ㄨㄢˇ',
    distractors: ['ㄍㄨㄢˇ', 'ㄨㄢˊ', 'ㄨㄢ'],
    meaning: '微笑的樣子',
    fun: '莞爾的莞唸ㄨㄢˇ。東莞的莞才唸ㄍㄨㄢˇ，地理和國文同時上課',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-008', text: '相形見絀', target: '絀', zhuyin: 'ㄔㄨˋ',
    distractors: ['ㄓㄨㄛˊ', 'ㄑㄩ', 'ㄔㄨ'],
    meaning: '互相比較之下顯得不足',
    fun: '絀唸ㄔㄨˋ不唸「拙」。唸錯的瞬間，你就相形見絀了',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-009', text: '鞭辟入裡', target: '辟', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˋ', 'ㄆㄧ', 'ㄅㄧ'],
    meaning: '分析透徹、切中要點',
    fun: '教育部辭典標準唸ㄅㄧㄢ ㄅㄧˋ ㄖㄨˋ ㄌㄧˇ，很多人唸成ㄆㄧˋ。評論寫得鞭辟入裡，字唸對才算入裡',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-010', text: '怙惡不悛', target: '悛', zhuyin: 'ㄑㄩㄢ',
    distractors: ['ㄐㄩㄣˋ', 'ㄙㄨㄛ', 'ㄑㄩㄢˋ'],
    meaning: '堅持作惡，不肯悔改',
    fun: '悛唸ㄑㄩㄢ（悔改）。法院判決書常客，唸對直接升級法律系',
    tags: ['成語', '新聞常錯'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-011', text: '風流倜儻', target: '儻', zhuyin: 'ㄊㄤˇ',
    distractors: ['ㄉㄤˇ', 'ㄕㄤˇ', 'ㄊㄤ'],
    meaning: '灑脫不拘、才華出眾',
    fun: '倜儻唸「ㄊㄧˋ ㄊㄤˇ」。自稱風流倜儻卻唸不出來，扣分',
    tags: ['成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-012', text: '一葉扁舟', target: '扁', zhuyin: 'ㄆㄧㄢ',
    distractors: ['ㄅㄧㄢˇ', 'ㄆㄧㄢˇ', 'ㄅㄧㄢ'],
    meaning: '一艘小船',
    fun: '扁舟的扁唸ㄆㄧㄢ。船很小，但這題的錯誤率很大',
    tags: ['成語', '破音字', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-013', text: '篳路藍縷', target: '篳', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˊ', 'ㄅㄚ', 'ㄅㄧ'],
    meaning: '駕柴車穿破衣去開墾，形容創業艱辛',
    fun: '政治人物演講最愛用，記者打字最常錯。唸對你就贏過半個立法院',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-014', text: '含飴弄孫', target: '飴', zhuyin: 'ㄧˊ',
    distractors: ['ㄊㄞˊ', 'ㄙˋ', 'ㄧ'],
    meaning: '含著糖逗孫子，形容晚年生活悠閒',
    fun: '飴是麥芽糖。阿公阿嬤的退休夢想，注音的隱藏考題',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-015', text: '面面相覷', target: '覷', zhuyin: 'ㄑㄩˋ',
    distractors: ['ㄒㄩ', 'ㄐㄩˋ', 'ㄑㄩ'],
    meaning: '互相對看，不知如何是好',
    fun: '分組報告沒人想上台的時候，全組就是這個成語',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-016', text: '振聾發聵', target: '聵', zhuyin: 'ㄎㄨㄟˋ',
    distractors: ['ㄍㄨㄟˋ', 'ㄎㄨㄟ', 'ㄎㄨㄟˊ'],
    meaning: '比喻喚醒糊塗麻木的人',
    fun: '聵 = 天生耳聾。這個成語的音量，連戴耳機的人都聽得到',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-017', text: '杯盤狼藉', target: '藉', zhuyin: 'ㄐㄧˊ',
    distractors: ['ㄐㄧㄝˋ', 'ㄐㄧ', 'ㄐㄧˇ'],
    meaning: '宴飲後桌面凌亂的樣子',
    fun: '狼藉的藉唸ㄐㄧˊ，慰藉的藉才唸ㄐㄧㄝˋ。聚餐結束的桌面 = 這題的考點',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-018', text: '心無旁騖', target: '騖', zhuyin: 'ㄨˋ',
    distractors: ['ㄇㄠˋ', 'ㄠˊ', 'ㄨ'],
    meaning: '專心一意，沒有別的念頭',
    fun: '騖是馬亂跑。寫作業不滑手機就是心無旁騖，做得到嗎？',
    tags: ['成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-019', text: '趨之若鶩', target: '鶩', zhuyin: 'ㄨˋ',
    distractors: ['ㄇㄨˋ', 'ㄐㄧㄤˇ', 'ㄨ'],
    meaning: '像鴨群一樣成群跑去，形容爭相追逐',
    fun: '鶩是鴨子。排隊名店的人潮，就是字面意思的趨之若鶩',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-020', text: '萬馬齊瘖', target: '瘖', zhuyin: 'ㄧㄣ',
    distractors: ['ㄢ', 'ㄧㄣˇ', 'ㄧㄣˊ'],
    meaning: '比喻人們都沉默不敢說話',
    fun: '瘖 = 啞。群組裡丟出敏感話題後的已讀無回狀態',
    tags: ['成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-021', text: '披荊斬棘', target: '荊', zhuyin: 'ㄐㄧㄥ',
    distractors: ['ㄐㄧㄥˋ', 'ㄔㄨˊ', 'ㄐㄧㄥˊ'],
    meaning: '克服重重困難',
    fun: '荊棘唸「ㄐㄧㄥ ㄐㄧˊ」，兩個字都常被唸錯，雙倍荊棘',
    tags: ['成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-022', text: '怨聲載道', target: '載', zhuyin: 'ㄗㄞˋ',
    distractors: ['ㄗㄞˇ', 'ㄗㄞ', 'ㄗㄞˊ'],
    meaning: '到處都是抱怨的聲音',
    fun: '載 = 充滿時唸四聲。每次系統改版後的留言區',
    tags: ['成語', '破音字', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-023', text: '一蹴可幾', target: '蹴', zhuyin: 'ㄘㄨˋ',
    distractors: ['ㄐㄧㄡˋ', 'ㄔㄨˋ', 'ㄘㄨ'],
    meaning: '一步就能達成，形容輕而易舉',
    fun: '蹴 = 踏。學注音不能一蹴可幾，但這題可以',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-024', text: '同仇敵愾', target: '愾', zhuyin: 'ㄎㄞˋ',
    distractors: ['ㄑㄧˋ', 'ㄒㄧˋ', 'ㄎㄞ'],
    meaning: '共同懷著對敵人的憤恨',
    fun: '愾唸ㄎㄞˋ。電競比賽輸了之後，全隊看教練的眼神',
    tags: ['成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-025', text: '厲兵秣馬', target: '秣', zhuyin: 'ㄇㄛˋ',
    distractors: ['ㄇㄨˋ', 'ㄨㄟˋ', 'ㄇㄛ'],
    meaning: '磨利兵器、餵飽戰馬，準備作戰',
    fun: '秣 = 餵馬。期末考前一晚的你（理論上）',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-026', text: '暴殄天物', target: '暴', zhuyin: 'ㄅㄠˋ',
    distractors: ['ㄆㄨˋ', 'ㄅㄠ', 'ㄅㄠˊ'],
    meaning: '任意糟蹋東西',
    fun: '陷阱題！這裡的暴唸ㄅㄠˋ（殘害），一暴十寒的暴才唸ㄆㄨˋ。剛剛答對的人小心翻車',
    tags: ['成語', '破音字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-027', text: '熙來攘往', target: '攘', zhuyin: 'ㄖㄤˊ',
    distractors: ['ㄋㄤˊ', 'ㄖㄤˇ', 'ㄖㄤ'],
    meaning: '形容人來人往非常熱鬧',
    fun: '簡編本「熙來攘往」的攘唸二聲ㄖㄤˊ，不是三聲',
    tags: ['成語', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-028', text: '咄咄逼人', target: '咄', zhuyin: 'ㄉㄨㄛˋ',
    distractors: ['ㄔㄨㄛ', 'ㄉㄨ', 'ㄉㄨㄛ'],
    meaning: '氣勢凌人，使人難堪',
    fun: '咄咄唸「ㄉㄨㄛˋ ㄉㄨㄛˋ」。辯論社學長的氣場',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-029', text: '繁文縟節', target: '縟', zhuyin: 'ㄖㄨˋ',
    distractors: ['ㄖㄨˊ', 'ㄋㄨˋ', 'ㄖㄨ'],
    meaning: '繁瑣多餘的禮節或手續',
    fun: '辦個證件要跑三個櫃檯蓋五個章，就是繁文縟節',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-030', text: '令人髮指', target: '髮', zhuyin: 'ㄈㄚˇ',
    distractors: ['ㄈㄚ', 'ㄈㄚˋ', 'ㄈㄚˊ'],
    meaning: '憤怒到頭髮豎起來',
    fun: '髮唸三聲。氣到頭髮站起來，聲調也要站對位置',
    tags: ['成語', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-031', text: '鬼鬼祟祟', target: '祟', zhuyin: 'ㄙㄨㄟˋ',
    distractors: ['ㄔㄨㄥˊ', 'ㄙㄨㄟ', 'ㄙㄨㄟˊ'],
    meaning: '行動偷偷摸摸、不光明',
    fun: '祟不是崇！多一筆差很多，連字都長得像在搞鬼',
    tags: ['成語', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-032', text: '怦然心動', target: '怦', zhuyin: 'ㄆㄥ',
    distractors: ['ㄆㄧㄥ', 'ㄆㄥˊ', 'ㄆㄥˇ'],
    meaning: '心跳加速、被打動',
    fun: '怦唸ㄆㄥ一聲。心動歸心動，聲調不要亂動',
    tags: ['成語', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-033', text: '嗷嗷待哺', target: '哺', zhuyin: 'ㄅㄨˇ',
    distractors: ['ㄅㄨˋ', 'ㄆㄨ', 'ㄅㄨ'],
    meaning: '飢餓時急著等待餵食',
    fun: '哺唸三聲。午休前十分鐘的全班，集體嗷嗷待哺',
    tags: ['成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-034', text: '杞人憂天', target: '杞', zhuyin: 'ㄑㄧˇ',
    distractors: ['ㄐㄧˇ', 'ㄑㄧˊ', 'ㄑㄧ'],
    meaning: '不必要的憂慮',
    fun: '杞唸ㄑㄧˇ。擔心天塌下來之前，先擔心這題答錯',
    tags: ['成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-035', text: '唾手可得', target: '唾', zhuyin: 'ㄊㄨㄛˋ',
    distractors: ['ㄔㄨㄟˊ', 'ㄊㄨㄛ', 'ㄊㄨㄛˊ'],
    meaning: '非常容易得到',
    fun: '唾是口水的唾。這題的分數唾手可得，唸錯就吐血',
    tags: ['成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-036', text: '重蹈覆轍', target: '轍', zhuyin: 'ㄔㄜˋ',
    distractors: ['ㄓㄜˊ', 'ㄔㄜ', 'ㄔㄜˊ'],
    meaning: '重犯過去的錯誤',
    fun: '轍唸ㄔㄜˋ。上次唸錯這次又錯，就是字面上的重蹈覆轍',
    tags: ['成語', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-037', text: '諄諄教誨', target: '諄', zhuyin: 'ㄓㄨㄣ',
    distractors: ['ㄔㄨㄣˊ', 'ㄗㄨㄣ', 'ㄓㄨㄣˋ'],
    meaning: '懇切耐心地教導',
    fun: '諄唸ㄓㄨㄣ。老師講了八百次你還唸錯，老師的諄諄教誨呢',
    tags: ['成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-038', text: '滄海一粟', target: '粟', zhuyin: 'ㄙㄨˋ',
    distractors: ['ㄌㄧˋ', 'ㄙㄨ', 'ㄙㄨˊ'],
    meaning: '渺小微不足道',
    fun: '粟是小米不是栗子！想吃糖炒栗子的人每次都唸錯',
    tags: ['成語', '大考'], difficulty: 2, era: 'classic'
  },
  {
    id: 'id-039', text: '剛愎自用', target: '愎', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄈㄨˋ', 'ㄈㄨˊ', 'ㄅㄧ'],
    meaning: '固執己見不聽勸告',
    fun: '愎唸ㄅㄧˋ不是復。堅持唸錯還不查字典，就是剛愎自用',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-040', text: '瞠目結舌', target: '瞠', zhuyin: 'ㄔㄥ',
    distractors: ['ㄊㄤˊ', 'ㄔㄥˊ', 'ㄔㄥˋ'],
    meaning: '瞪眼說不出話',
    fun: '瞠唸ㄔㄥ。看到成績單的爸媽，標準瞠目結舌示範',
    tags: ['成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-041', text: '風馳電掣', target: '掣', zhuyin: 'ㄔㄜˋ',
    distractors: ['ㄓˋ', 'ㄑㄧˋ', 'ㄔㄜ'],
    meaning: '速度極快',
    fun: '掣唸ㄔㄜˋ。下課鐘響衝福利社的速度',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-042', text: '妄自菲薄', target: '菲', zhuyin: 'ㄈㄟˇ',
    distractors: ['ㄈㄟ', 'ㄈㄟˋ', 'ㄈㄟˊ'],
    meaning: '過分看輕自己',
    fun: '菲在這裡唸ㄈㄟˇ。別妄自菲薄，但也別把字唸錯',
    tags: ['成語', '破音字', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-043', text: '抽絲剝繭', target: '剝', zhuyin: 'ㄅㄛ',
    distractors: ['ㄅㄠ', 'ㄅㄛˊ', 'ㄅㄛˋ'],
    meaning: '細心逐步分析',
    fun: '剝在這裡唸ㄅㄛ。剝橘子才唸ㄅㄠ，破案跟吃橘子不一樣',
    tags: ['成語', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-044', text: '曲高和寡', target: '和', zhuyin: 'ㄏㄜˋ',
    distractors: ['ㄏㄜˊ', 'ㄏㄢˋ', 'ㄏㄜˇ'],
    meaning: '格調太高，難有共鳴',
    fun: '和 = 應和時唸ㄏㄜˋ。冷笑話沒人笑，安慰自己曲高和寡',
    tags: ['成語', '破音字', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-045', text: '鋌而走險', target: '鋌', zhuyin: 'ㄊㄧㄥˇ',
    distractors: ['ㄉㄧㄥˋ', 'ㄊㄧㄥˊ', 'ㄊㄧㄥ'],
    meaning: '走投無路而冒險',
    fun: '鋌唸ㄊㄧㄥˇ不是錠。考前一晚才翻課本，就是鋌而走險',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-046', text: '噤若寒蟬', target: '噤', zhuyin: 'ㄐㄧㄣˋ',
    distractors: ['ㄑㄧㄣˊ', 'ㄐㄧㄣ', 'ㄐㄧㄣˊ'],
    meaning: '不敢作聲',
    fun: '噤唸ㄐㄧㄣˋ。老師問「誰沒交作業」之後的教室',
    tags: ['成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-047', text: '未雨綢繆', target: '繆', zhuyin: 'ㄇㄡˊ',
    distractors: ['ㄇㄧㄡˋ', 'ㄌㄧㄠˊ', 'ㄇㄡ'],
    meaning: '事先做好準備',
    fun: '繆唸ㄇㄡˊ。出門帶傘是未雨綢繆，先學注音是未考綢繆',
    tags: ['成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-048', text: '鴻鵠之志', target: '鵠', zhuyin: 'ㄏㄨˊ',
    distractors: ['ㄍㄨˇ', 'ㄏㄠˊ', 'ㄏㄨ'],
    meaning: '遠大的志向',
    fun: '鵠是天鵝唸ㄏㄨˊ。立志唸對全部注音，就是鴻鵠之志',
    tags: ['成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'id-049', text: '眾口鑠金', target: '鑠', zhuyin: 'ㄕㄨㄛˋ',
    distractors: ['ㄌㄜˋ', 'ㄩㄝˋ', 'ㄕㄨㄛ'],
    meaning: '輿論力量大，能混淆是非',
    fun: '鑠唸ㄕㄨㄛˋ（熔化）。謠言傳三遍連金屬都會融化，古人懂網路',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-050', text: '提綱挈領', target: '挈', zhuyin: 'ㄑㄧㄝˋ',
    distractors: ['ㄒㄧㄝˊ', 'ㄑㄧˋ', 'ㄑㄧㄝ'],
    meaning: '抓住要點',
    fun: '挈唸ㄑㄧㄝˋ。會抓重點的學霸筆記，就是提綱挈領',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-051', text: '渾身解數', target: '解', zhuyin: 'ㄐㄧㄝˇ',
    distractors: ['ㄒㄧㄝˋ', 'ㄐㄧㄝˋ', 'ㄐㄧㄝ'],
    meaning: '使出全部本領',
    fun: '反轉陷阱！很多人特地唸ㄒㄧㄝˋ覺得自己很懂，教育部辭典標的是ㄐㄧㄝˇ',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-052', text: '叱吒風雲', target: '吒', zhuyin: 'ㄓㄚˋ',
    distractors: ['ㄔㄚˋ', 'ㄗㄚ', 'ㄓㄚ'],
    meaning: '聲勢威力極大',
    fun: '吒唸ㄓㄚˋ，哪吒的吒。但這裡威風的是你的注音',
    tags: ['成語', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-053', text: '數典忘祖', target: '數', zhuyin: 'ㄕㄨˇ',
    distractors: ['ㄕㄨˋ', 'ㄕㄨㄛˋ', 'ㄕㄨ'],
    meaning: '比喻人忘本',
    fun: '數 = 細數時唸ㄕㄨˇ，跟數見不鮮同字不同音，數字真會整人',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-054', text: '焚膏繼晷', target: '晷', zhuyin: 'ㄍㄨㄟˇ',
    distractors: ['ㄐㄧㄡˋ', 'ㄍㄨㄟ', 'ㄍㄨㄟˊ'],
    meaning: '夜以繼日，勤奮不懈',
    fun: '晷是日影唸ㄍㄨㄟˇ。古人點燈夜讀，現代人開夜燈滑手機',
    tags: ['成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-055', text: '殫精竭慮', target: '殫', zhuyin: 'ㄉㄢ',
    distractors: ['ㄉㄢˋ', 'ㄕㄢˋ', 'ㄉㄢˊ'],
    meaning: '用盡精力心思',
    fun: '殫唸ㄉㄢ一聲。為了想吐槽哏殫精竭慮的出題者，求安慰',
    tags: ['成語', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-056', text: '觥籌交錯', target: '觥', zhuyin: 'ㄍㄨㄥ',
    distractors: ['ㄍㄨㄤ', 'ㄏㄨㄤˊ', 'ㄍㄨㄥˊ'],
    meaning: '宴會熱鬧暢飲的樣子',
    fun: '觥是酒杯唸ㄍㄨㄥ。過年圍爐大人桌的盛況',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-057', text: '買櫝還珠', target: '櫝', zhuyin: 'ㄉㄨˊ',
    distractors: ['ㄉㄡˋ', 'ㄍㄨˋ', 'ㄉㄨ'],
    meaning: '捨本逐末，取捨失當',
    fun: '櫝是盒子唸ㄉㄨˊ。買盲盒只要盒子不要公仔的概念',
    tags: ['成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-058', text: '歃血為盟', target: '歃', zhuyin: 'ㄕㄚˋ',
    distractors: ['ㄔㄚ', 'ㄕㄚ', 'ㄕㄚˊ'],
    meaning: '結盟立誓',
    fun: '歃唸ㄕㄚˋ（用嘴吸）。古人結盟喝血酒，現代人拉群組',
    tags: ['成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'id-059', text: '沐猴而冠', target: '冠', zhuyin: 'ㄍㄨㄢˋ',
    distractors: ['ㄍㄨㄢ', 'ㄍㄨㄢˊ', 'ㄍㄨㄢˇ'],
    meaning: '譏諷人虛有其表',
    fun: '冠 = 戴帽時唸ㄍㄨㄢˋ，跟冠冕堂皇的冠不同音，猴子表示無辜',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-060', text: '錙銖必較', target: '錙', zhuyin: 'ㄗ',
    distractors: ['ㄘ', 'ㄗㄞ', 'ㄗˊ'],
    meaning: '斤斤計較',
    fun: '錙唸ㄗ一聲，古代超小的重量單位。分帳算到個位數的朋友',
    tags: ['成語', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-061', text: '越俎代庖', target: '庖', zhuyin: 'ㄆㄠˊ',
    distractors: ['ㄅㄠ', 'ㄆㄠ', 'ㄆㄠˇ'],
    meaning: '超出職責，代人做事',
    fun: '庖是廚師唸ㄆㄠˊ。幫同學寫作業不是友情，是越俎代庖',
    tags: ['成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-062', text: '桀驁不馴', target: '驁', zhuyin: 'ㄠˊ',
    distractors: ['ㄠˇ', 'ㄐㄧㄝˊ', 'ㄠ'],
    meaning: '性情倔強，不服管教',
    fun: '驁唸二聲ㄠˊ。家裡的貓，桀驁不馴的具體化身',
    tags: ['成語', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-063', text: '安土重遷', target: '重', zhuyin: 'ㄓㄨㄥˋ',
    distractors: ['ㄔㄨㄥˊ', 'ㄓㄨㄥ', 'ㄓㄨㄥˊ'],
    meaning: '安於故土，不願輕易搬遷',
    fun: '重 = 看重時唸ㄓㄨㄥˋ。搬家要重新適應早餐店，懂的都懂',
    tags: ['成語', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-064', text: '根深柢固', target: '柢', zhuyin: 'ㄉㄧˇ',
    distractors: ['ㄉㄧˋ', 'ㄓ', 'ㄉㄧ'],
    meaning: '基礎穩固，不可動搖',
    fun: '柢是樹根唸ㄉㄧˇ。壞習慣根深柢固，比如注音一直唸錯',
    tags: ['成語', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'id-065', text: '命途多舛', target: '舛', zhuyin: 'ㄔㄨㄢˇ',
    distractors: ['ㄐㄧㄝˊ', 'ㄔㄨㄢ', 'ㄔㄨㄢˊ'],
    meaning: '命運坎坷不順',
    fun: '舛唸ㄔㄨㄢˇ。連續抽卡不中還踩到樂高，命途多舛',
    tags: ['成語', '新聞常錯'], difficulty: 4, era: 'classic'
  }
];
