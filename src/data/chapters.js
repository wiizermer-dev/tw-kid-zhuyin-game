// 台灣環島冒險 - 章節資料
export const chapters = [
  {
    id: 1,
    name: "台北都會",
    region: "north",
    icon: "🏙️",
    color: "#4A90E2",
    description: "從繁華的台北出發，開始你的注音冒險！",
    landmark: "台北101",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: i + 1,
      name: i === 3 ? `第 4 關 👹 小BOSS` : i === 7 ? `第 8 關 👹 大BOSS` : `第 ${i + 1} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "basic",
      unlocked: i === 0,
      isBoss: i === 3 || i === 7, // 第 4 關和第 8 關為 BOSS
    })),
    boss: [
      {
        level: 4,
        name: "捷運音韻守護者",
        description: "掌握基礎注音的小考驗！",
        specialRule: "易混淆字加強"
      },
      {
        level: 8,
        name: "101 登頂挑戰",
        description: "征服台北，成為注音達人！",
        specialRule: "生難字詞挑戰"
      }
    ]
  },
  {
    id: 2,
    name: "桃竹苗山城",
    region: "north",
    icon: "⛰️",
    color: "#6FCF97",
    description: "探索山城美景，學習 ㄣ/ㄥ 的奧秘",
    landmark: "新竹城隍廟",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 9 + i,
      name: i === 3 ? `第 ${9 + i} 關 👹 小BOSS` : i === 7 ? `第 ${9 + i} 關 👹 大BOSS` : `第 ${9 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "en_eng",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 12,
        name: "客家音韻挑戰",
        description: "ㄣ/ㄥ 的中階考驗",
        specialRule: "易錯字加強"
      },
      {
        level: 16,
        name: "山城音韻師",
        description: "分辨 ㄣ/ㄥ 的終極考驗",
        specialRule: "全都是 ㄣ/ㄥ 題型"
      }
    ]
  },
  {
    id: 3,
    name: "台中盆地",
    region: "central",
    icon: "🌆",
    color: "#FFB84D",
    description: "在盆地中央，挑戰 ㄢ/ㄤ 的分辨力",
    landmark: "逢甲夜市",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 17 + i,
      name: i === 3 ? `第 ${17 + i} 關 👹 小BOSS` : i === 7 ? `第 ${17 + i} 關 👹 大BOSS` : `第 ${17 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "an_ang",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 20,
        name: "小吃攤主",
        description: "ㄢ/ㄤ 的美食挑戰",
        specialRule: "答對獲得小吃"
      },
      {
        level: 24,
        name: "夜市美食王",
        description: "征服逢甲的終極考驗！",
        specialRule: "成語與生難字"
      }
    ]
  },
  {
    id: 4,
    name: "南投群山",
    region: "central",
    icon: "🏔️",
    color: "#A78BFA",
    description: "高山上的挑戰，學習平翹舌音",
    landmark: "日月潭",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 25 + i,
      name: i === 3 ? `第 ${25 + i} 關 👹 小BOSS` : i === 7 ? `第 ${25 + i} 關 👹 大BOSS` : `第 ${25 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "zhi_zi",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 28,
        name: "湖畔守衛",
        description: "平翹舌的小挑戰",
        specialRule: "易混淆字加強"
      },
      {
        level: 32,
        name: "日月潭守護者",
        description: "在湖畔挑戰平翹舌極限",
        specialRule: "生難字詞大考驗"
      }
    ]
  },
  {
    id: 5,
    name: "雲嘉平原",
    region: "south",
    icon: "🌾",
    color: "#F4D03F",
    description: "廣闊的平原，綜合前面所學",
    landmark: "嘉義阿里山",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 33 + i,
      name: i === 3 ? `第 ${33 + i} 關 👹 小BOSS` : i === 7 ? `第 ${33 + i} 關 👹 大BOSS` : `第 ${33 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "mixed",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 36,
        name: "平原守衛",
        description: "綜合測試你的實力",
        specialRule: "混合題型"
      },
      {
        level: 40,
        name: "阿里山日出",
        description: "在日出前完成挑戰！",
        specialRule: "成語與生難字混合"
      }
    ]
  },
  {
    id: 6,
    name: "台南古都",
    region: "south",
    icon: "🏛️",
    color: "#E74C3C",
    description: "古色古香的府城，學習成語諺語",
    landmark: "赤崁樓",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 41 + i,
      name: i === 3 ? `第 ${41 + i} 關 👹 小BOSS` : i === 7 ? `第 ${41 + i} 關 👹 大BOSS` : `第 ${41 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "hard" : i === 3 ? "expert" : i < 7 ? "expert" : "master",
      focusType: "idioms",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 44,
        name: "府城秀才",
        description: "成語的小考驗",
        specialRule: "常用成語精選"
      },
      {
        level: 48,
        name: "古都文學士",
        description: "挑戰成語大師之路",
        specialRule: "全都是成語題"
      }
    ]
  },
  {
    id: 7,
    name: "高雄港都",
    region: "south",
    icon: "⚓",
    color: "#3498DB",
    description: "繁忙的港口，學習時事新詞",
    landmark: "愛河",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 49 + i,
      name: i === 3 ? `第 ${49 + i} 關 👹 小BOSS` : i === 7 ? `第 ${49 + i} 關 👹 大BOSS` : `第 ${49 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "hard" : i === 3 ? "expert" : i < 7 ? "expert" : "master",
      focusType: "modern",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 52,
        name: "愛河詩人",
        description: "現代詞彙挑戰",
        specialRule: "時事與生活用語"
      },
      {
        level: 56,
        name: "港都新聞王",
        description: "掌握最新流行用語",
        specialRule: "全都是時事詞彙"
      }
    ]
  },
  {
    id: 8,
    name: "屏東恆春",
    region: "south",
    icon: "🏖️",
    color: "#1ABC9C",
    description: "南國風情，挑戰生難字詞",
    landmark: "墾丁海灘",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 57 + i,
      name: i === 3 ? `第 ${57 + i} 關 👹 小BOSS` : i === 7 ? `第 ${57 + i} 關 👹 大BOSS` : `第 ${57 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "hard" : i === 3 ? "expert" : i < 7 ? "expert" : "master",
      focusType: "rare",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 60,
        name: "海角守衛",
        description: "生難字詞小考驗",
        specialRule: "罕見字詞挑戰"
      },
      {
        level: 64,
        name: "南灣衝浪王",
        description: "乘風破浪，挑戰罕見詞彙",
        specialRule: "無提示模式"
      }
    ]
  },
  {
    id: 9,
    name: "花東海岸",
    region: "east",
    icon: "🌊",
    color: "#16A085",
    description: "太平洋畔，綜合所有挑戰",
    landmark: "太魯閣峽谷",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 65 + i,
      name: i === 3 ? `第 ${65 + i} 關 👹 小BOSS` : i === 7 ? `第 ${65 + i} 關 👹 大BOSS` : `第 ${65 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "expert" : i === 3 ? "master" : i < 7 ? "master" : "master",
      focusType: "comprehensive",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 68,
        name: "海岸巡守者",
        description: "綜合挑戰你的實力",
        specialRule: "混合高難度題型"
      },
      {
        level: 72,
        name: "峽谷回音王",
        description: "回音測試你的注音功力",
        specialRule: "答錯重來"
      }
    ]
  },
  {
    id: 10,
    name: "離島挑戰",
    region: "islands",
    icon: "🏝️",
    color: "#9B59B6",
    description: "最終試煉，征服所有注音難題",
    landmark: "綠島、蘭嶼、澎湖",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 73 + i,
      name: i === 3 ? `第 ${73 + i} 關 👹 小BOSS` : i === 7 ? `第 ${73 + i} 關 ⚡ 終極BOSS` : `第 ${73 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "expert" : i === 3 ? "master" : i < 7 ? "master" : "master",
      focusType: "ultimate",
      unlocked: false,
      isBoss: i === 3 || i === 7,
    })),
    boss: [
      {
        level: 76,
        name: "離島守護神",
        description: "最後關卡前的試煉",
        specialRule: "全難度混合"
      },
      {
        level: 80,
        name: "注音大師",
        description: "終極BOSS，證明你的實力！",
        specialRule: "隨機綜合題型，無失誤完成"
      }
    ]
  }
];

