/**
 * 大量擴充題庫 - 更多古文與經典篇章 (150+ 題)
 */

// ============================================
// 古文讀音 - 經史子集 (Part 4)
// ============================================
export const classicalBatch4 = [
    // 禮記
    { id: "cb4-001", text: "禮記", article: "禮記・學記", target: "玉", context: "玉不琢，不成器", pinyin: "ㄩˋ", wrongOptions: ["ㄩˇ"], meaning: "玉石", difficulty: "normal", source: "經典古文" },
    { id: "cb4-002", text: "禮記", article: "禮記・學記", target: "琢", context: "玉不琢", pinyin: "ㄓㄨㄛˊ", wrongOptions: ["ㄓㄨㄛ", "ㄉㄨㄛˊ"], meaning: "雕琢", difficulty: "hard", source: "經典古文" },
    { id: "cb4-003", text: "禮記", article: "禮記・中庸", target: "庸", context: "中庸", pinyin: "ㄩㄥ", wrongOptions: ["ㄩㄥˊ", "ㄖㄨㄥˊ"], meaning: "平常", difficulty: "normal", source: "經典古文" },
    { id: "cb4-004", text: "禮記", article: "禮記・大學", target: "格", context: "格物致知", pinyin: "ㄍㄜˊ", wrongOptions: ["ㄍㄜ", "ㄍㄜˋ"], meaning: "窮究", difficulty: "normal", source: "經典古文" },
    { id: "cb4-005", text: "禮記", article: "禮記・大學", target: "致", context: "格物致知", pinyin: "ㄓˋ", wrongOptions: ["ㄓˇ"], meaning: "達到", difficulty: "normal", source: "經典古文" },

    // 尚書
    { id: "cb4-006", text: "尚書", article: "尚書・堯典", target: "堯", context: "堯典", pinyin: "ㄧㄠˊ", wrongOptions: ["ㄧㄠˋ", "ㄧㄠˇ"], meaning: "帝王名", difficulty: "normal", source: "經典古文" },
    { id: "cb4-007", text: "尚書", article: "尚書・舜典", target: "舜", context: "舜典", pinyin: "ㄕㄨㄣˋ", wrongOptions: ["ㄕㄨㄣˇ", "ㄕㄨㄣ"], meaning: "帝王名", difficulty: "normal", source: "經典古文" },
    { id: "cb4-008", text: "尚書", article: "尚書", target: "禹", context: "大禹治水", pinyin: "ㄩˇ", wrongOptions: ["ㄩˋ", "ㄨˇ"], meaning: "帝王名", difficulty: "normal", source: "經典古文" },

    // 周易
    { id: "cb4-009", text: "周易", article: "周易・乾卦", target: "乾", context: "乾卦", pinyin: "ㄑㄧㄢˊ", wrongOptions: ["ㄍㄢ"], meaning: "天", difficulty: "hard", source: "經典古文" },
    { id: "cb4-010", text: "周易", article: "周易・坤卦", target: "坤", context: "坤卦", pinyin: "ㄎㄨㄣ", wrongOptions: ["ㄎㄨㄣˊ", "ㄍㄨㄣ"], meaning: "地", difficulty: "normal", source: "經典古文" },
    { id: "cb4-011", text: "周易", article: "周易", target: "卦", context: "八卦", pinyin: "ㄍㄨㄚˋ", wrongOptions: ["ㄍㄨㄚˇ", "ㄍㄨㄚ"], meaning: "占卜符號", difficulty: "normal", source: "經典古文" },
    { id: "cb4-012", text: "周易", article: "周易・繫辭", target: "繫", context: "繫辭", pinyin: "ㄒㄧˋ", wrongOptions: ["ㄐㄧˋ", "ㄒㄧ"], meaning: "連結", difficulty: "normal", source: "經典古文" },

    // 春秋
    { id: "cb4-013", text: "春秋", article: "春秋左傳", target: "傳", context: "春秋左傳", pinyin: "ㄓㄨㄢˋ", wrongOptions: ["ㄔㄨㄢˊ"], meaning: "註解", difficulty: "hard", source: "經典古文" },
    { id: "cb4-014", text: "春秋", article: "春秋公羊傳", target: "羊", context: "公羊傳", pinyin: "ㄧㄤˊ", wrongOptions: ["ㄧㄤˋ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb4-015", text: "春秋", article: "春秋穀梁傳", target: "穀", context: "穀梁傳", pinyin: "ㄍㄨˇ", wrongOptions: ["ㄍㄨˋ", "ㄍㄨ"], meaning: "人名", difficulty: "normal", source: "經典古文" },

    // 孝經
    { id: "cb4-016", text: "孝經", article: "孝經", target: "孝", context: "夫孝，德之本也", pinyin: "ㄒㄧㄠˋ", wrongOptions: ["ㄒㄧㄠˇ"], meaning: "孝順", difficulty: "normal", source: "經典古文" },

    // 墨子
    { id: "cb4-017", text: "墨子", article: "墨子・兼愛", target: "墨", context: "墨子", pinyin: "ㄇㄛˋ", wrongOptions: ["ㄇㄛˇ", "ㄇㄟˋ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb4-018", text: "墨子", article: "墨子・兼愛", target: "兼", context: "兼愛", pinyin: "ㄐㄧㄢ", wrongOptions: ["ㄐㄧㄢˋ", "ㄐㄧㄢˊ"], meaning: "同時", difficulty: "normal", source: "經典古文" },
    { id: "cb4-019", text: "墨子", article: "墨子・非攻", target: "攻", context: "非攻", pinyin: "ㄍㄨㄥ", wrongOptions: ["ㄍㄨㄥˋ"], meaning: "攻擊", difficulty: "normal", source: "經典古文" },

    // 韓非子
    { id: "cb4-020", text: "韓非子", article: "韓非子・說難", target: "說", context: "說難", pinyin: "ㄕㄨㄟˋ", wrongOptions: ["ㄕㄨㄛ"], meaning: "遊說", difficulty: "hard", source: "經典古文" },
    { id: "cb4-021", text: "韓非子", article: "韓非子・五蠹", target: "蠹", context: "五蠹", pinyin: "ㄉㄨˋ", wrongOptions: ["ㄓㄨˋ", "ㄉㄨˇ"], meaning: "蛀蟲", difficulty: "hard", source: "經典古文" },
    { id: "cb4-022", text: "韓非子", article: "韓非子・守株待兔", target: "株", context: "守株待兔", pinyin: "ㄓㄨ", wrongOptions: ["ㄓㄨˋ", "ㄗㄨ"], meaning: "樹樁", difficulty: "normal", source: "經典古文" },

    // 荀子
    { id: "cb4-023", text: "荀子", article: "荀子・勸學", target: "勸", context: "勸學", pinyin: "ㄑㄩㄢˋ", wrongOptions: ["ㄐㄩㄢˋ", "ㄑㄩㄢˇ"], meaning: "勉勵", difficulty: "normal", source: "經典古文" },
    { id: "cb4-024", text: "荀子", article: "荀子・勸學", target: "鍥", context: "鍥而不捨", pinyin: "ㄑㄧㄝˋ", wrongOptions: ["ㄎㄜˋ", "ㄑㄧˋ"], meaning: "雕刻", difficulty: "hard", source: "經典古文" },
    { id: "cb4-025", text: "荀子", article: "荀子・勸學", target: "鏤", context: "金石可鏤", pinyin: "ㄌㄡˋ", wrongOptions: ["ㄌㄨˋ", "ㄌㄡˇ"], meaning: "雕刻", difficulty: "hard", source: "經典古文" },

    // 世說新語
    { id: "cb4-026", text: "世說新語", article: "世說新語・言語", target: "語", context: "言語", pinyin: "ㄩˇ", wrongOptions: ["ㄩˋ"], meaning: "說話", difficulty: "normal", source: "經典古文" },
    { id: "cb4-027", text: "世說新語", article: "世說新語・雅量", target: "雅", context: "雅量", pinyin: "ㄧㄚˇ", wrongOptions: ["ㄧㄚˋ", "ㄧㄚ"], meaning: "高雅", difficulty: "normal", source: "經典古文" },
    { id: "cb4-028", text: "世說新語", article: "世說新語・德行", target: "德", context: "德行", pinyin: "ㄉㄜˊ", wrongOptions: ["ㄉㄜˋ"], meaning: "品德", difficulty: "normal", source: "經典古文" },

    // 聊齋誌異
    { id: "cb4-029", text: "聊齋誌異", article: "聊齋誌異", target: "聊", context: "聊齋誌異", pinyin: "ㄌㄧㄠˊ", wrongOptions: ["ㄌㄧㄠˋ", "ㄌㄧㄠˇ"], meaning: "姑且", difficulty: "normal", source: "經典古文" },
    { id: "cb4-030", text: "聊齋誌異", article: "聊齋誌異", target: "齋", context: "聊齋", pinyin: "ㄓㄞ", wrongOptions: ["ㄓㄞˋ", "ㄓㄞˇ"], meaning: "書房", difficulty: "normal", source: "經典古文" },
    { id: "cb4-031", text: "聊齋誌異", article: "聊齋誌異・勞山道士", target: "勞", context: "勞山道士", pinyin: "ㄌㄠˊ", wrongOptions: ["ㄌㄠˋ"], meaning: "山名", difficulty: "normal", source: "經典古文" },

    // 儒林外史
    { id: "cb4-032", text: "儒林外史", article: "儒林外史", target: "儒", context: "儒林外史", pinyin: "ㄖㄨˊ", wrongOptions: ["ㄖㄨˇ", "ㄋㄩˊ"], meaning: "讀書人", difficulty: "normal", source: "經典古文" },
    { id: "cb4-033", text: "儒林外史", article: "儒林外史", target: "林", context: "儒林", pinyin: "ㄌㄧㄣˊ", wrongOptions: ["ㄌㄧㄣˋ"], meaning: "圈子", difficulty: "normal", source: "經典古文" },

    // 紅樓夢
    { id: "cb4-034", text: "紅樓夢", article: "紅樓夢", target: "黛", context: "林黛玉", pinyin: "ㄉㄞˋ", wrongOptions: ["ㄉㄞˇ", "ㄊㄞˋ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb4-035", text: "紅樓夢", article: "紅樓夢", target: "釵", context: "薛寶釵", pinyin: "ㄔㄞ", wrongOptions: ["ㄔㄞˊ", "ㄘㄞ"], meaning: "髮飾", difficulty: "normal", source: "經典古文" },
    { id: "cb4-036", text: "紅樓夢", article: "紅樓夢", target: "璉", context: "賈璉", pinyin: "ㄌㄧㄢˇ", wrongOptions: ["ㄌㄧㄢˊ", "ㄌㄧㄢˋ"], meaning: "人名", difficulty: "hard", source: "經典古文" },

    // 三國演義
    { id: "cb4-037", text: "三國演義", article: "三國演義", target: "操", context: "曹操", pinyin: "ㄘㄠ", wrongOptions: ["ㄘㄠˋ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb4-038", text: "三國演義", article: "三國演義", target: "璋", context: "劉璋", pinyin: "ㄓㄤ", wrongOptions: ["ㄓㄤˊ", "ㄓㄤˋ"], meaning: "玉器", difficulty: "normal", source: "經典古文" },
    { id: "cb4-039", text: "三國演義", article: "三國演義", target: "瑜", context: "周瑜", pinyin: "ㄩˊ", wrongOptions: ["ㄩˋ", "ㄩˇ"], meaning: "美玉", difficulty: "normal", source: "經典古文" },
    { id: "cb4-040", text: "三國演義", article: "三國演義", target: "羽", context: "關羽", pinyin: "ㄩˇ", wrongOptions: ["ㄩˋ"], meaning: "羽毛", difficulty: "normal", source: "經典古文" }
];

// ============================================
// 古文讀音 - 更多篇章 (Part 5)
// ============================================
export const classicalBatch5 = [
    // 水經注
    { id: "cb5-001", text: "水經注", article: "酈道元・水經注", target: "酈", context: "酈道元", pinyin: "ㄌㄧˋ", wrongOptions: ["ㄌㄧˊ", "ㄧˋ"], meaning: "姓氏", difficulty: "hard", source: "經典古文" },
    { id: "cb5-002", text: "水經注", article: "水經注・三峽", target: "峽", context: "三峽", pinyin: "ㄒㄧㄚˊ", wrongOptions: ["ㄐㄧㄚˊ", "ㄒㄧㄚˋ"], meaning: "峽谷", difficulty: "normal", source: "經典古文" },
    { id: "cb5-003", text: "水經注", article: "水經注・三峽", target: "嶂", context: "重巖疊嶂", pinyin: "ㄓㄤˋ", wrongOptions: ["ㄓㄤˇ", "ㄓㄤ"], meaning: "屏障", difficulty: "hard", source: "經典古文" },
    { id: "cb5-004", text: "水經注", article: "水經注・三峽", target: "湍", context: "急湍", pinyin: "ㄊㄨㄢ", wrongOptions: ["ㄊㄨㄢˊ", "ㄓㄨㄢ"], meaning: "水流", difficulty: "hard", source: "經典古文" },

    // 文心雕龍
    { id: "cb5-005", text: "文心雕龍", article: "劉勰・文心雕龍", target: "勰", context: "劉勰", pinyin: "ㄒㄧㄝˊ", wrongOptions: ["ㄒㄧㄝˋ", "ㄐㄧㄝˊ"], meaning: "人名", difficulty: "hard", source: "經典古文" },

    // 顏氏家訓
    { id: "cb5-006", text: "顏氏家訓", article: "顏之推・顏氏家訓", target: "訓", context: "家訓", pinyin: "ㄒㄩㄣˋ", wrongOptions: ["ㄒㄩㄣˇ", "ㄒㄩㄣ"], meaning: "教導", difficulty: "normal", source: "經典古文" },

    // 送東陽馬生序
    { id: "cb5-007", text: "送東陽馬生序", article: "宋濂・送東陽馬生序", target: "濂", context: "宋濂", pinyin: "ㄌㄧㄢˊ", wrongOptions: ["ㄌㄧㄢˋ", "ㄌㄧㄢˇ"], meaning: "人名", difficulty: "hard", source: "經典古文" },
    { id: "cb5-008", text: "送東陽馬生序", article: "宋濂・送東陽馬生序", target: "砚", context: "硯冰堅", pinyin: "ㄧㄢˋ", wrongOptions: ["ㄧㄢˇ", "ㄧㄢˊ"], meaning: "硯台", difficulty: "normal", source: "經典古文" },
    { id: "cb5-009", text: "送東陽馬生序", article: "宋濂・送東陽馬生序", target: "裘", context: "緼袍敝衣", pinyin: "ㄑㄧㄡˊ", wrongOptions: ["ㄐㄧㄡˊ", "ㄑㄧㄡˋ"], meaning: "皮衣", difficulty: "hard", source: "經典古文" },
    { id: "cb5-010", text: "送東陽馬生序", article: "宋濂・送東陽馬生序", target: "緼", context: "緼袍敝衣", pinyin: "ㄩㄣˋ", wrongOptions: ["ㄨㄣˋ", "ㄩㄣˇ"], meaning: "舊棉絮", difficulty: "hard", source: "經典古文" },

    // 核舟記
    { id: "cb5-011", text: "核舟記", article: "魏學洢・核舟記", target: "洢", context: "魏學洢", pinyin: "ㄧ", wrongOptions: ["ㄧˊ", "ㄧˋ"], meaning: "人名", difficulty: "hard", source: "經典古文" },
    { id: "cb5-012", text: "核舟記", article: "核舟記", target: "犀", context: "象犀珠玉", pinyin: "ㄒㄧ", wrongOptions: ["ㄒㄧˊ", "ㄑㄧ"], meaning: "犀牛", difficulty: "normal", source: "經典古文" },
    { id: "cb5-013", text: "核舟記", article: "核舟記", target: "篷", context: "船篷", pinyin: "ㄆㄥˊ", wrongOptions: ["ㄆㄥ", "ㄈㄥˊ"], meaning: "船蓋", difficulty: "normal", source: "經典古文" },

    // 馬說
    { id: "cb5-014", text: "馬說", article: "韓愈・馬說", target: "駑", context: "駑馬", pinyin: "ㄋㄨˊ", wrongOptions: ["ㄋㄨˋ", "ㄇㄚˇ"], meaning: "劣馬", difficulty: "hard", source: "經典古文" },
    { id: "cb5-015", text: "馬說", article: "韓愈・馬說", target: "槽", context: "槽櫪", pinyin: "ㄘㄠˊ", wrongOptions: ["ㄗㄠˊ", "ㄘㄠˋ"], meaning: "馬槽", difficulty: "normal", source: "經典古文" },
    { id: "cb5-016", text: "馬說", article: "韓愈・馬說", target: "櫪", context: "槽櫪", pinyin: "ㄌㄧˋ", wrongOptions: ["ㄌㄧˊ", "ㄌㄧˇ"], meaning: "馬棚", difficulty: "hard", source: "經典古文" },
    { id: "cb5-017", text: "馬說", article: "韓愈・馬說", target: "粟", context: "一石粟", pinyin: "ㄙㄨˋ", wrongOptions: ["ㄙㄨˇ", "ㄌㄧˋ"], meaning: "米", difficulty: "normal", source: "經典古文" },

    // 原道
    { id: "cb5-018", text: "原道", article: "韓愈・原道", target: "原", context: "原道", pinyin: "ㄩㄢˊ", wrongOptions: ["ㄩㄢˋ"], meaning: "探究", difficulty: "normal", source: "經典古文" },

    // 進學解
    { id: "cb5-019", text: "進學解", article: "韓愈・進學解", target: "解", context: "進學解", pinyin: "ㄐㄧㄝˇ", wrongOptions: ["ㄐㄧㄝˋ"], meaning: "文體", difficulty: "normal", source: "經典古文" },
    { id: "cb5-020", text: "進學解", article: "韓愈・進學解", target: "焚", context: "焚膏繼晷", pinyin: "ㄈㄣˊ", wrongOptions: ["ㄈㄣ", "ㄈㄣˋ"], meaning: "燃燒", difficulty: "normal", source: "經典古文" },

    // 小石潭記
    { id: "cb5-021", text: "小石潭記", article: "柳宗元・小石潭記", target: "潭", context: "小石潭", pinyin: "ㄊㄢˊ", wrongOptions: ["ㄊㄢ", "ㄊㄢˋ"], meaning: "深水池", difficulty: "normal", source: "經典古文" },
    { id: "cb5-022", text: "小石潭記", article: "小石潭記", target: "篁", context: "篁竹", pinyin: "ㄏㄨㄤˊ", wrongOptions: ["ㄏㄨㄤˋ", "ㄍㄨㄤˊ"], meaning: "竹子", difficulty: "hard", source: "經典古文" },
    { id: "cb5-023", text: "小石潭記", article: "小石潭記", target: "參", context: "參差披拂", pinyin: "ㄘㄣ", wrongOptions: ["ㄘㄢ", "ㄕㄣ"], meaning: "不齊", difficulty: "hard", source: "經典古文" },
    { id: "cb5-024", text: "小石潭記", article: "小石潭記", target: "翕", context: "翕忽", pinyin: "ㄒㄧˋ", wrongOptions: ["ㄏㄜˊ", "ㄒㄧˊ"], meaning: "聚合", difficulty: "hard", source: "經典古文" },

    // 答謝中書書
    { id: "cb5-025", text: "答謝中書書", article: "陶弘景・答謝中書書", target: "弘", context: "陶弘景", pinyin: "ㄏㄨㄥˊ", wrongOptions: ["ㄏㄨㄥˋ"], meaning: "人名", difficulty: "normal", source: "經典古文" },
    { id: "cb5-026", text: "答謝中書書", article: "答謝中書書", target: "縹", context: "縹緲", pinyin: "ㄆㄧㄠˇ", wrongOptions: ["ㄆㄧㄠˋ", "ㄆㄧㄠ"], meaning: "淡青色", difficulty: "hard", source: "經典古文" },
    { id: "cb5-027", text: "答謝中書書", article: "答謝中書書", target: "緲", context: "縹緲", pinyin: "ㄇㄧㄠˇ", wrongOptions: ["ㄇㄧㄠˋ", "ㄇㄧㄠ"], meaning: "遠而模糊", difficulty: "hard", source: "經典古文" },

    // 記承天寺夜遊
    { id: "cb5-028", text: "記承天寺夜遊", article: "蘇軾・記承天寺夜遊", target: "承", context: "承天寺", pinyin: "ㄔㄥˊ", wrongOptions: ["ㄔㄥ", "ㄕㄥˊ"], meaning: "接受", difficulty: "normal", source: "經典古文" },
    { id: "cb5-029", text: "記承天寺夜遊", article: "記承天寺夜遊", target: "藻", context: "水中藻荇交橫", pinyin: "ㄗㄠˇ", wrongOptions: ["ㄗㄠˋ", "ㄙㄠˇ"], meaning: "水草", difficulty: "normal", source: "經典古文" },
    { id: "cb5-030", text: "記承天寺夜遊", article: "記承天寺夜遊", target: "荇", context: "藻荇", pinyin: "ㄒㄧㄥˋ", wrongOptions: ["ㄏㄤˊ", "ㄒㄧㄥˇ"], meaning: "水草", difficulty: "hard", source: "經典古文" }
];

// 匯出統計
export const getMoreClassicalStats = () => {
    return {
        batch4: classicalBatch4.length,
        batch5: classicalBatch5.length,
        total: classicalBatch4.length + classicalBatch5.length
    };
};
