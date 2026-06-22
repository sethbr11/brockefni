import type { Badge } from './badges'
import { b } from './badges'
import chromeWebStoreIcon from '@/assets/icons/chrome-web-store.png'
import githubIcon from '@/assets/icons/github.png'
import youtubeIcon from '@/assets/icons/youtube.png'
import downloadIcon from '@/assets/icons/download.png'
import colabIcon from '@/assets/icons/colab.png'
import huggingfaceIcon from '@/assets/icons/huggingface.svg'
import pytorchIcon from '@/assets/icons/pytorch.png'
import nodejsIcon from '@/assets/icons/nodejs.svg'
import pencilIcon from '@/assets/icons/pencil.png'

export interface CardData {
  title: string
  description?: string
  link?: {
    url: string
    text?: string
    external: boolean
  }
  actions?: Array<{
    text: string
    color: string
    icon: string
    link: string
  }>
  badges?: Badge[]
}

const defaultActions = {
  github: (link: string, text: string = 'GitHub') => ({
    text,
    color: '#C06EFF',
    icon: githubIcon,
    link,
  }),
  youtube: (link: string, text: string = 'Tutorial') => ({
    text,
    color: '#FF3B3B',
    icon: youtubeIcon,
    link,
  }),
}

const createLink = (url: string, text?: string, external: boolean = true) => ({
  url,
  text,
  external,
})

const createAction = (
  text: string,
  color: string,
  icon: string,
  link: string
) => ({
  text,
  color,
  icon,
  link,
})

