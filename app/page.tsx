import SparkleBackground from '@/components/SparkleBackground'
import Navbar from '@/components/Navbar'
import AccessibilityPanel from '@/components/AccessibilityPanel'
import Hero from '@/components/sections/Hero'
import WhatIDo from '@/components/sections/WhatIDo'
import ContentFeed from '@/components/sections/ContentFeed'
import AppConstellation from '@/components/sections/AppConstellation'
import Shop from '@/components/sections/Shop'
import Philosophy from '@/components/sections/Philosophy'
import ConnectLinks from '@/components/sections/ConnectLinks'
import Sanctum from '@/components/sections/Sanctum'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <SparkleBackground />
      <Navbar />
      <main>
        <Hero />
        <WhatIDo />
        <ContentFeed />
        <AppConstellation />
        <Shop />
        <Philosophy />
        <ConnectLinks />
        <Sanctum />
        <Contact />
      </main>
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs text-muted/40">
          © {new Date().getFullYear()} Screen Sage · @screenseiji
        </p>
      </footer>
      <AccessibilityPanel />
    </>
  )
}
