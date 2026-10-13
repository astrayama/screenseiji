// Structured data (JSON-LD) for search engines. A native script tag, as the
// Next docs recommend (not next/script), with "<" escaped so no string in the
// data can close the tag early.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
