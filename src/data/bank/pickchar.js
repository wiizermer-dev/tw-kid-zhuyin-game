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
  },
  {
    id: 'fc-021', kind: 'char', text: '不脛而走', target: '脛', zhuyin: 'ㄐㄧㄥˋ',
    distractors: ['徑', '勁'],
    meaning: '沒有腿卻能跑，比喻消息傳布迅速、不用刻意宣傳就到處流傳。',
    fun: '「脛」是小腿那段骨頭，成語的梗就是「沒長腳卻會跑」。記者最愛寫成「不徑而走」，但「徑」是小路，跟跑不跑沒關係。',
    tags: ['新聞常見錯字', '成語', '形近'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-022', kind: 'char', text: '委曲求全', target: '曲', zhuyin: 'ㄑㄩ',
    distractors: ['屈', '屬'],
    meaning: '勉強遷就、忍受委屈，以求保全大局。',
    fun: '這裡是「委曲」不是「委屈」喔。雖然意思相近又超常被混用，但成語的本字是「曲」(曲折求全)，新聞稿十次有八次打成「委屈求全」。',
    tags: ['新聞常見錯字', '成語', '音近'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-023', kind: 'char', text: '甘拜下風', target: '拜', zhuyin: 'ㄅㄞˋ',
    distractors: ['敗', '拌'],
    meaning: '真心佩服對方、自認不如。',
    fun: '是「拜」不是「敗」！輸了甘心去拜服對方才叫甘拜下風，寫成「甘敗下風」是全台最高頻錯字之一，連大報都中招。',
    tags: ['新聞常見錯字', '成語', '音近'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-024', kind: 'char', text: '一炷香', target: '炷', zhuyin: 'ㄓㄨˋ',
    distractors: ['柱', '注'],
    meaning: '燃香的量詞，一支香叫一炷。',
    fun: '拜拜新聞常出包：是「炷」不是「柱」。炷有火字旁，因為香是要點燃的；柱子的柱是木頭的柱，撐房子用的。',
    tags: ['新聞常見錯字', '量詞', '形近'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-025', kind: 'char', text: '嶄露頭角', target: '嶄', zhuyin: 'ㄓㄢˇ',
    distractors: ['展', '斬'],
    meaning: '才能傑出、開始顯露出超越眾人的本領。',
    fun: '「嶄」念ㄓㄢˇ，本義是山勢高峻，引申為突出。常被寫成「展露頭角」，雖然展也念ㄓㄢˇ又有顯露意，但成語定本是「嶄」。',
    tags: ['新聞常見錯字', '成語', '音近'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-026', kind: 'char', text: '變本加厲', target: '厲', zhuyin: 'ㄌㄧˋ',
    distractors: ['勵', '利', '歷'],
    meaning: '指原本就壞，後來變得更厲害、更嚴重。',
    fun: '「厲」是兇猛、更甚的意思，跟「鼓勵」的勵八竿子打不著。很多人寫成「變本加勵」，但這成語沒有正能量，是越來越糟，別給它打氣。',
    tags: ['成語', '錯別字', '會考常考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-027', kind: 'char', text: '出類拔萃', target: '萃', zhuyin: 'ㄘㄨㄟˋ',
    distractors: ['粹', '瘁', '悴'],
    meaning: '形容才能超出同類，特別傑出。',
    fun: '「萃」是草字頭，本義是草叢、聚集的人群，拔出於萃就是從一群人裡冒尖。寫成「拔粹」（米字邊純粹的粹）超常見，但那是純度，不是人群。',
    tags: ['成語', '錯別字', '形近字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-028', kind: 'char', text: '墨守成規', target: '墨', zhuyin: 'ㄇㄛˋ',
    distractors: ['默', '莫', '摹'],
    meaning: '固執守著舊規矩、不知變通。',
    fun: '這個「墨」其實是人名——戰國墨子守城超強，後人用「墨守」比喻死守。寫成「默守成規」的人以為是默默遵守，其實典故是墨家守城啦。',
    tags: ['成語', '錯別字', '典故'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-029', kind: 'char', text: '張口結舌', target: '結', zhuyin: 'ㄐㄧㄝˊ',
    distractors: ['接', '潔', '截'],
    meaning: '形容理屈或緊張到說不出話。',
    fun: '「結舌」是舌頭打結講不出話，所以用「結」。常被寫成「張口接舌」，但舌頭不是接上去的，是緊張到打結了。',
    tags: ['成語', '錯別字', '音近字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-030', kind: 'char', text: '陳腔濫調', target: '濫', zhuyin: 'ㄌㄢˋ',
    distractors: ['爛', '氾', '藍'],
    meaning: '指陳舊、毫無新意的老套言論。',
    fun: '「濫」是水字旁的氾濫，引申為過多、不實在。常被寫成「陳腔爛調」（火字邊的爛），但這裡講的是話講到氾濫成災，不是爛掉。',
    tags: ['成語', '錯別字', '形近字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-031', kind: 'char', text: '敬請查照', target: '查', zhuyin: 'ㄔㄚˊ',
    distractors: ['察'],
    meaning: '公文用語，請對方知悉並依內容辦理。「查照」是「查明知照」，請對方核對相關事項後依此辦理。',
    fun: '公文裡最常見的結尾語之一。很多人寫成「察照」，但正字是「查」——查明、查核的查，不是觀察的察。一字之差，公文老手一眼就看出你是不是新手。',
    tags: ['公文', '查照', '錯別字', '正式文書'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-032', kind: 'char', text: '惠予協助', target: '惠', zhuyin: 'ㄏㄨㄟˋ',
    distractors: ['慧', '穗'],
    meaning: '公文書信敬語，請對方給予恩惠、幫忙。「惠予」即「給予恩惠」，是請託時的客氣說法。',
    fun: '「惠」是恩惠、給好處的意思，跟智慧的「慧」差很多。公文「惠予」「惠存」「惠覽」滿天飛，寫成「慧予」就鬧笑話了——不是要對方拿智慧出來，是請對方賞個方便。',
    tags: ['公文', '敬語', '惠予', '錯別字'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-033', kind: 'char', text: '如蒙俯允', target: '俯', zhuyin: 'ㄈㄨˇ',
    distractors: ['撫', '府'],
    meaning: '書信敬語，意思是「如果承蒙您俯身答應、屈尊准許」。下對上請求時用，表示對方高高在上願意低頭應允。',
    fun: '「俯允」的俯是低頭、彎腰，把上位者想成站很高、願意俯身點頭答應你。常被寫成「撫允」(撫摸?)或「府允」。記住：是請對方「低頭」說好，不是摸你或開府。',
    tags: ['書信', '敬語', '俯允', '錯別字'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-034', kind: 'char', text: '屆時請務必出席', target: '屆', zhuyin: 'ㄐㄧㄝˋ',
    distractors: ['界', '屇'],
    meaning: '到了那個時候。「屆」是「到、及」的意思，「屆時」就是到時候。',
    fun: '開會通知最愛寫「屆時」，很多人手滑寫成「界時」——但界是邊界的界，跟時間沒關係。屆是「到達」的到，屆時=到時，屆滿=到期。下次寫通知別再越「界」了。',
    tags: ['公文', '通知', '屆時', '錯別字'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-035', kind: 'char', text: '謹此函覆', target: '覆', zhuyin: 'ㄈㄨˋ',
    distractors: ['復', '複'],
    meaning: '鄭重地以書信回覆對方。「函覆」即以公函回覆。',
    fun: '公文回信講「函覆」，這個覆是回答、答覆的覆(上面一個西)。常跟「復」「複」混。簡單記：答覆、回覆、批覆都用這個覆；複習、複雜才用衣字旁的複。公文界對這字超敏感。',
    tags: ['公文', '函覆', '錯別字', '正式文書'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-036', kind: 'char', text: '檢具相關文件', target: '檢', zhuyin: 'ㄐㄧㄢˇ',
    distractors: ['撿', '儉'],
    meaning: '公文用語，附上、備齊相關文件。「檢具」即「檢附備齊」，常用於「檢具證明文件」。',
    fun: '公文說「檢具」「檢附」，這個檢是木字旁，檢查、檢驗的檢。常被寫成提手旁的「撿」(撿東西)。記住：公文附文件是「檢附」不是「撿附」——你不是在路邊撿文件給長官。',
    tags: ['公文', '檢具', '錯別字', '正式文書'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-037', kind: 'char', text: '懇請鼎力相助', target: '鼎', zhuyin: 'ㄉㄧㄥˇ',
    distractors: ['頂', '鼑'],
    meaning: '請對方大力幫忙。「鼎力」是敬辭，比喻對方力量像鼎一樣重、一樣大，用於請託他人時。',
    fun: '「鼎力相助」的鼎是三足大鍋那個鼎，象徵分量重、力量大，是抬舉對方的客套話。常被寫成「頂力」(用頭頂?)。注意：鼎力只能對別人說，不能說「我鼎力幫你」——那是自己往臉上貼金。',
    tags: ['書信', '敬語', '鼎力', '錯別字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-038', kind: 'char', text: '本案業已辦理完竣', target: '竣', zhuyin: 'ㄐㄩㄣˋ',
    distractors: ['峻', '俊'],
    meaning: '事情已經辦理完成。「完竣」即完成、竣工的意思，「竣」是事情做完。',
    fun: '公文最後常寫「辦理完竣」，竣是立字旁，完工、結束的意思(竣工就是這個竣)。常被寫成山字旁的「峻」(險峻)或人字旁的「俊」(英俊)。三胞胎只差偏旁：事情做完是立著的竣，不是又高又陡的峻。',
    tags: ['公文', '完竣', '錯別字', '正式文書'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-039', kind: 'char', text: '乾麵加滷蛋', target: '乾', zhuyin: 'ㄍㄢ',
    distractors: ['干', '幹'],
    meaning: '不加湯的麵，瀝乾湯汁後拌醬料',
    fun: '麵攤招牌十之八九寫成「干麵」。干是盾牌/天干，乾才是沒水分。寫干麵其實是簡體借過來的習慣',
    tags: ['錯別字', '形近字', '菜單'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-040', kind: 'char', text: '一碗滷味', target: '滷', zhuyin: 'ㄌㄨˇ',
    distractors: ['魯', '鹵'],
    meaning: '用醬油、香料慢煮入味的小吃',
    fun: '全台灣最大宗的招牌錯字之一：滷味寫成「魯味」。魯是山東/魯鈍，滷才有水(氵)能煮。連鎖店招牌也常掛錯',
    tags: ['錯別字', '形近字', '菜單'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-041', kind: 'char', text: '蚵仔煎', target: '蚵', zhuyin: 'ㄜˊ',
    distractors: ['蠔', '顆', '呵'],
    meaning: '牡蠣裹粉漿香煎，淋甜辣醬的台式小吃',
    fun: '夜市第一名小吃，台語唸 ô-á-tsian。蚵就是牡蠣(蟲字旁)，常被寫成廣東的「蠔」或數量的「顆」。注音ㄜˊ更是很多人不知道',
    tags: ['錯別字', '形近字', '菜單'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-042', kind: 'char', text: '蘿蔔糕', target: '蔔', zhuyin: 'ㄅㄛ˙',
    distractors: ['葡', '蔥', '葫'],
    meaning: '白蘿蔔刨絲混米漿蒸成的粄狀糕點',
    fun: '蘿蔔的蔔輕聲ㄅㄛ˙，常被寫成葡萄的「葡」。差別在上面：蔔是艮、葡是匍。寫蘿葡糕等於把菜頭變成葡萄',
    tags: ['錯別字', '形近字', '菜單'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-043', kind: 'char', text: '碗粿淋醬', target: '粿', zhuyin: 'ㄍㄨㄛˇ',
    distractors: ['棵', '果', '稞'],
    meaning: '在來米漿蒸進碗裡，加肉燥香菇的鹹點',
    fun: '粿是米字旁(米做的)，常被寫成一棵樹的「棵」或水果的「果」。台語 kué/ké，發粿、紅龜粿全是這個粿',
    tags: ['錯別字', '形近字', '菜單'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-044', kind: 'char', text: '麻糬一盒', target: '糬', zhuyin: 'ㄕㄨˇ',
    distractors: ['薯', '署', '糍'],
    meaning: '糯米搗成的軟Q甜點，常裹花生粉或包餡',
    fun: '糬是米字旁(糯米做)，常被寫成番薯的「薯」或警察署的「署」。麻薯=拿地瓜亂入。台語 muâ-tsî 也寫作麻糍',
    tags: ['錯別字', '形近字', '菜單'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-045', kind: 'char', text: '不勝唏噓', target: '噓', zhuyin: 'ㄒㄩ',
    distractors: ['嘘', '虛', '吁'],
    meaning: '形容感慨萬千、忍不住歎息的樣子。',
    fun: '網路留言最常打成「不勝唏虛」，但這個感嘆的字是『口』字旁的『噓』，跟噓聲同一個字；『虛』是空虛沒嘴巴，差很多。',
    tags: ['net_slang', 'common_typo', 'emotion'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-046', kind: 'char', text: '博取版面', target: '博', zhuyin: 'ㄅㄛˊ',
    distractors: ['搏', '愽', '摶'],
    meaning: '用某種手段去換取、贏得（版面、同情、關注）。',
    fun: '社群常寫成「搏取版面」，但『博』是換取、求取（博君一笑），手字旁的『搏』是搏鬥、肉搏，要動手才用它。',
    tags: ['net_slang', 'common_typo', 'media'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-047', kind: 'char', text: '鼎鼎大名', target: '鼎', zhuyin: 'ㄉㄧㄥˇ',
    distractors: ['頂', '鈤', '鼑'],
    meaning: '形容名氣非常大、人人皆知。',
    fun: '打字常被選成「頂頂大名」，聽起來好像也通，但成語正字是那個三隻腳的古代大鍋『鼎』，取『盛大』之意，不是頂尖的頂。',
    tags: ['net_slang', 'common_typo', 'idiom'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-048', kind: 'char', text: '一如既往', target: '既', zhuyin: 'ㄐㄧˋ',
    distractors: ['即', '繼', '暨'],
    meaning: '完全跟以前一樣，沒有改變。',
    fun: '留言區常見「一如即往」，但這裡是『既然、已經』的『既』（表示過去），不是『立即』的『即』；兩個字長超像，右半邊一個是『旡』一個是『卩』。',
    tags: ['net_slang', 'common_typo', 'idiom'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-049', kind: 'char', text: '始作俑者', target: '俑', zhuyin: 'ㄩㄥˇ',
    distractors: ['甬', '勇', '踴'],
    meaning: '指第一個做壞事、開先例的人，帶貶義。',
    fun: '鄉民愛用這詞罵帶頭的人，但常掉了人字旁寫成『甬』。『俑』是古代陪葬的木偶人（兵馬俑那個俑），孔子說『始作俑者，其無後乎』，罵的就是發明用人偶陪葬的人。',
    tags: ['net_slang', 'common_typo', 'idiom'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-050', kind: 'char', text: '明察秋毫', target: '毫', zhuyin: 'ㄏㄠˊ',
    distractors: ['豪', '亳', '嚎'],
    meaning: '形容眼光銳利，連極細微的事物都看得一清二楚。',
    fun: '打字常變『明察秋豪』，但『毫』是毫毛、秋天鳥獸新長的細毛（秋毫），下面是『毛』；『豪』下面是『豕』（豬），是豪傑、土豪，差一隻豬。',
    tags: ['net_slang', 'common_typo', 'idiom'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-051', kind: 'char', text: '出爾反爾', target: '爾', zhuyin: 'ㄦˇ',
    distractors: ['而', '耳', '邇'],
    meaning: '形容人說話不算話、反覆無常、前後矛盾。',
    fun: '留言罵人時超常打成『出而反而』，但這兩個字是『爾』（你、如此的意思，出自孟子「出乎爾者，反乎爾者」），不是連接詞的『而』，發音一樣但長得不一樣。',
    tags: ['net_slang', 'common_typo', 'idiom'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-052', kind: 'char', text: '自食其力', target: '自', zhuyin: 'ㄗˋ',
    distractors: ['咎', '就'],
    meaning: '靠自己的勞力生活，不依賴別人',
    fun: '自是自己，咎是「咎由自取」的咎。兩個都念ㄗˋ又都跟「自己」沾邊，常被混寫成「咎食其力」變成靠罪過吃飯',
    tags: ['錯別字', '同音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-053', kind: 'char', text: '不計其數', target: '計', zhuyin: 'ㄐㄧˋ',
    distractors: ['記', '績'],
    meaning: '數量多到無法計算',
    fun: '計是計算，記是記錄。兩個都念ㄐㄧˋ，但「不記其數」變成「沒記下數量」，跟「算不完」差很多',
    tags: ['錯別字', '同音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-054', kind: 'char', text: '迫不及待', target: '及', zhuyin: 'ㄐㄧˊ',
    distractors: ['急', '即'],
    meaning: '急切得無法再等待',
    fun: '及是「來不及」的及，急是著急。被急切的語感帶歪寫成「迫不急待」是排行榜常勝錯字，但正字是來不「及」',
    tags: ['錯別字', '同音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-055', kind: 'char', text: '莫名其妙', target: '名', zhuyin: 'ㄇㄧㄥˊ',
    distractors: ['明', '鳴'],
    meaning: '沒有人能說明白其中的奧妙；形容事情怪得難以理解',
    fun: '莫名是「沒辦法說出名稱」的名，明是明白。兩個都念ㄇㄧㄥˊ，「莫明其妙」是高頻錯字，但正字其實是說不出「名」',
    tags: ['錯別字', '同音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-056', kind: 'char', text: '好高騖遠', target: '騖', zhuyin: 'ㄨˋ',
    distractors: ['鶩', '務'],
    meaning: '一味追求過高過遠的目標，不切實際',
    fun: '騖是馬字旁（縱馬奔馳），鶩是鳥（野鴨，趨之若鶩才用牠）。好高騖遠是馬一直往遠跑，不是養一群鴨',
    tags: ['錯別字', '形近字', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-057', kind: 'char', text: '鳩佔鵲巢', target: '鵲', zhuyin: 'ㄑㄩㄝˋ',
    distractors: ['雀', '鶴'],
    meaning: '強佔別人的住所或位置',
    fun: '鵲是喜鵲（會築巢的），雀是麻雀。被斑鳩佔走窩的是辛苦蓋巢的喜鵲，可憐的麻雀表示這鍋我不背',
    tags: ['錯別字', '形近字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-058', kind: 'char', text: '大雜燴', target: '燴', zhuyin: 'ㄏㄨㄟˋ',
    distractors: ['膾', '繪'],
    meaning: '把多種菜混在一起煮的菜；比喻把雜七雜八的東西湊在一起',
    fun: '燴是火字旁（用火煮的料理），膾是肉字旁（切細的生肉，膾炙人口才用牠），繪是糸字旁（畫圖）。寫成大雜繪，菜就變成一幅畫了',
    tags: ['錯別字', '形近字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-059', kind: 'char', text: '言簡意賅', target: '賅', zhuyin: 'ㄍㄞ',
    distractors: ['該', '駭'],
    meaning: '話講得簡短，意思卻很完整',
    fun: '賅是貝字旁（完備、齊全），該是言字旁，駭是馬字旁（驚嚇）。言簡意賅是內容齊全，寫成言簡意駭就變成講話嚇到人了',
    tags: ['錯別字', '形近字', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-060', kind: 'char', text: '贗品', target: '贗', zhuyin: 'ㄧㄢˋ',
    distractors: ['膺', '鷹'],
    meaning: '假造的東西，仿冒的物品',
    fun: '贗下面是貝（跟錢財買賣有關），膺是肉字旁（義憤填膺的膺），鷹是鳥。三個字上半部都像「鴈」，但只有貝字底的贗才是假貨',
    tags: ['錯別字', '形近字'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-061', kind: 'char', text: '一樁心事', target: '樁', zhuyin: 'ㄓㄨㄤ',
    distractors: ['椿', '莊'],
    meaning: '計算事情、案件的量詞；一樁心事即一件心事',
    fun: '樁是木字旁打進土裡的木「樁」，唸ㄓㄨㄤ；椿是香椿那種樹唸ㄔㄨㄣ。一樁買賣、一樁命案都用這個，別寫成椿',
    tags: ['錯別字', '量詞', '形近字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-062', kind: 'char', text: '蜿蜒的長城', target: '蜒', zhuyin: 'ㄧㄢˊ',
    distractors: ['延', '蜓'],
    meaning: '蜿蜒形容像蛇一樣彎彎曲曲地延伸',
    fun: '蜿蜒兩字都是虫字旁(蛇彎來彎去)。常被寫成只剩半邊的蜿延，或跟蜻蜓的蜓搞混。蜿蜒和蜻蜓差一橫',
    tags: ['錯別字', '形近字'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-063', kind: 'char', text: '嵩山少林寺', target: '嵩', zhuyin: 'ㄙㄨㄥ',
    distractors: ['崇', '蒿'],
    meaning: '嵩山，五嶽中的中嶽，在河南，少林寺所在地',
    fun: '嵩山的嵩是山在上、高在下唸ㄙㄨㄥ。崇拜的崇是山字頭唸ㄔㄨㄥˊ，兩個超容易寫反。中嶽嵩山別寫成崇山',
    tags: ['錯別字', '專有名詞', '形近字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-064', kind: 'char', text: '台灣海峽', target: '峽', zhuyin: 'ㄒㄧㄚˊ',
    distractors: ['狹', '夾', '俠'],
    meaning: '海峽，兩塊陸地之間狹窄的海域',
    fun: '海峽的峽是山字旁(兩岸都是山夾著水)唸ㄒㄧㄚˊ。狹窄的狹是犬字旁、武俠的俠是人字旁。台灣海峽別寫成海狹',
    tags: ['錯別字', '專有名詞', '形近字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-065', kind: 'char', text: '九寨溝', target: '寨', zhuyin: 'ㄓㄞˋ',
    distractors: ['塞', '寒'],
    meaning: '九寨溝，四川著名風景區，名字源於溝內九個藏族村寨',
    fun: '九寨溝的寨是村寨、營寨那個寨唸ㄓㄞˋ，下面是木。塞車的塞下面是土、寒冷的寒下面是兩點，三個長超像。去九寨溝別買成九塞溝的票',
    tags: ['錯別字', '專有名詞', '形近字'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-066', kind: 'char', text: '麥當勞', target: '勞', zhuyin: 'ㄌㄠˊ',
    distractors: ['撈', '嘮'],
    meaning: '麥當勞，知名速食連鎖品牌的中文譯名',
    fun: '麥當勞官方就是用辛勞的「勞」唸ㄌㄠˊ。手字旁的撈是打撈、口字旁的嘮是嘮叨，招牌可不能寫成麥當撈',
    tags: ['錯別字', '專有名詞', '形近字'], difficulty: 1, era: 'modern'
  },
  {
    id: 'fc-067', kind: 'char', text: '自怨自艾', target: '艾', zhuyin: 'ㄧˋ',
    distractors: ['哀', '唉'],
    meaning: '悔恨自己的過錯，自我責備（艾是治理、改正之意）',
    fun: '這裡的艾唸ㄧˋ不是ㄞˋ，意思是「改正」。很多人寫成自怨自哀，順了悲傷的感覺卻錯了字也錯了音',
    tags: ['錯別字', '形近字', '成語', '新聞常見錯字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-068', kind: 'char', text: '嘔心瀝血', target: '嘔', zhuyin: 'ㄡˇ',
    distractors: ['漚', '歐'],
    meaning: '費盡心思與精力；形容極度辛勞',
    fun: '嘔是口字旁（把心都吐出來那麼拚），漚是水字旁（東西泡到爛）。寫成「漚心瀝血」，心都泡爛了還寫什麼',
    tags: ['錯別字', '形近字', '成語', '新聞常見錯字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-069', kind: 'char', text: '趨之若鶩', target: '鶩', zhuyin: 'ㄨˋ',
    distractors: ['騖', '鵝'],
    meaning: '像鴨子般成群跑過去；比喻很多人爭相追逐（多含貶義）',
    fun: '鶩是鴨子（下面是鳥），騖是奔馳（下面是馬）。好多人寫成「趨之若騖」，但教育部標準是那隻鴨',
    tags: ['錯別字', '形近字', '成語', '新聞常見錯字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-070', kind: 'char', text: '弱不禁風', target: '禁', zhuyin: 'ㄐㄧㄣ',
    distractors: ['經', '勁'],
    meaning: '身體虛弱到連風吹都受不了',
    fun: '這裡的禁唸ㄐㄧㄣ（陰平），是「承受得起」的意思，不是禁止的ㄐㄧㄣˋ。寫成「弱不經風」音對字錯，最容易中招',
    tags: ['錯別字', '形近字', '成語', '新聞常見錯字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-071', kind: 'char', text: '殺手鐧', target: '鐧', zhuyin: 'ㄐㄧㄢˋ',
    distractors: ['鋼', '簡'],
    meaning: '最後關頭使出的決勝絕招（鐧是古代一種無刃鐵兵器）',
    fun: '鐧是金字旁的兵器（中間是「間」），不是煉成鋼的鋼。新聞寫成「殺手鐧」很潮，但常被誤打成殺手鋼',
    tags: ['錯別字', '形近字', '新聞常見錯字'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-072', kind: 'char', text: '出人頭地', target: '地', zhuyin: 'ㄉㄧˋ',
    distractors: ['第', '弟'],
    meaning: '才能或成就超過眾人，顯露出眾',
    fun: '出人頭「地」是冒出地面、高人一等。很多人腦補成考第一名寫成「出人頭第」，其實跟名次無關',
    tags: ['錯別字', '音近字', '成語', '會考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-073', kind: 'char', text: '孤注一擲', target: '擲', zhuyin: 'ㄓˊ',
    distractors: ['躑', '鄭', '擢'],
    meaning: '把所有賭注一次押上，比喻冒險拚一把',
    fun: '擲是用手丟，提手旁唸ㄓˊ。換成足字旁的「躑」就跑去躑躅徘徊，賭桌都翻了還在原地踏步',
    tags: ['錯別字', '形近字', '成語', '會考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-074', kind: 'char', text: '汗流浹背', target: '浹', zhuyin: 'ㄐㄧㄚˊ',
    distractors: ['夾', '挾', '狹'],
    meaning: '汗多到濕透背部，形容極度炎熱或緊張',
    fun: '浹是濕透、沾滿，水字旁唸ㄐㄧㄚˊ。寫成汗流「夾」背少了那灘水，背反而乾乾的',
    tags: ['錯別字', '形近字', '成語', '學測'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-075', kind: 'char', text: '敬請查照辦理', target: '照', zhuyin: 'ㄓㄠˋ',
    distractors: ['昭', '招'],
    meaning: '公文用語，請對方知悉並依此處理。「查照」是請收文者了解情形並參照辦理的客套語。',
    fun: '公文「查照」超常被寫成「查昭」。昭是昭告天下的昭(ㄓㄠ)，照才是按照、依照。記法：你要對方「按照」做，不是「昭告」。',
    tags: ['公文', '錯別字', '公文用語'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-076', kind: 'char', text: '謹致歉意', target: '謹', zhuyin: 'ㄐㄧㄣˇ',
    distractors: ['僅', '勤'],
    meaning: '恭敬慎重地（表達歉意）。書信中「謹」表示恭敬鄭重的態度。',
    fun: '「謹致歉意」常被打成「僅致歉意」——僅是只有的意思(ㄐㄧㄣˇ同音)，會變成「只表達歉意」少了恭敬味。謹=言字旁，講話謹慎。',
    tags: ['書信', '錯別字', '敬語'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-077', kind: 'char', text: '迄今未復', target: '迄', zhuyin: 'ㄑㄧˋ',
    distractors: ['訖', '屹'],
    meaning: '到現在（還沒回覆）。「迄今」即截至今日。',
    fun: '「迄今」跟「驗訖」的訖長超像。迄(ㄑㄧˋ)是到、至，走之底；訖是言字旁，用在「收訖」「驗訖」表示完結。公文兩個都常出現，超容易混。',
    tags: ['公文', '錯別字', '形近字'], difficulty: 4, era: 'modern'
  },
  {
    id: 'fc-078', kind: 'char', text: '謹此奉告', target: '奉', zhuyin: 'ㄈㄥˋ',
    distractors: ['俸', '捧'],
    meaning: '恭敬地告知。「奉告」是謙敬地相告。',
    fun: '「奉告」不是「俸告」。俸是薪俸的俸(ㄈㄥˋ同音)，加人字旁；捧是用手捧。書信裡恭敬地「奉上」「奉告」，就是這個沒偏旁的奉。',
    tags: ['書信', '錯別字', '敬語'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-079', kind: 'char', text: '概不退換', target: '概', zhuyin: 'ㄍㄞˋ',
    distractors: ['慨', '蓋'],
    meaning: '一律、全部都（不退換）。「概不」表示一概、全部都不。',
    fun: '店家公告「概不退換」常被寫成「慨不退換」。概(ㄍㄞˋ)是一概、大概，木字旁；慨是慷慨、感慨，豎心旁。「慷慨」是大方給人，跟「一概不退」剛好反過來。',
    tags: ['公告', '錯別字', '形近字'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-080', kind: 'char', text: '餛飩', target: '餛', zhuyin: 'ㄏㄨㄣˊ',
    distractors: ['混', '渾', '鯤'],
    meaning: '薄皮包肉餡的湯點，南方叫雲吞',
    fun: '餛是食字旁（讀ㄏㄨㄣˊ），招牌常寫成「混飩」少了食字旁。沒食字旁就只是一鍋混亂的湯',
    tags: ['錯別字', '菜單', '形近字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-081', kind: 'char', text: '豆漿', target: '漿', zhuyin: 'ㄐㄧㄤ',
    distractors: ['槳', '獎', '醬'],
    meaning: '黃豆磨成的飲品，早餐配燒餅油條',
    fun: '漿是水字旁的濃汁（讀ㄐㄧㄤ），招牌常寫成木字旁的「槳」（划船的槳）。喝豆槳會卡喉嚨',
    tags: ['錯別字', '菜單', '形近字'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-082', kind: 'char', text: '鍋貼', target: '鍋', zhuyin: 'ㄍㄨㄛ',
    distractors: ['渦', '堝', '蝸'],
    meaning: '長條形煎餃，底部煎得金黃酥脆',
    fun: '鍋是金字旁的炊具（讀ㄍㄨㄛ），手寫招牌常掉金字旁寫成「渦貼」。水字旁的渦是漩渦，貼不出脆底',
    tags: ['錯別字', '菜單', '形近字'], difficulty: 2, era: 'modern'
  },
  {
    id: 'fc-083', kind: 'char', text: '鱔魚意麵', target: '鱔', zhuyin: 'ㄕㄢˋ',
    distractors: ['膳', '繕', '善'],
    meaning: '台南名菜，鱔魚快炒勾芡淋意麵',
    fun: '鱔是魚字旁的黃鱔（讀ㄕㄢˋ），招牌常寫成肉字旁的「膳魚」（膳是飯菜）。少了魚就沒那條鱔',
    tags: ['錯別字', '菜單', '形近字'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-084', kind: 'char', text: '不容置喙', target: '喙', zhuyin: 'ㄏㄨㄟˋ',
    distractors: ['啄', '緣', '椽'],
    meaning: '不容許別人插嘴、表示意見',
    fun: '喙是鳥嘴（插嘴用嘴），啄是鳥啄食。鄉民最愛打成「不容置啄」，等於不准小鳥吃飯',
    tags: ['錯別字', '形近字', '網路用語', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-085', kind: 'char', text: '截然不同', target: '截', zhuyin: 'ㄐㄧㄝˊ',
    distractors: ['節', '戳', '裁'],
    meaning: '差別非常大，完全不一樣',
    fun: '截是切斷（一刀兩段所以分得很清楚），節是竹節或節日。網路常見「節然不同」，看起來很有過節',
    tags: ['錯別字', '形近字', '網路用語', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-086', kind: 'char', text: '報復性消費', target: '報', zhuyin: 'ㄅㄠˋ',
    distractors: ['抱', '暴', '爆'],
    meaning: '壓抑久了一次大買特買發洩情緒',
    fun: '報復是回敬（報仇那個報），抱怨是抱。疫情後超夯的詞，貼文常打成「抱復性消費」，變成邊買邊抱怨',
    tags: ['錯別字', '形近字', '網路用語'], difficulty: 3, era: 'modern'
  },
  {
    id: 'fc-087', kind: 'char', text: '按部就班', target: '部', zhuyin: 'ㄅㄨˋ',
    distractors: ['步', '布', '佈'],
    meaning: '照著一定的步驟順序進行',
    fun: '部是分門別類的部門（古代寫文章先分部安章），步是腳步。多數人直覺打「按步就班」，連考卷都常錯',
    tags: ['錯別字', '形近字', '網路用語', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-088', kind: 'char', text: '披星戴月', target: '戴', zhuyin: 'ㄉㄞˋ',
    distractors: ['帶', '載', '代'],
    meaning: '頭頂星月趕路；形容早出晚歸非常辛勞',
    fun: '戴是頂在頭上（戴帽子那個戴），帶是攜帶。貼文常打「披星帶月」，把月亮裝進包包帶著走',
    tags: ['錯別字', '形近字', '網路用語', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-089', kind: 'char', text: '相形見絀', target: '絀', zhuyin: 'ㄔㄨˋ',
    distractors: ['拙', '咄', '屈'],
    meaning: '一比較就顯得不足、比不上',
    fun: '絀是糸字旁的不足（短絀），拙是笨拙。比較文最愛打「相形見拙」，看起來很謙虛但其實錯字',
    tags: ['錯別字', '形近字', '網路用語', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'fc-090', kind: 'char', text: '以逸待勞', target: '待', zhuyin: 'ㄉㄞˋ',
    distractors: ['代', '怠'],
    meaning: '養精蓄銳、等對手疲累了才出手',
    fun: '待是等待，代是代替、怠是偷懶。以逸待勞是「等」敵人累，不是叫人代班，更不是擺爛。三個字都讀ㄉㄞˋ，難怪常寫錯',
    tags: ['錯別字', '同音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-091', kind: 'char', text: '和盤托出', target: '和', zhuyin: 'ㄏㄜˊ',
    distractors: ['合', '河'],
    meaning: '把所有事情毫無保留全部說出來',
    fun: '和盤＝連盤子一起，把菜連盤子整個端出去。常被寫成「合盤托出」，但標準寫法是「和」，不是合',
    tags: ['錯別字', '同音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-092', kind: 'char', text: '重蹈覆轍', target: '覆', zhuyin: 'ㄈㄨˋ',
    distractors: ['復', '複'],
    meaning: '再次走上翻過車的舊路，比喻重犯同樣的錯誤',
    fun: '覆是翻覆（翻車），復是再、複是重複。三個都讀ㄈㄨˋ，但這裡要的是「翻車的車輪痕跡」，只有覆對',
    tags: ['錯別字', '同音字', '成語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'fc-093', kind: 'char', text: '自暴自棄', target: '暴', zhuyin: 'ㄅㄠˋ',
    distractors: ['曝', '抱'],
    meaning: '自己糟蹋自己、放棄自己',
    fun: '這裡的暴是糟蹋、損害，不是曝曬的曝、也不是擁抱的抱。出自孟子，暴讀ㄅㄠˋ，常被誤寫成自抱自棄',
    tags: ['錯別字', '同音字', '成語'], difficulty: 2, era: 'classic'
  },
  {
    id: 'fc-094', kind: 'char', text: '計日程功', target: '程', zhuyin: 'ㄔㄥˊ',
    distractors: ['成', '承'],
    meaning: '可以數著日子估算進度，比喻成功在望、為期不遠',
    fun: '程是計量、估算（程功＝計算功效），不是成功的成。寫成「計日成功」雖然好懂，但標準寫法是程',
    tags: ['錯別字', '同音字', '成語'], difficulty: 4, era: 'classic'
  }
];
