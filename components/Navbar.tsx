'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'What I Do', href: '#services'   },
  { label: 'Apps',      href: '#apps'        },
  { label: 'Philosophy',href: '#philosophy'  },
  { label: 'Connect',   href: '#connect'     },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

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
        scrolled ? 'glass-strong shadow-panel' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="font-display text-2xl font-light tracking-wide text-foreground transition-opacity hover:opacity-75"
        >
          Screen Sage
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="story-link text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-gold/40 px-5 py-2 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            Contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground md:hidden"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass-strong px-5 pb-5 pt-1 md:hidden">
          <nav className="flex flex-col gap-1">
            {[...NAV, { label: 'Contact', href: '#contact' }].map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
