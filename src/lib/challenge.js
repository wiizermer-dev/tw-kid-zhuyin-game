/** 挑戰連結 — 無後端的好友對戰核心。
 * URL: ?c=<base64url(JSON)>，內容 { v, seed, mode, score, name, count }
 */

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

/** 產生挑戰連結（開房者打完分數後呼叫） */
export function buildChallengeUrl({ seed, mode, score, name, count }) {
  const payload = { v: 1, seed, mode, score, name, count };
  const url = new URL(location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('c', b64uEncode(payload));
  return url.toString();
}

/** 讀取目前網址中的挑戰（沒有則 null） */
export function parseChallengeFromUrl() {
  const params = new URLSearchParams(location.search);
  const raw = params.get('c');
  if (!raw) return null;
  const data = b64uDecode(raw);
  if (!data || data.v !== 1 || !data.seed) return null;
  return data;
}

/** 清掉網址上的挑戰參數（接受挑戰後避免重整重複觸發） */
export function clearChallengeFromUrl() {
  const url = new URL(location.href);
  url.searchParams.delete('c');
  history.replaceState(null, '', url.toString());
}
