/**
 * 易讀錯字 — 大家都唸錯的字
 * schema: { id, text, target, zhuyin, distractors[], meaning, fun, tags[], difficulty(1-5), era }
 * 注音以教育部《國語辭典簡編本》為主（查無才退《重編國語辭典修訂本》）；distractors 必須是真實常見誤讀。
 */
export default [
  {
    id: 'tk-001', text: '莘莘學子', target: '莘', zhuyin: 'ㄕㄣ',
    distractors: ['ㄒㄧㄣ', 'ㄕㄥ', 'ㄕㄥˋ'],
    meaning: '形容眾多的學生',
    fun: '唸成「辛辛學子」的人，本身就是辛辛學子',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-002', text: '呱呱墜地', target: '呱', zhuyin: 'ㄍㄨ',
    distractors: ['ㄨㄚ', 'ㄍㄨㄚ', 'ㄨㄚˋ'],
    meaning: '形容嬰兒出生',
    fun: '簡編本「呱呱墜地」唸ㄍㄨ ㄍㄨ，很多人受注音表影響改唸ㄨㄚ反而錯',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-003', text: '暴殄天物', target: '殄', zhuyin: 'ㄊㄧㄢˇ',
    distractors: ['ㄓㄣ', 'ㄉㄧㄢˇ', 'ㄊㄧㄢˋ'],
    meaning: '任意糟蹋東西',
    fun: '把這個字唸錯，就是在暴殄天物（指這題）',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-004', text: '心寬體胖', target: '胖', zhuyin: 'ㄆㄢˊ',
    distractors: ['ㄆㄤˋ', 'ㄅㄢˋ', 'ㄆㄢˋ'],
    meaning: '心胸開朗，身體舒泰',
    fun: '這裡是「安舒」的意思，跟體重沒關係，不要對號入座',
    tags: ['易讀錯', '破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-005', text: '一暴十寒', target: '暴', zhuyin: 'ㄆㄨˋ',
    distractors: ['ㄅㄠˋ', 'ㄆㄨ', 'ㄆㄨˇ'],
    meaning: '勤奮少、懈怠多，比喻做事沒恆心',
    fun: '「暴」在這裡是曬太陽（同「曝」），不是暴怒的暴',
    tags: ['易讀錯', '破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-006', text: '否極泰來', target: '否', zhuyin: 'ㄆㄧˇ',
    distractors: ['ㄈㄡˇ', 'ㄆㄧˋ', 'ㄆㄧ'],
    meaning: '壞運到了盡頭，好運就來了',
    fun: '唸對這題，你的注音運勢正式否極泰來',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-007', text: '良莠不齊', target: '莠', zhuyin: 'ㄧㄡˋ',
    distractors: ['ㄒㄧㄡˋ', 'ㄧㄡˇ', 'ㄧㄡ'],
    meaning: '好壞參雜在一起',
    fun: '「莠」是長得像禾苗的雜草，假帳號的始祖',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-008', text: '草菅人命', target: '菅', zhuyin: 'ㄐㄧㄢ',
    distractors: ['ㄍㄨㄢˇ', 'ㄐㄧㄢˇ', 'ㄐㄧㄢˋ'],
    meaning: '把人命看得像野草一樣輕賤',
    fun: '唸成「草管人命」的話，人命就被水管掉了',
    tags: ['易讀錯', '新聞常錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-009', text: '罄竹難書', target: '罄', zhuyin: 'ㄑㄧㄥˋ',
    distractors: ['ㄒㄧㄣ', 'ㄑㄧㄥ', 'ㄑㄧㄥˇ'],
    meaning: '罪狀多到寫不完',
    fun: '罄 = 用盡。竹簡用光都寫不完，古代版的「檔案太大無法上傳」',
    tags: ['易讀錯', '新聞常錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-010', text: '大腹便便', target: '便', zhuyin: 'ㄆㄧㄢˊ',
    distractors: ['ㄅㄧㄢˋ', 'ㄆㄧㄢˇ', 'ㄆㄧㄢ'],
    meaning: '形容肚子肥大',
    fun: '唸成ㄅㄧㄢˋ的話，這個成語的畫面就不太妙了',
    tags: ['易讀錯', '破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-011', text: '風靡一時', target: '靡', zhuyin: 'ㄇㄧˇ',
    distractors: ['ㄇㄧˊ', 'ㄇㄛˊ', 'ㄇㄧˋ'],
    meaning: '形容事物在一段時間內非常流行',
    fun: '靡 = 倒下。大家像被風吹倒一樣跟風，跟現在的迷因傳播 87% 像',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-012', text: '虛與委蛇', target: '蛇', zhuyin: 'ㄧˊ',
    distractors: ['ㄕㄜˊ', 'ㄨㄟˇ', 'ㄧ'],
    meaning: '假意敷衍應付',
    fun: '這條蛇唸「移」。已讀亂回的文言文說法',
    tags: ['易讀錯', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-013', text: '綻放', target: '綻', zhuyin: 'ㄓㄢˋ',
    distractors: ['ㄉㄧㄥˋ', 'ㄓㄢ', 'ㄔㄢˋ'],
    meaning: '花朵開放',
    fun: '「綻」常被看成「定」字旁亂唸成ㄉㄧㄥˋ，其實只唸ㄓㄢˋ，破綻的綻',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-014', text: '友誼', target: '誼', zhuyin: 'ㄧˋ',
    distractors: ['ㄧˊ', 'ㄧˇ', 'ㄧ'],
    meaning: '朋友之間的情感',
    fun: '友「ㄧˋ」萬歲！唸ㄧˊ的友誼小船說翻就翻',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-015', text: '倔強', target: '倔', zhuyin: 'ㄐㄩㄝˊ',
    distractors: ['ㄐㄩㄝˋ', 'ㄑㄩㄝˋ', 'ㄐㄩㄝ'],
    meaning: '個性固執不肯屈服',
    fun: '連這個字的讀音都很倔強，跟你想的不一樣',
    tags: ['易讀錯'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-016', text: '蛤蜊', target: '蜊', zhuyin: 'ㄌㄧˊ',
    distractors: ['ㄌㄧˋ', 'ㄌㄚˇ', 'ㄌㄧ'],
    meaning: '一種雙殼貝類，常見海鮮',
    fun: '蛤蜊唸「ㄍㄜˊ ㄌㄧˊ」。蛤？對，就是蛤',
    tags: ['易讀錯', '美食'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-017', text: '烘焙', target: '焙', zhuyin: 'ㄅㄟˋ',
    distractors: ['ㄆㄟˊ', 'ㄅㄚˋ', 'ㄅㄟˇ'],
    meaning: '用火或烤箱烤乾食物',
    fun: '全台的「烘ㄆㄟˊ坊」聽到正解都驚呆了',
    tags: ['易讀錯', '美食'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-018', text: '麻痺', target: '痺', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˊ', 'ㄅㄧˇ', 'ㄅㄧ'],
    meaning: '失去知覺，或形容反應遲鈍',
    fun: '打太多電動手指麻「ㄅㄧˋ」，不是麻「皮」',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-019', text: '包庇', target: '庇', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˋ', 'ㄅㄟˋ', 'ㄅㄧˇ'],
    meaning: '袒護、掩護（多指壞事）',
    fun: '社會新聞高頻字，記者都唸對了，你呢？',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-020', text: '吮吸', target: '吮', zhuyin: 'ㄕㄨㄣˇ',
    distractors: ['ㄩㄣˇ', 'ㄔㄨㄢˇ', 'ㄕㄨㄣˋ'],
    meaning: '用嘴吸取',
    fun: '吮指回味的「吮」，炸雞廣告教過你，只是你沒注意',
    tags: ['易讀錯', '美食'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-021', text: '玷汙', target: '玷', zhuyin: 'ㄉㄧㄢˋ',
    distractors: ['ㄓㄢ', 'ㄉㄧㄢˇ', 'ㄉㄧㄢ'],
    meaning: '弄髒、使蒙受恥辱',
    fun: '唸成「沾汙」意思好像也通，但國文老師不會放過你',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-022', text: '粗獷', target: '獷', zhuyin: 'ㄍㄨㄤˇ',
    distractors: ['ㄎㄨㄤˋ', 'ㄍㄨㄤ', 'ㄍㄨㄤˋ'],
    meaning: '粗野豪放',
    fun: '十個人九個唸「粗ㄎㄨㄤˋ」，唸ㄍㄨㄤˇ的那一個，氣質直接輾壓全場',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-023', text: '一丘之貉', target: '貉', zhuyin: 'ㄏㄜˊ',
    distractors: ['ㄍㄜˊ', 'ㄌㄨㄛˋ', 'ㄏㄜ'],
    meaning: '同一類的壞人，彼此沒有差別',
    fun: '貉是一種長得像狸的動物，牠表示：被罵還被唸錯名字，雙重傷害',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-024', text: '不落窠臼', target: '窠', zhuyin: 'ㄎㄜ',
    distractors: ['ㄍㄨㄛ', 'ㄔㄠˊ', 'ㄎㄜˋ'],
    meaning: '不落入舊有的格式，有獨創風格',
    fun: '窠臼 = 老套。這題本身就很不落窠臼吧？',
    tags: ['易讀錯', '成語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-025', text: '生活拮据', target: '据', zhuyin: 'ㄐㄩ',
    distractors: ['ㄐㄩˋ', 'ㄐㄩˇ', 'ㄐㄩˊ'],
    meaning: '經濟狀況窘迫',
    fun: '月底的你：生活拮「ㄐㄩ」，連聲調都省了',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-026', text: '模樣', target: '模', zhuyin: 'ㄇㄛˊ',
    distractors: ['ㄇㄨˊ', 'ㄇㄨ', 'ㄇㄨˇ'],
    meaning: '外表、長相',
    fun: '簡編本「模」一律唸ㄇㄛˊ，模樣、模型、模範都是，別自己加破音',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-027', text: '枯萎', target: '萎', zhuyin: 'ㄨㄟ',
    distractors: ['ㄨㄟˇ', 'ㄨㄟˊ', 'ㄨㄟˋ'],
    meaning: '草木乾枯凋謝',
    fun: '教育部標準是一聲ㄨㄟ。對，一聲。全班一起唸錯的那種字',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-028', text: '龜裂', target: '龜', zhuyin: 'ㄐㄩㄣ',
    distractors: ['ㄍㄨㄟ', 'ㄐㄩㄣˊ', 'ㄐㄩㄣˋ'],
    meaning: '皮膚或表面裂開',
    fun: '冬天手龜裂的「龜」唸ㄐㄩㄣ，跟烏龜無關，烏龜表示欣慰',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-029', text: '諂媚', target: '諂', zhuyin: 'ㄔㄢˇ',
    distractors: ['ㄒㄧㄢˋ', 'ㄧㄢˇ', 'ㄔㄢˋ'],
    meaning: '巴結奉承',
    fun: '對老闆諂媚之前，至少先把字唸對',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-030', text: '紊亂', target: '紊', zhuyin: 'ㄨㄣˋ',
    distractors: ['ㄨㄣˇ', 'ㄇㄧˋ', 'ㄨㄣ'],
    meaning: '雜亂沒有條理',
    fun: '作息紊亂的人，連這個字的聲調也跟著亂了',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-031', text: '矜持', target: '矜', zhuyin: 'ㄐㄧㄣ',
    distractors: ['ㄐㄧㄣˋ', 'ㄑㄧㄣˊ', 'ㄐㄧㄣˊ'],
    meaning: '慎重自持、端莊',
    fun: '保持矜持的第一步：聲調不要亂飆',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-032', text: '徘徊', target: '徊', zhuyin: 'ㄏㄨㄞˊ',
    distractors: ['ㄏㄨㄟˊ', 'ㄏㄨㄞˇ', 'ㄏㄨㄞ'],
    meaning: '來回走動，猶豫不決',
    fun: '在ㄏㄨㄞˊ和ㄏㄨㄟˊ之間徘徊的你，現在有答案了',
    tags: ['易讀錯'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-033', text: '氛圍', target: '氛', zhuyin: 'ㄈㄣ',
    distractors: ['ㄈㄣˋ', 'ㄈㄣˊ', 'ㄈㄣˇ'],
    meaning: '周圍的氣氛和情調',
    fun: '「氛圍感」都在講，但九成的人聲調是錯的。一聲，輕輕的，像氛圍一樣',
    tags: ['易讀錯', '新聞常錯', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-034', text: '蜿蜒', target: '蜿', zhuyin: 'ㄨㄢ',
    distractors: ['ㄨㄢˇ', 'ㄨㄢˊ', 'ㄨㄢˋ'],
    meaning: '彎彎曲曲延伸的樣子',
    fun: '簡編本「蜿」唸一聲ㄨㄢ，大多數人唸三聲反而是錯的，山路跟著轉彎',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-035', text: '曝光', target: '曝', zhuyin: 'ㄆㄨˋ',
    distractors: ['ㄅㄠˋ', 'ㄆㄨ', 'ㄆㄨˇ'],
    meaning: '顯露在鏡頭或大眾面前',
    fun: '網紅最愛的「曝光率」，唸ㄆㄨˋ才專業',
    tags: ['易讀錯', '新聞常錯', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-036', text: '噱頭', target: '噱', zhuyin: 'ㄒㄩㄝ',
    distractors: ['ㄒㄩㄝˊ', 'ㄐㄩㄝˊ', 'ㄒㄩㄝˋ'],
    meaning: '吸引人注意的花招',
    fun: '教育部辭典「噱頭」唸ㄒㄩㄝ ㄊㄡˊ（一聲），不是二聲。行銷人必修字',
    tags: ['易讀錯', '日常'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-037', text: '馴服', target: '馴', zhuyin: 'ㄒㄩㄣˊ',
    distractors: ['ㄒㄩㄣˋ', 'ㄒㄩㄣ', 'ㄒㄩㄣˇ'],
    meaning: '使順從聽話',
    fun: '《馴龍高手》的馴是二聲，先馴服自己的聲調吧',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-038', text: '畸形', target: '畸', zhuyin: 'ㄐㄧ',
    distractors: ['ㄑㄧˊ', 'ㄧˋ', 'ㄐㄧˊ'],
    meaning: '不正常的形態發展',
    fun: '「ㄑㄧˊ形」是畸形的畸形唸法',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-039', text: '熾熱', target: '熾', zhuyin: 'ㄔˋ',
    distractors: ['ㄓˋ', 'ㄒㄧˋ', 'ㄔ'],
    meaning: '像火一樣燙、極度熱烈',
    fun: '言情小說高頻字，「熾熱的眼神」唸錯就不熱了',
    tags: ['易讀錯'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-040', text: '夢魘', target: '魘', zhuyin: 'ㄧㄢˇ',
    distractors: ['ㄧㄢˋ', 'ㄧㄢ', 'ㄧㄢˊ'],
    meaning: '惡夢，或揮之不去的恐懼',
    fun: '唸錯的話，這題就會變成你的夢魘（三聲的那種）',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-041', text: '剽竊', target: '剽', zhuyin: 'ㄆㄧㄠˋ',
    distractors: ['ㄆㄧㄠ', 'ㄅㄧㄠ', 'ㄆㄧㄠˇ'],
    meaning: '抄襲別人的作品或成果',
    fun: '論文門事件常駐用字，唸四聲才有譴責的力道',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-042', text: '濫觴', target: '觴', zhuyin: 'ㄕㄤ',
    distractors: ['ㄕㄤˋ', 'ㄧㄤˊ', 'ㄕㄤˊ'],
    meaning: '事物的起源',
    fun: '作文想拿高分必用詞，但唸錯就尷尬了',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-043', text: '骨骸', target: '骸', zhuyin: 'ㄏㄞˊ',
    distractors: ['ㄍㄞ', 'ㄏㄜˊ', 'ㄏㄞ'],
    meaning: '人或動物的骨頭遺骸',
    fun: '考古節目常見字，唸「孩」不唸「該」',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-044', text: '佝僂', target: '僂', zhuyin: 'ㄌㄡˊ',
    distractors: ['ㄌㄩˇ', 'ㄌㄡˋ', 'ㄌㄡ'],
    meaning: '背部彎曲、駝背',
    fun: '低頭滑手機滑久了，小心變佝僂（順便學會怎麼唸）',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-045', text: '攜帶', target: '攜', zhuyin: 'ㄒㄧ',
    distractors: ['ㄒㄧㄝˊ', 'ㄎㄟ', 'ㄒㄧˊ'],
    meaning: '隨身帶著',
    fun: '教育部標準唸ㄒㄧ（一聲）。捷運廣播每天考你這題',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-046', text: '亞洲', target: '亞', zhuyin: 'ㄧㄚˋ',
    distractors: ['ㄧㄚˇ', 'ㄧㄚ', 'ㄧㄚˊ'],
    meaning: '世界七大洲之一，臺灣所在的洲',
    fun: '我們住的洲是四聲，唸三聲的請重新入境',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-047', text: '蛋撻', target: '撻', zhuyin: 'ㄊㄚˋ',
    distractors: ['ㄊㄚˇ', 'ㄉㄚˊ', 'ㄊㄚ'],
    meaning: '蛋奶餡的西式烤點心',
    fun: '唸「蛋塔」的人排隊買葡式蛋撻時都被店員默默原諒了',
    tags: ['易讀錯', '美食'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-048', text: '馬鈴薯', target: '薯', zhuyin: 'ㄕㄨˇ',
    distractors: ['ㄕㄨˊ', 'ㄕㄨ', 'ㄕㄨˋ'],
    meaning: '塊莖類蔬菜，薯條的原料',
    fun: '三聲ㄕㄨˇ。唸二聲的人，薯條沒收',
    tags: ['易讀錯', '美食'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-049', text: '蛤蟆', target: '蛤', zhuyin: 'ㄏㄚˊ',
    distractors: ['ㄍㄜˊ', 'ㄏㄚˇ', 'ㄏㄚ'],
    meaning: '蛙和蟾蜍的俗稱',
    fun: '蛤蜊的蛤唸ㄍㄜˊ，蛤蟆的蛤唸ㄏㄚˊ。蛤？對，又是蛤',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-050', text: '牛肚', target: '肚', zhuyin: 'ㄉㄨˇ',
    distractors: ['ㄉㄨˋ', 'ㄉㄨ', 'ㄉㄨˊ'],
    meaning: '牛的胃，常見滷味食材',
    fun: '動物的胃當食物唸三聲ㄉㄨˇ，你自己的肚子才唸ㄉㄨˋ',
    tags: ['易讀錯', '破音字', '美食'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-051', text: '一語成讖', target: '讖', zhuyin: 'ㄔㄣˋ',
    distractors: ['ㄐㄧㄢ', 'ㄑㄧㄢˋ', 'ㄔㄣ'],
    meaning: '無意說的話竟然應驗',
    fun: '唸成「一語成ㄐㄧㄢ」的話，這句就真的一語成讖了',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-052', text: '拈花惹草', target: '拈', zhuyin: 'ㄋㄧㄢˊ',
    distractors: ['ㄓㄢ', 'ㄋㄧㄢ', 'ㄋㄧㄢˇ'],
    meaning: '比喻到處留情',
    fun: '字都唸不對，還想拈花惹草？',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-053', text: '揠苗助長', target: '揠', zhuyin: 'ㄧㄚˋ',
    distractors: ['ㄧㄢˋ', 'ㄅㄚˊ', 'ㄧㄚ'],
    meaning: '比喻急於求成反而壞事',
    fun: '唸成「拔苗助長」意思有到，但分數沒有到',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-054', text: '針砭', target: '砭', zhuyin: 'ㄅㄧㄢ',
    distractors: ['ㄅㄧㄢˇ', 'ㄈㄚˊ', 'ㄆㄧㄢ'],
    meaning: '用古代石針治病，引申為規勸批評',
    fun: '「針砭時弊」名嘴愛講，但十個有八個唸成「貶」',
    tags: ['易讀錯', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-055', text: '標識', target: '識', zhuyin: 'ㄓˋ',
    distractors: ['ㄕˋ', 'ㄓ', 'ㄗˋ'],
    meaning: '表明特徵的記號，同「標誌」',
    fun: '識別唸ㄕˋ，標識唸ㄓˋ，中文的隱藏關卡',
    tags: ['易讀錯', '破音字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-056', text: '強迫', target: '強', zhuyin: 'ㄑㄧㄤˇ',
    distractors: ['ㄑㄧㄤˊ', 'ㄑㄧㄤ', 'ㄐㄧㄤˇ'],
    meaning: '用壓力使人服從',
    fun: '三聲ㄑㄧㄤˇ迫。沒有人強迫你唸對，但分數會',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-057', text: '處理', target: '處', zhuyin: 'ㄔㄨˇ',
    distractors: ['ㄔㄨˋ', 'ㄔㄨ', 'ㄘㄨˇ'],
    meaning: '辦理、安排事情',
    fun: '動詞唸三聲ㄔㄨˇ，辦公處才唸ㄔㄨˋ。先處理一下自己的聲調',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-058', text: '因為', target: '為', zhuyin: 'ㄨㄟˋ',
    distractors: ['ㄨㄟˊ', 'ㄨㄟ', 'ㄨㄟˇ'],
    meaning: '表示原因的連接詞',
    fun: '教育部標準是因ㄨㄟˋ。因為你一直唸ㄨㄟˊ，所以這題出現了',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-059', text: '企業', target: '企', zhuyin: 'ㄑㄧˋ',
    distractors: ['ㄑㄧˇ', 'ㄑㄧ', 'ㄑㄧˊ'],
    meaning: '從事生產或營利的事業組織',
    fun: '對岸唸ㄑㄧˇ業，臺灣標準是ㄑㄧˋ業，聽發音就知道在哪上班',
    tags: ['易讀錯', '日常', '新聞常錯'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-060', text: '液體', target: '液', zhuyin: 'ㄧㄝˋ',
    distractors: ['ㄧˋ', 'ㄧㄝˇ', 'ㄧㄝˊ'],
    meaning: '像水一樣會流動的物質',
    fun: '自然課都教過：ㄧㄝˋ體。唸ㄧˋ體的同學請留下來補考',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-062', text: '蝙蝠', target: '蝙', zhuyin: 'ㄅㄧㄢ',
    distractors: ['ㄅㄧㄢˇ', 'ㄆㄧㄢ', 'ㄅㄧㄢˋ'],
    meaning: '夜間飛行的哺乳動物',
    fun: '一聲ㄅㄧㄢ蝠。蝙蝠俠都沒有你唸的那麼扁',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-063', text: '哺乳', target: '哺', zhuyin: 'ㄅㄨˇ',
    distractors: ['ㄅㄨˋ', 'ㄆㄨˇ', 'ㄅㄨ'],
    meaning: '餵食乳汁',
    fun: '我們都是哺乳類，但很多哺乳類唸不出自己的類別',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-064', text: '渲染', target: '渲', zhuyin: 'ㄒㄩㄢˋ',
    distractors: ['ㄒㄩㄢ', 'ㄒㄩㄢˇ', 'ㄒㄩㄢˊ'],
    meaning: '誇大鋪陳，或國畫的暈染技法',
    fun: '媒體最愛渲染，四聲ㄒㄩㄢˋ，渲染前先校音',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-065', text: '慫恿', target: '慫', zhuyin: 'ㄙㄨㄥˇ',
    distractors: ['ㄘㄨㄥˊ', 'ㄙㄨㄥ', 'ㄙㄨㄥˋ'],
    meaning: '在旁鼓動別人做事',
    fun: '朋友慫恿你唸ㄘㄨㄥˊ恿？別聽他的',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-066', text: '蛻變', target: '蛻', zhuyin: 'ㄊㄨㄟˋ',
    distractors: ['ㄕㄨㄟˋ', 'ㄉㄨㄟˋ', 'ㄕㄨㄟˇ'],
    meaning: '形體或性質徹底改變',
    fun: '簡編本「蛻」唸ㄊㄨㄟˋ，蛻變、蟬蛻都一樣，唸成ㄕㄨㄟˋ是常見錯誤',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-068', text: '千載難逢', target: '載', zhuyin: 'ㄗㄞˇ',
    distractors: ['ㄗㄞˋ', 'ㄗㄞ', 'ㄗㄞˊ'],
    meaning: '千年難遇，機會極為難得',
    fun: '「載」當年份唸三聲。唸對的機會不千載難逢，現在就有',
    tags: ['易讀錯', '成語', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-069', text: '引吭高歌', target: '吭', zhuyin: 'ㄏㄤˊ',
    distractors: ['ㄎㄤˋ', 'ㄎㄤ', 'ㄏㄥˊ'],
    meaning: '放開喉嚨大聲唱歌',
    fun: 'KTV 引吭高歌之前，先把「吭」唸對再開麥',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-070', text: '沆瀣一氣', target: '沆', zhuyin: 'ㄏㄤˋ',
    distractors: ['ㄎㄤˋ', 'ㄏㄤˊ', 'ㄏㄥˋ'],
    meaning: '氣味相投的人勾結在一起',
    fun: '罵人勾結的高級詞，唸錯瞬間降級成隨便罵罵',
    tags: ['易讀錯', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-071', text: '圭臬', target: '臬', zhuyin: 'ㄋㄧㄝˋ',
    distractors: ['ㄗˋ', 'ㄋㄧㄝ', 'ㄋㄧㄝˇ'],
    meaning: '準則、典範',
    fun: '奉為圭臬的「臬」不是「自」，看清楚再奉',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-072', text: '發酵', target: '酵', zhuyin: 'ㄒㄧㄠˋ',
    distractors: ['ㄐㄧㄠˋ', 'ㄒㄧㄠ', 'ㄑㄧㄠˋ'],
    meaning: '微生物分解有機物的過程',
    fun: '教育部標準是發ㄒㄧㄠˋ。麵包店老闆聽到正解，麵團都驚醒了',
    tags: ['易讀錯', '美食', '新聞常錯'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-073', text: '氣喘吁吁', target: '吁', zhuyin: 'ㄒㄩ',
    distractors: ['ㄩˊ', 'ㄒㄩˋ', 'ㄒㄩˇ'],
    meaning: '呼吸急促的樣子',
    fun: '跑完八百公尺氣喘ㄒㄩ ㄒㄩ，唸成ㄩˊ ㄩˊ會更喘',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-074', text: '按捺', target: '捺', zhuyin: 'ㄋㄚˋ',
    distractors: ['ㄋㄞˋ', 'ㄋㄚ', 'ㄋㄚˊ'],
    meaning: '壓抑、忍住',
    fun: '按捺不住想唸ㄋㄞˋ的衝動？捺住，是ㄋㄚˋ',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-075', text: '可汗', target: '汗', zhuyin: 'ㄏㄢˊ',
    distractors: ['ㄏㄢˋ', 'ㄏㄢ', 'ㄏㄢˇ'],
    meaning: '古代北方游牧民族的君主稱號',
    fun: 'ㄎㄜˋ ㄏㄢˊ。成吉思汗不會流汗，他是汗',
    tags: ['易讀錯', '破音字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-076', text: '女紅', target: '紅', zhuyin: 'ㄍㄨㄥ',
    distractors: ['ㄏㄨㄥˊ', 'ㄍㄨㄥˇ', 'ㄎㄨㄥ'],
    meaning: '縫紉刺繡等手工藝',
    fun: '女紅唸女ㄍㄨㄥ，跟顏色無關，古裝劇看再多也常唸錯',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-077', text: '單于', target: '單', zhuyin: 'ㄔㄢˊ',
    distractors: ['ㄉㄢ', 'ㄕㄢˋ', 'ㄔㄢˇ'],
    meaning: '古代匈奴君主的稱號',
    fun: '單于唸ㄔㄢˊ ㄩˊ，歷史課本裡最常被唸錯名字的人',
    tags: ['易讀錯', '破音字'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-078', text: '腳踝', target: '踝', zhuyin: 'ㄏㄨㄞˊ',
    distractors: ['ㄎㄜ', 'ㄍㄨㄛˇ', 'ㄏㄨㄞˇ'],
    meaning: '小腿與腳掌相連的關節部位',
    fun: '「腳ㄎㄜ」是親切的俗稱，考試請寫ㄏㄨㄞˊ',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-079', text: '膝蓋', target: '膝', zhuyin: 'ㄒㄧ',
    distractors: ['ㄑㄧ', 'ㄒㄧˊ', 'ㄒㄧˇ'],
    meaning: '大腿和小腿之間的關節',
    fun: '唸「ㄑㄧ蓋」的人，膝蓋中了一箭',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-080', text: '脊椎', target: '脊', zhuyin: 'ㄐㄧˇ',
    distractors: ['ㄐㄧˊ', 'ㄐㄧˋ', 'ㄑㄧˇ'],
    meaning: '背部中央的骨柱',
    fun: '三聲ㄐㄧˇ椎。坐姿不正會傷脊椎，聲調不正會傷分數',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-081', text: '殲滅', target: '殲', zhuyin: 'ㄐㄧㄢ',
    distractors: ['ㄑㄧㄢ', 'ㄒㄧㄢ', 'ㄐㄧㄢˋ'],
    meaning: '全部消滅',
    fun: '軍事新聞高頻字，一聲ㄐㄧㄢ，殲滅敵人前先殲滅錯音',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-082', text: '攻訐', target: '訐', zhuyin: 'ㄐㄧㄝˊ',
    distractors: ['ㄍㄢ', 'ㄐㄧㄝ', 'ㄑㄧㄝˊ'],
    meaning: '揭發攻擊別人的隱私或過失',
    fun: '政論節目天天互相攻訐，但「訐」唸對的來賓屈指可數',
    tags: ['易讀錯', '新聞常錯'], difficulty: 5, era: 'modern'
  },
  {
    id: 'tk-083', text: '抨擊', target: '抨', zhuyin: 'ㄆㄥ',
    distractors: ['ㄆㄧㄥˊ', 'ㄏㄥ', 'ㄅㄥ'],
    meaning: '用言論攻擊批評',
    fun: '新聞標題天天抨擊，唸成「評擊」的主播也該被抨擊',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-084', text: '砧板', target: '砧', zhuyin: 'ㄓㄣ',
    distractors: ['ㄓㄢ', 'ㄓㄣˇ', 'ㄓㄥ'],
    meaning: '切菜用的墊板',
    fun: '一聲ㄓㄣ板。人為刀俎我為魚肉，魚肉就躺在砧板上',
    tags: ['易讀錯', '美食', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-085', text: '給予', target: '給', zhuyin: 'ㄐㄧˇ',
    distractors: ['ㄍㄟˇ', 'ㄐㄧˋ', 'ㄑㄧˇ'],
    meaning: '提供、授與',
    fun: '書面語唸ㄐㄧˇ予。請給予唸錯的人一點掌聲和正確答案',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-086', text: '說服', target: '說', zhuyin: 'ㄕㄨㄟˋ',
    distractors: ['ㄕㄨㄛ', 'ㄕㄨㄟ', 'ㄕㄨㄟˇ'],
    meaning: '用言語使人聽從',
    fun: '教育部辭典唸ㄕㄨㄟˋ服。要說服別人之前，先被這個讀音說服',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-087', text: '棘手', target: '棘', zhuyin: 'ㄐㄧˊ',
    distractors: ['ㄌㄚˋ', 'ㄘˋ', 'ㄐㄧˇ'],
    meaning: '事情難處理',
    fun: '唸成「辣手」的話，問題會從棘手變辣手摧花',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-088', text: '屹立', target: '屹', zhuyin: 'ㄧˋ',
    distractors: ['ㄑㄧˇ', 'ㄨˋ', 'ㄧˇ'],
    meaning: '高聳直立、堅定不動搖',
    fun: '屹立不搖唸ㄧˋ，唸成ㄑㄧˇ立的話就站起來重唸',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-089', text: '迄今', target: '迄', zhuyin: 'ㄑㄧˋ',
    distractors: ['ㄧˋ', 'ㄑㄧˇ', 'ㄑㄧˊ'],
    meaning: '到現在為止',
    fun: '迄今為止，把迄唸對的人迄今仍是少數',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-090', text: '瑕疵', target: '疵', zhuyin: 'ㄘ',
    distractors: ['ㄘˊ', 'ㄗ', 'ㄘˇ'],
    meaning: '小缺點、小毛病',
    fun: '疵是一聲。把瑕疵唸成「瑕ㄘˊ」，就是發音上的瑕疵',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-091', text: '如火如荼', target: '荼', zhuyin: 'ㄊㄨˊ',
    distractors: ['ㄔㄚˊ', 'ㄕㄨ', 'ㄊㄨˇ'],
    meaning: '形容氣勢旺盛熱烈',
    fun: '荼比茶多一橫，唸「如火如茶」的話，火都被茶澆熄了',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-092', text: '鱗次櫛比', target: '比', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄅㄧˇ', 'ㄆㄧˊ', 'ㄅㄧ'],
    meaning: '像魚鱗和梳齒一樣緊密排列（比：並列，簡編本標ㄅㄧˋ）',
    fun: '櫛難唸大家有防備，反而是「比」唸ㄅㄧˋ沒人知道。出題就要出其不意',
    tags: ['易讀錯', '成語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-093', text: '樹蔭', target: '蔭', zhuyin: 'ㄧㄣˋ',
    distractors: ['ㄧㄣ', 'ㄧㄣˇ', 'ㄧㄥˋ'],
    meaning: '樹下陽光照不到的地方',
    fun: '教育部規定蔭一律唸四聲ㄧㄣˋ，夏天躲樹蔭前先記好',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-094', text: '蹂躪', target: '躪', zhuyin: 'ㄌㄧㄣˋ',
    distractors: ['ㄌㄢˊ', 'ㄌㄧㄣˊ', 'ㄌㄧㄣˇ'],
    meaning: '踐踏摧殘',
    fun: '新聞悲憤用字第一名，唸錯的話悲憤力道少一半',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-095', text: '毛骨悚然', target: '悚', zhuyin: 'ㄙㄨㄥˇ',
    distractors: ['ㄕㄨˋ', 'ㄙㄨㄥ', 'ㄙㄨㄥˋ'],
    meaning: '形容極度恐懼',
    fun: '鬼故事講到一半唸錯字，恐怖氣氛瞬間毛骨悚然變毛骨搔癢',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-096', text: '拘泥', target: '泥', zhuyin: 'ㄋㄧˋ',
    distractors: ['ㄋㄧˊ', 'ㄋㄧ', 'ㄋㄧˇ'],
    meaning: '固執不知變通',
    fun: '泥當動詞唸四聲。別拘泥於泥巴的唸法',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-097', text: '慰藉', target: '藉', zhuyin: 'ㄐㄧㄝˋ',
    distractors: ['ㄐㄧˊ', 'ㄐㄧㄝ', 'ㄑㄧㄝˋ'],
    meaning: '安慰',
    fun: '心靈的慰藉唸ㄐㄧㄝˋ，狼藉的藉才唸ㄐㄧˊ，安慰前先分清楚',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-098', text: '蒞臨', target: '蒞', zhuyin: 'ㄌㄧˋ',
    distractors: ['ㄨㄟˋ', 'ㄌㄧ', 'ㄌㄧˇ'],
    meaning: '來到、光臨（敬語）',
    fun: '歡迎長官蒞臨指導，司儀唸錯的話長官會蒞臨關切',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-099', text: '旋風', target: '旋', zhuyin: 'ㄒㄩㄢˋ',
    distractors: ['ㄒㄩㄢˊ', 'ㄒㄩㄢ', 'ㄒㄩㄢˇ'],
    meaning: '螺旋狀的強風',
    fun: '教育部標準是ㄒㄩㄢˋ風（四聲）。旋轉的旋才唸二聲',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-100', text: '復辟', target: '辟', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˋ', 'ㄅㄟˋ', 'ㄅㄧ'],
    meaning: '失位的君主重新掌權',
    fun: '辟 = 君主，唸ㄅㄧˋ。跟鞭辟入裡的ㄆㄧˋ不同，破音字大魔王',
    tags: ['易讀錯', '破音字', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-101', text: '提供', target: '供', zhuyin: 'ㄍㄨㄥ',
    distractors: ['ㄍㄨㄥˋ', 'ㄍㄨㄥˇ', 'ㄎㄨㄥ'],
    meaning: '供給、給予',
    fun: '提供唸一聲ㄍㄨㄥ，供品的供才唸四聲。本題免費提供正解',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-102', text: '烹飪', target: '飪', zhuyin: 'ㄖㄣˋ',
    distractors: ['ㄖㄣˊ', 'ㄋㄧㄢˇ', 'ㄖㄣˇ'],
    meaning: '煮食物、做菜',
    fun: '烹飪節目看一堆，飪唸四聲這件事節目沒教',
    tags: ['易讀錯', '美食'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-103', text: '微笑', target: '微', zhuyin: 'ㄨㄟˊ',
    distractors: ['ㄨㄟ', 'ㄨㄟˇ', 'ㄨㄟˋ'],
    meaning: '輕微地笑',
    fun: '教育部標準是二聲ㄨㄟˊ。聽到有人唸一聲，請保持微笑',
    tags: ['易讀錯', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-104', text: '帆船', target: '帆', zhuyin: 'ㄈㄢˊ',
    distractors: ['ㄈㄢ', 'ㄈㄢˇ', 'ㄈㄢˋ'],
    meaning: '靠風力航行的船',
    fun: '教育部辭典帆唸二聲ㄈㄢˊ，一路唸一聲的人風帆都歪了',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-105', text: '傾軋', target: '軋', zhuyin: 'ㄧㄚˋ',
    distractors: ['ㄓㄚˊ', 'ㄍㄚˊ', 'ㄧㄚ'],
    meaning: '互相排擠鬥爭',
    fun: '派系傾軋的軋唸ㄧㄚˋ，軋戲的軋才唸ㄍㄚˊ，演藝圈兩種都常見',
    tags: ['易讀錯', '破音字', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-106', text: '憧憬', target: '憧', zhuyin: 'ㄔㄨㄥ',
    distractors: ['ㄊㄨㄥˊ', 'ㄓㄨㄤˋ', 'ㄔㄨㄥˊ'],
    meaning: '對未來的嚮往',
    fun: '對未來充滿憧憬之前，先對聲調有點概念：一聲ㄔㄨㄥ',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-107', text: '彷彿', target: '彷', zhuyin: 'ㄈㄤˇ',
    distractors: ['ㄆㄤˊ', 'ㄈㄤ', 'ㄈㄤˊ'],
    meaning: '好像、似乎',
    fun: '彷彿唸ㄈㄤˇ，彷徨才唸ㄆㄤˊ，同一個字兩張臉',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-108', text: '僥倖', target: '僥', zhuyin: 'ㄐㄧㄠˇ',
    distractors: ['ㄧㄠˊ', 'ㄒㄧㄠˇ', 'ㄐㄧㄠ'],
    meaning: '意外獲得成功或免於災禍',
    fun: '這題用猜的猜對，就是僥倖的最佳示範',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-109', text: '補償', target: '償', zhuyin: 'ㄔㄤˊ',
    distractors: ['ㄕㄤˇ', 'ㄔㄤˇ', 'ㄔㄤ'],
    meaning: '彌補損失',
    fun: '償唸二聲ㄔㄤˊ，唸成「補賞」的話是要賞什麼',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-110', text: '桎梏', target: '梏', zhuyin: 'ㄍㄨˋ',
    distractors: ['ㄍㄠˋ', 'ㄎㄨˋ', 'ㄍㄨˇ'],
    meaning: '腳鐐手銬，比喻束縛',
    fun: '梏唸ㄍㄨˋ不唸ㄍㄠˋ，掙脫錯音的桎梏吧',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-111', text: '篡位', target: '篡', zhuyin: 'ㄘㄨㄢˋ',
    distractors: ['ㄙㄨㄢˋ', 'ㄗㄨㄢˋ', 'ㄘㄨㄢ'],
    meaning: '臣子奪取君位',
    fun: '歷史劇必備情節，唸成「算位」的話皇位用算的就好',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-112', text: '阻撓', target: '撓', zhuyin: 'ㄋㄠˊ',
    distractors: ['ㄖㄠˊ', 'ㄋㄠˇ', 'ㄋㄠ'],
    meaning: '暗中破壞、阻礙',
    fun: '撓唸ㄋㄠˊ。不屈不撓地唸錯成ㄖㄠˊ，也算一種堅持',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-113', text: '另闢蹊徑', target: '蹊', zhuyin: 'ㄒㄧ',
    distractors: ['ㄑㄧ', 'ㄒㄧˊ', 'ㄒㄧˇ'],
    meaning: '另外開創新的方法或途徑',
    fun: '蹊徑唸ㄒㄧ，蹊蹺唸ㄑㄧ，同一個字自己就另闢蹊徑',
    tags: ['易讀錯', '成語', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-114', text: '唾棄', target: '唾', zhuyin: 'ㄊㄨㄛˋ',
    distractors: ['ㄔㄨㄟˊ', 'ㄕㄨㄟˋ', 'ㄊㄨㄛ'],
    meaning: '鄙視厭惡',
    fun: '唾不是垂。被全民唾棄之前，先把字唸對',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-115', text: '針灸', target: '灸', zhuyin: 'ㄐㄧㄡˇ',
    distractors: ['ㄓˋ', 'ㄐㄧㄡˋ', 'ㄐㄧㄡ'],
    meaning: '用針刺和艾草燒灼治病的中醫療法',
    fun: '灸下面是火不是夕，跟「炙」是雙胞胎但不同人',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-116', text: '果實累累', target: '累', zhuyin: 'ㄌㄟˊ',
    distractors: ['ㄌㄟˇ', 'ㄌㄟˋ', 'ㄌㄟ'],
    meaning: '果實成串繁多的樣子',
    fun: '結果用的累唸ㄌㄟˊ。果樹結果結到很累？那是你',
    tags: ['易讀錯', '破音字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-117', text: '屏息', target: '屏', zhuyin: 'ㄅㄧㄥˇ',
    distractors: ['ㄆㄧㄥˊ', 'ㄅㄧㄥˊ', 'ㄆㄧㄥˇ'],
    meaning: '忍住呼吸，形容專注或緊張',
    fun: '屏息的屏唸ㄅㄧㄥˇ，跟螢幕的屏不同掛',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-118', text: '心肌梗塞', target: '塞', zhuyin: 'ㄙㄜˋ',
    distractors: ['ㄙㄞ', 'ㄙㄞˋ', 'ㄙㄜ'],
    meaning: '心臟血管阻塞的急症',
    fun: '梗塞唸ㄙㄜˋ。聽到有人唸ㄙㄞ，醫生內心也會小小梗塞',
    tags: ['易讀錯', '破音字', '新聞常錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-119', text: '柵欄', target: '柵', zhuyin: 'ㄓㄚˋ',
    distractors: ['ㄕㄢ', 'ㄘㄜˋ', 'ㄓㄚ'],
    meaning: '用木條或鐵條做的圍欄',
    fun: '柵唸ㄓㄚˋ，木柵動物園的動物都知道',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-120', text: '堤防', target: '堤', zhuyin: 'ㄊㄧˊ',
    distractors: ['ㄉㄧ', 'ㄉㄧˊ', 'ㄊㄧˇ'],
    meaning: '防水患的土石建築',
    fun: '臺灣標準唸ㄊㄧˊ防，唸ㄉㄧ的是對岸用法，河堤本人沒有意見',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-121', text: '懲罰', target: '懲', zhuyin: 'ㄔㄥˊ',
    distractors: ['ㄔㄥˇ', 'ㄔㄥˋ', 'ㄔㄣˊ'],
    meaning: '處罰',
    fun: '懲是二聲。唸三聲的人，懲罰就是再唸十次',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-122', text: '熨斗', target: '熨', zhuyin: 'ㄩㄣˋ',
    distractors: ['ㄨㄟˋ', 'ㄩㄣ', 'ㄩㄣˊ'],
    meaning: '燙平衣服的器具',
    fun: '熨斗唸ㄩㄣˋ斗。衣服燙得平整，讀音也請燙平',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-123', text: '喝采', target: '喝', zhuyin: 'ㄏㄜˋ',
    distractors: ['ㄏㄜ', 'ㄏㄜˊ', 'ㄏㄜˇ'],
    meaning: '大聲叫好稱讚',
    fun: '喝采的喝唸四聲，不是喝飲料的喝，為唸對的人喝采',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-124', text: '恐嚇', target: '嚇', zhuyin: 'ㄏㄜˋ',
    distractors: ['ㄒㄧㄚˋ', 'ㄏㄜˊ', 'ㄏㄜ'],
    meaning: '用言語威脅人',
    fun: '恐嚇唸ㄏㄜˋ，嚇人才唸ㄒㄧㄚˋ。社會新聞每天免費教學',
    tags: ['易讀錯', '破音字', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-125', text: '酗酒', target: '酗', zhuyin: 'ㄒㄩˋ',
    distractors: ['ㄒㄩㄥ', 'ㄒㄩ', 'ㄒㄩˇ'],
    meaning: '無節制地喝酒',
    fun: '酗唸ㄒㄩˋ不是「兇」，雖然酗酒的人常常很兇',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-126', text: '不屑', target: '屑', zhuyin: 'ㄒㄧㄝˋ',
    distractors: ['ㄒㄩㄝˋ', 'ㄒㄧㄝ', 'ㄒㄧㄝˇ'],
    meaning: '輕視、認為不值得',
    fun: '屑唸ㄒㄧㄝˋ。對正確讀音不屑一顧的人，分數也對你不屑一顧',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-127', text: '邋遢', target: '邋', zhuyin: 'ㄌㄚ',
    distractors: ['ㄌㄚˊ', 'ㄌㄧㄝˋ', 'ㄌㄚˇ'],
    meaning: '不整潔、不修邊幅',
    fun: '簡編本「邋」唸一聲ㄌㄚ，很多人唸成二聲ㄌㄚˊ其實不對',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-128', text: '一決雌雄', target: '雌', zhuyin: 'ㄘ',
    distractors: ['ㄘˊ', 'ㄗ', 'ㄘˋ'],
    meaning: '比出勝負高下',
    fun: '雌是一聲。對決前先把字唸對，不然先輸一半',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-129', text: '栩栩如生', target: '栩', zhuyin: 'ㄒㄩˇ',
    distractors: ['ㄩˇ', 'ㄒㄧㄤˇ', 'ㄒㄩˋ'],
    meaning: '形容生動逼真',
    fun: '畫得栩栩如生，唸得糊糊不清，可惜了',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-130', text: '胼手胝足', target: '胝', zhuyin: 'ㄓ',
    distractors: ['ㄉㄧˇ', 'ㄓˇ', 'ㄓˋ'],
    meaning: '手腳長繭，形容辛勤勞動',
    fun: '胝唸ㄓ（一聲），長輩胼手胝足打拚，我們至少把字唸對',
    tags: ['易讀錯', '成語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-131', text: '暴露', target: '露', zhuyin: 'ㄌㄨˋ',
    distractors: ['ㄌㄡˋ', 'ㄌㄨˇ', 'ㄌㄨ'],
    meaning: '顯露出來，無所遮蔽',
    fun: '暴露唸ㄌㄨˋ，露臉才唸ㄌㄡˋ，唸錯瞬間暴露國文程度',
    tags: ['易讀錯', '破音字'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-132', text: '蠻橫', target: '橫', zhuyin: 'ㄏㄥˋ',
    distractors: ['ㄏㄥˊ', 'ㄏㄥˇ', 'ㄏㄣˋ'],
    meaning: '粗暴不講理',
    fun: '不講理的橫唸四聲，連讀音都很橫',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-133', text: '字帖', target: '帖', zhuyin: 'ㄊㄧㄝˇ',
    distractors: ['ㄊㄧㄝˋ', 'ㄊㄧㄝ', 'ㄊㄧㄝˊ'],
    meaning: '供臨摹的書法範本',
    fun: '字帖、請帖、碑帖的帖都唸三聲ㄊㄧㄝˇ，只有俯首帖耳才唸輕聲',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-134', text: '笨拙', target: '拙', zhuyin: 'ㄓㄨㄛˊ',
    distractors: ['ㄓㄨㄛ', 'ㄔㄨ', 'ㄓㄨㄛˇ'],
    meaning: '遲鈍不靈巧',
    fun: '臺灣標準唸二聲ㄓㄨㄛˊ，唸一聲的是對岸腔，別笨拙地搞混',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-135', text: '不容置喙', target: '喙', zhuyin: 'ㄏㄨㄟˋ',
    distractors: ['ㄓㄨㄛˊ', 'ㄗㄨㄟˇ', 'ㄏㄨㄟˊ'],
    meaning: '不容許別人插嘴',
    fun: '喙是鳥嘴，唸ㄏㄨㄟˋ。唸錯的人，本題不容置喙',
    tags: ['易讀錯', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-136', text: '鞠躬盡瘁', target: '瘁', zhuyin: 'ㄘㄨㄟˋ',
    distractors: ['ㄗㄨˊ', 'ㄙㄨㄟˋ', 'ㄘㄨㄟˇ'],
    meaning: '竭盡心力，不辭勞苦',
    fun: '諸葛亮鞠躬盡瘁，你至少把瘁唸成ㄘㄨㄟˋ',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-137', text: '人才濟濟', target: '濟', zhuyin: 'ㄐㄧˇ',
    distractors: ['ㄐㄧˋ', 'ㄐㄧˊ', 'ㄑㄧˇ'],
    meaning: '形容人才眾多',
    fun: '濟濟唸三聲。公司人才濟濟，唸對的卻寥寥無幾',
    tags: ['易讀錯', '成語', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-138', text: '詬病', target: '詬', zhuyin: 'ㄍㄡˋ',
    distractors: ['ㄏㄡˋ', 'ㄍㄡ', 'ㄍㄡˇ'],
    meaning: '指責、批評',
    fun: '為人詬病的詬唸ㄍㄡˋ，唸錯這件事最為人詬病',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-139', text: '證券', target: '券', zhuyin: 'ㄑㄩㄢˋ',
    distractors: ['ㄐㄩㄢˋ', 'ㄑㄩㄢˊ', 'ㄑㄩㄢˇ'],
    meaning: '股票、債券等有價憑證',
    fun: '券唸ㄑㄩㄢˋ。把證券唸成證「倦」的股民，看盤確實很倦',
    tags: ['易讀錯', '日常', '新聞常錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-140', text: '鼾聲', target: '鼾', zhuyin: 'ㄏㄢ',
    distractors: ['ㄏㄢˊ', 'ㄍㄢ', 'ㄏㄢˇ'],
    meaning: '打呼的聲音',
    fun: '鼾是一聲，打呼的人不知道，旁邊睡不著的人最清楚',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-141', text: '雪茄', target: '茄', zhuyin: 'ㄐㄧㄚ',
    distractors: ['ㄑㄧㄝˊ', 'ㄐㄧㄚˊ', 'ㄑㄧㄚ'],
    meaning: '菸草捲成的粗菸',
    fun: '雪茄的茄唸ㄐㄧㄚ，茄子的茄才唸ㄑㄧㄝˊ，一個字菸蔬兩棲',
    tags: ['易讀錯', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-142', text: '油炸', target: '炸', zhuyin: 'ㄓㄚˊ',
    distractors: ['ㄓㄚˋ', 'ㄓㄚ', 'ㄓㄚˇ'],
    meaning: '把食物放入熱油中烹煮',
    fun: '炸雞的炸唸二聲ㄓㄚˊ，炸彈才唸四聲，雞排店不會爆炸',
    tags: ['易讀錯', '破音字', '美食'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-143', text: '牙齦', target: '齦', zhuyin: 'ㄧㄣˊ',
    distractors: ['ㄎㄣˇ', 'ㄧㄣˇ', 'ㄧㄣ'],
    meaning: '包圍牙齒根部的肉',
    fun: '齦唸ㄧㄣˊ。刷牙流血要看醫生，唸錯要看這題',
    tags: ['易讀錯', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-144', text: '篩檢', target: '篩', zhuyin: 'ㄕㄞ',
    distractors: ['ㄕㄨㄞ', 'ㄕㄞˇ', 'ㄕㄞˊ'],
    meaning: '過濾檢查，找出異常者',
    fun: '疫情期間天天聽的詞，篩是一聲，快篩自己的發音',
    tags: ['易讀錯', '新聞常錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-145', text: '蟄伏', target: '蟄', zhuyin: 'ㄓˊ',
    distractors: ['ㄓㄜˊ', 'ㄓㄜˋ', 'ㄓˇ'],
    meaning: '動物冬眠，比喻隱居不出',
    fun: '臺灣標準唸ㄓˊ伏。蟄伏多年的高手，出場第一句先唸對',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-146', text: '豌豆', target: '豌', zhuyin: 'ㄨㄢ',
    distractors: ['ㄨㄢˇ', 'ㄨㄢˊ', 'ㄨㄢˋ'],
    meaning: '豆科蔬菜，種子圓綠',
    fun: '豌是一聲。植物大戰殭屍的主力，名字常被唸成三聲',
    tags: ['易讀錯', '美食'], difficulty: 1, era: 'modern'
  },
  {
    id: 'tk-147', text: '應屆', target: '應', zhuyin: 'ㄧㄥ',
    distractors: ['ㄧㄥˋ', 'ㄧㄥˊ', 'ㄧㄣ'],
    meaning: '本期、當年度的（畢業生）',
    fun: '應屆的應是一聲。應屆畢業生面試前，先把自己的身分唸對',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'tk-148', text: '暈車', target: '暈', zhuyin: 'ㄩㄣ',
    distractors: ['ㄩㄣˋ', 'ㄩㄣˊ', 'ㄩㄣˇ'],
    meaning: '搭車時頭昏想吐',
    fun: '暈車的暈是一聲，唸到頭暈也是一聲',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-149', text: '莞爾', target: '莞', zhuyin: 'ㄨㄢˇ',
    distractors: ['ㄍㄨㄢˇ', 'ㄨㄢˊ', 'ㄨㄢˋ'],
    meaning: '微笑的樣子',
    fun: '莞爾一笑唸ㄨㄢˇ，唸成ㄍㄨㄢˇ的話對方就笑不出來了',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-150', text: '滂沱', target: '滂', zhuyin: 'ㄆㄤ',
    distractors: ['ㄆㄤˊ', 'ㄅㄤˋ', 'ㄆㄤˇ'],
    meaning: '雨下得很大的樣子',
    fun: '大雨滂沱的滂是一聲，雨很大，聲調不用跟著加重',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-151', text: '囫圇吞棗', target: '圇', zhuyin: 'ㄌㄨㄣˊ',
    distractors: ['ㄌㄨㄣˋ', 'ㄌㄨㄣ', 'ㄌㄨㄣˇ'],
    meaning: '不加咀嚼消化，比喻學習不求理解',
    fun: '讀書囫圇吞棗的人，這個成語也常常囫圇吞掉',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-152', text: '氣餒', target: '餒', zhuyin: 'ㄋㄟˇ',
    distractors: ['ㄋㄟˊ', 'ㄊㄨㄛˇ', 'ㄋㄟˋ'],
    meaning: '失去信心和勇氣',
    fun: '答錯不要氣餒，至少現在知道餒唸三聲了',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-153', text: '揣測', target: '揣', zhuyin: 'ㄔㄨㄞˇ',
    distractors: ['ㄔㄨㄢˇ', 'ㄉㄨㄢ', 'ㄔㄨㄞˊ'],
    meaning: '猜想、推測',
    fun: '不用揣測了，就是ㄔㄨㄞˇ',
    tags: ['易讀錯', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-154', text: '矗立', target: '矗', zhuyin: 'ㄔㄨˋ',
    distractors: ['ㄓㄨˊ', 'ㄒㄩˋ', 'ㄔㄨˇ'],
    meaning: '高聳直立',
    fun: '三個直疊在一起唸ㄔㄨˋ，101 矗立在那裡等你唸對',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-155', text: '搖曳', target: '曳', zhuyin: 'ㄧˋ',
    distractors: ['ㄧㄝˋ', 'ㄓㄨㄞˋ', 'ㄧˇ'],
    meaning: '輕輕擺動',
    fun: '燭光搖曳的曳唸ㄧˋ，唸ㄧㄝˋ的火都被吹熄了',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-156', text: '木訥', target: '訥', zhuyin: 'ㄋㄜˋ',
    distractors: ['ㄋㄚˋ', 'ㄋㄟˋ', 'ㄋㄜ'],
    meaning: '樸實遲鈍，不善言辭',
    fun: '木訥的人話少，至少把僅有的「訥」唸對',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-157', text: '訃聞', target: '訃', zhuyin: 'ㄈㄨˋ',
    distractors: ['ㄅㄨˇ', 'ㄆㄨ', 'ㄈㄨˇ'],
    meaning: '報喪的通知',
    fun: '訃唸ㄈㄨˋ，這種場合唸錯特別失禮，先學起來',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-158', text: '簇擁', target: '簇', zhuyin: 'ㄘㄨˋ',
    distractors: ['ㄗㄨˊ', 'ㄘㄨˊ', 'ㄘㄨˇ'],
    meaning: '許多人緊緊圍著',
    fun: '明星被粉絲簇擁，簇唸ㄘㄨˋ，尖叫前先唸對',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-159', text: '躊躇', target: '躇', zhuyin: 'ㄔㄨˊ',
    distractors: ['ㄓㄨˋ', 'ㄓㄜ', 'ㄔㄨˇ'],
    meaning: '猶豫不決',
    fun: '別躊躇了，躇就唸ㄔㄨˊ，選下去',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-160', text: '鳥瞰', target: '瞰', zhuyin: 'ㄎㄢˋ',
    distractors: ['ㄍㄢˇ', 'ㄏㄢˋ', 'ㄎㄢˇ'],
    meaning: '從高處往下看',
    fun: '無人機鳥瞰全景，瞰唸ㄎㄢˋ，跟看同音真是謝天謝地',
    tags: ['易讀錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-161', text: '萬籟俱寂', target: '籟', zhuyin: 'ㄌㄞˋ',
    distractors: ['ㄌㄞˊ', 'ㄙㄨˋ', 'ㄌㄞˇ'],
    meaning: '形容四周非常寂靜',
    fun: '萬籟俱寂的深夜，只剩你唸錯的聲音特別響',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-162', text: '噤聲', target: '噤', zhuyin: 'ㄐㄧㄣˋ',
    distractors: ['ㄐㄧㄣ', 'ㄑㄧㄣˊ', 'ㄐㄧㄣˇ'],
    meaning: '閉口不出聲',
    fun: '噤唸四聲。要別人噤聲之前，自己先發對聲',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-163', text: '編纂', target: '纂', zhuyin: 'ㄗㄨㄢˇ',
    distractors: ['ㄘㄨㄢˋ', 'ㄗㄨㄢ', 'ㄗㄨㄢˊ'],
    meaning: '蒐集資料編輯成書',
    fun: '纂唸ㄗㄨㄢˇ，跟篡位的篡長得像，一個編書一個搶皇位',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-164', text: '泥淖', target: '淖', zhuyin: 'ㄋㄠˋ',
    distractors: ['ㄓㄠˇ', 'ㄔㄨㄛˋ', 'ㄋㄠˇ'],
    meaning: '爛泥地，比喻困境',
    fun: '淖唸ㄋㄠˋ不是「沼」，陷入泥淖前先認清楚字',
    tags: ['易讀錯', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-165', text: '摒棄', target: '摒', zhuyin: 'ㄅㄧㄥˋ',
    distractors: ['ㄆㄧㄥˊ', 'ㄅㄧㄥˇ', 'ㄅㄧㄥ'],
    meaning: '拋棄、排除',
    fun: '摒棄成見，順便摒棄錯誤讀音，一次清兩樣',
    tags: ['易讀錯', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-166', text: '慟哭', target: '慟', zhuyin: 'ㄊㄨㄥˋ',
    distractors: ['ㄉㄨㄥˋ', 'ㄊㄨㄥ', 'ㄊㄨㄥˊ'],
    meaning: '極度悲傷地大哭',
    fun: '慟唸ㄊㄨㄥˋ，比痛還痛的哭法',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-167', text: '字斟句酌', target: '斟', zhuyin: 'ㄓㄣ',
    distractors: ['ㄕㄣˋ', 'ㄎㄢ', 'ㄓㄣˋ'],
    meaning: '逐字逐句仔細推敲',
    fun: '寫作字斟句酌的人，唸字也請斟酌一下聲調',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-168', text: '脛骨', target: '脛', zhuyin: 'ㄐㄧㄥˋ',
    distractors: ['ㄐㄧㄥ', 'ㄎㄥ', 'ㄐㄧㄥˇ'],
    meaning: '小腿前側的長骨',
    fun: '不脛而走的脛就是這個，小腿骨唸四聲',
    tags: ['易讀錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-169', text: '畏葸不前', target: '葸', zhuyin: 'ㄒㄧˇ',
    distractors: ['ㄙ', 'ㄒㄧ', 'ㄒㄧˋ'],
    meaning: '畏懼怯懦，不敢前進',
    fun: '葸唸ㄒㄧˇ。看到這個字就畏葸不前的話，正中出題者下懷',
    tags: ['易讀錯', '成語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-170', text: '踽踽獨行', target: '踽', zhuyin: 'ㄐㄩˇ',
    distractors: ['ㄩˇ', 'ㄑㄩˇ', 'ㄐㄩˋ'],
    meaning: '孤單一人走路',
    fun: '踽踽獨行已經夠孤單了，別讓正確讀音也孤單',
    tags: ['易讀錯', '成語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-171', text: '罷黜', target: '黜', zhuyin: 'ㄔㄨˋ',
    distractors: ['ㄓㄨㄛˊ', 'ㄑㄩ', 'ㄔㄨˇ'],
    meaning: '革除官職、廢除',
    fun: '罷黜百家的黜唸ㄔㄨˋ，唸錯的讀音先被罷黜',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-172', text: '便給', target: '給', zhuyin: 'ㄐㄧˇ',
    distractors: ['ㄍㄟˇ', 'ㄐㄧˋ', 'ㄑㄧˇ'],
    meaning: '口才敏捷',
    fun: '口才便給的給唸ㄐㄧˇ，連便都唸ㄆㄧㄢˊ，整題都是陷阱',
    tags: ['易讀錯', '破音字'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-173', text: '創傷', target: '創', zhuyin: 'ㄔㄨㄤ',
    distractors: ['ㄔㄨㄤˋ', 'ㄔㄨㄤˊ', 'ㄔㄨㄤˇ'],
    meaning: '身體或心理受的傷害',
    fun: '創傷的創是一聲，創意的創才是四聲，受傷不用太用力',
    tags: ['易讀錯', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-174', text: '勉強', target: '強', zhuyin: 'ㄑㄧㄤˇ',
    distractors: ['ㄑㄧㄤˊ', 'ㄑㄧㄤˋ', 'ㄐㄧㄤˇ'],
    meaning: '能力不足而盡力去做，或迫使人做不願意的事',
    fun: '勉強的強唸三聲，唸二聲的話就很勉強',
    tags: ['易讀錯', '破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-175', text: '傴僂', target: '傴', zhuyin: 'ㄩˇ',
    distractors: ['ㄡˇ', 'ㄑㄩ', 'ㄩˋ'],
    meaning: '背部彎曲、駝背',
    fun: '傴唸ㄩˇ，跟佝僂的僂湊成一對駝背兄弟',
    tags: ['易讀錯'], difficulty: 5, era: 'classic'
  },
  {
    id: 'tk-176', text: '粗糙', target: '糙', zhuyin: 'ㄘㄠ',
    distractors: ['ㄗㄠ', 'ㄘㄠˋ', 'ㄘㄠˇ'],
    meaning: '不光滑、不精細',
    fun: '糙是一聲ㄘㄠ。皮膚可以粗糙，發音不行',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-177', text: '倉皇', target: '倉', zhuyin: 'ㄘㄤ',
    distractors: ['ㄔㄤ', 'ㄘㄤˊ', 'ㄘㄤˇ'],
    meaning: '匆忙慌張的樣子',
    fun: '倉皇逃跑也要唸對倉，不然連發音都很倉皇',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-178', text: '粗獷豪邁', target: '邁', zhuyin: 'ㄇㄞˋ',
    distractors: ['ㄨㄢˋ', 'ㄇㄞˇ', 'ㄇㄞˊ'],
    meaning: '豪放不拘小節',
    fun: '邁唸ㄇㄞˋ，看成萬的人請邁開腳步去重修',
    tags: ['易讀錯'], difficulty: 1, era: 'classic'
  },
  {
    id: 'tk-179', text: '梔子花', target: '梔', zhuyin: 'ㄓ',
    distractors: ['ㄨㄟˊ', 'ㄗ', 'ㄓˋ'],
    meaning: '初夏開白花的香花植物，常入歌入詩',
    fun: '跟桅杆的桅長超像，但人家是香的，桅杆是鹹的',
    tags: ['易讀錯', '植物'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-180', text: '俄羅斯', target: '俄', zhuyin: 'ㄜˊ',
    distractors: ['ㄛˊ', 'ㄜ', 'ㄜˋ'],
    meaning: '橫跨歐亞的世界第一大國',
    fun: '俄唸ㄜˊ，跟「鵝」同音，不是ㄛˊ。北極熊聽了會點頭',
    tags: ['易讀錯', '地理'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-181', text: '訛詐', target: '訛', zhuyin: 'ㄜˊ',
    distractors: ['ㄏㄨㄚˋ', 'ㄛˊ', 'ㄜˋ'],
    meaning: '用詐術或威脅手段騙取財物',
    fun: '訛唸ㄜˊ，別被右邊的「化」帶歪，唸ㄏㄨㄚˋ才是被訛了',
    tags: ['易讀錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-182', text: '法國', target: '法', zhuyin: 'ㄈㄚˇ',
    distractors: ['ㄈㄚˋ', 'ㄈㄚ', 'ㄈㄢˇ'],
    meaning: '西歐國家，首都巴黎',
    fun: '老一輩愛唸ㄈㄚˋ國，但辭典只收ㄈㄚˇ，艾菲爾鐵塔表示無奈',
    tags: ['易讀錯', '地理'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-183', text: '荒謬', target: '謬', zhuyin: 'ㄇㄧㄡˋ',
    distractors: ['ㄌㄧㄠˋ', 'ㄇㄧㄠˋ', 'ㄇㄡˋ'],
    meaning: '荒唐錯誤、不合常理',
    fun: '謬唸ㄇㄧㄡˋ，唸成ㄌㄧㄠˋ才真的很荒謬',
    tags: ['易讀錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-184', text: '兌換', target: '兌', zhuyin: 'ㄉㄨㄟˋ',
    distractors: ['ㄩㄝˋ', 'ㄊㄨㄟˋ', 'ㄉㄨㄟ'],
    meaning: '把一種貨幣換成另一種，或憑券換物',
    fun: '兌唸ㄉㄨㄟˋ，跟「對」同音；唸成ㄩㄝˋ的話銀行不收',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-185', text: '證券', target: '券', zhuyin: 'ㄑㄩㄢˋ',
    distractors: ['ㄐㄩㄢˋ', 'ㄑㄩㄢˊ', 'ㄐㄩㄢ'],
    meaning: '股票、債券等可買賣的有價憑證',
    fun: '券唸ㄑㄩㄢˋ不是ㄐㄩㄢˋ，唸錯的人股票也容易買錯',
    tags: ['易讀錯', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'tk-186', text: '噬臍莫及', target: '臍', zhuyin: 'ㄑㄧˊ',
    distractors: ['ㄒㄧˊ', 'ㄑㄧ', 'ㄐㄧˋ'],
    meaning: '比喻後悔已晚、來不及了',
    fun: '臍就是肚臍的臍，唸ㄑㄧˊ。咬不到自己肚臍，所以後悔莫及',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-187', text: '股肱大臣', target: '股', zhuyin: 'ㄍㄨˇ',
    distractors: ['ㄍㄨ', 'ㄎㄨˇ', 'ㄍㄨˋ'],
    meaning: '輔佐國君的得力大臣（股是大腿、肱是手臂）',
    fun: '股唸ㄍㄨˇ，跟大腿同義。皇帝的左右手，唸錯就降級',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-188', text: '胯下之辱', target: '胯', zhuyin: 'ㄎㄨㄚˋ',
    distractors: ['ㄎㄨㄚ', 'ㄎㄨˇ', 'ㄍㄨㄚˋ'],
    meaning: '從別人胯下鑽過的屈辱，韓信的故事',
    fun: '胯唸ㄎㄨㄚˋ，腰側到大腿那段。韓信忍得了，你的注音也要忍住',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-189', text: '趾高氣揚', target: '趾', zhuyin: 'ㄓˇ',
    distractors: ['ㄔˇ', 'ㄓ', 'ㄓˋ'],
    meaning: '走路腳抬得很高、神氣得意的樣子',
    fun: '趾是腳趾的趾，唸ㄓˇ。別跟「齒」搞混，那是嘴裡的',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'tk-190', text: '摩肩擦踵', target: '踵', zhuyin: 'ㄓㄨㄥˇ',
    distractors: ['ㄔㄨㄥˊ', 'ㄓㄨㄥ', 'ㄓㄨㄥˋ'],
    meaning: '形容人多擁擠，肩碰肩、腳碰腳',
    fun: '踵是腳後跟，唸ㄓㄨㄥˇ。人擠到後腳跟都被踩，注音可別也被踩錯',
    tags: ['易讀錯', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'tk-191', text: '放浪形骸', target: '骸', zhuyin: 'ㄏㄞˊ',
    distractors: ['ㄏㄞˋ', 'ㄏㄢˊ', 'ㄎㄞˊ'],
    meaning: '行為放縱不受約束、不拘形式禮節',
    fun: '骸唸ㄏㄞˊ，指身體軀殼。放浪形骸可以，放浪注音不行',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-192', text: '貯存糧食', target: '貯', zhuyin: 'ㄓㄨˇ',
    distractors: ['ㄔㄨˇ', 'ㄔㄨˊ', 'ㄘㄨˊ'],
    meaning: '儲藏存放',
    fun: '貯唸ㄓㄨˇ不是ㄔㄨˇ！跟儲（ㄔㄨˊ）是不同字，倉庫分得很清楚',
    tags: ['易讀錯', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'tk-193', text: '一招撂倒', target: '撂', zhuyin: 'ㄌㄧㄠˋ',
    distractors: ['ㄌㄠˋ', 'ㄌㄨㄛˋ', 'ㄍㄜ'],
    meaning: '摔放、弄倒；撂倒指把人打倒在地',
    fun: '撂唸ㄌㄧㄠˋ。柔道課學會撂倒對手之前，先把這個音撂穩',
    tags: ['易讀錯', '日常'], difficulty: 3, era: 'modern'
  }
];
