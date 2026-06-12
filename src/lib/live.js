/** 即時連線房（Supabase Realtime presence + broadcast）
 * 無資料表、無登入；hasCloud=false 時呼叫端應自行退化為同題碼對戰。
 */
import { supabase } from './backend.js';

/**
 * 加入房間頻道。
 * @param {string} code 注音房號（如 ㄅㄅㄇㄇ）
 * @param {{id: string, name: string}} me 玩家（穩定 id + 名字）
 * @param {Object} handlers { onPlayers(players[]), onStart(payload), onProgress(payload), onDifficulty(key) }
 * @returns {Object|null} { start, progress, setReady, setDifficulty, leave }；無雲端時回傳 null
 */
export function joinLiveRoom(code, me, handlers = {}) {
  if (!supabase) return null;

  const channel = supabase.channel(`bpmf-room-${code}`, {
    config: { presence: { key: me.id }, broadcast: { self: false } }
  });

  // presence metadata 只放 ready：和難度分開，避免兩者共用 track() 競態互相洗掉
  // （房主設難度若併進 presence，sync 競態會把 ready 旗號蓋掉 → 全房等不到對方 ready 而不倒數）
  // 難度改走獨立 broadcast event（房主單向通知），不靠 presence 狀態同步語意。
  const myMeta = { id: me.id, name: me.name, ready: false };
  // 房主設過的最新難度；leader 發 start 時取此值（自己設的不會被 self:false 過濾掉）
  let hostDifficulty = null;

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
          seen.set(m.id, { id: m.id, name: m.name, ready: !!m.ready });
        }
      }
    }
    handlers.onPlayers?.([...seen.values()]);
  });
  channel.on('broadcast', { event: 'start' }, ({ payload }) => handlers.onStart?.(payload));
  channel.on('broadcast', { event: 'progress' }, ({ payload }) => handlers.onProgress?.(payload));
  // 房主難度：記住最新值供 leader 發 start 用，並通知 UI 顯示
  channel.on('broadcast', { event: 'difficulty' }, ({ payload }) => {
    hostDifficulty = payload?.difficulty ?? null;
    handlers.onDifficulty?.(hostDifficulty);
  });

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
    // 開房者設定本場難度：記在本地（leader 發 start 取用）+ broadcast 給全房 UI
    setDifficulty: (difficulty) => {
      hostDifficulty = difficulty ?? null;
      channel.send({ type: 'broadcast', event: 'difficulty', payload: { difficulty: hostDifficulty } });
    },
    // 純記本地難度不廣播：收到 start payload 的人據此記住定案值（換 leader 也有值，避免回授風暴）
    rememberDifficulty: (difficulty) => { hostDifficulty = difficulty ?? null; },
    // leader 發 start 時取本房定案難度（房主設過則為其值，否則 random）
    getDifficulty: () => hostDifficulty ?? 'random',
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
