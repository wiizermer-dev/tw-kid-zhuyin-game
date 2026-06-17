export const meta = {
  name: 'build-duanwu-bank',
  description: '端午王 event 題庫：廣建 ~150 題 fun fact 知識題 → 3 輪獨立審查濃縮 → 80~100 題',
  phases: [
    { title: 'Generate', detail: '5 chapter + 跨主題軸並行生成 ~150 題原始池' },
    { title: 'Review-1-Facts', detail: '史實查證，關鍵題 WebFetch，誤史實砍或修' },
    { title: 'Review-2-Fun', detail: 'fun fact 品質 + 去重 + 誘答梗，逐批審' },
    { title: 'Review-3-Converge', detail: '整池收斂：chapter 配額 + 難度梯度 → 選 80~100' },
  ],
}

// ---- 共用 schema ----------------------------------------------------------

// 一題 fact 知識題（生成階段產物，pid 為流水識別）
const QUESTION = {
  type: 'object',
  required: ['pid', 'chapter', 'question', 'options', 'answerText', 'fun', 'source', 'tags', 'difficulty', 'axis'],
  additionalProperties: false,
  properties: {
    pid: { type: 'string', description: '流水識別碼，如 gen-quyuan-01' },
    chapter: { type: 'string', enum: ['quyuan', 'boat', 'zongzi', 'poem', 'king'] },
    question: { type: 'string', description: '完整問句，勾奇問法' },
    options: { type: 'array', items: { type: 'string' }, minItems: 3, maxItems: 4, description: '多字選項，含正解' },
    answerText: { type: 'string', description: '正解選項的文字（須完全等於 options 之一）' },
    fun: { type: 'string', description: '一句想轉發的冷知識補充' },
    source: { type: 'string', description: '史實/科學來源' },
    tags: { type: 'array', items: { type: 'string' } },
    difficulty: { type: 'integer', minimum: 1, maximum: 5, description: '驚奇度梯度，非難背度' },
    axis: { type: 'string', description: '取材軸：人物/地理/習俗由來/時間/詩詞/同時代對照/科學破迷思/台灣在地' },
  },
}

const GEN_SCHEMA = {
  type: 'object',
  required: ['questions'],
  additionalProperties: false,
  properties: { questions: { type: 'array', items: QUESTION } },
}

// 輪 1 史實判定
const FACTS_SCHEMA = {
  type: 'object',
  required: ['verdicts'],
  additionalProperties: false,
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        required: ['pid', 'verdict', 'reason'],
        additionalProperties: false,
        properties: {
          pid: { type: 'string' },
          verdict: { type: 'string', enum: ['pass', 'fix', 'cut'], description: 'pass=史實正確;fix=需修正;cut=誤史實/誤傳無救' },
          reason: { type: 'string', description: '判定依據，引述查證來源' },
          checkedOnline: { type: 'boolean', description: '是否實際 WebFetch/WebSearch 查證過' },
          fixed: {
            type: ['object', 'null'],
            description: 'verdict=fix 時提供修正後的完整題目（同 QUESTION 形狀的關鍵欄位），否則 null',
            additionalProperties: true,
          },
        },
      },
    },
  },
}

// 輪 2 fun 品質判定
const FUN_SCHEMA = {
  type: 'object',
  required: ['verdicts'],
  additionalProperties: false,
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        required: ['pid', 'funScore', 'distractorScore', 'verdict', 'reason'],
        additionalProperties: false,
        properties: {
          pid: { type: 'string' },
          funScore: { type: 'integer', minimum: 1, maximum: 5, description: '講給朋友會哦一聲的程度' },
          distractorScore: { type: 'integer', minimum: 1, maximum: 5, description: '誘答有梗/似是而非程度（非廢答案）' },
          verdict: { type: 'string', enum: ['keep', 'polish', 'drop'], description: 'keep=好;polish=需打磨給修正;drop=平庸/重複/默背題' },
          dupOf: { type: ['string', 'null'], description: '若與另一題重複，填那題 pid' },
          reason: { type: 'string' },
          polished: { type: ['object', 'null'], description: 'verdict=polish 時提供修正後關鍵欄位', additionalProperties: true },
        },
      },
    },
  },
}

// 輪 3 收斂結果
const CONVERGE_SCHEMA = {
  type: 'object',
  required: ['selected', 'rationale', 'chapterCounts', 'difficultyCounts'],
  additionalProperties: false,
  properties: {
    selected: { type: 'array', items: { type: 'string' }, description: '最終入選的 pid 清單（80~100 個）' },
    rationale: { type: 'string', description: '收斂取捨總述' },
    chapterCounts: { type: 'object', additionalProperties: { type: 'integer' }, description: '各 chapter 入選數' },
    difficultyCounts: { type: 'object', additionalProperties: { type: 'integer' }, description: '各難度入選數' },
    notes: { type: 'array', items: { type: 'string' }, description: '逐關覆蓋/缺口備註' },
  },
}

