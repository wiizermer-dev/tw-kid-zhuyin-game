/**
 * 易讀錯字 — 大家都唸錯的字
 * schema: { id, text, target, zhuyin, distractors[], meaning, fun, tags[], difficulty(1-5), era }
 * 注音以教育部《重編國語辭典修訂本》為準；distractors 必須是真實常見誤讀。
 */
export default [
  {
    id: 'tk-001', text: '莘莘學子', target: '莘', zhuyin: 'ㄕㄣ',
    distractors: ['ㄒㄧㄣ', 'ㄕㄥ'],
    meaning: '形容眾多的學生',
    fun: '唸成「辛辛學子」的人，本身就是辛辛學子',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-002', text: '呱呱墜地', target: '呱', zhuyin: 'ㄨㄚ',
    distractors: ['ㄍㄨ', 'ㄍㄨㄚ'],
    meaning: '形容嬰兒出生',
    fun: '教育部辭典「呱呱墜地」唸ㄨㄚ ㄨㄚ（嬰兒哭聲），不是青蛙的ㄍㄨ ㄍㄨ，超多人唸錯',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-003', text: '暴殄天物', target: '殄', zhuyin: 'ㄊㄧㄢˇ',
    distractors: ['ㄓㄣ', 'ㄉㄧㄢˇ'],
    meaning: '任意糟蹋東西',
    fun: '把這個字唸錯，就是在暴殄天物（指這題）',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-004', text: '心寬體胖', target: '胖', zhuyin: 'ㄆㄢˊ',
    distractors: ['ㄆㄤˋ', 'ㄅㄢˋ'],
    meaning: '心胸開朗，身體舒泰',
    fun: '這裡是「安舒」的意思，跟體重沒關係，不要對號入座',
    tags: ['易讀錯', '破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-005', text: '一暴十寒', target: '暴', zhuyin: 'ㄆㄨˋ',
    distractors: ['ㄅㄠˋ'],
    meaning: '勤奮少、懈怠多，比喻做事沒恆心',
    fun: '「暴」在這裡是曬太陽（同「曝」），不是暴怒的暴',
    tags: ['易讀錯', '破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-006', text: '否極泰來', target: '否', zhuyin: 'ㄆㄧˇ',
    distractors: ['ㄈㄡˇ'],
    meaning: '壞運到了盡頭，好運就來了',
    fun: '唸對這題，你的注音運勢正式否極泰來',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-007', text: '良莠不齊', target: '莠', zhuyin: 'ㄧㄡˇ',
    distractors: ['ㄒㄧㄡˋ', 'ㄧㄡˋ'],
    meaning: '好壞參雜在一起',
    fun: '「莠」是長得像禾苗的雜草，假帳號的始祖',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-008', text: '草菅人命', target: '菅', zhuyin: 'ㄐㄧㄢ',
    distractors: ['ㄍㄨㄢˇ', 'ㄐㄧㄢˇ'],
    meaning: '把人命看得像野草一樣輕賤',
    fun: '唸成「草管人命」的話，人命就被水管掉了',
    tags: ['易讀錯', '新聞常錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-009', text: '罄竹難書', target: '罄', zhuyin: 'ㄑㄧㄥˋ',
    distractors: ['ㄒㄧㄣ', 'ㄑㄧㄥ'],
    meaning: '罪狀多到寫不完',
    fun: '罄 = 用盡。竹簡用光都寫不完，古代版的「檔案太大無法上傳」',
    tags: ['易讀錯', '新聞常錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-010', text: '大腹便便', target: '便', zhuyin: 'ㄆㄧㄢˊ',
    distractors: ['ㄅㄧㄢˋ'],
    meaning: '形容肚子肥大',
    fun: '唸成ㄅㄧㄢˋ的話，這個成語的畫面就不太妙了',
    tags: ['易讀錯', '破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-011', text: '風靡一時', target: '靡', zhuyin: 'ㄇㄧˇ',
    distractors: ['ㄇㄧˊ', 'ㄇㄛˊ'],
    meaning: '形容事物在一段時間內非常流行',
    fun: '靡 = 倒下。大家像被風吹倒一樣跟風，跟現在的迷因傳播 87% 像',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-012', text: '虛與委蛇', target: '蛇', zhuyin: 'ㄧˊ',
    distractors: ['ㄕㄜˊ', 'ㄨㄟˇ'],
    meaning: '假意敷衍應付',
    fun: '這條蛇唸「移」。已讀亂回的文言文說法',
    tags: ['易讀錯', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-013', text: '角色', target: '角', zhuyin: 'ㄐㄩㄝˊ',
    distractors: ['ㄐㄧㄠˇ'],
    meaning: '戲劇或故事中的人物',
    fun: '教育部說唸ㄐㄩㄝˊ色，但全台灣都唸ㄐㄧㄠˇ色，標準答案 vs 母語直覺之戰',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-014', text: '友誼', target: '誼', zhuyin: 'ㄧˋ',
    distractors: ['ㄧˊ'],
    meaning: '朋友之間的情感',
    fun: '友「ㄧˋ」萬歲！唸ㄧˊ的友誼小船說翻就翻',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-015', text: '倔強', target: '倔', zhuyin: 'ㄐㄩㄝˊ',
    distractors: ['ㄐㄩㄝˋ', 'ㄑㄩㄝˋ'],
    meaning: '個性固執不肯屈服',
    fun: '連這個字的讀音都很倔強，跟你想的不一樣',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-016', text: '蛤蜊', target: '蜊', zhuyin: 'ㄌㄧˊ',
    distractors: ['ㄌㄧˋ', 'ㄌㄚˇ'],
    meaning: '一種雙殼貝類，常見海鮮',
    fun: '蛤蜊唸「ㄍㄜˊ ㄌㄧˊ」。蛤？對，就是蛤',
    tags: ['易讀錯', '美食'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-017', text: '烘焙', target: '焙', zhuyin: 'ㄅㄟˋ',
    distractors: ['ㄆㄟˊ', 'ㄅㄚˋ'],
    meaning: '用火或烤箱烤乾食物',
    fun: '全台的「烘ㄆㄟˊ坊」聽到正解都驚呆了',
    tags: ['易讀錯', '美食'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-018', text: '麻痺', target: '痺', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˊ'],
    meaning: '失去知覺，或形容反應遲鈍',
    fun: '打太多電動手指麻「ㄅㄧˋ」，不是麻「皮」',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-019', text: '包庇', target: '庇', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˋ', 'ㄅㄟˋ'],
    meaning: '袒護、掩護（多指壞事）',
    fun: '社會新聞高頻字，記者都唸對了，你呢？',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-020', text: '吮吸', target: '吮', zhuyin: 'ㄕㄨㄣˇ',
    distractors: ['ㄩㄣˇ', 'ㄔㄨㄢˇ'],
    meaning: '用嘴吸取',
    fun: '吮指回味的「吮」，炸雞廣告教過你，只是你沒注意',
    tags: ['易讀錯', '美食'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-021', text: '玷汙', target: '玷', zhuyin: 'ㄉㄧㄢˋ',
    distractors: ['ㄓㄢ', 'ㄉㄧㄢˇ'],
    meaning: '弄髒、使蒙受恥辱',
    fun: '唸成「沾汙」意思好像也通，但國文老師不會放過你',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-022', text: '粗獷', target: '獷', zhuyin: 'ㄍㄨㄤˇ',
    distractors: ['ㄎㄨㄤˋ', 'ㄍㄨㄤ'],
    meaning: '粗野豪放',
    fun: '十個人九個唸「粗ㄎㄨㄤˋ」，唸ㄍㄨㄤˇ的那一個，氣質直接輾壓全場',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-023', text: '一丘之貉', target: '貉', zhuyin: 'ㄏㄜˊ',
    distractors: ['ㄍㄜˊ', 'ㄌㄨㄛˋ'],
    meaning: '同一類的壞人，彼此沒有差別',
    fun: '貉是一種長得像狸的動物，牠表示：被罵還被唸錯名字，雙重傷害',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-024', text: '不落窠臼', target: '窠', zhuyin: 'ㄎㄜ',
    distractors: ['ㄍㄨㄛ', 'ㄔㄠˊ'],
    meaning: '不落入舊有的格式，有獨創風格',
    fun: '窠臼 = 老套。這題本身就很不落窠臼吧？',
    tags: ['易讀錯', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-025', text: '生活拮据', target: '据', zhuyin: 'ㄐㄩ',
    distractors: ['ㄐㄩˋ'],
    meaning: '經濟狀況窘迫',
    fun: '月底的你：生活拮「ㄐㄩ」，連聲調都省了',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-026', text: '模樣', target: '模', zhuyin: 'ㄇㄨˊ',
    distractors: ['ㄇㄛˊ'],
    meaning: '外表、長相',
    fun: '模型唸ㄇㄛˊ，模樣唸ㄇㄨˊ，中文：我就是要這樣',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-027', text: '枯萎', target: '萎', zhuyin: 'ㄨㄟ',
    distractors: ['ㄨㄟˇ'],
    meaning: '草木乾枯凋謝',
    fun: '教育部標準是一聲ㄨㄟ。對，一聲。全班一起唸錯的那種字',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-028', text: '龜裂', target: '龜', zhuyin: 'ㄐㄩㄣ',
    distractors: ['ㄍㄨㄟ'],
    meaning: '皮膚或表面裂開',
    fun: '冬天手龜裂的「龜」唸ㄐㄩㄣ，跟烏龜無關，烏龜表示欣慰',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-029', text: '諂媚', target: '諂', zhuyin: 'ㄔㄢˇ',
    distractors: ['ㄒㄧㄢˋ', 'ㄧㄢˇ'],
    meaning: '巴結奉承',
    fun: '對老闆諂媚之前，至少先把字唸對',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-030', text: '紊亂', target: '紊', zhuyin: 'ㄨㄣˋ',
    distractors: ['ㄨㄣˇ', 'ㄇㄧˋ'],
    meaning: '雜亂沒有條理',
    fun: '作息紊亂的人，連這個字的聲調也跟著亂了',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-031', text: '矜持', target: '矜', zhuyin: 'ㄐㄧㄣ',
    distractors: ['ㄐㄧㄣˋ', 'ㄑㄧㄣˊ'],
    meaning: '慎重自持、端莊',
    fun: '保持矜持的第一步：聲調不要亂飆',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-032', text: '徘徊', target: '徊', zhuyin: 'ㄏㄨㄞˊ',
    distractors: ['ㄏㄨㄟˊ'],
    meaning: '來回走動，猶豫不決',
    fun: '在ㄏㄨㄞˊ和ㄏㄨㄟˊ之間徘徊的你，現在有答案了',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-033', text: '氛圍', target: '氛', zhuyin: 'ㄈㄣ',
    distractors: ['ㄈㄣˋ', 'ㄈㄣˊ'],
    meaning: '周圍的氣氛和情調',
    fun: '「氛圍感」都在講，但九成的人聲調是錯的。一聲，輕輕的，像氛圍一樣',
    tags: ['易讀錯', '新聞常錯', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-034', text: '蜿蜒', target: '蜿', zhuyin: 'ㄨㄢˇ',
    distractors: ['ㄨㄢ', 'ㄨㄢˊ'],
    meaning: '彎彎曲曲延伸的樣子',
    fun: '教育部辭典唸ㄨㄢˇ ㄧㄢˊ（三聲），不是一聲。山路蜿蜒，聲調也轉個彎',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-035', text: '曝光', target: '曝', zhuyin: 'ㄆㄨˋ',
    distractors: ['ㄅㄠˋ'],
    meaning: '顯露在鏡頭或大眾面前',
    fun: '網紅最愛的「曝光率」，唸ㄆㄨˋ才專業',
    tags: ['易讀錯', '新聞常錯', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-036', text: '噱頭', target: '噱', zhuyin: 'ㄒㄩㄝ',
    distractors: ['ㄒㄩㄝˊ', 'ㄐㄩㄝˊ'],
    meaning: '吸引人注意的花招',
    fun: '教育部辭典「噱頭」唸ㄒㄩㄝ ㄊㄡˊ（一聲），不是二聲。行銷人必修字',
    tags: ['易讀錯', '日常'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-037', text: '馴服', target: '馴', zhuyin: 'ㄒㄩㄣˊ',
    distractors: ['ㄒㄩㄣˋ'],
    meaning: '使順從聽話',
    fun: '《馴龍高手》的馴是二聲，先馴服自己的聲調吧',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-038', text: '畸形', target: '畸', zhuyin: 'ㄐㄧ',
    distractors: ['ㄑㄧˊ', 'ㄧˋ'],
    meaning: '不正常的形態發展',
    fun: '「ㄑㄧˊ形」是畸形的畸形唸法',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-039', text: '熾熱', target: '熾', zhuyin: 'ㄔˋ',
    distractors: ['ㄓˋ', 'ㄒㄧˋ'],
    meaning: '像火一樣燙、極度熱烈',
    fun: '言情小說高頻字，「熾熱的眼神」唸錯就不熱了',
    tags: ['易讀錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-040', text: '夢魘', target: '魘', zhuyin: 'ㄧㄢˇ',
    distractors: ['ㄧㄢˋ', 'ㄧㄢ'],
    meaning: '惡夢，或揮之不去的恐懼',
    fun: '唸錯的話，這題就會變成你的夢魘（三聲的那種）',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-041', text: '剽竊', target: '剽', zhuyin: 'ㄆㄧㄠˋ',
    distractors: ['ㄆㄧㄠ', 'ㄅㄧㄠ'],
    meaning: '抄襲別人的作品或成果',
    fun: '論文門事件常駐用字，唸四聲才有譴責的力道',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-042', text: '濫觴', target: '觴', zhuyin: 'ㄕㄤ',
    distractors: ['ㄕㄤˋ', 'ㄧㄤˊ'],
    meaning: '事物的起源',
    fun: '作文想拿高分必用詞，但唸錯就尷尬了',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-043', text: '骨骸', target: '骸', zhuyin: 'ㄏㄞˊ',
    distractors: ['ㄍㄞ', 'ㄏㄜˊ'],
    meaning: '人或動物的骨頭遺骸',
    fun: '考古節目常見字，唸「孩」不唸「該」',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-044', text: '佝僂', target: '僂', zhuyin: 'ㄌㄡˊ',
    distractors: ['ㄌㄩˇ', 'ㄌㄡˋ'],
    meaning: '背部彎曲、駝背',
    fun: '低頭滑手機滑久了，小心變佝僂（順便學會怎麼唸）',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-045', text: '攜帶', target: '攜', zhuyin: 'ㄒㄧ',
    distractors: ['ㄒㄧㄝˊ', 'ㄎㄟ'],
    meaning: '隨身帶著',
    fun: '教育部標準唸ㄒㄧ（一聲）。捷運廣播每天考你這題',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'modern'
  }
];