const cardData: CardData[] = [
  {
    title: 'LCR Tools',
    description:
      'A Google Chrome extension for enhancing the functionality and user experience of LCR (Leader and Clerk Resources) for The Church of Jesus Christ of Latter-day Saints. Fixing bugs and adding quality-of-life features.',
    badges: [b.html, b.javascript, b.css, b.nodejs],
    link: createLink('/lcr', 'Product Page', false),
    actions: [
      createAction(
        'Store',
        '#2dafed',
        chromeWebStoreIcon,
        'https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn'
      ),
      defaultActions.github('https://github.com/sethbr11/lcr-tools'),
      defaultActions.youtube(
        'https://www.youtube.com/playlist?list=PL2PIa0u5jTtY6uQYHQRhOdwP2yTdmyNUS',
        'Tutorials'
      ),
    ],
  },
  {
    title: 'Phishing Demo',
    description:
      'A local, Python-based phishing simulation environment for academic demonstrations. Developed as part of a Capstone project for presenting cybersecurity concepts to 5th graders. Experience the interactive simulation to see how it works!',
    badges: [b.python, b.bash],
    link: createLink('/phishing-demo', 'Interactive Demo', false),
    actions: [
      createAction(
        'Email Me',
        '#ff3b3b',
        pencilIcon,
        "mailto:seth@brockefni.com?subject=Interest%20in%20Email%20Phishing%20Academic%20Example&body=Hi%20Seth!%0A%0AI'm%20interested%20in%20learning%20more%20about%20you%20email%20phishing%20demo%20for%20the%20purpose%20of%20%5BINSERT%20REASON%20HERE%5D.%0A%0AFrom%2C%0A%5BYOUR%20NAME%20HERE%5D"
      ),
    ],
  },
  {
    title: 'UptimeRobot Suite',
    description:
      'A comprehensive ecosystem of open-source tools and integrations for UptimeRobot. Includes a community-maintained TypeScript/Node.js SDK, an interactive command-line REPL, and a full-featured Backstage plugin spanning both frontend and backend components.',
    badges: [b.nodejs, b.typescript, b.react],
    link: createLink('/uptimerobot', 'Suite Page', false),
  },
  {
    title: 'Rodun',
    description:
      'A fast, simple desktop app to help optimize the use of materials by planning cuts based on user-provided specifications. Features clean PDF exports. This app was commissioned and is now free to use.',
    badges: [b.cpp, b.bash],
    link: createLink('/rodun', 'Info and Installation', false),
    actions: [
      defaultActions.github('https://github.com/sethbr11/Rodun'),
      createAction(
        'Download (MacOS)',
        '#3d8f42',
        downloadIcon,
        'https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/Rodun-v.1.0.0-Installer-MacOS.dmg'
      ),
    ],
  },
  {
    title: 'Personal Time Tracker',
    description:
      'A simple time clock application that keeps track of time spent for any kind of project through a clean, interactive user interface. It connects to a Google Sheet via a secure Express backend for persistent storage and can be easily containerized and deployed using Docker.',
    badges: [b.javascript, b.react, b.docker],
    link: createLink('https://github.com/sethbr11/Personal-Time-Tracker'),
    actions: [
      defaultActions.github(
        'https://github.com/sethbr11/Personal-Time-Tracker'
      ),
    ],
  },
  {
    title: 'Z-Skelheim',
    description:
      'From the Icelandic words skel (“shell”) and heim (“home”), meaning “Shell Home.” This was built to help me personally in my development projects. I published this to demonstrate proficiency in shell scripting and in hopes that others could benefit from it.',
    badges: [b.zsh],
    link: createLink('https://github.com/sethbr11/Z-Skelheim'),
    actions: [defaultActions.github('https://github.com/sethbr11/Z-Skelheim')],
  },
  {
    title: 'Intro to Data Wrangling',
    description:
      'A brief course intended to introduce non-programmers to the Python programming language and data wrangling. Also, a demonstration of network optimization, PDF creation in Python, and a simple Monte Carlo simulation.',
    badges: [b.python, b.jupyter],
    link: createLink('https://github.com/sethbr11/IntroToDataWrangling'),
    actions: [
      defaultActions.github('https://github.com/sethbr11/IntroToDataWrangling'),
      defaultActions.youtube(
        'https://www.youtube.com/watch?v=xZO1j_-wS4A',
        'Installation'
      ),
      createAction(
        'Colab',
        '#EDB50E',
        colabIcon,
        'https://colab.research.google.com/drive/1a308I1W1GfFaXNNXBBTtR2sBYEyME0Ey'
      ),
    ],
  },
  {
    title: 'Docs Site',
    description:
      'Boilerplate code for quick implementation of a documentation site with automatic scaffolding based on folder structure—all built on markdown files.',
    badges: [b.html, b.javascript, b.css],
    link: createLink('https://docsite.brockefni.com/', 'View Example Site'),
    actions: [defaultActions.github('https://github.com/sethbr11/doc-site')],
  },
  {
    title: 'Brockefni',
    description:
      'This site! A project to help me improve my frontend web development skills, advertise any freelance work, and show off some portfolio projects. All of the code is public on GitHub!',
    badges: [b.nuxt, b.typescript],
    link: createLink('https://github.com/sethbr11/brockefni'),
    actions: [defaultActions.github('https://github.com/sethbr11/brockefni')],
  },
  {
    title: 'AI & Deep Learning Projects',
    description:
      'A collection of custom PyTorch models, fine-tuned transformers, and deep learning architectures built from the ground up, including Sequence-to-Sequence translation, Vision Transformers (ViT), T5 style transfer, and generative Diffusion models (U-Net).',
    badges: [b.python, b.pytorch, b.huggingface, b.jupyter],
    link: createLink('/ai-projects', 'Explore Showcase', false),
  },
  {
    title: 'CDK App',
    description:
      'An example serverless web application built with the AWS Cloud Development Kit for a BYU IS Masters-level class. Is built to be production-ready with just a few minor tweaks.',
    badges: [b.cs, b.javascript, b.vue],
    link: createLink('https://github.com/sethbr11/CdkExample'),
    actions: [
      defaultActions.github(
        'https://github.com/sethbr11/CdkExample',
        'CDK Repo'
      ),
      defaultActions.github(
        'https://github.com/sethbr11/sample-site',
        'Site Repo'
      ),
    ],
  },
  {
    title: 'Terraform App',
    description:
      'An example project demonstrating serverless deployment in AWS Fargate for a .NET application using multi-stage Terraform deployment. Created for a BYU IS Masters-level class.',
    badges: [b.terraform, b.docker, b.cs, b.bash, b.html],
    link: createLink('https://github.com/sethbr11/dotnet-serverless-example'),
    actions: [
      defaultActions.github(
        'https://github.com/sethbr11/dotnet-serverless-example',
        'Terraform Repo'
      ),
      defaultActions.github(
        'https://github.com/sethbr11/pdcdonuts',
        'Site Repo'
      ),
    ],
  },
  {
    title: 'Talum',
    description:
      'Named after the Icelandic word tölum ("speak"), Talum is an iOS app designed to help people learn Icelandic. Created as a school project to showcase app development ability, it is primarily a demonstration and may never be completed.',
    badges: [b.swift, b.swiftui],
    link: createLink('https://github.com/sethbr11/Talum'),
    actions: [defaultActions.github('https://github.com/sethbr11/Talum')],
  },
  {
    title: 'UpSkrift',
    description:
      'Inspired by the Icelandic word uppskrift ("recipe"), Upskrift is a SwiftUI recipe management application for iOS that allows users to organize, filter, and manage their favorite recipes (preloaded with Icelandic recipes).',
    badges: [b.swift, b.swiftui],
    link: createLink('https://github.com/sethbr11/UpSkrift'),
    actions: [defaultActions.github('https://github.com/sethbr11/UpSkrift')],
  },
]

export default cardData
