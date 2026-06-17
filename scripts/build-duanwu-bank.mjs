#!/usr/bin/env node
/**
 * 把 build-duanwu-bank workflow 的 JSON 結果轉成 src/data/bank/duanwu.js。
 * 用法：node scripts/build-duanwu-bank.mjs <workflow-result.json>
 *
 * 輸入 finalQuestions 每題：{ pid, chapter, question, options[], answerText, fun, source, tags, difficulty, axis }
 * 輸出 duanwu 題 schema（kind:'fact'）：
 *   { id, kind:'fact', chapter, question, options:[string], answer:<index>, fun, source, tags, difficulty, era }
 * id 依 chapter 出現順序連號 dw-001..；answer = answerText 在 options 中的 index。
 */
import { readFileSync, writeFileSync } from 'node:fs'

const CHAPTER_ORDER = ['quyuan', 'boat', 'zongzi', 'poem', 'king']

const resultPath = process.argv[2]
if (!resultPath) {
  console.error('用法：node scripts/build-duanwu-bank.mjs <workflow-result.json>')
  process.exit(1)
}

const result = JSON.parse(readFileSync(resultPath, 'utf8'))
const questions = result.finalQuestions || result // 容許直接給題陣列

// 依 chapter 順序、各 chapter 內維持原順序排序，再連號
const sorted = [...questions].sort(
  (a, b) => CHAPTER_ORDER.indexOf(a.chapter) - CHAPTER_ORDER.indexOf(b.chapter)
)

const seen = new Set()
const out = sorted.map((q, i) => {
  const id = `dw-${String(i + 1).padStart(3, '0')}`
  if (seen.has(q.question)) throw new Error(`重複題幹：${q.question}`)
  seen.add(q.question)

  const answer = q.options.indexOf(q.answerText)
  if (answer < 0) throw new Error(`${id}: answerText「${q.answerText}」不在 options 中：${JSON.stringify(q.options)}`)
  if (q.options.length < 2 || q.options.length > 4) throw new Error(`${id}: options 數量異常 ${q.options.length}`)
  if (q.difficulty < 1 || q.difficulty > 5) throw new Error(`${id}: difficulty 異常 ${q.difficulty}`)

  return {
    id,
    kind: 'fact',
    chapter: q.chapter,
    question: q.question,
    options: q.options,
    answer,
    fun: q.fun,
    source: q.source,
    tags: q.tags || [],
    difficulty: q.difficulty,
    era: 'classic',
  }
})

// chapter 配額自檢（每關 ≥10）
const counts = {}
for (const q of out) counts[q.chapter] = (counts[q.chapter] || 0) + 1
for (const c of CHAPTER_ORDER) {
  if ((counts[c] || 0) < 10) throw new Error(`chapter ${c} 只有 ${counts[c] || 0} 題（<10，選不滿一關）`)
}

const body = `/**
 * 端午 — 端午節特別 event 知識題（fun fact，非字音）
 * kind: 'fact' 選項是多字文字，answer 為正解 index（引擎 toQuestion 會洗牌）。
 * 品管走「史實正確性」人工核（每題標 source），不走字音 audit。
 * event-only 類別：只在 duanwu 模式抽得到，不亂入 daily/sprint/levels（見 bank.js EVENT_ONLY_CATEGORIES）。
 * 由 3 輪審查 workflow 濃縮產出，過程見 docs/superpowers/duanwu-bank-build/。
 */
export default ${JSON.stringify(out, null, 2)};
`

writeFileSync('src/data/bank/duanwu.js', body)
console.log(`寫出 src/data/bank/duanwu.js：${out.length} 題`)
console.log('chapter 分佈：', counts)
const byDiff = {}
for (const q of out) byDiff[q.difficulty] = (byDiff[q.difficulty] || 0) + 1
console.log('難度分佈：', byDiff)
