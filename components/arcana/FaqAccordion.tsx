'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'
import { arcanaFaq, type FaqItem } from '@/lib/arcana-content'

function FaqPanel({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(index === 0)
  const { ref, inView } = useInView<HTMLDivElement>()
  const { reduced } = useMotionPreference()
  const panelId = `arcana-faq-panel-${index}`

  return (
    <div
      ref={ref}
      className={cn('reveal border-b border-arcana-stroke/40 last:border-0', inView && 'reveal-in')}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center gap-4 py-5 text-left"
      >
        <span
          aria-hidden
          className={cn(
            'shrink-0 text-lg transition-all duration-300',
            open ? 'text-arcana-gold' : 'text-arcana-faint/60 group-hover:text-arcana-muted',
          )}
        >
          ✦
        </span>
        <span
          className={cn(
            'flex-1 text-[15px] font-bold transition-colors duration-200',
            open ? 'text-arcana-text' : 'text-arcana-muted group-hover:text-arcana-text',
          )}
        >
          {item.q}
        </span>
        <span
          aria-hidden
          className={cn(
            'shrink-0 text-lg transition-all duration-300',
            open ? 'rotate-45 text-arcana-gold' : 'text-arcana-faint/50',
          )}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="content"
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-9 pr-8 text-[14px] leading-7 text-arcana-muted">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqAccordion() {
  return (
    <div className="arcana-glass px-6 py-2 sm:px-8">
      {arcanaFaq.map((item, i) => (
        <FaqPanel key={item.q} item={item} index={i} />
      ))}
    </div>
  )
}
