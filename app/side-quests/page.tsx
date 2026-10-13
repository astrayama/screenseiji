import SparkleBackground from '@/components/SparkleBackground'
import Navbar from '@/components/Navbar'
import AccessibilityPanel from '@/components/AccessibilityPanel'
import SiteFooter from '@/components/SiteFooter'
import SideQuestsView from '@/components/side-quests/SideQuestsView'
import JsonLd from '@/components/JsonLd'
import { loadSideQuests } from '@/lib/side-quests/load'
import { pageMetadata } from '@/lib/seo'
import { pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('sideQuests')

// Built once from content/side-quests.md — edit that file, not this page.
export default function SideQuestsPage() {
  const { tagline, quests, entriesByDate } = loadSideQuests()

  return (
    <>
      <JsonLd data={pageGraph('sideQuests')} />
      <SparkleBackground />
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <header className="max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Side Quests</p>
          <h1
            className="font-display font-light leading-[1.1] text-foreground text-glow-gold"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4rem)' }}
          >
            {tagline}
          </h1>
        </header>
        <SideQuestsView quests={quests} entriesByDate={entriesByDate} />
      </main>
      <SiteFooter />
      <AccessibilityPanel />
    </>
  )
}
