// Copy for /apps/lumenwright. Every fact comes from the Lumenwright repo
// (astrayama/lumenwright, main @ c6030e2, Oct 14 2026): the lore file
// (packages/lore/src/default-lore.json), the run flow (app/src/flow), settings
// (app/src/settings.ts) and the design spec
// (docs/superpowers/specs/2026-10-03-lumenwright-design.md).
// Everything above `lumenwrightPlanned` is in the build; `lumenwrightPlanned`
// is from the spec and not built yet. Move items across as the game changes.

import type { FaqItem } from '@/lib/app-content'

export const RESOLVE = '#F2D58A'
export const FURY = '#FF2E9A'

export const lumenwrightHero = {
  eyebrow: 'Lumenwright',
  meaning: 'Maker of light',
  /** Before, the gold-to-magenta accent word, after. */
  headline: ['Can ', 'willpower', ' be a game mechanic?'] as const,
  sub: 'A hand-tracked game for Meta Quest 3 and 3S. Make hand signs to form constructs of hard light, and hold off the Hollows in your own room or in a dark arena.',
  chips: ['Played with your hands', 'Your room or the arena', 'Free in beta'],
  cta: 'Open Lumenwright',
}

export interface Temperament {
  id: 'resolve' | 'fury'
  name: string
  color: string
  look: string
  body: string
}

export const lumenwrightTemperaments = {
  eyebrow: 'Two temperaments',
  headline: 'Choose how your light behaves.',
  lead: 'You pick a temperament before each run. The hand signs stay the same, and the temperament decides what they make.',
  items: [
    {
      id: 'resolve',
      name: 'Resolve',
      color: RESOLVE,
      look: 'Pale gold, with a slow, smooth pulse',
      body: 'Dense constructs that last: walls that soak up hits, chains that hold, a hammer with real weight.',
    },
    {
      id: 'fury',
      name: 'Fury',
      color: FURY,
      look: 'Hot magenta, pulsing three short and one long',
      body: 'Fast constructs that hit hard and burn out quickly: a ram, a whip, a barrage of punches.',
    },
  ] satisfies Temperament[],
}

export interface Sign {
  sign: string
  pose: string
  icon: 'hand' | 'grab' | 'fist' | 'point' | 'dome'
  resolve: { name: string; body: string }
  fury: { name: string; body: string }
}

export const lumenwrightSigns = {
  eyebrow: 'Five signs',
  headline: 'Your hands are the controller.',
  lead: 'Your ring hand makes a sign, and the construct starts to glow there. Bring in your other hand to sculpt it: the space between your hands sets its size, and turning your wrist sets the angle.',
  signs: [
    {
      sign: 'Barrier',
      pose: 'Open palm, facing out',
      icon: 'hand',
      resolve: { name: 'Bulwark', body: 'A tall wall that absorbs hits.' },
      fury: { name: 'Ram', body: 'A spiked wall you shove forward to knock Hollows back.' },
    },
    {
      sign: 'Tether',
      pose: 'Pinch, then pull',
      icon: 'grab',
      resolve: { name: 'Chain', body: 'Holds a Hollow in place and crushes it while you keep pinching.' },
      fury: { name: 'Whip', body: 'Snap your wrist to lash at Hollows.' },
    },
    {
      sign: 'Strike',
      pose: 'Make a fist',
      icon: 'fist',
      resolve: { name: 'Hammer', body: 'A slow, heavy swing with a big impact.' },
      fury: { name: 'Barrage', body: 'Every punch fires a fist of light, so speed counts.' },
    },
    {
      sign: 'Volley',
      pose: 'Point your index finger',
      icon: 'point',
      resolve: { name: 'Lance', body: 'Hold steady to charge, then open your hand to fire one piercing beam.' },
      fury: { name: 'Shards', body: 'Flick to fire them in quick bursts.' },
    },
    {
      sign: 'Dome',
      pose: 'Both palms up, then spread them',
      icon: 'dome',
      resolve: { name: 'Aegis', body: 'A shield around you that holds while your palms stay up.' },
      fury: { name: 'Nova', body: 'A burst that clears anything close.' },
    },
  ] satisfies Sign[],
  charge: 'Each construct draws on the ring’s meter. Hold a fist to your chest to charge it back up.',
}

export const lumenwrightHollows = {
  eyebrow: 'The Hollows',
  headline: 'Shards of silence that hunt light.',
  lead: 'They come in waves, and they crack, flake and shatter when you hit them. Each kind tests something different.',
  items: [
    { name: 'Drifter', body: 'Slow and steady. The warm-up.' },
    { name: 'Darter', body: 'Fast, and zig-zags on the way in.' },
    { name: 'Bruiser', body: 'Leans on your constructs and keeps pushing.' },
    { name: 'Swarm', body: 'Lots of small ones at once.' },
    { name: 'Mirage', body: 'Looks like a Darter with a hollow core. It’s a decoy, so leave it alone.', decoy: true },
  ],
}

