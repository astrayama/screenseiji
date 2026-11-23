import { H2 } from '@/components/ui'
import { cn } from '@/lib/utils'

/** A section heading in two halves, the second set in gold italic: "Three ways to *be found.*" */
export default function StudioTitle({
  parts: [plain, italic],
  id,
  className,
}: {
  parts: string[]
  id?: string
  className?: string
}) {
  return (
    <h2 id={id} className={cn(H2, className)}>
      {plain} <em className="font-medium italic text-gold-deep">{italic}</em>
    </h2>
  )
}
