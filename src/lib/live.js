/** 即時連線房（Supabase Realtime presence + broadcast）
 * 無資料表、無登入；hasCloud=false 時呼叫端應自行退化為同題碼對戰。
 */
import { supabase } from './backend.js';

/**
 * 加入房間頻道。
 * @param {string} code 注音房號（如 ㄅㄅㄇㄇ）
 * @param {{id: string, name: string}} me 玩家（穩定 id + 名字）
 * @param {Object} handlers { onPlayers(players[]), onStart(payload), onProgress(payload) }
 * @returns {Object|null} { start(payload), progress(payload), setReady(bool), leave() }；無雲端時回傳 null
 */
export function joinLiveRoom(code, me, handlers = {}) {
  if (!supabase) return null;

  const channel = supabase.channel(`bpmf-room-${code}`, {
    config: { presence: { key: me.id }, broadcast: { self: false } }
  });

  // presence metadata：ready 隨大廳準備狀態更新（重新 track 即廣播）
  // difficulty 只有開房者會設（其餘人為 null），leader 發 start 時取此值同步全房
  const myMeta = { id: me.id, name: me.name, ready: false, difficulty: null };

  // channel 訂閱是非同步的；訂閱完成前對 channel.track() 無效甚至會壞掉 presence。
  // 統一用 pushMeta：未訂閱時只更新本地 myMeta（等 SUBSCRIBED 後一次 track 最新值），
  // 已訂閱才即時 track 廣播。避免「房主一進房就設難度」對未訂閱 channel track，
  // 導致後續 ready 廣播失效、全房永遠等不到房主 ready 而不倒數。
  let subscribed = false;
  function pushMeta() {
    if (!subscribed) return;
    try { channel.track(myMeta); } catch (e) { console.error('presence track:', e); }
  }

  channel.on('presence', { event: 'sync' }, () => {
    // 以 id 去重（同一人多個 tab 只算一個）
    const seen = new Map();
    for (const metas of Object.values(channel.presenceState())) {
      for (const m of metas) {
        if (m.id && m.name) {
          seen.set(m.id, { id: m.id, name: m.name, ready: !!m.ready, difficulty: m.difficulty ?? null });
        }
      }
    }
    handlers.onPlayers?.([...seen.values()]);
  });
  channel.on('broadcast', { event: 'start' }, ({ payload }) => handlers.onStart?.(payload));
  channel.on('broadcast', { event: 'progress' }, ({ payload }) => handlers.onProgress?.(payload));

  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      subscribed = true;
      // 訂閱完成才首次 track；此時 myMeta 已含進房前先設好的 ready/difficulty
      pushMeta();
    }
  });

  return {
    start: (payload) => channel.send({ type: 'broadcast', event: 'start', payload }),
    progress: (payload) => channel.send({ type: 'broadcast', event: 'progress', payload }),
    setReady: (ready) => {
      myMeta.ready = !!ready;
      pushMeta();
    },
    // 開房者設定本場難度，重新 track 即廣播給全房
    setDifficulty: (difficulty) => {
      myMeta.difficulty = difficulty ?? null;
      pushMeta();
    },
    leave: () => { try { supabase.removeChannel(channel); } catch { /* already gone */ } }
  };
}

/** 隨機注音房號：4 碼，全 37 個注音符號（37^4 ≈ 187 萬組合，由系統產生給房長） */
const CODE_CHARS = [...'ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦ'];
export function randomZhuyinCode() {
  let code = '';
  for (let i = 0; i < 4; i++) code += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return code;
}
export { CODE_CHARS };
