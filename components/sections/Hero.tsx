'use client'

import { motion } from 'framer-motion'
import { useMotionPreference } from '@/hooks/useMotionPreference'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } },
}

export default function Hero() {
  const { reduced } = useMotionPreference()

  return (
    <section
      id="home"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center"
    >
      {/* Ambient equation watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none animate-equation-pulse"
      >
        <span
          className="font-display font-light text-foreground leading-none"
          style={{ fontSize: 'clamp(5rem, 22vw, 18rem)', opacity: 'inherit', letterSpacing: '-0.02em' }}
        >
          0 = 1 = ∞
        </span>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl"
        variants={container}
        initial={reduced ? false : 'hidden'}
        animate="show"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gold"
        >
          Screen Sage
        </motion.p>

        {/* Main tagline */}
        <motion.h1
          variants={item}
          className="font-display font-light leading-[1.08] text-foreground text-glow-gold"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
        >
          Where spirituality,<br className="hidden sm:block" />{' '}
          science, and story collide.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg"
        >
          I help people see themselves clearly and evolve intentionally. A space for seekers at the crossroads of anime, metaphysics, gaming, and inner work.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#services"
            className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-background transition-all hover:bg-gold-bright hover:shadow-gold"
          >
            Enter the space
          </a>
          <a
            href="#apps"
            className="rounded-full border border-white/12 px-7 py-3 text-sm font-medium text-muted transition-all hover:border-white/25 hover:text-foreground"
          >
            See the apps
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted/60">scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-muted/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  )
}
