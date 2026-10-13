import BrandMark from '@/components/BrandMark'
import { profileLinks } from '@/lib/data'

// Every page links to every main page from here — the paths search engines
// follow — and to the brand's profiles (rel="me": they're the same entity).
const PAGES_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Apps', href: '/apps' },
  { label: 'Tarot readings', href: '/tarot' },
  { label: 'Websites', href: '/websites' },
  { label: 'Side Quests', href: '/side-quests' },
  { label: 'Privacy', href: '/privacy' },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 px-5 py-10 text-center">
      <BrandMark height={22} className="mx-auto mb-5 opacity-80" />
      <nav aria-label="Site">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted/80">
          {PAGES_NAV.map(link => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-foreground">{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <ul aria-label="Screen Sage elsewhere" className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted/50">
        {profileLinks.map(link => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="me noopener noreferrer" className="transition-colors hover:text-muted">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-xs text-muted/40">
        © {new Date().getFullYear()} • made with ❤︎ by Screen Sage Studios · @screenseiji
      </p>
    </footer>
  )
}
