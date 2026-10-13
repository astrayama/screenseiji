import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, globSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { PAGES, breadcrumbTrail } from './routes.ts'

const entries = Object.entries(PAGES)

/** app/about/page.tsx → /about; route groups and the root collapse the same way Next does. */
function routeOf(file) {
  const dir = dirname(file).replace(/^app/, '').replace(/\/\([^)]+\)/g, '')
  return dir === '' ? '/' : dir
}

test('titles and descriptions fit search result limits', () => {
  for (const [key, page] of entries) {
    assert.ok(page.title.length <= 60, `${key} title is ${page.title.length} chars: ${page.title}`)
    assert.ok(
      page.description.length >= 70 && page.description.length <= 160,
      `${key} description is ${page.description.length} chars`,
    )
  }
})

test('paths, titles and descriptions are unique', () => {
  for (const field of ['path', 'title', 'description']) {
    const values = entries.map(([, page]) => page[field])
    assert.equal(new Set(values).size, values.length, `duplicate ${field}`)
  }
})

test('every page in app/ is in the registry', () => {
  const registered = new Set(entries.map(([, page]) => page.path))
  for (const file of globSync('app/**/page.tsx')) {
    assert.ok(registered.has(routeOf(file)), `${file} (${routeOf(file)}) is missing from lib/routes.ts`)
  }
})

test('every registered page has its own share image', () => {
  // A page that sets openGraph loses its parent's file-based image, so each
  // page folder needs an opengraph-image of its own.
  for (const [key, page] of entries) {
    const dir = join('app', page.path)
    assert.ok(existsSync(join(dir, 'opengraph-image.tsx')), `${key}: add ${dir}/opengraph-image.tsx`)
  }
})

test('parents exist and breadcrumbs start at home', () => {
  for (const [key, page] of entries) {
    if (page.parent) assert.ok(page.parent in PAGES, `${key} has unknown parent ${page.parent}`)
    const trail = breadcrumbTrail(key)
    assert.equal(trail[0].path, '/')
    assert.equal(trail.at(-1).path, page.path)
  }
})
