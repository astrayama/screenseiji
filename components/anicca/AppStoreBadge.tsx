import AppStoreBadge from '@/components/app-pages/AppStoreBadge'
import { aniccaLinks } from '@/lib/data'

export default function AniccaAppStoreBadge({ className }: { className?: string }) {
  return <AppStoreBadge links={aniccaLinks} className={className} />
}
