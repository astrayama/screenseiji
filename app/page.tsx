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

export default function Home() {
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
