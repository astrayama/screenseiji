'use client'

import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

/** Fades a block up into place the first time it scrolls into view. */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { reduced } = useMotionPreference()

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
