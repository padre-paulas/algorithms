import './App.css'

import { useMemo, useRef, useState } from 'react'
import { quicksortSteps, type SortStep } from './algorithms/quicksort'
import { Bars, type BarItem } from './components/Bars'

type SearchAlgorithm = 'linear' | 'binary'
type SortAlgorithm = 'quicksort'
type RunStatus = 'idle' | 'running' | 'paused' | 'done'
type Mode = 'search' | 'sort'

type SearchStep =
  | { type: 'compare'; index: number; value: number }
  | { type: 'binary'; low: number; high: number; mid: number; value: number }
  | { type: 'found'; index: number; value: number }
  | { type: 'not_found' }

function clampInt(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.trunc(n)))
}

function shuffle<T>(arr: T[]) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function* linearSearchSteps(arr: number[], target: number): Generator<SearchStep> {
  for (let i = 0; i < arr.length; i += 1) {
    yield { type: 'compare', index: i, value: arr[i] }
    if (arr[i] === target) {
      yield { type: 'found', index: i, value: arr[i] }
      return
    }
  }
  yield { type: 'not_found' }
}

function* binarySearchSteps(sortedArr: number[], target: number): Generator<SearchStep> {
  let low = 0
  let high = sortedArr.length - 1
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const value = sortedArr[mid]
    yield { type: 'binary', low, high, mid, value }
    if (value === target) {
      yield { type: 'found', index: mid, value }
      return
    }
    if (value < target) low = mid + 1
    else high = mid - 1
  }
  yield { type: 'not_found' }
}

function formatMs(ms: number) {
  if (!Number.isFinite(ms) || ms < 0) return '—'
  if (ms < 1000) return `${ms.toFixed(0)} ms`
  return `${(ms / 1000).toFixed(2)} s`
}

function mkId() {
  return Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2)
}

function toBarItems(values: number[]): BarItem[] {
  return values.map((v) => ({ id: mkId(), value: v }))
}

function swapInPlace<T>(a: T[], i: number, j: number) {
  ;[a[i], a[j]] = [a[j], a[i]]
}

function isSortedAsc(values: number[]) {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i - 1] > values[i]) return false
  }
  return true
}

