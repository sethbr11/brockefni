import type { Entry } from '../../commonplaceData'
import { caesura } from '../formatting'

export default {
  id: 'caedmons-hymn',
  title: "Cædmon's Hymn",
  author: 'Cædmon (via Bede)',
  period: 'old-english',
  composed: 'c. 731',
  language: 'Old English',
  assigned: 'Aug 25',
  tags: ['creation-and-art', 'divine-authority'],
  passages: [
    {
      text:
        `Nu sculon herian${caesura}heofonrices weard,\n` +
        `Metodes meahta${caesura}ond his modgeþanc,\n` +
        `weorc wuldorfæder,${caesura}swa he wundra gehwæs,\n` +
        `ece Drihten,${caesura}or astealde.\n` +
        `He ærest scop${caesura}ielda bearnum\n` +
        `heofon to hrofe,${caesura}halig Scieppend;\n` +
        `þa middangeard${caesura}manncynnes weard,\n` +
        `ece Drihten,${caesura}æfter teode,\n` +
        `firum foldan${caesura}Frea ælmihtig.`,
      citation: 'lines 1–9',
      startLine: 1,
      translation:
        "Now (we) ought to praise Heaven-kingdom's guardian,\n" +
        "the Maker's might and his mind's thoughts,\n" +
        'the work of the glory-father, as he of each of wonders,\n' +
        'eternal Lord, established a beginning.\n' +
        "He first shaped for men's sons\n" +
        'Heaven as a roof, the holy Creator;\n' +
        "then middle-earth mankind's guardian,\n" +
        'eternal Lord, afterwards prepared\n' +
        'the earth for men, the Lord almighty.',
      note: 'Notice two defining formal features of the hymn: the sequence of nine distinct divine epithets, and the architectural metaphor in line 6 (“heofon to hrofe”), where God crafts the cosmos as a protective hall with heaven as its roof.',
      tags: ['creation-and-art', 'divine-authority'],
    },
  ],
  summary:
    'In Bede’s Ecclesiastical History (IV.24), Cædmon is an unlearned cowherd at the monastery of Whitby who flees an evening feast out of shame because he cannot sing to the harp. Falling asleep in the stable where he was taking care of the cattle for the night, an angelic stranger appears to him in a dream commanding him to sing “the beginning of created things.” Cædmon awakens with the divine gift of song and recites this nine-line hymn celebrating God as the heavenly architect who vaulted the sky as a protective roof for mortals before fashioning the floor of middle-earth.',
  commentary:
    'Cædmon’s Hymn demonstrates how early English vernacular poetry synthesizes traditional pagan heroic diction with Christian theology. The entire nine-line poem consists of a single continuous hymn of praise, moving symmetrically from God’s eternal existence to the twin acts of creation: first the heavens, then the earth.\n\n' +
    'THE NINE EPITHETS FOR GOD\n' +
    'In just nine lines, Cædmon employs nine distinct names and titles in apposition (variation), each revealing a different facet of divine sovereignty by borrowing the vocabulary of the Anglo-Saxon warlord and king:\n' +
    '1. **heofonrices weard (line 1)** — “Heaven-kingdom’s guardian” (weard denotes a watchman, guardian, or protective lord over a realm).\n' +
    '2. **Metod (line 2)** — “Maker” / “The Measurer” (translated here as “the Maker’s might”; etymologically rooted in metan [to measure or apportion], an ancient Germanic concept of the ordainer of fate or cosmic bounds, re-baptized as the providential Creator).\n' +
    '3. **wuldorfæder (line 3)** — “Glory-father” (father of glory and wondrous deeds).\n' +
    '4. **ece Drihten (line 4)** — “Eternal Lord” (Drihten designates the leader of a dryht, the martial warrior-retinue or comitatus).\n' +
    '5. **halig Scieppend (line 6)** — “Holy Creator” / “Shaper” (from scieppan, emphasizing tactile, artistic shaping).\n' +
    '6. **manncynnes weard (line 7)** — “Mankind’s guardian” (echoes line 1, pivoting from cosmic guardian to personal protector of mortals).\n' +
    '7. **ece Drihten (line 8)** — “Eternal Lord” (a structural refrain reaffirming God’s timeless majesty across both stages of creation).\n' +
    '8. **Frea (line 9)** — “Lord” or “Master” (an archaic Germanic title for a tribal chieftain, cognate with Old Norse Freyr).\n' +
    '9. **ælmihtig (line 9)** — “Almighty” (qualifies Frea in the translation as “the Lord almighty,” the supreme chieftain over all earthly rulers).\n\n' +
    'THE COSMIC ROOF (“HEOFON TO HROFE”)\n' +
    'In lines 5–6, creation is visualized not as abstract ex nihilo genesis, but as physical architecture: “He ærest scop ielda bearnum / heofon to hrofe, halig Scieppend” (“He first shaped for men’s sons heaven as a roof, the holy Creator”). This metaphor draws directly on Anglo-Saxon mead-hall culture, where the timbered hall (such as Heorot in Beowulf) served as the sanctuary of warmth, communal feasting, light, and protection against the chaotic darkness outside. By imagining heaven as a roof vaulted over the children of men, Cædmon presents the cosmos as God’s great hall, with the sky as its protective rafters and “middle-earth” (middangeard, literally the middle enclosure) as its floor.\n\n' +
    'COMMONPLACE REFLECTION & TEXTUAL PRODUCTION\n' +
    'Cædmon’s story also inaugurates our reflection on the commonplace book as a medium. Bede’s Latin narrative frames an illiterate cowherd whose oral song was originally preserved in manuscript margins and vernacular glosses. Transcribing and annotating it here in a digital miscellany mirrors that historical act of textual preservation, initiating our ongoing study of how English writers from Bede to Milton and Cavendish conceptualize divine inspiration, poetic making, and vernacular authority.',
  devices: [
    'Alliterative verse',
    'Medial caesura',
    'Poetic variation (apposition)',
    'Heroic-Christian syncretism',
    'Architectural kenning (heofon to hrofe)',
  ],
  notes:
    'Preserved in the margins and Old English translation of Bede’s Historia ecclesiastica gentis Anglorum (completed 731). Composed orally in Northumbrian dialect during the abbacy of Hild at Whitby (657–680); preserved here in the standard West Saxon dialect.',
  link: {
    url: 'https://en.wikisource.org/wiki/C%C3%A6dmon%27s_Hymn',
    label: 'Wikisource',
    kind: 'free',
  },
  scene: 'caedmons-hymn',
} satisfies Entry
