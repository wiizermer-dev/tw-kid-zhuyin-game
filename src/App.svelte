<script>
  import './ui/theme.css';
  import FloatingBg from './ui/components/FloatingBg.svelte';
  import DuanwuScene from './ui/components/DuanwuScene.svelte';
  import Home from './ui/screens/Home.svelte';
  import Play from './ui/screens/Play.svelte';
  import Result from './ui/screens/Result.svelte';
  import Levels from './ui/screens/Levels.svelte';
  import DuanwuQuest from './ui/screens/DuanwuQuest.svelte';
  import DragonBoat from './ui/components/minigames/DragonBoat.svelte';
  import PaddleRace from './ui/components/minigames/PaddleRace.svelte';
  import WrapZongzi from './ui/components/minigames/WrapZongzi.svelte';
  import PoemPuzzle from './ui/components/minigames/PoemPuzzle.svelte';
  import Piranha from './ui/components/minigames/Piranha.svelte';
  import Board from './ui/screens/Board.svelte';
  import DuelEntry from './ui/screens/DuelEntry.svelte';
  import Review from './ui/screens/Review.svelte';

  import { MODES, levelConfig, LEVELS, DUANWU_LEVELS, duanwuLevelConfig } from './modes.js';
  import { storage } from './core/storage.js';
  import { dailySeed } from './core/rng.js';
  import { parseChallengeFromUrl, clearChallengeFromUrl } from './lib/challenge.js';
  import { submitRun, browserId, recordQuestionAttempts } from './lib/backend.js';
  import { joinLiveRoom } from './lib/live.js';
  import { initCalibration } from './lib/calibration.js';

  const myId = browserId();
  initCalibration(); // 錯率校正難度覆蓋（async，sprint/levels 下一場生效）

  let screen = $state('home');
  let modeKey = $state('');
  let playConfig = $state(null);
  let playMeta = $state({});
  let level = $state(null);
  let summary = $state(null);
  let duelSeed = $state(null);
  let duelRoom = $state(null);

  // 即時連線房狀態（Supabase Realtime；無雲端時 channel 為 null）
  let liveState = $state({ players: [], progress: {} });
  let liveChannel = null;
  let myReady = $state(false);
  let duelCountdown = $state(0);   // 3-2-1 開戰倒數；0 表示沒在倒數
  let countdownTimer = null;
  let roomUsedIds = [];            // 本房已出過的題目 id（每局換題用）
  let duelDifficulty = $state('random');   // 本房定案難度（房主設定 → broadcast 同步全房 UI）
  let duelIsHost = $state(false);  // 我是開房者（hoist 到 App：replay 重掛 DuelEntry 後仍可改難度）

  // 開站時偵測戰帖／邀請
  const parsed = parseChallengeFromUrl();
  let challenge = $state(parsed.challenge);
  let invalidChallenge = $state(parsed.invalid);
  if (parsed.invalid) clearChallengeFromUrl();

  function startMode(key) {
    modeKey = key;
    level = null;

    if (key === 'daily') {
      playMeta = { modeName: MODES.daily.name };
      duelSeed = null;
      const existing = storage.getDailyRecord(dailySeed());
      if (existing) {
        // 今天玩過 → 直接看結果
        summary = existing;
        screen = 'result';
        return;
      }
      playConfig = MODES.daily.config();
    } else if (key === 'practice') {
      const ids = Object.keys(storage.getMistakes());
      if (ids.length === 0) {
        // 錯題本已清空，沒題可練
        screen = 'home';
        return;
      }
      playConfig = { count: Math.min(10, ids.length), onlyIds: ids };
      playMeta = { modeName: '錯題特訓' };
      duelSeed = null;
    } else if (key === 'sprint') {
      playConfig = { ...MODES.sprint.config(), excludeIds: storage.getRecentIds() };
      playMeta = { modeName: MODES.sprint.name };
      duelSeed = null;
    } else if (key === 'duel') {
      // 對戰走開房/輸碼入口
      screen = 'duel';
      return;
    }
    screen = 'play';
  }

  /** 進房：建立/加入注音房號的即時頻道（無雲端時為同題碼對戰，不開頻道） */
  function joinRoom(code, asHost = false) {
    // 「再玩一次」回大廳：同房沿用原頻道，保留出題紀錄（duelIsHost 也沿用）
    if (code === duelRoom && liveChannel) return;
    duelIsHost = asHost;
    duelRoom = code;
    storage.addSavedRoom(code);   // 常駐房：朋友榜（房內榜）資料來源
    duelSeed = `room-${code}`;
    roomUsedIds = [];
    myReady = false;
    duelDifficulty = 'random';
    if (liveChannel) { liveChannel.leave(); liveChannel = null; }
    // 原地清空，保持 liveState 物件參照穩定（Play/Result 持有同一個 proxy）
    liveState.players = [];
    liveState.progress = {};
    const myName = storage.getPlayerName() || '無名氏';
    liveChannel = joinLiveRoom(code, { id: myId, name: myName }, {
      onPlayers: (players) => {
        liveState.players = players;
        // 離房者清掉「尚未完賽」的進度：避免中途離席的幽靈列卡在第 N 題，
        // 讓結果頁「等其他人完成中」永不消失。但已完賽（finished）者一律保留——
        // 他名次已成定局，離開不該從最終排名消失（全員完賽後等同 freeze）。
        const ids = new Set(players.map((p) => p.id));
        for (const [id, p] of Object.entries(liveState.progress)) {
          if (!ids.has(id) && !p.finished) delete liveState.progress[id];
        }
      },
      onStart: (payload) => { if (screen === 'duel') beginCountdown(payload ?? { code }); },
      onProgress: (p) => { if (p?.id) liveState.progress[p.id] = p; },
      // 房主難度廣播到全房 → 同步 UI（含房主自己，因 self:false 故房主端在 setDuelDifficulty 直接設）
      onDifficulty: (key) => { duelDifficulty = key ?? 'random'; }
    });
  }

  function toggleReady() {
    myReady = !myReady;
    liveChannel?.setReady(myReady);
  }

  // 房主選定本場難度 → broadcast 全房（self:false 不回自己，故本地直接設）
  function setDuelDifficulty(difficulty) {
    duelDifficulty = difficulty;
    liveChannel?.setDifficulty(difficulty);
  }

  // 全員準備好 → 由 leader（id 最小者，避免多人同時廣播）發起開戰
  $effect(() => {
    // 必須先讀 players 再 early return：effect 依賴是「執行當下讀到的 state」。
    // 若在 liveChannel 還是 null 時（剛切到 duel、尚未開房）先 return，
    // 這次執行沒讀到 players → 之後 presence 更新不會重跑 effect，
    // 全員 ready 也永遠不倒數（liveChannel 是普通變數，賦值不觸發重跑）。
    const players = liveState.players;
    if (screen !== 'duel' || duelCountdown > 0 || !liveChannel) return;
    if (players.length < 2 || !players.every((p) => p.ready)) return;
    const leaderId = [...players].map((p) => p.id).sort()[0];
    if (leaderId !== myId) return;
    // 難度取本房定案值：房主設過 broadcast 給全房（含 leader 端記住），無人設則 random。
    // 不再從 presence metadata 撈（已移除），故與 ready 無競態。
    const payload = {
      code: duelRoom,
      match: Date.now().toString(36),   // 每局唯一 → 每局題目都不同
      excludeIds: roomUsedIds,
      difficulty: liveChannel.getDifficulty()
    };
    liveChannel.start(payload);
    beginCountdown(payload);
  });

  /** 收到開戰訊號：3-2-1 倒數後全房同時進場 */
  function beginCountdown(payload) {
    if (duelCountdown > 0 || screen !== 'duel') return;
    // 記住本局難度：讓非房主／日後換 leader 的人也有定案值，replay 不掉回 random
    if (payload?.difficulty) {
      duelDifficulty = payload.difficulty;
      liveChannel?.rememberDifficulty(payload.difficulty);   // 純記本地，不重新廣播（避免回授）
    }
    duelCountdown = 3;
    clearInterval(countdownTimer);
    countdownTimer = setInterval(() => {
      duelCountdown -= 1;
      if (duelCountdown <= 0) {
        clearInterval(countdownTimer);
        startDuelPlay(payload);
      }
    }, 1000);
  }

  /** 開打。opts 可為房號字串（無雲端直開，難度走 difficultyArg）
   *  或 { code, match, excludeIds, difficulty }（雲端 leader payload） */
  function startDuelPlay(opts, difficultyArg = 'random') {
    const { code, match = null, excludeIds = [], difficulty = difficultyArg } =
      typeof opts === 'string' ? { code: opts } : opts;
    modeKey = 'duel';
    level = null;
    duelRoom = code;
    duelSeed = match ? `room-${code}-${match}` : `room-${code}`;
    // 下一局要重新準備
    myReady = false;
    liveChannel?.setReady(false);
    // 重新開打前清掉上一場的進度，但保留房裡成員
    liveState.progress = {};
    playConfig = MODES.duel.config(duelSeed, 10, excludeIds, difficulty);
    playMeta = {
      modeName: MODES.duel.name,
      myId,
      liveState: liveChannel ? liveState : null,
      // 每答一題：自己存本地（自己也進排行榜）+ 廣播給其他人
      onProgress: liveChannel
        ? (snap) => {
            const mine = { id: myId, name: storage.getPlayerName() || '無名氏', ...snap };
            liveState.progress[myId] = mine;
            liveChannel.progress(mine);
          }
        : null
    };
    screen = 'play';
  }

  function leaveRoom() {
    if (liveChannel) { liveChannel.leave(); liveChannel = null; }
    duelRoom = null;
    myReady = false;
    duelIsHost = false;
    roomUsedIds = [];
    clearInterval(countdownTimer);
    duelCountdown = 0;
    liveState.players = [];
    liveState.progress = {};
  }

  function startLevel(lv) {
    modeKey = 'levels';
    level = lv;
    playConfig = {
      ...levelConfig(lv),
      excludeIds: storage.getRecentIds(),
      initialCombo: storage.getLevelCombo()   // 跨關卡連擊續燒
    };
    playMeta = { modeName: `第 ${lv.n} 關・${lv.name}`, bossName: lv.bossName };
    duelSeed = null;
    screen = 'play';
  }

  // game registry：DUANWU_LEVELS.game → mini-game 元件（spec §共用架構）
  const MINIGAMES = { dragonboat: DragonBoat, paddle: PaddleRace, wrap: WrapZongzi, poem: PoemPuzzle, piranha: Piranha };

  // 端午 event：開一關（答完 10 題 → 進該關 mini-game → 採滿粽子才過關）
  function startDuanwuLevel(lv) {
    modeKey = 'duanwu';
    level = lv;
    playConfig = { ...duanwuLevelConfig(lv), seed: `duanwu-${lv.n}-${Date.now()}` };
    playMeta = { modeName: `${lv.n}・${lv.name}` };
    duelSeed = null;
    screen = 'play';
  }

  // 答完該關 10 題 → 進 mini-game arcade（還沒過關，要採滿粽子）
  function finishDuanwuQuiz() {
    screen = 'duanwu-arcade';
  }

  // mini-game 結束：採滿 10（n===10）才過關記進度；不滿不過關，回 quest 可重玩該關。
  // 純本地（絕不 submitRun / recordQuestionAttempts，守 spec §2.2 不碰雲端）；clearedLevels set 去重（重玩不膨脹）。
  function duanwuArcadeComplete(n) {
    if (n >= 10 && level) {
      const prev = storage.getDuanwuProgress();
      const list = prev.clearedLevels ?? [];
      if (!list.includes(level.n)) {
        const clearedLevels = [...list, level.n];
        storage.setDuanwuProgress({ clearedLevels, rescued: prev.rescued || clearedLevels.length >= 5 });
      }
    }
    screen = 'duanwu-quest';
  }

  function acceptChallenge() {
    clearChallengeFromUrl();
    if (challenge.score === null) {
      // 進房邀請（無分數）→ 進大廳（同房同時開打）
      screen = 'duel';
      return;
    }
    // 戰帖（帶分數）→ 直接打同題組比分
    modeKey = 'duel';
    level = null;
    duelSeed = challenge.seed;
    duelRoom = challenge.room;
    storage.addSavedRoom(challenge.room);
    playConfig = MODES.duel.config(challenge.seed, challenge.count ?? 10);
    playMeta = { modeName: '好友對戰' };
    screen = 'play';
  }

  function declineChallenge() {
    challenge = null;
    clearChallengeFromUrl();
  }

  function finishGame(s) {
    summary = s;
    const name = storage.getPlayerName() || '無名氏';

    // 錯題本 + 近期題目（避免短時間重複出題）
    s.questions.forEach((q, i) => {
      if (!s.results[i]) storage.addMistake(q.id);
      else storage.clearMistake(q.id);
    });
    storage.addRecentIds(s.questions.map((q) => q.id));

    // 全體常錯榜：逐題作答結果上傳雲端（fire-and-forget，無雲端時自動跳過）
    recordQuestionAttempts(
      s.questions.map((q, i) => ({ question: q, isCorrect: !!s.results[i] }))
    );

    // 同房下一局排除這局出過的題
    if (modeKey === 'duel') {
      roomUsedIds = [...new Set([...roomUsedIds, ...s.questions.map((q) => q.id)])];
    }

    // 各模式持久化
    if (modeKey === 'daily') {
      const seed = dailySeed();
      if (!storage.getDailyRecord(seed)) {
        storage.setDailyRecord(seed, s);
        const yesterday = dailySeed(new Date(Date.now() - 86400000));
        const streak = storage.getDailyStreak();
        storage.setDailyStreak({
          count: streak.last === yesterday ? streak.count + 1 : 1,
          last: seed
        });
      }
    } else if (modeKey === 'sprint') {
      if (s.score > storage.getSprintBest()) storage.setSprintBest(s.score);
    } else if (modeKey === 'levels' && level) {
      const stars = storage.getLevelStars();
      const earned = s.correct / Math.max(s.total, 1) >= 0.6
        ? (s.correct === s.total ? 3 : s.correct / s.total >= 0.8 ? 2 : 1)
        : 0;
      // BOSS 關必須打贏才算過
      const finalStars = level.boss && !s.won ? 0 : earned;
      if (finalStars > (stars[level.n] ?? 0)) {
        stars[level.n] = finalStars;
        storage.setLevelStars(stars);
      }
      // 跨關卡連擊：這關收尾的連擊帶去下一關
      storage.setLevelCombo(s.endCombo ?? 0);
      storage.setLevelMaxCombo(Math.max(storage.getLevelMaxCombo(), s.maxCombo, s.endCombo ?? 0));
      // 各關最佳分 → 戰役累積分（榜上一人一筆，呈現破關累積而非單關洗版）
      const best = storage.getLevelBest();
      if (s.score > (best[level.n] ?? 0)) {
        best[level.n] = s.score;
        storage.setLevelBest(best);
      }
    }

    // 0 分（如 BOSS 戰秒敗）不寫榜，避免弄髒排行榜
    if (modeKey !== 'practice' && s.score > 0) {
      // 闖關送「戰役累積分」（各關最佳分加總）+ 戰役最高連擊；其他模式送單場
      const boardScore = modeKey === 'levels'
        ? Object.values(storage.getLevelBest()).reduce((a, b) => a + b, 0)
        : s.score;
      const boardCombo = modeKey === 'levels' ? storage.getLevelMaxCombo() : s.maxCombo;
      storage.addLocalScore({ name, score: boardScore, mode: modeKey, maxCombo: boardCombo });
      submitRun({
        name, score: boardScore, mode: modeKey,
        room: modeKey === 'duel' ? duelRoom : null,   // bare 房號（朋友榜 = 房內榜過濾鍵）
        correct: s.correct, total: s.total, maxCombo: boardCombo
      });
    }

    screen = 'result';
  }

  function replay() {
    if (modeKey === 'levels' && level) startLevel(level);
    else if (modeKey === 'duel' && liveChannel) {
      // 按「再玩一次」= 明確要再戰 → 回大廳直接帶準備狀態，少按一顆按鈕
      myReady = true;
      liveChannel.setReady(true);
      screen = 'duel';
    } else startMode(modeKey);
  }

  function nextLevel() {
    const next = LEVELS.find((l) => l.n === level.n + 1);
    if (next) startLevel(next);
    else screen = 'home';
  }

  function goHome() {
    challenge = null;
    invalidChallenge = false;
    leaveRoom();
    screen = 'home';
  }
