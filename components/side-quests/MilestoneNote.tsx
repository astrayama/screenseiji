import { Crown } from 'lucide-react'
import type { LogDayEntry } from '@/lib/side-quests/display'
import InlineText from './InlineText'
import PostIt from './PostIt'

/** A completed main quest in the Log: a larger post-it with its title and Outcome. */
export default function MilestoneNote({ entry, tilt }: { entry: LogDayEntry; tilt?: number }) {
  return (
    <PostIt variant="note" large color={entry.color} tilt={tilt}>
      <p className="flex items-center gap-1.5 font-eyebrow text-[11px] font-semibold uppercase tracking-[0.18em]">
        <Crown size={13} aria-hidden />
        Main quest complete
      </p>
      <p className="mt-2 font-display text-2xl font-medium leading-tight">{entry.quest}</p>
      {entry.text && (
        <p className="mt-1.5 text-sm leading-6">
          <InlineText text={entry.text} />
        </p>
      )}
    </PostIt>
  )
}
