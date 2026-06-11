/** 挑戰連結 — 無後端的好友對戰核心。
 * 短網址格式（捨棄舊版 base64 整包，縮短 60% 以上）：
 *   進房邀請：?r=<四碼注音>&n=<名字>&l=1&k=<chk>
 *   戰帖（帶分數）：?r=<四碼注音>&s=<分數>&q=<題數>&n=<名字>&k=<chk>
 * k 為簡易 checksum，防手改分數（休閒嚇阻用，非密碼學防護）。
 */
import { hashSeed } from '../core/rng.js';

function checksum({ room, score = 0, name = '', count = 10 }) {
  return (hashSeed(`${room}|${score}|${name}|${count}|ㄅㄆㄇ`) % 46656).toString(36);
}

function baseUrl() {
  const url = new URL(location.href);
  url.search = '';
  url.hash = '';
  return url;
}

/** 進房邀請（大廳同打）。live=1 表示有即時連線 */
export function buildRoomInviteUrl({ room, name, live = 0 }) {
  const url = baseUrl();
  url.searchParams.set('r', room);
  if (name) url.searchParams.set('n', name);
  if (live) url.searchParams.set('l', '1');
  url.searchParams.set('k', checksum({ room, name }));
  return url.toString();
}

/** 戰帖：打完同題組比分。match 為該局批次 id（同房每局換題），對手憑此拿到同一組題 */
export function buildScoreChallengeUrl({ room, score, name, count, match = null }) {
  const url = baseUrl();
  url.searchParams.set('r', room);
  url.searchParams.set('s', String(score));
  url.searchParams.set('q', String(count));
  if (match) url.searchParams.set('m', match);
  if (name) url.searchParams.set('n', name);
  url.searchParams.set('k', checksum({ room, score, name, count }));
  return url.toString();
}

/** 讀取網址中的挑戰。
 * 回傳 { challenge, invalid }；challenge = { room, seed, score?, count, name, live }
 * score 存在 = 戰帖（直接開打比分）；不存在 = 進房邀請（進大廳）。
 */
export function parseChallengeFromUrl() {
  const p = new URLSearchParams(location.search);
  const room = p.get('r');
  if (!room) return { challenge: null, invalid: false };

  const name = p.get('n') ?? '';
  const score = p.has('s') ? Number(p.get('s')) : null;
  const count = p.has('q') ? Number(p.get('q')) : 10;
  const live = p.get('l') === '1';
  const match = p.get('m');

  const expected = score === null
    ? checksum({ room, name })
    : checksum({ room, score, name, count });
  if (p.get('k') !== expected || (score !== null && !Number.isFinite(score))) {
    return { challenge: null, invalid: true };
  }

  return {
    challenge: { room, seed: match ? `room-${room}-${match}` : `room-${room}`, score, count, name, live },
    invalid: false
  };
}

/** 清掉網址上的挑戰參數（接受後避免重整重複觸發） */
export function clearChallengeFromUrl() {
  const url = new URL(location.href);
  for (const key of ['r', 'n', 's', 'q', 'l', 'k', 'c', 'm']) url.searchParams.delete(key);
  history.replaceState(null, '', url.toString());
}
