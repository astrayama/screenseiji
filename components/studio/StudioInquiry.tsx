'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { HELLO_ID } from '@/lib/studio-content'

// Lets the package cards and the "Your business here" card hand off to the
// Say hello form on /studio: picking a package fills in the form's Package
// field, scrolls to the form and puts the cursor in Name.

interface Inquiry {
  /** The package picked on a card, or null for none yet. */
  picked: string | null
  /** Bumped on every pick, so picking the same package again still refocuses. */
  pickCount: number
  pick: (pkg: string | null) => void
}

const Ctx = createContext<Inquiry>({ picked: null, pickCount: 0, pick: () => {} })

export function StudioInquiryProvider({ children }: { children: React.ReactNode }) {
  const [picked, setPicked] = useState<string | null>(null)
  const [pickCount, setPickCount] = useState(0)

  const pick = useCallback((pkg: string | null) => {
    if (pkg) setPicked(pkg)
    setPickCount(n => n + 1)
    const still =
      document.documentElement.hasAttribute('data-reduced-motion') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(HELLO_ID)?.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' })
  }, [])

  const value = useMemo(() => ({ picked, pickCount, pick }), [picked, pickCount, pick])

  // reducedMotion="user": framer-motion honours the OS setting from the very
  // first render (see components/app-pages/AppMotion).
  return (
    <MotionConfig reducedMotion="user">
      <Ctx.Provider value={value}>{children}</Ctx.Provider>
    </MotionConfig>
  )
}

export function useStudioInquiry() {
  return useContext(Ctx)
}
