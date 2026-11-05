import SkyBackground from '@/components/SkyBackground'
import Navbar from '@/components/Navbar'
import AccessibilityPanel from '@/components/AccessibilityPanel'
import SiteFooter from '@/components/SiteFooter'
import SideQuestsView from '@/components/side-quests/SideQuestsView'
import MainQuestCard from '@/components/side-quests/MainQuestCard'
import MainQuestQueue from '@/components/side-quests/MainQuestQueue'
import CompletedMainQuests from '@/components/side-quests/CompletedMainQuests'
import JsonLd from '@/components/JsonLd'
import { Sparkle } from '@/components/brand/SkyArt'
import { PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE } from '@/components/ui'
import { loadSideQuests } from '@/lib/side-quests/load'
import { splitQuests, withCompletions } from '@/lib/side-quests/display'
import { cn } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'
import { pageGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('sideQuests')

// Built once from content/side-quests.md — edit that file, not this page.
export default function SideQuestsPage() {
  const { tagline, quests, entriesByDate } = loadSideQuests()
  const { main, queue, side, completed } = splitQuests(quests)
  const aside = queue.length > 0 || completed.length > 0

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
        {(main || aside) && (
          <section
            aria-label="Main quests"
            className={cn('mt-12 grid gap-5 sm:mt-14', main && aside && 'lg:grid-cols-[2fr_1fr]')}
          >
            {main && <MainQuestCard quest={main} />}
            {aside && (
              <div className="flex flex-col gap-5">
                {queue.length > 0 && <MainQuestQueue quests={queue} />}
                {completed.length > 0 && <CompletedMainQuests quests={completed} />}
              </div>
            )}
          </section>
        )}
        <SideQuestsView side={side} quests={quests} entriesByDate={withCompletions(entriesByDate, quests)} />
      </main>
      <SiteFooter />
      <AccessibilityPanel />
    </>
  )
}
