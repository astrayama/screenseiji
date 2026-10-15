'use client'

import { useSyncExternalStore } from 'react'
import { Hourglass } from 'lucide-react'
import { cn } from '@/lib/utils'
import { daysUntil, formatMediumDate, toISODate } from '@/lib/side-quests/display'

const noSubscribe = () => () => {}

function howFar(days: number): string {
  if (days === 0) return 'Today'
  if (days > 0) return days === 1 ? '1 day to go' : `${days} days to go`
  return days === -1 ? '1 day ago' : `${-days} days ago`
}

/** A quest's target date, and how far off it is. */
export default function Countdown({ target, className }: { target: string; className?: string }) {
  // "Today" comes from the viewer's clock, never the build: the page is static,
  // so the server renders just the date and the browser adds the count.
  const today = useSyncExternalStore(noSubscribe, () => toISODate(new Date()), () => null)

  return (
    <p className={cn('inline-flex items-center gap-2 rounded-2xl bg-glow px-4 py-1.5 text-sm text-plum-700', className)}>
      <Hourglass size={14} aria-hidden className="shrink-0 text-plum-500" />
      <span>
        {today ? (
          <><strong className="text-plum-900">{howFar(daysUntil(target, today))}</strong> · </>
        ) : (
          'Target '
        )}
        <time dateTime={target} className="whitespace-nowrap">{formatMediumDate(target)}</time>
      </span>
    </p>
  )
}
