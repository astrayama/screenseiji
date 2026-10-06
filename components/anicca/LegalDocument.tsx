import { Fragment } from 'react'
import Link from 'next/link'
import type { LegalDoc } from '@/lib/app-content'

// Policy text can carry [label](href) links; bare URLs and emails are linked too
const LINKABLE = /(\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s]+[^\s.,;:)]|[\w.+-]+@[\w-]+\.[\w.]+[a-z])/g
const MD_LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/
const LINK_CLASS =
  'break-words font-semibold text-anicca-violet-deep underline decoration-anicca-lavender underline-offset-4 transition-colors hover:text-anicca-ink hover:decoration-anicca-violet'

function Linkified({ text }: { text: string }) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    const md = part.match(MD_LINK)
    const label = md ? md[1] : part
    const href = md ? md[2] : part.startsWith('http') ? part : `mailto:${part}`
    if (href.startsWith('/')) {
      return <Link key={i} href={href} className={LINK_CLASS}>{label}</Link>
    }
    const external = href.startsWith('http')
    return (
      <a
        key={i}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={LINK_CLASS}
      >
        {label}
      </a>
    )
  })
}

function slug(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

interface LegalDocumentProps {
  eyebrow: string
  title: string
  doc: LegalDoc
  /** Closing panel — a prompt and where it leads. */
  aside: { prompt: string; label: string; href: string }
}

// Shared layout for the Anicca privacy policy and terms of use
export default function LegalDocument({ eyebrow, title, doc, aside }: LegalDocumentProps) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <p className="anicca-eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-anicca-display text-4xl leading-[1.1] text-anicca-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 text-sm text-anicca-body">{doc.effective}</p>

      <div className="mt-12 space-y-10">
        {doc.sections.map(section => (
          <section key={section.title} id={slug(section.title)} className="scroll-mt-24">
            <h2 className="font-anicca-display text-2xl text-anicca-ink">{section.title}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className="mt-3 text-[15px] leading-7 text-anicca-body">
                <Linkified text={paragraph} />
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="anicca-card mt-14 flex flex-wrap items-center justify-between gap-4 p-6">
        <p className="text-sm text-anicca-muted">{aside.prompt}</p>
        <Link
          href={aside.href}
          className="rounded-sm text-sm font-bold text-anicca-violet-deep transition-colors hover:text-anicca-ink"
        >
          {aside.label}
        </Link>
      </div>
    </main>
  )
}
