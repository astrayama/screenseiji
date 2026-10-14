'use client'

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react'

interface MotionCtx {
  reduced: boolean
  toggle: () => void
}

const Ctx = createContext<MotionCtx>({ reduced: false, toggle: () => {} })

const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

export function MotionPreferenceProvider({ children }: { children: React.ReactNode }) {
  const systemReduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  )
  // null = follow the OS setting; the accessibility panel toggle overrides it.
  const [override, setOverride] = useState<boolean | null>(null)
  const reduced = override ?? systemReduced

  // CSS animations (the sky's sparkles and hearts) can't read this context,
  // so mirror it on <html> for globals.css.
  useEffect(() => {
    document.documentElement.toggleAttribute('data-reduced-motion', reduced)
  }, [reduced])

  return (
    <Ctx.Provider value={{ reduced, toggle: () => setOverride(!reduced) }}>
      {children}
    </Ctx.Provider>
  )
}

export function useMotionPreference() {
  return useContext(Ctx)
}
