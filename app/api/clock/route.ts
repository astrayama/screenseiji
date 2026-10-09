// Live ET clock badge for the GitHub profile README.
// Served at https://screenseiji.vercel.app/api/clock — renders the current
// America/New_York time as a shields-style SVG badge on every request.
// GitHub's image proxy refreshes it about once a minute (see Cache-Control).

export async function GET() {
  const time =
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/New_York',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
      .format(new Date())
      .toUpperCase() + ' ET'

  const width = Math.ceil(time.length * 7) + 16
  const cx = width / 2

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">` +
    `<rect width="${width}" height="20" fill="#7c3aad"/>` +
    `<text x="${cx + 1}" y="15" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11" fill="#010101" fill-opacity=".3">${time}</text>` +
    `<text x="${cx}" y="14" text-anchor="middle" font-family="Verdana,DejaVu Sans,sans-serif" font-size="11" fill="#fff">${time}</text>` +
    `</svg>`

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
    },
  })
}
