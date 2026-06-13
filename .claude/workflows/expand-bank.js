export const meta = {
  name: 'expand-bank',
  description: '擴增題庫並同步驗題（簡編本為主）：每主題 +80 題，鑒別度判準過濾，pickchar 未滿 200 題前優先',
  whenToUse: '要擴題庫時跑。args: { topics?: string[], perTopic?: number }；不給 topics 時自動選（pickchar < 200 必入選）',
  phases: [
    { title: 'Scan', detail: '盤點現有題庫（counts / ids / texts）' },
    { title: 'Generate', detail: '多角度平行出題（超量產生再過濾）' },
    { title: 'Verify', detail: '注音對辭典稽核（moedict 粗篩 + 簡編本覆核）' },
    { title: 'Judge', detail: '鑒別度三鏡頭評審（多數決）' },
    { title: 'Write', detail: '寫入題庫 + validate（audit 移到 repo 層背景跑，避免整庫查 moedict 卡死）' }
  ]
}

// ── 參數 ───────────────────────────────────────────────────────────────
const PER_TOPIC = args?.perTopic ?? 80
const OVERGEN_FACTOR = 1.7          // 超量產生，給驗題/評審砍的餘裕
const BATCH = 10                    // 每個 generator/verifier/judge agent 處理的題數
const PICKCHAR_PRIORITY_THRESHOLD = 200
// agent model：可被 args.model 覆寫；不給就讓 agent 繼承主迴圈 model（避免釘死失效 id）
const MODEL = args?.model

const SCHEMA_DOC = `題目 schema（JS 物件，全部欄位必填，除了 kind 只有 pickchar 有）：
{ id: '<前綴>-<三位數連號>', kind: 'char'(僅 pickchar), text: '<含 target 的詞/句>', target: '<單一字，必須出現在 text 中>',
  zhuyin: '<target 的正讀注音，含聲調符號 ˊˇˋ˙，輕聲後置如 ㄉㄨㄣ˙>',
  distractors: ['1-3 個誘答'], meaning: '<白話釋義>', fun: '<記憶鉤冷知識，口語有梗>',
  tags: ['...'], difficulty: 1-5, era: 'modern'|'classic' }`

const DISCRIMINABILITY = `鑒別度判準（不合者一律不收）：
1. 會錯有理由：該字的誤讀/誤寫必須真實存在（新聞媒體、學生作文、招牌菜單常見），不可憑空捏造錯法。
2. 錯率甜蜜區：預期一般台灣成人 20%-80% 會答錯。人人會答（無鑒別度）或冷僻到無人會且學了無用（純獵奇）都不收。
3. 誘答似真：distractor 必須是合理的候選（形近/音近/常見誤寫），不能一眼排除；也絕不可本身也是對的（合法又音、教育部辭典收錄的異形寫法）。
4. 學了有收穫：答錯的人看完 meaning/fun 要有「喔原來如此」的感覺。
5. 難度誠實：difficulty 1=國小中低年級該會、3=一般大人會猶豫、5=國文老師等級。`

