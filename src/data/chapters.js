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
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: i + 1,
      name: `第 ${i + 1} 關`,
      questionsCount: 10,
      difficulty: "easy",
      focusType: "basic", // 基礎聲韻母
      unlocked: i === 0, // 第一關預設解鎖
    })),
    boss: {
      level: 10,
      name: "101 登頂挑戰",
      description: "快速答題，挑戰最高層！",
      specialRule: "限時模式"
    }
  },
  {
    id: 2,
    name: "桃竹苗山城",
    region: "north",
    icon: "⛰️",
    color: "#6FCF97",
    description: "探索山城美景，學習 ㄣ/ㄥ 的奧秘",
    landmark: "新竹城隍廟",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 11 + i,
      name: `第 ${11 + i} 關`,
      questionsCount: 10,
      difficulty: i < 5 ? "easy" : "medium",
      focusType: "en_eng", // ㄣ/ㄥ 混淆
      unlocked: false,
    })),
    boss: {
      level: 20,
      name: "山城音韻師",
      description: "分辨 ㄣ/ㄥ 的終極考驗",
      specialRule: "全都是 ㄣ/ㄥ 題型"
    }
  },
  {
    id: 3,
    name: "台中盆地",
    region: "central",
    icon: "🌆",
    color: "#FFB84D",
    description: "在盆地中央，挑戰 ㄢ/ㄤ 的分辨力",
    landmark: "逢甲夜市",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 21 + i,
      name: `第 ${21 + i} 關`,
      questionsCount: 10,
      difficulty: "medium",
      focusType: "an_ang", // ㄢ/ㄤ 混淆
      unlocked: false,
    })),
    boss: {
      level: 30,
      name: "夜市美食王",
      description: "答對才能品嚐美食！",
      specialRule: "連續答對獲得小吃"
    }
  },
  {
    id: 4,
    name: "南投群山",
    region: "central",
    icon: "🏔️",
    color: "#A78BFA",
    description: "高山上的挑戰，學習平翹舌音",
    landmark: "日月潭",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 31 + i,
      name: `第 ${31 + i} 關`,
      questionsCount: 10,
      difficulty: "medium",
      focusType: "zhi_zi", // ㄓㄔㄕ/ㄗㄘㄙ 混淆
      unlocked: false,
    })),
    boss: {
      level: 40,
      name: "日月潭守護者",
      description: "在湖畔挑戰平翹舌極限",
      specialRule: "答錯會扣星星"
    }
  },
  {
    id: 5,
    name: "雲嘉平原",
    region: "south",
    icon: "🌾",
    color: "#F4D03F",
    description: "廣闊的平原，綜合前面所學",
    landmark: "嘉義阿里山",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 41 + i,
      name: `第 ${41 + i} 關`,
      questionsCount: 10,
      difficulty: i < 5 ? "medium" : "hard",
      focusType: "mixed", // 綜合混合
      unlocked: false,
    })),
    boss: {
      level: 50,
      name: "阿里山日出",
      description: "在日出前完成挑戰！",
      specialRule: "限時 5 分鐘"
    }
  },
  {
    id: 6,
    name: "台南古都",
    region: "south",
    icon: "🏛️",
    color: "#E74C3C",
    description: "古色古香的府城，學習成語諺語",
    landmark: "赤崁樓",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 51 + i,
      name: `第 ${51 + i} 關`,
      questionsCount: 10,
      difficulty: "hard",
      focusType: "idioms", // 成語與諺語
      unlocked: false,
    })),
    boss: {
      level: 60,
      name: "古都文學士",
      description: "挑戰成語大師之路",
      specialRule: "全都是成語題"
    }
  },
  {
    id: 7,
    name: "高雄港都",
    region: "south",
    icon: "⚓",
    color: "#3498DB",
    description: "繁忙的港口，學習時事新詞",
    landmark: "愛河",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 61 + i,
      name: `第 ${61 + i} 關`,
      questionsCount: 10,
      difficulty: "hard",
      focusType: "modern", // 時事詞彙
      unlocked: false,
    })),
    boss: {
      level: 70,
      name: "港都新聞王",
      description: "掌握最新流行用語",
      specialRule: "全都是時事詞彙"
    }
  },
  {
    id: 8,
    name: "屏東恆春",
    region: "south",
    icon: "🏖️",
    color: "#1ABC9C",
    description: "南國風情，挑戰生難字詞",
    landmark: "墾丁海灘",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 71 + i,
      name: `第 ${71 + i} 關`,
      questionsCount: 10,
      difficulty: "expert",
      focusType: "rare", // 生難字詞
      unlocked: false,
    })),
    boss: {
      level: 80,
      name: "南灣衝浪王",
      description: "乘風破浪，挑戰罕見詞彙",
      specialRule: "無提示模式"
    }
  },
  {
    id: 9,
    name: "花東海岸",
    region: "east",
    icon: "🌊",
    color: "#16A085",
    description: "太平洋畔，綜合所有挑戰",
    landmark: "太魯閣峽谷",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 81 + i,
      name: `第 ${81 + i} 關`,
      questionsCount: 10,
      difficulty: "expert",
      focusType: "comprehensive", // 綜合挑戰
      unlocked: false,
    })),
    boss: {
      level: 90,
      name: "峽谷回音王",
      description: "回音測試你的注音功力",
      specialRule: "聽力題為主"
    }
  },
  {
    id: 10,
    name: "離島之旅",
    region: "islands",
    icon: "🏝️",
    color: "#9B59B6",
    description: "前往離島，完成最終試煉",
    landmark: "澎湖跨海大橋",
    levels: Array.from({ length: 10 }, (_, i) => ({
      level: 91 + i,
      name: `第 ${91 + i} 關`,
      questionsCount: 15,
      difficulty: "master",
      focusType: "ultimate", // 終極試煉
      unlocked: false,
    })),
    boss: {
      level: 100,
      name: "環島大師戰",
      description: "證明你是真正的注音大師！",
      specialRule: "所有題型混合，無提示"
    }
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
