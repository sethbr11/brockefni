import type { Collection, Entry } from '../../commonplaceData'
import { orderedEntries } from '../entries'

// Each work lives in its own file in this folder (e.g. beowulf.ts) and is
// picked up automatically. To fill one in, edit its file:
//   passages:   [{ text: 'line one\nline two', citation: 'lines 1–2', translation?, note?, tags? }]
//   summary:    a short plain-language summary of the work
//   commentary: your own reading and thoughts
//   tags:       theme ids from `themes` in ../../commonplaceData.ts
// Optional: devices (formal/poetic devices), notes (manuscript & form),
//   link: { url, label: 'Project Gutenberg', kind: 'free' | 'purchase' }.
// An entry with empty passages is shown as "not yet filled in".
// To add a work: create its file, then add its id to `order` below.

const files = import.meta.glob<Entry>(['./*.ts', '!./index.ts'], {
  eager: true,
  import: 'default',
})

/** syllabus order (by entry id) */
const order = [
  'caedmons-hymn',
  'dream-of-the-rood',
  'beowulf',
  'bisclavret',
  'lanval',
  'pangur-ban',
  'sir-gawain',
  'sumer-is-icumen-in',
  'wife-of-bath',
  'nuns-priests-tale',
  'julian-of-norwich',
  'elizabethan-sonnet',
  'shakespeare-sonnets',
  'faerie-queene',
  'doctor-faustus',
  'john-donne',
  'easter-wings',
  'the-altar',
  'eves-apology',
  'blazing-world',
  'paradise-lost',
  'oroonoko',
]

export const engl2850: Collection = {
  id: 'engl-2850',
  title: 'ENGL 2850',
  subtitle: 'Literary History I',
  kind: 'course',
  term: 'Fall 2026',
  description:
    'Survey of British literature from the Old English period through the Restoration — Prof. Ruen-chuan Ma at UVU.',
  initial: 'L',
  entries: orderedEntries(files, order),
}