// 難度定義
export const difficulties = {
  easy: {
    name: "簡單",
    color: "#6FCF97",
    icon: "🟢",
    description: "適合初學者",
    timePerQuestion: 15,
    hintsAvailable: 3,
  },
  medium: {
    name: "普通",
    color: "#FFB84D",
    icon: "🟡",
    description: "有一定挑戰性",
    timePerQuestion: 12,
    hintsAvailable: 2,
  },
  hard: {
    name: "困難",
    color: "#E74C3C",
    icon: "🔴",
    description: "需要熟練掌握",
    timePerQuestion: 10,
    hintsAvailable: 1,
  },
  expert: {
    name: "專家",
    color: "#9B59B6",
    icon: "🟣",
    description: "高手挑戰",
    timePerQuestion: 8,
    hintsAvailable: 0,
  },
  master: {
    name: "大師",
    color: "#34495E",
    icon: "⚫",
    description: "注音大師級別",
    timePerQuestion: 6,
    hintsAvailable: 0,
  }
};

// 題型焦點
export const focusTypes = {
  basic: {
    name: "基礎聲韻",
    description: "學習基本的聲母和韻母",
    wordBanks: ["enWords", "engWords"]
  },
  en_eng: {
    name: "ㄣ/ㄥ 辨音",
    description: "分辨 ㄣ 和 ㄥ 的差異",
    wordBanks: ["enWords", "engWords"]
  },
  an_ang: {
    name: "ㄢ/ㄤ 辨音",
    description: "分辨 ㄢ 和 ㄤ 的差異",
    wordBanks: ["hardAnAngWords"]
  },
  zhi_zi: {
    name: "平翹舌音",
    description: "分辨 ㄓㄔㄕ 和 ㄗㄘㄙ",
    wordBanks: ["hardZhiChiWords", "hardZiZhiWords"]
  },
  mixed: {
    name: "綜合練習",
    description: "混合各種易混淆音",
    wordBanks: ["enWords", "engWords", "hardAnAngWords", "hardZhiChiWords"]
  },
  idioms: {
    name: "成語諺語",
    description: "學習成語中的注音",
    wordBanks: ["hardEnWords", "hardEngWords"]
  },
  modern: {
    name: "時事詞彙",
    description: "掌握現代流行用語",
    wordBanks: ["hardEnWords", "hardEngWords"]
  },
  rare: {
    name: "生難字詞",
    description: "挑戰罕見詞彙",
    wordBanks: ["hardRiLiWords", "hardFuHuWords", "hardNaLiWords"]
  },
  comprehensive: {
    name: "全面挑戰",
    description: "綜合所有類型",
    wordBanks: ["hardEnWords", "hardEngWords", "hardAnAngWords", "hardZhiChiWords", "hardRiLiWords"]
  },
  ultimate: {
    name: "終極試煉",
    description: "最高難度綜合測試",
    wordBanks: ["hardEnWords", "hardEngWords", "hardAnAngWords", "hardZhiChiWords", "hardRiLiWords", "hardFuHuWords", "hardNaLiWords", "hardZiZhiWords", "hardWoOWords", "hardEEiWords"]
  }
};

