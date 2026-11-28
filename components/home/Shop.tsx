import Image from 'next/image'
import { ArrowUpRight, Truck } from 'lucide-react'
import { Sparkle } from '@/components/brand/SkyArt'
import Fit from '@/components/home/Fit'
import { BUTTON_PRIMARY, CONTAINER, EYEBROW, H2, TAG } from '@/components/ui'
import { storeLink, storeSite } from '@/lib/data'
import { shop } from '@/lib/home-content'
import { cn } from '@/lib/utils'

// Lilac glowing in from the top-right, warming to blush at the bottom.
const PANEL =
  'radial-gradient(ellipse 60% 70% at 100% 0%, rgba(221,184,228,0.75), transparent 70%),' +
  'radial-gradient(ellipse 55% 60% at 0% 100%, rgba(246,205,227,0.9), transparent 70%),' +
  'linear-gradient(135deg, #F7E6F1 0%, #F9EEF4 50%, #F3E3F2 100%)'

const NEW_TAB = { target: '_blank', rel: 'noopener noreferrer' }

/** The store, Screen Sage Sanctuary, right under the hero. Every link opens the store in a new tab. */
export default function Shop() {
  return (
    <section id="shop" aria-labelledby="shop-title" className="py-8 sm:py-[4.5rem]">
      <div className={CONTAINER}>
        <div
          className="relative grid gap-7 overflow-hidden rounded-[1.75rem] border border-white/80 px-5 py-8 shadow-card sm:p-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-x-12"
          style={{ background: PANEL }}
        >
          <Sparkle className="left-[6%] top-6 h-5 w-5 text-cloud" twinkle />
          <Sparkle className="bottom-8 right-[46%] hidden h-4 w-4 text-cloud lg:block" twinkle style={{ animationDelay: '1.8s' }} />

          <div className="relative">
            <p className={EYEBROW}>
              {shop.eyebrow} · {storeSite.name}
            </p>
            <h2 id="shop-title" className={cn(H2, 'mt-3 lg:text-[2.875rem]')}>{shop.title}</h2>
            <p className="mt-4 text-base leading-7 text-plum-700 sm:text-[17px] sm:leading-[1.75]">
              <Fit short={shop.short} long={shop.lead} />
            </p>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-cloud/80 px-4 py-2 text-sm font-bold text-plum-900">
              <Truck size={16} aria-hidden />
              {storeSite.shipping}
            </p>

            <div className="mt-6 hidden lg:block">
              <ShopButton />
            </div>
          </div>

          <ul className="relative grid grid-cols-2 gap-3 sm:gap-4">
            {storeSite.featured.map(item => (
              <li key={item.href}>
                <a
                  href={storeLink('home-shop-card', item.href)}
                  {...NEW_TAB}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.375rem] border border-white bg-cloud shadow-card transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="relative block aspect-square overflow-hidden bg-blush/40">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className={cn(TAG, 'absolute left-2.5 top-2.5 rounded-full bg-cloud/90 px-2.5 py-1 text-plum-900')}>
                      {item.tag}
                    </span>
                  </span>
                  <span className="block px-3 py-3 text-[14.5px] font-bold leading-5 text-plum-900 sm:px-4">
                    {item.name}
                    <span className="sr-only"> at {storeSite.name} (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="relative lg:hidden">
            <ShopButton />
          </div>
        </div>
      </div>
    </section>
  )
}

function ShopButton() {
  return (
    <a href={storeLink('home-shop-button')} {...NEW_TAB} className={cn(BUTTON_PRIMARY, 'w-full py-3.5 sm:w-auto')}>
      {shop.cta}
      <ArrowUpRight size={17} aria-hidden />
      <span className="sr-only">at {storeSite.host} (opens in a new tab)</span>
    </a>
  )
}
