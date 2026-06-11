/** 挑戰連結 — 無後端的好友對戰核心。
 * URL: ?c=<base64url(JSON)>，內容 { v, seed, mode, score, name, count, k }
 * k 為簡易 checksum，防手改分數（非密碼學防護，休閒嚇阻用）
 */
import { hashSeed } from '../core/rng.js';

function checksum({ seed, score, name, count }) {
  return hashSeed(`${seed}|${score}|${name}|${count}|ㄅㄆㄇ`) % 46656; // 36^3
}

function b64uEncode(obj) {
  const json = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64uDecode(str) {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(escape(atob(b64)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

/** 產生挑戰連結。
 * 非同步戰帖：帶 score（朋友打同題組比分）。
 * 進房邀請：帶 room（注音房號）與 live（雲端有設定時 1）。
 */
export function buildChallengeUrl({ seed, mode, score, name, count, room = null, live = 0 }) {
  const payload = { v: 1, seed, mode, score, name, count, k: checksum({ seed, score, name, count }) };
  if (room) { payload.room = room; payload.live = live; }
  const url = new URL(location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('c', b64uEncode(payload));
  return url.toString();
}

/** 讀取目前網址中的挑戰。
 * 回傳 { challenge, invalid }：沒有參數時兩者皆 falsy；
 * 參數存在但解不開/被竄改時 invalid = true（讓 UI 能提示「戰帖怪怪的」）。
 */
export function parseChallengeFromUrl() {
  const params = new URLSearchParams(location.search);
  const raw = params.get('c');
  if (!raw) return { challenge: null, invalid: false };
  const data = b64uDecode(raw);
  if (!data || data.v !== 1 || !data.seed || data.k !== checksum(data)) {
    return { challenge: null, invalid: true };
  }
  return { challenge: data, invalid: false };
}

/** 清掉網址上的挑戰參數（接受挑戰後避免重整重複觸發） */
export function clearChallengeFromUrl() {
  const url = new URL(location.href);
  url.searchParams.delete('c');
  history.replaceState(null, '', url.toString());
}
