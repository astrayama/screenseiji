'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { ExternalLink, Lock } from 'lucide-react'
import { FIELD } from '@/components/formStyles'
import { BUTTON_OUTLINE, BUTTON_PRIMARY, CARD } from '@/components/ui'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { cn } from '@/lib/utils'

type State = 'locked' | 'attempting' | 'unlocked' | 'wrong'

interface GatedLink {
  label: string
  href: string
}

// Checked on the server (app/api/sanctum): the password and the links it
// unlocks never ship in this file's JS. Resolves to the links, or null.
async function enter(password: string): Promise<GatedLink[] | null> {
  try {
    const res = await fetch('/api/sanctum', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data.links) ? data.links : null
  } catch {
    return null
  }
}

/** Two dashed rings turning in opposite directions, around the lock or the sparkle. */
function Rings({ spinning, children }: { spinning: boolean; children: React.ReactNode }) {
  return (
    <div className="relative h-[120px] w-[120px]">
      <svg width="120" height="120" viewBox="0 0 120 120" className={cn('absolute inset-0', spinning && 'animate-spin-slow')}>
        <circle cx="60" cy="60" r="52" fill="none" stroke="#6A4D86" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="8 6" />
      </svg>
      <svg width="120" height="120" viewBox="0 0 120 120" className={cn('absolute inset-0', spinning && 'animate-spin-reverse')}>
        <circle cx="60" cy="60" r="40" fill="none" stroke="#E9B0DA" strokeWidth="1.5" strokeDasharray="4 10" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  )
}

export default function SanctumGate() {
  const { reduced } = useMotionPreference()
  const [state, setState] = useState<State>('locked')
  const [password, setPassword] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [links, setLinks] = useState<GatedLink[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const ringControls = useAnimation()

  const handleAttempt = async () => {
    if (state === 'attempting' || !password.trim()) return
    setState('attempting')
    const unlocked = await enter(password.trim())
    if (unlocked) {
      setLinks(unlocked)
      setState('unlocked')
    } else {
      setState('wrong')
      if (!reduced) await ringControls.start({ x: [-10, 10, -8, 8, -5, 5, 0], transition: { duration: 0.4 } })
      setState('locked')
      setPassword('')
    }
  }

  const openInput = () => {
    setShowInput(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <div className="flex flex-col items-center text-center">
      <AnimatePresence mode="wait">
        {state !== 'unlocked' ? (
          <motion.div
            key="locked"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div animate={ringControls}>
              <Rings spinning>
                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border transition-colors duration-500',
                    state === 'wrong' ? 'border-alert/40 bg-alert/10 text-alert' : 'border-mist bg-cloud text-plum-700',
                  )}
                >
                  <Lock size={18} aria-hidden />
                </span>
              </Rings>
            </motion.div>

            {!showInput ? (
              <button type="button" onClick={openInput} className={BUTTON_OUTLINE}>
                Attempt entry
              </button>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleAttempt()
                }}
                className="flex w-full max-w-sm gap-2.5"
              >
                <label htmlFor="sanctum-word" className="sr-only">Word of passage</label>
                <input
                  id="sanctum-word"
                  ref={inputRef}
                  type="password"
                  autoComplete="off"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="word of passage"
                  className={cn(FIELD, 'min-w-0 flex-1 rounded-full px-5')}
                />
                <button type="submit" disabled={state === 'attempting'} className={cn(BUTTON_PRIMARY, 'shrink-0')}>
                  Enter
                </button>
              </form>
            )}
            <p role="status" className="sr-only">{state === 'wrong' ? 'That word didn’t open the door.' : ''}</p>
          </motion.div>
        ) : (
          <motion.div
            key="unlocked"
            initial={reduced ? false : { opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8"
          >
            <Rings spinning={false}>
              <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-blush text-plum-900">✦</span>
            </Rings>
            <p role="status" className="font-display text-[2rem] font-medium italic text-plum-900">Welcome, fellow seeker.</p>
            <ul className="flex flex-wrap justify-center gap-4">
              {links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(CARD, 'flex items-center gap-3 px-6 py-4 text-[15px] font-bold text-plum-900 transition-transform hover:-translate-y-0.5')}
                  >
                    {link.label}
                    <ExternalLink size={14} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