// ---- 取材指南（注入生成 prompt）------------------------------------------

const COMMON_GUIDE = `
你在為一款「給台灣小孩與大人同樂」的注音對決遊戲生產【端午節特別 event】的知識題。
題型本質（鐵則，user 定案）：端午 event **不考字音**，全部是**端午史實 fun fact 知識題**（單選多字選項）。

調性鐵則（fun fact 感，不是考歷史）：
- 要「蛤?真的假的」「原來是這樣」的驚奇感，不是「記不記得」的默背壓力。
- 題幹用勾奇問法（「其實…」「你知道嗎」「同一時間地球另一邊」），不用考卷句型（避免「屈原是哪一國人?」這種）。
- 誘答選項要有梗或似是而非，不放廢答案——錯得有道理或錯得好笑（例：問屈原老闆，誘答放「秦始皇」明顯時代不對但好笑）。
- fun 欄位必寫一句「想轉發給別人」等級的冷知識補充（答對答錯都讀得到）。
- 通過測試：這題講給朋友聽，對方會不會「哦~」一聲。不會就重寫。

難度=驚奇度/冷門度梯度（非難背度）：
- difficulty 1：大家模糊聽過的端午趣事（為何吃粽子、划龍舟紀念誰）
- difficulty 2-3：知道的人會「對對對」、不知道會「原來如此」（汨羅江在湖南、艾草菖蒲為何掛）
- difficulty 4-5：連大人都會驚呼的冷知識（屈原與亞里斯多德同時代、端午別稱重午由來、屈原官職三閭大夫）

史實誠實邊界（重要，避免教小孩錯史實）：
- 屈原約西元前 340–前 278（戰國中後期，楚國）。
- 屈原**確切西曆生日不可考，不做「跟誰同一天生日」題**（查不到、必誤傳）。生肖題可做（《離騷》「惟庚寅吾以降」傳說生於寅年→屬虎，標 source）。
- 破迷思題的「真相」必須有科學/權威來源（標 source），別自己變成新誤傳。
- 台灣民俗題用「台灣民俗相信…」「有些地方會…」框架，不下「午時水真能化煞」這種斷言（信仰真偽不評斷）。

每題輸出欄位：pid(流水碼，格式 gen-<chapter>-NN)、chapter、question、options(3-4個含正解)、answerText(=正解選項文字)、fun、source、tags、difficulty(1-5)、axis(取材軸)。
options 第一個放正解也可以（引擎會洗牌），但 answerText 必須完全等於某個 option 字串。
`

const CHAPTERS = [
  {
    key: 'quyuan',
    label: '汨羅江畔（屈原本人 + 同時代對照）',
    diff: '1-2 為主，可有少數 3-4 的冷知識',
    focus: `屈原生平/星座爭議/生肖（寅年屬虎）/老闆楚懷王/官職三閭大夫、汨羅江地理（湖南省東北、湘江支流）、投江典故、為何百姓划船丟粽子。
**同時代對照軸（超強冷知識）**：東方同代孟子(約前372-前289)、莊子(約前369-前286)幾乎完全重疊；西方跨空間同代亞里斯多德(前384-前322)、亞歷山大大帝(前356-前323)。題例「屈原寫離騷前後，古希臘哪位哲學家正在教亞歷山大大帝?」`,
    n: 32,
  },
  {
    key: 'boat',
    label: '划龍舟（龍舟習俗由來）',
    diff: '2-3 為主',
    focus: `為何划龍舟、競渡起源（紀念屈原/驅趕江中魚蝦/水神祭祀諸說）、龍舟形制冷知識、龍頭點睛、奪標、世界各地龍舟賽。避開純背年份。`,
    n: 30,
  },
  {
    key: 'zongzi',
    label: '包粽子 + 避邪 + 科學破迷思',
    diff: '2-3 為主',
    focus: `粽子由來（投江餵魚護屈原遺體）、南北粽差異、粽子古名角黍、艾草菖蒲為何掛門。
**科學破迷思軸（fun 甜蜜點）**：立蛋——民俗說端午正午陽氣最盛才立得起來，科學真相是跟端午/節氣無關，任何時間靠蛋殼凸點+重心+手穩都立得起來；雄黃酒含砷有毒現代多改塗不喝；艾草菖蒲驅蚊半真（艾草確有驅蟲成分）。`,
    n: 30,
  },
  {
    key: 'poem',
    label: '詩詞關（端午詩詞典故）',
    diff: '3-4 為主',
    focus: `屈原作品離騷/天問/九歌、楚辭、香草美人象徵、後世端午詩詞（蘇軾/文天祥等）、詩中的端午意象。題目仍是知識題（誰寫的/典故是什麼/象徵什麼），不是默寫。`,
    n: 28,
  },
  {
    key: 'king',
    label: '端午王（綜合最冷 + 台灣在地宗教民俗）',
    diff: '4-5 為主，最冷最炸',
    focus: `端午別稱（端陽/重午/重五/天中節）由來、農曆五月初五、惡月惡日驅瘟避邪、五毒。
**台灣在地宗教民俗軸（給小孩在地共鳴）**：午時水（台灣民俗端午正午取水傳說化煞久放不壞，鹿港龍山寺有活動）、鍾馗（端午掛像驅五毒的道教捉鬼神）、香包香囊（裝艾草雄黃，台灣小孩端午常戴）、驅瘟送瘟連得上王爺信仰。跨主題大雜燴最冷知識。`,
    n: 30,
  },
]

