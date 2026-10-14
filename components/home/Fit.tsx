/**
 * Copy that fits the screen: the phone layout gets the shorter line, tablets
 * and up the full one. Only one is ever displayed (and read out).
 */
export default function Fit({ short, long }: { short?: string; long: string }) {
  if (!short || short === long) return <>{long}</>
  return (
    <>
      <span className="md:hidden">{short}</span>
      <span className="hidden md:inline">{long}</span>
    </>
  )
}