export const lumenwrightRun = {
  eyebrow: 'A run',
  headline: 'From calibration to breakdown.',
  steps: [
    {
      title: 'Calibrate',
      body: 'Tell the game which hand wears the ring. Then hold it still, open it and make a fist, so the signs fit your hand.',
    },
    {
      title: 'Choose',
      body: 'Pick a temperament and a level, sit or stand, and play in your room or in the arena.',
    },
    {
      title: 'Hold the line',
      body: 'Hollows come in waves, with a ten-second breather between them. Each one that gets through cracks your core, and the third crack ends the run.',
    },
    {
      title: 'Breakdown',
      body: 'See your Ring Score and how many waves you cleared. Each temperament has three levels, and clearing one unlocks the next.',
    },
  ],
  places: [
    { id: 'room', title: 'Your room', kind: 'Mixed reality', body: 'Hollows crack out of the walls of the room you’re in.' },
    { id: 'arena', title: 'The arena', kind: 'Virtual reality', body: 'A platform floating in a dark void.' },
  ],
  stance:
    'Seated, Hollows come at you from the front. Standing, they come from a wider arc, with a sound cue for the ones off to your side. You never need to walk, and your headset’s boundary stays on.',
  comfort: 'Reduce flashing calms every pulse, and High contrast brightens the arena and the Hollows’ edges.',
}

export const lumenwrightDevlog = {
  eyebrow: 'Devlog',
  headline: 'Devlog 01',
  episode: '#lanterns made me build my own ring',
  body: 'The first devlog is a YouTube Short. Demo Shorts of the game are in production.',
  video: { id: 'SJ_dLZOa5X4', title: 'Devlog 01: #lanterns made me build my own ring' },
  more: 'More on YouTube',
}

export const lumenwrightPlanned = {
  eyebrow: 'Coming later',
  headline: 'What’s planned',
  lead: 'These are in the design but not in the game yet, so they may change.',
  items: [
    {
      title: 'Lumen talks',
      body: 'The ring gets a voice: a dry, slightly cryptic mentor with a British accent, with lines between waves and after a run.',
    },
    {
      title: 'Voice commands',
      body: 'Say “Barrier” or “Charge” instead of signing. Voice stays optional, and playing silently never costs you anything.',
    },
    {
      title: 'Stats about you',
      body: 'Steadiness, endurance, focus, recovery, combo and charge, compared only with your own past runs. They’re game numbers, not a medical or psychological test.',
    },
    {
      title: 'Leaderboards',
      body: 'Sign in from your phone to keep your runs and compare Ring Scores by level. Your personal stats stay private.',
    },
    {
      title: 'Two more temperaments',
      body: 'Stillness, with fields that slow things down, and Wonder, with shapes that morph and combine.',
    },
  ],
}

export const lumenwrightPrivacy = {
  eyebrow: 'Privacy',
  headline: 'What the game keeps',
  points: [
    {
      title: 'No account, ads or analytics',
      body: 'You open a link and play. Nothing asks who you are.',
    },
    {
      title: 'Your hands stay in the headset',
      body: 'Your headset reads your hand tracking, and the game uses it there to recognize signs. Calibration and hand data last for one session.',
    },
    {
      title: 'Settings, on the headset',
      body: 'Your ring hand, flashing and contrast settings and last choices are saved on the headset. Clearing the game’s stored data removes them.',
    },
  ],
}

export const lumenwrightFaq: FaqItem[] = [
  {
    q: 'What do I need to play?',
    a: 'A Meta Quest 3 or 3S with hand tracking turned on.',
  },
  {
    q: 'Do I need controllers?',
    a: 'No. Lumenwright is played with your hands, from calibration and menus to every sign.',
  },
  {
    q: 'How much space do I need?',
    a: 'Enough room to stretch your arms out. You can play seated or standing, you never need to walk, and your headset’s boundary stays on.',
  },
  {
    q: 'Is it free?',
    a: 'Yes, the beta is free to play.',
  },
  {
    q: 'I’m sensitive to flashing light. Can I still play?',
    a: 'Turn on Reduce flashing before a run, and every pulse calms down. Even with it off, Fury’s pulse stays under three flashes a second and fades in and out.',
  },
]

export const lumenwrightCta = {
  headline: 'Try it in your headset.',
}
