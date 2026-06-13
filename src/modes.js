/** 模式設定 — 玩法只是引擎的不同參數 */
import { dailySeed } from './core/rng.js';

// icon 為注音符號（以 ZhuyinGlyph SVG 呈現），tint 對應 theme.css 色票
export const MODES = {
  daily: {
    key: 'daily',
    name: '每日挑戰',
    icon: 'ㄖ',
    tint: 'sun',
    blurb: '全世界今天同一份考卷',
    config: () => ({ count: 10, seed: dailySeed(), minDifficulty: 1, maxDifficulty: 5 })
  },
  sprint: {
    key: 'sprint',
    name: '限時衝刺',
    icon: 'ㄔ',
    tint: 'berry',
    blurb: '60 秒，能答幾題是幾題',
    // calibrated: 套用全體錯率校正後的難度（daily/duel 共享 seed 不可用，見 bank.js）
    config: () => ({ count: 60, timeLimit: 60, minDifficulty: 1, maxDifficulty: 4, calibrated: true })
  },
  levels: {
    key: 'levels',
    name: '闖關冒險',
    icon: 'ㄍ',
    tint: 'mint',
    blurb: '一路打到辭典魔王',
    config: null // 由關卡決定
  },
  duel: {
    key: 'duel',
    name: '好友對戰',
    icon: 'ㄉ',
    tint: 'grape',
    blurb: '開房邀朋友，同題組拚輸贏',
    // 單題 5 秒：超時算錯；excludeIds 排除同房已出過的題避免重複
    // difficulty 由開房者選（見 DUEL_DIFFICULTIES），決定本場題目難度下限
    config: (seed, count = 10, excludeIds = [], difficulty = 'random') =>
      ({
        count,
        seed,
        minDifficulty: DUEL_DIFFICULTIES[difficulty]?.min ?? 1,
        maxDifficulty: 5,
        perQuestionSeconds: 5,
        excludeIds
      })
  }
};

/** 好友對戰難度檔位：開房者選定後全房共用，決定該場題目難度下限。 */
export const DUEL_DIFFICULTIES = {
  random: { key: 'random', label: '隨機', blurb: '全難度都可能出', min: 1 },
  medium: { key: 'medium', label: '中等', blurb: '難度 2 以上', min: 2 },
  hard: { key: 'hard', label: '困難', blurb: '難度 3 以上', min: 3 },
  insane: { key: 'insane', label: '超難', blurb: '只出難度 4-5', min: 4 }
};

/** 闖關設定：10 關，第 5、10 關是 BOSS。
 * 難度採陡峭階梯：每關只開 1-2 個難度等級且少重疊，avg 一路 1→5。
 * BOSS 關只抽該關 max 難度的題（min===max），擔保魔王不比前一關軟。
 */
export const LEVELS = [
  { n: 1,  name: '新手村',     min: 1, max: 1, count: 8 },
  { n: 2,  name: '夜市口',     min: 1, max: 2, count: 8, categories: ['modern', 'tricky'] },
  { n: 3,  name: '早自習',     min: 2, max: 2, count: 10 },
  { n: 4,  name: '朝會升旗',   min: 2, max: 3, count: 10, categories: ['polyphone', 'tricky'] },
  {
    n: 5, name: '注音小霸王', min: 3, max: 3, count: 12, boss: true,
    bossName: '注音小霸王', bossHp: 8, hearts: 3, perQuestionSeconds: 12,
    bossIntro: '聽說你在前面四關囂張得很？'
  },
  { n: 6,  name: '圖書館禁區', min: 3, max: 4, count: 10, categories: ['idiom', 'rare'] },
  { n: 7,  name: '考前K書',    min: 4, max: 4, count: 10 },
  { n: 8,  name: '成語深淵',   min: 4, max: 5, count: 12, categories: ['idiom', 'polyphone'] },
  { n: 9,  name: '生僻字煉獄', min: 4, max: 5, count: 12, categories: ['rare', 'tricky'] },
  {
    n: 10, name: '辭典魔王', min: 5, max: 5, count: 15, boss: true,
    bossName: '辭典魔王', bossHp: 10, hearts: 3, perQuestionSeconds: 10,
    bossIntro: '我就是教育部重編國語辭典修訂本！'
  }
];

export function levelConfig(level) {
  return {
    count: level.count,
    minDifficulty: level.min,
    maxDifficulty: level.max,
    categories: level.categories ?? null,
    bossHp: level.boss ? level.bossHp : 0,
    hearts: level.boss ? level.hearts : Infinity,
    perQuestionSeconds: level.boss ? level.perQuestionSeconds : 0,
    calibrated: true,
    // 非 BOSS 關才連對提難：連對達標時把後續未答題換成更難一級的同類題。
    // BOSS 關難度已固定（min===max），且 seed 同步換題的對戰/每日不適用此機制。
    escalate: !level.boss
  };
}
