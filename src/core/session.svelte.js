/** 遊戲回合狀態機（Svelte 5 runes）— 所有模式共用 */
import { scoreFor } from './scoring.js';
import { selectQuestions, drawHarderQuestion } from './bank.js';

// 連對提難：每連對這麼多題，把後續未答題提升一級難度上限（封頂 5）
const ESCALATE_STREAK = 5;

export class QuizSession {
  questions = $state([]);
  index = $state(0);
  score = $state(0);
  combo = $state(0);
  maxCombo = $state(0);
  correctCount = $state(0);
  results = $state([]);          // boolean[]，依作答順序
  answered = $state(null);       // 本題已選的 option index（null = 未答）
  finished = $state(false);
  hearts = $state(Infinity);     // boss 模式玩家生命
  bossHp = $state(0);            // boss 模式魔王血量
  bossMaxHp = $state(0);
  timeLeft = $state(0);          // 全域倒數（秒）；0 表示無計時
  perQuestionSeconds = 0;        // 單題限時（boss／對戰模式用）
  questionTimeLeft = $state(0);
  answerTimeTotal = $state(0);   // 累計作答用時（秒）：對戰排名的速度依據

  #timerId = null;
  #questionStart = 0;
  #config = {};
  #deadline = 0;          // 全域結束時間戳（performance.now 基準）
  #questionDeadline = 0;  // 單題結束時間戳
  #escalateTier = 0;      // 連對提難已提升的難度級數

  current = $derived(this.questions[this.index] ?? null);
  total = $derived(this.questions.length);

  /**
   * @param {Object} config
   *  - count: 題數（timed 模式為題池上限）
   *  - seed, categories, minDifficulty, maxDifficulty, excludeIds: 選題條件
   *  - timeLimit: 全域秒數（衝刺模式）
   *  - perQuestionSeconds: 單題秒數（boss／對戰模式）
   *  - initialCombo: 起始連擊（闖關跨關卡累計）
   *  - bossHp: 魔王血量；hearts: 玩家生命
   */
  start(config = {}) {
    this.#config = config;
    this.questions = selectQuestions({
      count: config.count ?? 10,
      seed: config.seed,
      categories: config.categories,
      minDifficulty: config.minDifficulty,
      maxDifficulty: config.maxDifficulty,
      excludeIds: config.excludeIds,
      onlyIds: config.onlyIds
    });
    this.index = 0;
    this.score = 0;
    this.combo = config.initialCombo ?? 0;   // 闖關模式可帶上一關的連擊續燒
    this.maxCombo = 0;
    this.correctCount = 0;
    this.results = [];
    this.answered = null;
    this.finished = false;
    this.answerTimeTotal = 0;
    this.hearts = config.hearts ?? Infinity;
    this.bossMaxHp = config.bossHp ?? 0;
    this.bossHp = config.bossHp ?? 0;
    this.timeLeft = config.timeLimit ?? 0;
    this.perQuestionSeconds = config.perQuestionSeconds ?? 0;
    this.questionTimeLeft = this.perQuestionSeconds;
    this.#escalateTier = 0;
    this.#questionStart = performance.now();
    this.#deadline = config.timeLimit ? performance.now() + config.timeLimit * 1000 : 0;
    this.#questionDeadline = this.perQuestionSeconds ? performance.now() + this.perQuestionSeconds * 1000 : 0;

    if (config.timeLimit || this.perQuestionSeconds) this.#startTimer();
  }

