/**
 * 破音字 — 同一個字，換個詞就換個音
 * schema 同 tricky.js
 */
export default [
  {
    id: 'pp-001', text: '數見不鮮', target: '數', zhuyin: 'ㄕㄨㄛˋ',
    distractors: ['ㄕㄨˋ', 'ㄕㄨˇ'],
    meaning: '經常見到，不覺得新奇',
    fun: '「數」唸ㄕㄨㄛˋ是「屢次」的意思，這題在大考出現的頻率也是數見不鮮',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-002', text: '鮮為人知', target: '鮮', zhuyin: 'ㄒㄧㄢˇ',
    distractors: ['ㄒㄧㄢ'],
    meaning: '很少有人知道',
    fun: '鮮 = 少。這個讀音本身就鮮為人知',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-003', text: '強人所難', target: '強', zhuyin: 'ㄑㄧㄤˇ',
    distractors: ['ㄑㄧㄤˊ', 'ㄐㄧㄤˋ'],
    meaning: '勉強別人做不願意的事',
    fun: '強迫的強是三聲，不會唸也不能強人所難…但這題還是要答',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-004', text: '載歌載舞', target: '載', zhuyin: 'ㄗㄞˋ',
    distractors: ['ㄗㄞˇ'],
    meaning: '又唱歌又跳舞，非常歡樂',
    fun: '這裡的載是「又、且」。跨年晚會的標準狀態',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-005', text: '一年半載', target: '載', zhuyin: 'ㄗㄞˇ',
    distractors: ['ㄗㄞˋ'],
    meaning: '半年到一年的時間',
    fun: '載 = 年的時候唸三聲。「三年五載」也是',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-006', text: '自怨自艾', target: '艾', zhuyin: 'ㄧˋ',
    distractors: ['ㄞˋ'],
    meaning: '悔恨自己的過錯',
    fun: '艾在這裡是「改正」。唸成ㄞˋ的人才需要自怨自艾',
    tags: ['破音字', '成語', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-007', text: '方興未艾', target: '艾', zhuyin: 'ㄞˋ',
    distractors: ['ㄧˋ'],
    meaning: '正在發展，尚未停止',
    fun: '這裡的艾是「停止」，唸回ㄞˋ。同一個字兩種唸法，AI 都要混亂了',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-008', text: '乳臭未乾', target: '臭', zhuyin: 'ㄒㄧㄡˋ',
    distractors: ['ㄔㄡˋ'],
    meaning: '譏笑人年幼無知',
    fun: '臭唸ㄒㄧㄡˋ是「氣味」。罵人之前先把字唸對，不然會被反殺',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-009', text: '咀嚼', target: '嚼', zhuyin: 'ㄐㄩㄝˊ',
    distractors: ['ㄐㄧㄠˊ'],
    meaning: '用牙齒磨碎食物，也指反覆體會',
    fun: '單獨嚼東西唸ㄐㄧㄠˊ，咀嚼唸ㄐㄩㄝˊ。口香糖表示困惑',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-010', text: '丟三落四', target: '落', zhuyin: 'ㄌㄚˋ',
    distractors: ['ㄌㄨㄛˋ', 'ㄌㄠˋ'],
    meaning: '形容粗心健忘',
    fun: '落唸ㄌㄚˋ是「遺漏」。出門忘帶悠遊卡的你，專屬讀音',
    tags: ['破音字', '成語', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-011', text: '落枕', target: '落', zhuyin: 'ㄌㄠˋ',
    distractors: ['ㄌㄨㄛˋ', 'ㄌㄚˋ'],
    meaning: '睡姿不良造成脖子痠痛',
    fun: '落枕唸ㄌㄠˋ。脖子已經很痛了，讀音不要再錯',
    tags: ['破音字', '日常'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-012', text: '便宜行事', target: '便', zhuyin: 'ㄅㄧㄢˋ',
    distractors: ['ㄆㄧㄢˊ'],
    meaning: '視情況自行斟酌處理',
    fun: '跟「便宜貨」無關！這裡是方便的便。公文常見，唸錯會被科長糾正',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-013', text: '會計', target: '會', zhuyin: 'ㄎㄨㄞˋ',
    distractors: ['ㄏㄨㄟˋ'],
    meaning: '管理與計算財務的工作',
    fun: '會計系同學的日常：自我介紹先教別人唸系名',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-014', text: '呼天搶地', target: '搶', zhuyin: 'ㄑㄧㄤ',
    distractors: ['ㄑㄧㄤˇ'],
    meaning: '大聲哭喊，極度悲痛',
    fun: '搶唸一聲是「碰撞」，是用頭撞地的意思，不是搶地板',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-015', text: '參差不齊', target: '差', zhuyin: 'ㄘ',
    distractors: ['ㄔㄚ', 'ㄔㄞ'],
    meaning: '高低長短不一致',
    fun: '參差唸「ㄘㄣ ㄘ」，這個字的讀音數量也很參差：它有四種唸法',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-016', text: '差強人意', target: '差', zhuyin: 'ㄔㄚ',
    distractors: ['ㄔㄚˋ', 'ㄘ'],
    meaning: '大致上還能令人滿意',
    fun: '注意！差強人意是「還不錯」的意思，不是不及格。意思跟讀音一起學起來',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-017', text: '寶藏', target: '藏', zhuyin: 'ㄗㄤˋ',
    distractors: ['ㄘㄤˊ'],
    meaning: '蓄藏的珍貴財物',
    fun: '「寶ㄗㄤˋ男孩」才是標準讀音，雖然大家都唸ㄘㄤˊ',
    tags: ['破音字', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'pp-018', text: '埋怨', target: '埋', zhuyin: 'ㄇㄢˊ',
    distractors: ['ㄇㄞˊ'],
    meaning: '抱怨、責怪',
    fun: '埋怨的埋唸ㄇㄢˊ。把怨氣「埋」起來反而唸錯，中文的小脾氣',
    tags: ['破音字', '日常'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-019', text: '應屆畢業生', target: '應', zhuyin: 'ㄧㄥ',
    distractors: ['ㄧㄥˋ'],
    meaning: '本年度畢業的學生',
    fun: '應屆唸一聲。畢業即失業之前，先把自己的身分唸對',
    tags: ['破音字', '日常'], difficulty: 2, era: 'modern'
  },
  {
    id: 'pp-020', text: '供不應求', target: '應', zhuyin: 'ㄧㄥˋ',
    distractors: ['ㄧㄥ'],
    meaning: '供應趕不上需求',
    fun: '這裡的應是「應付」，唸四聲。演唱會門票的常態',
    tags: ['破音字', '成語', '新聞常錯'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-021', text: '供奉', target: '供', zhuyin: 'ㄍㄨㄥˋ',
    distractors: ['ㄍㄨㄥ'],
    meaning: '敬奉神明或祖先',
    fun: '提供唸一聲，供奉唸四聲。拜拜的時候不要唸錯，神明在聽',
    tags: ['破音字', '日常'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-022', text: '身受重創', target: '創', zhuyin: 'ㄔㄨㄤ',
    distractors: ['ㄔㄨㄤˋ'],
    meaning: '受到嚴重的傷害',
    fun: '創 = 傷口時唸一聲。創業的創才是四聲（雖然創業也常常受重創）',
    tags: ['破音字', '新聞常錯'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-023', text: '處方箋', target: '處', zhuyin: 'ㄔㄨˇ',
    distractors: ['ㄔㄨˋ'],
    meaning: '醫師開立的用藥單',
    fun: '處理、處方都是三聲；處所、辦事處才是四聲。藥師都知道',
    tags: ['破音字', '日常'], difficulty: 3, era: 'modern'
  },
  {
    id: 'pp-024', text: '為虎作倀', target: '為', zhuyin: 'ㄨㄟˋ',
    distractors: ['ㄨㄟˊ'],
    meaning: '幫壞人做壞事',
    fun: '為了誰唸ㄨㄟˋ，成為唸ㄨㄟˊ。幫老虎打工的鬼叫倀，職場寓言',
    tags: ['破音字', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-025', text: '銀行行員', target: '行', zhuyin: 'ㄏㄤˊ',
    distractors: ['ㄒㄧㄥˊ'],
    meaning: '在銀行工作的職員',
    fun: '一個「行」字五種唸法，難怪中文是地獄級語言',
    tags: ['破音字', '日常'], difficulty: 1, era: 'modern'
  },
  {
    id: 'pp-026', text: '道行高深', target: '行', zhuyin: 'ㄏㄥˊ',
    distractors: ['ㄒㄧㄥˊ', 'ㄏㄤˊ'],
    meaning: '修行的功力深厚',
    fun: '道行的行唸ㄏㄥˊ！第五種唸法登場，知道的人道行都很高',
    tags: ['破音字'], difficulty: 5, era: 'classic'
  },
  {
    id: 'pp-027', text: '游說', target: '說', zhuyin: 'ㄕㄨㄟˋ',
    distractors: ['ㄕㄨㄛ'],
    meaning: '用言語勸說別人接受主張',
    fun: '說客唸ㄕㄨㄟˋ客。立法院每天都在上演的字',
    tags: ['破音字', '新聞常錯'], difficulty: 2, era: 'classic'
  },
  {
    id: 'pp-028', text: '寧缺勿濫', target: '寧', zhuyin: 'ㄋㄧㄥˊ',
    distractors: ['ㄋㄧㄥˋ'],
    meaning: '寧可缺少，也不要不合格的',
    fun: '寧可的寧唸二聲。交友軟體滑到麻木的你，記住這四個字',
    tags: ['破音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-029', text: '混水摸魚', target: '混', zhuyin: 'ㄏㄨㄣˊ',
    distractors: ['ㄏㄨㄣˋ'],
    meaning: '趁混亂時撈取利益，或敷衍做事',
    fun: '混水的混唸二聲（同渾）；鬼混的混才是四聲。上班混水摸魚前先學會唸',
    tags: ['破音字', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-030', text: '汗流浹背', target: '浹', zhuyin: 'ㄐㄧㄚˊ',
    distractors: ['ㄐㄧㄚ', 'ㄒㄧㄚˊ'],
    meaning: '汗水濕透背部',
    fun: '夏天沒冷氣教室的集體回憶，浹唸二聲',
    tags: ['易讀錯', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-031', text: '螳臂當車', target: '當', zhuyin: 'ㄉㄤ',
    distractors: ['ㄉㄤˋ'],
    meaning: '不自量力抵擋強大的力量',
    fun: '當 = 阻擋時唸一聲。螳螂：我只是想當網紅',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-032', text: '安步當車', target: '當', zhuyin: 'ㄉㄤˋ',
    distractors: ['ㄉㄤ'],
    meaning: '慢慢走路，當作坐車',
    fun: '這裡的當是「當作」，唸四聲。省下的捷運錢可以買雞排',
    tags: ['破音字', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-033', text: '間不容髮', target: '間', zhuyin: 'ㄐㄧㄢˋ',
    distractors: ['ㄐㄧㄢ'],
    meaning: '情勢危急到極點',
    fun: '間 = 空隙時唸四聲，髮絲都塞不進去的距離，比演唱會搶票還緊張',
    tags: ['破音字', '成語', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'pp-034', text: '畜牧業', target: '畜', zhuyin: 'ㄒㄩˋ',
    distractors: ['ㄔㄨˋ'],
    meaning: '飼養牲畜的產業',
    fun: '畜牧唸ㄒㄩˋ（飼養），牲畜唸ㄔㄨˋ（動物）。養的是動作，被養的是名詞',
    tags: ['破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'pp-035', text: '不省人事', target: '省', zhuyin: 'ㄒㄧㄥˇ',
    distractors: ['ㄕㄥˇ'],
    meaning: '昏迷失去知覺',
    fun: '省 = 知覺、醒悟時唸ㄒㄧㄥˇ。反省也是這個音，現在反省一下自己唸對了沒',
    tags: ['破音字', '成語'], difficulty: 2, era: 'classic'
  }
];
