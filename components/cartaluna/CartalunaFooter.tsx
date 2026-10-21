import Link from 'next/link'
import { MoonCardMark } from '@/components/cartaluna/MoonCardMark'
import { cartalunaLinks } from '@/lib/data'

const LINK = 'transition-colors hover:text-cartaluna-text'

export default function CartalunaFooter() {
  return (
    <footer className="border-t border-cartaluna-gold/15 py-10 text-center">
      <p className="flex items-center justify-center gap-2 font-cartaluna-display text-lg text-cartaluna-text/90">
        <MoonCardMark size={22} />
        Carta Luna
        <span className="text-cartaluna-faint"> — a Screen Sage Studios app</span>
      </p>
      <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-medium text-cartaluna-muted">
        <a href={cartalunaLinks.appUrl} target="_blank" rel="noopener noreferrer" className={LINK}>
          Open Carta Luna ↗
        </a>
        <a href="#privacy" className={LINK}>Privacy</a>
        <a href="#faq" className={LINK}>FAQ</a>
        <a href={`mailto:${cartalunaLinks.supportEmail}`} className={LINK}>
          {cartalunaLinks.supportEmail}
        </a>
        <a href={cartalunaLinks.discord} target="_blank" rel="noreferrer" className={LINK}>
          Discord
        </a>
        <Link href="/" className="transition-colors hover:text-cartaluna-glow">Screen Sage</Link>
      </nav>
      <p className="mt-4 text-[13px] text-cartaluna-faint">
        More from Screen Sage Studios:{' '}
        <Link href="/apps/arcana" className="font-medium text-cartaluna-muted transition-colors hover:text-cartaluna-text">
          Arcana
        </Link>
        {' · '}
        <Link href="/apps" className="font-medium text-cartaluna-muted transition-colors hover:text-cartaluna-text">
          All apps
        </Link>
      </p>
      <p className="mt-5 text-xs text-cartaluna-faint">
        © {new Date().getFullYear()} Screen Sage Studios · Rider–Waite–Smith card art (1909) is in the public domain.
      </p>
    </footer>
  )
}
