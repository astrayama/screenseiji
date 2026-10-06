'use client'

import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  open: boolean
  onClose: () => void
  eyebrow?: string
  title: string
  size?: 'md' | 'lg'
  children: React.ReactNode
}

// A native <dialog> shown with showModal(): focus trap, Esc-to-close and the
// top layer come for free. Content only mounts while open, so forms start fresh.
export default function Modal({ open, onClose, eyebrow, title, size = 'md', children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      // A click on the dialog element itself (not the panel inside it) is a backdrop click.
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      className={cn(
        'fixed inset-0 m-auto h-fit max-h-[90svh] overflow-y-auto rounded-3xl border border-white/10 bg-surface p-0 text-foreground shadow-panel backdrop:bg-black/70 backdrop:backdrop-blur-sm',
        size === 'lg' ? 'w-[min(40rem,calc(100%-2rem))]' : 'w-[min(34rem,calc(100%-2rem))]',
      )}
    >
      {open && (
        <div className="relative p-6 sm:p-8">
          <div className="pr-10">
            {eyebrow && (
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{eyebrow}</p>
            )}
            <h3 id={titleId} className="mt-1 font-display text-3xl font-light leading-tight">{title}</h3>
          </div>
          <div className="mt-6">{children}</div>
          {/* Last in DOM order so showModal() focuses the first field, not this. */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-white/5 hover:text-foreground sm:right-5 sm:top-5"
          >
            <X size={18} />
          </button>
        </div>
      )}
    </dialog>
  )
}
