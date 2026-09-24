'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import ChakraDots from '@/components/anicca/ChakraDots'

const LINKS = [
  { label: 'Support', href: '/apps/anicca/support' },
  { label: 'Privacy', href: '/apps/anicca/privacy' },
  { label: 'Terms', href: '/apps/anicca/terms' },
]

export default function AniccaHeader() {
  const pathname = usePathname()
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
          ? 'border-b border-anicca-lavender/40 bg-[rgba(245,240,250,0.8)] backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/apps/anicca"
          className="group flex items-center gap-2.5 rounded-md font-anicca-display text-2xl text-anicca-ink"
        >
          <ChakraDots vertical size={4} gap={2} />
          <span className="transition-opacity duration-300 group-hover:opacity-75">Anicca</span>
        </Link>

        <nav aria-label="Anicca" className="flex items-center gap-4 text-[13px] font-semibold text-anicca-body sm:gap-7">
          {LINKS.map(link => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex h-16 items-center transition-colors duration-200 hover:text-anicca-violet-deep',
                  active && 'text-anicca-violet-deep',
                )}
              >
                {link.label}
                {active && (
                  <span aria-hidden className="absolute inset-x-0 bottom-4 h-0.5 rounded-full bg-anicca-violet" />
                )}
              </Link>
            )
          })}
          <span aria-hidden className="hidden h-4 w-px bg-anicca-lilac/50 sm:block" />
          <Link
            href="/"
            className="hidden h-16 items-center transition-colors duration-200 hover:text-anicca-violet-deep sm:flex"
          >
            Screen Sage Studios
          </Link>
        </nav>
      </div>
    </header>
  )
}
