'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const LINKS = [
  { label: 'Support', href: '/apps/arcana/support' },
  { label: 'Privacy', href: '/apps/arcana/privacy' },
]

export default function ArcanaHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-arcana-stroke/50 bg-[rgba(16,14,26,0.74)] backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/apps/arcana"
          className="group flex items-baseline gap-2 font-arcana-display text-2xl text-arcana-text"
        >
          <span className="animate-arcana-spark text-base text-arcana-star">✦</span>
          <span className="transition-opacity duration-300 group-hover:opacity-80">Arcana</span>
        </Link>

        <nav className="flex items-center gap-4 text-[13px] font-semibold text-arcana-muted sm:gap-7">
          {LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="flex h-16 items-center transition-colors duration-200 hover:text-arcana-text"
            >
              {link.label}
            </Link>
          ))}
          <span aria-hidden className="hidden h-4 w-px bg-arcana-stroke/60 sm:block" />
          <Link
            href="/"
            className="hidden h-16 items-center text-arcana-faint transition-colors duration-200 hover:text-arcana-purple-soft sm:flex"
          >
            Screen Sage Studios
          </Link>
        </nav>
      </div>
    </header>
  )
}
