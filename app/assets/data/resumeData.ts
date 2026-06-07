export interface KPI {
  value: string
  label: string
  url?: string
  type?: string
}

export interface Job {
  role: string
  company: string
  dates: string
  location: string
  bullets: string[]
  skills: string[]
  kpis?: KPI[]
}

export interface Course {
  name: string
  description: string
}

export interface Interest {
  name: string
  emoji: string
}

export const jobs: Job[] = [
  {
    role: 'DevOps Engineer',
    company: 'Utah County Government (Information Systems Dept.)',
    dates: 'Jan 2026 – Present',
    location: 'Provo, UT',
    bullets: [
      'Develop tooling and manage application visibility and deployment systems across 17 county departments that service the whole county.',
      'Built and published the open-source UptimeRobot Suite (TypeScript SDK, CLI REPL, and Backstage IDP plugins) to track service health and increase system visibility.',
      'Architect developer tools to manage and track system reliability for over 400 active code repositories.',
      'Collaborate with dev teams across the organization, using strong problem-solving and documentation skills to build robust developer workflows.',
    ],
    skills: [
      'TypeScript',
      'Node.js',
      'Docker',
      'Backstage',
      'React',
      'APIs',
      'Git',
      'Problem Solving',
      'Collaboration',
    ],
    kpis: [
      { value: '50+', label: 'Websites Monitored' },
      { value: '400+', label: 'Repos Tracked' },
      {
        value: 'UptimeRobot Tooling',
        label: 'Software Suite',
        url: '/uptimerobot',
        type: 'uptimerobot',
      },
    ],
  },
  {
    role: 'Software Engineer',
    company: 'DesktopHero (TitanCraft)',
    dates: 'May 2024 – Jan 2026',
    location: 'Tucson, AZ (Remote)',
    bullets: [
      'Created extensive Blender tooling with Python and SAM2 (Segment Anything 2) integration to prototype a 3D mesh color region segmentation system, reducing developer onboarding time.',
      'Engineered a cross-platform desktop version of TitanCraft compatible with Windows and macOS using ElectronJS.',
      'Automated invoices and created partner dashboards for academic accounts utilizing Figma designs and Stripe integrations.',
      'Built custom tracking systems and Retool dashboards to manage progress on color regions and asset optimization workflows across 1,000+ assets.',
      'Architected serverless, Docker-based applications for secure and scalable third-party token processing.',
      'Demonstrated strong research skills, self-organization, and collaborative engineering in a small remote team.',
    ],
    skills: [
      'Python',
      'Django',
      'ElectronJS',
      'Docker',
      'Stripe',
      'Retool',
      'Figma',
      'Blender',
      'APIs',
      'Git',
      'Research',
      'Project Organization',
      'Problem Solving',
    ],
    kpis: [
      { value: '1k+', label: 'Assets Optimized' },
      { value: 'Mac/Windows', label: 'Desktop MVPs' },
      {
        value: 'TitanCraft',
        label: 'Main Site',
        url: 'https://titancraft.com',
        type: 'titancraft',
      },
    ],
  },
  {
    role: 'Web Engineer/Developer',
    company: 'PLUNJ Corporation',
    dates: 'Nov 2024 – Jun 2025',
    location: 'Provo, UT',
    bullets: [
      'Spearheaded development of an internal team to facilitate website and CRM full-stack development/maintenance for three operational locations with approx. 10 more planned to be added.',
      'Managed AWS resources to accommodate hundreds of daily website users and optimize costs.',
      'Built clean PHP, Laravel, and Vue.js code to support serverless web hosting and optimize UI/UX components.',
      'Drove team productivity and team leadership, designing clean, scalable architectures.',
    ],
    skills: [
      'AWS',
      'PHP',
      'Laravel',
      'Vue.js',
      'Docker',
      'Serverless Hosting',
      'Full-Stack',
      'UI/UX',
      'SQL',
      'Git',
      'Productivity',
    ],
  },
  {
    role: 'Teaching & Research Assistant (IS Dept.)',
    company: 'BYU Marriott School of Business',
    dates: 'Jan - Dec 2024, Fall 2025',
    location: 'Provo, UT',
    bullets: [
      'Co-Created Course Content (TA): Collaborated directly with professor to design and build a new 500-level curriculum and database labs for the Marriott School Global Supply Chain program (GSCM 512) to introduce Python data analytics.',
      'Summer Research Assistant (RA): Prominently served as a dedicated Summer RA, performing MATLAB data modeling and supply chain research.',
      'IS Junior-Core TA: Tutored students and held laboratory reviews for IS 201 (Intro to Information Systems) and IS 415 (Exploratory Data Analysis), grading assignments in Python, SQL, VBA, Tableau, and more.',
      'Exhibited strong communication, curriculum design, and patience while tutoring over 100 students.',
    ],
    skills: [
      'Python',
      'Jupyter Notebook',
      'MATLAB',
      'SQL',
      'VBA',
      'HTML/CSS',
      'Bootstrap',
      'Tableau',
      'Tutoring',
      'Curriculum Design',
      'Communication',
    ],
    kpis: [
      { value: '100+', label: 'Students Helped' },
      { value: 'GSCM 512', label: 'Course Creation' },
      {
        value: 'Data Wrangling',
        label: 'Self-Led Intro Course',
        url: 'https://github.com/sethbr11/IntroToDataWrangling',
        type: 'github',
      },
    ],
  },
  {
    role: 'Director of Technology',
    company: 'TribeHouse',
    dates: 'Jul 2023 – Dec 2024',
    location: 'Pleasant Grove, UT',
    bullets: [
      'Bolstered organizational security and data protection by transitioning credential management from insecure shared spreadsheets to an enterprise-grade password manager (Zoho Vault), establishing secure access controls across the organization.',
      'Analyzed and upgraded technological assets and processes using Stripe, Keap, WordPress, and Retool for a 7-person team.',
      'Maintained and serviced physical facilities and associated technological business assets to create a polished environment for customers.',
      'Exhibited proactive technology leadership, hardworking problem resolution, and organization to optimize business operations.',
    ],
    skills: [
      'Stripe',
      'Keap',
      'WordPress',
      'Retool',
      'Zoho Vault',
      'Leadership',
      'Hardworking',
      'Organization',
    ],
  },
  {
    role: 'Volunteer Representative',
    company: 'The Church of Jesus Christ of Latter-day Saints',
    dates: 'June 2021 – July 2023',
    location: 'Tucson, Arizona',
    bullets: [
      'Provided 24 months of full-time volunteer service, leading local community programs and organizing outreach efforts.',
      'Leveraged Facebook Business Suite to coordinate communications, manage public relations campaigns, and organize large-scale community events.',
      'Demonstrated strong self-organization, leadership, and hardworking dedication in daily operations.',
    ],
    skills: [
      'Facebook Business Suite',
      'Leadership',
      'Communication',
      'Organization',
      'Hardworking',
    ],
  },
]

