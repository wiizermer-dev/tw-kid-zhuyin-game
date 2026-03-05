// 台灣環島冒險 - 章節資料
export const chapters = [
  {
    id: 1,
    name: "台北都會",
    region: "north",
    icon: "🏙️",
    color: "#4A90E2",
    description: "從繁華的台北出發，開始你的注音冒險！",
    landmark: "台北 101",
    scenario: "你收到了一封來自台北 101 的神祕邀請函，據說整座城市的注音標示都被搗蛋鬼弄亂了！",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: i + 1,
      name: i === 3 ? `第 4 關 👹 小BOSS` : i === 7 ? `第 8 關 👹 大BOSS` : `第 ${i + 1} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "basic",
      unlocked: i === 0,
      isBoss: i === 3 || i === 7,
      scenario: i === 0 ? "先從捷運站的指標開始修復吧！" : i === 3 ? "糟糕！捷運守護者被洗腦了，快用正確的注音喚醒他！" : i === 7 ? "登上 101 頂樓，打敗搗蛋鬼首領！" : "繼續修復城市裡的文字標示。"
    })),
    boss: [
      {
        level: 4,
        name: "捷運音韻守護者",
        hp: 5,
        mechanics: ["shake", "timeout"],
        description: "掌握基礎注音的小考驗！",
        specialRule: "易混淆字加強"
      },
      {
        level: 8,
        name: "101 搗蛋鬼首領",
        hp: 10,
        mechanics: ["fog", "shuffle"],
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
    scenario: "來到桃竹苗山城，這裡的客家山歌被魔霧壟罩，歌詞中的 ㄣ/ㄥ 變得模糊不清！",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 9 + i,
      name: i === 3 ? `第 ${9 + i} 關 👹 小BOSS` : i === 7 ? `第 ${9 + i} 關 👹 大BOSS` : `第 ${9 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "en_eng",
      unlocked: false,
      isBoss: i === 3 || i === 7,
      scenario: i === 0 ? "聽聽茶園裡的採茶歌，找出錯誤的注音。" : i === 3 ? "城隍廟前的石獅子不讓你過去，必須答對它的難題！" : i === 7 ? "驅散山城魔霧，還原優美的山歌。"
    })),
    boss: [
      {
        level: 12,
        name: "石獅子守衛",
        hp: 6,
        mechanics: ["timeout"],
        description: "ㄣ/ㄥ 的中階考驗",
        specialRule: "易錯字加強"
      },
      {
        level: 16,
        name: "魔霧幻影",
        hp: 12,
        mechanics: ["fog"],
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
    scenario: "台中夜市的美食招牌都被 ㄢ/ㄤ 怪獸吃掉了！如果不及時修補，遊客就找不到好吃的了。",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 17 + i,
      name: i === 3 ? `第 ${17 + i} 關 👹 小BOSS` : i === 7 ? `第 ${17 + i} 關 👹 大BOSS` : `第 ${17 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "an_ang",
      unlocked: false,
      isBoss: i === 3 || i === 7,
      scenario: i === 3 ? "夜市攤主被 ㄢ/ㄤ 怪獸附身了，快打敗它！" : "修復夜市的美食招牌。"
    })),
    boss: [
      {
        level: 20,
        name: "ㄢ/ㄤ 貪吃鬼",
        hp: 8,
        mechanics: ["shuffle"],
        description: "ㄢ/ㄤ 的美食挑戰",
        specialRule: "答對獲得小吃"
      },
      {
        level: 24,
        name: "夜市美食王",
        hp: 15,
        mechanics: ["timeout", "fog"],
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
    scenario: "南投的高山中傳說有位「平翹舌老人」，他掌管著山間的氣候，但現在他的神力失控了！",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 25 + i,
      name: i === 3 ? `第 ${25 + i} 關 👹 小BOSS` : i === 7 ? `第 ${25 + i} 關 👹 大BOSS` : `第 ${25 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "zhi_zi",
      unlocked: false,
      isBoss: i === 3 || i === 7,
      scenario: i === 3 ? "湖畔的影子怪獸出現了！" : "攀登高山，尋找平翹舌老人。"
    })),
    boss: [
      {
        level: 28,
        name: "湖畔影子怪",
        hp: 10,
        mechanics: ["shake"],
        description: "平翹舌的小挑戰",
        specialRule: "易混淆字加強"
      },
      {
        level: 32,
        name: "平翹舌長老",
        hp: 18,
        mechanics: ["timeout", "shuffle"],
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
    scenario: "嘉南平原的稻穀不再成熟，因為支撐大地規律的「音韻密碼」遺失了！",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 33 + i,
      name: i === 3 ? `第 ${33 + i} 關 👹 小BOSS` : i === 7 ? `第 ${33 + i} 關 👹 大BOSS` : `第 ${33 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "medium" : i === 3 ? "hard" : i < 7 ? "hard" : "expert",
      focusType: "mixed",
      unlocked: false,
      isBoss: i === 3 || i === 7,
      scenario: i === 7 ? "登上阿里山頂，奪回音韻密碼！" : "在平原中尋找失落的密碼碎片。"
    })),
    boss: [
      {
        level: 36,
        name: "平原稻草人",
        hp: 12,
        mechanics: ["fog"],
        description: "綜合測試你的實力",
        specialRule: "混合題型"
      },
      {
        level: 40,
        name: "阿里山守護靈",
        hp: 20,
        mechanics: ["timeout", "shake", "fog"],
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
    scenario: "台南古都的石碑文字竟然在跳舞！這些古老的成語如果亂掉，歷史將會被改寫。",
    levels: Array.from({ length: 8 }, (_, i) => ({
      level: 41 + i,
      name: i === 3 ? `第 ${41 + i} 關 👹 小BOSS` : i === 7 ? `第 ${41 + i} 關 👹 大BOSS` : `第 ${41 + i} 關`,
      questionsCount: 10,
      difficulty: i < 3 ? "hard" : i === 3 ? "expert" : i < 7 ? "expert" : "master",
      focusType: "idioms",
      unlocked: false,
      isBoss: i === 3 || i === 7,
      scenario: i === 3 ? "赤崁樓的贔屭石碑動起來了！" : "修復石碑上的成語。"
    })),
    boss: [
      {
        level: 44,
        name: "贔屭石碑神",
        hp: 15,
        mechanics: ["shake", "timeout"],
        description: "成語的小考驗",
        specialRule: "常用成語精選"
      },
      {
        level: 48,
        name: "古都文曲星",
        hp: 25,
        mechanics: ["fog", "shuffle", "timeout"],
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
    scenario: "高雄港的信號塔故障了，導航員無法理解時事新語。你必須幫忙導航，避免船隻碰撞！",
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
        name: "信號塔管理員",
        hp: 18,
        mechanics: ["timeout"],
        description: "現代詞彙挑戰",
        specialRule: "時事與生活用語"
      },
      {
        level: 56,
        name: "港都電台怪客",
        hp: 28,
        mechanics: ["shuffle", "fog"],
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
    scenario: "南國海灘上漂流來了許多神祕的瓶中信，上面記載著被遺忘的古老生難字詞。",
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
        name: "海邊漂流者",
        hp: 20,
        mechanics: ["shake"],
        description: "生難字詞小考驗",
        specialRule: "罕見字詞挑戰"
      },
      {
        level: 64,
        name: "恆春浪潮王",
        hp: 30,
        mechanics: ["timeout", "fog", "shake"],
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
    scenario: "花東峽谷傳來震耳欲聾的回音，那是所有注音難題的集合體。你準備好接受最終試煉了嗎？",
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
        name: "峽谷迴聲靈",
        hp: 25,
        mechanics: ["fog", "shuffle"],
        description: "綜合挑戰你的實力",
        specialRule: "混合高難度題型"
      },
      {
        level: 72,
        name: "太魯閣大山神",
        hp: 35,
        mechanics: ["timeout", "shake", "fog", "shuffle"],
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
    scenario: "在太平洋的離島上，隱藏著最終的注音大師。只有真正的勇者能完成這場環島大冒險！",
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
        name: "海神護法",
        hp: 30,
        mechanics: ["timeout", "shake", "fog", "shuffle"],
        description: "最後關卡前的試煉",
        specialRule: "全難度混合"
      },
      {
        level: 80,
        name: "注音大魔王",
        hp: 50,
        mechanics: ["timeout", "shake", "fog", "shuffle", "reverse"],
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
      // 獲取魔王資訊
      const bossInfo = chapter.boss ? chapter.boss.find(b => b.level === levelNumber) : null;
      return {
        ...level,
        chapter: chapter,
        bossInfo: bossInfo
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
