import AppStoreBadge from '@/components/app-pages/AppStoreBadge'
import { arcanaLinks } from '@/lib/data'

export default function ArcanaAppStoreBadge({ className }: { className?: string }) {
  return <AppStoreBadge links={arcanaLinks} linkClassName="arcana-shimmer" className={className} />
}
