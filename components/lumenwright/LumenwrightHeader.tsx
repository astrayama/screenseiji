'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import BrandMark from '@/components/BrandMark'
import { LumenMark } from '@/components/lumenwright/LumenMark'
import { lumenwrightLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

// Lumenwright is one page, so the header links to its sections.
const LINKS = [
  { label: 'Signs', href: '#signs' },
  { label: 'A run', href: '#run' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'FAQ', href: '#faq' },
]

export default function LumenwrightHeader() {
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
        scrolled ? 'border-b border-lumenwright-resolve/15 bg-[rgba(10,10,23,0.8)] backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/apps/lumenwright"
          className="group flex items-center gap-2.5 font-lumenwright-display text-[1.25rem] font-medium tracking-tight text-lumenwright-text"
        >
          <LumenMark size={28} />
          <span className="transition-opacity duration-300 group-hover:opacity-80">Lumenwright</span>
        </Link>

        <nav className="flex items-center gap-5 text-[13px] font-medium text-lumenwright-muted lg:gap-7">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hidden h-16 items-center transition-colors duration-200 hover:text-lumenwright-text md:flex"
            >
              {link.label}
            </a>
          ))}
          <a
            href={lumenwrightLinks.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="lumenwright-btn inline-flex h-9 items-center gap-1.5 px-4 text-[13px] font-semibold"
          >
            Open
            <ArrowUpRight size={15} aria-hidden />
            <span className="sr-only">Lumenwright (opens in a new tab)</span>
          </a>
          <span aria-hidden className="hidden h-4 w-px bg-lumenwright-resolve/25 lg:block" />
          <Link
            href="/"
            className="hidden h-16 items-center gap-2 text-lumenwright-faint transition-colors duration-200 hover:text-lumenwright-resolve lg:flex"
          >
            <BrandMark height={16} />
            Screen Sage Studios
          </Link>
        </nav>
      </div>
    </header>
  )
}