export const skillCategories: Record<string, string[]> = {
  'Programming Languages': [
    'HTML/CSS',
    'JavaScript',
    'TypeScript',
    'C++',
    'C#',
    'Python',
    'R',
    'MATLAB',
    'Swift',
    'PHP',
    'VBA',
  ],
  'Frameworks & Libraries': [
    '.NET',
    'Django',
    'Node.js',
    'Vue.js',
    'React',
    'ElectronJS',
    'Laravel',
    'Bootstrap',
  ],
  'Infrastructure & DevOps': [
    'SQL',
    'NoSQL',
    'Terraform',
    'Docker',
    'Git',
    'AWS',
    'DevOps',
    'Backstage',
    'Serverless Hosting',
    'APIs',
  ],
  'Tools & Platforms': [
    'WordPress',
    'Facebook Business Suite',
    'Retool',
    'Tableau',
    'Brightspot',
    'Keap',
    'Stripe',
    'Figma',
    'Blender',
    'DBT',
    'Prefect',
    'MCPs',
    'Zoho Vault',
  ],
  'Professional & Soft Skills': [
    'Problem Solving',
    'Collaboration',
    'Research',
    'Project Organization',
    'Productivity',
    'Tutoring',
    'Curriculum Design',
    'Communication',
    'Organization',
    'Hardworking',
    'Leadership',
    'Scrum',
  ],
}

export const courses: Course[] = [
  {
    name: 'Machine Learning & Predictive Analytics',
    description:
      'Supervised and unsupervised learning models, data classification, regression, and model evaluation using Python (IS 415 / IS 455).',
  },
  {
    name: 'Data Science for Organizations (IS 555)',
    description:
      'Full data science process including exploratory data analysis, data wrangling, machine learning, and predictive modeling using R.',
  },
  {
    name: 'Enterprise Application Development',
    description:
      'Scalable full-stack software development, REST APIs, and microservice architectures (IS 413).',
  },
  {
    name: 'Advanced Database Systems (IS 566)',
    description:
      'Enterprise data manipulation and handling using Python mainly in conjunction with NoSQL databases, DBT, Prefect, and Model Context Protocol (MCP) integrations.',
  },
  {
    name: 'Enterprise Infrastructure',
    description:
      'Cloud topologies, network routing, virtualization, and systems administration (IS 531).',
  },
  {
    name: 'Information Security Management',
    description:
      'Cryptographic systems, risk assessments, secure network design, and security controls (IS 560 / IS 414).',
  },
  {
    name: 'Digital Forensics & Security Controls',
    description:
      'Digital forensics investigations, network packet analysis, and enterprise compliance audits (IS 565).',
  },
  {
    name: 'Mobile Platform Development',
    description:
      'Design, engineering, and deployment of native and cross-platform mobile systems (IS 543).',
  },
  {
    name: 'Project Management & Systems Design (IS 401 / IS 551 / IS 581)',
    description:
      'Agile project management, Scrum methodology, Figma prototyping, systems design, pricing models, marketing strategies, and software startup launches.',
  },
]

export const interests: Interest[] = [
  { name: 'Soccer', emoji: '⚽' },
  { name: 'Basketball', emoji: '🏀' },
  { name: 'Skiing', emoji: '⛷️' },
  { name: 'Bowling', emoji: '🎳' },
  { name: 'Saxophone', emoji: '🎷' },
  { name: 'Piano', emoji: '🎹' },
  { name: 'Singing', emoji: '🎤' },
]