</script>

{#if screen === 'duanwu-quest' || screen === 'duanwu-arcade' || (screen === 'play' && modeKey === 'duanwu')}
  <DuanwuScene />
{:else}
  <FloatingBg />
{/if}

{#if screen === 'home'}
  <Home
    onPlay={startMode}
    onLevels={() => (screen = 'levels')}
    onDuanwu={() => (screen = 'duanwu-quest')}
    onBoard={() => (screen = 'board')}
    onReview={() => (screen = 'review')}
    {challenge}
    {invalidChallenge}
    onAcceptChallenge={acceptChallenge}
    onDeclineChallenge={declineChallenge}
  />
{:else if screen === 'duanwu-quest'}
  <DuanwuQuest onPick={startDuanwuLevel} onHome={goHome} />
{:else if screen === 'duanwu-arcade'}
  {#key level?.n}
    <div class="arcade-wrap">
      <svelte:component this={MINIGAMES[level?.game] ?? DragonBoat} onComplete={duanwuArcadeComplete} />
    </div>
  {/key}
{:else if screen === 'duel'}
  <DuelEntry
    initialCode={challenge?.room ?? duelRoom ?? ''}
    players={liveState.players}
    {myReady}
    isHost={duelIsHost}
    countdown={duelCountdown}
    onReady={toggleReady}
    onRoom={joinRoom}
    onPlay={startDuelPlay}
    onDifficulty={setDuelDifficulty}
    difficulty={duelDifficulty}
    onHome={goHome}
  />
{:else if screen === 'levels'}
  <Levels onPick={startLevel} onHome={goHome} />
{:else if screen === 'play'}
  {#key playConfig}
    {#if modeKey === 'duanwu'}
      <Play config={playConfig} meta={playMeta} onFinish={finishDuanwuQuiz} onQuit={() => (screen = 'duanwu-quest')} />
    {:else}
      <Play config={playConfig} meta={playMeta} onFinish={finishGame} onQuit={goHome} />
    {/if}
  {/key}
{:else if screen === 'result'}
  <Result
    {summary}
    {modeKey}
    modeName={playMeta.modeName ?? MODES[modeKey]?.name ?? ''}
    {level}
    challenge={modeKey === 'duel' && challenge?.score != null ? challenge : null}
    liveState={modeKey === 'duel' && liveChannel ? liveState : null}
    {myId}
    {duelSeed}
    onReplay={replay}
    onHome={goHome}
    onBoard={() => (screen = 'board')}
    onNextLevel={modeKey === 'levels' && level && level.n < LEVELS.length ? nextLevel : null}
    onLevels={modeKey === 'levels' ? () => (screen = 'levels') : null}
  />
{:else if screen === 'board'}
  <Board onHome={goHome} initialTab={MODES[modeKey] ? modeKey : 'sprint'} />
{:else if screen === 'review'}
  <Review onHome={goHome} />
{/if}

<style>
  /* mini-game 容器：佔滿視窗高度（mini-game 內部量 rect 尺寸自適應，需明確 height），窄欄置中貼 app 調性 */
  .arcade-wrap {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 520px;
    height: 100dvh;
    margin: 0 auto;
    overflow: hidden;
  }
</style>
