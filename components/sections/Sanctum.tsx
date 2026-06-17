'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import { gatedLinks } from '@/lib/data'
import { ExternalLink, Lock } from 'lucide-react'

type State = 'locked' | 'attempting' | 'unlocked' | 'wrong'

export default function Sanctum() {
  const { ref, inView } = useInView<HTMLElement>()
  const [state, setState] = useState<State>('locked')
  const [password, setPassword]     = useState('')
  const [showInput, setShowInput]   = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const ringControls = useAnimation()

  const handleAttempt = async () => {
    if (password.trim() === 'seeker23') {
      setState('unlocked')
    } else {
      setState('wrong')
      await ringControls.start({ x: [-10, 10, -8, 8, -5, 5, 0], transition: { duration: 0.4 } })
      setState('locked')
      setPassword('')
    }
  }

  const openInput = () => {
    setShowInput(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <section
      id="sanctum"
      ref={ref}
      className={cn('section-pad', 'reveal', inView && 'reveal-in')}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Decorative separator */}
        <div className="flex items-center gap-4 mb-14">
          <div className="h-px flex-1 bg-white/6" />
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted/40">The Sanctum</span>
          <div className="h-px flex-1 bg-white/6" />
        </div>

        <div className="flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            {state !== 'unlocked' ? (
              <motion.div
                key="locked"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-8"
              >
                {/* Runic circle */}
                <motion.div animate={ringControls} className="relative">
                  <svg width="120" height="120" viewBox="0 0 120 120" className="animate-spin-slow">
                    <circle
                      cx="60" cy="60" r="52"
                      fill="none"
                      stroke="#24BFB2"
                      strokeWidth="1"
                      strokeOpacity="0.35"
                      strokeDasharray="8 6"
                    />
                  </svg>
                  <svg
                    width="120" height="120"
                    viewBox="0 0 120 120"
                    className="absolute inset-0 animate-spin-reverse"
                  >
                    <circle
                      cx="60" cy="60" r="40"
                      fill="none"
                      stroke="#C9943C"
                      strokeWidth="0.8"
                      strokeOpacity="0.3"
                      strokeDasharray="4 10"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500',
                      state === 'wrong'
                        ? 'border-red-500/50 bg-red-500/10'
                        : 'border-white/10 bg-white/5',
                    )}>
                      <Lock
                        size={18}
                        className={state === 'wrong' ? 'text-red-400' : 'text-muted/60'}
                      />
                    </div>
                  </div>
                </motion.div>

                <div className="max-w-sm">
                  <p className="font-display text-2xl font-light text-foreground/70">
                    Some doors require a key.
                  </p>
                  <p className="mt-2 text-sm text-muted/50">
                    Developer links and private resources live here.
                  </p>
                </div>

                <AnimatePresence>
                  {!showInput ? (
                    <motion.button
                      key="btn"
                      exit={{ opacity: 0, y: -8 }}
                      onClick={openInput}
                      className="rounded-full border border-white/10 px-7 py-3 text-sm font-medium text-muted/70 transition-all hover:border-white/20 hover:text-foreground"
                    >
                      Attempt entry
                    </motion.button>
                  ) : (
                    <motion.div
                      key="input"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2"
                    >
                      <input
                        ref={inputRef}
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleAttempt() }}
                        placeholder="word of passage"
                        className="glass rounded-full px-5 py-2.5 text-sm text-foreground placeholder:text-muted/40 outline-none focus:border-teal/40 w-48"
                      />
                      <button
                        onClick={handleAttempt}
                        className="rounded-full bg-gold/15 px-5 py-2.5 text-sm font-medium text-gold transition-all hover:bg-gold/25"
                      >
                        Enter
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="unlocked"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1,    y: 0  }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="relative">
                  <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="52" fill="none" stroke="#24BFB2" strokeWidth="1" strokeOpacity="0.6" strokeDasharray="8 6" />
                    <circle cx="60" cy="60" r="40" fill="none" stroke="#C9943C" strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 10" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-teal/40 bg-teal/10 text-teal">
                      ✦
                    </div>
                  </div>
                </div>

                <p className="font-display text-2xl font-light text-teal">
                  Welcome, fellow seeker.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  {gatedLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="glass glass-teal flex items-center gap-3 rounded-2xl px-6 py-4 text-sm font-medium text-teal transition-all hover:bg-teal/10"
                    >
                      {link.label}
                      <ExternalLink size={13} />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
