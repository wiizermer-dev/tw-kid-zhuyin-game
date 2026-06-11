/** 即時連線房（Supabase Realtime presence + broadcast）
 * 無資料表、無登入；hasCloud=false 時呼叫端應自行退化為同題碼對戰。
 */
import { supabase } from './backend.js';

/**
 * 加入房間頻道。
 * @param {string} code 注音房號（如 ㄅㄅㄇㄇ）
 * @param {string} name 玩家名
 * @param {Object} handlers { onPlayers(names[]), onStart(payload), onProgress(payload) }
 * @returns {Object|null} { start(payload), progress(payload), leave() }；無雲端時回傳 null
 */
export function joinLiveRoom(code, name, handlers = {}) {
  if (!supabase) return null;

  const key = crypto.randomUUID();
  const channel = supabase.channel(`bpmf-room-${code}`, {
    config: { presence: { key }, broadcast: { self: false } }
  });

  channel.on('presence', { event: 'sync' }, () => {
    const players = Object.values(channel.presenceState())
      .flat()
      .map((p) => p.name)
      .filter(Boolean);
    handlers.onPlayers?.(players);
  });
  channel.on('broadcast', { event: 'start' }, ({ payload }) => handlers.onStart?.(payload));
  channel.on('broadcast', { event: 'progress' }, ({ payload }) => handlers.onProgress?.(payload));

  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      try { await channel.track({ name }); } catch (e) { console.error('presence track:', e); }
    }
  });

  return {
    start: (payload) => channel.send({ type: 'broadcast', event: 'start', payload }),
    progress: (payload) => channel.send({ type: 'broadcast', event: 'progress', payload }),
    leave: () => { try { supabase.removeChannel(channel); } catch { /* already gone */ } }
  };
}

/** 隨機注音房號：4 碼聲母組合，如 ㄅㄆㄇㄈ */
const CODE_CHARS = [...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙ'];
export function randomZhuyinCode() {
  let code = '';
  for (let i = 0; i < 4; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return code;
}
export { CODE_CHARS };
