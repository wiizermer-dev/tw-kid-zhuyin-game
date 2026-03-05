/**
 * 大量擴充題庫 - 古文篇 (150+ 題)
 * 108課綱核心古文 + 經典名篇
 */

// ============================================
// 古文讀音 - 經典篇章 (Part 1)
// ============================================
export const classicalBatch1 = [
    // 論語
    { id: "cb1-001", text: "論語", article: "論語・學而", target: "說", context: "學而時習之，不亦說乎", pinyin: "ㄩㄝˋ", meaning: "通「悅」，高興", wrongOptions: ["ㄕㄨㄛ"], difficulty: "hard", source: "經典古文" },
    { id: "cb1-002", text: "論語", article: "論語・學而", target: "慍", context: "人不知而不慍", pinyin: "ㄩㄣˋ", meaning: "惱怒", wrongOptions: ["ㄨㄣ", "ㄩㄣˇ"], difficulty: "hard", source: "經典古文" },
    { id: "cb1-003", text: "論語", article: "論語・為政", target: "為", context: "為政以德", pinyin: "ㄨㄟˊ", meaning: "治理", wrongOptions: ["ㄨㄟˋ"], difficulty: "normal", source: "經典古文" },
    { id: "cb1-004", text: "論語", article: "論語・八佾", target: "佾", context: "八佾舞於庭", pinyin: "ㄧˋ", meaning: "列舞的行列", wrongOptions: ["ㄧˊ", "ㄩˋ"], difficulty: "hard", source: "經典古文" },
    { id: "cb1-005", text: "論語", article: "論語・里仁", target: "惡", context: "惡乎成名", pinyin: "ㄨ", meaning: "哪裡", wrongOptions: ["ㄜˋ"], difficulty: "hard", source: "經典古文" },

    // 孟子
    { id: "cb1-006", text: "孟子", article: "孟子・告子上", target: "好", context: "今人乍見孺子將入於井，皆有怵惕惻隱之心", pinyin: "ㄏㄠˋ", meaning: "喜好", wrongOptions: ["ㄏㄠˇ"], difficulty: "normal", source: "經典古文" },
    { id: "cb1-007", text: "孟子", article: "孟子・梁惠王上", target: "衡", context: "權衡然後知輕重", pinyin: "ㄏㄥˊ", meaning: "秤桿", wrongOptions: ["ㄏㄥˋ"], difficulty: "normal", source: "經典古文" },
    { id: "cb1-008", text: "孟子", article: "孟子・公孫丑上", target: "怵", context: "怵惕惻隱之心", pinyin: "ㄔㄨˋ", meaning: "恐懼", wrongOptions: ["ㄕㄨˋ", "ㄔㄨˇ"], difficulty: "hard", source: "經典古文" },
    { id: "cb1-009", text: "孟子", article: "孟子・公孫丑上", target: "惕", context: "怵惕惻隱之心", pinyin: "ㄊㄧˋ", meaning: "驚懼", wrongOptions: ["ㄉㄧˊ", "ㄊㄧ"], difficulty: "normal", source: "經典古文" },
    { id: "cb1-010", text: "孟子", article: "孟子・公孫丑上", target: "惻", context: "惻隱之心", pinyin: "ㄘㄜˋ", meaning: "悲傷", wrongOptions: ["ㄗㄜˋ", "ㄘㄜ"], difficulty: "normal", source: "經典古文" },

    // 莊子
    { id: "cb1-011", text: "莊子", article: "莊子・逍遙遊", target: "鯤", context: "北冥有魚，其名為鯤", pinyin: "ㄎㄨㄣ", wrongOptions: ["ㄍㄨㄣˇ", "ㄎㄨㄣˊ"], meaning: "大魚", difficulty: "normal", source: "經典古文" },
    { id: "cb1-012", text: "莊子", article: "莊子・逍遙遊", target: "鵬", context: "化而為鳥，其名為鵬", pinyin: "ㄆㄥˊ", wrongOptions: ["ㄈㄥˊ", "ㄆㄥ"], meaning: "大鳥", difficulty: "normal", source: "經典古文" },
    { id: "cb1-013", text: "莊子", article: "莊子・逍遙遊", target: "摶", context: "摶扶搖而上者九萬里", pinyin: "ㄊㄨㄢˊ", wrongOptions: ["ㄅㄛˊ", "ㄊㄨㄢ"], meaning: "盤旋", difficulty: "hard", source: "經典古文" },
    { id: "cb1-014", text: "莊子", article: "莊子・養生主", target: "踦", context: "提刀而立，為之四顧，為之躊躇滿志", pinyin: "ㄐㄧˇ", wrongOptions: ["ㄑㄧˊ", "ㄐㄧˋ"], meaning: "支撐", difficulty: "hard", source: "經典古文" },
    { id: "cb1-015", text: "莊子", article: "莊子・養生主", target: "庖", context: "庖丁解牛", pinyin: "ㄆㄠˊ", wrongOptions: ["ㄅㄠˊ", "ㄆㄠˋ"], meaning: "廚師", difficulty: "hard", source: "經典古文" },

    // 老子
    { id: "cb1-016", text: "老子", article: "道德經", target: "玄", context: "玄之又玄，眾妙之門", pinyin: "ㄒㄩㄢˊ", wrongOptions: ["ㄒㄩㄢˋ", "ㄏㄨㄢˊ"], meaning: "深奧", difficulty: "normal", source: "經典古文" },
    { id: "cb1-017", text: "老子", article: "道德經", target: "牝", context: "谷神不死，是謂玄牝", pinyin: "ㄆㄧㄣˋ", wrongOptions: ["ㄇㄨˇ", "ㄆㄧㄣˇ"], meaning: "雌性", difficulty: "hard", source: "經典古文" },

    // 詩經
    { id: "cb1-018", text: "詩經", article: "詩經・關雎", target: "窈", context: "窈窕淑女，君子好逑", pinyin: "ㄧㄠˇ", wrongOptions: ["ㄧㄠˋ", "ㄧㄠ"], meaning: "幽深", difficulty: "normal", source: "經典古文" },
    { id: "cb1-019", text: "詩經", article: "詩經・關雎", target: "窕", context: "窈窕淑女", pinyin: "ㄊㄧㄠˇ", wrongOptions: ["ㄆㄧㄠˇ", "ㄊㄧㄠˋ"], meaning: "美好", difficulty: "normal", source: "經典古文" },
    { id: "cb1-020", text: "詩經", article: "詩經・關雎", target: "逑", context: "君子好逑", pinyin: "ㄑㄧㄡˊ", wrongOptions: ["ㄐㄧㄡˋ", "ㄑㄧㄡ"], meaning: "配偶", difficulty: "hard", source: "經典古文" },
    { id: "cb1-021", text: "詩經", article: "詩經・蒹葭", target: "蒹", context: "蒹葭蒼蒼", pinyin: "ㄐㄧㄢ", wrongOptions: ["ㄑㄧㄢˊ", "ㄐㄧㄢˋ"], meaning: "蘆葦", difficulty: "hard", source: "經典古文" },
    { id: "cb1-022", text: "詩經", article: "詩經・蒹葭", target: "葭", context: "蒹葭蒼蒼", pinyin: "ㄐㄧㄚ", wrongOptions: ["ㄍㄨˇ", "ㄐㄧㄚˊ"], meaning: "蘆葦", difficulty: "hard", source: "經典古文" },
    { id: "cb1-023", text: "詩經", article: "詩經・蒹葭", target: "溯", context: "溯洄從之", pinyin: "ㄙㄨˋ", wrongOptions: ["ㄕㄨㄛˋ", "ㄙㄨˇ"], meaning: "逆流而上", difficulty: "normal", source: "經典古文" },
    { id: "cb1-024", text: "詩經", article: "詩經・蒹葭", target: "洄", context: "溯洄從之", pinyin: "ㄏㄨㄟˊ", wrongOptions: ["ㄏㄨㄟˋ", "ㄍㄨㄟˊ"], meaning: "迴轉", difficulty: "normal", source: "經典古文" },
    { id: "cb1-025", text: "詩經", article: "詩經・蒹葭", target: "湄", context: "在水之湄", pinyin: "ㄇㄟˊ", wrongOptions: ["ㄇㄟˇ", "ㄇㄟˋ"], meaning: "水邊", difficulty: "normal", source: "經典古文" },

    // 楚辭
    { id: "cb1-026", text: "楚辭", article: "離騷", target: "騷", context: "離騷", pinyin: "ㄙㄠ", wrongOptions: ["ㄙㄠˋ", "ㄕㄠ"], meaning: "憂愁", difficulty: "normal", source: "經典古文" },
    { id: "cb1-027", text: "楚辭", article: "離騷", target: "畦", context: "余既滋蘭之九畹兮", pinyin: "ㄑㄧˊ", wrongOptions: ["ㄍㄨㄟ", "ㄑㄧˋ"], meaning: "菜圃", difficulty: "hard", source: "經典古文" },
    { id: "cb1-028", text: "楚辭", article: "離騷", target: "畹", context: "九畹", pinyin: "ㄨㄢˇ", wrongOptions: ["ㄩㄢˇ", "ㄨㄢˋ"], meaning: "田畝", difficulty: "hard", source: "經典古文" },
    { id: "cb1-029", text: "楚辭", article: "九歌・湘君", target: "湘", context: "湘君", pinyin: "ㄒㄧㄤ", wrongOptions: ["ㄕㄤ", "ㄒㄧㄤˋ"], meaning: "水名", difficulty: "normal", source: "經典古文" },
    { id: "cb1-030", text: "楚辭", article: "漁父", target: "滄", context: "滄浪之水清兮", pinyin: "ㄘㄤ", wrongOptions: ["ㄘㄤˋ", "ㄔㄤ"], meaning: "青綠色", difficulty: "normal", source: "經典古文" }
];

