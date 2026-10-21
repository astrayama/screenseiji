'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import BrandMark from '@/components/BrandMark'
import { MoonCardMark } from '@/components/cartaluna/MoonCardMark'
import { cartalunaLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

// Carta Luna is one page, so the header links to its sections.
const LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Together', href: '#together' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'FAQ', href: '#faq' },
]

export default function CartalunaHeader() {
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
          ? 'border-b border-cartaluna-gold/15 bg-[rgba(15,13,11,0.78)] backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/apps/cartaluna"
          className="group flex items-center gap-2.5 font-cartaluna-display text-[1.375rem] text-cartaluna-text"
        >
          <MoonCardMark size={28} />
          <span className="transition-opacity duration-300 group-hover:opacity-80">Carta Luna</span>
        </Link>

        <nav className="flex items-center gap-5 text-[13px] font-medium text-cartaluna-muted lg:gap-7">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="hidden h-16 items-center transition-colors duration-200 hover:text-cartaluna-text md:flex"
            >
              {link.label}
            </a>
          ))}
          <a
            href={cartalunaLinks.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cartaluna-btn-gold inline-flex h-9 items-center gap-1.5 px-4 text-[13px] font-semibold"
          >
            Open
            <ArrowUpRight size={15} aria-hidden />
            <span className="sr-only">Carta Luna (opens in a new tab)</span>
          </a>
          <span aria-hidden className="hidden h-4 w-px bg-cartaluna-gold/25 lg:block" />
          <Link
            href="/"
            className="hidden h-16 items-center gap-2 text-cartaluna-faint transition-colors duration-200 hover:text-cartaluna-glow lg:flex"
          >
            <BrandMark height={16} />
            Screen Sage Studios
          </Link>
        </nav>
      </div>
    </header>
  )
}
