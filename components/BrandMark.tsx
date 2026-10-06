import Image from 'next/image'
import sssMark from '@/public/brand/sss-mark.png'

/** The Screen Sage Studios knot, sized by height. Decorative: pair it with visible text. */
export default function BrandMark({ height, eager, className }: { height: number; eager?: boolean; className?: string }) {
  return (
    <Image
      src={sssMark}
      alt=""
      height={height}
      width={Math.round((height * sssMark.width) / sssMark.height)}
      loading={eager ? 'eager' : undefined}
      className={className}
    />
  )
}
