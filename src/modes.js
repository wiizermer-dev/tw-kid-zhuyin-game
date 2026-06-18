/** 模式設定 — 玩法只是引擎的不同參數 */
import { dailySeed, hashSeed } from './core/rng.js';
import { dailyExcludeIds } from './core/bank.js';

/** 每日挑戰難度檔位：用當日 seed 決定性挑一檔，全球同日同檔。
 * 最低檔 min:2（排掉最簡單的難度 1），呼應「每日是全民考卷但不該太水」。 */
export const DAILY_DIFFICULTIES = {
  medium: { key: 'medium', label: '中等', min: 2 },
  hard: { key: 'hard', label: '困難', min: 3 },
  insane: { key: 'insane', label: '超難', min: 4 }
};

/** 依當日 seed 決定性挑出今天的難度檔位（全球一致）。 */
export function dailyDifficulty(date = new Date()) {
  const keys = Object.keys(DAILY_DIFFICULTIES);
  const idx = hashSeed(`difficulty-${dailySeed(date)}`) % keys.length;
  return DAILY_DIFFICULTIES[keys[idx]];
}

// 每日挑戰排除近 7 天出過的題（決定性，全球一致，不破壞同題）
const DAILY_EXCLUDE_DAYS = 7;
const DAILY_COUNT = 15;

// icon 為注音符號（以 ZhuyinGlyph SVG 呈現），tint 對應 theme.css 色票
export const MODES = {
  daily: {
    key: 'daily',
    name: '每日挑戰',
    icon: 'ㄖ',
    tint: 'sun',
    blurb: '全世界今天同一份考卷',
    // 難度由當日 seed 決定性挑檔；excludeIds 由近 7 天每日題決定性重現（皆全球一致）。
    config: (date = new Date()) => ({
      count: DAILY_COUNT,
      seed: dailySeed(date),
      minDifficulty: dailyDifficulty(date).min,
      maxDifficulty: 5,
      excludeIds: dailyExcludeIds(date, DAILY_EXCLUDE_DAYS, DAILY_COUNT, d => dailyDifficulty(d).min)
    })
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

/** 端午王 event 闖關：5 關各 10 題，獨立於正規 LEVELS（不混用）。
 * 每關 chapter 鎖主題（光靠難度分不開主題，見 spec §2.1 Eng D6）；
 * 全程知識題（kind:'fact'），無 BOSS（第 5 關靠最高驚奇度+主題包裝，非血條，Eng D7）。 */
export const DUANWU_LEVELS = [
  // game：該關答完後玩的 mini-game（registry key → App.svelte MINIGAMES map）
  { n: 1, name: '汨羅江畔', chapter: 'quyuan', min: 1, max: 3, count: 10, game: 'dragonboat' },
  { n: 2, name: '划龍舟',   chapter: 'boat',   min: 2, max: 3, count: 10, game: 'paddle' },
  { n: 3, name: '包粽子',   chapter: 'zongzi', min: 2, max: 3, count: 10, game: 'wrap' },
  { n: 4, name: '詩詞關',   chapter: 'poem',   min: 3, max: 4, count: 10, game: 'poem' },
  { n: 5, name: '端午王',   chapter: 'king',   min: 4, max: 5, count: 10, game: 'piranha' }
];

/** 端午關選題 config：鎖 duanwu 類別 + chapter 主題；
 * escalate:false（連對提難不保證同 chapter，會冒出跨主題題）；
 * calibrated:false（event-only 樣本少，雲端錯率校正無意義且可能誤動難度，Codex #5）。 */
export function duanwuLevelConfig(level) {
  return {
    count: level.count,
    minDifficulty: level.min,
    maxDifficulty: level.max,
    categories: ['duanwu'],
    chapter: level.chapter,
    hearts: Infinity,
    perQuestionSeconds: 0,
    bossHp: 0,
    calibrated: false,
    escalate: false
  };
}
