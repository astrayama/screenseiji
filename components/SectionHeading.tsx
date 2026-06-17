'use client'

import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({ eyebrow, title, description, align = 'left', className }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const center = align === 'center'

  return (
    <div
      ref={ref}
      className={cn(
        'max-w-2xl reveal',
        inView && 'reveal-in',
        center && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl font-light leading-[1.1] text-foreground sm:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
