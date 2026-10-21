// The app's night sky: a dusky horizon, two twinkling star layers, and the
// moon's glow in the corner. CSS only, so it renders the same on the server.
export default function CartalunaBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 60% at 50% 112%, #2B2140 0%, #1A1426 38%, transparent 70%),' +
            'radial-gradient(90% 45% at 50% -8%, #17121F 0%, transparent 70%),' +
            '#0F0D0B',
        }}
      />
      <div className="cartaluna-stars absolute inset-0" />
      <div
        className="absolute -right-32 -top-32 h-[460px] w-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,217,138,0.13) 0%, rgba(255,217,138,0.04) 45%, transparent 70%)' }}
      />
    </div>
  )
}
