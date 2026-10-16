import { Wordmark } from '@/components/brand/SBadge'
import { CloudBand, Sparkle } from '@/components/brand/SkyArt'
import { OpenAccessibilityButton } from '@/components/AccessibilityPanel'
import { socialLinks, type SocialLink } from '@/lib/data'
import { cn } from '@/lib/utils'

// Every page links to every main page from here — the paths search engines
// follow — and to the brand's profiles (rel="me": they're the same entity).
// Each social appears once, here, rather than in a section of the home page.

const [gumroad, kofi] = socialLinks.shop

const PAGES_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Apps', href: '/apps' },
  { label: 'Tarot', href: '/tarot' },
  { label: 'Websites', href: '/websites' },
  { label: 'Reviews', href: 'https://reviews.screenseiji.com', external: true },
  { label: 'Side Quests', href: '/side-quests' },
  { label: 'Store', href: gumroad.href, external: true },
]

const SOCIALS: SocialLink[] = [...socialLinks.content, ...socialLinks.listen]

const LINK = 'underline decoration-1 underline-offset-[5px] transition-colors hover:text-plum-900'

function externalRel(link: SocialLink) {
  return link.profile ? 'me noopener noreferrer' : 'noopener noreferrer'
}

export default function SiteFooter() {
  return (
    <footer
      className="relative overflow-hidden px-5 pb-36 pt-14 text-center sm:pb-44"
      style={{ background: 'linear-gradient(180deg, #F6E8F3 0%, #F5DDEC 55%, #F3D5E8 100%)' }}
    >
      <CloudBand className="h-56 sm:h-72" />
      <Sparkle className="right-[16%] top-10 h-6 w-6 text-cloud" twinkle />
      <Sparkle className="left-[18%] top-28 hidden h-4 w-4 text-cloud sm:block" twinkle style={{ animationDelay: '1.5s' }} />

      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- hash link to the home page's top */}
        <a href="/#home" className="inline-block transition-opacity hover:opacity-80">
          <Wordmark size={44} className="text-[2rem]" />
        </a>
        <p className="mt-3 font-display text-xl italic text-plum-900">You belong here, fellow seeker.</p>

        <nav aria-label="Site" className="mt-7">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[15px] font-bold text-plum-900">
            {PAGES_NAV.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="decoration-[1.5px] underline-offset-[5px] hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul aria-label="Screen Sage elsewhere" className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px] text-plum-700">
          {SOCIALS.map(link => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel={externalRel(link)} className={LINK}>
                {link.shortLabel ?? link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-plum-700">
          <a href={kofi.href} target="_blank" rel={externalRel(kofi)} className={LINK}>
            <span className="sm:hidden">Ko-fi</span>
            <span className="hidden sm:inline">Support me on Ko-fi</span>
          </a>
          <a href="/sanctum" className={LINK}>The Sanctum</a>
          <OpenAccessibilityButton className={cn(LINK, 'cursor-pointer')} />
          <a href="/privacy" className={LINK}>Privacy</a>
          <p className="w-full sm:w-auto">© {new Date().getFullYear()} Screen Sage Studios · @screenseiji</p>
        </div>
      </div>
    </footer>
  )
}
