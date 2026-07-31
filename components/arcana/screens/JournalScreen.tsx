import TarotCard, { type CardName } from '@/components/arcana/TarotCard'
import { cn } from '@/lib/utils'
import { arcanaMock } from '@/lib/arcana-content'

const ROW_ART: (CardName | 'spread')[] = ['moon', 'spread', 'ten-of-cups', 'star', 'hermit']

// Wireframe 2d — the Journal ledger book
export default function JournalScreen() {
  const m = arcanaMock.journal

  return (
    <div className="flex flex-1 flex-col gap-3">
      {/* Month header */}
      <div className="flex items-center justify-between">
        <span className="text-[20px] text-arcana-muted">‹</span>
        <div className="text-center">
          <div className="arcana-gtx font-arcana-display text-[30px] font-medium">{m.month}</div>
          <div className="text-[12px] tracking-[0.2em] text-arcana-muted">{m.year}</div>
        </div>
        <span className="text-[20px] text-arcana-muted">›</span>
      </div>

      {/* Stats strip */}
      <div className="arcana-glass-flat flex px-2 py-[13px] text-center">
        {m.stats.map((stat, i) => (
          <div key={stat.label} className={cn('flex-1', i > 0 && 'border-l border-arcana-stroke/50')}>
            <div
              className={cn(
                'text-[17px] font-extrabold',
                i === 0 && 'text-arcana-gold',
                i === 2 && 'text-arcana-blue',
              )}
            >
              {i === 0 && '✦ '}{stat.value}
            </div>
            <div className="mt-px text-[10.5px] uppercase text-arcana-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div className="flex gap-[7px] text-[12px] font-bold">
        <span className="rounded-full border border-arcana-purple/60 bg-arcana-purple/15 px-3.5 py-[5px] text-arcana-purple-soft">All</span>
        <span className="rounded-full border border-arcana-field px-3.5 py-[5px] text-arcana-muted">Cards</span>
        <span className="rounded-full border border-arcana-field px-3.5 py-[5px] text-arcana-muted">Spreads</span>
        <span className="ml-auto rounded-full border border-arcana-field px-3.5 py-[5px] text-arcana-muted">⌕</span>
      </div>

      {/* Ledger rows */}
      <div className="arcana-glass-flat flex-1 overflow-hidden py-0.5">
        {m.rows.map((row, i) => {
          const art = ROW_ART[i]
          const [mon, day] = row.day.split(' ')
          return (
            <div
              key={i}
              className={cn(
                'flex items-center gap-3 px-3.5 py-[11px]',
                i < m.rows.length - 1 && 'border-b border-dashed border-arcana-stroke/50',
              )}
            >
              <span className="w-10 text-[11.5px] leading-[1.2] text-arcana-muted">
                {mon}
                <br />
                <b className="text-[15px] text-arcana-text">{day}</b>
              </span>
              {art === 'spread' ? (
                <div className="flex">
                  <TarotCard card="star" width={30} height={50} className="rounded-[5px]" />
                  <TarotCard card="sun" width={30} height={50} className="-ml-3.5 rounded-[5px]" />
                  <TarotCard card="ten-of-cups" width={30} height={50} className="-ml-3.5 rounded-[5px]" />
                </div>
              ) : (
                <TarotCard card={art} width={30} height={50} className="rounded-[5px]" reversed={row.dir === '↓'} />
              )}
              <div className="min-w-0 flex-1">
                <div className={cn('text-[14px] font-bold', art === 'spread' && 'text-[#9EC8E2]')}>
                  {row.title}{' '}
                  {row.dir && (
                    <span className={row.dir === '↑' ? 'text-arcana-gold' : 'text-arcana-blue'}>{row.dir}</span>
                  )}
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-arcana-muted">
                  {row.note}
                </div>
              </div>
              <span className="text-arcana-muted">›</span>
            </div>
          )
        })}
      </div>

      <div className="text-center text-[12px] text-arcana-muted">‹ swipe to flip months ›</div>
    </div>
  )
}
