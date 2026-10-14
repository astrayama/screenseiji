'use client'

import { useEffect, useRef, useState } from 'react'
import { Minus, Plus, Sparkles, ZapOff } from 'lucide-react'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'

const SIZES = ['16px', '18px', '20px'] as const
const LABELS = ['A', 'A+', 'A++'] as const

// The footer's "Accessibility" link opens the floating panel through this event.
const OPEN_EVENT = 'screensage:open-accessibility'

/** A link-styled button (for the footer) that opens the accessibility panel. */
export function OpenAccessibilityButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Accessibility
    </button>
  )
}

const ROUND_BUTTON =
  'flex h-8 w-8 items-center justify-center rounded-lg bg-glow text-plum-900 transition-colors hover:bg-blush disabled:opacity-40'

export default function AccessibilityPanel() {
  const { reduced, toggle } = useMotionPreference()
  const [sizeIdx, setSizeIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const openPanel = () => {
      setOpen(true)
      // Move focus into the panel so keyboard users land where they asked to go.
      requestAnimationFrame(() => panelRef.current?.querySelector('button')?.focus())
    }
    window.addEventListener(OPEN_EVENT, openPanel)
    return () => window.removeEventListener(OPEN_EVENT, openPanel)
  }, [])

  const changeSize = (delta: number) => {
    const next = Math.max(0, Math.min(SIZES.length - 1, sizeIdx + delta))
    setSizeIdx(next)
    document.documentElement.style.setProperty('--user-font-size', SIZES[next])
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div
          ref={panelRef}
          role="group"
          aria-label="Accessibility options"
          className="flex w-44 flex-col gap-3 rounded-2xl border border-mist bg-cloud px-4 py-3 shadow-float"
        >
          {/* Motion toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-pressed={reduced}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors',
              reduced ? 'bg-blush text-plum-900' : 'bg-glow/70 text-plum-700 hover:text-plum-900',
            )}
          >
            {reduced ? <ZapOff size={14} /> : <Sparkles size={14} />}
            {reduced ? 'Motion off' : 'Motion on'}
          </button>

          {/* Font size */}
          <div className="flex items-center justify-between gap-2">
            <button type="button" onClick={() => changeSize(-1)} disabled={sizeIdx === 0} aria-label="Smaller text" className={ROUND_BUTTON}>
              <Minus size={13} />
            </button>
            <span className="text-xs font-bold text-plum-700">{LABELS[sizeIdx]}</span>
            <button type="button" onClick={() => changeSize(1)} disabled={sizeIdx === SIZES.length - 1} aria-label="Larger text" className={ROUND_BUTTON}>
              <Plus size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label="Accessibility options"
        className={cn(
          'rounded-full border bg-cloud/90 px-4 py-2 text-xs font-bold shadow-card backdrop-blur transition-colors',
          open ? 'border-plum-500 text-plum-900' : 'border-mist text-plum-700 hover:text-plum-900',
        )}
      >
        {open ? '✕ close' : '⚙ accessibility'}
      </button>
    </div>
  )
}
