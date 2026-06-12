/**
 * 錯別字（反考字）— 給語境＋注音，挑出正確的「字」
 * schema 同 tricky.js，多 kind: 'char'：distractors 放形近／常見誤寫「字」而非注音。
 * distractor 不得是該語境也通的字（教育部辭典收錄的異形寫法不可當誘答）。
 * 源起：審查員 Andrea 的 IG 每日一字（fc-001、fc-002），延伸常見錯別字題。
 */
export default [
  {
    id: 'fc-001', kind: 'char', text: '床笫之私', target: '笫', zhuyin: 'ㄗˇ',
    distractors: ['第', '蒂'],
    meaning: '夫妻在臥房裡的私密事',
    fun: '笫是竹編的床墊，跟「第」只差一個點。寫成床第之私，私事直接變公告',
    tags: ['錯別字', '形近字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-002', kind: 'char', text: '治絲益棼', target: '棼', zhuyin: 'ㄈㄣˊ',
    distractors: ['焚', '汾', '棻'],
    meaning: '理絲不找頭緒，反而越理越亂；比喻方法不對，越做越糟',
    fun: '棼是紛亂，焚是燒掉。寫成治絲益焚，絲沒理好還起火，更慘',
    tags: ['錯別字', '形近字', '成語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'fc-003', kind: 'char', text: '罄竹難書', target: '罄', zhuyin: 'ㄑㄧㄥˋ',
    distractors: ['磬', '馨'],
    meaning: '罪狀多到把竹簡用光也寫不完',
    fun: '罄是用盡，磬是石頭做的樂器。寫錯就變成「敲樂器寫不完」，畫面很奇怪',
    tags: ['錯別字', '形近字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-004', kind: 'char', text: '病入膏肓', target: '肓', zhuyin: 'ㄏㄨㄤ',
    distractors: ['盲', '育'],
    meaning: '病情嚴重到無法醫治',
    fun: '肓是心臟下方的部位，盲是眼睛看不見。病入膏「盲」是全台灣最流行的錯字之一',
    tags: ['錯別字', '形近字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-005', kind: 'char', text: '飲鴆止渴', target: '鴆', zhuyin: 'ㄓㄣˋ',
    distractors: ['鳩', '鵲'],
    meaning: '喝毒酒解渴；比喻只顧眼前，用有害的方法救急',
    fun: '鴆是毒鳥，鳩是斑鳩。寫成飲鳩止渴，就只是把一隻無辜的鳥喝掉',
    tags: ['錯別字', '形近字', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-006', kind: 'char', text: '如火如荼', target: '荼', zhuyin: 'ㄊㄨˊ',
    distractors: ['茶', '塗'],
    meaning: '像火一樣紅、像荼花一樣白；形容氣勢旺盛熱烈',
    fun: '荼比茶多一橫。寫成如火如茶，活動再熱也被一壺茶澆熄',
    tags: ['錯別字', '形近字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-007', kind: 'char', text: '火中取栗', target: '栗', zhuyin: 'ㄌㄧˋ',
    distractors: ['粟', '慄'],
    meaning: '替別人冒險出力，自己卻一無所得',
    fun: '栗是栗子，粟是小米。猴子騙貓從火裡撿的是栗子，沒人會為一粒小米冒險',
    tags: ['錯別字', '形近字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-008', kind: 'char', text: '鬼鬼祟祟', target: '祟', zhuyin: 'ㄙㄨㄟˋ',
    distractors: ['崇', '祿'],
    meaning: '行動偷偷摸摸，不光明正大',
    fun: '祟是出＋示（鬼怪出來搞事），崇是山＋宗（高大受尊敬）。寫成鬼鬼崇崇是在崇拜鬼嗎',
    tags: ['錯別字', '形近字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-009', kind: 'char', text: '見面寒暄', target: '暄', zhuyin: 'ㄒㄩㄢ',
    distractors: ['喧', '宣'],
    meaning: '見面時互相問候、閒聊家常',
    fun: '暄是日字旁（問冷暖），喧是口字旁（大聲吵）。寒喧就從問候變成吵架了',
    tags: ['錯別字', '形近字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-010', kind: 'char', text: '一籌莫展', target: '籌', zhuyin: 'ㄔㄡˊ',
    distractors: ['愁', '疇'],
    meaning: '一點辦法也想不出來',
    fun: '籌是計策（竹字頭的籌碼），愁是煩惱。一愁莫展雖然心情很對，但字是錯的',
    tags: ['錯別字', '形近字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-011', kind: 'char', text: '再接再厲', target: '厲', zhuyin: 'ㄌㄧˋ',
    distractors: ['勵', '歷'],
    meaning: '一次又一次繼續努力',
    fun: '厲原指磨刀（公雞鬥前先磨喙）。寫成再接再勵超直覺，但教育部說：錯',
    tags: ['錯別字', '形近字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-012', kind: 'char', text: '默默無聞', target: '默', zhuyin: 'ㄇㄛˋ',
    distractors: ['墨', '寞'],
    meaning: '沒有名氣，不被人知道',
    fun: '默是犬字旁（狗安靜不叫），墨是寫字的墨。墨墨無聞是被墨汁淹到沒聲音嗎',
    tags: ['錯別字', '形近字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-013', kind: 'char', text: '食不果腹', target: '果', zhuyin: 'ㄍㄨㄛˇ',
    distractors: ['裹', '過'],
    meaning: '吃不飽肚子，形容生活窮困',
    fun: '果是充實（果腹＝填飽），裹是包起來。食不裹腹是吃完不打包的意思嗎',
    tags: ['錯別字', '形近字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-014', kind: 'char', text: '濫竽充數', target: '竽', zhuyin: 'ㄩˊ',
    distractors: ['芋', '宇'],
    meaning: '沒本領的人混在行家中充數',
    fun: '竽是竹字頭的樂器，芋是草字頭的芋頭。南郭先生吹的是竽，不是拿芋頭充數',
    tags: ['錯別字', '形近字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-015', kind: 'char', text: '世外桃源', target: '源', zhuyin: 'ㄩㄢˊ',
    distractors: ['園', '緣'],
    meaning: '與世隔絕、安樂美好的理想境地',
    fun: '源是水源（陶淵明沿著溪水找到的），園是果園。桃花園只是種桃子的農場',
    tags: ['錯別字', '形近字', '成語'], difficulty: 1, era: 'classic'
  },
  {
    id: 'fc-016', kind: 'char', text: '川流不息', target: '川', zhuyin: 'ㄔㄨㄢ',
    distractors: ['穿', '串'],
    meaning: '像河水一樣連續不斷',
    fun: '川是河流，三筆就是三條水。穿流不息感覺是人潮一直穿來穿去，可惜是錯的',
    tags: ['錯別字', '形近字', '成語'], difficulty: 1, era: 'classic'
  },
  {
    id: 'fc-017', kind: 'char', text: '戊戌變法', target: '戌', zhuyin: 'ㄒㄩ',
    distractors: ['戊', '戍'],
    meaning: '清末光緒年間的維新變法（戊戌年）',
    fun: '戊戌戍三胞胎：橫戌（ㄒㄩ）、點戍（ㄕㄨˋ）、戊（ㄨˋ）中空。歷史課本的地獄級考點',
    tags: ['錯別字', '形近字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-018', kind: 'char', text: '蛛絲馬跡', target: '馬', zhuyin: 'ㄇㄚˇ',
    distractors: ['螞', '瑪'],
    meaning: '細微的線索與痕跡',
    fun: '原指灶馬蟲爬過的痕跡，但教育部標準寫法就是「馬」。寫成蛛絲螞跡反而出局',
    tags: ['錯別字', '形近字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-019', kind: 'char', text: '美輪美奐', target: '輪', zhuyin: 'ㄌㄨㄣˊ',
    distractors: ['倫', '侖'],
    meaning: '形容建築物高大華美',
    fun: '輪是高大（輪囷），人字旁的倫是倫理。房子蓋得美倫美奐，是很有道德的房子嗎',
    tags: ['錯別字', '形近字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-020', kind: 'char', text: '待價而沽', target: '沽', zhuyin: 'ㄍㄨ',
    distractors: ['估', '咕'],
    meaning: '等待好價錢才賣出；比喻等待時機才出仕或行動',
    fun: '沽是水字旁（買賣），估是人字旁（估價）。待價而估是站在旁邊一直估價不買',
    tags: ['錯別字', '形近字', '成語'], difficulty: 3, era: 'classic'
  }
];
