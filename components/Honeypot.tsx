// The hidden anti-spam field every form sends as `website`. People never see
// it; bots fill it in. Password managers are told to skip it (the data-*
// attributes), and the API still delivers a filled one to Isa, marked as
// possible spam, so a real person is never silently dropped (see isFlagged in
// lib/email.ts). Keep it last in the form so it never takes initial focus.
export default function Honeypot({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div aria-hidden className="sr-only">
      <label>
        Leave this empty
        <input
          tabIndex={-1}
          autoComplete="off"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}
