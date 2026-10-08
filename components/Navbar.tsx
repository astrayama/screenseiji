'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import BrandMark from '@/components/BrandMark'

// Section links start with "/" so they also work from sub-pages like /side-quests.
const NAV = [
  { label: 'What I Do',   href: '/#services'    },
  { label: 'Websites',    href: '/#studio'      },
  { label: 'Tarot',       href: '/#tarot'       },
  { label: 'Apps',        href: '/#apps'        },
  { label: 'Side Quests', href: '/side-quests'  },
  { label: 'Philosophy',  href: '/#philosophy'  },
  { label: 'Connect',     href: '/#connect'     },
]

export default function Navbar() {
  const pathname = usePathname()
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
        <Link
          href="/#home"
          className="flex items-center gap-2.5 font-display text-2xl font-light tracking-wide text-foreground transition-opacity hover:opacity-75"
        >
          <BrandMark height={26} eager />
          Screen Sage
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map(link => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'story-link whitespace-nowrap text-sm font-medium transition-colors hover:text-foreground',
                pathname === link.href ? 'text-foreground' : 'text-muted',
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            className="rounded-full border border-gold/40 px-5 py-2 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            Contact
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="rounded-md p-1.5 text-muted transition-colors hover:text-foreground lg:hidden"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="glass-strong px-5 pb-5 pt-1 lg:hidden">
          <nav className="flex flex-col gap-1">
            {[...NAV, { label: 'Contact', href: '/#contact' }].map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === link.href ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-white/5 hover:text-foreground',
                  pathname === link.href ? 'text-foreground' : 'text-muted',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
