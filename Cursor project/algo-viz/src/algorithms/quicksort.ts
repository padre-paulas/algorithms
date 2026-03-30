export type SortStep =
  | { type: 'range'; low: number; high: number }
  | { type: 'pivot'; index: number }
  | { type: 'compare'; a: number; b: number }
  | { type: 'swap'; a: number; b: number }
  | { type: 'done' }

export function* quicksortSteps(values: number[]): Generator<SortStep> {
  if (values.length <= 1) {
    yield { type: 'done' }
    return
  }

  const stack: Array<{ low: number; high: number }> = [{ low: 0, high: values.length - 1 }]

  while (stack.length) {
    const { low, high } = stack.pop()!
    if (low >= high) continue

    yield { type: 'range', low, high }

    // Lomuto partition using `high` as pivot.
    const pivotIndex = high
    const pivotValue = values[pivotIndex]
    yield { type: 'pivot', index: pivotIndex }

    let i = low
    for (let j = low; j < high; j += 1) {
      yield { type: 'compare', a: j, b: pivotIndex }
      if (values[j] < pivotValue) {
        if (i !== j) {
          ;[values[i], values[j]] = [values[j], values[i]]
          yield { type: 'swap', a: i, b: j }
        }
        i += 1
      }
    }

    if (i !== pivotIndex) {
      ;[values[i], values[pivotIndex]] = [values[pivotIndex], values[i]]
      yield { type: 'swap', a: i, b: pivotIndex }
    }

    // Push larger partition first to keep stack smaller on average.
    const left = { low, high: i - 1 }
    const right = { low: i + 1, high }
    const leftSize = left.high - left.low
    const rightSize = right.high - right.low

    if (leftSize > rightSize) {
      if (left.low < left.high) stack.push(left)
      if (right.low < right.high) stack.push(right)
    } else {
      if (right.low < right.high) stack.push(right)
      if (left.low < left.high) stack.push(left)
    }
  }

  yield { type: 'done' }
}

