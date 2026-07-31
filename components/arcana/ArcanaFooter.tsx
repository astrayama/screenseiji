import Link from 'next/link'
import { arcanaLinks } from '@/lib/data'

export default function ArcanaFooter() {
  return (
    <footer className="border-t border-arcana-stroke/40 py-10 text-center">
      <p className="font-arcana-display text-lg text-arcana-text/90">
        <span aria-hidden className="text-arcana-star">✦</span> Arcana
        <span className="text-arcana-faint"> — a Screen Sage Studios app</span>
      </p>
      <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] font-semibold text-arcana-muted">
        <Link href="/apps/arcana" className="transition-colors hover:text-arcana-text">Arcana</Link>
        <Link href="/apps/arcana/support" className="transition-colors hover:text-arcana-text">Support</Link>
        <Link href="/apps/arcana/privacy" className="transition-colors hover:text-arcana-text">Privacy</Link>
        <a href={`mailto:${arcanaLinks.supportEmail}`} className="transition-colors hover:text-arcana-text">
          {arcanaLinks.supportEmail}
        </a>
        <a href={arcanaLinks.discord} target="_blank" rel="noreferrer" className="transition-colors hover:text-arcana-text">
          Discord
        </a>
        <Link href="/" className="transition-colors hover:text-arcana-purple-soft">Screen Sage</Link>
      </nav>
      <p className="mt-5 text-xs text-arcana-faint">
        © {new Date().getFullYear()} Screen Sage Studios · Rider–Waite–Smith imagery is in the public domain.
      </p>
    </footer>
  )
}
