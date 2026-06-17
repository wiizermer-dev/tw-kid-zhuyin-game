#!/usr/bin/env node
/**
 * 端午選題鏈回歸自檢：node scripts/duanwu-select-check.mjs
 * 驗 T4b（fact toQuestion）+ T8（event-only 隔離）+ T9（DUANWU_LEVELS chapter 鎖題）。
 * 改 bank.js selectQuestions/toQuestion 或 modes.js DUANWU_LEVELS 後必跑。
 */
import { selectQuestions, EVENT_ONLY_CATEGORIES } from '../src/core/bank.js'
import { DUANWU_LEVELS, duanwuLevelConfig, MODES } from '../src/modes.js'

let fail = 0
const ok = (cond, msg) => {
  console.log(cond ? '  ✅' : '  ❌', msg)
  if (!cond) fail++
}

console.log('=== T9: duanwu 5 關各選滿 count 題 + 鎖對 chapter + T4b fact options 正確 ===')
for (const lv of DUANWU_LEVELS) {
  const qs = selectQuestions({ ...duanwuLevelConfig(lv), seed: `room-check-${lv.n}` })
  const optsOk = qs.every(
    q =>
      q.kind === 'fact' &&
      Array.isArray(q.options) &&
      q.options.length >= 3 &&
      q.options.filter(o => o.correct).length === 1 &&
      q.options.every(o => typeof o.text === 'string' && o.text)
  )
  ok(qs.length === lv.count, `關${lv.n} ${lv.name}: 選到 ${qs.length}/${lv.count} 題`)
  ok(qs.every(q => q.chapter === lv.chapter), `關${lv.n}: 全部 chapter==${lv.chapter}`)
  ok(optsOk, `關${lv.n}: fact options 形狀正確（每題剛好 1 正解 + text 字串）`)
}

console.log('\n=== T8: event-only 隔離（一般模式抽不到 duanwu）===')
const daily = selectQuestions(MODES.daily.config(new Date('2026-06-20')))
ok(!daily.some(q => q.category === 'duanwu'), `daily(${daily.length}題): 零 duanwu`)
const sprint = selectQuestions(MODES.sprint.config())
ok(!sprint.some(q => q.category === 'duanwu'), `sprint(${sprint.length}題): 零 duanwu`)
const explicit = selectQuestions({ count: 10, categories: ['duanwu'], seed: 'x' })
ok(explicit.length === 10 && explicit.every(q => q.category === 'duanwu'), '顯式 categories:[duanwu] 抽得到')
ok(EVENT_ONLY_CATEGORIES.includes('duanwu'), 'duanwu 已列入 EVENT_ONLY_CATEGORIES')

console.log('\n=== 回歸：既有字音/反考字題 toQuestion 沒壞 ===')
const zhuyin = selectQuestions({ count: 5, categories: ['tricky'], seed: 'y' })
ok(zhuyin.every(q => q.options.some(o => o.zhuyin && o.correct)), '字音題仍有 zhuyin 選項 + 正解標記')
const charq = selectQuestions({ count: 3, categories: ['pickchar'], seed: 'z' })
ok(charq.every(q => q.options.some(o => o.char && o.correct)), '反考字題仍有 char 選項 + 正解標記')

console.log('\n=== 決定性：同 seed 同題序 ===')
const a = selectQuestions({ ...duanwuLevelConfig(DUANWU_LEVELS[0]), seed: 'det' })
const b = selectQuestions({ ...duanwuLevelConfig(DUANWU_LEVELS[0]), seed: 'det' })
ok(JSON.stringify(a.map(q => q.id)) === JSON.stringify(b.map(q => q.id)), '同 seed 選出同題序')

console.log(fail ? `\n❌ ${fail} 項失敗` : '\n✅ 全部通過')
process.exit(fail ? 1 : 0)
