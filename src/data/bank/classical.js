/**
 * 古文詩詞 — 課本裡朗朗上口卻常唸錯的字
 * schema 同 tricky.js；注音以教育部《重編國語辭典修訂本》為準
 */
export default [
  {
    id: 'cl-001', text: '蒹葭蒼蒼', target: '蒹', zhuyin: 'ㄐㄧㄢ',
    distractors: ['ㄑㄧㄢ', 'ㄐㄧㄢˋ', 'ㄐㄧㄢˊ'],
    meaning: '蘆葦茂盛。出自《詩經・秦風》',
    fun: '蒹葭就是蘆葦，唸錯的話所謂伊人只會在水更遠的那一方',
    tags: ['古文', '詩經'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-002', text: '窈窕淑女', target: '窈', zhuyin: 'ㄧㄠˇ',
    distractors: ['ㄧㄡˇ', 'ㄧㄠˊ', 'ㄧㄠˋ'],
    meaning: '文靜美好的女子。出自《詩經・關雎》',
    fun: '唸成「幼條淑女」的話，君子表示不好逑',
    tags: ['古文', '詩經'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-003', text: '君子好逑', target: '好', zhuyin: 'ㄏㄠˇ',
    distractors: ['ㄏㄠˋ', 'ㄏㄠˊ', 'ㄏㄠ'],
    meaning: '君子的好配偶。出自《詩經・關雎》',
    fun: '「好」是形容詞「好的配偶」，唸ㄏㄠˋ就變成君子很愛追求，整個變調',
    tags: ['古文', '詩經', '破音字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-004', text: '輾轉反側', target: '輾', zhuyin: 'ㄓㄢˇ',
    distractors: ['ㄋㄧㄢˇ', 'ㄓㄢˋ', 'ㄓㄢˊ'],
    meaning: '翻來覆去睡不著。出自《詩經・關雎》',
    fun: '失眠三千年的始祖，連翻身都翻得有文化',
    tags: ['古文', '詩經'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-005', text: '桃之夭夭', target: '夭', zhuyin: 'ㄧㄠ',
    distractors: ['ㄧㄠˇ', 'ㄠ', 'ㄧㄠˋ'],
    meaning: '桃花茂盛艷麗。出自《詩經・周南》',
    fun: '本尊是在誇桃花漂亮，被「逃之夭夭」蹭流量蹭了兩千年',
    tags: ['古文', '詩經'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-006', text: '死生契闊', target: '契', zhuyin: 'ㄑㄧˋ',
    distractors: ['ㄑㄧㄝˋ', 'ㄒㄧㄝˋ', 'ㄑㄧㄝˊ'],
    meaning: '生死離合（契闊：聚散）。出自《詩經・邶風》',
    fun: '簡編本「契」唸ㄑㄧˋ，契闊、默契、契約都一樣',
    tags: ['古文', '詩經'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-007', text: '風雨如晦', target: '晦', zhuyin: 'ㄏㄨㄟˋ',
    distractors: ['ㄇㄟˇ', 'ㄏㄨㄟ', 'ㄏㄨㄟˊ'],
    meaning: '風雨交加、天色昏暗。出自《詩經・鄭風》',
    fun: '晦是月底最暗那天，這個字長得像悔，唸錯你就懂什麼叫悔',
    tags: ['古文', '詩經'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-008', text: '參差荇菜', target: '荇', zhuyin: 'ㄒㄧㄥˋ',
    distractors: ['ㄒㄧㄥˊ', 'ㄏㄤˊ', 'ㄒㄧㄥˇ'],
    meaning: '長短不齊的荇菜（水生植物）。出自《詩經・關雎》',
    fun: '古代君子邊採水草邊想淑女，採個菜都能寫成千古名句',
    tags: ['古文', '詩經'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-009', text: '雨雪霏霏', target: '雨', zhuyin: 'ㄩˋ',
    distractors: ['ㄩˇ', 'ㄩˊ', 'ㄩ'],
    meaning: '雪下得紛紛揚揚（雨作動詞「降下」）。出自《詩經・采薇》',
    fun: '雨當動詞「下」要唸ㄩˋ，這裡是下雪不是下雨，氣象主播都會愣一下',
    tags: ['古文', '詩經', '破音字'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-010', text: '不亦說乎', target: '說', zhuyin: 'ㄩㄝˋ',
    distractors: ['ㄕㄨㄛ', 'ㄕㄨㄟˋ', 'ㄩㄝˊ'],
    meaning: '不也很高興嗎（說通悅）。出自《論語・學而》',
    fun: '國一第一課就考這個，唸ㄕㄨㄛ的話孔子表示不亦怒乎',
    tags: ['古文', '論語', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-011', text: '三省吾身', target: '省', zhuyin: 'ㄒㄧㄥˇ',
    distractors: ['ㄕㄥˇ', 'ㄒㄧㄥˊ', 'ㄒㄧㄥˋ'],
    meaning: '每天多次反省自己。出自《論語・學而》',
    fun: '是反省的省，不是省錢的省，曾子沒有在記帳',
    tags: ['古文', '論語', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-012', text: '人不知而不慍', target: '慍', zhuyin: 'ㄩㄣˋ',
    distractors: ['ㄨㄣ', 'ㄩㄣˊ', 'ㄩㄣˇ'],
    meaning: '別人不了解自己也不生氣。出自《論語・學而》',
    fun: '孔子兩千年前就教你被已讀不回也不要森七七',
    tags: ['古文', '論語'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-013', text: '曲肱而枕', target: '肱', zhuyin: 'ㄍㄨㄥ',
    distractors: ['ㄏㄨㄥˊ', 'ㄍㄨㄤ', 'ㄍㄨㄥˇ'],
    meaning: '彎著手臂當枕頭。出自《論語・述而》',
    fun: '孔子的極簡生活：手臂當枕頭照樣樂在其中，比露營風潮早兩千五百年',
    tags: ['古文', '論語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-014', text: '風乎舞雩', target: '雩', zhuyin: 'ㄩˊ',
    distractors: ['ㄒㄩ', 'ㄩˇ', 'ㄩˋ'],
    meaning: '在舞雩臺上吹吹風。舞雩是古代求雨的祭壇。出自《論語・先進》',
    fun: '曾點的人生理想是洗完澡去吹風，孔子聽完說我挺你，史上最chill的志願',
    tags: ['古文', '論語'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-015', text: '數罟不入', target: '數', zhuyin: 'ㄘㄨˋ',
    distractors: ['ㄕㄨˋ', 'ㄕㄨㄛˋ', 'ㄘㄨˊ'],
    meaning: '細密的漁網不放入池塘（數：細密）。出自《孟子・梁惠王》',
    fun: '孟子的永續漁業宣言，數唸ㄘㄨˋ是「細密」，環保署應該頒獎給他',
    tags: ['古文', '孟子', '破音字', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-016', text: '雞豚狗彘', target: '彘', zhuyin: 'ㄓˋ',
    distractors: ['ㄕˇ', 'ㄊㄨㄣˊ', 'ㄓˊ'],
    meaning: '雞、小豬、狗、大豬等家畜。出自《孟子・梁惠王》',
    fun: '彘就是豬，孟子的理想國全家都吃得到肉，先秦版的營養午餐政策',
    tags: ['古文', '孟子'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-017', text: '漁父', target: '父', zhuyin: 'ㄈㄨˇ',
    distractors: ['ㄈㄨˋ', 'ㄈㄨˊ', 'ㄈㄨ'],
    meaning: '捕魚的老翁（父：對老年男子的尊稱）。《楚辭》篇名',
    fun: '唸ㄈㄨˇ是老先生，唸ㄈㄨˋ變成漁夫他爸，輩分直接亂掉',
    tags: ['古文', '楚辭', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-018', text: '滄浪之水', target: '浪', zhuyin: 'ㄌㄤˊ',
    distractors: ['ㄌㄤˋ', 'ㄌㄤˇ', 'ㄌㄤ'],
    meaning: '滄浪江的水。出自《楚辭・漁父》',
    fun: '滄浪是河名，浪唸二聲，唸四聲屈原會從江裡探頭糾正你',
    tags: ['古文', '楚辭', '破音字'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-019', text: '庖丁解牛', target: '庖', zhuyin: 'ㄆㄠˊ',
    distractors: ['ㄅㄠ', 'ㄆㄠ', 'ㄆㄠˇ'],
    meaning: '廚師宰牛，比喻技藝純熟出神入化。出自《莊子・養生主》',
    fun: '庖丁是廚師界的傳奇，刀用十九年跟新的一樣，比保固還猛',
    tags: ['古文', '莊子'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-020', text: '曹劌論戰', target: '劌', zhuyin: 'ㄍㄨㄟˋ',
    distractors: ['ㄕㄨㄟˋ', 'ㄎㄨㄞˋ', 'ㄍㄨㄟˊ'],
    meaning: '曹劌與魯莊公論作戰之道，「一鼓作氣」的出處。出自《左傳》',
    fun: '一鼓作氣的原創作者，名字卻沒幾個人唸得對，心酸',
    tags: ['古文', '左傳'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-021', text: '渚清沙白', target: '渚', zhuyin: 'ㄓㄨˇ',
    distractors: ['ㄔㄨˇ', 'ㄓㄜˇ', 'ㄓㄨˊ'],
    meaning: '水中小洲清澈、沙色潔白。出自杜甫〈登高〉',
    fun: '渚是水中小沙洲，杜甫登高看到的療癒風景，配上他超不療癒的人生',
    tags: ['古文', '唐詩'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-022', text: '千載空悠悠', target: '載', zhuyin: 'ㄗㄞˇ',
    distractors: ['ㄗㄞˋ', 'ㄗㄞˊ', 'ㄗㄞ'],
    meaning: '千年來空自悠遠（載：年）。出自崔顥〈黃鶴樓〉',
    fun: '載當「年」唸三聲，白雲飄一千年，不是用貨車載的',
    tags: ['古文', '唐詩', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-023', text: '朝辭白帝', target: '朝', zhuyin: 'ㄓㄠ',
    distractors: ['ㄔㄠˊ', 'ㄓㄠˊ', 'ㄓㄠˋ'],
    meaning: '早晨辭別白帝城。出自李白〈早發白帝城〉',
    fun: '朝是早上，李白一早出發當天到江陵，古代版高鐵體驗文',
    tags: ['古文', '唐詩', '破音字'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-024', text: '龍城飛將', target: '將', zhuyin: 'ㄐㄧㄤˋ',
    distractors: ['ㄐㄧㄤ', 'ㄑㄧㄤ', 'ㄐㄧㄤˊ'],
    meaning: '指漢代名將李廣（將：將軍）。出自王昌齡〈出塞〉',
    fun: '飛將指李廣，將軍的將唸四聲，唸一聲變成正要飛去龍城',
    tags: ['古文', '唐詩', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-025', text: '霓裳羽衣', target: '裳', zhuyin: 'ㄔㄤˊ',
    distractors: ['ㄕㄤ', 'ㄕㄤˋ', 'ㄔㄤ'],
    meaning: '彩虹般的衣裙，唐代著名樂曲名。出自白居易〈長恨歌〉',
    fun: '單獨的裳唸ㄔㄤˊ是下裙，「衣裳」連用才唸ㄕㄤ，楊貴妃的舞衣不隨便',
    tags: ['古文', '唐詩', '破音字'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-026', text: '句讀之不知', target: '讀', zhuyin: 'ㄉㄡˋ',
    distractors: ['ㄉㄨˊ', 'ㄉㄡˊ', 'ㄉㄡˇ'],
    meaning: '不懂得斷句（讀：句中停頓處）。出自韓愈〈師說〉',
    fun: '句讀就是古文的標點符號，唸ㄉㄨˊ的話正好證明你句讀之不知',
    tags: ['古文', '唐宋文', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-027', text: '渾欲不勝簪', target: '簪', zhuyin: 'ㄗㄢ',
    distractors: ['ㄗㄢˇ', 'ㄓㄢ', 'ㄗㄢˊ'],
    meaning: '頭髮稀疏得快插不住髮簪。出自杜甫〈春望〉',
    fun: '杜甫的禿頭文學，憂國憂民憂到髮際線節節敗退',
    tags: ['古文', '唐詩'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-028', text: '燕山胡騎', target: '騎', zhuyin: 'ㄐㄧˋ',
    distractors: ['ㄑㄧˊ', 'ㄐㄧˊ', 'ㄐㄧ'],
    meaning: '燕山一帶胡人的騎兵（騎：騎兵，名詞）。出自〈木蘭詩〉',
    fun: '騎當名詞「騎兵」唸ㄐㄧˋ，木蘭聽到的是敵軍鐵騎，不是有人在騎腳踏車',
    tags: ['古文', '樂府', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-029', text: '故人具雞黍', target: '黍', zhuyin: 'ㄕㄨˇ',
    distractors: ['ㄕㄨˋ', 'ㄋㄧㄢˊ', 'ㄕㄨˊ'],
    meaning: '老朋友準備了雞和黃米飯。出自孟浩然〈過故人莊〉',
    fun: '唐朝的「來我家吃飯啦」，黍是黃米，古代澱粉主食擔當',
    tags: ['古文', '唐詩'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-030', text: '開軒面場圃', target: '圃', zhuyin: 'ㄆㄨˇ',
    distractors: ['ㄅㄨˇ', 'ㄆㄨ', 'ㄆㄨˊ'],
    meaning: '打開窗子面對穀場和菜園。出自孟浩然〈過故人莊〉',
    fun: '圃是菜園，唐代農家樂套裝行程：開窗、看菜園、聊收成',
    tags: ['古文', '唐詩'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-031', text: '羽扇綸巾', target: '綸', zhuyin: 'ㄍㄨㄢ',
    distractors: ['ㄌㄨㄣˊ', 'ㄍㄨㄢˊ', 'ㄍㄨㄢˇ'],
    meaning: '手搖羽扇、頭戴青絲頭巾，形容儒將從容瀟灑。出自蘇軾〈念奴嬌・赤壁懷古〉',
    fun: '綸巾唸ㄍㄨㄢ巾，唸成ㄌㄨㄣˊ的話周瑜的帥度直接打七折',
    tags: ['古文', '宋詞', '破音字', '大考'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-032', text: '雕欄玉砌', target: '砌', zhuyin: 'ㄑㄧˋ',
    distractors: ['ㄑㄧㄝˋ', 'ㄔㄜˋ', 'ㄑㄧˊ'],
    meaning: '雕花的欄杆、玉石的臺階。出自李煜〈虞美人〉',
    fun: '李後主懷念的豪宅裝潢，砌唸ㄑㄧˋ，亡國之痛不容唸錯',
    tags: ['古文', '宋詞'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-033', text: '高處不勝寒', target: '勝', zhuyin: 'ㄕㄥ',
    distractors: ['ㄕㄥˋ', 'ㄕㄥˊ', 'ㄕㄥˇ'],
    meaning: '高處冷得讓人承受不住（勝：承受）。出自蘇軾〈水調歌頭〉',
    fun: '勝當「承受」唸一聲，蘇軾說月宮太冷不想去，史上最有文化的怕冷',
    tags: ['古文', '宋詞', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-034', text: '瓊樓玉宇', target: '瓊', zhuyin: 'ㄑㄩㄥˊ',
    distractors: ['ㄐㄧㄥ', 'ㄑㄧㄥˊ', 'ㄑㄩㄥˇ'],
    meaning: '月宮中華美的樓閣。出自蘇軾〈水調歌頭〉',
    fun: '瓊是美玉，月宮的豪宅建案名，蘇軾看了房但沒下訂',
    tags: ['古文', '宋詞'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-035', text: '浩浩湯湯', target: '湯', zhuyin: 'ㄕㄤ',
    distractors: ['ㄊㄤ', 'ㄊㄤˋ', 'ㄕㄤˊ'],
    meaning: '水勢浩大壯闊。出自范仲淹《岳陽樓記》',
    fun: '湯湯唸ㄕㄤㄕㄤ是水大的樣子，洞庭湖不是一鍋湯',
    tags: ['古文', '岳陽樓記', '破音字', '大考'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-036', text: '檣傾楫摧', target: '楫', zhuyin: 'ㄐㄧˊ',
    distractors: ['ㄧ', 'ㄐㄧˋ', 'ㄐㄧˇ'],
    meaning: '桅杆傾倒、船槳折斷。出自范仲淹《岳陽樓記》',
    fun: '楫是船槳，岳陽樓記的暴風雨特效鏡頭，唸錯槳就真的斷了',
    tags: ['古文', '岳陽樓記'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-037', text: '寵辱偕忘', target: '偕', zhuyin: 'ㄒㄧㄝˊ',
    distractors: ['ㄒㄧㄝˋ', 'ㄎㄞˇ', 'ㄒㄧㄝˇ'],
    meaning: '光榮和屈辱一併忘掉（偕：一同）。出自范仲淹《岳陽樓記》',
    fun: '偕是「一起」，跟白頭偕老同一個偕，得失心放下的最高境界',
    tags: ['古文', '岳陽樓記'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-038', text: '屬予作文', target: '屬', zhuyin: 'ㄓㄨˇ',
    distractors: ['ㄕㄨˇ', 'ㄕㄨˋ', 'ㄓㄨˊ'],
    meaning: '囑託我寫文章（屬通囑）。出自范仲淹《岳陽樓記》',
    fun: '滕子京一句「屬予作文」，范仲淹沒去過岳陽樓也能寫出千古名篇，遠端工作先驅',
    tags: ['古文', '岳陽樓記', '破音字', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-039', text: '陟罰臧否', target: '陟', zhuyin: 'ㄓˋ',
    distractors: ['ㄕㄜˋ', 'ㄓㄨˋ', 'ㄓˊ'],
    meaning: '獎勵好人、懲罰壞人（陟：提升）。出自諸葛亮《出師表》',
    fun: '整句唸ㄓˋ ㄈㄚˊ ㄗㄤ ㄆㄧˇ，四個字錯三個是出師表的日常',
    tags: ['古文', '出師表', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-040', text: '夙夜憂嘆', target: '夙', zhuyin: 'ㄙㄨˋ',
    distractors: ['ㄈㄥ', 'ㄙㄨ', 'ㄙㄨˊ'],
    meaning: '從早到晚憂愁嘆息（夙：早晨）。出自諸葛亮《出師表》',
    fun: '諸葛亮的工時實錄，早晚都在操煩國事，過勞界的千古一相',
    tags: ['古文', '出師表'], difficulty: 2, era: 'classic'
  },
  {
    id: 'cl-041', text: '庶竭駑鈍', target: '駑', zhuyin: 'ㄋㄨˊ',
    distractors: ['ㄋㄨˇ', 'ㄇㄚˇ', 'ㄋㄨˋ'],
    meaning: '希望竭盡自己平庸的才能（駑：劣馬，比喻平庸）。出自《出師表》',
    fun: '駑是跑不快的馬，諸葛亮自謙是劣馬，那一般人是什麼，海帶嗎',
    tags: ['古文', '出師表'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-042', text: '裨補闕漏', target: '裨', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˊ', 'ㄅㄟ', 'ㄅㄧˊ'],
    meaning: '彌補缺失和疏漏。出自諸葛亮《出師表》',
    fun: '裨唸ㄅㄧˋ是補益，諸葛亮交代的補丁機制，蜀漢版的hotfix',
    tags: ['古文', '出師表', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-043', text: '以彰其咎', target: '咎', zhuyin: 'ㄐㄧㄡˋ',
    distractors: ['ㄐㄧㄡ', 'ㄍㄠ', 'ㄐㄧㄡˊ'],
    meaning: '來彰顯他們的過失（咎：罪過）。出自諸葛亮《出師表》',
    fun: '咎唸四聲，跟「咎由自取」同款，唸錯就自己彰其咎了',
    tags: ['古文', '出師表'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-044', text: '屋舍儼然', target: '儼', zhuyin: 'ㄧㄢˇ',
    distractors: ['ㄧㄢˊ', 'ㄧㄢˋ', 'ㄧㄢ'],
    meaning: '房屋整齊的樣子。出自陶淵明《桃花源記》',
    fun: '桃花源的市容整齊到像建商接待中心的示範區',
    tags: ['古文', '桃花源記'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-045', text: '阡陌交通', target: '阡', zhuyin: 'ㄑㄧㄢ',
    distractors: ['ㄐㄧㄢ', 'ㄑㄧㄢˊ', 'ㄑㄧㄢˇ'],
    meaning: '田間小路縱橫相通。出自陶淵明《桃花源記》',
    fun: '阡陌是田埂小路，桃花源的「交通」是田間步道，保證不塞車',
    tags: ['古文', '桃花源記'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-046', text: '黃髮垂髫', target: '髫', zhuyin: 'ㄊㄧㄠˊ',
    distractors: ['ㄓㄠˋ', 'ㄕㄠˊ', 'ㄊㄧㄠˇ'],
    meaning: '老人與小孩（垂髫：小孩垂下的頭髮）。出自《桃花源記》',
    fun: '髫是小孩的瀏海，桃花源老少都笑咪咪，比任何長照政策都猛',
    tags: ['古文', '桃花源記'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-047', text: '便要還家', target: '要', zhuyin: 'ㄧㄠ',
    distractors: ['ㄧㄠˋ', 'ㄧㄠˇ', 'ㄧㄠˊ'],
    meaning: '就邀請漁人回家作客（要通邀）。出自《桃花源記》',
    fun: '要唸ㄧㄠ是邀請，桃花源居民看到陌生人直接帶回家吃飯，信任感拉滿',
    tags: ['古文', '桃花源記', '破音字', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-048', text: '濯清漣而不妖', target: '濯', zhuyin: 'ㄓㄨㄛˊ',
    distractors: ['ㄉㄧˊ', 'ㄓㄠˋ', 'ㄓㄨㄛˇ'],
    meaning: '在清水中洗滌過卻不顯妖媚。出自周敦頤《愛蓮說》',
    fun: '濯是洗滌，蓮花洗完澡依然低調，反觀某些人拍照修圖修兩小時',
    tags: ['古文', '愛蓮說'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-049', text: '不蔓不枝', target: '蔓', zhuyin: 'ㄇㄢˋ',
    distractors: ['ㄨㄢˋ', 'ㄇㄢˊ', 'ㄇㄢˇ'],
    meaning: '不生藤蔓、不長旁枝，比喻正直。出自周敦頤《愛蓮說》',
    fun: '蓮花莖一根直上不亂長，植物界的不搞小圈圈代表',
    tags: ['古文', '愛蓮說'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-050', text: '陶後鮮有聞', target: '鮮', zhuyin: 'ㄒㄧㄢˇ',
    distractors: ['ㄒㄧㄢ', 'ㄒㄧㄢˊ', 'ㄒㄧㄢˋ'],
    meaning: '陶淵明之後就很少聽說了（鮮：少）。出自《愛蓮說》',
    fun: '鮮當「少」唸三聲，跟海鮮無關，菊花粉絲團自陶淵明後沒落',
    tags: ['古文', '愛蓮說', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-051', text: '案牘勞形', target: '牘', zhuyin: 'ㄉㄨˊ',
    distractors: ['ㄉㄡˋ', 'ㄕㄨ', 'ㄉㄨˇ'],
    meaning: '公文使身體勞累（牘：公文）。出自劉禹錫《陋室銘》',
    fun: '唐朝公務員的心聲：沒有公文轟炸真好，陋室銘根本辦公室厭世文學',
    tags: ['古文', '陋室銘'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-052', text: '林壑尤美', target: '壑', zhuyin: 'ㄏㄨㄛˋ',
    distractors: ['ㄏㄜˊ', 'ㄍㄨˇ', 'ㄏㄨㄛˊ'],
    meaning: '樹林山谷特別秀美（壑：山谷）。出自歐陽脩《醉翁亭記》',
    fun: '壑是山谷，跟「慾壑難填」同一個字，但這裡的山谷很療癒',
    tags: ['古文', '醉翁亭記'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-053', text: '舳艫千里', target: '舳', zhuyin: 'ㄓㄨˊ',
    distractors: ['ㄓㄡˋ', 'ㄧㄡˊ', 'ㄓㄨˇ'],
    meaning: '船隻首尾相接綿延千里。出自蘇軾〈赤壁賦〉',
    fun: '曹操艦隊的壯觀畫面，舳艫唸ㄓㄨˊ ㄌㄨˊ，唸錯艦隊直接解散',
    tags: ['古文', '赤壁賦', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-054', text: '橫槊賦詩', target: '槊', zhuyin: 'ㄕㄨㄛˋ',
    distractors: ['ㄙㄨㄛˇ', 'ㄕㄨㄛ', 'ㄕㄨㄛˊ'],
    meaning: '橫拿長矛吟詩（槊：長矛）。出自蘇軾〈赤壁賦〉',
    fun: '曹操拿著長矛念詩，文武雙全的終極展演，比邊重訓邊背單字狂',
    tags: ['古文', '赤壁賦'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-055', text: '桂棹兮蘭槳', target: '棹', zhuyin: 'ㄓㄠˋ',
    distractors: ['ㄓㄨㄛ', 'ㄉㄧㄠˋ', 'ㄓㄠˊ'],
    meaning: '桂木做的棹、蘭木做的槳（棹：划船工具）。出自蘇軾〈赤壁賦〉',
    fun: '棹唸ㄓㄠˋ是船槳，蘇軾的船槳都要用香木，文青的儀式感',
    tags: ['古文', '赤壁賦'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-056', text: '倚歌而和', target: '和', zhuyin: 'ㄏㄜˋ',
    distractors: ['ㄏㄜˊ', 'ㄏㄨㄛˋ', 'ㄏㄜˇ'],
    meaning: '按著歌聲伴奏應和（和：跟著唱和）。出自蘇軾〈赤壁賦〉',
    fun: '和當「應和」唸ㄏㄜˋ，古代的即興合奏，赤壁江上開唱',
    tags: ['古文', '赤壁賦', '破音字'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-057', text: '蘇子愀然', target: '愀', zhuyin: 'ㄑㄧㄠˇ',
    distractors: ['ㄐㄧㄡ', 'ㄑㄧㄡ', 'ㄑㄧㄠˊ'],
    meaning: '蘇軾神色變得嚴肅憂愁。出自蘇軾〈赤壁賦〉',
    fun: '愀然就是臉色突然垮下來，蘇軾聽到簫聲太悲傷的真實反應',
    tags: ['古文', '赤壁賦'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-058', text: '煢煢孑立', target: '煢', zhuyin: 'ㄑㄩㄥˊ',
    distractors: ['ㄐㄩㄣ', 'ㄧㄥˊ', 'ㄑㄩㄥˇ'],
    meaning: '孤孤單單、無依無靠。出自李密《陳情表》',
    fun: '李密的孤單文學天花板，邊緣到連影子都只剩自己安慰自己',
    tags: ['古文', '陳情表', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-059', text: '流觴曲水', target: '觴', zhuyin: 'ㄕㄤ',
    distractors: ['ㄕㄤˋ', 'ㄧㄤˊ', 'ㄕㄤˊ'],
    meaning: '酒杯隨彎曲的水流漂送，停在誰面前誰就喝酒賦詩。出自王羲之《蘭亭集序》',
    fun: '東晉文青的喝酒遊戲，酒杯漂到你面前就要作詩，作不出來罰酒',
    tags: ['古文', '蘭亭集序'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-060', text: '搔首踟躕', target: '踟', zhuyin: 'ㄔˊ',
    distractors: ['ㄓ', 'ㄔ', 'ㄓˋ'],
    meaning: '心情遲疑、來回走動的樣子。出自《詩經‧邶風‧靜女》',
    fun: '踟躕唸ㄔˊ ㄔㄨˊ，就是猶豫不前。等不到人時抓頭踱步的古人寫照',
    tags: ['古文', '詩經'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-061', text: '餽金', target: '餽', zhuyin: 'ㄎㄨㄟˋ',
    distractors: ['ㄍㄨㄟˋ', 'ㄎㄨㄟ', 'ㄨㄟˋ'],
    meaning: '贈送財物；同「饋」。語見《論語》「餽孔子豚」',
    fun: '餽唸ㄎㄨㄟˋ，跟「饋贈」的饋同義。古人送禮也要送對音',
    tags: ['古文', '論語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-062', text: '怫然作色', target: '怫', zhuyin: 'ㄈㄨˊ',
    distractors: ['ㄈㄟˋ', 'ㄈㄨˋ', 'ㄈㄨˇ'],
    meaning: '忽然變臉、生氣的樣子。語見《莊子》',
    fun: '怫然作色就是臉一沉發火。怫唸ㄈㄨˊ，唸錯老師也會怫然',
    tags: ['古文'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-063', text: '愴恨', target: '愴', zhuyin: 'ㄔㄨㄤˋ',
    distractors: ['ㄘㄤ', 'ㄔㄨㄤ', 'ㄑㄧㄤˋ'],
    meaning: '悲傷怨恨。愴有哀傷之意',
    fun: '愴唸ㄔㄨㄤˋ，「愴然涕下」的愴。陳子昂登幽州臺哭的就是這個',
    tags: ['古文'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-064', text: '怏怏不樂', target: '怏', zhuyin: 'ㄧㄤˋ',
    distractors: ['ㄤ', 'ㄧㄤ', 'ㄧㄤˇ'],
    meaning: '心中不滿、不服氣而悶悶不樂',
    fun: '怏唸ㄧㄤˋ不是ㄧㄤ。心裡不爽寫在臉上，就是怏怏不樂',
    tags: ['古文'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-065', text: '不勝唏噓', target: '噓', zhuyin: 'ㄒㄩ',
    distractors: ['ㄒㄩˋ', 'ㄒㄩˊ', 'ㄒㄧㄩ'],
    meaning: '感慨嘆息不已。唏噓即嘆息聲',
    fun: '噓唸ㄒㄩ，這裡是嘆氣不是噓人下台。往事一提就不勝唏噓',
    tags: ['古文'], difficulty: 3, era: 'classic'
  },
  {
    id: 'cl-066', text: '彈箏搏髀', target: '髀', zhuyin: 'ㄅㄧˋ',
    distractors: ['ㄆㄧˊ', 'ㄅㄟˋ', 'ㄅㄧ'],
    meaning: '彈著箏、拍著大腿，形容秦地質樸的音樂。出自李斯《諫逐客書》',
    fun: '髀唸ㄅㄧˋ，就是大腿。搏髀=拍大腿打拍子，古代的卡拉OK',
    tags: ['古文', '諫逐客書', '大考'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-067', text: '變生肘腋', target: '腋', zhuyin: 'ㄧㄝˋ',
    distractors: ['ㄧˋ', 'ㄧㄚˋ', 'ㄜˋ'],
    meaning: '禍亂發生在極近的地方，比喻變故就在身邊',
    fun: '肘腋是手肘和腋下，近到不能再近。腋唸ㄧㄝˋ，禍從身邊起',
    tags: ['古文', '成語'], difficulty: 4, era: 'classic'
  },
  {
    id: 'cl-068', text: '手如柔荑', target: '荑', zhuyin: 'ㄊㄧˊ',
    distractors: ['ㄧˊ', 'ㄉㄧˋ', 'ㄊㄧˇ'],
    meaning: '手像初生的嫩芽般柔嫩。出自《詩經‧衛風‧碩人》',
    fun: '荑唸ㄊㄧˊ，是草木嫩芽。古人誇美人的手白嫩，比喻得很講究',
    tags: ['古文', '詩經'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-069', text: '領如蝤蠐', target: '蠐', zhuyin: 'ㄑㄧˊ',
    distractors: ['ㄑㄧˋ', 'ㄐㄧ', 'ㄑㄧ'],
    meaning: '脖子像天牛幼蟲般白嫩修長。出自《詩經‧衛風‧碩人》',
    fun: '蝤蠐唸ㄑㄧㄡˊ ㄑㄧˊ，是白白的幼蟲。誇人脖子美，比喻有點獵奇',
    tags: ['古文', '詩經'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-070', text: '齒如瓠犀', target: '瓠', zhuyin: 'ㄏㄨˋ',
    distractors: ['ㄎㄨㄚ', 'ㄏㄨˊ', 'ㄍㄨㄚ'],
    meaning: '牙齒像葫蘆籽般整齊潔白。出自《詩經‧衛風‧碩人》',
    fun: '瓠唸ㄏㄨˋ，是葫蘆。瓠犀就是葫蘆籽，古人的潔白牙齒廣告',
    tags: ['古文', '詩經'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-071', text: '螓首蛾眉', target: '螓', zhuyin: 'ㄑㄧㄣˊ',
    distractors: ['ㄑㄧㄣ', 'ㄓㄣ', 'ㄐㄧㄣ'],
    meaning: '額頭方廣如螓、眉毛細長如蛾觸鬚，形容美人。出自《詩經‧衛風‧碩人》',
    fun: '螓唸ㄑㄧㄣˊ，是一種方頭小蟬。螓首蛾眉是古代選美的標準臉',
    tags: ['古文', '詩經'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-072', text: '賤人就是矯情', target: '矯', zhuyin: 'ㄐㄧㄠˇ',
    distractors: ['ㄐㄧㄠ', 'ㄐㄧㄠˋ', 'ㄑㄧㄠˊ'],
    meaning: '故意做作、掩飾真情。《甄嬛傳》華妃名言',
    fun: '矯唸ㄐㄧㄠˇ。華妃娘娘的經典台詞，唸錯就真的很矯情',
    tags: ['甄嬛傳', '台詞'], difficulty: 3, era: 'modern'
  },
  {
    id: 'cl-073', text: '臣妾做不到', target: '妾', zhuyin: 'ㄑㄧㄝˋ',
    distractors: ['ㄑㄧㄝ', 'ㄒㄧㄝ', 'ㄐㄧㄝˊ'],
    meaning: '古代女子或妃嬪對己的謙稱。《甄嬛傳》皇后名句',
    fun: '妾唸ㄑㄧㄝˋ。「臣妾做不到啊」紅遍全網，唸對才到位',
    tags: ['甄嬛傳', '台詞'], difficulty: 2, era: 'modern'
  },
  {
    id: 'cl-074', text: '嬛嬛一裊楚宮腰', target: '嬛', zhuyin: 'ㄒㄩㄢ',
    distractors: ['ㄏㄨㄢˊ', 'ㄒㄩㄢˊ', 'ㄑㄩㄥˊ'],
    meaning: '形容女子體態輕盈柔美。《甄嬛傳》甄嬛名字典故所出',
    fun: '此處嬛唸ㄒㄩㄢ（便嬛，輕盈美麗），不是甄嬛念的ㄒㄩㄢˊ，皇上親自考過',
    tags: ['甄嬛傳', '台詞', '破音字'], difficulty: 5, era: 'modern'
  },
  {
    id: 'cl-075', text: '鈕祜祿氏', target: '祜', zhuyin: 'ㄏㄨˋ',
    distractors: ['ㄍㄨˇ', 'ㄎㄨˇ', 'ㄐㄩˋ'],
    meaning: '滿洲八大姓之一。《甄嬛傳》中甄嬛抬旗後的姓氏',
    fun: '祜唸ㄏㄨˋ，是福分的意思。鈕祜祿氏唸錯，娘娘可是會不開心的',
    tags: ['甄嬛傳', '台詞'], difficulty: 5, era: 'modern'
  },
  {
    id: 'cl-076', text: '年羹堯', target: '羹', zhuyin: 'ㄍㄥ',
    distractors: ['ㄍㄥˋ', 'ㄍㄢ', 'ㄎㄥ'],
    meaning: '《甄嬛傳》華妃之兄、權傾一時的大將軍',
    fun: '羹唸ㄍㄥ，跟肉羹的羹同字。大將軍的名字可別唸錯',
    tags: ['甄嬛傳', '台詞'], difficulty: 3, era: 'modern'
  },
  {
    id: 'cl-077', text: '攛掇', target: '攛', zhuyin: 'ㄘㄨㄢ',
    distractors: ['ㄗㄨㄢ', 'ㄘㄨㄢˋ', 'ㄐㄩㄢ'],
    meaning: '從旁慫恿、鼓動別人去做某事。宮鬥戲常見的手段',
    fun: '攛掇唸ㄘㄨㄢ ㄉㄨㄛ，就是在旁邊煽風點火。後宮最愛這味',
    tags: ['甄嬛傳', '生僻字'], difficulty: 5, era: 'classic'
  },
  {
    id: 'cl-078', text: '齏粉', target: '齏', zhuyin: 'ㄐㄧ',
    distractors: ['ㄑㄧˊ', 'ㄐㄧˋ', 'ㄗㄞ'],
    meaning: '粉碎、粉身碎骨。常見於宮鬥戲的狠話',
    fun: '齏唸ㄐㄧ，本指搗碎的細末。「化為齏粉」就是碎成渣，威脅力滿點',
    tags: ['甄嬛傳', '生僻字'], difficulty: 5, era: 'classic'
  }
];
