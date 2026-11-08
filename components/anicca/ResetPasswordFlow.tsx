'use client'

import { FormEvent, useEffect, useId, useState } from 'react'
import {
  ANICCA_PASSWORD_UPDATED_URL,
  RESET_STASH_KEY,
  checkNewPassword,
  isAppleMobile,
  parseResetLink,
  saveNewPassword,
  type ResetLink,
} from '@/lib/anicca-reset'

type Session = Extract<ResetLink, { kind: 'session' }>
type Step = { kind: 'checking' } | ResetLink | { kind: 'done'; email: string }

// 16px text: iOS Safari zooms the page into any smaller field when it gets focus.
const FIELD =
  'w-full rounded-xl border-[1.5px] border-anicca-lavender/60 bg-white px-4 py-3 text-base text-anicca-ink outline-none transition-colors placeholder:text-anicca-faint focus:border-anicca-violet'
const LABEL = 'text-[13px] font-bold text-anicca-ink'
const ERROR = 'text-sm leading-6 text-[#B3261E]'
const BUTTON =
  'inline-flex w-full items-center justify-center rounded-full bg-anicca-violet px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(94,67,166,0.7)] transition-colors hover:bg-anicca-violet-deep disabled:opacity-60'
const TITLE = 'mt-3 font-anicca-display text-4xl leading-[1.1] text-anicca-ink sm:text-[2.75rem]'
const BODY = 'mt-4 text-base leading-7 text-anicca-body'

/** Reads the link once in the browser: the stash script already took it out of the address bar. */
function readLink(): ResetLink {
  const now = Date.now() / 1000
  const fromLoad = (window as { __aniccaResetHash?: string }).__aniccaResetHash
  let stashed: string | null = null
  try {
    stashed = sessionStorage.getItem(RESET_STASH_KEY)
  } catch {}
  const link = parseResetLink(fromLoad ?? stashed ?? '', now)
  // A reload of this tab keeps working until the session runs out; nothing else is kept.
  if (link.kind === 'session' && (link.expiresAt > now || fromLoad)) return link
  forgetLink()
  return link.kind === 'session' ? { kind: 'expired' } : link
}

function forgetLink() {
  delete (window as { __aniccaResetHash?: string }).__aniccaResetHash
  try {
    sessionStorage.removeItem(RESET_STASH_KEY)
  } catch {}
}

export default function ResetPasswordFlow() {
  const [step, setStep] = useState<Step>({ kind: 'checking' })
  const [onIPhone, setOnIPhone] = useState(false)

  useEffect(() => {
    // Browser-only values (the link and the device), read once after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(readLink())
    setOnIPhone(isAppleMobile(navigator.userAgent, navigator.maxTouchPoints))
  }, [])

  switch (step.kind) {
    case 'checking':
      return <p className={BODY} aria-live="polite">Checking your link…</p>
    case 'session':
      return (
        <NewPasswordForm
          session={step}
          onDone={() => {
            forgetLink()
            setStep({ kind: 'done', email: step.email })
          }}
          onExpired={() => {
            forgetLink()
            setStep({ kind: 'expired' })
          }}
        />
      )
    case 'done':
      return (
        <div role="status">
          <p className="anicca-eyebrow">All set</p>
          <h1 className={TITLE}>Your password is updated</h1>
          <p className={BODY}>
            {onIPhone ? 'Open Anicca and sign in' : 'Open Anicca on your iPhone and sign in'}
            {step.email ? (
              <>
                {' '}as <span className="font-bold text-anicca-ink">{step.email}</span>
              </>
            ) : null}{' '}
            with your new password.
          </p>
          {onIPhone && <OpenAppButton />}
        </div>
      )
    case 'expired':
      return (
        <div>
          <p className="anicca-eyebrow">Reset password</p>
          <h1 className={TITLE}>This link has expired</h1>
          <p className={BODY}>
            Reset links work once, for an hour. To get a new one, open Anicca, enter your email on the
            sign-in screen and tap <span className="font-bold text-anicca-ink">Forgot password?</span>{' '}
            Then use the newest email.
          </p>
          {onIPhone && <OpenAppButton label="Open Anicca" />}
        </div>
      )
    case 'none':
      return (
        <div>
          <p className="anicca-eyebrow">Reset password</p>
          <h1 className={TITLE}>Forgot your password?</h1>
          <p className={BODY}>
            Open Anicca, enter your email on the sign-in screen and tap{' '}
            <span className="font-bold text-anicca-ink">Forgot password?</span> We&rsquo;ll email you a
            link that brings you back here to choose a new one.
          </p>
          {onIPhone && <OpenAppButton label="Open Anicca" />}
        </div>
      )
  }
}

