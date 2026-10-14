// The sky behind every page: a pale pastel wash with a blush glow up top and
// a mist glow lower down. Sections paint their own richer sky (the hero, the
// footer) on top of it.
export default function SkyBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          'radial-gradient(ellipse 70% 45% at 15% 0%, rgba(246,205,227,0.55), transparent 70%),' +
          'radial-gradient(ellipse 60% 50% at 100% 70%, rgba(221,208,231,0.45), transparent 70%),' +
          'linear-gradient(180deg, #F8F0F6 0%, #F8F1F7 60%, #F6F0F8 100%)',
      }}
    />
  )
}
