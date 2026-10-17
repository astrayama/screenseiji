import { Sparkle } from '@/components/brand/SkyArt'
import Fit from '@/components/home/Fit'
import { BUTTON_PRIMARY, CONTAINER, EYEBROW, H2, TEXT_LINK } from '@/components/ui'
import { reflect } from '@/lib/home-content'
import { cn } from '@/lib/utils'

// Blush in the top-left corner, fading through glow to lilac.
const PANEL =
  'radial-gradient(ellipse 60% 70% at 0% 0%, rgba(246,205,227,0.95), transparent 70%),' +
  'radial-gradient(ellipse 50% 60% at 100% 100%, rgba(221,184,228,0.6), transparent 70%),' +
  'linear-gradient(135deg, #F8E3EF 0%, #F9EEF4 55%, #F1E3F1 100%)'

export default function Reflect() {
  return (
    <section id="reflect" aria-labelledby="reflect-title" className="py-8 sm:py-[4.5rem]">
      <div className={CONTAINER}>
        <div
          className="relative grid gap-7 overflow-hidden rounded-[1.75rem] border border-white/80 px-5 py-8 shadow-card sm:p-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)] lg:items-center lg:gap-x-12"
          style={{ background: PANEL }}
        >
          <Sparkle className="right-[8%] top-8 h-5 w-5 text-cloud lg:left-[44%] lg:right-auto" twinkle />

          <div className="relative">
            <p className={EYEBROW}>{reflect.eyebrow}</p>
            <h2 id="reflect-title" className={cn(H2, 'mt-3 lg:text-[2.875rem]')}>{reflect.title}</h2>
            <p className="mt-4 text-base leading-7 text-plum-700 sm:text-[17px] sm:leading-[1.75]">
              <Fit short={reflect.short} long={reflect.lead} />
            </p>
            <p className="mt-3 text-[13px] leading-5 text-plum-700">{reflect.note}</p>
          </div>

          {/* Prices: one list on a phone, three cards side by side on desktop */}
          <ul className="relative divide-y divide-mist rounded-2xl border border-white bg-cloud/95 shadow-card lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:grid lg:grid-cols-[1fr_1fr_1.3fr] lg:gap-3 lg:divide-y-0 lg:border-0 lg:bg-transparent lg:shadow-none">
            {reflect.prices.map(item => (
              <li
                key={item.label}
                className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5 lg:h-full lg:flex-col lg:items-start lg:justify-start lg:gap-0 lg:rounded-2xl lg:border lg:border-white lg:bg-cloud lg:p-5 lg:shadow-card"
              >
                <div className="lg:contents">
                  <p className="text-lg font-bold text-plum-900 lg:font-eyebrow lg:text-[11px] lg:font-semibold lg:uppercase lg:tracking-[0.2em] lg:text-plum-700">
                    {item.label}
                  </p>
                  <p className="text-sm leading-6 text-plum-700 lg:order-3 lg:mt-1">
                    <Fit short={item.short} long={item.detail} />
                  </p>
                </div>
                <p className="shrink-0 font-display text-[2rem] font-semibold leading-none text-plum-900 lg:order-2 lg:mt-3 lg:text-[2.5rem]">
                  {item.price}
                </p>
              </li>
            ))}
          </ul>

          <div className="relative flex flex-col items-center gap-4 sm:flex-row lg:items-center">
            <a href="/tarot" className={cn(BUTTON_PRIMARY, 'w-full py-3.5 sm:w-auto')}>
              {reflect.cta}
            </a>
            <a href="/tarot#how-it-works" className={cn(TEXT_LINK, 'text-[15px]')}>
              {reflect.how}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
