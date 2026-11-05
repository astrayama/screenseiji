import { ArrowUpRight } from 'lucide-react'
import { lumenwrightLinks } from '@/lib/data'
import { lumenwrightHero } from '@/lib/lumenwright-content'
import { cn } from '@/lib/utils'

/** The main call to action: opens the game, in a new tab. */
export function OpenAppButton({ className, label = lumenwrightHero.cta }: { className?: string; label?: string }) {
  return (
    <a
      href={lumenwrightLinks.appUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'lumenwright-btn inline-flex h-[52px] items-center gap-2.5 px-7 text-[15px] font-semibold transition-transform duration-300 hover:-translate-y-0.5',
        className,
      )}
    >
      {label}
      <ArrowUpRight size={18} aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  )
}
