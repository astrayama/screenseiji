// Shared classes for the Screen Sage skin. Two moods, one palette:
// - Brand (everywhere else): sky, serif headings, Josefin eyebrows, pill buttons.
// - Calm (the Studio band and /websites): cloud white, Nunito headings,
//   thin lilac rules, no decoration.
// Text is always plum; the sky colours are for backgrounds only.

/** The page column: 1072px of content on desktop, 20px gutters on a phone. */
export const CONTAINER = 'mx-auto w-full max-w-[71rem] px-5 sm:px-8'

// ─── Brand ──────────────────────────────────────────────────────────────────
export const EYEBROW = 'font-eyebrow text-xs font-semibold uppercase tracking-[0.3em] text-plum-500 sm:text-[13px]'
export const H2 = 'text-balance font-display text-[2rem] font-medium leading-[1.08] text-plum-900 sm:text-[3.25rem]'
export const H3 = 'font-display text-[1.75rem] font-semibold leading-tight text-plum-900'
export const LEAD = 'text-base leading-7 text-plum-700 sm:text-[17px] sm:leading-[1.75]'

/** A white card on the sky. */
export const CARD = 'rounded-[1.375rem] border border-white bg-cloud shadow-card'

/** One primary per section. */
export const BUTTON_PRIMARY =
  'inline-flex items-center justify-center gap-2 rounded-full bg-plum-900 px-6 py-3 text-[15px] font-bold text-cloud shadow-button transition-colors hover:bg-plum-700 disabled:opacity-60'
export const BUTTON_OUTLINE =
  'inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-plum-900 px-6 py-[0.6875rem] text-[15px] font-bold text-plum-900 transition-colors hover:bg-plum-900/5'
export const TEXT_LINK =
  'font-bold text-plum-900 underline decoration-[1.5px] underline-offset-4 transition-colors hover:text-plum-700'
/** Small pill links, e.g. the podcast's platforms. */
export const CHIP =
  'inline-flex items-center rounded-full bg-blush/70 px-4 py-2 text-sm font-bold text-plum-900 transition-colors hover:bg-blush'
/** A card's label in the corner: FREE, IN BETA… */
export const TAG = 'font-eyebrow text-[11px] font-semibold uppercase tracking-[0.2em] text-plum-700'

// ─── Calm (Studio) ──────────────────────────────────────────────────────────
export const CALM_EYEBROW = 'text-xs font-bold uppercase tracking-[0.16em] text-plum-500 sm:text-[13px]'
export const CALM_H2 = 'text-[1.875rem] font-bold leading-[1.15] tracking-[-0.01em] text-plum-900 sm:text-[2.5rem]'
export const CALM_BUTTON =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-plum-900 px-6 py-3 text-[15px] font-bold text-cloud transition-colors hover:bg-plum-700 disabled:opacity-60'
export const CALM_OUTLINE_BUTTON =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-lilac bg-cloud px-5 py-2.5 text-sm font-bold text-plum-900 transition-colors hover:border-plum-500'

// ─── Sub-pages ──────────────────────────────────────────────────────────────
export const PAGE_EYEBROW = `mb-4 ${EYEBROW}`
export const PAGE_TITLE = 'font-display font-medium leading-[1.05] text-plum-900'
export const PAGE_TITLE_SIZE = { fontSize: 'clamp(2.5rem, 6vw, 4.25rem)' }
export const SECTION_TITLE = 'font-display text-3xl font-medium leading-[1.15] text-plum-900 sm:text-[2.5rem]'
