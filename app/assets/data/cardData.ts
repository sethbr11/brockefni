import type { Badge } from './badges'
import { b } from './badges'
import chromeWebStoreIcon from '@/assets/icons/chrome-web-store.png'
import githubIcon from '@/assets/icons/github.png'
import youtubeIcon from '@/assets/icons/youtube.png'
import downloadIcon from '@/assets/icons/download.png'
import colabIcon from '@/assets/icons/colab.png'

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
    badges: [b.html, b.javascript, b.css],
    link: createLink(
      'https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn'
    ),
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
    title: 'Rodun',
    description:
      'A fast, simple desktop app to help optimize the use of materials by planning cuts based on user-provided specifications. Features clean PDF exports. This app was commissioned and is now free to use.',
    badges: [b.cpp, b.bash],
    link: createLink('/rodun', 'Info and Installation', false),
    actions: [
      createAction(
        'Download (MacOS)',
        '#3d8f42',
        downloadIcon,
        'https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/Rodun-v.1.0.0-Installer-MacOS.dmg'
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
    badges: [b.python],
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
    title: 'Transformer',
    description:
      'A transformer made in PyTorch to handle langauge translation. This project was for a BYU IS Masters-level class I took and was meant to be more educational than practical.',
    badges: [b.python, b.pytorch],
    link: createLink('https://github.com/sethbr11/PyTorch-Transformer'),
    actions: [
      defaultActions.github('https://github.com/sethbr11/PyTorch-Transformer'),
      defaultActions.youtube(
        'https://www.youtube.com/watch?v=ISNdQcPhsts',
        'Tutorial'
      ),
    ],
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
]

export default cardData
