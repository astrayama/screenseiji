import { BUTTON_OUTLINE, BUTTON_PRIMARY, CONTAINER, EYEBROW } from '@/components/ui'
import { GoldSwash, ShopFoundScene } from '@/components/studio/StudioArt'
import { HELLO_ID, studioHero } from '@/lib/studio-content'
import { cn } from '@/lib/utils'

// The top of /studio: what it is in one line, the two ways in, and the
// drawing of a shop being found.
export default function StudioHero() {
  const [plain, italic] = studioHero.title
  return (
    <header className="relative pb-16 pt-28 sm:pt-36 lg:pb-20">
      <div className={cn(CONTAINER, 'grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10')}>
        <div>
          <p className={EYEBROW}>{studioHero.eyebrow}</p>
          <h1
            className="mt-4 font-display font-medium leading-[0.95] tracking-[-0.01em] text-plum-900"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 6.5rem)' }}
          >
            {plain}{' '}
            <span className="relative inline-block italic text-gold-deep">
              {italic}
              <GoldSwash className="-bottom-[0.14em] left-[2%] h-[0.2em] w-[96%]" delay={0.45} />
            </span>
          </h1>
          <p className="mt-7 max-w-[29rem] text-lg leading-8 text-plum-700 sm:text-xl sm:leading-9">{studioHero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#packages" className={cn(BUTTON_PRIMARY, 'py-3.5')}>
              {studioHero.primary}
            </a>
            <a href={`#${HELLO_ID}`} className={cn(BUTTON_OUTLINE, 'py-3')}>
              {studioHero.secondary}
            </a>
          </div>
          <div className="mt-10 border-t border-mist pt-5">
            <p className="font-eyebrow text-[11px] font-semibold uppercase tracking-[0.24em] text-plum-500">
              {studioHero.whoForLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {studioHero.whoFor.map(who => (
                <li key={who} className="flex items-center gap-2 text-sm text-plum-700">
                  <span aria-hidden className="text-[10px] text-gold-deep">✦</span>
                  {who}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[21rem] sm:max-w-[25rem] lg:max-w-[29rem]">
          <ShopFoundScene />
        </div>
      </div>
    </header>
  )
}
