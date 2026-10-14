import SkyBackground from '@/components/SkyBackground'
import Navbar from '@/components/Navbar'
import AccessibilityPanel from '@/components/AccessibilityPanel'
import SiteFooter from '@/components/SiteFooter'
import SideQuestsView from '@/components/side-quests/SideQuestsView'
import JsonLd from '@/components/JsonLd'
import { Sparkle } from '@/components/brand/SkyArt'
import { PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE } from '@/components/ui'
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
      <SkyBackground />
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <header className="relative max-w-3xl">
          <Sparkle className="-top-6 right-0 h-5 w-5 text-orchid sm:-right-10 sm:h-6 sm:w-6" twinkle />
          <p className={PAGE_EYEBROW}>Side Quests</p>
          <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>{tagline}</h1>
        </header>
        <SideQuestsView quests={quests} entriesByDate={entriesByDate} />
      </main>
      <SiteFooter />
      <AccessibilityPanel />
    </>
  )
}
