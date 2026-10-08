import BrandMark from '@/components/BrandMark'

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-8 text-center">
      <BrandMark height={22} className="mx-auto mb-3 opacity-80" />
      <p className="text-xs text-muted/40">
        © {new Date().getFullYear()} • made with ❤︎ by Screen Sage Studios · @screenseiji
      </p>
    </footer>
  )
}
