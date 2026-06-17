'use client'

import { useState } from 'react'
import { Minus, Plus, Sparkles, ZapOff } from 'lucide-react'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'

const SIZES = ['16px', '18px', '20px'] as const
const LABELS = ['A', 'A+', 'A++'] as const

export default function AccessibilityPanel() {
  const { reduced, toggle } = useMotionPreference()
  const [sizeIdx, setSizeIdx] = useState(0)
  const [open, setOpen] = useState(false)

  const changeSize = (delta: number) => {
    const next = Math.max(0, Math.min(SIZES.length - 1, sizeIdx + delta))
    setSizeIdx(next)
    document.documentElement.style.setProperty('--user-font-size', SIZES[next])
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div className="glass rounded-2xl px-4 py-3 shadow-panel flex flex-col gap-3 w-44">
          {/* Motion toggle */}
          <button
            onClick={toggle}
            className={cn(
              'flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all',
              reduced
                ? 'bg-gold/15 text-gold'
                : 'bg-white/5 text-muted hover:text-foreground',
            )}
          >
            {reduced
              ? <ZapOff size={14} />
              : <Sparkles size={14} />}
            {reduced ? 'Motion off' : 'Motion on'}
          </button>

          {/* Font size */}
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => changeSize(-1)}
              disabled={sizeIdx === 0}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted transition-all hover:bg-white/10 hover:text-foreground disabled:opacity-30"
            >
              <Minus size={13} />
            </button>
            <span className="text-xs font-semibold text-muted">{LABELS[sizeIdx]}</span>
            <button
              onClick={() => changeSize(1)}
              disabled={sizeIdx === SIZES.length - 1}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-muted transition-all hover:bg-white/10 hover:text-foreground disabled:opacity-30"
            >
              <Plus size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Accessibility options"
        className={cn(
          'glass rounded-full px-4 py-2 text-xs font-semibold shadow-panel transition-all',
          open ? 'text-gold border-gold/40' : 'text-muted hover:text-foreground',
        )}
      >
        {open ? '✕ close' : '⚙ accessibility'}
      </button>
    </div>
  )
}
