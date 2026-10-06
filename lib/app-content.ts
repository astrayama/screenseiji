// Shapes shared by the per-app content files (lib/arcana-content.ts,
// lib/anicca-content.ts) and the components in components/app-pages.

export interface FaqItem {
  q: string
  a: string
}

/** A policy page: privacy policy, terms of use. */
export interface LegalDoc {
  effective: string
  sections: { title: string; body: string[] }[]
}
