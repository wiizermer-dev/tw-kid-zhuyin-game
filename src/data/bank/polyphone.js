/**
 * 破音字 — 同一個字，換個詞就換個音
 * schema 同 tricky.js
 */
export default [
  {
    id: 'pp-001', text: '數見不鮮', target: '數', zhuyin: 'ㄕㄨㄛˋ',
    distractors: ['ㄕㄨˋ', 'ㄕㄨˇ', 'ㄕㄨㄛ'],
    meaning: '經常見到，不覺得新奇',
    fun: '「數」唸ㄕㄨㄛˋ是「屢次」的意思，這題在大考出現的頻率也是數見不鮮',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-002', text: '鮮為人知', target: '鮮', zhuyin: 'ㄒㄧㄢˇ',
    distractors: ['ㄒㄧㄢ', 'ㄒㄧㄢˋ', 'ㄒㄧㄣˇ'],
    meaning: '很少有人知道',
    fun: '鮮 = 少。這個讀音本身就鮮為人知',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-003', text: '強人所難', target: '強', zhuyin: 'ㄑㄧㄤˇ',
    distractors: ['ㄑㄧㄤˊ', 'ㄐㄧㄤˋ', 'ㄑㄧㄤ'],
    meaning: '勉強別人做不願意的事',
    fun: '強迫的強是三聲，不會唸也不能強人所難…但這題還是要答',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-004', text: '載歌載舞', target: '載', zhuyin: 'ㄗㄞˋ',
    distractors: ['ㄗㄞˇ', 'ㄗㄞ', 'ㄗㄟˋ'],
    meaning: '又唱歌又跳舞，非常歡樂',
    fun: '這裡的載是「又、且」。跨年晚會的標準狀態',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-005', text: '一年半載', target: '載', zhuyin: 'ㄗㄞˇ',
    distractors: ['ㄗㄞˋ', 'ㄗㄞ', 'ㄗㄟˇ'],
    meaning: '半年到一年的時間',
    fun: '載 = 年的時候唸三聲。「三年五載」也是',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-006', text: '自怨自艾', target: '艾', zhuyin: 'ㄧˋ',
    distractors: ['ㄞˋ', 'ㄧˇ', 'ㄧ'],
    meaning: '悔恨自己的過錯',
    fun: '艾在這裡是「改正」。唸成ㄞˋ的人才需要自怨自艾',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-007', text: '方興未艾', target: '艾', zhuyin: 'ㄞˋ',
    distractors: ['ㄧˋ', 'ㄞˇ', 'ㄟˋ'],
    meaning: '正在發展，尚未停止',
    fun: '這裡的艾是「停止」，唸回ㄞˋ。同一個字兩種唸法，AI 都要混亂了',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-008', text: '乳臭未乾', target: '臭', zhuyin: 'ㄒㄧㄡˋ',
    distractors: ['ㄔㄡˋ', 'ㄒㄧㄡˇ', 'ㄒㄧㄡ'],
    meaning: '譏笑人年幼無知',
    fun: '臭唸ㄒㄧㄡˋ是「氣味」。罵人之前先把字唸對，不然會被反殺',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-009', text: '咀嚼', target: '嚼', zhuyin: 'ㄐㄩㄝˊ',
    distractors: ['ㄐㄧㄠˊ', 'ㄐㄩㄝˇ', 'ㄑㄩㄝˊ'],
    meaning: '用牙齒磨碎食物，也指反覆體會',
    fun: '單獨嚼東西唸ㄐㄧㄠˊ，咀嚼唸ㄐㄩㄝˊ。口香糖表示困惑',
    tags: ['破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-010', text: '丟三落四', target: '落', zhuyin: 'ㄌㄚˋ',
    distractors: ['ㄌㄨㄛˋ', 'ㄌㄠˋ', 'ㄌㄚ'],
    meaning: '形容粗心健忘',
    fun: '落唸ㄌㄚˋ是「遺漏」。出門忘帶悠遊卡的你，專屬讀音',
    tags: ['破音字', '成語', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-011', text: '落枕', target: '落', zhuyin: 'ㄌㄠˋ',
    distractors: ['ㄌㄨㄛˋ', 'ㄌㄚˋ', 'ㄌㄠˇ'],
    meaning: '睡姿不良造成脖子痠痛',
    fun: '落枕唸ㄌㄠˋ。脖子已經很痛了，讀音不要再錯',
    tags: ['破音字', '日常'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-012', text: '便宜行事', target: '便', zhuyin: 'ㄅㄧㄢˋ',
    distractors: ['ㄆㄧㄢˊ', 'ㄅㄧㄢˇ', 'ㄅㄧㄢ'],
    meaning: '視情況自行斟酌處理',
    fun: '跟「便宜貨」無關！這裡是方便的便。公文常見，唸錯會被科長糾正',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-013', text: '會計', target: '會', zhuyin: 'ㄎㄨㄞˋ',
    distractors: ['ㄏㄨㄟˋ', 'ㄎㄨㄞˇ', 'ㄎㄨㄞ'],
    meaning: '管理與計算財務的工作',
    fun: '會計系同學的日常：自我介紹先教別人唸系名',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-014', text: '呼天搶地', target: '搶', zhuyin: 'ㄑㄧㄤ',
    distractors: ['ㄑㄧㄤˇ', 'ㄑㄧㄤˊ', 'ㄑㄧㄥ'],
    meaning: '大聲哭喊，極度悲痛',
    fun: '搶唸一聲是「碰撞」，是用頭撞地的意思，不是搶地板',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-015', text: '參差不齊', target: '差', zhuyin: 'ㄘ',
    distractors: ['ㄔㄚ', 'ㄔㄞ', 'ㄘˊ'],
    meaning: '高低長短不一致',
    fun: '參差唸「ㄘㄣ ㄘ」，這個字的讀音數量也很參差：它有四種唸法',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-016', text: '差強人意', target: '差', zhuyin: 'ㄔㄚ',
    distractors: ['ㄔㄚˋ', 'ㄘ', 'ㄔㄚˇ'],
    meaning: '大致上還能令人滿意',
    fun: '注意！差強人意是「還不錯」的意思，不是不及格。意思跟讀音一起學起來',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-017', text: '寶藏', target: '藏', zhuyin: 'ㄗㄤˋ',
    distractors: ['ㄘㄤˊ', 'ㄗㄤ', 'ㄗㄤˇ'],
    meaning: '蓄藏的珍貴財物',
    fun: '「寶ㄗㄤˋ男孩」才是標準讀音，雖然大家都唸ㄘㄤˊ',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-018', text: '埋怨', target: '埋', zhuyin: 'ㄇㄢˊ',
    distractors: ['ㄇㄞˊ', 'ㄇㄢˇ', 'ㄇㄢˋ'],
    meaning: '抱怨、責怪',
    fun: '埋怨的埋唸ㄇㄢˊ。把怨氣「埋」起來反而唸錯，中文的小脾氣',
    tags: ['破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-019', text: '應屆畢業生', target: '應', zhuyin: 'ㄧㄥ',
    distractors: ['ㄧㄥˋ', 'ㄧㄥˊ', 'ㄧㄥˇ'],
    meaning: '本年度畢業的學生',
    fun: '應屆唸一聲。畢業即失業之前，先把自己的身分唸對',
    tags: ['破音字', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'pp-020', text: '供不應求', target: '應', zhuyin: 'ㄧㄥˋ',
    distractors: ['ㄧㄥ', 'ㄧㄥˊ', 'ㄧㄥˇ'],
    meaning: '供應趕不上需求',
    fun: '這裡的應是「應付」，唸四聲。演唱會門票的常態',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-021', text: '供奉', target: '供', zhuyin: 'ㄍㄨㄥˋ',
    distractors: ['ㄍㄨㄥ', 'ㄍㄨㄥˊ', 'ㄍㄨㄥˇ'],
    meaning: '敬奉神明或祖先',
    fun: '提供唸一聲，供奉唸四聲。拜拜的時候不要唸錯，神明在聽',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-022', text: '身受重創', target: '創', zhuyin: 'ㄔㄨㄤ',
    distractors: ['ㄔㄨㄤˋ', 'ㄔㄨㄤˊ', 'ㄔㄨㄤˇ'],
    meaning: '受到嚴重的傷害',
    fun: '創 = 傷口時唸一聲。創業的創才是四聲（雖然創業也常常受重創）',
    tags: ['破音字', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-023', text: '處方箋', target: '處', zhuyin: 'ㄔㄨˇ',
    distractors: ['ㄔㄨˋ', 'ㄔㄨ', 'ㄔㄨˊ'],
    meaning: '醫師開立的用藥單',
    fun: '處理、處方都是三聲；處所、辦事處才是四聲。藥師都知道',
    tags: ['破音字', '日常'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-024', text: '為虎作倀', target: '為', zhuyin: 'ㄨㄟˋ',
    distractors: ['ㄨㄟˊ', 'ㄨㄟ', 'ㄨㄟˇ'],
    meaning: '幫壞人做壞事',
    fun: '為了誰唸ㄨㄟˋ，成為唸ㄨㄟˊ。幫老虎打工的鬼叫倀，職場寓言',
    tags: ['破音字', '成語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'pp-025', text: '銀行行員', target: '行', zhuyin: 'ㄏㄤˊ',
    distractors: ['ㄒㄧㄥˊ', 'ㄏㄤˇ', 'ㄏㄤˋ'],
    meaning: '在銀行工作的職員',
    fun: '一個「行」字五種唸法，難怪中文是地獄級語言',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-027', text: '游說', target: '說', zhuyin: 'ㄕㄨㄟˋ',
    distractors: ['ㄕㄨㄛ', 'ㄕㄨㄟˊ', 'ㄕㄨㄟˇ'],
    meaning: '用言語勸說別人接受主張',
    fun: '說客唸ㄕㄨㄟˋ客。立法院每天都在上演的字',
    tags: ['破音字', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-028', text: '寧缺勿濫', target: '寧', zhuyin: 'ㄋㄧㄥˊ',
    distractors: ['ㄋㄧㄥˋ', 'ㄋㄧㄥ', 'ㄋㄧㄥˇ'],
    meaning: '寧可缺少，也不要不合格的',
    fun: '寧可的寧唸二聲。交友軟體滑到麻木的你，記住這四個字',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-029', text: '混水摸魚', target: '混', zhuyin: 'ㄏㄨㄣˋ',
    distractors: ['ㄏㄨㄣˊ', 'ㄏㄨㄣ', 'ㄏㄨㄣˇ'],
    meaning: '趁混亂時撈取利益，或敷衍做事',
    fun: '教育部辭典「混水摸魚」唸ㄏㄨㄣˋ（四聲）；要二聲ㄏㄨㄣˊ得寫成「渾水」。上班前先學會唸',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-030', text: '汗流浹背', target: '浹', zhuyin: 'ㄐㄧㄚˊ',
    distractors: ['ㄐㄧㄚ', 'ㄒㄧㄚˊ', 'ㄐㄧㄚˇ'],
    meaning: '汗水濕透背部',
    fun: '夏天沒冷氣教室的集體回憶，浹唸二聲',
    tags: ['易讀錯', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-031', text: '螳臂當車', target: '當', zhuyin: 'ㄉㄤˇ',
    distractors: ['ㄉㄤ', 'ㄉㄤˋ', 'ㄉㄤˊ'],
    meaning: '不自量力抵擋強大的力量',
    fun: '教育部辭典唸ㄊㄤˊ ㄅㄧˋ ㄉㄤˇ ㄔㄜ，這裡的當＝阻擋唸三聲（同擋）。螳螂：我只是想當網紅',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-032', text: '安步當車', target: '當', zhuyin: 'ㄉㄤ',
    distractors: ['ㄉㄤˇ', 'ㄉㄤˋ', 'ㄉㄤˊ'],
    meaning: '慢慢走路，當作坐車',
    fun: '教育部辭典唸ㄢ ㄅㄨˋ ㄉㄤ ㄐㄩ，這裡的當＝當作唸一聲（不是四聲）。省下的捷運錢買雞排',
    tags: ['破音字', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-033', text: '間不容髮', target: '間', zhuyin: 'ㄐㄧㄢˋ',
    distractors: ['ㄐㄧㄢ', 'ㄐㄧㄢˊ', 'ㄐㄧㄢˇ'],
    meaning: '情勢危急到極點',
    fun: '間 = 空隙時唸四聲，髮絲都塞不進去的距離，比演唱會搶票還緊張',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-034', text: '畜牧業', target: '畜', zhuyin: 'ㄒㄩˋ',
    distractors: ['ㄔㄨˋ', 'ㄒㄩˇ', 'ㄒㄩ'],
    meaning: '飼養牲畜的產業',
    fun: '畜牧唸ㄒㄩˋ（飼養），牲畜唸ㄔㄨˋ（動物）。養的是動作，被養的是名詞',
    tags: ['破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-035', text: '不省人事', target: '省', zhuyin: 'ㄒㄧㄥˇ',
    distractors: ['ㄕㄥˇ', 'ㄒㄧㄥ', 'ㄒㄧㄥˋ'],
    meaning: '昏迷失去知覺',
    fun: '省 = 知覺、醒悟時唸ㄒㄧㄥˇ。反省也是這個音，現在反省一下自己唸對了沒',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-037', text: '睡午覺', target: '覺', zhuyin: 'ㄐㄧㄠˋ',
    distractors: ['ㄐㄩㄝˊ', 'ㄐㄧㄠˇ', 'ㄐㄧㄠ'],
    meaning: '中午的睡眠，覺指睡眠時唸ㄐㄧㄠˋ',
    fun: '感覺（ㄐㄩㄝˊ）很想睡一覺（ㄐㄧㄠˋ），小學生最懂這兩個音的差別',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-038', text: '子彈', target: '彈', zhuyin: 'ㄉㄢˋ',
    distractors: ['ㄊㄢˊ', 'ㄉㄢ', 'ㄉㄢˇ'],
    meaning: '槍械發射的彈丸，彈當名詞唸ㄉㄢˋ',
    fun: '彈（ㄊㄢˊ）鋼琴不會出子彈（ㄉㄢˋ），除非你彈的是Rush B',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-041', text: '重新', target: '重', zhuyin: 'ㄔㄨㄥˊ',
    distractors: ['ㄓㄨㄥˋ', 'ㄔㄨㄥ', 'ㄔㄨㄥˇ'],
    meaning: '再一次，重指再度時唸ㄔㄨㄥˊ',
    fun: '遊戲打輸了就重（ㄔㄨㄥˊ）來，書包很重（ㄓㄨㄥˋ）就沒辦法重來',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-043', text: '漲價', target: '漲', zhuyin: 'ㄓㄤˇ',
    distractors: ['ㄓㄤˋ', 'ㄔㄤˊ', 'ㄓㄤ'],
    meaning: '價格上升，漲指價格升高時唸ㄓㄤˇ',
    fun: '什麼都漲（ㄓㄤˇ）就薪水不漲，唸對讀音不用錢，先賺一題',
    tags: ['破音字', '日常', '新聞常錯'], difficulty: 2, era: 'modern'
  },
  {
    id: 'pp-044', text: '便宜', target: '便', zhuyin: 'ㄆㄧㄢˊ',
    distractors: ['ㄅㄧㄢˋ', 'ㄆㄧㄢˇ', 'ㄆㄧㄢ'],
    meaning: '價格低廉，便宜的便唸ㄆㄧㄢˊ',
    fun: '夜市喊「俗啦」的時候沒人唸錯，寫成國字反而開始懷疑人生',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-045', text: '水滸傳', target: '傳', zhuyin: 'ㄓㄨㄢˋ',
    distractors: ['ㄔㄨㄢˊ', 'ㄓㄨㄢ', 'ㄓㄨㄢˇ'],
    meaning: '記載人物事蹟的書，傳指傳記時唸ㄓㄨㄢˋ',
    fun: '一百零八條好漢的故事代代相傳（ㄔㄨㄢˊ），書名卻唸傳（ㄓㄨㄢˋ）',
    tags: ['破音字', '大考'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-047', text: '看守', target: '看', zhuyin: 'ㄎㄢ',
    distractors: ['ㄎㄢˋ', 'ㄎㄢˊ', 'ㄎㄢˇ'],
    meaning: '守護、監視，看指守護時唸一聲',
    fun: '看（ㄎㄢ）門的狗不在乎你看（ㄎㄢˋ）牠幾眼，反正都要叫',
    tags: ['破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-048', text: '巷弄', target: '弄', zhuyin: 'ㄌㄨㄥˋ',
    distractors: ['ㄋㄨㄥˋ', 'ㄌㄨㄥˊ', 'ㄌㄨㄥˇ'],
    meaning: '小巷子，弄指巷道時唸ㄌㄨㄥˋ',
    fun: '地址的「弄」唸ㄌㄨㄥˋ，唸錯外送員一樣找得到，但國文老師找得到你',
    tags: ['破音字', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'pp-049', text: '曾孫', target: '曾', zhuyin: 'ㄗㄥ',
    distractors: ['ㄘㄥˊ', 'ㄗㄥˇ', 'ㄗㄥˋ'],
    meaning: '孫子的兒子，曾指隔兩代的親屬時唸ㄗㄥ',
    fun: '曾（ㄗㄥ）孫和曾（ㄘㄥˊ）經，差一個音差了三代人',
    tags: ['破音字', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'pp-050', text: '鑽研', target: '鑽', zhuyin: 'ㄗㄨㄢ',
    distractors: ['ㄗㄨㄢˋ', 'ㄗㄨㄢˊ', 'ㄗㄨㄢˇ'],
    meaning: '深入研究，鑽當動詞唸一聲',
    fun: '鑽（ㄗㄨㄢ）研十年也許能買得起鑽（ㄗㄨㄢˋ）戒，加油',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-051', text: '撒嬌', target: '撒', zhuyin: 'ㄙㄚ',
    distractors: ['ㄙㄚˇ', 'ㄙㄚˊ', 'ㄕㄚ'],
    meaning: '故作嬌態討人疼愛，撒指放開、施展時唸一聲',
    fun: '貓撒（ㄙㄚ）嬌的時候，你撒（ㄙㄚˇ）多少飼料都不夠',
    tags: ['破音字', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'pp-052', text: '背包', target: '背', zhuyin: 'ㄅㄟ',
    distractors: ['ㄅㄟˋ', 'ㄅㄟˊ', 'ㄆㄟˇ'],
    meaning: '背在肩上的包包，背當動詞指負荷時唸一聲',
    fun: '背（ㄅㄟ）包背久了，背（ㄅㄟˋ）就痠了，一個字寫完痠痛人生',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-053', text: '負荷', target: '荷', zhuyin: 'ㄏㄜˋ',
    distractors: ['ㄏㄜˊ', 'ㄏㄜ', 'ㄏㄜˇ'],
    meaning: '承擔的重量或責任，荷指承擔時唸ㄏㄜˋ',
    fun: '荷（ㄏㄜˊ）花很美，工作量超過負荷（ㄏㄜˋ）就不美了',
    tags: ['破音字', '日常', '大考'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-054', text: '教書', target: '教', zhuyin: 'ㄐㄧㄠ',
    distractors: ['ㄐㄧㄠˋ', 'ㄐㄧㄠˊ', 'ㄐㄧㄠˇ'],
    meaning: '傳授知識，教當動詞單用時唸一聲',
    fun: '老師教（ㄐㄧㄠ）書是動詞，教（ㄐㄧㄠˋ）育是名詞，老師：我全都要',
    tags: ['破音字', '日常'], difficulty: 1, era: 'classic'
  },
  {
    id: 'pp-055', text: '扭轉乾坤', target: '乾', zhuyin: 'ㄑㄧㄢˊ',
    distractors: ['ㄍㄢ', 'ㄑㄧㄢˇ', 'ㄑㄧㄢˋ'],
    meaning: '徹底改變局勢，乾指天時唸ㄑㄧㄢˊ',
    fun: '乾（ㄑㄧㄢˊ）坤是天地，乾（ㄍㄢ）杯是天意，都很重要',
    tags: ['破音字', '成語'], difficulty: 1, era: 'classic'
  },
  {
    id: 'pp-056', text: '奇數', target: '奇', zhuyin: 'ㄐㄧ',
    distractors: ['ㄑㄧˊ', 'ㄐㄧˇ', 'ㄐㄧˋ'],
    meaning: '不能被2整除的數，奇指單數時唸ㄐㄧ',
    fun: '數學課唸奇（ㄐㄧ）數，唸成奇（ㄑㄧˊ）數的話，分數才會很奇怪',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-057', text: '隨聲附和', target: '和', zhuyin: 'ㄏㄜˋ',
    distractors: ['ㄏㄜˊ', 'ㄏㄢˋ', 'ㄏㄜˇ'],
    meaning: '跟著別人應聲贊同，和指應和時唸ㄏㄜˋ',
    fun: '會議上只會附和（ㄏㄜˋ）的人，跟和（ㄏㄜˊ）事佬一樣多',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-058', text: '伺候', target: '伺', zhuyin: 'ㄘˋ',
    distractors: ['ㄙˋ', 'ㄘ', 'ㄘˇ'],
    meaning: '在旁服侍，伺候的伺唸ㄘˋ',
    fun: '伺（ㄘˋ）候主子是貓奴日常，伺（ㄙˋ）機而動是貓的日常',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-059', text: '薄荷', target: '薄', zhuyin: 'ㄅㄛˋ',
    distractors: ['ㄅㄛˊ', 'ㄅㄠˊ', 'ㄅㄛˇ'],
    meaning: '清涼香草植物，薄荷的薄唸ㄅㄛˋ',
    fun: '薄（ㄅㄛˋ）荷巧克力是甜點界的牙膏，讀音爭議跟口味爭議一樣大',
    tags: ['破音字', '日常'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-060', text: '扒手', target: '扒', zhuyin: 'ㄆㄚˊ',
    distractors: ['ㄅㄚ', 'ㄆㄚˇ', 'ㄆㄚˋ'],
    meaning: '偷竊別人財物的小偷，扒指竊取時唸ㄆㄚˊ',
    fun: '扒（ㄆㄚˊ）手扒你錢包，扒（ㄅㄚ）著欄杆是捷運通勤族',
    tags: ['破音字', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'pp-061', text: '籠罩', target: '籠', zhuyin: 'ㄌㄨㄥˊ',
    distractors: ['ㄌㄨㄥˇ', 'ㄌㄨㄥ', 'ㄌㄨㄥˋ'],
    meaning: '像罩子一樣蓋住，籠罩的籠辭典標準音唸ㄌㄨㄥˊ',
    fun: '濃霧籠（ㄌㄨㄥˊ）罩台北盆地，想唸三聲的請先查辭典再籠絡（ㄌㄨㄥˇ）我',
    tags: ['破音字', '新聞常錯'], difficulty: 4, era: 'modern'
  },
  {
    id: 'pp-062', text: '強勁', target: '勁', zhuyin: 'ㄐㄧㄥˋ',
    distractors: ['ㄐㄧㄣˋ', 'ㄐㄧㄥˇ', 'ㄐㄧㄥ'],
    meaning: '強而有力，勁當形容詞唸ㄐㄧㄥˋ',
    fun: '對手很強勁（ㄐㄧㄥˋ），你很有勁（ㄐㄧㄣˋ），體育主播每天的考題',
    tags: ['破音字', '新聞常錯'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-063', text: '氣勢磅礴', target: '磅', zhuyin: 'ㄆㄤ',
    distractors: ['ㄅㄤˋ', 'ㄆㄤˊ', 'ㄆㄤˇ'],
    meaning: '形容氣勢盛大，磅礴的磅唸ㄆㄤ',
    fun: '氣勢磅（ㄆㄤ）礴，體重磅（ㄅㄤˋ）秤，運動完只想面對前者',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-064', text: '弱不禁風', target: '禁', zhuyin: 'ㄐㄧㄣ',
    distractors: ['ㄐㄧㄣˋ', 'ㄐㄧㄣˊ', 'ㄐㄧㄣˇ'],
    meaning: '身體虛弱得承受不住風吹，禁指承受時唸一聲',
    fun: '禁（ㄐㄧㄣ）得起考驗唸一聲，禁（ㄐㄧㄣˋ）止進入唸四聲，身體和告示牌不同調',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-065', text: '朝令夕改', target: '朝', zhuyin: 'ㄓㄠ',
    distractors: ['ㄔㄠˊ', 'ㄓㄠˇ', 'ㄓㄠˋ'],
    meaning: '早上的命令晚上就改，朝指早晨時唸ㄓㄠ',
    fun: '朝（ㄓㄠ）令夕改的政策，比朝（ㄔㄠˊ）代更迭還快',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-066', text: '調虎離山', target: '調', zhuyin: 'ㄉㄧㄠˋ',
    distractors: ['ㄊㄧㄠˊ', 'ㄉㄧㄠ', 'ㄉㄧㄠˇ'],
    meaning: '引誘對方離開據點，調指調動時唸ㄉㄧㄠˋ',
    fun: '調（ㄉㄧㄠˋ）虎離山是計謀，調（ㄊㄧㄠˊ）整心態是輸了之後的事',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-067', text: '去看大夫', target: '大', zhuyin: 'ㄉㄞˋ',
    distractors: ['ㄉㄚˋ', 'ㄉㄞ', 'ㄉㄞˇ'],
    meaning: '醫生的俗稱，大夫指醫生時唸ㄉㄞˋ',
    fun: '大（ㄉㄞˋ）夫是醫生，大（ㄉㄚˋ）夫沒這個人，掛號前先掛讀音',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-068', text: '日積月累', target: '累', zhuyin: 'ㄌㄟˇ',
    distractors: ['ㄌㄟˋ', 'ㄌㄟˊ', 'ㄌㄟ'],
    meaning: '長時間慢慢累積，累指堆積時唸ㄌㄟˇ',
    fun: '知識日積月累（ㄌㄟˇ），疲勞也日積月累（ㄌㄟˋ），聲調分工明確',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-069', text: '屏氣凝神', target: '屏', zhuyin: 'ㄅㄧㄥˇ',
    distractors: ['ㄆㄧㄥˊ', 'ㄅㄧㄥ', 'ㄅㄧㄥˋ'],
    meaning: '忍住呼吸集中精神，屏指抑止時唸ㄅㄧㄥˇ',
    fun: '屏（ㄅㄧㄥˇ）氣凝神看螢幕（屏ㄆㄧㄥˊ幕），近視就是這樣來的',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-070', text: '著涼', target: '著', zhuyin: 'ㄓㄠ',
    distractors: ['ㄓㄨˋ', 'ㄓㄠˊ', 'ㄓㄠˇ'],
    meaning: '受寒感冒，著指感受、遭受時唸ㄓㄠ',
    fun: '吹冷氣著（ㄓㄠ）涼，寫著（ㄓㄨˋ）作成名，一個字打工五種音',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-071', text: '天衣無縫', target: '縫', zhuyin: 'ㄈㄥˋ',
    distractors: ['ㄈㄥˊ', 'ㄈㄥ', 'ㄈㄥˇ'],
    meaning: '事物完美沒有破綻，縫當名詞指接合處時唸ㄈㄥˋ',
    fun: '計畫天衣無縫（ㄈㄥˋ），破功通常是因為隊友嘴巴有縫',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-072', text: '盛飯', target: '盛', zhuyin: 'ㄔㄥˊ',
    distractors: ['ㄕㄥˋ', 'ㄔㄥ', 'ㄔㄥˇ'],
    meaning: '把飯裝入碗中，盛指裝放時唸ㄔㄥˊ',
    fun: '自助餐盛（ㄔㄥˊ）飯的氣勢，比任何盛（ㄕㄥˋ）大開幕都盛大',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-073', text: '校對', target: '校', zhuyin: 'ㄐㄧㄠˋ',
    distractors: ['ㄒㄧㄠˋ', 'ㄐㄧㄠ', 'ㄐㄧㄠˇ'],
    meaning: '核對文字訂正錯誤，校指核對時唸ㄐㄧㄠˋ',
    fun: '校（ㄐㄧㄠˋ）對沒做好，學校（ㄒㄧㄠˋ）的公告就會出現在爆料公社',
    tags: ['破音字', '日常', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-074', text: '狐假虎威', target: '假', zhuyin: 'ㄐㄧㄚˇ',
    distractors: ['ㄐㄧㄚˋ', 'ㄐㄧㄚ', 'ㄐㄧㄚˊ'],
    meaning: '借別人的威勢嚇人，假指借用時唸ㄐㄧㄚˇ',
    fun: '狐狸假（ㄐㄧㄚˇ）借虎威，不是放假（ㄐㄧㄚˋ）去動物園',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-075', text: '降伏', target: '降', zhuyin: 'ㄒㄧㄤˊ',
    distractors: ['ㄐㄧㄤˋ', 'ㄒㄧㄤˇ', 'ㄒㄧㄤ'],
    meaning: '制伏使順從，降指使屈服時唸ㄒㄧㄤˊ',
    fun: '降（ㄒㄧㄤˊ）伏惡龍的勇者，最怕氣溫驟降（ㄐㄧㄤˋ）忘了帶外套',
    tags: ['破音字', '大考'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-076', text: '冠冕堂皇', target: '冠', zhuyin: 'ㄍㄨㄢ',
    distractors: ['ㄍㄨㄢˋ', 'ㄍㄨㄢˊ', 'ㄍㄨㄢˇ'],
    meaning: '表面莊嚴體面，冠指帽子時唸一聲',
    fun: '冠（ㄍㄨㄢ）冕堂皇的理由，拿不到冠（ㄍㄨㄢˋ）軍的藉口',
    tags: ['破音字', '成語', '大考'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-077', text: '深惡痛絕', target: '惡', zhuyin: 'ㄨˋ',
    distractors: ['ㄜˋ', 'ㄨˇ', 'ㄛˋ'],
    meaning: '極度厭惡痛恨，惡指厭惡時唸ㄨˋ',
    fun: '對蟑螂深惡（ㄨˋ）痛絕，但蟑螂本人沒做什麼惡（ㄜˋ）事，牠只是出現',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-079', text: '仁者樂山', target: '樂', zhuyin: 'ㄧㄠˋ',
    distractors: ['ㄌㄜˋ', 'ㄩㄝˋ', 'ㄧㄠˇ'],
    meaning: '仁德的人喜愛山，樂指喜好時唸ㄧㄠˋ',
    fun: '樂字三連音：音樂ㄩㄝˋ、快樂ㄌㄜˋ、樂山ㄧㄠˋ，孔子聽了都想出選擇題',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-080', text: '押解', target: '解', zhuyin: 'ㄐㄧㄝˋ',
    distractors: ['ㄐㄧㄝˇ', 'ㄒㄧㄝˋ', 'ㄐㄧㄝ'],
    meaning: '押送犯人或財物，解指押送時唸ㄐㄧㄝˋ',
    fun: '押解（ㄐㄧㄝˋ）犯人不是解（ㄐㄧㄝˇ）開手銬，方向完全相反',
    tags: ['破音字', '大考', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-081', text: '星宿', target: '宿', zhuyin: 'ㄒㄧㄡˋ',
    distractors: ['ㄙㄨˋ', 'ㄒㄧㄡˇ', 'ㄒㄧㄡ'],
    meaning: '星座、星群，宿指星的位次時唸ㄒㄧㄡˋ',
    fun: '二十八星宿（ㄒㄧㄡˋ）不提供住宿（ㄙㄨˋ），武俠小說讀者都知道',
    tags: ['破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-082', text: '茅塞頓開', target: '塞', zhuyin: 'ㄙㄜˋ',
    distractors: ['ㄙㄞ', 'ㄙㄞˋ', 'ㄙㄜˇ'],
    meaning: '忽然開悟明白，塞指阻隔時唸ㄙㄜˋ',
    fun: '聽懂的瞬間茅塞（ㄙㄜˋ）頓開，國道上的車陣只會茅塞（ㄙㄞ）不開',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-083', text: '拓本', target: '拓', zhuyin: 'ㄊㄚˋ',
    distractors: ['ㄊㄨㄛˋ', 'ㄊㄚ', 'ㄊㄚˇ'],
    meaning: '從碑刻上拓印下來的文本，拓指摹印時唸ㄊㄚˋ',
    fun: '拓（ㄊㄚˋ）本是古人的影印，開拓（ㄊㄨㄛˋ）是古人的開外掛',
    tags: ['破音字', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-084', text: '博聞強識', target: '識', zhuyin: 'ㄓˋ',
    distractors: ['ㄕˋ', 'ㄓ', 'ㄓˇ'],
    meaning: '見聞廣博記憶力強，識指記住時唸ㄓˋ',
    fun: '博聞強識（ㄓˋ）的最後一關，就是記住這個字唸ㄓˋ',
    tags: ['破音字', '成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'pp-085', text: '心廣體胖', target: '胖', zhuyin: 'ㄆㄢˊ',
    distractors: ['ㄆㄤˋ', 'ㄆㄢˇ', 'ㄆㄢ'],
    meaning: '心胸開朗身體舒泰，胖指安舒時唸ㄆㄢˊ',
    fun: '心廣體胖（ㄆㄢˊ）是心靈雞湯，唸成ㄆㄤˋ就變成雞湯喝太多',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-086', text: '禪讓', target: '禪', zhuyin: 'ㄕㄢˋ',
    distractors: ['ㄔㄢˊ', 'ㄕㄢ', 'ㄕㄢˇ'],
    meaning: '帝王把王位讓給賢人，禪指讓位時唸ㄕㄢˋ',
    fun: '堯舜禪（ㄕㄢˋ）讓天下，不是邊打禪（ㄔㄢˊ）邊讓位',
    tags: ['破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-087', text: '句讀', target: '讀', zhuyin: 'ㄉㄡˋ',
    distractors: ['ㄉㄨˊ', 'ㄉㄡ', 'ㄉㄡˇ'],
    meaning: '文章中停頓的地方，讀指語句停頓時唸ㄉㄡˋ',
    fun: '古人沒有標點，全靠句讀（ㄉㄡˋ），是最早的斷行 linter',
    tags: ['破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-088', text: '拾級而上', target: '拾', zhuyin: 'ㄕㄜˋ',
    distractors: ['ㄕˊ', 'ㄕㄜ', 'ㄕㄜˇ'],
    meaning: '沿著階梯逐級往上走，拾指逐步登階時唸ㄕㄜˋ',
    fun: '拾（ㄕㄜˋ）級而上是爬樓梯，拾（ㄕˊ）金不昧是撿到錢，都很累',
    tags: ['破音字', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'pp-089', text: '如法炮製', target: '炮', zhuyin: 'ㄆㄠˊ',
    distractors: ['ㄆㄠˋ', 'ㄆㄠ', 'ㄆㄠˇ'],
    meaning: '依照舊方法辦事，炮指焙製中藥時唸ㄆㄠˊ',
    fun: '如法炮（ㄆㄠˊ）製是照著做，不是照著放炮（ㄆㄠˋ）',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-090', text: '圖窮匕見', target: '見', zhuyin: 'ㄒㄧㄢˋ',
    distractors: ['ㄐㄧㄢˋ', 'ㄒㄧㄢˇ', 'ㄒㄧㄢ'],
    meaning: '事情發展到最後真相顯露，見指顯露時唸ㄒㄧㄢˋ',
    fun: '圖窮匕見（ㄒㄧㄢˋ），荊軻的簡報做到最後一頁才放大招',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-091', text: '屬意', target: '屬', zhuyin: 'ㄓㄨˇ',
    distractors: ['ㄕㄨˇ', 'ㄓㄨ', 'ㄓㄨˋ'],
    meaning: '心中傾向中意某人，屬指託付、傾注時唸ㄓㄨˇ',
    fun: '老闆屬（ㄓㄨˇ）意的人選，不一定屬（ㄕㄨˇ）於你的部門',
    tags: ['破音字', '大考', '新聞常錯'], difficulty: 5, era: 'classic'
  },
  {
    id: 'pp-092', text: '審時度勢', target: '度', zhuyin: 'ㄉㄨㄛˋ',
    distractors: ['ㄉㄨˋ', 'ㄉㄨㄛ', 'ㄉㄨㄛˇ'],
    meaning: '觀察時機估量情勢，度指推測時唸ㄉㄨㄛˋ',
    fun: '審時度（ㄉㄨㄛˋ）勢是高手，毫無風度（ㄉㄨˋ）是輸不起',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-093', text: '從容不迫', target: '從', zhuyin: 'ㄘㄨㄥ',
    distractors: ['ㄘㄨㄥˊ', 'ㄘㄨㄥˇ', 'ㄘㄨㄥˋ'],
    meaning: '態度鎮定不慌張，從容的從唸一聲',
    fun: '從（ㄘㄨㄥ）容不迫是修養，從（ㄘㄨㄥˊ）來不急是擺爛，一聲之差',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-094', text: '折本', target: '折', zhuyin: 'ㄕㄜˊ',
    distractors: ['ㄓㄜˊ', 'ㄕㄜˇ', 'ㄕㄜˋ'],
    meaning: '虧本、賠錢，折指虧損時唸ㄕㄜˊ',
    fun: '做生意折（ㄕㄜˊ）本，跟打折（ㄓㄜˊ）打到賠錢是同一個故事',
    tags: ['破音字', '日常', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'pp-095', text: '顫抖', target: '顫', zhuyin: 'ㄓㄢˋ',
    distractors: ['ㄔㄢˋ', 'ㄓㄢ', 'ㄓㄢˇ'],
    meaning: '身體發抖，顫抖的顫標準音唸ㄓㄢˋ',
    fun: '教育部辭典顫抖唸ㄓㄢˋ抖，全台灣聽到的瞬間都顫抖了',
    tags: ['破音字', '新聞常錯'], difficulty: 4, era: 'modern'
  },
  {
    id: 'pp-096', text: '剝削', target: '削', zhuyin: 'ㄒㄩㄝˋ',
    distractors: ['ㄒㄧㄠ', 'ㄒㄩㄝˇ', 'ㄒㄩㄝ'],
    meaning: '壓榨他人的利益，削的讀音唸ㄒㄩㄝˋ',
    fun: '被剝削（ㄒㄩㄝˋ）的勞工，連削（ㄒㄧㄠ）鉛筆的時間都沒有',
    tags: ['破音字', '大考', '新聞常錯'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-097', text: '嗚咽', target: '咽', zhuyin: 'ㄧㄝˋ',
    distractors: ['ㄧㄢ', 'ㄧㄢˋ', 'ㄧㄝˇ'],
    meaning: '低聲哭泣，咽指悲泣哽塞時唸ㄧㄝˋ',
    fun: '嗚咽（ㄧㄝˋ）是哭到說不出話，咽（ㄧㄢ）喉是說話的地方，同一條通道',
    tags: ['破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-098', text: '一哄而散', target: '哄', zhuyin: 'ㄏㄨㄥ',
    distractors: ['ㄏㄨㄥˇ', 'ㄏㄨㄥˊ', 'ㄎㄨㄥ'],
    meaning: '人群吵雜地一下子散去，哄在此唸一聲',
    fun: '下課鐘一響全班一哄（ㄏㄨㄥ）而散，哄（ㄏㄨㄥˇ）都哄不回來',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-099', text: '葉公好龍', target: '葉', zhuyin: 'ㄕㄜˋ',
    distractors: ['ㄧㄝˋ', 'ㄕㄜ', 'ㄕㄜˇ'],
    meaning: '比喻表面愛好實際畏懼，葉公的葉古音唸ㄕㄜˋ',
    fun: '葉（ㄕㄜˋ）公好龍，連姓氏都跟你想的不一樣，難怪龍來了他嚇跑',
    tags: ['破音字', '成語', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'pp-100', text: '胸脯', target: '脯', zhuyin: 'ㄆㄨˊ',
    distractors: ['ㄈㄨˇ', 'ㄆㄨˇ', 'ㄈㄨˊ'],
    meaning: '胸部、胸膛；脯指胸部時唸ㄆㄨˊ',
    fun: '胸脯（ㄆㄨˊ）的脯指胸部；肉脯（ㄈㄨˇ）的脯才是乾肉，別拍錯地方',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  }
];
