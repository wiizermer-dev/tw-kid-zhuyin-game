<script>
  /** 對戰結算吐槽 — 統計本場全房最雷題（最多人答錯）與「本場最菜」獨至。
   * progress: { [id]: { id, name, results: boolean[], qids: string[], ... } }
   * 以題目 id 聚合（duel 全房同題），不靠 index，避免完賽題數不一造成錯位。
   */
  import { BANK } from '../../core/bank.js';

  let { progress = {}, myId } = $props();

  const QMAP = new Map(BANK.map((q) => [q.id, q]));

  // 只取有回報逐題結果的玩家（完賽才帶 results/qids）
  let players = $derived(
    Object.values(progress).filter((p) => Array.isArray(p.results) && Array.isArray(p.qids))
  );

  // 每題答錯者：{ qid, text, zhuyin, wrongNames: string[] }
  let perQuestion = $derived.by(() => {
    const acc = new Map(); // qid -> Set<name>
    for (const p of players) {
      p.qids.forEach((qid, i) => {
        if (p.results[i] === false) {
          if (!acc.has(qid)) acc.set(qid, []);
          acc.get(qid).push(p.name);
        }
      });
    }
    return [...acc.entries()]
      .map(([qid, wrongNames]) => {
        const q = QMAP.get(qid);
        return { qid, text: q?.text ?? qid, zhuyin: q?.zhuyin ?? '', wrongNames };
      })
      .sort((a, b) => b.wrongNames.length - a.wrongNames.length);
  });

  // 本場最菜：答錯題數最多者（平手全列）
  let worst = $derived.by(() => {
    const counts = players.map((p) => ({
      id: p.id,
      name: p.name,
      wrong: p.results.filter((r) => r === false).length
    }));
    const maxWrong = Math.max(0, ...counts.map((c) => c.wrong));
    if (maxWrong === 0) return null; // 全房全對，沒人最菜
    return { maxWrong, names: counts.filter((c) => c.wrong === maxWrong) };
  });

  // 最雷題只秀前 3 題（至少 1 人錯才有意義）
  let topTraps = $derived(perQuestion.slice(0, 3));

  const ROAST_TITLES = ['本場最菜', '注音苦手', '今日邊緣人', '魔王的點心'];
  // 用名字長度當穩定 index（避免 Math.random，SSR/重繪一致）
  function roastTitle(name) {
    return ROAST_TITLES[(name?.length ?? 0) % ROAST_TITLES.length];
  }
</script>

{#if players.length >= 2 && topTraps.length > 0}
  <div class="roast pop-in">
    <div class="roast-head">本場最雷題 <span class="sub">大家一起錯的才是好題</span></div>
    <ul class="traps">
      {#each topTraps as t (t.qid)}
        <li>
          <span class="q">{t.text}</span>
          <span class="zh">{t.zhuyin}</span>
          <span class="who">{t.wrongNames.join('、')} 答錯</span>
          <span class="cnt">{t.wrongNames.length} 人</span>
        </li>
      {/each}
    </ul>

    {#if worst}
      <div class="worst">
        <span class="medal">💩</span>
        <div class="worst-body">
          <b>{worst.names.map((n) => n.name + (n.id === myId ? '（你）' : '')).join('、')}</b>
          <span class="worst-title">{roastTitle(worst.names[0].name)}</span>
          <small>答錯 {worst.maxWrong} 題，全場最多。請回家多唸幾遍注音</small>
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .roast {
    width: 100%;
    background: #fff;
    border-radius: var(--radius);
    box-shadow: var(--shadow-card);
    padding: 0.9rem 1.1rem;
    margin-top: 0.6rem;
  }
  .roast-head {
    font-weight: 800;
    font-size: 1rem;
    margin-bottom: 0.6rem;
    display: flex;
    align-items: baseline;
    gap: 0.5rem;
  }
  .roast-head .sub { font-size: 0.72rem; color: var(--ink-soft); font-weight: 600; }

  .traps { list-style: none; margin: 0 0 0.7rem; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
  .traps li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.88rem;
    padding: 0.35rem 0.45rem;
    border-radius: 10px;
    background: var(--paper);
  }
  .traps .q { font-weight: 800; font-family: var(--font-kai); }
  .traps .zh { color: var(--berry-deep); font-weight: 700; font-size: 0.82rem; }
  .traps .who { flex: 1; color: var(--ink-soft); font-size: 0.78rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .traps .cnt { font-weight: 900; color: var(--sun); white-space: nowrap; }

  .worst {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 0.6rem 0.7rem;
    border-radius: 12px;
    background: color-mix(in srgb, var(--berry) 12%, white);
  }
  .worst .medal { font-size: 1.8rem; }
  .worst-body { display: flex; flex-direction: column; gap: 0.1rem; }
  .worst-body b { font-size: 1rem; }
  .worst-title {
    display: inline-block;
    align-self: flex-start;
    background: var(--berry-deep);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 800;
    padding: 0.1rem 0.5rem;
    border-radius: 999px;
  }
  .worst-body small { color: var(--ink-soft); font-size: 0.75rem; }
</style>