function App() {
  const [mode, setMode] = useState<Mode>('search')
  const [searchAlgorithm, setSearchAlgorithm] = useState<SearchAlgorithm>('linear')
  const [sortAlgorithm, setSortAlgorithm] = useState<SortAlgorithm>('quicksort')
  const [nRaw, setNRaw] = useState('32')
  const [targetRaw, setTargetRaw] = useState('17')
  const [timePerOpRaw, setTimePerOpRaw] = useState('150')
  const [ensureTargetExists, setEnsureTargetExists] = useState(true)

  const n = useMemo(() => clampInt(Number(nRaw), 1, 256), [nRaw])
  const target = useMemo(() => clampInt(Number(targetRaw), -9999, 9999), [targetRaw])
  const timePerOpMs = useMemo(() => clampInt(Number(timePerOpRaw), 0, 60_000), [timePerOpRaw])

  const [items, setItems] = useState<BarItem[]>(() =>
    toBarItems(Array.from({ length: n }, (_, i) => i)),
  )
  const [status, setStatus] = useState<RunStatus>('idle')
  const [searchStep, setSearchStep] = useState<SearchStep | null>(null)
  const [sortStep, setSortStep] = useState<SortStep | null>(null)
  const [ops, setOps] = useState(0)
  const [result, setResult] = useState<{ found: boolean; index: number | null } | null>(null)

  const genRef = useRef<Generator<SearchStep | SortStep> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const isRunning = status === 'running'

  function buildArray(overrides?: {
    nextMode?: Mode
    nextSearchAlgorithm?: SearchAlgorithm
    nextN?: number
    nextTarget?: number
  }) {
    const effectiveMode = overrides?.nextMode ?? mode
    const effectiveSearchAlgorithm = overrides?.nextSearchAlgorithm ?? searchAlgorithm
    const effectiveN = overrides?.nextN ?? n
    const effectiveTarget = overrides?.nextTarget ?? target

    const base = Array.from({ length: effectiveN }, (_, i) => i)
    const normalizedTarget = clampInt(effectiveTarget, -9999, 9999)
    const shouldForceTarget = ensureTargetExists

    let nextValues: number[]
    if (effectiveMode === 'sort') {
      // Use random values for clearer bar heights; keep deterministic bounds.
      nextValues = Array.from(
        { length: effectiveN },
        () => Math.floor(Math.random() * effectiveN) + 1,
      )
    } else if (effectiveSearchAlgorithm === 'binary') {
      nextValues = base
      if (shouldForceTarget && (normalizedTarget < 0 || normalizedTarget >= effectiveN)) {
        const t = clampInt(normalizedTarget, 0, effectiveN - 1)
        setTargetRaw(String(t))
      }
    } else {
      nextValues = shuffle(base)
      if (shouldForceTarget) {
        const idx = Math.floor(Math.random() * nextValues.length)
        nextValues[idx] = clampInt(normalizedTarget, 0, effectiveN - 1)
      }
    }

    setItems(toBarItems(nextValues))
    setStatus('idle')
    setSearchStep(null)
    setSortStep(null)
    setOps(0)
    setResult(null)
    genRef.current = null
    abortRef.current?.abort()
    abortRef.current = null
  }

  function createGenerator(currentItems: BarItem[]) {
    if (mode === 'sort') {
      if (sortAlgorithm !== 'quicksort') return quicksortSteps(currentItems.map((it) => it.value))
      const values = currentItems.map((it) => it.value)
      return quicksortSteps(values)
    }
    const values = currentItems.map((it) => it.value)
    return searchAlgorithm === 'binary'
      ? binarySearchSteps(values, target)
      : linearSearchSteps(values, target)
  }

  function resetRun() {
    setStatus('idle')
    setSearchStep(null)
    setSortStep(null)
    setOps(0)
    setResult(null)
    genRef.current = null
    abortRef.current?.abort()
    abortRef.current = null
  }

  async function runLoop(seedItems?: BarItem[]) {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setStatus('running')

    const sourceItems = seedItems ?? items
    if (!genRef.current) genRef.current = createGenerator(sourceItems)

    while (!controller.signal.aborted) {
      const next = genRef.current.next()
      if (next.done) {
        setStatus('done')
        return
      }

      const s = next.value as SearchStep | SortStep

      if (mode === 'sort') {
        const st = s as SortStep
        setSortStep(st)
        setSearchStep(null)
        if (st.type === 'swap') {
          setItems((prev) => {
            const copy = [...prev]
            swapInPlace(copy, st.a, st.b)
            return copy
          })
        }
        if (st.type === 'done') setResult({ found: true, index: null })
      } else {
        const st = s as SearchStep
        setSearchStep(st)
        setSortStep(null)
        if (st.type === 'found') setResult({ found: true, index: st.index })
        if (st.type === 'not_found') setResult({ found: false, index: null })
      }

      setOps((v) => v + 1)

      if (timePerOpMs > 0) {
        await new Promise<void>((resolve) => {
          const t = setTimeout(resolve, timePerOpMs)
          controller.signal.addEventListener(
            'abort',
            () => {
              clearTimeout(t)
              resolve()
            },
            { once: true },
          )
        })
      } else {
        await Promise.resolve()
      }

      if (controller.signal.aborted) return
    }
  }

  function pause() {
    setStatus('paused')
    abortRef.current?.abort()
  }

  function stepOnce(seedItems?: BarItem[]) {
    const sourceItems = seedItems ?? items
    if (!genRef.current) genRef.current = createGenerator(sourceItems)
    const next = genRef.current.next()
    if (next.done) {
      setStatus('done')
      return
    }
    const s = next.value as SearchStep | SortStep
    setOps((v) => v + 1)

    if (mode === 'sort') {
      const st = s as SortStep
      setSortStep(st)
      setSearchStep(null)
      if (st.type === 'swap') {
        setItems((prev) => {
          const copy = [...prev]
          swapInPlace(copy, st.a, st.b)
          return copy
        })
      }
      if (st.type === 'done') {
        setStatus('done')
        return
      }
      setStatus('paused')
      return
    }

    const st = s as SearchStep
    setSearchStep(st)
    setSortStep(null)
    if (st.type === 'found') {
      setResult({ found: true, index: st.index })
      setStatus('done')
    } else if (st.type === 'not_found') {
      setResult({ found: false, index: null })
      setStatus('done')
    } else {
      setStatus('paused')
    }
  }

  // Array regeneration/reset is driven by UI handlers (not effects)
  // to satisfy react-hooks/set-state-in-effect.

  const highlights = useMemo(() => {
    const active = new Set<string>()
    let range: { low: number; high: number } | null = null
    let foundIndex: number | null = null
    let pivotId: string | null = null

    if (mode === 'sort') {
      if (sortStep?.type === 'range') range = { low: sortStep.low, high: sortStep.high }
      if (sortStep?.type === 'pivot') pivotId = items[sortStep.index]?.id ?? null
      if (sortStep?.type === 'compare') {
        const a = items[sortStep.a]?.id
        const b = items[sortStep.b]?.id
        if (a) active.add(a)
        if (b) active.add(b)
      }
      if (sortStep?.type === 'swap') {
        const a = items[sortStep.a]?.id
        const b = items[sortStep.b]?.id
        if (a) active.add(a)
        if (b) active.add(b)
      }
      return { active, range, foundIndex, pivotId }
    }

    if (searchStep?.type === 'compare') {
      const id = items[searchStep.index]?.id
      if (id) active.add(id)
    }
    if (searchStep?.type === 'binary') {
      const id = items[searchStep.mid]?.id
      if (id) active.add(id)
      range = { low: searchStep.low, high: searchStep.high }
    }
    if (result?.found && result.index != null) foundIndex = result.index
    return { active, range, foundIndex, pivotId }
  }, [items, mode, result, searchStep, sortStep])

  const approxTimeMs = ops * timePerOpMs
  const maxValue = useMemo(() => Math.max(1, ...items.map((it) => it.value)), [items])

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="mark" aria-hidden="true">
            AV
          </div>
          <div>
            <div className="title">Algorithm Visualizer</div>
            <div className="subtitle">Search • user-defined time per operation • step-by-step</div>
          </div>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="statLabel">Ops</div>
            <div className="statValue">{ops}</div>
          </div>
          <div className="stat">
            <div className="statLabel">Approx time</div>
            <div className="statValue">{formatMs(approxTimeMs)}</div>
          </div>
          <div className="stat">
            <div className="statLabel">Status</div>
            <div className="statValue">{status}</div>
          </div>
        </div>
      </header>

      <main className="layout">
        <section className="panel">
          <h2>Controls</h2>

          <div className="grid">
            <label className="field">
              <div className="labelRow">
                <span>Mode</span>
              </div>
              <select
                value={mode}
                onChange={(e) => {
                  const next = e.target.value as Mode
                  setMode(next)
                  resetRun()
                  if (!isRunning) buildArray({ nextMode: next })
                }}
                disabled={isRunning}
              >
                <option value="search">Search</option>
                <option value="sort">Sorting</option>
              </select>
            </label>

            <label className="field">
              <div className="labelRow">
                <span>{mode === 'search' ? 'Search algorithm' : 'Sorting algorithm'}</span>
              </div>
              {mode === 'search' ? (
                <select
                  value={searchAlgorithm}
                  onChange={(e) => {
                    const next = e.target.value as SearchAlgorithm
                    setSearchAlgorithm(next)
                    resetRun()
                    if (!isRunning) buildArray({ nextSearchAlgorithm: next })
                  }}
                  disabled={isRunning}
                >
                  <option value="linear">Linear search</option>
                  <option value="binary">Binary search (sorted array)</option>
                </select>
              ) : (
                <select
                  value={sortAlgorithm}
                  onChange={(e) => {
                    const next = e.target.value as SortAlgorithm
                    setSortAlgorithm(next)
                    resetRun()
                  }}
                  disabled={isRunning}
                >
                  <option value="quicksort">Quicksort</option>
                </select>
              )}
            </label>

            <label className="field">
              <div className="labelRow">
                <span>Number of elements</span>
                <span className="hint">1–256</span>
              </div>
              <input
                inputMode="numeric"
                value={nRaw}
                onChange={(e) => {
                  const raw = e.target.value
                  setNRaw(raw)
                  const nextN = clampInt(Number(raw), 1, 256)
                  resetRun()
                  if (!isRunning) buildArray({ nextN })
                }}
                disabled={isRunning}
              />
            </label>

            {mode === 'search' ? (
              <label className="field">
                <div className="labelRow">
                  <span>Target</span>
                  <span className="hint">integer</span>
                </div>
                <input
                  inputMode="numeric"
                  value={targetRaw}
                  onChange={(e) => {
                    const raw = e.target.value
                    setTargetRaw(raw)
                    const nextTarget = clampInt(Number(raw), -9999, 9999)
                    resetRun()
                    if (!isRunning) buildArray({ nextTarget })
                  }}
                  disabled={isRunning}
                />
              </label>
            ) : null}

            <label className="field">
              <div className="labelRow">
                <span>Time per operation</span>
                <span className="hint">ms</span>
              </div>
              <input
                inputMode="numeric"
                value={timePerOpRaw}
                onChange={(e) => setTimePerOpRaw(e.target.value)}
              />
            </label>

            {mode === 'search' ? (
              <label className="check">
                <input
                  type="checkbox"
                  checked={ensureTargetExists}
                  onChange={(e) => setEnsureTargetExists(e.target.checked)}
                  disabled={isRunning}
                />
                Ensure target exists in array (best for demos)
              </label>
            ) : (
              <div className="note">
                Quicksort is implemented with Lomuto partitioning. Each “operation” is a compare, swap,
                pivot selection, or range change.
              </div>
            )}
          </div>

          <div className="buttons">
            <button onClick={() => buildArray()} disabled={isRunning}>
              Generate array
            </button>
            {!isRunning ? (
              <button
                className="primary"
                onClick={() => {
                  let seedForRun: BarItem[] | undefined
                  if (mode === 'sort') {
                    const values = items.map((it) => it.value)
                    if (isSortedAsc(values)) {
                      const shuffled = shuffle(values)
                      const next = toBarItems(shuffled)
                      setItems(next)
                      genRef.current = null
                      seedForRun = next
                    }
                  }
                  if (status === 'done') resetRun()
                  void runLoop(seedForRun)
                }}
              >
                Start
              </button>
            ) : (
              <button className="primary" onClick={pause}>
                Pause
              </button>
            )}
            <button
              onClick={() => {
                let seedForRun: BarItem[] | undefined
                if (mode === 'sort') {
                  const values = items.map((it) => it.value)
                  if (isSortedAsc(values)) {
                    const shuffled = shuffle(values)
                    const next = toBarItems(shuffled)
                    setItems(next)
                    genRef.current = null
                    seedForRun = next
                  }
                }
                stepOnce(seedForRun)
              }}
              disabled={isRunning}
            >
              Step
            </button>
            <button onClick={resetRun} disabled={isRunning}>
              Reset run
            </button>
          </div>

          <div className="readout">
            <div className="readoutTitle">Current operation</div>
            <div className="readoutBody">
              {mode === 'sort' ? (
                sortStep ? (
                  sortStep.type === 'range' ? (
                    <>
                      Focus range <b>[{sortStep.low}, {sortStep.high}]</b>
                    </>
                  ) : sortStep.type === 'pivot' ? (
                    <>
                      Choose pivot at index <b>{sortStep.index}</b>
                    </>
                  ) : sortStep.type === 'compare' ? (
                    <>
                      Compare index <b>{sortStep.a}</b> with pivot index <b>{sortStep.b}</b>
                    </>
                  ) : sortStep.type === 'swap' ? (
                    <>
                      Swap indices <b>{sortStep.a}</b> and <b>{sortStep.b}</b>
                    </>
                  ) : (
                    <>Done</>
                  )
                ) : (
                  <>Ready</>
                )
              ) : searchStep ? (
                searchStep.type === 'compare' ? (
                  <>
                    Compare index <b>{searchStep.index}</b> (value <b>{searchStep.value}</b>) with
                    target <b>{target}</b>
                  </>
                ) : searchStep.type === 'binary' ? (
                  <>
                    Range <b>[{searchStep.low}, {searchStep.high}]</b>, mid <b>{searchStep.mid}</b>{' '}
                    (value <b>{searchStep.value}</b>)
                  </>
                ) : searchStep.type === 'found' ? (
                  <>
                    Found at index <b>{searchStep.index}</b> (value <b>{searchStep.value}</b>)
                  </>
                ) : (
                  <>Not found</>
                )
              ) : (
                <>Ready</>
              )}
            </div>

            <div className="result">
              {result ? (
                mode === 'sort' ? (
                  <span className="ok">Result: sorted</span>
                ) : result.found ? (
                  <span className="ok">Result: found at index {result.index}</span>
                ) : (
                  <span className="bad">Result: not found</span>
                )
              ) : (
                <span className="muted">Result: —</span>
              )}
            </div>
          </div>
        </section>

        <section className="viz">
          <h2>{mode === 'sort' ? 'Bars (value = height)' : 'Array (value = height)'}</h2>

          <div className="barStage">
            <Bars
              items={items}
              maxValue={maxValue}
              active={highlights.active}
              pivot={highlights.pivotId}
              inRange={highlights.range}
            />
          </div>

          <div className="legend">
            <span className="chip current">active</span>
            <span className="chip range">range</span>
            {mode === 'sort' ? <span className="chip pivot">pivot</span> : null}
            {mode === 'search' ? <span className="chip target">target value</span> : null}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
