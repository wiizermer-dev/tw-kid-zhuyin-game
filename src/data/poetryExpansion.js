/**
 * 大量擴充題庫 - 詩詞篇 (100+ 題)
 * 唐詩宋詞經典名句
 */

// ============================================
// 詩詞讀音 - 唐詩 (Part 1)
// ============================================
export const poetryBatch1 = [
    // 李白
    { id: "pb1-001", poem: "靜夜思", author: "李白", line: "床前明月光，疑是地上霜", target: "霜", pinyin: "ㄕㄨㄤ", wrongOptions: ["ㄕㄨㄤˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-002", poem: "蜀道難", author: "李白", line: "蜀道之難，難於上青天", target: "蜀", pinyin: "ㄕㄨˇ", wrongOptions: ["ㄕㄨˋ", "ㄓㄨˇ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-003", poem: "夢遊天姥吟留別", author: "李白", line: "天姥連天向天橫", target: "姥", pinyin: "ㄇㄨˇ", wrongOptions: ["ㄌㄠˇ", "ㄇㄨˋ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb1-004", poem: "行路難", author: "李白", line: "長風破浪會有時", target: "長", pinyin: "ㄔㄤˊ", wrongOptions: ["ㄓㄤˇ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-005", poem: "將進酒", author: "李白", line: "高堂明鏡悲白髮", target: "髮", pinyin: "ㄈㄚˇ", wrongOptions: ["ㄈㄚˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-006", poem: "將進酒", author: "李白", line: "天生我材必有用", target: "材", pinyin: "ㄘㄞˊ", wrongOptions: ["ㄘㄞˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-007", poem: "月下獨酌", author: "李白", line: "花間一壺酒", target: "壺", pinyin: "ㄏㄨˊ", wrongOptions: ["ㄏㄨˋ", "ㄏㄨˇ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-008", poem: "望廬山瀑布", author: "李白", line: "飛流直下三千尺", target: "瀑", pinyin: "ㄆㄨˋ", wrongOptions: ["ㄅㄠˋ", "ㄆㄨˇ"], difficulty: "normal", source: "唐詩三百首" },

    // 杜甫
    { id: "pb1-009", poem: "春望", author: "杜甫", line: "國破山河在，城春草木深", target: "深", pinyin: "ㄕㄣ", wrongOptions: ["ㄕㄣˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-010", poem: "春望", author: "杜甫", line: "感時花濺淚，恨別鳥驚心", target: "濺", pinyin: "ㄐㄧㄢˋ", wrongOptions: ["ㄐㄧㄢ", "ㄐㄧㄢˇ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-011", poem: "登高", author: "杜甫", line: "無邊落木蕭蕭下", target: "蕭", pinyin: "ㄒㄧㄠ", wrongOptions: ["ㄙㄠ", "ㄒㄧㄠˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-012", poem: "茅屋為秋風所破歌", author: "杜甫", line: "八月秋高風怒號", target: "號", pinyin: "ㄏㄠˊ", wrongOptions: ["ㄏㄠˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-013", poem: "茅屋為秋風所破歌", author: "杜甫", line: "安得廣廈千萬間", target: "廈", pinyin: "ㄕㄚˋ", wrongOptions: ["ㄒㄧㄚˋ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb1-014", poem: "兵車行", author: "杜甫", line: "車轔轔，馬蕭蕭", target: "轔", pinyin: "ㄌㄧㄣˊ", wrongOptions: ["ㄌㄧㄥˊ", "ㄌㄧㄣˋ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb1-015", poem: "石壕吏", author: "杜甫", line: "暮投石壕村", target: "壕", pinyin: "ㄏㄠˊ", wrongOptions: ["ㄏㄠˋ", "ㄍㄠ"], difficulty: "normal", source: "唐詩三百首" },

    // 白居易
    { id: "pb1-016", poem: "長恨歌", author: "白居易", line: "芙蓉如面柳如眉", target: "芙", pinyin: "ㄈㄨˊ", wrongOptions: ["ㄈㄨˋ", "ㄈㄨ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-017", poem: "長恨歌", author: "白居易", line: "芙蓉如面柳如眉", target: "蓉", pinyin: "ㄖㄨㄥˊ", wrongOptions: ["ㄖㄨㄥˋ", "ㄩㄥˊ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-018", poem: "長恨歌", author: "白居易", line: "六宮粉黛無顏色", target: "黛", pinyin: "ㄉㄞˋ", wrongOptions: ["ㄉㄞˇ", "ㄊㄞˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-019", poem: "長恨歌", author: "白居易", line: "宛轉蛾眉馬前死", target: "蛾", pinyin: "ㄜˊ", wrongOptions: ["ㄧˊ", "ㄜˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-020", poem: "琵琶行", author: "白居易", line: "大弦嘈嘈如急雨", target: "嘈", pinyin: "ㄘㄠˊ", wrongOptions: ["ㄗㄠˊ", "ㄘㄠˋ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb1-021", poem: "琵琶行", author: "白居易", line: "小弦切切如私語", target: "切", pinyin: "ㄑㄧㄝˋ", wrongOptions: ["ㄑㄧㄝ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-022", poem: "琵琶行", author: "白居易", line: "銀瓶乍破水漿迸", target: "迸", pinyin: "ㄅㄥˋ", wrongOptions: ["ㄅㄥˇ", "ㄆㄥˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-023", poem: "琵琶行", author: "白居易", line: "曲終收撥當心畫", target: "撥", pinyin: "ㄅㄛ", wrongOptions: ["ㄅㄛˊ", "ㄆㄛ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-024", poem: "賦得古原草送別", author: "白居易", line: "野火燒不盡", target: "燒", pinyin: "ㄕㄠ", wrongOptions: ["ㄕㄠˋ", "ㄕㄠˊ"], difficulty: "normal", source: "唐詩三百首" },

    // 王維
    { id: "pb1-025", poem: "九月九日憶山東兄弟", author: "王維", line: "獨在異鄉為異客", target: "異", pinyin: "ㄧˋ", wrongOptions: ["ㄧˊ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-026", poem: "相思", author: "王維", line: "紅豆生南國，春來發幾枝", target: "發", pinyin: "ㄈㄚ", wrongOptions: ["ㄈㄚˋ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb1-027", poem: "使至塞上", author: "王維", line: "大漠孤煙直，長河落日圓", target: "漠", pinyin: "ㄇㄛˋ", wrongOptions: ["ㄇㄛˇ", "ㄇㄛ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb1-028", poem: "鹿柴", author: "王維", line: "空山不見人，但聞人語響", target: "柴", pinyin: "ㄓㄞˋ", wrongOptions: ["ㄔㄞˊ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb1-029", poem: "竹里館", author: "王維", line: "獨坐幽篁裡", target: "篁", pinyin: "ㄏㄨㄤˊ", wrongOptions: ["ㄏㄨㄤˋ", "ㄍㄨㄤˊ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb1-030", poem: "渭城曲", author: "王維", line: "渭城朝雨浥輕塵", target: "浥", pinyin: "ㄧˋ", wrongOptions: ["ㄧˊ", "ㄧˇ"], difficulty: "hard", source: "唐詩三百首" }
];

// ============================================
// 詩詞讀音 - 唐詩 (Part 2) + 宋詞
// ============================================
export const poetryBatch2 = [
    // 更多唐詩
    { id: "pb2-001", poem: "涼州詞", author: "王翰", line: "葡萄美酒夜光杯", target: "葡", pinyin: "ㄆㄨˊ", wrongOptions: ["ㄆㄨˋ", "ㄅㄨˊ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-002", poem: "涼州詞", author: "王翰", line: "葡萄美酒夜光杯", target: "萄", pinyin: "ㄊㄠˊ", wrongOptions: ["ㄊㄠˋ", "ㄉㄠˊ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-003", poem: "出塞", author: "王昌齡", line: "但使龍城飛將在", target: "將", pinyin: "ㄐㄧㄤˋ", wrongOptions: ["ㄐㄧㄤ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-004", poem: "芙蓉樓送辛漸", author: "王昌齡", line: "寒雨連江夜入吳", target: "吳", pinyin: "ㄨˊ", wrongOptions: ["ㄨˋ", "ㄨˇ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-005", poem: "無題", author: "李商隱", line: "春蠶到死絲方盡", target: "蠶", pinyin: "ㄘㄢˊ", wrongOptions: ["ㄙㄢˊ", "ㄘㄢˋ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb2-006", poem: "無題", author: "李商隱", line: "蠟炬成灰淚始乾", target: "蠟", pinyin: "ㄌㄚˋ", wrongOptions: ["ㄌㄚˇ", "ㄌㄞˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-007", poem: "錦瑟", author: "李商隱", line: "莊生曉夢迷蝴蝶", target: "蝴", pinyin: "ㄏㄨˊ", wrongOptions: ["ㄏㄨˋ", "ㄈㄨˊ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-008", poem: "錦瑟", author: "李商隱", line: "望帝春心託杜鵑", target: "鵑", pinyin: "ㄐㄩㄢ", wrongOptions: ["ㄐㄩㄢˋ", "ㄐㄩㄢˊ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-009", poem: "滁州西澗", author: "韋應物", line: "獨憐幽草澗邊生", target: "澗", pinyin: "ㄐㄧㄢˋ", wrongOptions: ["ㄐㄧㄢˇ", "ㄐㄧㄢ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb2-010", poem: "遊子吟", author: "孟郊", line: "慈母手中線", target: "慈", pinyin: "ㄘˊ", wrongOptions: ["ㄗˊ", "ㄘˋ"], difficulty: "normal", source: "唐詩三百首" },

    // 宋詞
    { id: "pb2-011", poem: "雨霖鈴", author: "柳永", line: "寒蟬淒切，對長亭晚", target: "蟬", pinyin: "ㄔㄢˊ", wrongOptions: ["ㄓㄢˊ", "ㄔㄢˋ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-012", poem: "雨霖鈴", author: "柳永", line: "楊柳岸曉風殘月", target: "殘", pinyin: "ㄘㄢˊ", wrongOptions: ["ㄘㄢˋ", "ㄘㄢˇ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-013", poem: "蝶戀花", author: "柳永", line: "衣帶漸寬終不悔", target: "漸", pinyin: "ㄐㄧㄢˋ", wrongOptions: ["ㄐㄧㄢ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-014", poem: "水調歌頭", author: "蘇軾", line: "明月幾時有，把酒問青天", target: "酒", pinyin: "ㄐㄧㄡˇ", wrongOptions: ["ㄐㄧㄡˋ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-015", poem: "水調歌頭", author: "蘇軾", line: "人有悲歡離合，月有陰晴圓缺", target: "缺", pinyin: "ㄑㄩㄝ", wrongOptions: ["ㄑㄩㄝˋ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-016", poem: "念奴嬌", author: "蘇軾", line: "大江東去，浪淘盡，千古風流人物", target: "淘", pinyin: "ㄊㄠˊ", wrongOptions: ["ㄊㄠˋ", "ㄉㄠˊ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-017", poem: "念奴嬌", author: "蘇軾", line: "羽扇綸巾，談笑間", target: "綸", pinyin: "ㄍㄨㄢ", wrongOptions: ["ㄌㄨㄣˊ"], difficulty: "hard", source: "宋詞選" },
    { id: "pb2-018", poem: "江城子", author: "蘇軾", line: "十年生死兩茫茫", target: "茫", pinyin: "ㄇㄤˊ", wrongOptions: ["ㄇㄤˋ", "ㄇㄤˇ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-019", poem: "定風波", author: "蘇軾", line: "莫聽穿林打葉聲", target: "穿", pinyin: "ㄔㄨㄢ", wrongOptions: ["ㄔㄨㄢˊ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-020", poem: "定風波", author: "蘇軾", line: "何妨吟嘯且徐行", target: "嘯", pinyin: "ㄒㄧㄠˋ", wrongOptions: ["ㄙㄠˋ", "ㄒㄧㄠˇ"], difficulty: "normal", source: "宋詞選" },

    { id: "pb2-021", poem: "醉花陰", author: "李清照", line: "簾捲西風，人比黃花瘦", target: "捲", pinyin: "ㄐㄩㄢˇ", wrongOptions: ["ㄐㄩㄢˋ", "ㄑㄩㄢˇ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-022", poem: "如夢令", author: "李清照", line: "常記溪亭日暮", target: "溪", pinyin: "ㄒㄧ", wrongOptions: ["ㄒㄧˊ", "ㄒㄧˋ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-023", poem: "聲聲慢", author: "李清照", line: "尋尋覓覓，冷冷清清", target: "覓", pinyin: "ㄇㄧˋ", wrongOptions: ["ㄇㄧˇ", "ㄇㄧ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-024", poem: "破陣子", author: "辛棄疾", line: "醉裡挑燈看劍", target: "劍", pinyin: "ㄐㄧㄢˋ", wrongOptions: ["ㄐㄧㄢˇ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-025", poem: "破陣子", author: "辛棄疾", line: "馬作的盧飛快", target: "盧", pinyin: "ㄌㄨˊ", wrongOptions: ["ㄌㄨˋ", "ㄌㄨˇ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-026", poem: "青玉案", author: "辛棄疾", line: "驀然回首，那人卻在燈火闌珊處", target: "驀", pinyin: "ㄇㄛˋ", wrongOptions: ["ㄇㄨˋ", "ㄇㄛˇ"], difficulty: "hard", source: "宋詞選" },
    { id: "pb2-027", poem: "青玉案", author: "辛棄疾", line: "燈火闌珊處", target: "闌", pinyin: "ㄌㄢˊ", wrongOptions: ["ㄌㄢˋ", "ㄌㄢˇ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-028", poem: "青玉案", author: "辛棄疾", line: "燈火闌珊處", target: "珊", pinyin: "ㄕㄢ", wrongOptions: ["ㄙㄢ", "ㄕㄢˋ"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-029", poem: "虞美人", author: "李煜", line: "春花秋月何時了", target: "了", pinyin: "ㄌㄧㄠˇ", wrongOptions: ["ㄌㄜ˙"], difficulty: "normal", source: "宋詞選" },
    { id: "pb2-030", poem: "虞美人", author: "李煜", line: "問君能有幾多愁", target: "愁", pinyin: "ㄔㄡˊ", wrongOptions: ["ㄔㄡˋ", "ㄑㄧㄡˊ"], difficulty: "normal", source: "宋詞選" }
];

// ============================================
// 詩詞讀音 - 更多經典 (Part 3)
// ============================================
export const poetryBatch3 = [
    // 古詩十九首及其他
    { id: "pb3-001", poem: "古詩十九首", author: "佚名", line: "行行重行行，與君生別離", target: "重", pinyin: "ㄔㄨㄥˊ", wrongOptions: ["ㄓㄨㄥˋ"], difficulty: "normal", source: "古詩十九首" },
    { id: "pb3-002", poem: "古詩十九首", author: "佚名", line: "相去萬餘里，各在天一涯", target: "涯", pinyin: "ㄧㄚˊ", wrongOptions: ["ㄧㄚˋ", "ㄋㄧˊ"], difficulty: "normal", source: "古詩十九首" },
    { id: "pb3-003", poem: "古詩十九首", author: "佚名", line: "盈盈一水間，脈脈不得語", target: "脈", pinyin: "ㄇㄛˋ", wrongOptions: ["ㄇㄞˋ"], difficulty: "hard", source: "古詩十九首" },
    { id: "pb3-004", poem: "古詩十九首", author: "佚名", line: "迢迢牽牛星，皎皎河漢女", target: "迢", pinyin: "ㄊㄧㄠˊ", wrongOptions: ["ㄊㄧㄠˋ", "ㄊㄧㄠˇ"], difficulty: "normal", source: "古詩十九首" },
    { id: "pb3-005", poem: "古詩十九首", author: "佚名", line: "迢迢牽牛星，皎皎河漢女", target: "皎", pinyin: "ㄐㄧㄠˇ", wrongOptions: ["ㄐㄧㄠˋ", "ㄐㄧㄠ"], difficulty: "normal", source: "古詩十九首" },

    // 樂府詩
    { id: "pb3-006", poem: "木蘭辭", author: "佚名", line: "唧唧復唧唧，木蘭當戶織", target: "唧", pinyin: "ㄐㄧ", wrongOptions: ["ㄐㄧˊ", "ㄐㄧˋ"], difficulty: "normal", source: "樂府詩" },
    { id: "pb3-007", poem: "木蘭辭", author: "佚名", line: "願為市鞍馬，從此替爺征", target: "鞍", pinyin: "ㄢ", wrongOptions: ["ㄢˋ", "ㄢˇ"], difficulty: "normal", source: "樂府詩" },
    { id: "pb3-008", poem: "木蘭辭", author: "佚名", line: "萬里赴戎機，關山度若飛", target: "戎", pinyin: "ㄖㄨㄥˊ", wrongOptions: ["ㄖㄨㄥˋ", "ㄖㄨㄥˇ"], difficulty: "normal", source: "樂府詩" },
    { id: "pb3-009", poem: "木蘭辭", author: "佚名", line: "朔氣傳金柝", target: "朔", pinyin: "ㄕㄨㄛˋ", wrongOptions: ["ㄙㄨㄛˋ", "ㄕㄨㄛ"], difficulty: "hard", source: "樂府詩" },
    { id: "pb3-010", poem: "木蘭辭", author: "佚名", line: "朔氣傳金柝", target: "柝", pinyin: "ㄊㄨㄛˋ", wrongOptions: ["ㄊㄨㄛ", "ㄔㄜˋ"], difficulty: "hard", source: "樂府詩" },
    { id: "pb3-011", poem: "木蘭辭", author: "佚名", line: "策勳十二轉，賞賜百千強", target: "勳", pinyin: "ㄒㄩㄣ", wrongOptions: ["ㄏㄨㄣ", "ㄒㄩㄣˋ"], difficulty: "normal", source: "樂府詩" },
    { id: "pb3-012", poem: "長歌行", author: "佚名", line: "少壯不努力，老大徒傷悲", target: "徒", pinyin: "ㄊㄨˊ", wrongOptions: ["ㄊㄨˋ", "ㄊㄨˇ"], difficulty: "normal", source: "樂府詩" },
    { id: "pb3-013", poem: "陌上桑", author: "佚名", line: "日出東南隅，照我秦氏樓", target: "隅", pinyin: "ㄩˊ", wrongOptions: ["ㄧˊ", "ㄩˋ"], difficulty: "normal", source: "樂府詩" },

    // 更多唐宋詩詞
    { id: "pb3-014", poem: "題西林壁", author: "蘇軾", line: "橫看成嶺側成峰", target: "嶺", pinyin: "ㄌㄧㄥˇ", wrongOptions: ["ㄌㄧㄥˋ", "ㄌㄧㄥˊ"], difficulty: "normal", source: "經典詩詞" },
    { id: "pb3-015", poem: "惠崇春江曉景", author: "蘇軾", line: "竹外桃花三兩枝", target: "枝", pinyin: "ㄓ", wrongOptions: ["ㄓˋ", "ㄑㄧ"], difficulty: "normal", source: "經典詩詞" },
    { id: "pb3-016", poem: "春曉", author: "孟浩然", line: "處處聞啼鳥", target: "啼", pinyin: "ㄊㄧˊ", wrongOptions: ["ㄉㄧˊ", "ㄊㄧˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb3-017", poem: "黃鶴樓", author: "崔顥", line: "昔人已乘黃鶴去", target: "鶴", pinyin: "ㄏㄜˋ", wrongOptions: ["ㄏㄜˇ", "ㄍㄜˋ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb3-018", poem: "黃鶴樓送孟浩然之廣陵", author: "李白", line: "煙花三月下揚州", target: "揚", pinyin: "ㄧㄤˊ", wrongOptions: ["ㄧㄤˋ", "ㄧㄤˇ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb3-019", poem: "早發白帝城", author: "李白", line: "朝辭白帝彩雲間", target: "朝", pinyin: "ㄓㄠ", wrongOptions: ["ㄔㄠˊ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb3-020", poem: "早發白帝城", author: "李白", line: "兩岸猿聲啼不住", target: "猿", pinyin: "ㄩㄢˊ", wrongOptions: ["ㄩㄢˋ", "ㄩㄢˇ"], difficulty: "normal", source: "唐詩三百首" },

    // 邊塞詩
    { id: "pb3-021", poem: "涼州詞", author: "王之渙", line: "羌笛何須怨楊柳", target: "羌", pinyin: "ㄑㄧㄤ", wrongOptions: ["ㄐㄧㄤ", "ㄑㄧㄤˊ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb3-022", poem: "從軍行", author: "王昌齡", line: "黃沙百戰穿金甲", target: "甲", pinyin: "ㄐㄧㄚˇ", wrongOptions: ["ㄐㄧㄚˋ", "ㄍㄚˇ"], difficulty: "normal", source: "唐詩三百首" },
    { id: "pb3-023", poem: "塞下曲", author: "盧綸", line: "月黑雁飛高，單于夜遁逃", target: "單", pinyin: "ㄔㄢˊ", wrongOptions: ["ㄉㄢ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb3-024", poem: "塞下曲", author: "盧綸", line: "月黑雁飛高，單于夜遁逃", target: "遁", pinyin: "ㄉㄨㄣˋ", wrongOptions: ["ㄊㄨㄣˋ", "ㄉㄨㄣˇ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb3-025", poem: "白雪歌送武判官歸京", author: "岑參", line: "忽如一夜春風來，千樹萬樹梨花開", target: "參", pinyin: "ㄕㄣ", wrongOptions: ["ㄘㄢ", "ㄘㄣ"], difficulty: "hard", source: "唐詩三百首" },

    // 山水田園詩
    { id: "pb3-026", poem: "過故人莊", author: "孟浩然", line: "故人具雞黍，邀我至田家", target: "黍", pinyin: "ㄕㄨˇ", wrongOptions: ["ㄕㄨˋ", "ㄓㄨˇ"], difficulty: "hard", source: "唐詩三百首" },
    { id: "pb3-027", poem: "歸園田居", author: "陶淵明", line: "羈鳥戀舊林，池魚思故淵", target: "羈", pinyin: "ㄐㄧ", wrongOptions: ["ㄐㄧˊ", "ㄐㄧˋ"], difficulty: "hard", source: "經典詩詞" },
    { id: "pb3-028", poem: "飲酒", author: "陶淵明", line: "採菊東籬下，悠然見南山", target: "籬", pinyin: "ㄌㄧˊ", wrongOptions: ["ㄌㄧˋ", "ㄌㄧˇ"], difficulty: "normal", source: "經典詩詞" },
    { id: "pb3-029", poem: "示兒", author: "陸游", line: "死去元知萬事空", target: "元", pinyin: "ㄩㄢˊ", wrongOptions: ["ㄩㄢˋ"], difficulty: "normal", source: "經典詩詞" },
    { id: "pb3-030", poem: "示兒", author: "陸游", line: "但悲不見九州同", target: "州", pinyin: "ㄓㄡ", wrongOptions: ["ㄓㄡˋ", "ㄓㄡˊ"], difficulty: "normal", source: "經典詩詞" }
];

// 匯出統計
export const getPoetryBatchStats = () => {
    return {
        batch1: poetryBatch1.length,
        batch2: poetryBatch2.length,
        batch3: poetryBatch3.length,
        total: poetryBatch1.length + poetryBatch2.length + poetryBatch3.length
    };
};
