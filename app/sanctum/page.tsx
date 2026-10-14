import SiteShell from '@/components/SiteShell'
import SanctumGate from '@/components/SanctumGate'
import { Sparkle } from '@/components/brand/SkyArt'
import { PAGE_EYEBROW, PAGE_TITLE, PAGE_TITLE_SIZE } from '@/components/ui'
import { pageMetadata } from '@/lib/seo'

// Linked from the footer only, and kept out of search (noindex in lib/routes.ts).
export const metadata = pageMetadata('sanctum')

export default function SanctumPage() {
  return (
    <SiteShell>
      <main className="relative mx-auto flex min-h-[75svh] max-w-3xl flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-8 sm:pt-40">
        <Sparkle className="left-[10%] top-32 h-5 w-5 text-orchid" twinkle />
        <Sparkle className="bottom-40 right-[12%] h-4 w-4 text-orchid" twinkle style={{ animationDelay: '2s' }} />
        <p className={PAGE_EYEBROW}>The Sanctum</p>
        <h1 className={PAGE_TITLE} style={PAGE_TITLE_SIZE}>Some doors require a key.</h1>
        <p className="mt-4 text-base leading-7 text-plum-700 sm:text-lg">Developer links and private resources live here.</p>
        <div className="mt-12 w-full">
          <SanctumGate />
        </div>
      </main>
    </SiteShell>
  )
}