  // 以時間戳計算剩餘時間，避免 setInterval 漂移（背景分頁節流、低階裝置）。
  // $state 只存「顯示用整秒」且值變了才寫：把 timer 驅動的 reactive 更新從 10Hz 降到 1Hz，
  // 超時判定與計分精度仍用 deadline 時間戳（見 answer() 的 speedRatio）。
  #startTimer() {
    this.#stopTimer();
    this.#timerId = setInterval(() => {
      if (this.finished) return this.#stopTimer();
      const now = performance.now();
      if (this.#deadline) {
        const left = Math.max(0, (this.#deadline - now) / 1000);
        const display = Math.ceil(left);
        if (display !== this.timeLeft) this.timeLeft = display;
        if (left <= 0) return this.end();
      }
      if (this.#questionDeadline && this.answered === null) {
        const left = Math.max(0, (this.#questionDeadline - now) / 1000);
        const display = Math.ceil(left);
        if (display !== this.questionTimeLeft) this.questionTimeLeft = display;
        if (left <= 0) this.timeout();
      }
    }, 100);
  }

  #stopTimer() {
    if (this.#timerId) clearInterval(this.#timerId);
    this.#timerId = null;
  }

  /** 玩家作答。回傳是否正確；不自動跳下一題（讓 UI 控制回饋節奏） */
  answer(optionIndex) {
    if (this.answered !== null || this.finished || !this.current) return null;
    this.answered = optionIndex;
    const correct = !!this.current.options[optionIndex]?.correct;
    this.results.push(correct);
    const elapsed = (performance.now() - this.#questionStart) / 1000;
    this.answerTimeTotal += elapsed;

    if (correct) {
      this.combo += 1;
      this.maxCombo = Math.max(this.maxCombo, this.combo);
      this.correctCount += 1;
      // 速度分用 deadline 時間戳精算（questionTimeLeft 已量化為顯示整秒，不夠精細）
      const speedRatio = this.perQuestionSeconds
        ? Math.max(0, (this.#questionDeadline - performance.now()) / 1000) / this.perQuestionSeconds
        : Math.max(0, 1 - elapsed / 10);
      this.score += scoreFor(this.combo, this.current.difficulty, speedRatio);
      if (this.bossMaxHp) this.bossHp = Math.max(0, this.bossHp - 1);
      // 連對達標 → 把後續未答題提升一級難度（闖關非 BOSS 關啟用）
      if (this.#config.escalate && this.combo > 0 && this.combo % ESCALATE_STREAK === 0) {
        this.#escalate();
      }
    } else {
      this.combo = 0;
      if (this.hearts !== Infinity) this.hearts = Math.max(0, this.hearts - 1);
    }
    return correct;
  }

  /** 連對提難：把後續尚未作答的題目換成更難一級的同類新題。
   * 不動已答過與當前題，避免畫面跳動；換不到更難題就維持原題。 */
  #escalate() {
    this.#escalateTier = Math.min(this.#escalateTier + 1, 4);
    const wantDifficulty = Math.min(5, (this.#config.maxDifficulty ?? 3) + this.#escalateTier);
    const used = new Set(this.questions.map(q => q.id));
    const swapped = this.questions.map((q, i) => {
      if (i <= this.index || q.difficulty >= wantDifficulty) return q;
      const harder = drawHarderQuestion({
        wantDifficulty,
        categories: this.#config.categories,
        usedIds: used,
        seed: `${this.#config.seed ?? 'esc'}-${i}-${this.#escalateTier}`
      });
      if (!harder) return q;
      used.delete(q.id);
      used.add(harder.id);
      return harder;
    });
    this.questions = swapped;
  }

  /** 單題超時：視同答錯（answered 設為 -1） */
  timeout() {
    if (this.answered !== null || this.finished) return;
    this.answered = -1;
    this.results.push(false);
    this.answerTimeTotal += this.perQuestionSeconds || (performance.now() - this.#questionStart) / 1000;
    this.combo = 0;
    if (this.hearts !== Infinity) this.hearts = Math.max(0, this.hearts - 1);
  }

  /** 進入下一題；到底或勝負已分則結束 */
  next() {
    if (this.finished) return;
    const bossDead = this.bossMaxHp > 0 && this.bossHp <= 0;
    const playerDead = this.hearts !== Infinity && this.hearts <= 0;
    if (bossDead || playerDead || this.index >= this.total - 1) return this.end();
    this.index += 1;
    this.answered = null;
    this.questionTimeLeft = this.perQuestionSeconds;
    this.#questionStart = performance.now();
    if (this.perQuestionSeconds) {
      this.#questionDeadline = performance.now() + this.perQuestionSeconds * 1000;
    }
  }

  end() {
    this.finished = true;
    this.#stopTimer();
  }

  destroy() {
    this.#stopTimer();
  }

  get won() {
    if (this.bossMaxHp > 0) return this.bossHp <= 0;
    return true;
  }

  /** 答過的題目數（timed 模式下 total 沒意義時用這個） */
  get attempted() {
    return this.results.length;
  }
}
