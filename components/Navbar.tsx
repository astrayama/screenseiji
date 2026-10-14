'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Wordmark } from '@/components/brand/SBadge'

// Pages get their own links (each is a search landing page); home sections
// start with "/" so they also work from sub-pages like /side-quests.
// They're plain <a> on purpose: the browser handles "/#section" natively (smooth
// in-page scroll on the home page, a full load that lands on the section from
// elsewhere). Next's client router can double the hash ("/#watch#contact") on
// these, and a same-route <Link> wouldn't reset the Side Quests tab from #log.
// Side Quests, the Store and the rest live in the footer.
const NAV = [
  { label: 'Watch',    href: '/#watch'   },
  { label: 'Apps',     href: '/apps'     },
  { label: 'Tarot',    href: '/tarot'    },
  { label: 'Websites', href: '/websites' },
  { label: 'About',    href: '/about'    },
]

const SAY_HELLO = { label: 'Say hello', href: '/#contact' }

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        solid ? 'border-b border-mist/70 bg-cloud/85 shadow-card backdrop-blur-md' : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-[71rem] items-center justify-between px-5 py-3 sm:px-8 sm:py-4">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- hash link, see NAV */}
        <a href="/#home" className="transition-opacity hover:opacity-80">
          <Wordmark size={40} eager className="text-[1.75rem]" />
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV.map(link => (
            <a
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={cn(
                'whitespace-nowrap text-[15px] font-semibold text-plum-900 decoration-[1.5px] underline-offset-[6px] transition-colors hover:underline',
                pathname === link.href && 'underline',
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={SAY_HELLO.href}
            className="ml-1 rounded-full border-[1.5px] border-plum-900 bg-cloud/40 px-5 py-2 text-[15px] font-bold text-plum-900 transition-colors hover:bg-cloud"
          >
            {SAY_HELLO.label}
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.5px] border-plum-900 bg-cloud/40 text-plum-900 transition-colors hover:bg-cloud lg:hidden"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="px-5 pb-5 pt-1 lg:hidden">
          <ul className="flex flex-col gap-1">
            {[...NAV, SAY_HELLO].map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={pathname === link.href ? 'page' : undefined}
                  className={cn(
                    'block rounded-xl px-3 py-3 text-base font-semibold text-plum-900 transition-colors hover:bg-blush/50',
                    pathname === link.href && 'bg-blush/40',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
