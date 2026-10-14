// Shared classes for the site's native forms: the home page's contact and
// mailing-list forms, and the ones inside <Modal> (tarot intake, live
// booking, waitlist, studio project inquiry).

import { BUTTON_PRIMARY, CALM_BUTTON } from '@/components/ui'

export const FIELD =
  'w-full rounded-xl border-[1.5px] border-mist bg-white px-4 py-3 text-[15px] text-plum-900 placeholder:text-plum-500/60 outline-none transition-colors focus:border-plum-500'

export const LABEL = 'text-[13px] font-bold text-plum-900'

export const PRIMARY_BUTTON = BUTTON_PRIMARY

// The Studio (client web work) uses the calm skin: square-ish, no pill.
export const NEUTRAL_BUTTON = CALM_BUTTON

/** Error text under a form. */
export const FORM_ERROR = 'text-sm leading-6 text-alert'
