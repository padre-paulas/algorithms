import { useLayoutEffect, useMemo, useRef } from 'react'

export type BarItem = {
  id: string
  value: number
}

type Props = {
  items: BarItem[]
  maxValue: number
  active?: Set<string>
  pivot?: string | null
  inRange?: { low: number; high: number } | null
  className?: string
}

export function Bars({ items, maxValue, active, pivot, inRange, className }: Props) {
  const elById = useRef(new Map<string, HTMLDivElement>())
  const prevRects = useRef(new Map<string, DOMRect>())

  const max = Math.max(1, maxValue)

  useLayoutEffect(() => {
    const nextRects = new Map<string, DOMRect>()
    for (const it of items) {
      const el = elById.current.get(it.id)
      if (!el) continue
      nextRects.set(it.id, el.getBoundingClientRect())
    }

    for (const it of items) {
      const el = elById.current.get(it.id)
      if (!el) continue

      const prev = prevRects.current.get(it.id)
      const next = nextRects.get(it.id)
      if (!prev || !next) continue

      const dx = prev.left - next.left
      const dy = prev.top - next.top
      if (dx === 0 && dy === 0) continue

      el.style.transform = `translate(${dx}px, ${dy}px)`
      el.style.transition = 'transform 0s'
      // Force reflow so the transform is applied before animating back.
      void el.offsetHeight
      el.style.transform = ''
      el.style.transition = 'transform 260ms cubic-bezier(.2,.8,.2,1)'
    }

    prevRects.current = nextRects
  }, [items])

  const rangeSet = useMemo(() => {
    if (!inRange) return null
    const set = new Set<number>()
    for (let i = inRange.low; i <= inRange.high; i += 1) set.add(i)
    return set
  }, [inRange])

  return (
    <div className={['bars', className].filter(Boolean).join(' ')}>
      {items.map((it, index) => {
        const heightPct = (it.value / max) * 100
        const isActive = active?.has(it.id) ?? false
        const isPivot = pivot === it.id
        const isInRange = rangeSet ? rangeSet.has(index) : false

        const classes = ['bar', isActive ? 'active' : '', isPivot ? 'pivot' : '', isInRange ? 'range' : '']
          .filter(Boolean)
          .join(' ')

        return (
          <div
            key={it.id}
            ref={(node) => {
              if (!node) elById.current.delete(it.id)
              else elById.current.set(it.id, node)
            }}
            className={classes}
            style={{ height: `${heightPct}%` }}
            title={`${it.value}`}
          />
        )
      })}
    </div>
  )
}

