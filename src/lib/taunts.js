/** 挑釁文案 — 分享卡與 share text 共用。分享不是分享遊戲，是分享戰績＋挑釁朋友 */

const TIERS = [
  {
    min: 0.75,
    lines: [
      '我拿 {score} 分，你敢進房嗎？',
      '{score} 分放這，不服來戰',
      '注音之巔等你來踢館，怕就別點'
    ]
  },
  {
    min: 0.4,
    lines: [
      '這題我居然錯了，你一定也會錯：「{word}」',
      '{score} 分，自認注音很行的來打臉',
      '半路被「{word}」陰了，換你試試'
    ]
  },
  {
    min: 0,
    lines: [
      '注音被小學生屌打，快來救我',
      '{score} 分，我需要隊友，不需要嘲笑',
      '「{word}」到底怎麼唸啦，你來唸給我看'
    ]
  }
];

/**
 * 依正確率抽一句挑釁文案。
 * @param {{ rate: number, score: number, hardestText?: string }} d rate 為 0-1 正確率
 * @returns {string}
 */
export function tauntFor({ rate, score, hardestText = '' }) {
  const tier = TIERS.find((t) => rate >= t.min) ?? TIERS[TIERS.length - 1];
  const pool = hardestText ? tier.lines : tier.lines.filter((l) => !l.includes('{word}'));
  const line = pool[Math.floor(Math.random() * pool.length)] ?? tier.lines[0];
  return line.replaceAll('{score}', String(score)).replaceAll('{word}', hardestText);
}
