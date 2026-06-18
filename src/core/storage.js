/** localStorage 持久化（全部 key 集中管理） */

const PREFIX = 'bpmf_';

function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function set(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch { /* 隱私模式下靜默失敗 */ }
}

export const storage = {
  get, set,

  getPlayerName: () => get('player_name', ''),
  setPlayerName: (name) => set('player_name', name),

  /** 闖關進度：{ [level]: stars } */
  getLevelStars: () => get('level_stars', {}),
  setLevelStars: (stars) => set('level_stars', stars),

  /** 闖關各關最佳分：{ [level]: score }（排行榜送加總當戰役累積分） */
  getLevelBest: () => get('level_best', {}),
  setLevelBest: (best) => set('level_best', best),

  /** 端午 event 進度：clearedLevels 為已過關關號（去重）、唯一真相；
   *  zongziTotal/levelsCleared/rescued 全由它推導（純函式 advanceDuanwuProgress 在 T3）。 */
  getDuanwuProgress: () => get('duanwu_progress', { clearedLevels: [], rescued: false }),
  setDuanwuProgress: (p) => set('duanwu_progress', p),

  /** 闖關跨關卡連擊：上一關結束時的連擊，下一關接著燒；答錯自然歸零 */
  getLevelCombo: () => get('level_combo', 0),
  setLevelCombo: (n) => set('level_combo', n),

  /** 闖關戰役歷史最高連擊 */
  getLevelMaxCombo: () => get('level_max_combo', 0),
  setLevelMaxCombo: (n) => set('level_max_combo', n),

  /** 衝刺最高分 */
  getSprintBest: () => get('sprint_best', 0),
  setSprintBest: (s) => set('sprint_best', s),

  /** 每日挑戰：{ [dateSeed]: { score, results, correct } }；streak 另計 */
  getDailyRecord: (seed) => get(`daily_${seed}`, null),
  setDailyRecord: (seed, rec) => set(`daily_${seed}`, rec),
  getDailyStreak: () => get('daily_streak', { count: 0, last: '' }),
  setDailyStreak: (s) => set('daily_streak', s),

  /** 錯題本：[{id, missCount, lastMiss}] */
  getMistakes: () => get('mistakes', {}),
  addMistake: (id) => {
    const m = get('mistakes', {});
    m[id] = (m[id] || 0) + 1;
    set('mistakes', m);
  },
  clearMistake: (id) => {
    const m = get('mistakes', {});
    delete m[id];
    set('mistakes', m);
  },

  /** 近期出過的題目 id（rolling 60 筆），非種子模式選題時排除 */
  getRecentIds: () => get('recent_ids', []),
  addRecentIds: (ids) => {
    const merged = [...get('recent_ids', []), ...ids];
    set('recent_ids', merged.slice(-60));
  },

  /** 審題紀錄：{ [qid]: { verdict, at, synced } }；synced=false 表示雲端還沒送成功 */
  getReviews: () => get('reviews', {}),
  setReviews: (r) => set('reviews', r),

  /** 常駐房：朋友榜 = 房內榜。記住最近進過的房號（rolling 5），免好友系統 */
  getSavedRooms: () => get('saved_rooms', []),
  addSavedRoom: (room) => {
    if (!room) return;
    const rooms = get('saved_rooms', []).filter((r) => r !== room);
    rooms.unshift(room);
    set('saved_rooms', rooms.slice(0, 5));
  },

  /** 本地排行榜：[{name, score, mode, date}] 取前 50 */
  getLocalBoard: () => get('local_board', []),
  addLocalScore: (entry) => {
    const board = get('local_board', []);
    board.push({ ...entry, date: new Date().toISOString() });
    board.sort((a, b) => b.score - a.score);
    set('local_board', board.slice(0, 50));
  }
};
