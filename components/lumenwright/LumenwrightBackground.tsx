// The game's void: deep navy under the page, a gold glow up top (Resolve), a
// magenta one low on the other side (Fury), and faint drifting shards.
// CSS only, so it renders the same on the server.
export default function LumenwrightBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 60% at 50% 115%, #161632 0%, #10102A 40%, transparent 72%),' +
            'radial-gradient(80% 45% at 50% -10%, #14142C 0%, transparent 70%),' +
            '#0A0A17',
        }}
      />
      <div className="lumenwright-shards absolute inset-0 animate-lumenwright-drift" />
      <div
        className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(242,213,138,0.12) 0%, rgba(242,213,138,0.04) 45%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-48 -left-40 h-[520px] w-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,46,154,0.09) 0%, rgba(255,46,154,0.03) 45%, transparent 70%)' }}
      />
    </div>
  )
}