const CATEGORY_GUIDE = {
  pickchar: {
    prefix: 'fc', label: '錯別字（反考字）', file: 'src/data/bank/pickchar.js',
    rules: `kind: 'char' 必填。題型：給語境（text 通常是成語或常用詞）＋ target 的注音，玩家挑「正確的字」。
distractors 放形近字或常見誤寫「字」（不是注音）。誘答字不得是教育部辭典在同語境收錄的異形寫法（如「再接再礪」辭典也收，不可當誘答）。
zhuyin 是 target 在該語境的正讀，target 必須出現在 text 中。`,
    angles: ['新聞媒體最常見錯字', '成語錯別字（台灣國中會考/學測常考）', '公文書信與正式文書常錯字',
      '菜單招牌食物常錯字', '網路用語與社群常見白字', '同音假借型錯字（如在/再、的/得）',
      '形近部件混淆（如曰/日、戊戌戍）', '量詞與專有名詞錯字']
  },
  tricky: {
    prefix: 'tk', label: '易讀錯', file: 'src/data/bank/tricky.js',
    rules: `日常會遇到但大家常唸錯的字。distractors 是注音，必須是該字「常見的錯讀」，不可是該字另一個合法讀音。`,
    angles: ['新聞主播常唸錯', '地名人名', '醫療健康用語', '飲食詞彙', '3C 與生活用品', '校園常用詞', '職場用語', '節慶民俗']
  },
  polyphone: {
    prefix: 'pp', label: '破音字', file: 'src/data/bank/polyphone.js',
    rules: `多音字在特定語境的正讀。text 要把語境寫清楚讓讀音唯一。distractors 通常放該字「其他語境的讀音」——這在破音字題是合法設計，但正解必須是該語境唯一正讀。`,
    angles: ['動詞名詞異讀', '姓氏地名特讀', '文白異讀', '量詞異讀', '成語中的破音', '日常對話高頻破音', '課本經典破音', '新聞常見破音']
  },
  rare: {
    prefix: 'rr', label: '生僻字', file: 'src/data/bank/rare.js',
    rules: `冷但「有存在感」的字：會在火鍋店、中藥行、武俠小說、姓氏看到的字。純字典深處無人用的不收。`,
    angles: ['食物食材', '姓氏', '中藥與植物', '動物', '武俠小說常見', '台灣地名', '器物', '身體部位']
  },
  idiom: {
    prefix: 'id', label: '成語', file: 'src/data/bank/idiom.js',
    rules: `成語中容易唸錯的字。distractors 是常見錯讀注音。`,
    angles: ['會考學測高頻', '動物成語', '數字成語', '歷史典故', '日常口語會用到', '常被寫錯也常被唸錯', '聲調陷阱', '形近字成語']
  },
  modern: {
    prefix: 'md', label: '現代梗', file: 'src/data/bank/modern.js',
    rules: `現代生活、流行文化、網路語境中的字。era: 'modern'。`,
    angles: ['社群網路用語', '美食外送', '手遊電競', '追劇追星', '運動賽事', '理財日常', '交通通勤', '節日活動']
  },
  classical: {
    prefix: 'cl', label: '古文詩詞', file: 'src/data/bank/classical.js',
    rules: `課本古文詩詞中的難讀字，text 用原句片段。讀音以課本注（簡編本）為準。`,
    angles: ['國中課本古文', '高中課文', '唐詩', '宋詞', '論語孟子', '史記漢書', '楚辭詩經', '古文觀止']
  },
  lyrics: {
    prefix: 'ly', label: '流行歌詞', file: 'src/data/bank/lyrics.js',
    rules: `華語流行歌歌詞中的難讀字，text 用歌詞片段（短，避免著作權整段引用）。`,
    angles: ['經典老歌', '2000s 金曲', '近年流行', '台語歌借字', '搖滾樂團', '抒情天后', '饒舌歌詞', 'KTV 必點']
  }
}

// ── Phase 1: Scan ──────────────────────────────────────────────────────
phase('Scan')
const SCAN_SCHEMA = {
  type: 'object',
  properties: {
    counts: { type: 'object' },
    perCategory: {
      type: 'object',
      additionalProperties: {
        type: 'object',
        properties: {
          maxIdNum: { type: 'number' },
          texts: { type: 'array', items: { type: 'string' } },
          targets: { type: 'array', items: { type: 'string' } }
        },
        required: ['maxIdNum', 'texts', 'targets']
      }
    }
  },
  required: ['counts', 'perCategory']
}

const scan = await agent(
  `在 repo /Users/jimmytang/Desktop/projects/tw-kid-zhuyin-game 用 node 讀題庫並回報盤點。
跑類似：node -e "import('./src/data/bank/index.js').then(m => { ... console.log(JSON.stringify(out)) })"
要回報：
- counts: 各 category 題數（bankStats().byCategory）
- perCategory: 每個 category 的 { maxIdNum: 該類 id 數字最大值（如 fc-020 → 20）, texts: 該類所有 text 陣列, targets: 該類所有 target 陣列 }
完整列出，不要截斷。`,
  { label: 'scan-bank', phase: 'Scan', schema: SCAN_SCHEMA, model: MODEL }
)
if (!scan) throw new Error('scan failed')

// 自動選主題：pickchar < 200 必入選且排第一；user 指定 topics 則照用（pickchar 未達標仍強制插隊）
let topics = Array.isArray(args?.topics) && args.topics.length ? [...args.topics] : []
const pickcharCount = scan.counts.pickchar ?? 0
if (pickcharCount < PICKCHAR_PRIORITY_THRESHOLD && !topics.includes('pickchar')) topics.unshift('pickchar')
if (!topics.length) topics = ['pickchar']
topics = topics.filter((t) => CATEGORY_GUIDE[t])
log(`主題: ${topics.join(', ')}（pickchar 現有 ${pickcharCount} 題，門檻 ${PICKCHAR_PRIORITY_THRESHOLD}）`)

// ── 各主題 pipeline：Generate → Verify → Judge → Write ───────────────────
const GEN_SCHEMA = {
  type: 'object',
  properties: {
    questions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          text: { type: 'string' }, target: { type: 'string' }, zhuyin: { type: 'string' },
          kind: { type: 'string' },
          distractors: { type: 'array', items: { type: 'string' } },
          meaning: { type: 'string' }, fun: { type: 'string' },
          tags: { type: 'array', items: { type: 'string' } },
          difficulty: { type: 'number' }, era: { type: 'string' }
        },
        required: ['text', 'target', 'zhuyin', 'distractors', 'meaning', 'fun', 'tags', 'difficulty', 'era']
      }
    }
  },
  required: ['questions']
}

