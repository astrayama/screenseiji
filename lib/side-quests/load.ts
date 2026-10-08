import fs from 'node:fs'
import path from 'node:path'
import { cache } from 'react'
import { parseSideQuests, SideQuestsParseError, type SideQuests } from './parse'

const FILE = path.join(process.cwd(), 'content', 'side-quests.md')

let warned = false

// Server-only: reads content/side-quests.md when the page is built. A malformed
// file fails the build with the offending line; Vercel keeps the last good deploy.
export const loadSideQuests = cache((): SideQuests => {
  let data: SideQuests
  try {
    data = parseSideQuests(fs.readFileSync(FILE, 'utf8'))
  } catch (err) {
    if (err instanceof SideQuestsParseError) throw new Error(`content/side-quests.md — ${err.message}`)
    throw err
  }
  if (!warned) {
    warned = true
    for (const warning of data.warnings) console.warn(`[side-quests] ${warning}`)
  }
  return data
})
