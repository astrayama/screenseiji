import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { energyCenters } from '@/lib/anicca-content'
import type { OgTheme, PageEntry } from '@/lib/routes'
import { ORG_NAME, SITE_HOST } from '@/lib/site'

// Share cards — the image shown when a link is posted on X, Discord, iMessage…
// Every page folder has an opengraph-image.tsx that calls renderOgImage with
// its registry entry (lib/routes.ts). Rendered once at build time by Satori:
// flexbox only, and fonts must be static TTF/OTF files (assets/fonts, OFL).

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const THEMES: Record<OgTheme, { bg: string; glows: string; fg: string; muted: string; accent: string }> = {
  // The pastel sky from the home page's hero, in plum ink.
  site: {
    // Satori blends `transparent` through black, so every stop fades to the same colour at 0 alpha.
    bg: '#F6CDE3',
    glows:
      'radial-gradient(circle at 0% 40%, rgba(233,176,218,0.95), rgba(233,176,218,0) 55%), ' +
      'radial-gradient(circle at 100% 60%, rgba(221,208,231,1), rgba(221,208,231,0) 55%), ' +
      'linear-gradient(180deg, #F3C7E0 0%, #F6CDE3 45%, #EDD3EA 100%)',
    fg: '#3F2A58',
    muted: '#593D75',
    accent: '#6A4D86',
  },
  arcana: {
    bg: '#0D0B13',
    glows: 'radial-gradient(circle at 85% 10%, rgba(246,206,85,0.22), transparent 45%), radial-gradient(circle at 5% 100%, rgba(179,133,224,0.28), transparent 50%)',
    fg: '#F2EEF7',
    muted: '#A698B3',
    accent: '#F6CE55',
  },
  anicca: {
    bg: '#F5F0FA',
    glows: 'radial-gradient(circle at 85% 10%, rgba(196,168,255,0.55), transparent 45%), radial-gradient(circle at 5% 100%, rgba(167,139,218,0.35), transparent 50%)',
    fg: '#1A1A2E',
    muted: '#4A4A66',
    accent: '#5E43A6',
  },
}

const asset = (...parts: string[]) => readFile(join(process.cwd(), ...parts))

interface OgFont {
  name: string
  file: string
  weight: 300 | 400 | 500 | 600
}

// The site's cards use the brand type: Cormorant headings, Josefin eyebrows,
// Nunito Sans text. The App Store cards keep the type they launched with.
// Static instances only — Satori draws a variable font at its default weight.
const TYPE: Record<'brand' | 'apps', { fonts: OgFont[]; title: number; eyebrow: React.CSSProperties; body: React.CSSProperties; footer: React.CSSProperties }> = {
  brand: {
    fonts: [
      { name: 'Cormorant Garamond', file: 'CormorantGaramond-SemiBold.ttf', weight: 600 },
      { name: 'Josefin Sans', file: 'JosefinSans-SemiBold.ttf', weight: 600 },
      { name: 'Nunito Sans', file: 'NunitoSans-Regular.ttf', weight: 400 },
      { name: 'Nunito Sans', file: 'NunitoSans-SemiBold.ttf', weight: 600 },
    ],
    title: 600,
    eyebrow: { fontFamily: 'Josefin Sans', fontWeight: 600, letterSpacing: 6 },
    body: { fontFamily: 'Nunito Sans', fontWeight: 400 },
    footer: { fontFamily: 'Nunito Sans', fontWeight: 600 },
  },
  apps: {
    fonts: [
      { name: 'Cormorant Garamond', file: 'CormorantGaramond-Light.ttf', weight: 300 },
      { name: 'Space Grotesk', file: 'SpaceGrotesk-Medium.ttf', weight: 500 },
    ],
    title: 300,
    eyebrow: { fontFamily: 'Space Grotesk', letterSpacing: 4 },
    body: { fontFamily: 'Space Grotesk' },
    footer: { fontFamily: 'Space Grotesk' },
  },
}

export async function renderOgImage({ eyebrow, title, subtitle, theme }: PageEntry['og']) {
  // The site's cards carry the S badge on the sky with the banner's clouds;
  // the App Store pages keep the Screen Sage Studios knot.
  const site = theme === 'site'
  const type = TYPE[site ? 'brand' : 'apps']
  const [fontData, mark, clouds] = await Promise.all([
    Promise.all(type.fonts.map(font => asset('assets', 'fonts', font.file))),
    asset('public', 'brand', site ? 's-badge.png' : 'sss-mark.png'),
    // The banner's clouds, with their top already faded out (Satori has no mask-image).
    site ? asset('assets', 'og', 'clouds.png') : null,
  ])
  const t = THEMES[theme]
  const logo = `data:image/png;base64,${mark.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 76px',
          backgroundColor: t.bg,
          backgroundImage: t.glows,
          color: t.fg,
          ...type.body,
          position: 'relative',
        }}
      >
        {clouds && (
          // eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img
          <img
            src={`data:image/png;base64,${clouds.toString('base64')}`}
            width={1200}
            height={244}
            alt=""
            style={{ position: 'absolute', left: 0, bottom: -24 }}
          />
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img */}
          <img src={logo} width={site ? 72 : 107} height={site ? 72 : 56} alt="" />
          <span style={{ ...type.eyebrow, fontSize: 22, textTransform: 'uppercase', color: t.accent }}>
            {eyebrow}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <span
            style={{
              fontFamily: 'Cormorant Garamond',
              fontWeight: type.title,
              fontSize: title.length > 24 ? 76 : 92,
              lineHeight: 1.05,
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          {subtitle && <span style={{ fontSize: 28, color: t.muted, maxWidth: 1000 }}>{subtitle}</span>}
        </div>

        <div style={{ ...type.footer, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: t.muted }}>
          <span>{SITE_HOST}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {theme === 'anicca' && (
              <div style={{ display: 'flex', gap: 8 }}>
                {energyCenters.map(c => (
                  <div key={c.id} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: c.color }} />
                ))}
              </div>
            )}
            <span>{ORG_NAME}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: type.fonts.map((font, i) => ({ name: font.name, data: fontData[i], weight: font.weight, style: 'normal' as const })),
    },
  )
}
