// Glossary of literary devices. Entries list devices by name in `devices`;
// the reader matches each name here (by id, label or alias, ignoring case and
// any trailing parenthetical such as "Variation (apposition)") and opens a
// definition with an example. Unmatched names still show, just not clickable.

import { caesura } from './commonplace/formatting'

export interface DeviceExample {
  text: string // the quoted lines; use \n for line breaks
  work: string // title shown as the source
  entryId?: string // links to the reader when that work is in a collection
  citation?: string
  translation?: string
}

export interface Device {
  id: string
  label: string
  aliases?: string[] // other names entries may use
  definition: string
  example?: DeviceExample
}

export const devices: Device[] = [
  {
    id: 'alliterative-verse',
    label: 'Alliterative verse',
    aliases: ['alliteration'],
    definition:
      'Lines held together by repeating the first sound of the stressed words, instead of by rhyme. It is the basic pattern of Old English poetry and returns in fourteenth-century poems like Sir Gawain.',
    example: {
      text: 'Siþen þe sege and þe assaut watz sesed at Troye',
      work: 'Sir Gawain and the Green Knight',
      entryId: 'sir-gawain',
      citation: 'line 1',
      translation: 'After the siege and the assault had ceased at Troy',
    },
  },
  {
    id: 'caesura',
    label: 'Caesura',
    aliases: ['medial caesura'],
    definition:
      'A pause in the middle of a line. In Old English verse every line splits into two half-lines, joined across the gap by alliteration.',
    example: {
      text: `Hwæt! We Gardena${caesura}in geardagum`,
      work: 'Beowulf',
      entryId: 'beowulf',
      citation: 'line 1',
      translation: 'Listen! Of the Spear-Danes in days gone by',
    },
  },
  {
    id: 'variation',
    label: 'Variation',
    aliases: ['poetic variation', 'apposition'],
    definition:
      'Naming the same thing several times in a row with different phrases, each adding a new angle. A signature habit of Old English style.',
    example: {
      text: `þa middangeard${caesura}manncynnes weard,\nece Drihten,${caesura}æfter teode\nfirum foldan,${caesura}Frea ælmihtig.`,
      work: "Cædmon's Hymn",
      entryId: 'caedmons-hymn',
      citation: 'lines 7–9',
      translation:
        "then middle-earth mankind's guardian,\neternal Lord, afterwards prepared,\nthe earth for men, the Lord almighty.",
    },
  },
  {
    id: 'epithet',
    label: 'Epithet',
    definition:
      'A descriptive title used in place of, or alongside, a name: a quick portrait in a phrase.',
    example: {
      text: 'Nu sculon herian heofonrices weard',
      work: "Cædmon's Hymn",
      entryId: 'caedmons-hymn',
      citation: 'line 1',
      translation: "Now we ought to praise heaven-kingdom's guardian",
    },
  },
  {
    id: 'kenning',
    label: 'Kenning',
    definition:
      'A compressed metaphor, usually a two-part compound, that names something by describing it: the sea as a "whale-road."',
    example: {
      text: 'ofer hronrade hyran scolde',
      work: 'Beowulf',
      entryId: 'beowulf',
      citation: 'line 10',
      translation: 'over the whale-road had to obey him',
    },
  },
  {
    id: 'personification',
    label: 'Personification',
    aliases: ['prosopopoeia'],
    definition:
      'Giving a human voice, feelings or actions to something that is not human.',
    example: {
      text: `Rod wæs ic aræred.${caesura}Ahof ic ricne cyning`,
      work: 'The Dream of the Rood',
      entryId: 'dream-of-the-rood',
      citation: 'line 44',
      translation: 'I was raised up as a cross; I lifted the mighty king',
    },
  },
  {
    id: 'refrain',
    label: 'Refrain',
    definition:
      'A line or phrase that repeats at intervals through a poem or song.',
    example: {
      text: 'Sumer is icumen in,\nLhude sing cuccu!',
      work: 'Sumer is icumen in',
      entryId: 'sumer-is-icumen-in',
      citation: 'lines 1–2',
      translation: 'Summer has come in,\nloudly sing, cuckoo!',
    },
  },
  {
    id: 'bob-and-wheel',
    label: 'Bob and wheel',
    definition:
      'The short closing unit of each stanza in Sir Gawain: a two-syllable line (the bob) followed by four short rhyming lines (the wheel), a quick change of pace after the long alliterative lines.',
    example: {
      text: 'wyth wynne,\nWhere werre and wrake and wonder\nBi syþez hatz wont þerinne,\nAnd oft boþe blysse and blunder\nFul skete hatz skyfted synne.',
      work: 'Sir Gawain and the Green Knight',
      entryId: 'sir-gawain',
      citation: 'lines 15–19',
      translation:
        'with joy,\nwhere war and vengeance and wonder\nhave dwelt there at times,\nand often both bliss and blunder\nhave quickly shifted since.',
    },
  },
  {
    id: 'mock-epic',
    label: 'Mock-epic',
    aliases: ['mock-heroic'],
    definition:
      'Describing something small or silly in the grand style of epic, for comic effect.',
    example: {
      text: 'His voys was murier than the myrie orgon\nOn messe-dayes that in the chirche gon.',
      work: "The Nun's Priest's Tale",
      entryId: 'nuns-priests-tale',
      citation: 'VII.2851–52',
      translation:
        'His voice was merrier than the merry organ\nthat plays in church on mass-days.',
    },
  },
  {
    id: 'syncretism',
    label: 'Syncretism',
    aliases: ['heroic-christian syncretism'],
    definition:
      'Blending ideas or images from two different traditions into one. Old English poets often cast Christian stories in the language of Germanic heroic poetry.',
    example: {
      text: `Ongyrede hine þa geong hæleð,${caesura}þæt wæs god ælmihtig`,
      work: 'The Dream of the Rood',
      entryId: 'dream-of-the-rood',
      citation: 'line 39',
      translation:
        'Then the young hero stripped himself — that was God almighty',
    },
  },
  {
    id: 'metaphor',
    label: 'Metaphor',
    aliases: ['architectural kenning', 'architectural metaphor'],
    definition:
      'Describing one thing as if it were another, without "like" or "as."',
    example: {
      text: 'That time of year thou mayst in me behold\nWhen yellow leaves, or none, or few, do hang',
      work: 'Sonnet 73',
      entryId: 'shakespeare-sonnets',
      citation: 'lines 1–2',
    },
  },
  {
    id: 'volta',
    label: 'Volta',
    aliases: ['turn'],
    definition:
      'The turn in a sonnet where the argument or mood shifts: after line eight in the Italian sonnet, often at the closing couplet in the English one.',
    example: {
      text: 'And yet, by heaven, I think my love as rare\nAs any she belied with false compare.',
      work: 'Sonnet 130',
      entryId: 'shakespeare-sonnets',
      citation: 'lines 13–14',
    },
  },
  {
    id: 'allegory',
    label: 'Allegory',
    definition:
      'A story in which characters and events stand for ideas, so the narrative carries a second, moral meaning. Spenser’s Redcrosse Knight is Holiness.',
    example: {
      text: 'A Gentle Knight was pricking on the plaine,\nYcladd in mightie armes and siluer shielde',
      work: 'The Faerie Queene',
      entryId: 'faerie-queene',
      citation: 'I.i.1',
    },
  },
  {
    id: 'soliloquy',
    label: 'Soliloquy',
    definition:
      'A speech in which a character alone on stage thinks aloud, letting the audience hear their private thoughts.',
    example: {
      text: 'Ah, Faustus,\nNow hast thou but one bare hour to live,\nAnd then thou must be damned perpetually.',
      work: 'Doctor Faustus',
      entryId: 'doctor-faustus',
      citation: 'final scene',
    },
  },
  {
    id: 'conceit',
    label: 'Conceit',
    aliases: ['metaphysical conceit'],
    definition:
      'An extended, clever and often surprising comparison followed through a whole poem, a favorite move of Donne’s.',
    example: {
      text: 'This flea is you and I, and this\nOur marriage bed, and marriage temple is;',
      work: 'The Flea',
      entryId: 'john-donne',
      citation: 'lines 12–13',
    },
  },
  {
    id: 'apostrophe',
    label: 'Apostrophe',
    definition:
      'Speaking directly to someone absent or something that cannot answer, such as Death.',
    example: {
      text: 'Death, be not proud, though some have callèd thee\nMighty and dreadful, for thou art not so;',
      work: 'Holy Sonnet 10',
      entryId: 'john-donne',
      citation: 'lines 1–2',
    },
  },
  {
    id: 'paradox',
    label: 'Paradox',
    definition:
      'A statement that seems to contradict itself but points to a deeper truth.',
    example: {
      text: 'Except you enthrall me, never shall be free,\nNor ever chaste, except you ravish me.',
      work: 'Holy Sonnet 14',
      entryId: 'john-donne',
      citation: 'lines 13–14',
    },
  },
  {
    id: 'pattern-poetry',
    label: 'Pattern poetry',
    aliases: ['shaped verse', 'pattern verse', 'concrete poetry'],
    definition:
      'A poem printed in a shape that mirrors its subject, so the layout on the page is part of the meaning.',
    example: {
      text: 'Lord, who createdst man in wealth and store,\nThough foolishly he lost the same,',
      work: 'Easter Wings',
      entryId: 'easter-wings',
      citation: 'lines 1–2',
    },
  },
  {
    id: 'blank-verse',
    label: 'Blank verse',
    definition:
      'Unrhymed lines of iambic pentameter (ten syllables, alternating unstressed and stressed). Used by Marlowe, Shakespeare and Milton.',
    example: {
      text: "Of Man's first disobedience, and the fruit\nOf that forbidden tree whose mortal taste",
      work: 'Paradise Lost',
      entryId: 'paradise-lost',
      citation: 'I.1–2',
    },
  },
]

const norm = (s: string) =>
  s
    .replace(/\s*\(.*\)\s*$/, '')
    .trim()
    .toLowerCase()

/** Match a device name from an entry; `detail` is its trailing parenthetical. */
export function findDevice(
  name: string
): { device: Device; detail?: string } | undefined {
  const key = norm(name)
  const device = devices.find(
    (d) =>
      d.id === key ||
      norm(d.label) === key ||
      d.aliases?.some((a) => norm(a) === key)
  )
  if (!device) return undefined
  const detail = name.match(/\(([^)]*)\)\s*$/)?.[1]?.trim()
  return { device, detail }
}
