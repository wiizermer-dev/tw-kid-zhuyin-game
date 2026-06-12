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

  // presence metadata 只放 ready：和難度分開，避免兩者共用 track() 競態互相洗掉
  // （房主設難度若併進 presence，sync 競態會把 ready 旗號蓋掉 → 全房等不到對方 ready 而不倒數）
  // 難度改走獨立 broadcast event（房主單向通知），不靠 presence 狀態同步語意。
  const myMeta = { id: me.id, name: me.name, ready: false };
  // 房主設過的最新難度；leader 發 start 時取此值（自己設的不會被 self:false 過濾掉）
  let hostDifficulty = null;
  // 我是否設定過難度（= 房主）。broadcast 即發即逝，晚進房者收不到歷史訊息，
  // 房主須在 presence sync 看到新成員時重播難度，否則晚到的人永遠顯示「隨機」。
  let isDifficultyOwner = false;
  let lastPlayerCount = 0;
  let channel = null;
  let subscribed = false;
  let left = false;

  /* track() 防死局（實測：連點 ready 6 下/1.5 秒就會把 channel 弄死 —
   * 自己從別人的 presence 永久消失、之後所有 track ack 都 timed out，且無任何例外可抓）。
   * 三層防護：
   * 1. trailing debounce 300ms：連點折疊成最後一筆，從源頭不對 server 連發 track
   * 2. 序列化：一次只允許一個 track 在途（失敗只回 async ack，try/catch 抓不到）
   * 3. ack 失敗 → rejoin()：重建 channel 復活（死掉的 channel 不會自己好） */
  let trackTimer = null;
  let trackBusy = false;
  let trackDirty = false;

  function pushMeta() {
    clearTimeout(trackTimer);
    trackTimer = setTimeout(flushMeta, 300);
  }

  async function flushMeta() {
    if (!subscribed || left) return;
    if (trackBusy) { trackDirty = true; return; }
    trackBusy = true;
    const ch = channel;   // 捕捉當下 instance：rejoin 換新 channel 後，舊 ack 結果不得再動新 channel
    let ok = true;
    try {
      do {
        trackDirty = false;
        const status = await ch.track({ ...myMeta });
        if (status !== 'ok') {
          console.error('presence track ack:', status);
          ok = false;
          break;
        }
      } while (trackDirty && ch === channel);
    } catch (e) {
      console.error('presence track:', e);
      ok = false;
    } finally {
      trackBusy = false;
    }
    if (!ok && ch === channel) rejoin();
  }

  // channel 死掉（track ack 失敗 / 訂閱錯誤）→ 整個砍掉重建；exponential backoff 防 rejoin 風暴
  let rejoining = false;
  let rejoinAttempts = 0;
  function rejoin() {
    if (rejoining || left) return;
    rejoining = true;
    subscribed = false;
    try { supabase.removeChannel(channel); } catch { /* already gone */ }
    const delay = Math.min(8000, 500 * 2 ** rejoinAttempts);
    rejoinAttempts += 1;
    setTimeout(() => {
      rejoining = false;
      if (!left) connect();
    }, delay);
  }

  function connect() {
    // ch 捕捉本次 instance：rejoin 重建後，舊 channel 的殘留 callback 一律忽略
    const ch = channel = supabase.channel(`bpmf-room-${code}`, {
      config: { presence: { key: me.id }, broadcast: { self: false } }
    });

    ch.on('presence', { event: 'sync' }, () => {
      if (ch !== channel) return;
      // 以 id 去重（同一人多個 tab 只算一個）
      const seen = new Map();
      for (const metas of Object.values(ch.presenceState())) {
        for (const m of metas) {
          if (m.id && m.name) {
            seen.set(m.id, { id: m.id, name: m.name, ready: !!m.ready });
          }
        }
      }
      const players = [...seen.values()];
      // 有新成員進房 → 房主重播難度（給晚進房者；receiver 端設值是冪等的）
      if (isDifficultyOwner && hostDifficulty != null && players.length > lastPlayerCount) {
        ch.send({ type: 'broadcast', event: 'difficulty', payload: { difficulty: hostDifficulty } });
      }
      lastPlayerCount = players.length;
      handlers.onPlayers?.(players);
    });
    ch.on('broadcast', { event: 'start' }, ({ payload }) => handlers.onStart?.(payload));
    ch.on('broadcast', { event: 'progress' }, ({ payload }) => handlers.onProgress?.(payload));
    // 房主難度：記住最新值供 leader 發 start 用，並通知 UI 顯示
    ch.on('broadcast', { event: 'difficulty' }, ({ payload }) => {
      hostDifficulty = payload?.difficulty ?? null;
      handlers.onDifficulty?.(hostDifficulty);
    });

    // channel 訂閱是非同步的；訂閱完成前對 channel.track() 無效甚至會壞掉 presence。
    // 統一用 pushMeta/flushMeta：未訂閱時只更新本地 myMeta（SUBSCRIBED 後 track 最新值）。
    ch.subscribe((status) => {
      if (ch !== channel || left) return;   // 舊 instance 殘留 callback／已主動離房
      if (status === 'SUBSCRIBED') {
        subscribed = true;
        rejoinAttempts = 0;
        flushMeta();
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        // CLOSED 含被 server 踢掉；主動 leave 已被 left flag 擋掉，不會誤觸發
        rejoin();
      }
    });
  }

  connect();

  return {
    start: (payload) => channel.send({ type: 'broadcast', event: 'start', payload }),
    progress: (payload) => channel.send({ type: 'broadcast', event: 'progress', payload }),
    setReady: (ready) => {
      myMeta.ready = !!ready;
      pushMeta();
    },
    // 開房者設定本場難度：記在本地（leader 發 start 取用）+ broadcast 給全房 UI
    setDifficulty: (difficulty) => {
      isDifficultyOwner = true;
      hostDifficulty = difficulty ?? null;
      channel.send({ type: 'broadcast', event: 'difficulty', payload: { difficulty: hostDifficulty } });
    },
    // 純記本地難度不廣播：收到 start payload 的人據此記住定案值（換 leader 也有值，避免回授風暴）
    rememberDifficulty: (difficulty) => { hostDifficulty = difficulty ?? null; },
    // leader 發 start 時取本房定案難度（房主設過則為其值，否則 random）
    getDifficulty: () => hostDifficulty ?? 'random',
    leave: () => {
      left = true;
      clearTimeout(trackTimer);
      try { supabase.removeChannel(channel); } catch { /* already gone */ }
    }
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
