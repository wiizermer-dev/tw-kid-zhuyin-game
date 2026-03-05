/**
 * 題庫重建 2.0 - 新資料結構
 * 支援多元題型：成語、古文、多音字、詩詞、諺語、大考題目
 */

// ============================================
// 第一類：多音字/破音字題庫
// ============================================
export const multiPronunciationWords = [
    // 常見破音字 - 語境決定讀音
    {
        id: "mp-001",
        char: "省",
        contexts: [
            { word: "反省", pinyin: "ㄒㄧㄥˇ", meaning: "檢查自己的思想行為" },
            { word: "省略", pinyin: "ㄕㄥˇ", meaning: "節省、減少" },
            { word: "省親", pinyin: "ㄒㄧㄥˇ", meaning: "探望父母" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-002",
        char: "差",
        contexts: [
            { word: "差錯", pinyin: "ㄔㄚ", meaning: "錯誤" },
            { word: "差遣", pinyin: "ㄔㄞ", meaning: "派遣" },
            { word: "參差", pinyin: "ㄘ", meaning: "不齊" },
            { word: "差勁", pinyin: "ㄔㄚˋ", meaning: "品質不好" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-003",
        char: "說",
        contexts: [
            { word: "說話", pinyin: "ㄕㄨㄛ", meaning: "講話" },
            { word: "遊說", pinyin: "ㄕㄨㄟˋ", meaning: "說服、勸說" },
            { word: "說客", pinyin: "ㄕㄨㄟˋ", meaning: "從事遊說的人" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-004",
        char: "落",
        contexts: [
            { word: "落下", pinyin: "ㄌㄨㄛˋ", meaning: "掉落" },
            { word: "落枕", pinyin: "ㄌㄠˋ", meaning: "睡眠不當導致頸部疼痛" },
            { word: "丟三落四", pinyin: "ㄌㄚˋ", meaning: "粗心大意" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-005",
        char: "行",
        contexts: [
            { word: "行走", pinyin: "ㄒㄧㄥˊ", meaning: "走路" },
            { word: "銀行", pinyin: "ㄏㄤˊ", meaning: "金融機構" },
            { word: "行列", pinyin: "ㄏㄤˊ", meaning: "排列" },
            { word: "德行", pinyin: "ㄒㄧㄥˋ", meaning: "品德修養" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-006",
        char: "重",
        contexts: [
            { word: "重量", pinyin: "ㄓㄨㄥˋ", meaning: "物體的輕重程度" },
            { word: "重複", pinyin: "ㄔㄨㄥˊ", meaning: "再次發生" },
            { word: "重新", pinyin: "ㄔㄨㄥˊ", meaning: "重頭再來" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-007",
        char: "長",
        contexts: [
            { word: "長短", pinyin: "ㄔㄤˊ", meaning: "長度" },
            { word: "長大", pinyin: "ㄓㄤˇ", meaning: "成長" },
            { word: "長輩", pinyin: "ㄓㄤˇ", meaning: "年紀較大的人" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-008",
        char: "樂",
        contexts: [
            { word: "快樂", pinyin: "ㄌㄜˋ", meaning: "高興" },
            { word: "音樂", pinyin: "ㄩㄝˋ", meaning: "聲音藝術" },
            { word: "樂府", pinyin: "ㄩㄝˋ", meaning: "古代官署或詩體" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-009",
        char: "傳",
        contexts: [
            { word: "傳遞", pinyin: "ㄔㄨㄢˊ", meaning: "遞送" },
            { word: "傳記", pinyin: "ㄓㄨㄢˋ", meaning: "人物生平記載" },
            { word: "經傳", pinyin: "ㄓㄨㄢˋ", meaning: "經書的註解" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-010",
        char: "數",
        contexts: [
            { word: "數學", pinyin: "ㄕㄨˋ", meaning: "研究數量的學科" },
            { word: "數落", pinyin: "ㄕㄨˇ", meaning: "責備" },
            { word: "數見不鮮", pinyin: "ㄕㄨㄛˋ", meaning: "經常出現" }
        ],
        difficulty: "hard",
        source: "教育部辭典"
    },
    {
        id: "mp-011",
        char: "供",
        contexts: [
            { word: "供給", pinyin: "ㄍㄨㄥ", meaning: "提供" },
            { word: "供品", pinyin: "ㄍㄨㄥˋ", meaning: "祭祀用品" },
            { word: "口供", pinyin: "ㄍㄨㄥˋ", meaning: "招供" }
        ],
        difficulty: "hard",
        source: "教育部辭典"
    },
    {
        id: "mp-012",
        char: "曝",
        contexts: [
            { word: "曝曬", pinyin: "ㄆㄨˋ", meaning: "暴露在陽光下" },
            { word: "曝光", pinyin: "ㄅㄠˋ", meaning: "揭露或攝影術語" }
        ],
        difficulty: "hard",
        source: "教育部辭典"
    },
    {
        id: "mp-013",
        char: "強",
        contexts: [
            { word: "強壯", pinyin: "ㄑㄧㄤˊ", meaning: "健壯有力" },
            { word: "勉強", pinyin: "ㄑㄧㄤˇ", meaning: "不情願地" },
            { word: "倔強", pinyin: "ㄐㄧㄤˋ", meaning: "固執不屈" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-014",
        char: "難",
        contexts: [
            { word: "困難", pinyin: "ㄋㄢˊ", meaning: "不易做到" },
            { word: "災難", pinyin: "ㄋㄢˋ", meaning: "禍害" },
            { word: "責難", pinyin: "ㄋㄢˋ", meaning: "責備" }
        ],
        difficulty: "normal",
        source: "教育部辭典"
    },
    {
        id: "mp-015",
        char: "惡",
        contexts: [
            { word: "惡人", pinyin: "ㄜˋ", meaning: "壞人" },
            { word: "厭惡", pinyin: "ㄨˋ", meaning: "討厭" },
            { word: "噁心", pinyin: "ㄜˇ", meaning: "想吐" }
        ],
        difficulty: "hard",
        source: "教育部辭典"
    }
];

// ============================================
// 第二類：成語讀音題庫
// ============================================
export const idiomPronunciation = [
    // 常見易錯成語讀音
    {
        id: "id-001",
        idiom: "曝背談天",
        target: "曝",
        pinyin: "ㄆㄨˋ",
        wrongOptions: ["ㄅㄠˋ", "ㄆㄨˇ"],
        origin: "《列子・楊朱》",
        meaning: "曬著太陽聊天，形容悠閒自得",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-002",
        idiom: "莘莘學子",
        target: "莘",
        pinyin: "ㄕㄣ",
        wrongOptions: ["ㄒㄧㄣ", "ㄕㄣˋ"],
        meaning: "眾多學生",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-003",
        idiom: "參差不齊",
        target: "參",
        pinyin: "ㄘㄣ",
        wrongOptions: ["ㄘㄢ", "ㄕㄣ"],
        meaning: "長短、高低不一",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-004",
        idiom: "自怨自艾",
        target: "艾",
        pinyin: "ㄧˋ",
        wrongOptions: ["ㄞˋ", "ㄧˋ"],
        origin: "《孟子・萬章上》",
        meaning: "悔恨自己的過失",
        difficulty: "hard",
        source: "學測考題"
    },
    {
        id: "id-005",
        idiom: "強詞奪理",
        target: "強",
        pinyin: "ㄑㄧㄤˇ",
        wrongOptions: ["ㄑㄧㄤˊ", "ㄐㄧㄤˋ"],
        meaning: "硬要爭辯、不講道理",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-006",
        idiom: "大腹便便",
        target: "便",
        pinyin: "ㄆㄧㄢˊ",
        wrongOptions: ["ㄅㄧㄢˋ", "ㄆㄧㄢˋ"],
        meaning: "形容肚子很大",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-007",
        idiom: "量體裁衣",
        target: "量",
        pinyin: "ㄌㄧㄤˊ",
        wrongOptions: ["ㄌㄧㄤˋ"],
        meaning: "依照實際情況來處理事情",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-008",
        idiom: "數典忘祖",
        target: "數",
        pinyin: "ㄕㄨˇ",
        wrongOptions: ["ㄕㄨˋ", "ㄕㄨㄛˋ"],
        meaning: "忘記自己的根本",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-009",
        idiom: "一暴十寒",
        target: "暴",
        pinyin: "ㄆㄨˋ",
        wrongOptions: ["ㄅㄠˋ"],
        origin: "《孟子・告子上》",
        meaning: "做事沒有恆心",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-010",
        idiom: "暴殄天物",
        target: "殄",
        pinyin: "ㄊㄧㄢˇ",
        wrongOptions: ["ㄓㄣˇ", "ㄔㄣˇ"],
        meaning: "任意糟蹋東西",
        difficulty: "hard",
        source: "學測考題"
    },
    {
        id: "id-011",
        idiom: "鍥而不捨",
        target: "鍥",
        pinyin: "ㄑㄧㄝˋ",
        wrongOptions: ["ㄑㄧˋ", "ㄎㄜˋ"],
        origin: "《荀子・勸學》",
        meaning: "鍥而不捨，金石可鏤",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-012",
        idiom: "鏗鏘有力",
        target: "鏗",
        pinyin: "ㄎㄥ",
        wrongOptions: ["ㄎㄣ", "ㄐㄧㄥ"],
        meaning: "聲音響亮有力",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-013",
        idiom: "泥古不化",
        target: "泥",
        pinyin: "ㄋㄧˋ",
        wrongOptions: ["ㄋㄧˊ"],
        meaning: "拘泥於古法而不知變通",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-014",
        idiom: "唯唯諾諾",
        target: "諾",
        pinyin: "ㄋㄨㄛˋ",
        wrongOptions: ["ㄖㄨㄛˋ", "ㄌㄨㄛˋ"],
        meaning: "連聲應允，形容順從的樣子",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-015",
        idiom: "呶呶不休",
        target: "呶",
        pinyin: "ㄋㄠˊ",
        wrongOptions: ["ㄋㄨˊ", "ㄋㄧˊ"],
        meaning: "嘮叨不停",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-016",
        idiom: "間不容髮",
        target: "間",
        pinyin: "ㄐㄧㄢ",
        wrongOptions: ["ㄐㄧㄢˋ"],
        meaning: "情勢危急，比喻情況緊迫",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-017",
        idiom: "大相逕庭",
        target: "逕",
        pinyin: "ㄐㄧㄥˋ",
        wrongOptions: ["ㄐㄧㄣˋ", "ㄐㄧㄥ"],
        meaning: "相差很大",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-018",
        idiom: "如法炮製",
        target: "炮",
        pinyin: "ㄆㄠˊ",
        wrongOptions: ["ㄆㄠˋ", "ㄅㄠˋ"],
        meaning: "依照現成的方法做",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-019",
        idiom: "怙惡不悛",
        target: "悛",
        pinyin: "ㄑㄩㄢ",
        wrongOptions: ["ㄐㄩㄣˋ", "ㄑㄩㄣ"],
        meaning: "堅持作惡不肯悔改",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-020",
        idiom: "罄竹難書",
        target: "罄",
        pinyin: "ㄑㄧㄥˋ",
        wrongOptions: ["ㄐㄧㄥˋ", "ㄎㄥˋ"],
        meaning: "罪惡多得寫不完",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-021",
        idiom: "貽笑大方",
        target: "貽",
        pinyin: "ㄧˊ",
        wrongOptions: ["ㄊㄞˊ", "ㄧˋ"],
        meaning: "被有識之士見笑",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-022",
        idiom: "戛然而止",
        target: "戛",
        pinyin: "ㄐㄧㄚˊ",
        wrongOptions: ["ㄍㄚˊ", "ㄐㄧㄚˇ"],
        meaning: "聲音突然停止",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-023",
        idiom: "有恃無恐",
        target: "恃",
        pinyin: "ㄕˋ",
        wrongOptions: ["ㄙˋ", "ㄕˊ"],
        meaning: "有所依仗而無所畏懼",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-024",
        idiom: "殺一儆百",
        target: "儆",
        pinyin: "ㄐㄧㄥˇ",
        wrongOptions: ["ㄐㄧㄥˋ", "ㄑㄧㄥˇ"],
        meaning: "懲罰一人以警戒眾人",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-025",
        idiom: "飲鴆止渴",
        target: "鴆",
        pinyin: "ㄓㄣˋ",
        wrongOptions: ["ㄓㄣ", "ㄔㄣˋ"],
        meaning: "只顧眼前不計後果",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-026",
        idiom: "沆瀣一氣",
        target: "沆",
        pinyin: "ㄏㄤˋ",
        wrongOptions: ["ㄏㄤˊ", "ㄎㄤˋ"],
        meaning: "比喻彼此氣味相投",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-027",
        idiom: "沆瀣一氣",
        target: "瀣",
        pinyin: "ㄒㄧㄝˋ",
        wrongOptions: ["ㄐㄧㄝˋ", "ㄒㄧㄝˊ"],
        meaning: "比喻彼此氣味相投",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-028",
        idiom: "面面相覷",
        target: "覷",
        pinyin: "ㄑㄩˋ",
        wrongOptions: ["ㄒㄩˋ", "ㄑㄩ"],
        meaning: "你看我、我看你，形容驚慌或不知所措",
        difficulty: "hard",
        source: "教育部成語典"
    },
    {
        id: "id-029",
        idiom: "步履蹣跚",
        target: "蹣",
        pinyin: "ㄆㄢˊ",
        wrongOptions: ["ㄇㄢˊ", "ㄆㄢ"],
        meaning: "走路緩慢搖擺的樣子",
        difficulty: "normal",
        source: "教育部成語典"
    },
    {
        id: "id-030",
        idiom: "踽踽獨行",
        target: "踽",
        pinyin: "ㄐㄩˇ",
        wrongOptions: ["ㄩˇ", "ㄐㄩ"],
        meaning: "孤獨地走著",
        difficulty: "hard",
        source: "教育部成語典"
    }
];

// ============================================
// 第三類：古文讀音題庫 (108 課綱核心古文)
// ============================================
export const classicalPronunciation = [
    // 燭之武退秦師
    {
        id: "cl-001",
        text: "燭之武退秦師",
        article: "左傳・僖公三十年",
        target: "說",
        context: "若使燭之武見秦君，師必退",
        fullContext: "佚之狐言於鄭伯曰：「國危矣，若使燭之武見秦君，師必退。」",
        pinyin: "ㄕㄨㄟˋ",
        meaning: "說服、勸說",
        wrongOptions: ["ㄕㄨㄛ", "ㄕㄨㄛˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-002",
        text: "燭之武退秦師",
        article: "左傳・僖公三十年",
        target: "縋",
        context: "夜縋而出",
        pinyin: "ㄓㄨㄟˋ",
        meaning: "用繩子吊下城牆",
        wrongOptions: ["ㄔㄨㄟˋ", "ㄓㄨㄟˊ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 諫逐客書
    {
        id: "cl-003",
        text: "諫逐客書",
        article: "李斯",
        target: "繆",
        context: "繆公求士",
        pinyin: "ㄇㄨˋ",
        meaning: "通「穆」，秦繆公",
        wrongOptions: ["ㄇㄧㄠˋ", "ㄇㄧㄡˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 出師表
    {
        id: "cl-004",
        text: "出師表",
        article: "諸葛亮",
        target: "裨",
        context: "裨補闕漏",
        pinyin: "ㄅㄧˋ",
        meaning: "補助、輔助",
        wrongOptions: ["ㄆㄧˊ", "ㄅㄟˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-005",
        text: "出師表",
        article: "諸葛亮",
        target: "闕",
        context: "裨補闕漏",
        pinyin: "ㄑㄩㄝˋ",
        meaning: "通「缺」，缺失",
        wrongOptions: ["ㄐㄩㄝˊ", "ㄑㄩㄝ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 桃花源記
    {
        id: "cl-006",
        text: "桃花源記",
        article: "陶淵明",
        target: "儼",
        context: "屋舍儼然",
        pinyin: "ㄧㄢˇ",
        meaning: "整齊的樣子",
        wrongOptions: ["ㄧㄢˋ", "ㄧㄢ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    {
        id: "cl-007",
        text: "桃花源記",
        article: "陶淵明",
        target: "豁",
        context: "豁然開朗",
        pinyin: "ㄏㄨㄛˋ",
        meaning: "開闊的樣子",
        wrongOptions: ["ㄏㄨㄛ", "ㄏㄨㄛˊ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    // 師說
    {
        id: "cl-008",
        text: "師說",
        article: "韓愈",
        target: "傳",
        context: "所以傳道受業解惑也",
        pinyin: "ㄔㄨㄢˊ",
        meaning: "傳授",
        wrongOptions: ["ㄓㄨㄢˋ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    {
        id: "cl-009",
        text: "師說",
        article: "韓愈",
        target: "郯",
        context: "郯子之徒",
        pinyin: "ㄊㄢˊ",
        meaning: "古國名",
        wrongOptions: ["ㄧㄢˊ", "ㄓㄢˊ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-010",
        text: "師說",
        article: "韓愈",
        target: "萇",
        context: "萇弘",
        pinyin: "ㄔㄤˊ",
        meaning: "人名",
        wrongOptions: ["ㄓㄤˇ", "ㄔㄤˇ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 赤壁賦
    {
        id: "cl-011",
        text: "赤壁賦",
        article: "蘇軾",
        target: "屬",
        context: "舉酒屬客",
        pinyin: "ㄓㄨˇ",
        meaning: "勸酒",
        wrongOptions: ["ㄕㄨˇ", "ㄓㄨˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-012",
        text: "赤壁賦",
        article: "蘇軾",
        target: "釃",
        context: "橫槊賦詩，釃酒臨江",
        pinyin: "ㄙ",
        meaning: "斟酒",
        wrongOptions: ["ㄌㄧˊ", "ㄕ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-013",
        text: "赤壁賦",
        article: "蘇軾",
        target: "槊",
        context: "橫槊賦詩",
        pinyin: "ㄕㄨㄛˋ",
        meaning: "長矛",
        wrongOptions: ["ㄙㄨㄛˋ", "ㄕㄨㄛ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 虬髯客傳
    {
        id: "cl-014",
        text: "虬髯客傳",
        article: "杜光庭",
        target: "虬",
        context: "虬髯客傳",
        pinyin: "ㄑㄧㄡˊ",
        meaning: "捲曲",
        wrongOptions: ["ㄐㄧㄡ", "ㄑㄧㄡ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-015",
        text: "虬髯客傳",
        article: "杜光庭",
        target: "髯",
        context: "虬髯客傳",
        pinyin: "ㄖㄢˊ",
        meaning: "鬍鬚",
        wrongOptions: ["ㄧㄢˊ", "ㄖㄢˇ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    // 項脊軒志
    {
        id: "cl-016",
        text: "項脊軒志",
        article: "歸有光",
        target: "軒",
        context: "項脊軒，舊南閤子也",
        pinyin: "ㄒㄩㄢ",
        meaning: "小屋、書齋",
        wrongOptions: ["ㄒㄩㄢˊ", "ㄒㄩㄢˋ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    {
        id: "cl-017",
        text: "項脊軒志",
        article: "歸有光",
        target: "珊珊",
        context: "珊珊可愛",
        pinyin: "ㄕㄢ ㄕㄢ",
        meaning: "形容衣服或佩玉聲音",
        wrongOptions: ["ㄙㄢ ㄙㄢ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    // 勞山道士
    {
        id: "cl-018",
        text: "勞山道士",
        article: "聊齋誌異",
        target: "踔",
        context: "",
        pinyin: "ㄓㄨㄛˊ",
        meaning: "跳躍",
        wrongOptions: ["ㄔㄨㄛˊ", "ㄓㄨㄛ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 大同與小康
    {
        id: "cl-019",
        text: "大同與小康",
        article: "禮記・禮運",
        target: "矜",
        context: "矜、寡、孤、獨、廢疾者皆有所養",
        pinyin: "ㄍㄨㄢ",
        meaning: "老而無妻的人",
        wrongOptions: ["ㄐㄧㄣ", "ㄐㄧㄣˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-020",
        text: "大同與小康",
        article: "禮記・禮運",
        target: "惡",
        context: "故外戶而不閉，是謂大同",
        pinyin: "ㄨˋ",
        meaning: "厭惡",
        wrongOptions: ["ㄜˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 鴻門宴
    {
        id: "cl-021",
        text: "鴻門宴",
        article: "史記・項羽本紀",
        target: "沛",
        context: "沛公",
        pinyin: "ㄆㄟˋ",
        meaning: "劉邦起兵之地",
        wrongOptions: ["ㄈㄟˋ", "ㄆㄟˊ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    {
        id: "cl-022",
        text: "鴻門宴",
        article: "史記・項羽本紀",
        target: "卮",
        context: "卮酒",
        pinyin: "ㄓ",
        meaning: "酒杯",
        wrongOptions: ["ㄓˇ", "ㄓˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    {
        id: "cl-023",
        text: "鴻門宴",
        article: "史記・項羽本紀",
        target: "樊",
        context: "樊噲",
        pinyin: "ㄈㄢˊ",
        meaning: "人名",
        wrongOptions: ["ㄈㄢ", "ㄆㄢˊ"],
        difficulty: "normal",
        source: "108課綱核心古文"
    },
    {
        id: "cl-024",
        text: "鴻門宴",
        article: "史記・項羽本紀",
        target: "噲",
        context: "樊噲",
        pinyin: "ㄎㄨㄞˋ",
        meaning: "人名",
        wrongOptions: ["ㄏㄨㄟˋ", "ㄍㄨㄞˋ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    },
    // 台灣題材
    {
        id: "cl-025",
        text: "鹿港乘桴記",
        article: "洪繻",
        target: "桴",
        context: "乘桴記",
        pinyin: "ㄈㄨˊ",
        meaning: "竹筏、木筏",
        wrongOptions: ["ㄈㄨ", "ㄆㄧˊ"],
        difficulty: "hard",
        source: "108課綱核心古文"
    }
];

// ============================================
// 第四類：詩詞讀音題庫
// ============================================
export const poetryPronunciation = [
    {
        id: "pt-001",
        poem: "過故人莊",
        author: "孟浩然",
        line: "綠樹村邊合，青山郭外斜",
        target: "斜",
        pinyin: "ㄒㄧㄚˊ",
        note: "古音讀法，與「家」押韻",
        modernPinyin: "ㄒㄧㄝˊ",
        wrongOptions: ["ㄒㄧㄝˊ"],
        difficulty: "hard",
        source: "唐詩三百首"
    },
    {
        id: "pt-002",
        poem: "山行",
        author: "杜牧",
        line: "遠上寒山石徑斜",
        target: "斜",
        pinyin: "ㄒㄧㄚˊ",
        note: "古音，與「家、花」押韻",
        wrongOptions: ["ㄒㄧㄝˊ"],
        difficulty: "hard",
        source: "唐詩三百首"
    },
    {
        id: "pt-003",
        poem: "長恨歌",
        author: "白居易",
        line: "回眸一笑百媚生",
        target: "眸",
        pinyin: "ㄇㄡˊ",
        wrongOptions: ["ㄇㄨˊ", "ㄇㄡˋ"],
        difficulty: "normal",
        source: "唐詩三百首"
    },
    {
        id: "pt-004",
        poem: "琵琶行",
        author: "白居易",
        line: "潯陽江頭夜送客",
        target: "潯",
        pinyin: "ㄒㄩㄣˊ",
        wrongOptions: ["ㄑㄩㄣˊ", "ㄒㄩㄣ"],
        difficulty: "hard",
        source: "唐詩三百首"
    },
    {
        id: "pt-005",
        poem: "錦瑟",
        author: "李商隱",
        line: "錦瑟無端五十弦",
        target: "瑟",
        pinyin: "ㄙㄜˋ",
        wrongOptions: ["ㄕㄜˋ", "ㄙㄜ"],
        difficulty: "normal",
        source: "唐詩三百首"
    },
    {
        id: "pt-006",
        poem: "登高",
        author: "杜甫",
        line: "萬里悲秋常作客",
        target: "作",
        pinyin: "ㄗㄨㄛˋ",
        wrongOptions: ["ㄗㄨㄛ"],
        difficulty: "normal",
        source: "唐詩三百首"
    },
    {
        id: "pt-007",
        poem: "春望",
        author: "杜甫",
        line: "烽火連三月",
        target: "烽",
        pinyin: "ㄈㄥ",
        wrongOptions: ["ㄈㄥˊ", "ㄈㄥˋ"],
        difficulty: "normal",
        source: "唐詩三百首"
    },
    {
        id: "pt-008",
        poem: "將進酒",
        author: "李白",
        line: "君不見黃河之水天上來",
        target: "將",
        pinyin: "ㄑㄧㄤ",
        meaning: "請的意思",
        wrongOptions: ["ㄐㄧㄤ", "ㄐㄧㄤˋ"],
        difficulty: "hard",
        source: "唐詩三百首"
    },
    {
        id: "pt-009",
        poem: "蜀道難",
        author: "李白",
        line: "噫吁戲，危乎高哉",
        target: "噫",
        pinyin: "ㄧ",
        wrongOptions: ["ㄧˋ", "ㄞ"],
        difficulty: "hard",
        source: "唐詩三百首"
    },
    {
        id: "pt-010",
        poem: "蜀道難",
        author: "李白",
        line: "猿猱欲度愁攀援",
        target: "猱",
        pinyin: "ㄋㄠˊ",
        meaning: "一種猿猴",
        wrongOptions: ["ㄖㄡˊ", "ㄋㄠˋ"],
        difficulty: "hard",
        source: "唐詩三百首"
    },
    {
        id: "pt-011",
        poem: "楓橋夜泊",
        author: "張繼",
        line: "姑蘇城外寒山寺",
        target: "蘇",
        pinyin: "ㄙㄨ",
        wrongOptions: ["ㄙㄨˊ", "ㄙㄨˋ"],
        difficulty: "normal",
        source: "唐詩三百首"
    },
    {
        id: "pt-012",
        poem: "念奴嬌・赤壁懷古",
        author: "蘇軾",
        line: "談笑間，強虜灰飛煙滅",
        target: "虜",
        pinyin: "ㄌㄨˇ",
        wrongOptions: ["ㄌㄨˋ", "ㄌㄩˇ"],
        difficulty: "normal",
        source: "宋詞選"
    },
    {
        id: "pt-013",
        poem: "青玉案",
        author: "辛棄疾",
        line: "眾裡尋他千百度",
        target: "度",
        pinyin: "ㄉㄨˋ",
        wrongOptions: ["ㄉㄨㄛˋ"],
        difficulty: "normal",
        source: "宋詞選"
    },
    {
        id: "pt-014",
        poem: "聲聲慢",
        author: "李清照",
        line: "淒淒慘慘戚戚",
        target: "戚",
        pinyin: "ㄑㄧ",
        wrongOptions: ["ㄑㄧˋ", "ㄐㄧ"],
        difficulty: "normal",
        source: "宋詞選"
    },
    {
        id: "pt-015",
        poem: "木蘭辭",
        author: "佚名",
        line: "雄兔腳撲朔，雌兔眼迷離",
        target: "撲朔",
        pinyin: "ㄆㄨ ㄕㄨㄛˋ",
        wrongOptions: ["ㄆㄨˊ ㄕㄨㄛ"],
        difficulty: "normal",
        source: "樂府詩"
    }
];

// ============================================
// 第五類：諺語歇後語題庫
// ============================================
export const proverbPronunciation = [
    {
        id: "pv-001",
        type: "歇後語",
        phrase: "打破沙鍋問到底",
        target: "璺",
        explanation: "「問」諧音「璺」（ㄨㄣˋ），指裂痕",
        pinyin: "ㄨㄣˋ",
        wrongOptions: ["ㄨㄣˊ", "ㄇㄣˋ"],
        difficulty: "hard",
        source: "民間俗語"
    },
    {
        id: "pv-002",
        type: "諺語",
        phrase: "書到用時方恨少",
        target: "方",
        pinyin: "ㄈㄤ",
        meaning: "才",
        wrongOptions: ["ㄈㄤˊ", "ㄈㄤˋ"],
        difficulty: "normal",
        source: "民間俗語"
    },
    {
        id: "pv-003",
        type: "歇後語",
        phrase: "泥菩薩過江",
        target: "薩",
        explanation: "自身難保",
        pinyin: "ㄙㄚˋ",
        wrongOptions: ["ㄙㄚ", "ㄕㄚˋ"],
        difficulty: "normal",
        source: "民間俗語"
    },
    {
        id: "pv-004",
        type: "諺語",
        phrase: "近朱者赤，近墨者黑",
        target: "朱",
        pinyin: "ㄓㄨ",
        wrongOptions: ["ㄓㄨˊ", "ㄓㄨˋ"],
        difficulty: "normal",
        source: "民間俗語"
    },
    {
        id: "pv-005",
        type: "台灣諺語",
        phrase: "一枝草，一點露",
        target: "點",
        pinyin: "ㄉㄧㄢˇ",
        meaning: "天無絕人之路",
        wrongOptions: ["ㄉㄧㄢˋ", "ㄉㄧㄢ"],
        difficulty: "normal",
        source: "台灣俗諺"
    },
    {
        id: "pv-006",
        type: "諺語",
        phrase: "事半功倍",
        target: "倍",
        pinyin: "ㄅㄟˋ",
        wrongOptions: ["ㄅㄟˇ", "ㄆㄟˋ"],
        difficulty: "normal",
        source: "民間俗語"
    },
    {
        id: "pv-007",
        type: "歇後語",
        phrase: "張飛穿針",
        target: "粗",
        explanation: "粗中有細",
        pinyin: "ㄘㄨ",
        wrongOptions: ["ㄔㄨ"],
        difficulty: "normal",
        source: "民間俗語"
    },
    {
        id: "pv-008",
        type: "諺語",
        phrase: "覆水難收",
        target: "覆",
        pinyin: "ㄈㄨˋ",
        wrongOptions: ["ㄈㄨˇ", "ㄈㄨ"],
        difficulty: "normal",
        source: "民間俗語"
    },
    {
        id: "pv-009",
        type: "諺語",
        phrase: "塞翁失馬，焉知非福",
        target: "塞",
        pinyin: "ㄙㄞˋ",
        meaning: "邊塞",
        wrongOptions: ["ㄙㄜˋ", "ㄙㄞ"],
        difficulty: "hard",
        source: "民間俗語"
    },
    {
        id: "pv-010",
        type: "台灣諺語",
        phrase: "食果子拜樹頭",
        target: "拜",
        pinyin: "ㄅㄞˋ",
        meaning: "飲水思源",
        wrongOptions: ["ㄅㄞˇ", "ㄆㄞˋ"],
        difficulty: "normal",
        source: "台灣俗諺"
    }
];

// ============================================
// 第六類：形近音混淆題庫
// ============================================
export const similarSoundWords = [
    {
        id: "ss-001",
        targetWord: "賑災",
        correctChar: "賑",
        pinyin: "ㄓㄣˋ",
        confusedChars: [
            { char: "振", pinyin: "ㄓㄣˋ", word: "振奮" },
            { char: "鎮", pinyin: "ㄓㄣˋ", word: "鎮定" }
        ],
        difficulty: "normal",
        source: "會考考題"
    },
    {
        id: "ss-002",
        targetWord: "編輯",
        correctChar: "輯",
        pinyin: "ㄐㄧˊ",
        confusedChars: [
            { char: "緝", pinyin: "ㄐㄧ", word: "緝拿" },
            { char: "揖", pinyin: "ㄧ", word: "作揖" }
        ],
        difficulty: "hard",
        source: "學測考題"
    },
    {
        id: "ss-003",
        targetWord: "滄海",
        correctChar: "滄",
        pinyin: "ㄘㄤ",
        confusedChars: [
            { char: "蒼", pinyin: "ㄘㄤ", word: "蒼白" },
            { char: "倉", pinyin: "ㄘㄤ", word: "倉庫" }
        ],
        difficulty: "normal",
        source: "會考考題"
    },
    {
        id: "ss-004",
        targetWord: "凋謝",
        correctChar: "凋",
        pinyin: "ㄉㄧㄠ",
        confusedChars: [
            { char: "雕", pinyin: "ㄉㄧㄠ", word: "雕刻" },
            { char: "碉", pinyin: "ㄉㄧㄠ", word: "碉堡" }
        ],
        difficulty: "normal",
        source: "會考考題"
    },
    {
        id: "ss-005",
        targetWord: "刻苦銘心",
        correctChar: "銘",
        pinyin: "ㄇㄧㄥˊ",
        confusedChars: [
            { char: "鳴", pinyin: "ㄇㄧㄥˊ", word: "雞鳴" },
            { char: "茗", pinyin: "ㄇㄧㄥˊ", word: "品茗" }
        ],
        difficulty: "normal",
        source: "會考考題"
    },
    {
        id: "ss-006",
        targetWord: "磬竹難書",
        correctChar: "罄",
        pinyin: "ㄑㄧㄥˋ",
        confusedChars: [
            { char: "磬", pinyin: "ㄑㄧㄥˋ", word: "磐石" },
            { char: "謦", pinyin: "ㄑㄧㄥˇ", word: "謦欬" }
        ],
        note: "正確為「罄竹難書」",
        difficulty: "hard",
        source: "學測考題"
    },
    {
        id: "ss-007",
        targetWord: "蜿蜒",
        correctChar: "蜿",
        pinyin: "ㄨㄢ",
        confusedChars: [
            { char: "婉", pinyin: "ㄨㄢˇ", word: "婉約" },
            { char: "宛", pinyin: "ㄨㄢˇ", word: "宛如" }
        ],
        difficulty: "normal",
        source: "會考考題"
    },
    {
        id: "ss-008",
        targetWord: "啟迪",
        correctChar: "迪",
        pinyin: "ㄉㄧˊ",
        confusedChars: [
            { char: "狄", pinyin: "ㄉㄧˊ", word: "狄人" },
            { char: "笛", pinyin: "ㄉㄧˊ", word: "笛子" }
        ],
        difficulty: "normal",
        source: "會考考題"
    },
    {
        id: "ss-009",
        targetWord: "抱歉",
        correctChar: "歉",
        pinyin: "ㄑㄧㄢˋ",
        confusedChars: [
            { char: "嫌", pinyin: "ㄒㄧㄢˊ", word: "嫌棄" },
            { char: "謙", pinyin: "ㄑㄧㄢ", word: "謙虛" }
        ],
        difficulty: "normal",
        source: "會考考題"
    },
    {
        id: "ss-010",
        targetWord: "驀然",
        correctChar: "驀",
        pinyin: "ㄇㄛˋ",
        confusedChars: [
            { char: "暮", pinyin: "ㄇㄨˋ", word: "暮色" },
            { char: "慕", pinyin: "ㄇㄨˋ", word: "愛慕" }
        ],
        difficulty: "hard",
        source: "學測考題"
    }
];

// ============================================
// 匯出統計資訊
// ============================================
export const getNewBankStats = () => {
    return {
        multiPronunciation: multiPronunciationWords.length,
        idiom: idiomPronunciation.length,
        classical: classicalPronunciation.length,
        poetry: poetryPronunciation.length,
        proverb: proverbPronunciation.length,
        similarSound: similarSoundWords.length,
        total: multiPronunciationWords.length +
            idiomPronunciation.length +
            classicalPronunciation.length +
            poetryPronunciation.length +
            proverbPronunciation.length +
            similarSoundWords.length
    };
};
