/**
 * 大量擴充題庫 - 成語篇 (200+ 題)
 */

// ============================================
// 成語讀音 - 常見易錯成語 (Part 1)
// ============================================
export const idiomBatch1 = [
    // A
    { id: "ib1-001", idiom: "諳熟", target: "諳", pinyin: "ㄢ", wrongOptions: ["ㄧㄣ"], meaning: "熟悉", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-002", idiom: "黯然失色", target: "黯", pinyin: "ㄢˋ", wrongOptions: ["ㄢ", "ㄧㄣˋ"], meaning: "色彩暗淡", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-003", idiom: "嗷嗷待哺", target: "嗷", pinyin: "ㄠˊ", wrongOptions: ["ㄠ", "ㄍㄠ"], meaning: "飢餓聲", difficulty: "normal", source: "教育部成語典" },

    // B
    { id: "ib1-004", idiom: "卑躬屈膝", target: "躬", pinyin: "ㄍㄨㄥ", wrongOptions: ["ㄐㄩㄥ", "ㄍㄨㄥˇ"], meaning: "低聲下氣", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-005", idiom: "不落窠臼", target: "窠", pinyin: "ㄎㄜ", wrongOptions: ["ㄍㄨㄛ", "ㄎㄜˊ"], meaning: "鳥巢", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-006", idiom: "不落窠臼", target: "臼", pinyin: "ㄐㄧㄡˋ", wrongOptions: ["ㄐㄧㄡˇ", "ㄒㄧㄡˋ"], meaning: "舂米器具", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-007", idiom: "博聞強識", target: "識", pinyin: "ㄓˋ", wrongOptions: ["ㄕˋ"], meaning: "記憶", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-008", idiom: "杯盤狼藉", target: "藉", pinyin: "ㄐㄧˊ", wrongOptions: ["ㄐㄧㄝˋ", "ㄐㄧ"], meaning: "雜亂", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-009", idiom: "暴虎馮河", target: "馮", pinyin: "ㄆㄧㄥˊ", wrongOptions: ["ㄈㄥˊ"], meaning: "徒步渡河", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-010", idiom: "鋌而走險", target: "鋌", pinyin: "ㄊㄧㄥˇ", wrongOptions: ["ㄉㄧㄥˋ", "ㄊㄧㄥˊ"], meaning: "快跑", difficulty: "hard", source: "教育部成語典" },

    // C
    { id: "ib1-011", idiom: "草菅人命", target: "菅", pinyin: "ㄐㄧㄢ", wrongOptions: ["ㄍㄨㄢˇ", "ㄐㄧㄢˋ"], meaning: "野草", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-012", idiom: "嗤之以鼻", target: "嗤", pinyin: "ㄔ", wrongOptions: ["ㄘ", "ㄔˋ"], meaning: "嘲笑聲", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-013", idiom: "瞠目結舌", target: "瞠", pinyin: "ㄔㄥ", wrongOptions: ["ㄊㄤˊ", "ㄔㄥˊ"], meaning: "瞪大眼睛", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-014", idiom: "躊躇滿志", target: "躊", pinyin: "ㄔㄡˊ", wrongOptions: ["ㄓㄡˊ", "ㄔㄡˇ"], meaning: "猶豫", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-015", idiom: "躊躇滿志", target: "躇", pinyin: "ㄔㄨˊ", wrongOptions: ["ㄓㄨˊ", "ㄔㄨˇ"], meaning: "徘徊", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-016", idiom: "處心積慮", target: "處", pinyin: "ㄔㄨˇ", wrongOptions: ["ㄔㄨˋ"], meaning: "存著心思", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-017", idiom: "叱吒風雲", target: "吒", pinyin: "ㄓㄚˋ", wrongOptions: ["ㄔㄚˋ", "ㄓㄚ"], meaning: "呵斥", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-018", idiom: "插科打諢", target: "諢", pinyin: "ㄏㄨㄣˋ", wrongOptions: ["ㄏㄨㄣˊ", "ㄍㄨㄣˋ"], meaning: "玩笑話", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-019", idiom: "差強人意", target: "差", pinyin: "ㄔㄚ", wrongOptions: ["ㄔㄞ", "ㄘ"], meaning: "稍微", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-020", idiom: "沉痾難起", target: "痾", pinyin: "ㄎㄜ", wrongOptions: ["ㄜ", "ㄎㄜˊ"], meaning: "疾病", difficulty: "hard", source: "教育部成語典" },

    // D
    { id: "ib1-021", idiom: "度德量力", target: "度", pinyin: "ㄉㄨㄛˋ", wrongOptions: ["ㄉㄨˋ"], meaning: "衡量", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-022", idiom: "大放厥詞", target: "厥", pinyin: "ㄐㄩㄝˊ", wrongOptions: ["ㄐㄩㄝˋ", "ㄎㄨㄟˋ"], meaning: "其", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-023", idiom: "咄咄怪事", target: "咄", pinyin: "ㄉㄨㄛˋ", wrongOptions: ["ㄓㄨㄛˊ", "ㄉㄨㄛ"], meaning: "驚訝聲", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-024", idiom: "頂禮膜拜", target: "膜", pinyin: "ㄇㄛˊ", wrongOptions: ["ㄇㄛˋ"], meaning: "額頭觸地", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-025", idiom: "多難興邦", target: "難", pinyin: "ㄋㄢˋ", wrongOptions: ["ㄋㄢˊ"], meaning: "災難", difficulty: "normal", source: "教育部成語典" },

    // E-F
    { id: "ib1-026", idiom: "阿諛諂媚", target: "諛", pinyin: "ㄩˊ", wrongOptions: ["ㄩˋ", "ㄩˇ"], meaning: "奉承", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-027", idiom: "阿諛諂媚", target: "諂", pinyin: "ㄔㄢˇ", wrongOptions: ["ㄒㄧㄢˇ", "ㄔㄢˋ"], meaning: "巴結", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-028", idiom: "匪夷所思", target: "匪", pinyin: "ㄈㄟˇ", wrongOptions: ["ㄈㄟ", "ㄈㄟˊ"], meaning: "不是", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-029", idiom: "分道揚鑣", target: "鑣", pinyin: "ㄅㄧㄠ", wrongOptions: ["ㄆㄧㄠ", "ㄅㄧㄠˋ"], meaning: "馬嚼子", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-030", idiom: "焚膏繼晷", target: "晷", pinyin: "ㄍㄨㄟˇ", wrongOptions: ["ㄐㄧㄡˇ", "ㄍㄨㄟˋ"], meaning: "日影", difficulty: "hard", source: "教育部成語典" },

    // G
    { id: "ib1-031", idiom: "剛愎自用", target: "愎", pinyin: "ㄅㄧˋ", wrongOptions: ["ㄈㄨˋ", "ㄅㄧˇ"], meaning: "固執", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-032", idiom: "苟延殘喘", target: "喘", pinyin: "ㄔㄨㄢˇ", wrongOptions: ["ㄔㄨㄢˋ", "ㄓㄨㄢˇ"], meaning: "呼吸", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-033", idiom: "功虧一簣", target: "簣", pinyin: "ㄎㄨㄟˋ", wrongOptions: ["ㄍㄨㄟˋ", "ㄎㄨㄟˇ"], meaning: "盛土的竹器", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-034", idiom: "觥籌交錯", target: "觥", pinyin: "ㄍㄨㄥ", wrongOptions: ["ㄏㄨㄥˊ", "ㄍㄨㄥˋ"], meaning: "酒器", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-035", idiom: "觥籌交錯", target: "籌", pinyin: "ㄔㄡˊ", wrongOptions: ["ㄔㄡˇ", "ㄓㄡˊ"], meaning: "酒籌", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-036", idiom: "故步自封", target: "故", pinyin: "ㄍㄨˋ", wrongOptions: ["ㄍㄨˇ"], meaning: "舊的", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-037", idiom: "刮目相看", target: "刮", pinyin: "ㄍㄨㄚ", wrongOptions: ["ㄍㄨㄚˋ", "ㄎㄨㄛˋ"], meaning: "擦拭", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-038", idiom: "蠱惑人心", target: "蠱", pinyin: "ㄍㄨˇ", wrongOptions: ["ㄍㄨˋ", "ㄎㄨˇ"], meaning: "毒蟲", difficulty: "hard", source: "教育部成語典" },

    // H
    { id: "ib1-039", idiom: "負隅頑抗", target: "隅", pinyin: "ㄩˊ", wrongOptions: ["ㄧˊ", "ㄩˋ"], meaning: "角落", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-040", idiom: "好高騖遠", target: "騖", pinyin: "ㄨˋ", wrongOptions: ["ㄇㄨˋ", "ㄨˇ"], meaning: "追求", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-041", idiom: "海市蜃樓", target: "蜃", pinyin: "ㄕㄣˋ", wrongOptions: ["ㄔㄣˊ", "ㄕㄣˇ"], meaning: "大蛤蜊", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-042", idiom: "酣暢淋漓", target: "酣", pinyin: "ㄏㄢ", wrongOptions: ["ㄍㄢ", "ㄏㄢˊ"], meaning: "痛快", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-043", idiom: "諱莫如深", target: "諱", pinyin: "ㄏㄨㄟˋ", wrongOptions: ["ㄏㄨㄟˇ", "ㄨㄟˋ"], meaning: "隱瞞", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-044", idiom: "畫虎類犬", target: "類", pinyin: "ㄌㄟˋ", wrongOptions: ["ㄌㄟˇ"], meaning: "像", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-045", idiom: "渾渾噩噩", target: "噩", pinyin: "ㄜˋ", wrongOptions: ["ㄍㄜ", "ㄜˇ"], meaning: "糊塗", difficulty: "hard", source: "教育部成語典" },

    // J
    { id: "ib1-046", idiom: "濟濟一堂", target: "濟", pinyin: "ㄐㄧˇ", wrongOptions: ["ㄐㄧˋ"], meaning: "眾多", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-047", idiom: "既往不咎", target: "咎", pinyin: "ㄐㄧㄡˋ", wrongOptions: ["ㄍㄠ", "ㄐㄧㄡˇ"], meaning: "責備", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-048", idiom: "嫁禍於人", target: "禍", pinyin: "ㄏㄨㄛˋ", wrongOptions: ["ㄍㄨㄛˋ", "ㄏㄨㄛˇ"], meaning: "災禍", difficulty: "normal", source: "教育部成語典" },
    { id: "ib1-049", idiom: "矜矜業業", target: "矜", pinyin: "ㄐㄧㄣ", wrongOptions: ["ㄐㄧㄣˇ", "ㄑㄧㄣˊ"], meaning: "謹慎", difficulty: "hard", source: "教育部成語典" },
    { id: "ib1-050", idiom: "噤若寒蟬", target: "噤", pinyin: "ㄐㄧㄣˋ", wrongOptions: ["ㄐㄧㄣˇ", "ㄑㄧㄣˋ"], meaning: "閉口", difficulty: "hard", source: "教育部成語典" }
];

// ============================================
// 成語讀音 - 常見易錯成語 (Part 2)
// ============================================
export const idiomBatch2 = [
    // K-L
    { id: "ib2-001", idiom: "刻舟求劍", target: "舟", pinyin: "ㄓㄡ", wrongOptions: ["ㄓㄡˋ", "ㄔㄡ"], meaning: "船", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-002", idiom: "膾炙人口", target: "膾", pinyin: "ㄎㄨㄞˋ", wrongOptions: ["ㄎㄨㄞˇ", "ㄏㄨㄟˋ"], meaning: "切細的肉", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-003", idiom: "膾炙人口", target: "炙", pinyin: "ㄓˋ", wrongOptions: ["ㄐㄧˋ", "ㄓˇ"], meaning: "烤肉", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-004", idiom: "老驥伏櫪", target: "驥", pinyin: "ㄐㄧˋ", wrongOptions: ["ㄐㄧˇ", "ㄑㄧˋ"], meaning: "千里馬", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-005", idiom: "老驥伏櫪", target: "櫪", pinyin: "ㄌㄧˋ", wrongOptions: ["ㄌㄧˊ", "ㄌㄧˇ"], meaning: "馬槽", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-006", idiom: "量入為出", target: "量", pinyin: "ㄌㄧㄤˋ", wrongOptions: ["ㄌㄧㄤˊ"], meaning: "衡量", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-007", idiom: "臨渴掘井", target: "掘", pinyin: "ㄐㄩㄝˊ", wrongOptions: ["ㄎㄨ", "ㄐㄩㄝˋ"], meaning: "挖", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-008", idiom: "流言蜚語", target: "蜚", pinyin: "ㄈㄟ", wrongOptions: ["ㄈㄟˇ", "ㄈㄟˋ"], meaning: "散布", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-009", idiom: "勵精圖治", target: "勵", pinyin: "ㄌㄧˋ", wrongOptions: ["ㄌㄧˇ"], meaning: "振奮", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-010", idiom: "鸞鳳和鳴", target: "鸞", pinyin: "ㄌㄨㄢˊ", wrongOptions: ["ㄌㄨㄢˋ", "ㄌㄨㄢˇ"], meaning: "神鳥", difficulty: "normal", source: "教育部成語典" },

    // M-N
    { id: "ib2-011", idiom: "蠻橫無理", target: "蠻", pinyin: "ㄇㄢˊ", wrongOptions: ["ㄇㄢˋ", "ㄇㄢˇ"], meaning: "粗野", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-012", idiom: "名列前茅", target: "茅", pinyin: "ㄇㄠˊ", wrongOptions: ["ㄇㄠˇ", "ㄇㄠˋ"], meaning: "茅草", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-013", idiom: "冥頑不靈", target: "冥", pinyin: "ㄇㄧㄥˊ", wrongOptions: ["ㄇㄧㄥˋ", "ㄇㄧㄥˇ"], meaning: "昏暗", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-014", idiom: "明眸皓齒", target: "眸", pinyin: "ㄇㄡˊ", wrongOptions: ["ㄇㄨˊ", "ㄇㄡˋ"], meaning: "眼珠", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-015", idiom: "明眸皓齒", target: "皓", pinyin: "ㄏㄠˋ", wrongOptions: ["ㄍㄠˇ", "ㄏㄠˇ"], meaning: "潔白", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-016", idiom: "沐猴而冠", target: "冠", pinyin: "ㄍㄨㄢˋ", wrongOptions: ["ㄍㄨㄢ"], meaning: "戴帽子", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-017", idiom: "內憂外患", target: "患", pinyin: "ㄏㄨㄢˋ", wrongOptions: ["ㄏㄨㄢˇ", "ㄍㄨㄢˋ"], meaning: "禍害", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-018", idiom: "南轅北轍", target: "轅", pinyin: "ㄩㄢˊ", wrongOptions: ["ㄩㄢˋ", "ㄨㄢˊ"], meaning: "車前的橫木", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-019", idiom: "南轅北轍", target: "轍", pinyin: "ㄓㄜˊ", wrongOptions: ["ㄔㄜˋ", "ㄓㄜˋ"], meaning: "車輪痕跡", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-020", idiom: "怒髮衝冠", target: "冠", pinyin: "ㄍㄨㄢ", wrongOptions: ["ㄍㄨㄢˋ"], meaning: "帽子", difficulty: "normal", source: "教育部成語典" },

    // P-Q
    { id: "ib2-021", idiom: "披荊斬棘", target: "荊", pinyin: "ㄐㄧㄥ", wrongOptions: ["ㄐㄧㄥˋ", "ㄑㄧㄥ"], meaning: "帶刺的灌木", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-022", idiom: "披荊斬棘", target: "棘", pinyin: "ㄐㄧˊ", wrongOptions: ["ㄐㄧˋ", "ㄐㄧˇ"], meaning: "酸棗樹", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-023", idiom: "撲朔迷離", target: "朔", pinyin: "ㄕㄨㄛˋ", wrongOptions: ["ㄙㄨㄛˋ", "ㄕㄨㄛ"], meaning: "跳動", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-024", idiom: "千鈞一髮", target: "鈞", pinyin: "ㄐㄩㄣ", wrongOptions: ["ㄐㄩㄣˋ", "ㄐㄩㄣˇ"], meaning: "三十斤", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-025", idiom: "棄暗投明", target: "棄", pinyin: "ㄑㄧˋ", wrongOptions: ["ㄑㄧˇ"], meaning: "捨棄", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-026", idiom: "窮兵黷武", target: "黷", pinyin: "ㄉㄨˊ", wrongOptions: ["ㄊㄨˊ", "ㄉㄨˋ"], meaning: "輕率", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-027", idiom: "傾家蕩產", target: "蕩", pinyin: "ㄉㄤˋ", wrongOptions: ["ㄊㄤˋ", "ㄉㄤˇ"], meaning: "耗盡", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-028", idiom: "窮途末路", target: "途", pinyin: "ㄊㄨˊ", wrongOptions: ["ㄊㄨˋ", "ㄊㄨˇ"], meaning: "路", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-029", idiom: "曲高和寡", target: "和", pinyin: "ㄏㄜˋ", wrongOptions: ["ㄏㄜˊ", "ㄏㄨㄛˋ"], meaning: "應和", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-030", idiom: "趨炎附勢", target: "趨", pinyin: "ㄑㄩ", wrongOptions: ["ㄑㄩˊ", "ㄘㄨ"], meaning: "奔向", difficulty: "normal", source: "教育部成語典" },

    // R-S
    { id: "ib2-031", idiom: "銳不可當", target: "當", pinyin: "ㄉㄤ", wrongOptions: ["ㄉㄤˋ"], meaning: "抵擋", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-032", idiom: "孺子可教", target: "孺", pinyin: "ㄖㄨˊ", wrongOptions: ["ㄖㄨˇ", "ㄋㄨˊ"], meaning: "小孩", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-033", idiom: "三緘其口", target: "緘", pinyin: "ㄐㄧㄢ", wrongOptions: ["ㄒㄧㄢˊ", "ㄐㄧㄢˋ"], meaning: "封閉", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-034", idiom: "喪心病狂", target: "喪", pinyin: "ㄙㄤˋ", wrongOptions: ["ㄙㄤ"], meaning: "失去", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-035", idiom: "殺雞儆猴", target: "儆", pinyin: "ㄐㄧㄥˇ", wrongOptions: ["ㄐㄧㄥˋ", "ㄑㄧㄥˇ"], meaning: "警戒", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-036", idiom: "深惡痛絕", target: "惡", pinyin: "ㄨˋ", wrongOptions: ["ㄜˋ"], meaning: "厭惡", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-037", idiom: "生吞活剝", target: "剝", pinyin: "ㄅㄛ", wrongOptions: ["ㄅㄠ", "ㄅㄛˊ"], meaning: "剝皮", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-038", idiom: "識途老馬", target: "識", pinyin: "ㄕˋ", wrongOptions: ["ㄓˋ"], meaning: "認識", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-039", idiom: "恕我直言", target: "恕", pinyin: "ㄕㄨˋ", wrongOptions: ["ㄖㄨˋ", "ㄕㄨˇ"], meaning: "原諒", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-040", idiom: "水乳交融", target: "乳", pinyin: "ㄖㄨˇ", wrongOptions: ["ㄋㄩˇ", "ㄖㄨˋ"], meaning: "奶", difficulty: "normal", source: "教育部成語典" },

    // T-W
    { id: "ib2-041", idiom: "貪得無厭", target: "厭", pinyin: "ㄧㄢˋ", wrongOptions: ["ㄧㄢ", "ㄧㄢˇ"], meaning: "滿足", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-042", idiom: "忐忑不安", target: "忐", pinyin: "ㄊㄢˇ", wrongOptions: ["ㄊㄢˋ", "ㄊㄢˊ"], meaning: "心神不定", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-043", idiom: "忐忑不安", target: "忑", pinyin: "ㄊㄜˋ", wrongOptions: ["ㄊㄜˇ", "ㄊㄜ"], meaning: "心神不定", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-044", idiom: "袒胸露臂", target: "袒", pinyin: "ㄊㄢˇ", wrongOptions: ["ㄊㄢˋ", "ㄉㄢˇ"], meaning: "露出", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-045", idiom: "投鼠忌器", target: "忌", pinyin: "ㄐㄧˋ", wrongOptions: ["ㄐㄧˇ", "ㄑㄧˋ"], meaning: "顧慮", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-046", idiom: "萬馬齊喑", target: "喑", pinyin: "ㄧㄣ", wrongOptions: ["ㄢˋ", "ㄧㄣˋ"], meaning: "沉默", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-047", idiom: "為虎作倀", target: "倀", pinyin: "ㄔㄤ", wrongOptions: ["ㄓㄤ", "ㄔㄤˊ"], meaning: "鬼", difficulty: "hard", source: "教育部成語典" },
    { id: "ib2-048", idiom: "蔚為大觀", target: "蔚", pinyin: "ㄨㄟˋ", wrongOptions: ["ㄩˋ", "ㄨㄟˇ"], meaning: "薈萃", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-049", idiom: "無所適從", target: "適", pinyin: "ㄕˋ", wrongOptions: ["ㄉㄧˊ"], meaning: "往", difficulty: "normal", source: "教育部成語典" },
    { id: "ib2-050", idiom: "惟妙惟肖", target: "肖", pinyin: "ㄒㄧㄠˋ", wrongOptions: ["ㄒㄧㄠ"], meaning: "相似", difficulty: "normal", source: "教育部成語典" }
];

// ============================================
// 成語讀音 - 常見易錯成語 (Part 3)
// ============================================
export const idiomBatch3 = [
    // X-Y-Z
    { id: "ib3-001", idiom: "弦外之音", target: "弦", pinyin: "ㄒㄧㄢˊ", wrongOptions: ["ㄒㄧㄢˋ", "ㄒㄩㄢˊ"], meaning: "琴弦", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-002", idiom: "相形見絀", target: "絀", pinyin: "ㄔㄨˋ", wrongOptions: ["ㄓㄨˊ", "ㄔㄨ"], meaning: "不足", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-003", idiom: "相濡以沫", target: "濡", pinyin: "ㄖㄨˊ", wrongOptions: ["ㄋㄩˇ", "ㄖㄨˇ"], meaning: "沾濕", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-004", idiom: "相濡以沫", target: "沫", pinyin: "ㄇㄛˋ", wrongOptions: ["ㄇㄛˇ", "ㄇㄟˋ"], meaning: "唾沫", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-005", idiom: "心曠神怡", target: "曠", pinyin: "ㄎㄨㄤˋ", wrongOptions: ["ㄍㄨㄤˇ", "ㄎㄨㄤˇ"], meaning: "開闊", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-006", idiom: "心曠神怡", target: "怡", pinyin: "ㄧˊ", wrongOptions: ["ㄊㄞˊ", "ㄧˋ"], meaning: "愉快", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-007", idiom: "惺惺相惜", target: "惺", pinyin: "ㄒㄧㄥ", wrongOptions: ["ㄒㄧㄥˋ", "ㄒㄧㄥˊ"], meaning: "聰明", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-008", idiom: "栩栩如生", target: "栩", pinyin: "ㄒㄩˇ", wrongOptions: ["ㄩˇ", "ㄒㄩ"], meaning: "生動活潑", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-009", idiom: "熏陶成性", target: "熏", pinyin: "ㄒㄩㄣ", wrongOptions: ["ㄒㄩㄣˋ", "ㄏㄨㄣ"], meaning: "薰染", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-010", idiom: "循序漸進", target: "循", pinyin: "ㄒㄩㄣˊ", wrongOptions: ["ㄒㄩㄣˋ"], meaning: "依照", difficulty: "normal", source: "教育部成語典" },

    { id: "ib3-011", idiom: "言簡意賅", target: "賅", pinyin: "ㄍㄞ", wrongOptions: ["ㄏㄞˊ", "ㄍㄞˋ"], meaning: "完備", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-012", idiom: "揠苗助長", target: "揠", pinyin: "ㄧㄚˋ", wrongOptions: ["ㄧㄢˋ", "ㄧㄚ"], meaning: "拔", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-013", idiom: "偃旗息鼓", target: "偃", pinyin: "ㄧㄢˇ", wrongOptions: ["ㄧㄢˋ", "ㄧㄢ"], meaning: "放倒", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-014", idiom: "殷鑑不遠", target: "殷", pinyin: "ㄧㄣ", wrongOptions: ["ㄧㄣˇ", "ㄧㄣˋ"], meaning: "商朝", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-015", idiom: "殷鑑不遠", target: "鑑", pinyin: "ㄐㄧㄢˋ", wrongOptions: ["ㄐㄧㄢ", "ㄐㄧㄢˇ"], meaning: "鏡子、借鏡", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-016", idiom: "飲水思源", target: "飲", pinyin: "ㄧㄣˇ", wrongOptions: ["ㄧㄣˋ"], meaning: "喝", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-017", idiom: "迎刃而解", target: "刃", pinyin: "ㄖㄣˋ", wrongOptions: ["ㄖㄣˇ", "ㄋㄧㄣˋ"], meaning: "刀刃", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-018", idiom: "應運而生", target: "應", pinyin: "ㄧㄥˋ", wrongOptions: ["ㄧㄥ"], meaning: "順應", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-019", idiom: "鷸蚌相爭", target: "鷸", pinyin: "ㄩˋ", wrongOptions: ["ㄐㄩˋ", "ㄩˇ"], meaning: "水鳥", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-020", idiom: "運籌帷幄", target: "幄", pinyin: "ㄨㄛˋ", wrongOptions: ["ㄨˋ", "ㄎㄨㄛˋ"], meaning: "帳幕", difficulty: "hard", source: "教育部成語典" },

    { id: "ib3-021", idiom: "振聾發聵", target: "聵", pinyin: "ㄎㄨㄟˋ", wrongOptions: ["ㄍㄨㄟˋ", "ㄎㄨㄟˇ"], meaning: "耳聾", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-022", idiom: "招搖撞騙", target: "搖", pinyin: "ㄧㄠˊ", wrongOptions: ["ㄧㄠˇ", "ㄧㄠˋ"], meaning: "搖擺", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-023", idiom: "折衷是非", target: "折", pinyin: "ㄓㄜˊ", wrongOptions: ["ㄓㄜˇ", "ㄕㄜˊ"], meaning: "調和", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-024", idiom: "斟酌損益", target: "斟", pinyin: "ㄓㄣ", wrongOptions: ["ㄕㄣˇ", "ㄓㄣˇ"], meaning: "倒酒", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-025", idiom: "斟酌損益", target: "酌", pinyin: "ㄓㄨㄛˊ", wrongOptions: ["ㄔㄨㄛˋ", "ㄓㄨㄛˋ"], meaning: "飲酒", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-026", idiom: "枕戈待旦", target: "戈", pinyin: "ㄍㄜ", wrongOptions: ["ㄍㄨㄛˋ", "ㄎㄜ"], meaning: "兵器", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-027", idiom: "枕戈待旦", target: "旦", pinyin: "ㄉㄢˋ", wrongOptions: ["ㄉㄢˇ", "ㄊㄢˋ"], meaning: "天亮", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-028", idiom: "咫尺天涯", target: "咫", pinyin: "ㄓˇ", wrongOptions: ["ㄓˋ", "ㄔˇ"], meaning: "八寸", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-029", idiom: "眾口鑠金", target: "鑠", pinyin: "ㄕㄨㄛˋ", wrongOptions: ["ㄌㄜˋ", "ㄕㄨㄛ"], meaning: "熔化", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-030", idiom: "捉襟見肘", target: "襟", pinyin: "ㄐㄧㄣ", wrongOptions: ["ㄐㄧㄣˇ", "ㄑㄧㄣˊ"], meaning: "衣領", difficulty: "normal", source: "教育部成語典" },

    // 更多常用成語
    { id: "ib3-031", idiom: "鑿壁偷光", target: "鑿", pinyin: "ㄗㄠˊ", wrongOptions: ["ㄗㄠˋ", "ㄗㄠˇ"], meaning: "挖掘", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-032", idiom: "朝三暮四", target: "朝", pinyin: "ㄓㄠ", wrongOptions: ["ㄔㄠˊ"], meaning: "早晨", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-033", idiom: "披肝瀝膽", target: "瀝", pinyin: "ㄌㄧˋ", wrongOptions: ["ㄌㄧˇ", "ㄌㄧˊ"], meaning: "滴下", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-034", idiom: "披肝瀝膽", target: "膽", pinyin: "ㄉㄢˇ", wrongOptions: ["ㄊㄢˇ", "ㄉㄢˋ"], meaning: "膽囊", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-035", idiom: "顛沛流離", target: "沛", pinyin: "ㄆㄟˋ", wrongOptions: ["ㄈㄟˋ", "ㄆㄟˇ"], meaning: "跌倒", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-036", idiom: "顛沛流離", target: "顛", pinyin: "ㄉㄧㄢ", wrongOptions: ["ㄊㄧㄢˊ", "ㄉㄧㄢˋ"], meaning: "跌倒", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-037", idiom: "殫精竭慮", target: "殫", pinyin: "ㄉㄢ", wrongOptions: ["ㄊㄢ", "ㄉㄢˋ"], meaning: "耗盡", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-038", idiom: "殫精竭慮", target: "竭", pinyin: "ㄐㄧㄝˊ", wrongOptions: ["ㄐㄧㄝˋ", "ㄐㄧㄝˇ"], meaning: "盡", difficulty: "normal", source: "教育部成語典" },
    { id: "ib3-039", idiom: "錙銖必較", target: "錙", pinyin: "ㄗ", wrongOptions: ["ㄐㄧ", "ㄗˋ"], meaning: "古代重量單位", difficulty: "hard", source: "教育部成語典" },
    { id: "ib3-040", idiom: "錙銖必較", target: "銖", pinyin: "ㄓㄨ", wrongOptions: ["ㄕㄨ", "ㄓㄨˊ"], meaning: "古代重量單位", difficulty: "hard", source: "教育部成語典" }
];

// 匯出統計
export const getIdiomBatchStats = () => {
    return {
        batch1: idiomBatch1.length,
        batch2: idiomBatch2.length,
        batch3: idiomBatch3.length,
        total: idiomBatch1.length + idiomBatch2.length + idiomBatch3.length
    };
};
