import { EyeOff, HardDrive, LockKeyhole, ShieldAlert, Trash2 } from 'lucide-react'
import { Linkified } from '@/components/app-pages/LegalDocument'
import { cartalunaPrivacy } from '@/lib/cartaluna-content'

const POINT_ICONS = [EyeOff, Trash2, LockKeyhole]

// Carta Luna has no separate policy page: this section is its plain-language
// privacy notice, written from what the app actually does (its README's Privacy).
export default function CartalunaPrivacy() {
  const p = cartalunaPrivacy

  return (
    <section id="privacy" aria-labelledby="privacy-title" className="mx-auto max-w-5xl px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="cartaluna-eyebrow">{p.eyebrow}</p>
        <h2 id="privacy-title" className="mt-4 font-cartaluna-display text-4xl leading-[1.12] sm:text-5xl">
          {p.headline}
        </h2>
        <p className="mt-5 text-base leading-7 text-cartaluna-muted">{p.lead}</p>
      </div>

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {p.points.map((point, i) => {
          const Icon = POINT_ICONS[i]
          return (
            <li key={point.title} className="cartaluna-panel p-6">
              <Icon size={20} aria-hidden className="text-cartaluna-gold" />
              <h3 className="mt-4 font-cartaluna-display text-xl leading-snug text-cartaluna-text">{point.title}</h3>
              <p className="mt-2.5 text-[14px] leading-6 text-cartaluna-muted">{point.body}</p>
            </li>
          )
        })}
      </ul>

      <div className="mt-5 grid gap-5 md:grid-cols-[1.25fr_1fr]">
        <div className="cartaluna-panel p-6">
          <h3 className="flex items-center gap-2.5 font-cartaluna-display text-xl text-cartaluna-text">
            <HardDrive size={18} aria-hidden className="text-cartaluna-gold" />
            {p.storage.title}
          </h3>
          <dl className="mt-4 space-y-3.5">
            {p.storage.items.map(item => (
              <div key={item.key}>
                <dt className="font-mono text-[12px] text-cartaluna-glow">{item.key}</dt>
                <dd className="mt-0.5 text-[13.5px] leading-6 text-cartaluna-muted">{item.what}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 border-t border-cartaluna-gold/15 pt-4 text-[13.5px] leading-6 text-cartaluna-text">
            {p.storage.clear}
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="cartaluna-panel p-6">
            <p className="text-[13.5px] leading-6 text-cartaluna-muted">{p.relay}</p>
          </div>
          <div className="rounded-[16px] border border-cartaluna-glow/30 bg-cartaluna-glow/[0.06] p-6">
            <h3 className="flex items-center gap-2.5 font-cartaluna-display text-xl text-cartaluna-text">
              <ShieldAlert size={18} aria-hidden className="text-cartaluna-glow" />
              {p.caveat.title}
            </h3>
            <p className="mt-2.5 text-[13.5px] leading-6 text-cartaluna-muted">{p.caveat.body}</p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-[13px] leading-6 text-cartaluna-faint">
        <Linkified
          text={p.footnote}
          linkClass="text-cartaluna-muted underline decoration-cartaluna-gold/40 underline-offset-4 transition-colors hover:text-cartaluna-text"
        />
      </p>
    </section>
  )
}
