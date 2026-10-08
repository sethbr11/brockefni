export interface ExternalLink {
  label: string
  url: string
  icon?: string
}

export interface WritingPiece {
  id: string
  slug: string
  title: string
  author: string
  subtitle?: string
  type: 'creative' | 'essay' | 'literary-analysis' | 'technical' | 'reflection'
  date: string
  year: number
  readTime: string
  courseContext?: string
  courseCode?: string
  summary: string
  tags: string[]
  content: string[]
  featured?: boolean
  externalUrl?: string
  pdfUrl?: string
  mediumUrl?: string
  linkedinUrl?: string
  externalLinks?: ExternalLink[]
}

export const writings: WritingPiece[] = [
  {
    id: 'ill-shave-tomorrow',
    slug: 'ill-shave-tomorrow',
    title: "I'll Shave Tomorrow",
    author: 'Seth Brock',
    type: 'creative',
    date: 'Summer 2026',
    year: 2026,
    readTime: '4 min read',
    courseContext: 'Intro to the English Major (ENGL 2800)',
    courseCode: 'UVU ENGL 2800',
    summary:
      'A reflective short story written for the Creative Writing assignment in ENGL 2800, exploring post-surgery recovery, physical limitation, routine, and the quiet internal struggle against procrastination.',
    tags: ['Creative Writing', 'Short Story', 'UVU', 'ENGL 2800', 'Personal Narrative'],
    featured: true,
    content: [
      'His facial hair was starting to get long. Not long enough to have any stylistic intention, but enough to be noticeable despite his thin, blonde hair. At times he found himself scratching the uneven patches where growth refused to present itself. At other times he caught himself stroking his chin with an unearned aplomb, an act reserved for someone with a real beard. He hadn’t shaved in nearly two weeks, and he knew it wasn’t going to get longer than this. Yet he couldn’t get himself to shave.',

      'It was a Saturday. After a long week of working his part-time job and idling through his free hours, he was spent. Morning was slipping away while the desire to pull himself out from under the covers had not yet arrived. Besides, it was the weekend; what was waiting for him today anyway? If he could just get enough rest before Monday, surely he would feel more energetic for next week. Having finished a grueling (but enjoyable) university degree just a few months prior, fatigue had to let up soon, right? Yet he couldn’t get himself to get out of bed.',

      'The clock passed 11:00 AM. The closed blinds were struggling to keep out the bright summer light, giving way for small rays to shine into his sleepy eyes. A desk fan whirred quietly across the room, circulating the stale air and doing its best to dissipate the heat. If nothing else it was an effective placebo, and the added white noise was welcome. Still not out of bed but glimpsing around his room, he saw duties that he’d delayed—laundry to put away, trash almost to the brim of the bin, dishes to move to the kitchen sink. He’d always prided himself in being generally very clean, but things slowly pile up, especially lately. Yet he couldn’t get himself to care.',

      'Eventually, he did get out of bed. The weighted blanket came off and his right leg swung out as he sat up on the bed. His left leg stayed straight on the bed; he took his time bringing it to the floor. Carefully it was lowered, with the brace on and locked, before picking up his crutches and shuffling his way over to the bathroom. Surgery had gone well, but he was still only a few weeks out, and therefore not allowed to put weight on it. Soon, but not yet. Getting into the shower was always the hardest part: sitting down on the lip of the porcelain tub, stretching to remove his clothes, then gingerly lifting his dead-weight leg up and over, hand braced underneath the knee. He stood up on his good leg under the warm spray, his right hand gripping onto the soap dish for an anchor. It had only been a couple of weeks since he had to wrap the knee in a trash bag and tape to keep water from running over the bandages and incisions. Slowly, things were getting easier.',

      'It was too late to call the meal breakfast, but it felt wrong to start the day with any other type of food. After drying off and getting dressed, he was welcomed by a kind egg, bacon, and cheese omelet that his mom had made for him and brought downstairs to his room. Living in his parents’ basement wasn’t where a university graduate envisioned himself at this stage of life, but the aid and financial shelter during recovery made it very practical. He’d contemplated moving out many times and had offers from friends to move into spaces with them, but moving never seemed to make sense—not yet. Slowly, he was looking for his path forward.',

      'The afternoon soon opened up before him. There’s a lot one could do with seven or eight hours of daylight—so many options on a beautiful, sunny Saturday like today. Despite inhibited mobility, progress was possible. Chores could be completed, albeit at a slower pace. It was worth it to give himself a clean space he could feel comfortable in. The upcoming week could be planned out, balancing physical therapy, work duties, and social obligations. There were many books on the shelf just waiting to be read; his scriptures lay open on the desk by the fan, waiting to be studied; his friends sat there on his phone, waiting to be reached out to. A notebook full of project and startup ideas waited to be brought to life, the ideas having spun around in his head for the last several months. Slowly, possibilities seemed to widen.',

      '<em>Where should I start?</em> What a paralyzing thought. Could he really get the chores done with his limited mobility? He had done it before, but it had taken a long time. Was that time he could afford? What about everything else that could be done today? Could he afford spending that much energy? Besides, walking around with crutches meant that he couldn’t actually hold anything in his hands—they were busy propping him up. His bedroom wasn’t that bad really. <em>Tomorrow,</em> he resolved, <em>I can wake up earlier and have more time to tackle organizing the room</em>. A short break to clear the mind felt like a responsible choice. Quickly, the momentum slowed.',

      'By mid-afternoon, as the light from the blinds shifted across the carpet, it had come to his mind to read while he rested. As a child, books had always been a pleasant escape. He recalled the time his mother spent every night reading to him and his siblings as they drifted off to sleep. Later, he would discover fantasy series that would suck him into lands of wonder and adventure. That had been years ago, though—over a decade since he had last read for fun. <em>Where am I supposed to start? Can I enjoy it like I used to?</em> Even turning to his scriptures felt daunting; his mind was just too muddled to absorb dense passages. <em>How can I engage with anything meaningful when I feel so scatterbrained?</em> Quickly, his wonderment began to fade.',

      '<em>I still have my projects,</em> he thought to himself with some semblance of determination. Years of school studying computers and programming gave him the skills to build useful tools from scratch. He had built some open-source utilities before, tools he still relied on. He had even pitched ambitious capstone ideas to classmates—ideas they passed on, but were still exciting to him. But now the ideas just seemed too much for one man to start by himself. The technical hurdles could take weeks to figure out. As much as he loved solving problems, staring at the computer screen for hours always brought on familiar, heavy exhaustion, the very thing he was trying to escape. The light shining through the window began to orange as the afternoon passed and evening began to set in. Quickly, the day was coming to an end.',

      'And then, it was night, and what did he have to show for it?',

      '<em>That’s just how recovery is, how life is sometimes</em>, he rationalized. <em>Waste a day here, waste a day there, but make up for it later with a hundred active, productive, joyful days.</em>',

      'The thought no sooner completed itself than a darker one took its place: <em>Are those days behind me?</em> Those wonderful days where things seemed so clear, where every step carried confidence in the next, where the events of life seemed to roll out in front of him like a scroll.',

      'Kneeling as best he could at his bed, he rested his elbows on his blanket and offered a brief prayer for the return of those qualities—the direction, the stability, the confidence, the discipline. Maybe one day he would find that again, but, at least for now, it was time to go back to bed. As he lay in the dark, his hand reached up again to his face, his fingers tracing the jawline dotted with patchy stubble.',

      '<em>I’ll shave tomorrow</em>, he thought, and closed his eyes.',
    ],
  },
  {
    id: 'startup-framework',
    slug: 'startup-framework',
    title: 'A Startup Framework: Getting Started with Less Stress and More Efficiency',
    author: 'Seth Brock',
    type: 'essay',
    date: 'Summer 2024',
    year: 2024,
    readTime: '6 min read',
    courseContext: 'Management Communication (M COM 320)',
    courseCode: 'BYU M COM 320',
    summary:
      'A research-backed business communication article written for M COM 320, exploring how early-stage startup founders can manage psychological stress, maintain operational efficiency, and build resilient business habits.',
    tags: ['Management Communication', 'Startup Strategy', 'Founder Well-Being', 'Efficiency', 'BYU', 'PDF'],
    featured: true,
    externalUrl:
      'https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/startup-framework-article.pdf',
    pdfUrl: 'https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/startup-framework-article.pdf',
    linkedinUrl:
      'https://www.linkedin.com/pulse/startup-framework-getting-started-less-stress-more-efficiency-brock-k3eec/',
    externalLinks: [
      {
        label: 'Download Illustrated PDF',
        url: 'https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/startup-framework-article.pdf',
      },
      {
        label: 'View on LinkedIn Pulse',
        url: 'https://www.linkedin.com/pulse/startup-framework-getting-started-less-stress-more-efficiency-brock-k3eec/',
      },
    ],
    content: [],
  },
  {
    id: 'monte-carlo-simulation',
    slug: 'monte-carlo-simulation',
    title: 'Coding a Simple Monte Carlo Simulation in Python',
    author: 'Seth Brock',
    type: 'technical',
    date: 'May 2024',
    year: 2024,
    readTime: '16 min read',
    courseContext: 'Teaching Assistant • GSCM 512',
    courseCode: 'BYU GSCM 512',
    summary:
      'A practical, step-by-step guide to understanding and coding a Monte Carlo simulation in Python (Jupyter Notebook) using an airline route profitability optimization model, created while serving as a Teaching Assistant for GSCM 512 (Spreadsheets & Business Analysis).',
    tags: ['Python', 'Data Science', 'Monte Carlo', 'GSCM 512', 'Teaching Assistant', 'Medium'],
    featured: true,
    externalUrl:
      'https://medium.com/@sethabrock/coding-a-simple-monte-carlo-simulation-in-python-6db670fd73aa',
    mediumUrl:
      'https://medium.com/@sethabrock/coding-a-simple-monte-carlo-simulation-in-python-6db670fd73aa',
    externalLinks: [
      {
        label: 'Read on Medium',
        url: 'https://medium.com/@sethabrock/coding-a-simple-monte-carlo-simulation-in-python-6db670fd73aa',
      },
      {
        label: 'Course GitHub Repository',
        url: 'https://github.com/sethbr11/IntroToDataWrangling',
      },
    ],
    content: [],
  },
]

export default writings