// ---- Phase 1: 廣建 --------------------------------------------------------

phase('Generate')
log(`5 chapter 並行生成原始池，目標 ~${CHAPTERS.reduce((s, c) => s + c.n, 0)} 題`)

const genResults = await parallel(
  CHAPTERS.map((c) => () =>
    agent(
      `${COMMON_GUIDE}

【本批生成任務】chapter = "${c.key}"（${c.label}）
難度傾向：${c.diff}
取材重點：
${c.focus}

請生成 **${c.n} 題** 不重複的 fun fact 知識題。pid 用 gen-${c.key}-01 ~ gen-${c.key}-${String(c.n).padStart(2, '0')}。
盡量發散取材軸、難度有梯度、誘答有梗。寧可多生（廣建階段，後面會審查砍）。`,
      { label: `gen:${c.key}`, phase: 'Generate', schema: GEN_SCHEMA }
    )
  )
)

const rawPool = genResults.filter(Boolean).flatMap((r) => r.questions)
log(`原始池生成完成：${rawPool.length} 題`)

// ---- Phase 2: 審查輪 1 史實查證 -------------------------------------------

phase('Review-1-Facts')

// 分批，每批一個 reviewer（含 WebFetch/WebSearch 能力）
const FACT_BATCH = 16
const factBatches = []
for (let i = 0; i < rawPool.length; i += FACT_BATCH) factBatches.push(rawPool.slice(i, i + FACT_BATCH))
log(`史實審查分 ${factBatches.length} 批`)

const factVerdicts = (
  await parallel(
    factBatches.map((batch, bi) => () =>
      agent(
        `你是端午史實查證審查員（輪 1）。判定每題史實正確性，目標：絕不教小孩錯史實。

判定規則：
- pass：史實正確，常識題用既有可靠知識即可。
- fix：題目方向好但有事實錯誤（年代/地理/人物/數字等），提供 fixed（修正後的關鍵欄位 question/options/answerText/fun/source）。
- cut：誤史實或民間誤傳、或屈原確切生日這類查不到必誤傳的題，砍掉。

**必須實際查證（checkedOnline=true）的題型**（用 WebSearch/WebFetch 查官方或可信來源，對齊「外部事實必須查證」鐵則）：
- 科學破迷思題（立蛋、雄黃酒含砷、艾草驅蟲）——真相必須有科學/權威來源
- 跨時代對照題（屈原 vs 亞里斯多德/亞歷山大/孟子/莊子生卒年）——年代要對得上
- 地理題（汨羅江在哪省、楚國位置）
- 台灣在地民俗題（午時水/鍾馗/香包的民俗描述是否屬實）
其餘常識題（為何吃粽子划龍舟等）可用既有知識判 pass，checkedOnline=false。

若需要查證，請用 WebSearch 找官方/權威來源（教育部、維基、學術、NASA/物理科普等），再下判定，reason 引述來源。

reason 要具體（錯在哪、查到什麼）。每題都要有 verdict。

本批 ${batch.length} 題：
${JSON.stringify(batch, null, 1)}`,
        { label: `facts:batch${bi + 1}`, phase: 'Review-1-Facts', schema: FACTS_SCHEMA, effort: 'high' }
      )
    )
  )
)
  .filter(Boolean)
  .flatMap((r) => r.verdicts)

// 套用輪 1 判定：cut 移除，fix 套修正
const factVerdictMap = new Map(factVerdicts.map((v) => [v.pid, v]))
const afterRound1 = rawPool
  .filter((q) => factVerdictMap.get(q.pid)?.verdict !== 'cut')
  .map((q) => {
    const v = factVerdictMap.get(q.pid)
    if (v?.verdict === 'fix' && v.fixed) return { ...q, ...v.fixed, pid: q.pid, chapter: q.chapter }
    return q
  })
log(`輪 1 後：${afterRound1.length} 題（砍 ${rawPool.length - afterRound1.length}）`)

