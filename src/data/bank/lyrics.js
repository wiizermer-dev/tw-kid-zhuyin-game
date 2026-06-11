/**
 * 流行歌詞 — KTV 點歌前先學會唸
 * schema 同 tricky.js；注音以教育部《重編國語辭典修訂本》為準
 */
export default [
  {
    id: 'ly-001', text: '擱淺', target: '擱', zhuyin: 'ㄍㄜ',
    distractors: ['ㄍㄜˊ', 'ㄎㄜˋ'],
    meaning: '船隻駛入淺灘動彈不得，比喻事情停滯。周杰倫〈擱淺〉歌名',
    fun: 'KTV 點這首裝憂鬱，結果歌名先唸錯，感情直接擱淺',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-002', text: '紅塵客棧', target: '棧', zhuyin: 'ㄓㄢˋ',
    distractors: ['ㄗㄢˋ', 'ㄐㄧㄢˇ'],
    meaning: '供旅客投宿的處所。周杰倫〈紅塵客棧〉歌名',
    fun: '棧字唸錯，老闆娘直接跟你說客滿',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-003', text: '爾虞我詐', target: '虞', zhuyin: 'ㄩˊ',
    distractors: ['ㄨˊ', 'ㄩˇ'],
    meaning: '彼此猜疑、互相欺騙。林俊傑〈曹操〉「爾虞我詐是三國」',
    fun: '唱曹操氣勢要夠，虞一唸錯氣勢直接漏風',
    tags: ['歌詞', '林俊傑'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-004', text: '炊煙裊裊', target: '裊', zhuyin: 'ㄋㄧㄠˇ',
    distractors: ['ㄒㄧㄠ', 'ㄋㄧㄠˊ'],
    meaning: '煙氣繚繞上升的樣子。周杰倫〈青花瓷〉「炊煙裊裊昇起」',
    fun: '中國風歌詞之王，KTV 大家都用哼的帶過，唸出來才見真章',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-005', text: '芭蕉惹驟雨', target: '驟', zhuyin: 'ㄗㄡˋ',
    distractors: ['ㄓㄡˋ', 'ㄐㄩˋ'],
    meaning: '驟雨：急而大的雨。周杰倫〈青花瓷〉「簾外芭蕉惹驟雨」',
    fun: '全台灣都唸ㄓㄡˋ，教育部審訂音偏偏是ㄗㄡˋ，比驟雨還讓人措手不及',
    tags: ['歌詞', '周杰倫'], difficulty: 5, era: 'modern'
  },
  {
    id: 'ly-006', text: '臨摹宋體', target: '摹', zhuyin: 'ㄇㄛˊ',
    distractors: ['ㄇㄨˊ', 'ㄇㄛˋ'],
    meaning: '照著範本摹寫。周杰倫〈青花瓷〉「臨摹宋體落款時卻惦記著你」',
    fun: '摹跟模長得太像，連方文山都救不了你',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-007', text: '釉色渲染', target: '渲', zhuyin: 'ㄒㄩㄢˋ',
    distractors: ['ㄒㄩㄢ', 'ㄒㄩㄢˊ'],
    meaning: '渲染：國畫技法，以水墨暈染畫面。周杰倫〈青花瓷〉「釉色渲染仕女圖」',
    fun: '渲是四聲，唸一聲的人仕女圖直接沒暈開',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-008', text: '伽藍寺', target: '伽', zhuyin: 'ㄑㄧㄝˊ',
    distractors: ['ㄐㄧㄚ', 'ㄍㄚ'],
    meaning: '伽藍：佛寺。周杰倫〈煙花易冷〉「伽藍寺聽雨聲盼永恆」',
    fun: '瑜伽唸一個音、伽藍唸另一個音，這個字根本變色龍',
    tags: ['歌詞', '周杰倫'], difficulty: 5, era: 'modern'
  },
  {
    id: 'ly-009', text: '斑駁', target: '駁', zhuyin: 'ㄅㄛˊ',
    distractors: ['ㄅㄛ', 'ㄆㄛˋ'],
    meaning: '色彩雜亂、深淺不一。周杰倫〈煙花易冷〉「斑駁的城門」',
    fun: '城門都斑駁了，你的注音不要也跟著剝落',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-010', text: '楔形文字', target: '楔', zhuyin: 'ㄒㄧㄝˋ',
    distractors: ['ㄒㄧㄝ', 'ㄑㄧˋ'],
    meaning: '古代兩河流域使用的文字。周杰倫〈愛在西元前〉「用楔形文字刻下了永遠」',
    fun: '對岸唸一聲、台灣標準四聲，西元前的文字到現在還在吵注音',
    tags: ['歌詞', '周杰倫'], difficulty: 5, era: 'modern'
  },
  {
    id: 'ly-011', text: '吳儂軟語', target: '儂', zhuyin: 'ㄋㄨㄥˊ',
    distractors: ['ㄋㄤˊ', 'ㄋㄨㄥˋ'],
    meaning: '形容蘇州一帶柔軟好聽的口音。周杰倫〈上海一九四三〉「說著一口吳儂軟語的姑娘」',
    fun: '儂唸錯就不軟了，直接變吳硬硬語',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-012', text: '嗜血的螞蟻', target: '嗜', zhuyin: 'ㄕˋ',
    distractors: ['ㄕˊ', 'ㄑㄧˋ'],
    meaning: '嗜：特別愛好。周杰倫〈夜曲〉「一群嗜血的螞蟻被腐肉所吸引」',
    fun: '為你彈奏蕭邦的夜曲，先把嗜唸對才有資格紀念我的死去',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-013', text: '止戰之殤', target: '殤', zhuyin: 'ㄕㄤ',
    distractors: ['ㄕㄤˋ', 'ㄧㄤˊ'],
    meaning: '殤：未成年而死，引申為戰禍的傷痛。周杰倫〈止戰之殤〉歌名',
    fun: '唸成「止戰之傷」意思有到但注音沒到，可惜',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-014', text: '蘭亭臨帖', target: '帖', zhuyin: 'ㄊㄧㄝˋ',
    distractors: ['ㄊㄧㄝˇ', 'ㄊㄧㄝ'],
    meaning: '臨帖：照著字帖練字。周杰倫〈蘭亭序〉「蘭亭臨帖 行書如行雲流水」',
    fun: '請帖、服帖、字帖三種唸法，KTV 抽考直接三選一',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-015', text: '微醺的歲月', target: '醺', zhuyin: 'ㄒㄩㄣ',
    distractors: ['ㄒㄩㄣˋ', 'ㄒㄩㄥ'],
    meaning: '微醺：略帶醉意。周杰倫〈髮如雪〉「紅塵醉 微醺的歲月」',
    fun: '微醺很浪漫，唸成四聲就只剩宿醉',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-016', text: '髮如雪', target: '髮', zhuyin: 'ㄈㄚˇ',
    distractors: ['ㄈㄚˋ', 'ㄈㄚ'],
    meaning: '形容髮絲如雪。周杰倫〈髮如雪〉歌名',
    fun: '教育部說頭髮的髮唸三聲，全台 KTV 都不答應也沒用',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-017', text: '愛情懸崖', target: '崖', zhuyin: 'ㄧㄞˊ',
    distractors: ['ㄧㄚˊ', 'ㄞˊ'],
    meaning: '懸崖：高聳陡峭的山壁。周杰倫〈愛情懸崖〉歌名',
    fun: 'ㄧㄚˊ是對岸唸法，台灣標準是ㄧㄞˊ，談戀愛前先搞清楚邊界',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-018', text: '電線桿', target: '桿', zhuyin: 'ㄍㄢˇ',
    distractors: ['ㄍㄢ', 'ㄍㄢˋ'],
    meaning: '架設電線的柱子。周杰倫〈七里香〉「窗外的麻雀在電線桿上多嘴」',
    fun: '麻雀都會多嘴了，你還不會唸桿',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-019', text: '鹿茸切片', target: '茸', zhuyin: 'ㄖㄨㄥˊ',
    distractors: ['ㄑㄧˋ', 'ㄖㄨㄥˇ'],
    meaning: '鹿茸：鹿的幼角，珍貴藥材。周杰倫〈本草綱目〉「鹿茸切片不能太薄」',
    fun: '切片不能太薄，注音不能太混',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-020', text: '當歸枸杞', target: '杞', zhuyin: 'ㄑㄧˇ',
    distractors: ['ㄐㄧˇ', 'ㄑㄧˊ'],
    meaning: '枸杞：紅色小果實的藥材。周杰倫〈本草綱目〉「山藥當歸枸杞GO」',
    fun: '到了保溫杯泡枸杞的年紀，唸法也該跟著養生',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-021', text: '迷迭香', target: '迭', zhuyin: 'ㄉㄧㄝˊ',
    distractors: ['ㄉㄞˋ', 'ㄉㄧㄝˇ'],
    meaning: '香草植物，西餐常用香料。周杰倫〈迷迭香〉歌名',
    fun: '迭唸成代，整首歌的慵懶感瞬間出戲',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-022', text: '屋簷如懸崖', target: '簷', zhuyin: 'ㄧㄢˊ',
    distractors: ['ㄓㄢ', 'ㄉㄢˋ'],
    meaning: '屋簷：屋頂邊緣突出的部分。周杰倫〈千里之外〉「屋簷如懸崖」',
    fun: '費玉清都接得那麼穩，你連簷都唸不穩',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-023', text: '化成一縷香', target: '縷', zhuyin: 'ㄌㄩˇ',
    distractors: ['ㄌㄡˊ', 'ㄌㄩˊ'],
    meaning: '縷：量詞，計算細長柔軟的東西。周杰倫〈菊花台〉「夢在遠方 化成一縷香」',
    fun: '唸成一樓香，夢直接從遠方掉到一樓',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-024', text: '山峰沒有稜角', target: '稜', zhuyin: 'ㄌㄥˊ',
    distractors: ['ㄌㄧㄥˊ', 'ㄌㄥˋ'],
    meaning: '稜角：物體的邊角。動力火車〈當〉「當山峰沒有稜角的時候」',
    fun: '還珠格格主題曲，山無稜之前你先別無能',
    tags: ['歌詞', '動力火車'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-025', text: '挪威的森林', target: '挪', zhuyin: 'ㄋㄨㄛˊ',
    distractors: ['ㄋㄚˊ', 'ㄋㄨㄛˋ'],
    meaning: '挪威：北歐國家。伍佰〈挪威的森林〉歌名',
    fun: '心中那片森林還在，注音不要在森林裡迷路',
    tags: ['歌詞', '伍佰'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-026', text: '暫時將你眼睛', target: '暫', zhuyin: 'ㄓㄢˋ',
    distractors: ['ㄗㄢˋ', 'ㄐㄧㄢˋ'],
    meaning: '暫時：短時間內。伍佰〈Last Dance〉「所以暫時將你眼睛閉了起來」',
    fun: '想見你讓這首歌復活，唸成ㄗㄢˋ的人會被陳韻如瞪',
    tags: ['歌詞', '伍佰'], difficulty: 2, era: 'meme'
  },
  {
    id: 'ly-027', text: '一波又來侵襲', target: '襲', zhuyin: 'ㄒㄧˊ',
    distractors: ['ㄒㄧˋ', 'ㄌㄨㄥˊ'],
    meaning: '侵襲：侵犯襲擊。任賢齊〈傷心太平洋〉「一波還未平息 一波又來侵襲」',
    fun: '一波唸錯還未平息，一波又來唸錯，深深太平洋底深深傷心',
    tags: ['歌詞', '任賢齊'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-028', text: '舞孃', target: '孃', zhuyin: 'ㄋㄧㄤˊ',
    distractors: ['ㄖㄤˊ', 'ㄋㄤˊ'],
    meaning: '以舞蹈表演為業的女子。蔡依林〈舞孃〉歌名',
    fun: '孃跟娘同音不同字，看到一堆筆畫不要嚇到唸ㄖㄤˊ',
    tags: ['歌詞', '蔡依林'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-029', text: '睫毛彎彎', target: '睫', zhuyin: 'ㄐㄧㄝˊ',
    distractors: ['ㄐㄧㄝ', 'ㄑㄧㄝˋ'],
    meaning: '睫毛：眼瞼邊緣的細毛。王心凌〈睫毛彎彎〉歌名',
    fun: '甜心教主的睫毛，要唸二聲才翹得起來',
    tags: ['歌詞', '王心凌'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-030', text: '曖昧', target: '曖', zhuyin: 'ㄞˋ',
    distractors: ['ㄞˇ', 'ㄋㄨㄢˇ'],
    meaning: '態度含糊不明朗。楊丞琳〈曖昧〉歌名',
    fun: '曖昧讓人受盡委屈，唸錯讓人直接出局',
    tags: ['歌詞', '楊丞琳'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-031', text: '寂寞寂寞就好', target: '寞', zhuyin: 'ㄇㄛˋ',
    distractors: ['ㄇㄛˊ', 'ㄇㄨˋ'],
    meaning: '寂寞：孤單冷清。田馥甄〈寂寞寂寞就好〉歌名',
    fun: '寞唸對就好，這樣的結局好不好',
    tags: ['歌詞', '田馥甄'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-032', text: '言不由衷', target: '衷', zhuyin: 'ㄓㄨㄥ',
    distractors: ['ㄓㄨㄥˋ', 'ㄔㄨㄥˊ'],
    meaning: '說的話不是出自真心。徐佳瑩〈言不由衷〉歌名',
    fun: '衷是一聲，唸四聲的人才是真的言不由衷',
    tags: ['歌詞', '徐佳瑩'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-033', text: '崇拜', target: '崇', zhuyin: 'ㄔㄨㄥˊ',
    distractors: ['ㄘㄨㄥˊ', 'ㄙㄨㄟˋ'],
    meaning: '尊敬欽佩。梁靜茹〈崇拜〉歌名',
    fun: '崇跟祟是雙胞胎，一個被崇拜、一個在作祟',
    tags: ['歌詞', '梁靜茹'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-034', text: '儘管再危險', target: '儘', zhuyin: 'ㄐㄧㄣˇ',
    distractors: ['ㄐㄧㄣˋ', 'ㄐㄧㄢˇ'],
    meaning: '儘管：縱使、即使。蕭敬騰〈王妃〉「夜太美 儘管再危險」',
    fun: '老蕭唱得再霸氣，你唸四聲就破音',
    tags: ['歌詞', '蕭敬騰'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-035', text: '倒數', target: '倒', zhuyin: 'ㄉㄠˋ',
    distractors: ['ㄉㄠˇ', 'ㄉㄠ'],
    meaning: '由大到小逆向計數。鄧紫棋〈倒數〉歌名',
    fun: '倒數的倒是四聲，跌倒的倒才三聲，唸錯重新倒數三秒',
    tags: ['歌詞', '鄧紫棋'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-036', text: '泡沫', target: '沫', zhuyin: 'ㄇㄛˋ',
    distractors: ['ㄇㄟˋ', 'ㄇㄛˊ'],
    meaning: '液體表面的氣泡，比喻虛幻易滅。鄧紫棋〈泡沫〉歌名',
    fun: '全是泡沫，唸錯的注音一觸就破',
    tags: ['歌詞', '鄧紫棋'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-037', text: '披星戴月', target: '戴', zhuyin: 'ㄉㄞˋ',
    distractors: ['ㄉㄞ', 'ㄗㄞˋ'],
    meaning: '形容早出晚歸、日夜奔波。告五人〈披星戴月的想你〉歌名',
    fun: '想一個人想到披星戴月，注音也要戴好戴滿',
    tags: ['歌詞', '告五人'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-038', text: '乾杯', target: '乾', zhuyin: 'ㄍㄢ',
    distractors: ['ㄑㄧㄢˊ', 'ㄍㄢˋ'],
    meaning: '把杯中飲料一口喝完。五月天〈乾杯〉歌名',
    fun: '唸成ㄑㄧㄢˊ杯的人，自罰一杯',
    tags: ['歌詞', '五月天'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-039', text: '稻香', target: '稻', zhuyin: 'ㄉㄠˋ',
    distractors: ['ㄉㄠˇ', 'ㄊㄠˊ'],
    meaning: '稻穀的香氣。周杰倫〈稻香〉歌名',
    fun: '回家吧回到最初的美好，順便把正確注音帶回來',
    tags: ['歌詞', '周杰倫'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-040', text: '龍捲風', target: '捲', zhuyin: 'ㄐㄩㄢˇ',
    distractors: ['ㄐㄩㄢˋ', 'ㄑㄩㄢˊ'],
    meaning: '強烈的旋轉風暴。周杰倫〈龍捲風〉歌名',
    fun: '愛像一陣風，唸錯直接被捲走',
    tags: ['歌詞', '周杰倫'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-041', text: '檸檬草的味道', target: '檸', zhuyin: 'ㄋㄧㄥˊ',
    distractors: ['ㄋㄧㄥˇ', 'ㄋㄧㄥˋ'],
    meaning: '檸檬草：香茅類香草植物。蔡依林〈檸檬草的味道〉歌名',
    fun: '檸是二聲，唸三聲酸度直接超標',
    tags: ['歌詞', '蔡依林'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-042', text: '伊人憔悴', target: '悴', zhuyin: 'ㄘㄨㄟˋ',
    distractors: ['ㄗㄨˊ', 'ㄘㄨㄟˊ'],
    meaning: '憔悴：面容枯瘦疲憊。周杰倫〈髮如雪〉「狼牙月 伊人憔悴」',
    fun: '為注音消得人憔悴，衣帶漸寬終不悔',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-043', text: '一盞離愁', target: '盞', zhuyin: 'ㄓㄢˇ',
    distractors: ['ㄗㄢˇ', 'ㄐㄧㄢˇ'],
    meaning: '盞：量詞，計算燈或杯。周杰倫〈東風破〉「一盞離愁孤單佇立在窗口」',
    fun: '一盞唸錯，離愁直接變離譜',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-044', text: '孤單佇立', target: '佇', zhuyin: 'ㄓㄨˋ',
    distractors: ['ㄔㄨˋ', 'ㄓㄨˊ'],
    meaning: '佇立：長時間站立。周杰倫〈東風破〉「一盞離愁孤單佇立在窗口」',
    fun: '在窗口佇立太久沒關係，記得唸四聲再走',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-045', text: '血腥愛情故事', target: '腥', zhuyin: 'ㄒㄧㄥ',
    distractors: ['ㄒㄧㄥˇ', 'ㄒㄧㄥˋ'],
    meaning: '腥：血的氣味。張惠妹〈血腥愛情故事〉歌名',
    fun: '腥是一聲，唸三聲的愛情故事更血腥',
    tags: ['歌詞', '張惠妹'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-046', text: '煙味瀰漫', target: '瀰', zhuyin: 'ㄇㄧˊ',
    distractors: ['ㄋㄧˊ', 'ㄇㄧˇ'],
    meaning: '瀰漫：煙霧散布充滿。周杰倫〈雙截棍〉「岩燒店的煙味瀰漫」',
    fun: '快使用雙截棍之前，先把瀰唸對，哼',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-047', text: '雙截棍', target: '截', zhuyin: 'ㄐㄧㄝˊ',
    distractors: ['ㄐㄧㄝˋ', 'ㄗㄞˋ'],
    meaning: '截：段。兩節相連的武器。周杰倫〈雙截棍〉歌名',
    fun: '哼哼哈兮唱得多大聲，截唸錯就多丟臉',
    tags: ['歌詞', '周杰倫'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-048', text: '漢隸仿前朝', target: '隸', zhuyin: 'ㄌㄧˋ',
    distractors: ['ㄉㄞˋ', 'ㄌㄧˊ'],
    meaning: '隸：隸書，漢代盛行的字體。周杰倫〈青花瓷〉「在瓶底書漢隸仿前朝的飄逸」',
    fun: '瓶底寫的是漢隸，你嘴裡唸出來的是哪一朝',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  }
];
