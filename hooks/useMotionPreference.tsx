'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface MotionCtx {
  reduced: boolean
  toggle: () => void
}

const Ctx = createContext<MotionCtx>({ reduced: false, toggle: () => {} })

export function MotionPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <Ctx.Provider value={{ reduced, toggle: () => setReduced(v => !v) }}>
      {children}
    </Ctx.Provider>
  )
}

export function useMotionPreference() {
  return useContext(Ctx)
}
