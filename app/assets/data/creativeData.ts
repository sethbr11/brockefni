export interface CreativeWork {
  id: string
  title: string
  category: 'sketch-to-painting' | 'illustration' | 'music' | 'craft'
  date: string
  medium: string
  description: string
  beforeImage?: string
  afterImage?: string
  beforeLabel?: string
  afterLabel?: string
  image?: string
  audioUrl?: string
  audioTitle?: string
  instrument?: string
  tags: string[]
  story?: string
}

export const creativeWorks: CreativeWork[] = [
  {
    id: 'sketch-to-painting-collaboration',
    title: 'From Pencil to Canvas: Collaborative Landscape',
    category: 'sketch-to-painting',
    date: '2026',
    medium: 'Graphite Pencil Sketch ➔ Commissioned Oil Painting',
    beforeLabel: 'Original Graphite Sketch',
    afterLabel: 'Commissioned Oil Painting',
    description:
      'A personal graphite concept sketch turned into a vibrant commissioned oil painting, capturing the interplay of natural light, mountain contours, and rich texture.',
    tags: ['Graphite Sketch', 'Oil Painting', 'Art Collaboration'],
    story:
      'Starting with raw pencil lines and shaded value studies on heavy paper, I wanted to capture the mood and depth of the scenery before handing the visual blueprint off to be interpreted in oil paints.',
  },
  {
    id: 'saxophone-studies',
    title: 'Saxophone Explorations',
    category: 'music',
    date: '2026',
    medium: 'Alto / Tenor Saxophone',
    instrument: 'Saxophone',
    description:
      'Acoustic practice sessions, jazz standards, melodic phrasing, and improvisational warmups on saxophone.',
    tags: ['Saxophone', 'Jazz & Melody', 'Acoustic'],
  },
  {
    id: 'piano-repertoire',
    title: 'Piano & Keyboard Pieces',
    category: 'music',
    date: '2026',
    medium: 'Acoustic & Digital Piano',
    instrument: 'Piano',
    description:
      'Classical repertoire, contemporary piano arrangements, and harmonic chord progressions.',
    tags: ['Piano', 'Classical & Contemporary', 'Composition'],
  },
  {
    id: 'vocal-repertoire',
    title: 'Vocal Performance & Choir',
    category: 'music',
    date: '2026',
    medium: 'Vocal & Choral Singing',
    instrument: 'Vocals',
    description:
      'Choral singing, vocal technique, harmony, and musical performances.',
    tags: ['Singing', 'Choral Harmony', 'Vocal Music'],
  },
]

export default creativeWorks
