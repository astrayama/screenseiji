import { ArrowUpRight } from 'lucide-react'
import { arcanaLinks } from '@/lib/data'
import { cn } from '@/lib/utils'

// Public beta link, styled to sit beside the App Store badge (same height and radius).
export default function TestFlightButton({ className }: { className?: string }) {
  return (
    <a
      href={arcanaLinks.testflightUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'arcana-shimmer inline-flex h-[52px] items-center gap-3 rounded-[13px] bg-arcana-purple px-5 text-arcana-ink transition-transform duration-300 hover:-translate-y-0.5 hover:bg-arcana-purple-soft',
        className,
      )}
    >
      <span className="flex flex-col items-start leading-none">
        <span className="text-[11px] font-semibold opacity-80">Try the beta on</span>
        <span className="mt-1 text-[19px] font-bold tracking-tight">TestFlight</span>
      </span>
      <ArrowUpRight size={18} aria-hidden />
    </a>
  )
}