const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idx: { type: 'number' },
          ok: { type: 'boolean' },
          fixedZhuyin: { type: 'string' },
          reason: { type: 'string' }
        },
        required: ['idx', 'ok', 'reason']
      }
    }
  },
  required: ['results']
}

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          idx: { type: 'number' },
          keep: { type: 'boolean' },
          verdict: { type: 'string', enum: ['pass', 'not_needed', 'bad_design', 'wrong_answer', 'below_level', 'above_level'] },
          fixedDifficulty: { type: 'number' },
          reason: { type: 'string' }
        },
        required: ['idx', 'keep', 'verdict', 'reason']
      }
    }
  },
  required: ['results']
}

const report = {}

for (const topic of topics) {
  const guide = CATEGORY_GUIDE[topic]
  const cat = scan.perCategory[topic] ?? { maxIdNum: 0, texts: [], targets: [] }
  const existingTexts = new Set(cat.texts.map((t) => t.replace(/\s+/g, '')))
  const wantRaw = Math.ceil(PER_TOPIC * OVERGEN_FACTOR)
  const genAgents = Math.ceil(wantRaw / BATCH)
  log(`[${topic}] 目標 +${PER_TOPIC}，超量產生 ${wantRaw} 題（${genAgents} 個 generator）`)

  // Generate：每個 agent 一個角度，超量產生
  phase('Generate')
  const avoid = cat.texts.slice(-300).join('、')
  const rawBatches = await parallel(
    Array.from({ length: genAgents }, (_, i) => () =>
      agent(
        `你是台灣國語文出題專家，為注音對決遊戲「你ㄅㄆㄇ有ㄅ級分ㄇ」的「${guide.label}」類出 ${BATCH} 題候選。
出題角度（只出這個角度）：${guide.angles[i % guide.angles.length]}。
${SCHEMA_DOC}
本類特規：${guide.rules}
${DISCRIMINABILITY}
嚴禁與既有題目重複（既有 text 清單）：${avoid}
注音請寫你最有把握的教育部《國語辭典簡編本》正讀（後面有獨立稽核關卡，但你自己要先準）。
fun 欄位用台灣口語、有梗但不低俗；不確定的冷知識寧可寫保守。
直接回傳 JSON（不含 id，id 之後統一編）。`,
        { label: `gen:${topic}:${i}`, phase: 'Generate', schema: GEN_SCHEMA, model: MODEL }
      )
    )
  )

  // script 端去重 + 基本健檢（target 必在 text 中）
  const seen = new Set(existingTexts)
  const candidates = []
  for (const b of rawBatches.filter(Boolean)) {
    for (const q of b.questions ?? []) {
      const key = (q.text ?? '').replace(/\s+/g, '')
      if (!key || seen.has(key)) continue
      if (!q.target || !q.text.includes(q.target)) continue
      if (!Array.isArray(q.distractors) || q.distractors.length < 1 || q.distractors.length > 3) continue
      if (topic === 'pickchar') q.kind = 'char'
      seen.add(key)
      candidates.push(q)
    }
  }
  log(`[${topic}] 去重健檢後候選 ${candidates.length} 題`)

  // Verify + Judge：每 BATCH 題一組，pipeline 無 barrier
  const chunks = []
  for (let i = 0; i < candidates.length; i += BATCH) chunks.push(candidates.slice(i, i + BATCH))

  const judged = await pipeline(
    chunks,
    // Stage 1: 辭典稽核
    (chunk, _item, ci) =>
      agent(
        `稽核以下注音題候選的讀音是否正確。逐題給 verdict。
題目（idx 對應陣列位置）：
${JSON.stringify(chunk, null, 1)}
稽核方法（依序）：
1. 粗篩：用 Bash curl 萌典 API：curl -s "https://www.moedict.tw/uni/<詞或字>.json"（這是教育部《重編國語辭典修訂本》，屬退階來源）。先查整個 text 詞條，查無再查 target 單字。
2. 凡牽涉「又讀/多音/與候選 zhuyin 不一致」的題，必須用 WebFetch 回《國語辭典簡編本》覆核：https://dict.concised.moe.edu.tw/search.jsp?md=1&word=<字詞> 。簡編本說了算。
3. ${topic === 'pickchar' ? 'pickchar 額外稽核：每個 distractor 字不得是教育部辭典在同語境收錄的異形寫法（用簡編本/修訂本查「以該誘答字組成的同義詞條」是否存在，存在即 ok:false）。' : 'distractor 不得是 target 在該語境的另一個合法讀音（查到合法即 ok:false）。'}
注意輕聲格式：題庫寫後置（ㄉㄨㄣ˙），萌典寫前置（˙ㄉㄨㄣ），內容等價不算錯。
zhuyin 寫錯但正讀可查明 → ok:true 並給 fixedZhuyin。查不到、有爭議、誘答不公 → ok:false。
回傳每題 { idx, ok, fixedZhuyin?, reason }。`,
        { label: `verify:${topic}:${ci}`, phase: 'Verify', schema: VERIFY_SCHEMA, model: MODEL }
      ).then((v) => {
        if (!v) return null
        const fixed = chunk.map((q, idx) => {
          const r = v.results.find((x) => x.idx === idx)
          if (!r || !r.ok) return null
          return r.fixedZhuyin ? { ...q, zhuyin: r.fixedZhuyin } : q
        }).filter(Boolean)
        return fixed.length ? fixed : null
      }),
    // Stage 2: 鑒別度評審
    (verified, _item, ci) => {
      if (!verified) return null
      return agent(
        `你是嚴格的題目鑒別度評審。逐題判斷是否收錄進「${guide.label}」題庫。
${DISCRIMINABILITY}
本類特規：${guide.rules}
特別注意 verdict 'not_needed'（沒有考的意義：人人會 or 純獵奇冷知識）與 'bad_design'（誘答不公平、題意不清、答案有爭議）——這兩種一律 keep:false。
difficulty 標錯就給 fixedDifficulty（仍 keep:true）。
題目：
${JSON.stringify(verified, null, 1)}
回傳每題 { idx, keep, verdict, fixedDifficulty?, reason }。`,
        { label: `judge:${topic}:${ci}`, phase: 'Judge', schema: JUDGE_SCHEMA, model: MODEL }
      ).then((j) => {
        if (!j) return null
        return verified.map((q, idx) => {
          const r = j.results.find((x) => x.idx === idx)
          if (!r || !r.keep) return null
          return r.fixedDifficulty ? { ...q, difficulty: r.fixedDifficulty } : q
        }).filter(Boolean)
      })
    }
  )

  const keepers = judged.filter(Boolean).flat().slice(0, PER_TOPIC)
  log(`[${topic}] 評審後存活 ${judged.filter(Boolean).flat().length} 題，取前 ${keepers.length} 題寫入`)
  if (!keepers.length) { report[topic] = { added: 0, note: 'no survivors' }; continue }

  // Write：編 id、寫檔、validate（不在此跑 audit — 整庫逐字打 moedict 會 timeout 整個 workflow）
  phase('Write')
  const startNum = cat.maxIdNum + 1
  const withIds = keepers.map((q, i) => ({
    id: `${guide.prefix}-${String(startNum + i).padStart(3, '0')}`,
    ...(topic === 'pickchar' ? { kind: 'char' } : {}),
    ...q,
    kind: topic === 'pickchar' ? 'char' : q.kind
  }))
  const newIds = withIds.map((q) => q.id)

  const WRITE_SCHEMA = {
    type: 'object',
    properties: {
      added: { type: 'number' },
      dropped: { type: 'array', items: { type: 'string' } },
      validatePass: { type: 'boolean' }
    },
    required: ['added', 'validatePass']
  }
  const writeResult = await agent(
    `在 repo /Users/jimmytang/Desktop/projects/tw-kid-zhuyin-game 把以下題目加進 ${guide.file}。
步驟：
1. 讀檔，把新題目以與既有條目一致的程式碼風格 append 在 export default 陣列結尾（最後一個元素之後、] 之前）。維持單引號、欄位順序與縮排與既有條目一致。
2. 跑 npm run validate — 必須全過；有錯就修（schema 問題）或刪該題。
3. 不要跑 npm run audit（整庫逐字打 moedict 很慢會卡死）。注音稽核已在 workflow 的 Verify 階段對每題做過（moedict 粗篩 + 簡編本覆核），這裡只負責寫檔 + validate。
4. 回報 { added, dropped: [刪掉的 id+原因], validatePass }。
題目 JSON：
${JSON.stringify(withIds, null, 1)}`,
    { label: `write:${topic}`, phase: 'Write', schema: WRITE_SCHEMA, model: MODEL }
  )
  report[topic] = { ...(writeResult ?? { added: 0, note: 'write agent failed' }), newIds }
}

// audit 不在 workflow 內跑（整庫逐字 moedict 查詢太慢，會撞 agent stall timeout）。
// workflow 結束後在 repo 層背景跑一次：node scripts/audit-readings.mjs
// 只需人工關注 report 各 topic 的 newIds 範圍是否被 flag；誤報加 VERIFIED_OK 白名單，明確錯讀才修。
return {
  topics,
  report,
  auditHint: '題庫已寫入並通過 validate。最終稽核請在 repo 層背景跑 `node scripts/audit-readings.mjs`（勿放進 workflow，整庫查 moedict 會 timeout）。只看 report.<topic>.newIds 範圍的 flag。'
}