// 獲取章節資訊
export function getChapterById(chapterId) {
  return chapters.find(c => c.id === chapterId);
}

// 獲取關卡資訊
export function getLevelInfo(levelNumber) {
  for (const chapter of chapters) {
    const level = chapter.levels.find(l => l.level === levelNumber);
    if (level) {
      return {
        ...level,
        chapter: chapter
      };
    }
  }
  return null;
}

// 檢查關卡是否解鎖
export function isLevelUnlocked(levelNumber, completedLevels = []) {
  if (levelNumber === 1) return true; // 第一關永遠解鎖
  return completedLevels.includes(levelNumber - 1); // 完成前一關才能解鎖
}

// 計算章節進度
export function getChapterProgress(chapterId, completedLevels = []) {
  const chapter = getChapterById(chapterId);
  if (!chapter) return 0;
  
  const chapterLevelNumbers = chapter.levels.map(l => l.level);
  const completed = chapterLevelNumbers.filter(l => completedLevels.includes(l)).length;
  
  return Math.round((completed / chapter.levels.length) * 100);
}

// 獲取總進度
export function getTotalProgress(completedLevels = []) {
  const totalLevels = chapters.reduce((sum, c) => sum + c.levels.length, 0);
  return Math.round((completedLevels.length / totalLevels) * 100);
}

// 獲取下一個可玩關卡
export function getNextPlayableLevel(completedLevels = []) {
  for (let level = 1; level <= 100; level++) {
    if (!completedLevels.includes(level) && isLevelUnlocked(level, completedLevels)) {
      return level;
    }
  }
  return null; // 全部完成
}
