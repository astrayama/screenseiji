'use client'

import Modal from '@/components/Modal'
import { formatLongDate, groupByQuest, tilt, type LogDayEntry } from '@/lib/side-quests/display'
import InlineText from './InlineText'
import MilestoneNote from './MilestoneNote'
import PostIt from './PostIt'

interface Props {
  date: string | null
  entries: LogDayEntry[]
  onClose: () => void
}

// One day's full log: completed main quests first, then entries grouped by quest (in quest order).
export default function DayPanel({ date, entries, onClose }: Props) {
  const milestones = entries.filter(entry => entry.milestone)
  return (
    <Modal open={date !== null} onClose={onClose} eyebrow="Quest log" title={date ? formatLongDate(date) : ''}>
      <div className="space-y-7">
        {milestones.map((entry, i) => (
          <MilestoneNote key={entry.quest} entry={entry} tilt={tilt(`${date}${entry.quest}`, i) * 0.4} />
        ))}
        {groupByQuest(entries.filter(entry => !entry.milestone)).map(group => (
          <section key={group.quest}>
            <h4 className="flex items-center gap-2.5 font-eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-plum-900">
              <span aria-hidden className="postit postit-mini h-3.5 w-3.5 rounded-[2px]" style={{ '--postit': group.color } as React.CSSProperties} />
              {group.quest}
            </h4>
            <ul className="mt-3 space-y-3">
              {group.texts.map((text, i) => (
                <li key={i}>
                  <PostIt variant="note" color={group.color} tilt={tilt(`${date}${group.quest}`, i) * 0.4}>
                    <p className="text-sm leading-6">
                      <InlineText text={text} />
                    </p>
                  </PostIt>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Modal>
  )
}
