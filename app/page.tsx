import SparkleBackground from '@/components/SparkleBackground'
import Navbar from '@/components/Navbar'
import AccessibilityPanel from '@/components/AccessibilityPanel'
import Hero from '@/components/sections/Hero'
import WhatIDo from '@/components/sections/WhatIDo'
import ContentFeed from '@/components/sections/ContentFeed'
import Tarot from '@/components/sections/Tarot'
import AppConstellation from '@/components/sections/AppConstellation'
import Shop from '@/components/sections/Shop'
import Philosophy from '@/components/sections/Philosophy'
import ConnectLinks from '@/components/sections/ConnectLinks'
import Sanctum from '@/components/sections/Sanctum'
import Contact from '@/components/sections/Contact'
import Studio from '@/components/sections/Studio'
import SiteFooter from '@/components/SiteFooter'
import SideQuestsBanner from '@/components/sections/SideQuestsBanner'
import { loadSideQuests } from '@/lib/side-quests/load'
import { activeByRecency } from '@/lib/side-quests/parse'

export default function Home() {
  const { tagline, quests } = loadSideQuests()

  return (
    <>
      <SparkleBackground />
      <Navbar />
      <main>
        <Hero />
        <WhatIDo />
        {/* Client work — set apart from the brand, a compact banner right after the offerings */}
        <Studio />
        <ContentFeed />
        <Tarot />
        <AppConstellation />
        {/* What's being built right now — the way into /side-quests */}
        <SideQuestsBanner tagline={tagline} quests={activeByRecency(quests)} />
        <Shop />
        <Philosophy />
        <ConnectLinks />
        <Sanctum />
        <Contact />
      </main>
      <SiteFooter />
      <AccessibilityPanel />
    </>
  )
}
