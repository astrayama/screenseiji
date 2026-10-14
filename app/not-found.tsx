import type { Metadata } from 'next'
import SiteShell from '@/components/SiteShell'
import { Sparkle } from '@/components/brand/SkyArt'
import { CHIP, PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE } from '@/components/ui'

// Next marks 404s noindex on its own; this also overrides the site-wide
// "index, follow" (robots and googlebot) so the page doesn't send mixed signals.
export const metadata: Metadata = {
  title: { absolute: 'Page not found · Screen Sage' },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
}

const WAYS_ON = [
  { label: 'Home', href: '/' },
  { label: 'Apps', href: '/apps' },
  { label: 'Tarot readings', href: '/tarot' },
  { label: 'Websites', href: '/websites' },
  { label: 'Side Quests', href: '/side-quests' },
  { label: 'About', href: '/about' },
]

export default function NotFound() {
  return (
    <SiteShell>
      <main className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8">
        <div className="relative">
          <Sparkle className="-top-8 right-2 h-6 w-6 text-orchid sm:right-10" twinkle />
          <Sparkle className="-top-1 right-12 h-3.5 w-3.5 text-lilac sm:right-24" />
          <p className={PAGE_EYEBROW}>404</p>
          <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>This page wandered off.</h1>
        </div>
        <p className="mt-6 text-base leading-8 text-plum-700 sm:text-lg">
          Even the void is pure potential. Here are a few doors that do open:
        </p>
        <nav aria-label="Ways on" className="mt-8">
          <ul className="flex flex-wrap gap-3">
            {WAYS_ON.map(link => (
              <li key={link.href}>
                <a href={link.href} className={CHIP}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </SiteShell>
  )
}
