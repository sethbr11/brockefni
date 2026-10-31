import { engl2850 } from './commonplace/engl2850'

export type PeriodId =
  | 'old-english'
  | 'middle-english'
  | 'early-modern'
  | 'restoration'

export interface Period {
  id: PeriodId
  label: string
  range: string
  order: number
}

export const periods: Record<PeriodId, Period> = {
  'old-english': {
    id: 'old-english',
    label: 'Old English',
    range: 'c. 650–1066',
    order: 1,
  },
  'middle-english': {
    id: 'middle-english',
    label: 'Middle English',
    range: '1066–1500',
    order: 2,
  },
  'early-modern': {
    id: 'early-modern',
    label: 'Early Modern',
    range: '1500–1660',
    order: 3,
  },
  restoration: {
    id: 'restoration',
    label: 'Restoration & 18th Century',
    range: '1660–1800',
    order: 4,
  },
}

export interface Passage {
  text: string // the quoted lines; use \n for line breaks
  citation: string // e.g. 'lines 1–9'
  translation?: string // optional modern translation; enables a toggle in the UI
  note?: string // optional short gloss for this passage
  tags?: string[] // optional theme ids specific to this passage
}

export interface Entry {
  id: string // url slug, e.g. 'beowulf'
  title: string
  author: string
  period: PeriodId
  composed?: string // e.g. 'c. 1000'
  language?: string
  assigned?: string // class reading date, e.g. 'Aug 25'
  tags: string[] // theme ids
  passages: Passage[] // empty = not yet filled in
  summary: string
  commentary: string
  devices?: string[] // formal/poetic devices
  notes?: string // manuscript & form notes
  scene?: string // intro animation scene id; omit → fallback scene
  cover?: string // optional image URL; omit → generated cover
}

export interface Collection {
  id: string
  title: string
  subtitle: string
  kind: 'course' | 'personal'
  term?: string
  description: string
  initial: string // single letter for the generated cover
  cover?: string
  entries: Entry[]
}

export interface Theme {
  id: string
  label: string
  description?: string
}

export const themes: Theme[] = [
  // Your loci communes — add headings here, then reference their ids in entry/passage tags.
  // { id: 'courtly-love', label: 'Courtly Love', description: '...' },
]

export const collections: Collection[] = [engl2850]

export type SequenceSource = { type: 'collection' | 'tag'; id: string }

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id)
}

export function allEntries(): Entry[] {
  return collections.flatMap((c) => c.entries)
}

export function getEntry(
  id: string
): { entry: Entry; collection: Collection } | undefined {
  for (const collection of collections) {
    const entry = collection.entries.find((e) => e.id === id)
    if (entry) return { entry, collection }
  }
  return undefined
}

export function isFilled(entry: Entry): boolean {
  return entry.passages.length > 0
}

export function entryTags(entry: Entry): string[] {
  const all = [...entry.tags, ...entry.passages.flatMap((p) => p.tags ?? [])]
  return [...new Set(all)]
}

export function getTheme(id: string): Theme | undefined {
  return themes.find((t) => t.id === id)
}

export function getEntriesByTag(tagId: string): Entry[] {
  return allEntries().filter((e) => entryTags(e).includes(tagId))
}

export function parseFrom(q: string | undefined): SequenceSource | undefined {
  if (!q) return undefined
  const i = q.indexOf(':')
  if (i < 0) return undefined
  const type = q.slice(0, i)
  const id = q.slice(i + 1)
  if ((type !== 'collection' && type !== 'tag') || !id) return undefined
  return { type, id }
}

export function formatFrom(src: SequenceSource): string {
  return `${src.type}:${src.id}`
}

export function getSequence(src: SequenceSource): Entry[] {
  return src.type === 'collection'
    ? (getCollection(src.id)?.entries ?? [])
    : getEntriesByTag(src.id)
}

export function getNeighbors(
  entryId: string,
  src: SequenceSource
): { prev?: Entry; next?: Entry; index: number; total: number } {
  const seq = getSequence(src)
  const index = seq.findIndex((e) => e.id === entryId)
  return {
    prev: index > 0 ? seq[index - 1] : undefined,
    next: index >= 0 ? seq[index + 1] : undefined,
    index,
    total: seq.length,
  }
}