function OpenAppButton({ label = 'Open Anicca' }: { label?: string }) {
  return (
    <a href={ANICCA_PASSWORD_UPDATED_URL} className={`${BUTTON} mt-8`}>
      {label}
    </a>
  )
}

function NewPasswordForm({
  session,
  onDone,
  onExpired,
}: {
  session: Session
  onDone: () => void
  onExpired: () => void
}) {
  const id = useId()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [show, setShow] = useState(false)
  const [problems, setProblems] = useState<{ password?: string; confirmation?: string; general?: string }>({})
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const fieldProblems = checkNewPassword(password, confirmation)
    setProblems(fieldProblems)
    if (fieldProblems.password || fieldProblems.confirmation) return

    setSaving(true)
    const result = await saveNewPassword({ session, password, nowSeconds: Date.now() / 1000 })
    setSaving(false)
    if (result.ok) onDone()
    else if (result.expired) onExpired()
    else setProblems({ general: result.message })
  }

  return (
    <div>
      <p className="anicca-eyebrow">Reset password</p>
      <h1 className={TITLE}>Choose a new password</h1>
      <p className={BODY}>
        {session.email ? (
          <>
            For <span className="font-bold text-anicca-ink">{session.email}</span>. Use at least 8
            characters.
          </>
        ) : (
          'Use at least 8 characters.'
        )}
      </p>

      <form onSubmit={handleSubmit} className="anicca-card mt-8 flex flex-col gap-5 p-6 sm:p-8" noValidate>
        {/* Lets password managers save the new password under the right account. */}
        <input
          type="email"
          name="email"
          autoComplete="username"
          value={session.email}
          readOnly
          hidden
        />
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-password`} className={LABEL}>
            New password
          </label>
          <input
            id={`${id}-password`}
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            minLength={8}
            required
            autoFocus
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-invalid={Boolean(problems.password)}
            aria-describedby={problems.password ? `${id}-password-error` : undefined}
            className={FIELD}
          />
          {problems.password && (
            <p id={`${id}-password-error`} className={ERROR}>
              {problems.password}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${id}-confirm`} className={LABEL}>
            Confirm new password
          </label>
          <input
            id={`${id}-confirm`}
            type={show ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={confirmation}
            onChange={e => setConfirmation(e.target.value)}
            aria-invalid={Boolean(problems.confirmation)}
            aria-describedby={problems.confirmation ? `${id}-confirm-error` : undefined}
            className={FIELD}
          />
          {problems.confirmation && (
            <p id={`${id}-confirm-error`} className={ERROR}>
              {problems.confirmation}
            </p>
          )}
        </div>
        <label className="flex items-center gap-2.5 text-sm text-anicca-muted">
          <input
            type="checkbox"
            checked={show}
            onChange={e => setShow(e.target.checked)}
            className="h-4 w-4 accent-anicca-violet"
          />
          Show passwords
        </label>
        {problems.general && (
          <p role="alert" className={ERROR}>
            {problems.general}
          </p>
        )}
        <button type="submit" disabled={saving} className={BUTTON}>
          {saving ? 'Saving…' : 'Save new password'}
        </button>
      </form>
    </div>
  )
}
