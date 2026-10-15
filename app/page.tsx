import SkyBackground from '@/components/SkyBackground'
import Navbar from '@/components/Navbar'
import AccessibilityPanel from '@/components/AccessibilityPanel'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/home/Hero'
import Watch from '@/components/home/Watch'
import Practice from '@/components/home/Practice'
import Reflect from '@/components/home/Reflect'
import Build from '@/components/home/Build'
import MeetIsa from '@/components/home/MeetIsa'
import JoinJourney from '@/components/home/JoinJourney'
import Contact from '@/components/home/Contact'
import JsonLd from '@/components/JsonLd'
import { loadSideQuests } from '@/lib/side-quests/load'
import { activeByRecency } from '@/lib/side-quests/parse'
import { pageMetadata } from '@/lib/seo'
import { homeGraph } from '@/lib/structured-data'

export const metadata = pageMetadata('home')

// Refreshes the latest video from the YouTube feed (lib/youtube.ts) hourly.
export const revalidate = 3600

// Each section is a short teaser that ends with one next step and hands off
// to its own page: /apps, /tarot, /websites, /about, /side-quests.
export default function Home() {
  const { quests } = loadSideQuests()

  return (
    <>
      <JsonLd data={homeGraph()} />
      <SkyBackground />
      <Navbar />
      <main>
        <Hero />
        <Watch />
        <Practice />
        <Reflect />
        <Build />
        {/* "Now building": a project, never the main quest or a self quest. */}
        <MeetIsa quest={activeByRecency(quests.filter(quest => quest.type === 'dev'))[0]} />
        <JoinJourney />
        <Contact />
      </main>
      <SiteFooter />
      <AccessibilityPanel />
    </>
  )
}
