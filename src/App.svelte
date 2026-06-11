<script>
  import './ui/theme.css';
  import FloatingBg from './ui/components/FloatingBg.svelte';
  import Home from './ui/screens/Home.svelte';
  import Play from './ui/screens/Play.svelte';
  import Result from './ui/screens/Result.svelte';
  import Levels from './ui/screens/Levels.svelte';
  import Board from './ui/screens/Board.svelte';
  import DuelEntry from './ui/screens/DuelEntry.svelte';

  import { MODES, levelConfig, LEVELS } from './modes.js';
  import { storage } from './core/storage.js';
  import { dailySeed } from './core/rng.js';
  import { parseChallengeFromUrl, clearChallengeFromUrl } from './lib/challenge.js';
  import { submitRun } from './lib/backend.js';
  import { joinLiveRoom } from './lib/live.js';

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
  function joinRoom(code) {
    duelRoom = code;
    duelSeed = `room-${code}`;
    if (liveChannel) { liveChannel.leave(); liveChannel = null; }
    liveState = { players: [], progress: {} };
    liveChannel = joinLiveRoom(code, storage.getPlayerName() || '無名氏', {
      onPlayers: (players) => { liveState.players = players; },
      onStart: () => { if (screen === 'duel') startDuelPlay(code, false); },
      onProgress: (p) => { if (p?.name) liveState.progress[p.name] = p; }
    });
  }

  /** 開打：broadcast 讓全房同時開始 */
  function startDuelPlay(code, broadcast = true) {
    if (broadcast) liveChannel?.start({ code });
    modeKey = 'duel';
    level = null;
    duelRoom = code;
    duelSeed = `room-${code}`;
    playConfig = MODES.duel.config(duelSeed);
    playMeta = {
      modeName: MODES.duel.name,
      liveState: liveChannel ? liveState : null,
      onProgress: liveChannel
        ? (snap) => liveChannel.progress({ name: storage.getPlayerName() || '無名氏', ...snap })
        : null
    };
    screen = 'play';
  }

  function leaveRoom() {
    if (liveChannel) { liveChannel.leave(); liveChannel = null; }
    duelRoom = null;
    liveState = { players: [], progress: {} };
  }

  function startLevel(lv) {
    modeKey = 'levels';
    level = lv;
    playConfig = { ...levelConfig(lv), excludeIds: storage.getRecentIds() };
    playMeta = { modeName: `第 ${lv.n} 關・${lv.name}`, bossName: lv.bossName };
    duelSeed = null;
    screen = 'play';
  }

  function acceptChallenge() {
    clearChallengeFromUrl();
    if (challenge.room) {
      // 進房邀請 → 進大廳（同房同時開打）
      screen = 'duel';
      return;
    }
    // 非同步戰帖 → 直接打同題組比分
    modeKey = 'duel';
    level = null;
    duelSeed = challenge.seed;
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
    }

    // 0 分（如 BOSS 戰秒敗）不寫榜，避免弄髒排行榜
    if (modeKey !== 'practice' && s.score > 0) {
      storage.addLocalScore({ name, score: s.score, mode: modeKey, maxCombo: s.maxCombo });
      submitRun({
        name, score: s.score, mode: modeKey,
        room: modeKey === 'duel' ? duelSeed : null,
        correct: s.correct, total: s.total, maxCombo: s.maxCombo
      });
    }

    screen = 'result';
  }

  function replay() {
    if (modeKey === 'levels' && level) startLevel(level);
    else startMode(modeKey);
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

<FloatingBg />

{#if screen === 'home'}
  <Home
    onPlay={startMode}
    onLevels={() => (screen = 'levels')}
    onBoard={() => (screen = 'board')}
    {challenge}
    {invalidChallenge}
    onAcceptChallenge={acceptChallenge}
    onDeclineChallenge={declineChallenge}
  />
{:else if screen === 'duel'}
  <DuelEntry
    initialCode={challenge?.room ?? ''}
    players={liveState.players}
    onRoom={joinRoom}
    onPlay={startDuelPlay}
    onHome={goHome}
  />
{:else if screen === 'levels'}
  <Levels onPick={startLevel} onHome={goHome} />
{:else if screen === 'play'}
  {#key playConfig}
    <Play config={playConfig} meta={playMeta} onFinish={finishGame} onQuit={goHome} />
  {/key}
{:else if screen === 'result'}
  <Result
    {summary}
    {modeKey}
    modeName={playMeta.modeName ?? MODES[modeKey]?.name ?? ''}
    {level}
    challenge={modeKey === 'duel' && challenge && !challenge.room ? challenge : null}
    liveState={modeKey === 'duel' && liveChannel ? liveState : null}
    {duelSeed}
    onReplay={replay}
    onHome={goHome}
    onBoard={() => (screen = 'board')}
    onNextLevel={modeKey === 'levels' && level && level.n < LEVELS.length ? nextLevel : null}
    onLevels={modeKey === 'levels' ? () => (screen = 'levels') : null}
  />
{:else if screen === 'board'}
  <Board onHome={goHome} initialTab={MODES[modeKey] ? modeKey : 'sprint'} />
{/if}
