/** 計分、連擊與稱號 */

export const BASE_SCORE = 100;

/** 連擊加成：每題基礎 100，連擊每 +1 加 10%，上限 +100% */
export function scoreFor(combo, difficulty = 1, speedRatio = 0) {
  const comboBonus = Math.min(combo, 10) * 0.1;
  const difficultyBonus = (difficulty - 1) * 0.15;
  const speedBonus = Math.max(0, Math.min(speedRatio, 1)) * 0.5; // 剩餘時間比例最高 +50%
  return Math.round(BASE_SCORE * (1 + comboBonus + difficultyBonus + speedBonus));
}

/** 依正確率與分數給稱號（分享卡的靈魂） */
export const TITLES = [
  { min: 1.0,  title: '注音之神', emoji: '👑', quip: '教育部辭典本人' },
  { min: 0.9,  title: '國文老師的驕傲', emoji: '🌟', quip: '差一題就封神' },
  { min: 0.75, title: '注音資優生', emoji: '✨', quip: '穩穩的很可以' },
  { min: 0.6,  title: 'ㄅㄆㄇ潛力股', emoji: '📈', quip: '再練一下就起飛' },
  { min: 0.4,  title: '注音夜市仔', emoji: '🍢', quip: '會唸的都是美食' },
  { min: 0.2,  title: 'ㄅㄆㄇ難民', emoji: '🫠', quip: '注音表需要重修' },
  { min: 0,    title: '菜，就多練', emoji: '🥬', quip: '沒關係，蝸牛也是ㄍㄨㄚ牛' }
];

export function titleFor(correct, total) {
  const rate = total > 0 ? correct / total : 0;
  return TITLES.find(t => rate >= t.min) ?? TITLES[TITLES.length - 1];
}

/** 闖關星等：3 星全對、2 星 ≥80%、1 星 ≥60% */
export function starsFor(correct, total) {
  if (total === 0) return 0;
  const rate = correct / total;
  if (rate >= 1) return 3;
  if (rate >= 0.8) return 2;
  if (rate >= 0.6) return 1;
  return 0;
}

/** 每日挑戰 emoji 方格（Wordle 式分享） */
export function emojiGrid(results) {
  return results.map(r => (r ? '🟩' : '🟥')).join('');
}
