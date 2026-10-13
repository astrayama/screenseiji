import { Fragment } from 'react'
import Link from 'next/link'
import type { LegalDoc } from '@/lib/app-content'

/** Theme hooks for each skin (site, Anicca); structure and linking stay shared. */
export interface LegalDocumentClasses {
  eyebrow: string
  title: string
  /** The "Effective …" line. */
  effective: string
  sectionTitle: string
  paragraph: string
  link: string
  /** The closing panel, its prompt, and its link. */
  aside: string
  asidePrompt: string
  asideLink: string
}

// Policy text can carry [label](href) links; bare URLs and emails are linked too
const LINKABLE = /(\[[^\]]+\]\([^)\s]+\)|https?:\/\/[^\s]+[^\s.,;:)]|[\w.+-]+@[\w-]+\.[\w.]+[a-z])/g
const MD_LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/

function Linkified({ text, linkClass }: { text: string; linkClass: string }) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
    const md = part.match(MD_LINK)
    const label = md ? md[1] : part
    const href = md ? md[2] : part.startsWith('http') ? part : `mailto:${part}`
    if (href.startsWith('/')) {
      return <Link key={i} href={href} className={linkClass}>{label}</Link>
    }
    const external = href.startsWith('http')
    return (
      <a
        key={i}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer' : undefined}
        className={linkClass}
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
  classes: LegalDocumentClasses
}

// Shared layout for policy pages: the site privacy policy, Anicca's privacy
// policy and terms of use. Renders the page's <main>.
export default function LegalDocument({ eyebrow, title, doc, aside, classes }: LegalDocumentProps) {
  return (
    <main className="mx-auto max-w-3xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      <p className={classes.eyebrow}>{eyebrow}</p>
      <h1 className={classes.title}>{title}</h1>
      <p className={classes.effective}>{doc.effective}</p>

      <div className="mt-12 space-y-10">
        {doc.sections.map(section => (
          <section key={section.title} id={slug(section.title)} className="scroll-mt-24">
            <h2 className={classes.sectionTitle}>{section.title}</h2>
            {section.body.map((paragraph, i) => (
              <p key={i} className={classes.paragraph}>
                <Linkified text={paragraph} linkClass={classes.link} />
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className={classes.aside}>
        <p className={classes.asidePrompt}>{aside.prompt}</p>
        <Link href={aside.href} className={classes.asideLink}>
          {aside.label}
        </Link>
      </div>
    </main>
  )
}