// ---- Phase 3: 審查輪 2 fun 品質 + 去重 ------------------------------------

phase('Review-2-Fun')

const FUN_BATCH = 16
const funBatches = []
for (let i = 0; i < afterRound1.length; i += FUN_BATCH) funBatches.push(afterRound1.slice(i, i + FUN_BATCH))
log(`fun 品質審查分 ${funBatches.length} 批`)

// 為去重，給每個 reviewer 看完整池的「題幹清單」當對照
const stemList = afterRound1.map((q) => `${q.pid}[${q.chapter}]: ${q.question}`).join('\n')

const funVerdicts = (
  await parallel(
    funBatches.map((batch, bi) => () =>
      agent(
        `你是 fun fact 品質審查員（輪 2）。史實已在輪 1 查過，本輪只評「好不好玩 + 誘答品質 + 重複」。

評分（1-5）：
- funScore：講給朋友聽會不會「哦~」一聲。默背題/課本題 funScore 低。
- distractorScore：誘答有梗/似是而非程度。放廢答案的 distractorScore 低。

verdict：
- keep：funScore≥4 且 distractorScore≥3，好題直接留。
- polish：方向好但題幹平淡/誘答弱/fun 欄位無聊——提供 polished（修正後 question/options/answerText/fun），保留史實不動。
- drop：平庸默背題、或與他題重複（填 dupOf 為被保留那題 pid）。

去重對照——全池題幹清單（同概念換句話問算重複，保留更 fun 的一題）：
${stemList}

本批 ${batch.length} 題：
${JSON.stringify(batch, null, 1)}`,
        { label: `fun:batch${bi + 1}`, phase: 'Review-2-Fun', schema: FUN_SCHEMA, effort: 'high' }
      )
    )
  )
)
  .filter(Boolean)
  .flatMap((r) => r.verdicts)

const funVerdictMap = new Map(funVerdicts.map((v) => [v.pid, v]))
const afterRound2 = afterRound1
  .filter((q) => funVerdictMap.get(q.pid)?.verdict !== 'drop')
  .map((q) => {
    const v = funVerdictMap.get(q.pid)
    if (v?.verdict === 'polish' && v.polished) return { ...q, ...v.polished, pid: q.pid, chapter: q.chapter }
    return q
  })
log(`輪 2 後：${afterRound2.length} 題（砍 ${afterRound1.length - afterRound2.length}）`)

// ---- Phase 4: 審查輪 3 整池收斂 -------------------------------------------

phase('Review-3-Converge')

// 給收斂 agent 帶上前兩輪分數，便於排序取捨
const scored = afterRound2.map((q) => {
  const fv = funVerdictMap.get(q.pid)
  return { ...q, _funScore: fv?.funScore ?? 3, _distractorScore: fv?.distractorScore ?? 3 }
})

const converge = await agent(
  `你是題庫總編（輪 3，最終收斂）。從通過前兩輪的題池選出 **80~100 題** 的最終題庫。

硬性配額（spec §1.2 足量驗證，必須滿足）：
- 5 個 chapter（quyuan/boat/zongzi/poem/king）**每個至少 10 題**（每關 selectQuestions count=10 要選得滿）。
- 理想各 chapter 16~20 題，給選題器留挑選餘裕。
- 難度梯度覆蓋：每個 chapter 內難度要對得上該關區間（quyuan 偏 1-2、boat/zongzi 偏 2-3、poem 偏 3-4、king 偏 4-5），且全池 1-5 難度都有分佈。

取捨原則：
- 優先保 funScore + distractorScore 高的。
- 取材軸要多元（人物/地理/習俗/時間/詩詞/同時代對照/科學破迷思/台灣在地都要有代表）。
- 同 chapter 內難度單一就補梯度，寧可換一題稍弱但難度補位的。

輸出 selected（入選 pid 清單）、rationale（取捨總述）、chapterCounts、difficultyCounts、notes（逐關覆蓋/缺口備註）。
selected 數量必須 80~100，且每 chapter ≥10。

題池（含前兩輪分數 _funScore/_distractorScore）：
${JSON.stringify(scored, null, 1)}`,
  { label: 'converge', phase: 'Review-3-Converge', schema: CONVERGE_SCHEMA, effort: 'high' }
)

// ---- 回傳所有階段產物供落地 ------------------------------------------------

return {
  rawPool,
  factVerdicts,
  afterRound1Pids: afterRound1.map((q) => q.pid),
  funVerdicts,
  afterRound2Pids: afterRound2.map((q) => q.pid),
  converge,
  finalQuestions: scored.filter((q) => converge.selected.includes(q.pid)),
  counts: {
    raw: rawPool.length,
    afterRound1: afterRound1.length,
    afterRound2: afterRound2.length,
    final: converge.selected.length,
  },
}
