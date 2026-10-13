import type { Metadata } from 'next'
import SiteShell, { PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE } from '@/components/SiteShell'

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
        <p className={PAGE_EYEBROW}>404</p>
        <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>This page wandered off.</h1>
        <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
          Even the void is pure potential. Here are a few doors that do open:
        </p>
        <nav aria-label="Ways on" className="mt-8">
          <ul className="flex flex-wrap gap-3">
            {WAYS_ON.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="glass inline-block rounded-full px-5 py-2.5 text-sm text-foreground/85 transition-colors hover:text-foreground"
                >
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
