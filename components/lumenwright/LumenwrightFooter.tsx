import Link from 'next/link'
import { LumenMark } from '@/components/lumenwright/LumenMark'
import { lumenwrightLinks } from '@/lib/data'

const LINK = 'transition-colors hover:text-lumenwright-text'
const APP_LINK = 'font-medium text-lumenwright-muted transition-colors hover:text-lumenwright-text'

export default function LumenwrightFooter() {
  return (
    <footer className="border-t border-lumenwright-resolve/15 py-10 text-center">
      <p className="flex items-center justify-center gap-2 font-lumenwright-display text-lg font-medium text-lumenwright-text/90">
        <LumenMark size={22} />
        Lumenwright
        <span className="font-normal text-lumenwright-faint">, a game by Screen Sage Studios</span>
      </p>
      <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-lumenwright-muted">
        <a href={lumenwrightLinks.appUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
          Open Lumenwright ↗
        </a>
        <a href="#privacy" className={LINK}>Privacy</a>
        <a href="#faq" className={LINK}>FAQ</a>
        <a href={`mailto:${lumenwrightLinks.supportEmail}`} className={LINK}>
          {lumenwrightLinks.supportEmail}
        </a>
        <a href={lumenwrightLinks.discord} target="_blank" rel="noreferrer" className={LINK}>
          Discord
        </a>
        <Link href="/" className="transition-colors hover:text-lumenwright-resolve">Screen Sage</Link>
      </nav>
      <p className="mt-4 text-[13px] text-lumenwright-faint">
        More from Screen Sage Studios:{' '}
        <Link href="/apps/arcana" className={APP_LINK}>Arcana</Link>
        {' · '}
        <Link href="/apps/anicca" className={APP_LINK}>Anicca</Link>
        {' · '}
        <Link href="/apps/cartaluna" className={APP_LINK}>Carta Luna</Link>
        {' · '}
        <Link href="/apps" className={APP_LINK}>All apps</Link>
      </p>
      <p className="mt-5 text-xs text-lumenwright-faint">© {new Date().getFullYear()} Screen Sage Studios</p>
    </footer>
  )
}
