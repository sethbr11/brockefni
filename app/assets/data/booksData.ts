export interface Book {
  id: string
  title: string
  author: string
  isbn?: string
  coverUrl?: string
  dateRead?: string
  yearRead?: number
  status: 'read' | 'reading' | 'want-to-read'
  rating?: number
  genres: string[]
  tags?: string[]
  notes?: string
  favoriteQuotes?: string[]
  spineColor?: string
  spineTextColor?: string
  heightMultiplier?: number // 0.85 to 1.15 for organic shelf variation
  widthMultiplier?: number  // 0.85 to 1.2 for organic spine thickness
}

export const books: Book[] = [
  {
    id: 'franklin-autobiography',
    title: 'The Autobiography of Benjamin Franklin',
    author: 'Benjamin Franklin',
    isbn: '9780486290737',
    dateRead: 'Aug 2026',
    yearRead: 2026,
    status: 'reading',
    rating: 5,
    genres: ['Autobiography', 'Classics', 'History', 'Enlightenment'],
    tags: ['Personal Growth', 'American History'],
    notes:
      "Currently reading through Franklin's legendary memoirs. Fascinating look into early American civic life, printing, self-improvement experiments (the 13 virtues scheme), and polymathic problem solving.",
    favoriteQuotes: [
      'Either write something worth reading or do something worth writing.',
      'An investment in knowledge pays the best interest.',
    ],
    spineColor: '#7a2021',
    spineTextColor: '#f7dfa5',
    heightMultiplier: 1.05,
    widthMultiplier: 1.1,
  },
  {
    id: 'jekyll-and-hyde',
    title: 'The Strange Case of Dr Jekyll and Mr Hyde',
    author: 'Robert Louis Stevenson',
    isbn: '9780141439730',
    dateRead: 'Aug 2026',
    yearRead: 2026,
    status: 'reading',
    rating: 4,
    genres: ['Gothic Fiction', 'Classics', 'Victorian Literature', 'Horror'],
    tags: ['Dual Nature of Man', 'Victorian London'],
    notes:
      'Exploring the profound psychological duality and gothic atmosphere of late-Victorian London. Stevenson masterfully questions the boundaries of moral suppression and human hypocrisy.',
    favoriteQuotes: [
      'With every day, and from both sides of my intelligence, the moral and the intellectual, I thus drew steadily nearer to that truth, by whose partial discovery I have been doomed to such a dreadful shipwreck: that man is not truly one, but truly two.',
    ],
    spineColor: '#1d432b',
    spineTextColor: '#c2e7d9',
    heightMultiplier: 0.92,
    widthMultiplier: 0.95,
  },
  {
    id: 'do-androids-dream',
    title: 'Do Androids Dream of Electric Sheep?',
    author: 'Philip K. Dick',
    isbn: '9780345404473',
    dateRead: 'Aug 2026',
    yearRead: 2026,
    status: 'reading',
    rating: 5,
    genres: ['Science Fiction', 'Dystopian', 'Cyberpunk', 'Philosophy'],
    tags: ['AI & Consciousness', 'Empathy', 'Sci-Fi Classic'],
    notes:
      'A philosophical cornerstone of cyberpunk and speculative fiction. Delves deep into the existential definition of empathy, artificial consciousness, and what distinguishes humanity from its synthetic creations.',
    favoriteQuotes: [
      'You will be required to do wrong no matter where you go. It is the basic condition of life, to be required to violate your own identity.',
      'Empathy, evidently, existed only within the human community...',
    ],
    spineColor: '#203a5c',
    spineTextColor: '#fca311',
    heightMultiplier: 0.98,
    widthMultiplier: 1.05,
  },
  {
    id: 'saussure-linguistics',
    title: 'Course in General Linguistics',
    author: 'Ferdinand de Saussure',
    isbn: '9780231157278',
    dateRead: 'Aug 2026',
    yearRead: 2026,
    status: 'read',
    rating: 5,
    genres: ['Linguistics', 'Structuralism', 'Semiotics', 'Philosophy'],
    tags: ['Signifier & Signified', 'Structuralism', 'Academic Core'],
    notes:
      'Foundational text for structural linguistics and semiotics. Saussure’s distinction between langue and parole, and the arbitrary nature of the sign (signifier/signified), reshaped 20th-century critical theory.',
    favoriteQuotes: [
      'In language there are only differences, without positive terms.',
      'Language is a system of signs that express ideas...',
    ],
    spineColor: '#3c3a4a',
    spineTextColor: '#e2e8f0',
    heightMultiplier: 1.12,
    widthMultiplier: 1.15,
  },
  {
    id: 'caedmons-hymn',
    title: 'Cædmon’s Hymn',
    author: 'Bede',
    isbn: '9780199537235',
    dateRead: 'Aug 2026',
    yearRead: 2026,
    status: 'read',
    rating: 5,
    genres: ['Old English', 'Poetry', 'Medieval Literature', 'History'],
    tags: ['Alliterative Verse', 'Oral Tradition', 'UVU Lit History'],
    notes:
      'The earliest recorded Old English poem, preserved in Bede’s Ecclesiastical History of the English People. Demonstrates the Anglo-Saxon alliterative verse tradition and the christianization of Germanic heroic poetry.',
    favoriteQuotes: [
      'Nu scylun hergan hefaenricaes uard, metudaes maecti end his modgidanc...',
      'Now we must praise the Guardian of heaven’s kingdom, the Maker’s might and his mind’s conception...',
    ],
    spineColor: '#5c3a21',
    spineTextColor: '#fde68a',
    heightMultiplier: 0.88,
    widthMultiplier: 0.85,
  },
  {
    id: 'dream-of-the-rood',
    title: 'The Dream of the Rood',
    author: 'Anonymous (Old English)',
    isbn: '9780859917834',
    dateRead: 'Aug 2026',
    yearRead: 2026,
    status: 'read',
    rating: 5,
    genres: ['Old English', 'Poetry', 'Medieval Literature', 'Christian Literature'],
    tags: ['Dream Vision', 'Runic Inscriptions', 'Ruthwell Cross'],
    notes:
      'One of the masterpieces of Old English alliterative verse and dream vision poetry. The Cross speaks directly as a loyal thane to Christ portrayed as a triumphant Germanic warrior king.',
    favoriteQuotes: [
      'Hwæt! Ic swefna cyst secgan wylle, hwæt me gemætte to midre nihte...',
      'Lo! I will tell the best of dreams, which came to me at midnight...',
    ],
    spineColor: '#172554',
    spineTextColor: '#f8fafc',
    heightMultiplier: 0.9,
    widthMultiplier: 0.88,
  },
]

export default books
