import Link from 'next/link'
import { aniccaLinks } from '@/lib/data'
import ChakraDots from '@/components/anicca/ChakraDots'

export default function AniccaFooter() {
  return (
    <footer className="border-t border-anicca-lavender/40 py-10 text-center">
      <p className="flex items-center justify-center gap-2.5 font-anicca-display text-lg text-anicca-ink">
        <ChakraDots vertical size={3} gap={1.5} />
        <span>
          Anicca
          <span className="text-anicca-body"> — a Screen Sage Studios app</span>
        </span>
      </p>
      <nav
        aria-label="Anicca footer"
        className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-[13px] font-semibold text-anicca-body"
      >
        <Link href="/apps/anicca" className="transition-colors hover:text-anicca-violet-deep">Anicca</Link>
        <Link href="/apps/anicca/support" className="transition-colors hover:text-anicca-violet-deep">Support</Link>
        <Link href="/apps/anicca/privacy" className="transition-colors hover:text-anicca-violet-deep">Privacy</Link>
        <Link href="/apps/anicca/terms" className="transition-colors hover:text-anicca-violet-deep">Terms</Link>
        <a href={`mailto:${aniccaLinks.supportEmail}`} className="transition-colors hover:text-anicca-violet-deep">
          {aniccaLinks.supportEmail}
        </a>
        <a href={aniccaLinks.discord} target="_blank" rel="noreferrer" className="transition-colors hover:text-anicca-violet-deep">
          Discord
        </a>
        <Link href="/" className="transition-colors hover:text-anicca-violet-deep">Screen Sage</Link>
      </nav>
      <p className="mt-5 text-xs text-anicca-body">
        © {new Date().getFullYear()} Screen Sage Studios
      </p>
    </footer>
  )
}
