import { Fragment } from 'react'
import { parseInline } from '@/lib/side-quests/parse'

// Log text is plain text plus links ([text](url) or a bare URL); nothing else is markdown.
export default function InlineText({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((segment, i) =>
        segment.href ? (
          <a
            key={i}
            href={segment.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-current/40 underline-offset-2 transition-colors hover:decoration-current"
          >
            {segment.text}
          </a>
        ) : (
          <Fragment key={i}>{segment.text}</Fragment>
        ),
      )}
    </>
  )
}
