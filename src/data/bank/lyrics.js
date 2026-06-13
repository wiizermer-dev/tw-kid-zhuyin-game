/**
 * 流行歌詞 — KTV 點歌前先學會唸
 * schema 同 tricky.js；注音以教育部《國語辭典簡編本》為主（查無才退《重編國語辭典修訂本》）
 */
export default [
  {
    id: 'ly-001', text: '擱淺', target: '擱', zhuyin: 'ㄍㄜ',
    distractors: ['ㄍㄜˊ', 'ㄎㄜˋ', 'ㄍㄜˇ'],
    meaning: '船隻駛入淺灘動彈不得，比喻事情停滯。周杰倫〈擱淺〉歌名',
    fun: 'KTV 點這首裝憂鬱，結果歌名先唸錯，感情直接擱淺',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-002', text: '紅塵客棧', target: '棧', zhuyin: 'ㄓㄢˋ',
    distractors: ['ㄗㄢˋ', 'ㄐㄧㄢˇ', 'ㄔㄢˋ'],
    meaning: '供旅客投宿的處所。周杰倫〈紅塵客棧〉歌名',
    fun: '棧字唸錯，老闆娘直接跟你說客滿',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-003', text: '爾虞我詐', target: '虞', zhuyin: 'ㄩˊ',
    distractors: ['ㄨˊ', 'ㄩˇ', 'ㄨˇ'],
    meaning: '彼此猜疑、互相欺騙。林俊傑〈曹操〉「爾虞我詐是三國」',
    fun: '唱曹操氣勢要夠，虞一唸錯氣勢直接漏風',
    tags: ['歌詞', '林俊傑'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-004', text: '炊煙裊裊', target: '裊', zhuyin: 'ㄋㄧㄠˇ',
    distractors: ['ㄒㄧㄠ', 'ㄋㄧㄠˊ', 'ㄋㄧㄠˋ'],
    meaning: '煙氣繚繞上升的樣子。周杰倫〈青花瓷〉「炊煙裊裊昇起」',
    fun: '中國風歌詞之王，KTV 大家都用哼的帶過，唸出來才見真章',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-005', text: '芭蕉惹驟雨', target: '驟', zhuyin: 'ㄗㄡˋ',
    distractors: ['ㄓㄡˋ', 'ㄐㄩˋ', 'ㄗㄡˊ'],
    meaning: '驟雨：急而大的雨。周杰倫〈青花瓷〉「簾外芭蕉惹驟雨」',
    fun: '全台灣都唸ㄓㄡˋ，教育部審訂音偏偏是ㄗㄡˋ，比驟雨還讓人措手不及',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-006', text: '臨摹宋體', target: '摹', zhuyin: 'ㄇㄛˊ',
    distractors: ['ㄇㄨˊ', 'ㄇㄛˋ', 'ㄇㄛ'],
    meaning: '照著範本摹寫。周杰倫〈青花瓷〉「臨摹宋體落款時卻惦記著你」',
    fun: '摹跟模長得太像，連方文山都救不了你',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-007', text: '釉色渲染', target: '渲', zhuyin: 'ㄒㄩㄢˋ',
    distractors: ['ㄒㄩㄢ', 'ㄒㄩㄢˊ', 'ㄒㄩㄢˇ'],
    meaning: '渲染：國畫技法，以水墨暈染畫面。周杰倫〈青花瓷〉「釉色渲染仕女圖」',
    fun: '渲是四聲，唸一聲的人仕女圖直接沒暈開',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-008', text: '伽藍寺', target: '伽', zhuyin: 'ㄑㄧㄝˊ',
    distractors: ['ㄐㄧㄚ', 'ㄍㄚ', 'ㄑㄧㄝˇ'],
    meaning: '伽藍：佛寺。周杰倫〈煙花易冷〉「伽藍寺聽雨聲盼永恆」',
    fun: '瑜伽唸一個音、伽藍唸另一個音，這個字根本變色龍',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-009', text: '斑駁', target: '駁', zhuyin: 'ㄅㄛˊ',
    distractors: ['ㄅㄛ', 'ㄆㄛˋ', 'ㄅㄛˇ'],
    meaning: '色彩雜亂、深淺不一。周杰倫〈煙花易冷〉「斑駁的城門」',
    fun: '城門都斑駁了，你的注音不要也跟著剝落',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-010', text: '楔形文字', target: '楔', zhuyin: 'ㄒㄧㄝ',
    distractors: ['ㄒㄧㄝˋ', 'ㄑㄧˋ', 'ㄒㄧㄝˊ'],
    meaning: '古代兩河流域使用的文字。周杰倫〈愛在西元前〉「用楔形文字刻下了永遠」',
    fun: '簡編本「楔」唸一聲ㄒㄧㄝ，楔子、楔形都一樣，常被唸成四聲',
    tags: ['歌詞', '周杰倫'], difficulty: 5, era: 'modern'
  },
  {
    id: 'ly-011', text: '吳儂軟語', target: '儂', zhuyin: 'ㄋㄨㄥˊ',
    distractors: ['ㄋㄤˊ', 'ㄋㄨㄥˋ', 'ㄋㄨㄥˇ'],
    meaning: '形容蘇州一帶柔軟好聽的口音。周杰倫〈上海一九四三〉「說著一口吳儂軟語的姑娘」',
    fun: '儂唸錯就不軟了，直接變吳硬硬語',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-012', text: '嗜血的螞蟻', target: '嗜', zhuyin: 'ㄕˋ',
    distractors: ['ㄕˊ', 'ㄑㄧˋ', 'ㄕˇ'],
    meaning: '嗜：特別愛好。周杰倫〈夜曲〉「一群嗜血的螞蟻被腐肉所吸引」',
    fun: '為你彈奏蕭邦的夜曲，先把嗜唸對才有資格紀念我的死去',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-013', text: '止戰之殤', target: '殤', zhuyin: 'ㄕㄤ',
    distractors: ['ㄕㄤˋ', 'ㄧㄤˊ', 'ㄕㄤˊ'],
    meaning: '殤：未成年而死，引申為戰禍的傷痛。周杰倫〈止戰之殤〉歌名',
    fun: '唸成「止戰之傷」意思有到但注音沒到，可惜',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-014', text: '蘭亭臨帖', target: '帖', zhuyin: 'ㄊㄧㄝˇ',
    distractors: ['ㄊㄧㄝˋ', 'ㄊㄧㄝ', 'ㄊㄧㄝˊ'],
    meaning: '臨帖：照著字帖練字。周杰倫〈蘭亭序〉「蘭亭臨帖 行書如行雲流水」',
    fun: '臨帖、字帖、碑帖都唸三聲ㄊㄧㄝˇ，KTV 唱錯就破功',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-015', text: '微醺的歲月', target: '醺', zhuyin: 'ㄒㄩㄣ',
    distractors: ['ㄒㄩㄣˋ', 'ㄒㄩㄥ', 'ㄒㄩㄣˊ'],
    meaning: '微醺：略帶醉意。周杰倫〈髮如雪〉「紅塵醉 微醺的歲月」',
    fun: '微醺很浪漫，唸成四聲就只剩宿醉',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-017', text: '愛情懸崖', target: '崖', zhuyin: 'ㄧㄞˊ',
    distractors: ['ㄧㄚˊ', 'ㄞˊ', 'ㄧㄞˇ'],
    meaning: '懸崖：高聳陡峭的山壁。周杰倫〈愛情懸崖〉歌名',
    fun: 'ㄧㄚˊ是對岸唸法，台灣標準是ㄧㄞˊ，談戀愛前先搞清楚邊界',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-018', text: '電線桿', target: '桿', zhuyin: 'ㄍㄢˇ',
    distractors: ['ㄍㄢ', 'ㄍㄢˋ', 'ㄍㄢˊ'],
    meaning: '架設電線的柱子。周杰倫〈七里香〉「窗外的麻雀在電線桿上多嘴」',
    fun: '麻雀都會多嘴了，你還不會唸桿',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-019', text: '鹿茸切片', target: '茸', zhuyin: 'ㄖㄨㄥˊ',
    distractors: ['ㄑㄧˋ', 'ㄖㄨㄥˇ', 'ㄖㄨㄥ'],
    meaning: '鹿茸：鹿的幼角，珍貴藥材。周杰倫〈本草綱目〉「鹿茸切片不能太薄」',
    fun: '切片不能太薄，注音不能太混',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-020', text: '當歸枸杞', target: '杞', zhuyin: 'ㄑㄧˇ',
    distractors: ['ㄐㄧˇ', 'ㄑㄧˊ', 'ㄑㄧˋ'],
    meaning: '枸杞：紅色小果實的藥材。周杰倫〈本草綱目〉「山藥當歸枸杞GO」',
    fun: '到了保溫杯泡枸杞的年紀，唸法也該跟著養生',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-021', text: '迷迭香', target: '迭', zhuyin: 'ㄉㄧㄝˊ',
    distractors: ['ㄉㄞˋ', 'ㄉㄧㄝˇ', 'ㄉㄧㄝˋ'],
    meaning: '香草植物，西餐常用香料。周杰倫〈迷迭香〉歌名',
    fun: '迭唸成代，整首歌的慵懶感瞬間出戲',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-022', text: '屋簷如懸崖', target: '簷', zhuyin: 'ㄧㄢˊ',
    distractors: ['ㄓㄢ', 'ㄉㄢˋ', 'ㄧㄢ'],
    meaning: '屋簷：屋頂邊緣突出的部分。周杰倫〈千里之外〉「屋簷如懸崖」',
    fun: '費玉清都接得那麼穩，你連簷都唸不穩',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-023', text: '化成一縷香', target: '縷', zhuyin: 'ㄌㄩˇ',
    distractors: ['ㄌㄡˊ', 'ㄌㄩˊ', 'ㄌㄩˋ'],
    meaning: '縷：量詞，計算細長柔軟的東西。周杰倫〈菊花台〉「夢在遠方 化成一縷香」',
    fun: '唸成一樓香，夢直接從遠方掉到一樓',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-024', text: '山峰沒有稜角', target: '稜', zhuyin: 'ㄌㄥˊ',
    distractors: ['ㄌㄧㄥˊ', 'ㄌㄥˋ', 'ㄌㄥ'],
    meaning: '稜角：物體的邊角。動力火車〈當〉「當山峰沒有稜角的時候」',
    fun: '還珠格格主題曲，山無稜之前你先別無能',
    tags: ['歌詞', '動力火車'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-025', text: '挪威的森林', target: '挪', zhuyin: 'ㄋㄨㄛˊ',
    distractors: ['ㄋㄚˊ', 'ㄋㄨㄛˋ', 'ㄋㄨㄛ'],
    meaning: '挪威：北歐國家。伍佰〈挪威的森林〉歌名',
    fun: '心中那片森林還在，注音不要在森林裡迷路',
    tags: ['歌詞', '伍佰'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-026', text: '暫時將你眼睛', target: '暫', zhuyin: 'ㄓㄢˋ',
    distractors: ['ㄗㄢˋ', 'ㄐㄧㄢˋ', 'ㄓㄢˊ'],
    meaning: '暫時：短時間內。伍佰〈Last Dance〉「所以暫時將你眼睛閉了起來」',
    fun: '想見你讓這首歌復活，唸成ㄗㄢˋ的人會被陳韻如瞪',
    tags: ['歌詞', '伍佰'], difficulty: 2, era: 'meme'
  },
  {
    id: 'ly-027', text: '一波又來侵襲', target: '襲', zhuyin: 'ㄒㄧˊ',
    distractors: ['ㄒㄧˋ', 'ㄌㄨㄥˊ', 'ㄒㄧ'],
    meaning: '侵襲：侵犯襲擊。任賢齊〈傷心太平洋〉「一波還未平息 一波又來侵襲」',
    fun: '一波唸錯還未平息，一波又來唸錯，深深太平洋底深深傷心',
    tags: ['歌詞', '任賢齊'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-028', text: '舞孃', target: '孃', zhuyin: 'ㄋㄧㄤˊ',
    distractors: ['ㄖㄤˊ', 'ㄋㄤˊ', 'ㄋㄧㄤˇ'],
    meaning: '以舞蹈表演為業的女子。蔡依林〈舞孃〉歌名',
    fun: '孃跟娘同音不同字，看到一堆筆畫不要嚇到唸ㄖㄤˊ',
    tags: ['歌詞', '蔡依林'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-032', text: '言不由衷', target: '衷', zhuyin: 'ㄓㄨㄥ',
    distractors: ['ㄓㄨㄥˋ', 'ㄔㄨㄥˊ', 'ㄓㄨㄥˊ'],
    meaning: '說的話不是出自真心。徐佳瑩〈言不由衷〉歌名',
    fun: '衷是一聲，唸四聲的人才是真的言不由衷',
    tags: ['歌詞', '徐佳瑩'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-033', text: '崇拜', target: '崇', zhuyin: 'ㄔㄨㄥˊ',
    distractors: ['ㄘㄨㄥˊ', 'ㄙㄨㄟˋ', 'ㄔㄨㄥ'],
    meaning: '尊敬欽佩。梁靜茹〈崇拜〉歌名',
    fun: '崇跟祟是雙胞胎，一個被崇拜、一個在作祟',
    tags: ['歌詞', '梁靜茹'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-034', text: '儘管再危險', target: '儘', zhuyin: 'ㄐㄧㄣˇ',
    distractors: ['ㄐㄧㄣˋ', 'ㄐㄧㄢˇ', 'ㄐㄧㄣ'],
    meaning: '儘管：縱使、即使。蕭敬騰〈王妃〉「夜太美 儘管再危險」',
    fun: '老蕭唱得再霸氣，你唸四聲就破音',
    tags: ['歌詞', '蕭敬騰'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-035', text: '倒數', target: '倒', zhuyin: 'ㄉㄠˋ',
    distractors: ['ㄉㄠˇ', 'ㄉㄠ', 'ㄉㄠˊ'],
    meaning: '由大到小逆向計數。鄧紫棋〈倒數〉歌名',
    fun: '倒數的倒是四聲，跌倒的倒才三聲，唸錯重新倒數三秒',
    tags: ['歌詞', '鄧紫棋'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-037', text: '披星戴月', target: '戴', zhuyin: 'ㄉㄞˋ',
    distractors: ['ㄉㄞ', 'ㄗㄞˋ', 'ㄉㄞˇ'],
    meaning: '形容早出晚歸、日夜奔波。告五人〈披星戴月的想你〉歌名',
    fun: '想一個人想到披星戴月，注音也要戴好戴滿',
    tags: ['歌詞', '告五人'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-042', text: '伊人憔悴', target: '悴', zhuyin: 'ㄘㄨㄟˋ',
    distractors: ['ㄗㄨˊ', 'ㄘㄨㄟˊ', 'ㄘㄨㄟ'],
    meaning: '憔悴：面容枯瘦疲憊。周杰倫〈髮如雪〉「狼牙月 伊人憔悴」',
    fun: '為注音消得人憔悴，衣帶漸寬終不悔',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-043', text: '一盞離愁', target: '盞', zhuyin: 'ㄓㄢˇ',
    distractors: ['ㄗㄢˇ', 'ㄐㄧㄢˇ', 'ㄓㄢˊ'],
    meaning: '盞：量詞，計算燈或杯。周杰倫〈東風破〉「一盞離愁孤單佇立在窗口」',
    fun: '一盞唸錯，離愁直接變離譜',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-044', text: '孤單佇立', target: '佇', zhuyin: 'ㄓㄨˋ',
    distractors: ['ㄔㄨˋ', 'ㄓㄨˊ', 'ㄓㄨ'],
    meaning: '佇立：長時間站立。周杰倫〈東風破〉「一盞離愁孤單佇立在窗口」',
    fun: '在窗口佇立太久沒關係，記得唸四聲再走',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-045', text: '血腥愛情故事', target: '腥', zhuyin: 'ㄒㄧㄥ',
    distractors: ['ㄒㄧㄥˇ', 'ㄒㄧㄥˋ', 'ㄒㄧㄥˊ'],
    meaning: '腥：血的氣味。張惠妹〈血腥愛情故事〉歌名',
    fun: '腥是一聲，唸三聲的愛情故事更血腥',
    tags: ['歌詞', '張惠妹'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-046', text: '煙味瀰漫', target: '瀰', zhuyin: 'ㄇㄧˊ',
    distractors: ['ㄋㄧˊ', 'ㄇㄧˇ', 'ㄇㄧˋ'],
    meaning: '瀰漫：煙霧散布充滿。周杰倫〈雙截棍〉「岩燒店的煙味瀰漫」',
    fun: '快使用雙截棍之前，先把瀰唸對，哼',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-047', text: '雙截棍', target: '截', zhuyin: 'ㄐㄧㄝˊ',
    distractors: ['ㄐㄧㄝˋ', 'ㄗㄞˋ', 'ㄐㄧㄝ'],
    meaning: '截：段。兩節相連的武器。周杰倫〈雙截棍〉歌名',
    fun: '哼哼哈兮唱得多大聲，截唸錯就多丟臉',
    tags: ['歌詞', '周杰倫'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-048', text: '漢隸仿前朝', target: '隸', zhuyin: 'ㄌㄧˋ',
    distractors: ['ㄉㄞˋ', 'ㄌㄧˊ', 'ㄌㄧ'],
    meaning: '隸：隸書，漢代盛行的字體。周杰倫〈青花瓷〉「在瓶底書漢隸仿前朝的飄逸」',
    fun: '瓶底寫的是漢隸，你嘴裡唸出來的是哪一朝',
    tags: ['歌詞', '周杰倫'], difficulty: 4, era: 'modern'
  },
  {
    id: 'ly-049', text: '潑墨山水畫', target: '潑', zhuyin: 'ㄆㄛ',
    distractors: ['ㄆㄛˋ', 'ㄅㄛ', 'ㄆㄟ'],
    meaning: '潑灑墨汁的畫法。周杰倫〈青花瓷〉「天青色等煙雨」段',
    fun: '潑唸一聲。唱的時候含滷蛋帶過去，唸的時候就現形了',
    tags: ['歌詞', '周杰倫', '唱腔誤導'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-050', text: '嫣然的一笑', target: '嫣', zhuyin: 'ㄧㄢ',
    distractors: ['ㄧㄢˋ', 'ㄧㄢˊ', 'ㄧㄢˇ'],
    meaning: '笑得嬌媚動人。周杰倫〈青花瓷〉「妳嫣然的一笑如含苞待放」',
    fun: '嫣唸一聲，旋律一拐大家就跟著唱成二聲，跟著歌學注音很危險',
    tags: ['歌詞', '周杰倫', '唱腔誤導'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-051', text: '籬笆外的古道', target: '籬', zhuyin: 'ㄌㄧˊ',
    distractors: ['ㄌㄧˇ', 'ㄌㄧˋ', 'ㄅㄚ'],
    meaning: '竹編圍欄。周杰倫〈東風破〉「籬笆外的古道我牽著你走過」',
    fun: '籬唸ㄌㄧˊ。歌裡唱得很快，快到沒人發現自己唸錯',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-052', text: '淒美了離別', target: '淒', zhuyin: 'ㄑㄧ',
    distractors: ['ㄑㄧˇ', 'ㄐㄧ', 'ㄑㄧˋ'],
    meaning: '悲傷而美。周杰倫〈髮如雪〉「妳髮如雪淒美了離別」',
    fun: '淒唸一聲。歌詞越虐，越要唸對才有資格傷心',
    tags: ['歌詞', '周杰倫'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-053', text: '哼哼哈兮', target: '兮', zhuyin: 'ㄒㄧ',
    distractors: ['ㄒㄧˋ', 'ㄎㄜ', 'ㄑㄧˋ'],
    meaning: '文言語助詞。周杰倫〈雙截棍〉的招牌吆喝',
    fun: '兮唸一聲，楚辭等級的語助詞。周杰倫把它喊成全民口號',
    tags: ['歌詞', '周杰倫', '唱腔誤導'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-054', text: '愛溢出就像雨水', target: '溢', zhuyin: 'ㄧˋ',
    distractors: ['ㄧㄠˋ', 'ㄧ', 'ㄧˊ'],
    meaning: '滿出來。周杰倫〈七里香〉「雨下整夜我的愛溢出就像雨水」',
    fun: '溢唸ㄧˋ。愛可以滿出來，注音不能歪出去',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-055', text: '穿梭時間的畫面', target: '梭', zhuyin: 'ㄙㄨㄛ',
    distractors: ['ㄕㄨㄛ', 'ㄙㄨㄛˋ', 'ㄐㄩㄣ'],
    meaning: '來回快速移動。周杰倫〈反方向的鐘〉',
    fun: '梭唸ㄙㄨㄛ，織布的梭子。時光梭來梭去，讀音不要跟著飄',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-056', text: '黃金葛爬滿雕花門窗', target: '葛', zhuyin: 'ㄍㄜˊ',
    distractors: ['ㄍㄜˇ', 'ㄍㄜˋ', 'ㄍㄜ'],
    meaning: '黃金葛：常見觀葉植物。周杰倫〈上海一九四三〉',
    fun: '植物的葛唸二聲，姓氏才唸三聲。全台灣的盆栽行都在唸錯',
    tags: ['歌詞', '周杰倫', '唱腔誤導'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-057', text: '禮物不需挑最貴', target: '挑', zhuyin: 'ㄊㄧㄠ',
    distractors: ['ㄊㄧㄠˇ', 'ㄊㄧㄠˋ', 'ㄉㄧㄠ'],
    meaning: '挑選。周杰倫〈告白氣球〉',
    fun: '挑選唸一聲，挑燈、挑釁才唸三聲。送禮跟讀音都不能隨便',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-058', text: '香榭的落葉', target: '榭', zhuyin: 'ㄒㄧㄝˋ',
    distractors: ['ㄒㄧㄝ', 'ㄒㄧㄝˇ', 'ㄕㄜˋ'],
    meaning: '香榭大道，巴黎名街。周杰倫〈告白氣球〉',
    fun: '榭唸ㄒㄧㄝˋ，臺榭的榭。歌唱得浪漫，唸錯就不巴黎了',
    tags: ['歌詞', '周杰倫', '唱腔誤導'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-059', text: '仁慈的父我已墜入', target: '墜', zhuyin: 'ㄓㄨㄟˋ',
    distractors: ['ㄉㄨㄛˋ', 'ㄓㄨㄟ', 'ㄙㄨㄟˋ'],
    meaning: '掉落。周杰倫〈以父之名〉開場',
    fun: '墜唸ㄓㄨㄟˋ，跟墮落的墮不同字。氣氛全到位，就差讀音沒到',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-060', text: '晨曦的光', target: '曦', zhuyin: 'ㄒㄧ',
    distractors: ['ㄒㄧˇ', 'ㄑㄧˊ', 'ㄒㄧˊ'],
    meaning: '清晨的陽光。周杰倫〈夜的第七章〉「晨曦的光風乾最後一行憂傷」',
    fun: '曦唸一聲ㄒㄧ。偵探故事的收尾，別讓讀音變懸案',
    tags: ['歌詞', '周杰倫'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-061', text: '琥珀色黃昏像糖', target: '珀', zhuyin: 'ㄆㄛˋ',
    distractors: ['ㄅㄛˊ', 'ㄆㄛ', 'ㄆㄚ'],
    meaning: '琥珀：金黃透明的樹脂化石。周杰倫〈園遊會〉',
    fun: '珀唸ㄆㄛˋ不是ㄅㄛˊ。琥珀色的黃昏很美，唸錯就糊掉',
    tags: ['歌詞', '周杰倫', '唱腔誤導'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-064', text: '深埋在美索不達米亞平原', target: '埋', zhuyin: 'ㄇㄞˊ',
    distractors: ['ㄇㄢˊ', 'ㄇㄞˇ', 'ㄌㄧˊ'],
    meaning: '埋藏。周杰倫〈愛在西元前〉',
    fun: '埋藏唸ㄇㄞˊ，埋怨才唸ㄇㄢˊ。愛情史詩級的埋，別唸成抱怨',
    tags: ['歌詞', '周杰倫'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-065', text: '喋喋不休時不我予的哀愁', target: '喋', zhuyin: 'ㄉㄧㄝˊ',
    distractors: ['ㄓㄚ', 'ㄉㄧㄝˋ', 'ㄕㄜˋ'],
    meaning: '說個不停。李宗盛〈山丘〉',
    fun: '喋唸ㄉㄧㄝˊ。李宗盛咬字再鬆，這個字也輪不到你自由發揮',
    tags: ['歌詞', '李宗盛', '唱腔誤導'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-066', text: '漂洋過海來看你', target: '漂', zhuyin: 'ㄆㄧㄠ',
    distractors: ['ㄆㄧㄠˋ', 'ㄆㄧㄠˇ', 'ㄅㄧㄠ'],
    meaning: '漂浮渡海。李宗盛詞、娃娃原唱',
    fun: '漂流唸一聲，漂亮唸四聲，漂白唸三聲。一個字三張臉',
    tags: ['歌詞', '李宗盛'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-067', text: '愛你孤身走暗巷', target: '巷', zhuyin: 'ㄒㄧㄤˋ',
    distractors: ['ㄏㄤˋ', 'ㄒㄧㄤˇ', 'ㄒㄧㄤ'],
    meaning: '小街道。陳奕迅〈孤勇者〉',
    fun: '巷一律唸ㄒㄧㄤˋ，連巷道也是（簡編本沒收ㄏㄤˋ）。小朋友的國歌，讀音要顧',
    tags: ['歌詞', '陳奕迅'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-068', text: '寧靜的夏天', target: '寧', zhuyin: 'ㄋㄧㄥˊ',
    distractors: ['ㄋㄧㄥˋ', 'ㄋㄧㄥ', 'ㄇㄧㄥˊ'],
    meaning: '安靜。梁靜茹〈寧夏〉',
    fun: '安寧的寧唸二聲，寧可的寧唸四聲。歌名寧夏就是寧靜的夏天',
    tags: ['歌詞', '梁靜茹'], difficulty: 2, era: 'modern'
  },
  {
    id: 'ly-069', text: '不淋漓盡致不痛快', target: '漓', zhuyin: 'ㄌㄧˊ',
    distractors: ['ㄌㄧˇ', 'ㄌㄧㄣˊ', 'ㄌㄧˋ'],
    meaning: '酣暢透澈。信樂團〈死了都要愛〉',
    fun: '漓唸ㄌㄧˊ。飆高音前先把字唸對，不然只有破音淋漓',
    tags: ['歌詞', '唱腔誤導'], difficulty: 3, era: 'modern'
  },
  {
    id: 'ly-070', text: '不打擾是我的溫柔', target: '擾', zhuyin: 'ㄖㄠˇ',
    distractors: ['ㄋㄠˇ', 'ㄖㄠˊ', 'ㄧㄡ'],
    meaning: '打攪、驚動。五月天〈溫柔〉',
    fun: '擾唸ㄖㄠˇ。最溫柔的距離，是連讀音都不打擾',
    tags: ['歌詞', '五月天'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-071', text: '刻在我心底的名字', target: '刻', zhuyin: 'ㄎㄜˋ',
    distractors: ['ㄎㄜ', 'ㄎㄜˇ', 'ㄏㄜˊ'],
    meaning: '雕刻、銘記。盧廣仲同名電影主題曲',
    fun: '刻唸四聲。刻在心底的名字，不要連注音也刻錯',
    tags: ['歌詞', '盧廣仲'], difficulty: 1, era: 'modern'
  },
  {
    id: 'ly-072', text: '抓住那隻蟬', target: '蟬', zhuyin: 'ㄔㄢˊ',
    distractors: ['ㄕㄢˋ', 'ㄉㄢ', 'ㄔㄢ'],
    meaning: '夏天會叫的昆蟲。五月天〈如煙〉「七歲的那一年抓住那隻蟬」',
    fun: '蟬唸ㄔㄢˊ，跟禪修的禪同音不同字。抓蟬之前先抓對音',
    tags: ['歌詞', '五月天'], difficulty: 1, era: 'modern'
  }
];
