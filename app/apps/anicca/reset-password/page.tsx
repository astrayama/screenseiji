import ResetPasswordFlow from '@/components/anicca/ResetPasswordFlow'
import { RESET_STASH_SCRIPT } from '@/lib/anicca-reset'
import { pageMetadata } from '@/lib/seo'

// Where Anicca's password-reset emails land (the app asks Supabase to send
// people here). Kept out of search: noindex in lib/routes.ts.
export const metadata = pageMetadata('aniccaResetPassword')

export default function AniccaResetPasswordPage() {
  return (
    <main className="mx-auto min-h-[70svh] max-w-xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
      {/* Runs while the HTML is parsed, before analytics load: takes the link's
          one-time session out of the address bar (see lib/anicca-reset.ts). */}
      <script dangerouslySetInnerHTML={{ __html: RESET_STASH_SCRIPT }} />
      <ResetPasswordFlow />
    </main>
  )
}
