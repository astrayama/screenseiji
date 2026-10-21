import { ArrowUpRight, RectangleGoggles, Smartphone } from 'lucide-react'
import { cartalunaLinks } from '@/lib/data'
import { cartalunaHero } from '@/lib/cartaluna-content'
import { cn } from '@/lib/utils'

/** Carta Luna runs in the browser: the main call to action opens it, in a new tab. */
export function OpenAppButton({ className, label = cartalunaHero.cta }: { className?: string; label?: string }) {
  return (
    <a
      href={cartalunaLinks.appUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'cartaluna-btn-gold inline-flex h-[52px] items-center gap-2.5 px-7 text-[15px] font-semibold transition-transform duration-300 hover:-translate-y-0.5',
        className,
      )}
    >
      {label}
      <ArrowUpRight size={18} aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}

/** Where it runs: full reading in a Quest 3, watching on anything else. */
export function DeviceNote({ className }: { className?: string }) {
  const { note } = cartalunaHero
  return (
    <ul className={cn('space-y-1.5 text-[13.5px] leading-6 text-cartaluna-muted', className)}>
      <li className="flex items-start gap-2">
        <RectangleGoggles size={16} aria-hidden className="mt-1 shrink-0 text-cartaluna-gold" />
        {note.headset}
      </li>
      <li className="flex items-start gap-2">
        <Smartphone size={16} aria-hidden className="mt-1 shrink-0 text-cartaluna-gold" />
        {note.screens}
      </li>
    </ul>
  )
}
