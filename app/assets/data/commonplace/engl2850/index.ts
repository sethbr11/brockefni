import type { Collection, Entry } from '../../commonplaceData'
import beowulf from '@/assets/images/commonplace/engl2850-beowulf-hwaet.jpg'
import grendel from '@/assets/images/commonplace/engl2850-beowulf-grendel.jpg'
import easterWings from '@/assets/images/commonplace/engl2850-easter-wings.jpg'
import una from '@/assets/images/commonplace/engl2850-faerie-queene-una.jpg'
import faust from '@/assets/images/commonplace/engl2850-faust-rembrandt.jpg'
import marie from '@/assets/images/commonplace/engl2850-marie-de-france.jpg'
import commonplaceBook from '@/assets/images/commonplace/engl2850-commonplace-book.jpg'
import gawain from '@/assets/images/commonplace/engl2850-gawain-green-knight.jpg'
import wifeOfBath from '@/assets/images/commonplace/engl2850-wife-of-bath.jpg'
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

const UVU_GREEN = '#275d38'

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
  // UVU green tints the black-ink pages; illustrated pages keep their colour
  covers: [
    {
      src: beowulf,
      tint: UVU_GREEN,
      title: 'Beowulf, opening page (“Hwæt!”)',
      artist: 'Anonymous scribe',
      date: 'c. 975–1025',
      holder: 'British Library, Cotton MS Vitellius A XV, f. 132r',
      license: 'Public domain',
      source:
        'https://commons.wikimedia.org/wiki/File:Beowulf_Cotton_MS_Vitellius_A_XV_f._132r.jpg',
    },
    {
      src: grendel,
      title: 'Grendel',
      artist: 'J. R. Skelton',
      date: '1908',
      holder: 'from H. E. Marshall, Stories of Beowulf',
      license: 'Public domain',
      source:
        'https://commons.wikimedia.org/wiki/File:Stories_of_beowulf_grendel.jpg',
    },
    {
      src: marie,
      title: 'Marie de France presents her book to Henry II',
      artist: 'Charles Chasselat',
      date: '1820',
      holder: 'frontispiece, Poésies de Marie de France (Paris)',
      license: 'Public domain',
      source: 'https://commons.wikimedia.org/wiki/File:Marie_de_France.jpg',
    },
    {
      src: gawain,
      title: 'The Green Knight holds up his severed head',
      artist: 'Anonymous illustrator',
      date: 'late 14th c.',
      holder: 'British Library, Cotton MS Nero A X',
      license: 'Public domain',
      source:
        'https://commons.wikimedia.org/wiki/File:Sir_Gawain_and_the_Green_Knight,_from_Pearl_Manuscript.jpg',
    },
    {
      src: wifeOfBath,
      title: 'The Wife of Bath, from the Ellesmere Chaucer',
      artist: 'Anonymous illuminator',
      date: 'c. 1400–1410',
      holder: 'Huntington Library, EL 26 C 9',
      license: 'Public domain',
      source: 'https://commons.wikimedia.org/wiki/File:Wife-of-Bath-ms.jpg',
    },
    {
      src: una,
      title: 'Una and the Lion',
      artist: 'William Bell Scott',
      date: 'c. 1860',
      holder: 'National Galleries of Scotland',
      license: 'Public domain',
      source:
        'https://commons.wikimedia.org/wiki/File:William_Bell_Scott_-_Una_and_the_Lion.jpg',
    },
    {
      src: faust,
      title: 'A Scholar in His Study (“Faust”)',
      artist: 'Rembrandt',
      date: 'c. 1652',
      holder: 'Metropolitan Museum of Art',
      license: 'CC0',
      source:
        "https://commons.wikimedia.org/wiki/File:A_Scholar_in_His_Study_('Faust')_MET_DP814791.jpg",
    },
    {
      src: easterWings,
      tint: UVU_GREEN,
      title: '“Easter Wings”, as first printed in The Temple',
      artist: 'George Herbert',
      date: '1633',
      license: 'Public domain',
      source:
        'https://commons.wikimedia.org/wiki/File:GeorgeHerbertUprightVersionEasterWings1633.jpg',
    },
    {
      src: commonplaceBook,
      tint: UVU_GREEN,
      title: 'A commonplace book page (“Thus think, then drink tobacco”)',
      date: 'mid-17th c.',
      holder: 'Beinecke Library, Yale (photo: Beinecke Flickr Laboratory)',
      license: 'CC BY 2.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Commonplace_book_mid_17th_century.jpg',
    },
  ],
  institution: 'UVU',
  institutionColor: UVU_GREEN,
  entries: orderedEntries(files, order),
}
