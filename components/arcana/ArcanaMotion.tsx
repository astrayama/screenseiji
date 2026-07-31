'use client'

import { MotionConfig } from 'framer-motion'

// framer-motion honors the OS prefers-reduced-motion setting from the very
// first render — unlike the useMotionPreference context, whose `reduced` flag
// is false until after hydration. With reducedMotion="user", transform/layout
// animations are disabled for reduce-motion users while opacity still
// crossfades, so nothing is ever stuck invisible.
export default function ArcanaMotion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