// ============================================
// 古文讀音 - 經典篇章 (Part 2)
// ============================================
export const classicalBatch2 = [
    // 史記
    { id: "cb2-001", text: "史記", article: "史記・項羽本紀", target: "騅", context: "騅不逝兮可奈何", pinyin: "ㄓㄨㄟ", wrongOptions: ["ㄔㄨㄟ", "ㄓㄨㄟˊ"], meaning: "駿馬", difficulty: "hard", source: "經典古文" },
    { id: "cb2-002", text: "史記", article: "史記・項羽本紀", target: "虞", context: "虞兮虞兮奈若何", pinyin: "ㄩˊ", wrongOptions: ["ㄩˋ", "ㄨˊ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb2-003", text: "史記", article: "史記・廉頗藺相如列傳", target: "藺", context: "藺相如", pinyin: "ㄌㄧㄣˋ", wrongOptions: ["ㄌㄧㄣˊ", "ㄌㄧㄥˋ"], meaning: "姓氏", difficulty: "hard", source: "經典古文" },
    { id: "cb2-004", text: "史記", article: "史記・廉頗藺相如列傳", target: "廉", context: "廉頗", pinyin: "ㄌㄧㄢˊ", wrongOptions: ["ㄌㄧㄢˋ", "ㄌㄧㄢˇ"], meaning: "姓氏", difficulty: "normal", source: "經典古文" },
    { id: "cb2-005", text: "史記", article: "史記・刺客列傳", target: "荊", context: "荊軻刺秦王", pinyin: "ㄐㄧㄥ", wrongOptions: ["ㄐㄧㄥˋ", "ㄑㄧㄥ"], meaning: "姓氏", difficulty: "normal", source: "經典古文" },
    { id: "cb2-006", text: "史記", article: "史記・刺客列傳", target: "軻", context: "荊軻", pinyin: "ㄎㄜ", wrongOptions: ["ㄍㄜ", "ㄎㄜˋ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb2-007", text: "史記", article: "史記・淮陰侯列傳", target: "淮", context: "淮陰侯", pinyin: "ㄏㄨㄞˊ", wrongOptions: ["ㄨㄞˊ", "ㄏㄨㄞˋ"], meaning: "地名", difficulty: "normal", source: "經典古文" },
    { id: "cb2-008", text: "史記", article: "史記・淮陰侯列傳", target: "胯", context: "胯下之辱", pinyin: "ㄎㄨㄚˋ", wrongOptions: ["ㄍㄨㄚˋ", "ㄎㄨㄚˇ"], meaning: "兩腿之間", difficulty: "normal", source: "經典古文" },

    // 戰國策
    { id: "cb2-009", text: "戰國策", article: "戰國策・趙策", target: "觸", context: "觸龍說趙太后", pinyin: "ㄔㄨˋ", wrongOptions: ["ㄓㄨˊ", "ㄔㄨˇ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb2-010", text: "戰國策", article: "戰國策・燕策", target: "蘇", context: "蘇秦", pinyin: "ㄙㄨ", wrongOptions: ["ㄙㄨˊ", "ㄕㄨ"], meaning: "姓氏", difficulty: "normal", source: "經典古文" },

    // 左傳
    { id: "cb2-011", text: "左傳", article: "左傳・僖公三十年", target: "佚", context: "佚之狐", pinyin: "ㄧˋ", wrongOptions: ["ㄉㄧˊ", "ㄧˊ"], meaning: "人名", difficulty: "hard", source: "經典古文" },
    { id: "cb2-012", text: "左傳", article: "左傳・隱公元年", target: "鄭", context: "鄭伯克段於鄢", pinyin: "ㄓㄥˋ", wrongOptions: ["ㄓㄥˇ", "ㄓㄥ"], meaning: "國名", difficulty: "normal", source: "經典古文" },
    { id: "cb2-013", text: "左傳", article: "左傳・隱公元年", target: "鄢", context: "克段於鄢", pinyin: "ㄧㄢ", wrongOptions: ["ㄧㄢˇ", "ㄧㄢˋ"], meaning: "地名", difficulty: "hard", source: "經典古文" },
    { id: "cb2-014", text: "左傳", article: "左傳・宣公二年", target: "弒", context: "趙盾弒君", pinyin: "ㄕˋ", wrongOptions: ["ㄙˋ", "ㄕ"], meaning: "臣殺君", difficulty: "normal", source: "經典古文" },

    // 唐宋古文
    { id: "cb2-015", text: "師說", article: "韓愈・師說", target: "蟠", context: "青，取之於藍，而青於藍", pinyin: "ㄆㄢˊ", wrongOptions: ["ㄈㄢˊ", "ㄆㄢˋ"], meaning: "盤曲", difficulty: "hard", source: "108課綱核心古文" },
    { id: "cb2-016", text: "祭十二郎文", article: "韓愈・祭十二郎文", target: "嗚", context: "嗚呼哀哉", pinyin: "ㄨ", wrongOptions: ["ㄨˇ", "ㄨˋ"], meaning: "嘆詞", difficulty: "normal", source: "經典古文" },
    { id: "cb2-017", text: "祭十二郎文", article: "韓愈・祭十二郎文", target: "殤", context: "少者殤", pinyin: "ㄕㄤ", wrongOptions: ["ㄕㄤˋ", "ㄕㄤˇ"], meaning: "未成年而死", difficulty: "hard", source: "經典古文" },
    { id: "cb2-018", text: "捕蛇者說", article: "柳宗元・捕蛇者說", target: "蒞", context: "蒞事者", pinyin: "ㄌㄧˋ", wrongOptions: ["ㄨㄟˋ", "ㄌㄧˇ"], meaning: "到、臨", difficulty: "hard", source: "經典古文" },
    { id: "cb2-019", text: "始得西山宴游記", article: "柳宗元", target: "宴", context: "西山宴游記", pinyin: "ㄧㄢˋ", wrongOptions: ["ㄧㄢˇ", "ㄧㄢˊ"], meaning: "安適", difficulty: "normal", source: "經典古文" },
    { id: "cb2-020", text: "岳陽樓記", article: "范仲淹・岳陽樓記", target: "嶽", context: "岳陽樓", pinyin: "ㄩㄝˋ", wrongOptions: ["ㄜˋ", "ㄨㄛˋ"], meaning: "高山", difficulty: "normal", source: "經典古文" },
    { id: "cb2-021", text: "岳陽樓記", article: "范仲淹・岳陽樓記", target: "滕", context: "滕子京", pinyin: "ㄊㄥˊ", wrongOptions: ["ㄉㄥˊ", "ㄊㄥ"], meaning: "姓氏", difficulty: "normal", source: "經典古文" },
    { id: "cb2-022", text: "岳陽樓記", article: "范仲淹・岳陽樓記", target: "謫", context: "謫守巴陵郡", pinyin: "ㄓㄜˊ", wrongOptions: ["ㄊㄧˊ", "ㄓㄜˋ"], meaning: "貶官", difficulty: "hard", source: "經典古文" },
    { id: "cb2-023", text: "岳陽樓記", article: "范仲淹・岳陽樓記", target: "汀", context: "沙鷗翔集，錦鱗游泳", pinyin: "ㄊㄧㄥ", wrongOptions: ["ㄉㄧㄥˋ", "ㄊㄧㄥˊ"], meaning: "水邊平地", difficulty: "normal", source: "經典古文" },
    { id: "cb2-024", text: "醉翁亭記", article: "歐陽修・醉翁亭記", target: "翁", context: "醉翁亭", pinyin: "ㄨㄥ", wrongOptions: ["ㄨㄥˋ", "ㄨㄥˊ"], meaning: "老人", difficulty: "normal", source: "經典古文" },
    { id: "cb2-025", text: "醉翁亭記", article: "歐陽修・醉翁亭記", target: "滁", context: "滁州", pinyin: "ㄔㄨˊ", wrongOptions: ["ㄕㄨˊ", "ㄔㄨ"], meaning: "地名", difficulty: "normal", source: "經典古文" },
    { id: "cb2-026", text: "醉翁亭記", article: "歐陽修・醉翁亭記", target: "觥", context: "觥籌交錯", pinyin: "ㄍㄨㄥ", wrongOptions: ["ㄏㄨㄥˊ", "ㄍㄨㄥˋ"], meaning: "酒器", difficulty: "hard", source: "經典古文" },
    { id: "cb2-027", text: "前赤壁賦", article: "蘇軾・前赤壁賦", target: "壬", context: "壬戌之秋", pinyin: "ㄖㄣˊ", wrongOptions: ["ㄖㄣˋ", "ㄖㄣˇ"], meaning: "天干", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb2-028", text: "前赤壁賦", article: "蘇軾・前赤壁賦", target: "戌", context: "壬戌之秋", pinyin: "ㄒㄩ", wrongOptions: ["ㄕㄨˋ", "ㄒㄩˋ"], meaning: "地支", difficulty: "hard", source: "108課綱核心古文" },
    { id: "cb2-029", text: "前赤壁賦", article: "蘇軾・前赤壁賦", target: "渺", context: "渺渺兮予懷", pinyin: "ㄇㄧㄠˇ", wrongOptions: ["ㄇㄧㄠˋ", "ㄇㄧㄠ"], meaning: "微小", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb2-030", text: "前赤壁賦", article: "蘇軾・前赤壁賦", target: "嫠", context: "泣孤舟之嫠婦", pinyin: "ㄌㄧˊ", wrongOptions: ["ㄌㄧˋ", "ㄒㄧˊ"], meaning: "寡婦", difficulty: "hard", source: "108課綱核心古文" }
];

// ============================================
// 古文讀音 - 經典篇章 (Part 3)
// ============================================
export const classicalBatch3 = [
    // 更多經典篇章
    { id: "cb3-001", text: "出師表", article: "諸葛亮・出師表", target: "庶", context: "庶竭駑鈍", pinyin: "ㄕㄨˋ", wrongOptions: ["ㄓㄨˋ", "ㄕㄨˇ"], meaning: "希望、或許", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb3-002", text: "出師表", article: "諸葛亮・出師表", target: "駑", context: "庶竭駑鈍", pinyin: "ㄋㄨˊ", wrongOptions: ["ㄋㄨˋ", "ㄇㄚˇ"], meaning: "劣馬", difficulty: "hard", source: "108課綱核心古文" },
    { id: "cb3-003", text: "出師表", article: "諸葛亮・出師表", target: "鈍", context: "庶竭駑鈍", pinyin: "ㄉㄨㄣˋ", wrongOptions: ["ㄉㄨㄣˇ", "ㄊㄨㄣˋ"], meaning: "愚笨", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb3-004", text: "出師表", article: "諸葛亮・出師表", target: "夙", context: "夙夜憂嘆", pinyin: "ㄙㄨˋ", wrongOptions: ["ㄕㄨˋ", "ㄙㄨˇ"], meaning: "早晨", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb3-005", text: "出師表", article: "諸葛亮・出師表", target: "崩", context: "先帝創業未半而中道崩殂", pinyin: "ㄅㄥ", wrongOptions: ["ㄅㄥˋ", "ㄆㄥˊ"], meaning: "死亡", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb3-006", text: "出師表", article: "諸葛亮・出師表", target: "殂", context: "崩殂", pinyin: "ㄘㄨˊ", wrongOptions: ["ㄐㄩ", "ㄘㄨˋ"], meaning: "死亡", difficulty: "hard", source: "108課綱核心古文" },

    // 陶淵明
    { id: "cb3-007", text: "桃花源記", article: "陶淵明・桃花源記", target: "繽", context: "落英繽紛", pinyin: "ㄅㄧㄣ", wrongOptions: ["ㄆㄧㄣˊ", "ㄅㄧㄣˋ"], meaning: "繁多", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb3-008", text: "桃花源記", article: "陶淵明・桃花源記", target: "紛", context: "落英繽紛", pinyin: "ㄈㄣ", wrongOptions: ["ㄈㄣˋ", "ㄈㄣˇ"], meaning: "雜亂", difficulty: "normal", source: "108課綱核心古文" },
    { id: "cb3-009", text: "桃花源記", article: "陶淵明・桃花源記", target: "阡", context: "阡陌交通", pinyin: "ㄑㄧㄢ", wrongOptions: ["ㄒㄧㄢ", "ㄑㄧㄢˊ"], meaning: "田間小路", difficulty: "hard", source: "108課綱核心古文" },
    { id: "cb3-010", text: "桃花源記", article: "陶淵明・桃花源記", target: "陌", context: "阡陌交通", pinyin: "ㄇㄛˋ", wrongOptions: ["ㄅㄛˊ", "ㄇㄛ"], meaning: "田間小路", difficulty: "hard", source: "108課綱核心古文" },
    { id: "cb3-011", text: "歸去來辭", article: "陶淵明・歸去來辭", target: "辭", context: "歸去來辭", pinyin: "ㄘˊ", wrongOptions: ["ㄙˋ", "ㄘˋ"], meaning: "文體", difficulty: "normal", source: "經典古文" },
    { id: "cb3-012", text: "歸去來辭", article: "陶淵明・歸去來辭", target: "樽", context: "引壺觴以自酌", pinyin: "ㄗㄨㄣ", wrongOptions: ["ㄐㄩㄣ", "ㄗㄨㄣˊ"], meaning: "酒杯", difficulty: "hard", source: "經典古文" },

    // 王勃
    { id: "cb3-013", text: "滕王閣序", article: "王勃・滕王閣序", target: "滕", context: "滕王閣序", pinyin: "ㄊㄥˊ", wrongOptions: ["ㄉㄥˊ", "ㄊㄥ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb3-014", text: "滕王閣序", article: "王勃・滕王閣序", target: "閣", context: "滕王閣序", pinyin: "ㄍㄜˊ", wrongOptions: ["ㄍㄜˋ", "ㄍㄜ"], meaning: "樓閣", difficulty: "normal", source: "經典古文" },
    { id: "cb3-015", text: "滕王閣序", article: "王勃・滕王閣序", target: "襟", context: "襟三江而帶五湖", pinyin: "ㄐㄧㄣ", wrongOptions: ["ㄐㄧㄣˇ", "ㄐㄧㄣˋ"], meaning: "衣領", difficulty: "normal", source: "經典古文" },
    { id: "cb3-016", text: "滕王閣序", article: "王勃・滕王閣序", target: "騖", context: "落霞與孤鶩齊飛", pinyin: "ㄨˋ", wrongOptions: ["ㄇㄨˋ", "ㄨˇ"], meaning: "野鴨", difficulty: "hard", source: "經典古文" },

    // 劉禹錫
    { id: "cb3-017", text: "陋室銘", article: "劉禹錫・陋室銘", target: "陋", context: "陋室銘", pinyin: "ㄌㄡˋ", wrongOptions: ["ㄌㄡˇ", "ㄌㄨˋ"], meaning: "簡陋", difficulty: "normal", source: "經典古文" },
    { id: "cb3-018", text: "陋室銘", article: "劉禹錫・陋室銘", target: "銘", context: "陋室銘", pinyin: "ㄇㄧㄥˊ", wrongOptions: ["ㄇㄧㄥˋ", "ㄇㄧㄥˇ"], meaning: "銘文", difficulty: "normal", source: "經典古文" },
    { id: "cb3-019", text: "陋室銘", article: "劉禹錫・陋室銘", target: "牘", context: "無案牘之勞形", pinyin: "ㄉㄨˊ", wrongOptions: ["ㄊㄨˊ", "ㄉㄨˋ"], meaning: "文書", difficulty: "hard", source: "經典古文" },

    // 周敦頤
    { id: "cb3-020", text: "愛蓮說", article: "周敦頤・愛蓮說", target: "頤", context: "周敦頤", pinyin: "ㄧˊ", wrongOptions: ["ㄧˋ", "ㄖㄨˊ"], meaning: "面頰", difficulty: "normal", source: "經典古文" },
    { id: "cb3-021", text: "愛蓮說", article: "周敦頤・愛蓮說", target: "淤", context: "出淤泥而不染", pinyin: "ㄩ", wrongOptions: ["ㄨ", "ㄩˊ"], meaning: "污泥", difficulty: "normal", source: "經典古文" },
    { id: "cb3-022", text: "愛蓮說", article: "周敦頤・愛蓮說", target: "濯", context: "濯清漣而不妖", pinyin: "ㄓㄨㄛˊ", wrongOptions: ["ㄉㄨㄛˊ", "ㄓㄨㄛˋ"], meaning: "洗滌", difficulty: "hard", source: "經典古文" },
    { id: "cb3-023", text: "愛蓮說", article: "周敦頤・愛蓮說", target: "漣", context: "清漣", pinyin: "ㄌㄧㄢˊ", wrongOptions: ["ㄌㄧㄢˋ", "ㄌㄧㄢˇ"], meaning: "清水", difficulty: "normal", source: "經典古文" },
    { id: "cb3-024", text: "愛蓮說", article: "周敦頤・愛蓮說", target: "蔓", context: "不蔓不枝", pinyin: "ㄇㄢˋ", wrongOptions: ["ㄨㄢˋ", "ㄇㄢˇ"], meaning: "蔓延", difficulty: "normal", source: "經典古文" },
    { id: "cb3-025", text: "愛蓮說", article: "周敦頤・愛蓮說", target: "褻", context: "可遠觀而不可褻玩焉", pinyin: "ㄒㄧㄝˋ", wrongOptions: ["ㄒㄧㄝˊ", "ㄒㄧㄝˇ"], meaning: "輕慢", difficulty: "hard", source: "經典古文" },

    // 曾鞏
    { id: "cb3-026", text: "墨池記", article: "曾鞏・墨池記", target: "鞏", context: "曾鞏", pinyin: "ㄍㄨㄥˇ", wrongOptions: ["ㄍㄨㄥ", "ㄍㄨㄥˋ"], meaning: "人名", difficulty: "normal", source: "經典古文" },

    // 王安石
    { id: "cb3-027", text: "遊褒禪山記", article: "王安石・遊褒禪山記", target: "褒", context: "褒禪山", pinyin: "ㄅㄠ", wrongOptions: ["ㄆㄠˊ", "ㄅㄠˋ"], meaning: "山名", difficulty: "normal", source: "經典古文" },
    { id: "cb3-028", text: "遊褒禪山記", article: "王安石・遊褒禪山記", target: "禪", context: "褒禪山", pinyin: "ㄔㄢˊ", wrongOptions: ["ㄕㄢˋ", "ㄔㄢˋ"], meaning: "佛教用語", difficulty: "normal", source: "經典古文" },
    { id: "cb3-029", text: "遊褒禪山記", article: "王安石・遊褒禪山記", target: "窈", context: "其下平曠，有泉側出，而記遊者甚眾，所謂前洞也。由山以上五六里，有穴窈然", pinyin: "ㄧㄠˇ", wrongOptions: ["ㄧㄠˋ", "ㄧㄡˇ"], meaning: "幽深", difficulty: "normal", source: "經典古文" },
    { id: "cb3-030", text: "遊褒禪山記", article: "王安石・遊褒禪山記", target: "咎", context: "此余之所得也，既其出，則或咎其欲出者", pinyin: "ㄐㄧㄡˋ", wrongOptions: ["ㄍㄠ", "ㄐㄧㄡˇ"], meaning: "責備", difficulty: "normal", source: "經典古文" }
];

// 匯出統計
export const getClassicalBatchStats = () => {
    return {
        batch1: classicalBatch1.length,
        batch2: classicalBatch2.length,
        batch3: classicalBatch3.length,
        total: classicalBatch1.length + classicalBatch2.length + classicalBatch3.length
    };
};
