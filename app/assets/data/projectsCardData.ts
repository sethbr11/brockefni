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
    title: 'UptimeRobot SDK',
    description:
      'A community-maintained TypeScript/Node.js client for the Uptime Robot REST API v3. Full coverage, ESM only, and built for modern environments. Explore the suite in the showcase!',
    badges: [b.typescript, b.nodejs],
    link: createLink('/uptimerobot', 'Suite Page', false),
    actions: [
      defaultActions.github('https://github.com/sethbr11/uptime-robot-v3'),
      createAction(
        'NPM',
        '#cb3837',
        nodejsIcon,
        'https://www.npmjs.com/package/uptime-robot-v3'
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
    title: 'Diffusion Model',
    description:
      "An educational BYU IS project exploring diffusion models and Stable Diffusion. Includes a from‑scratch U‑Net and experiments with Hugging Face's UNet2DModel and VAE-based latent pipelines for text-to-image generation. Explore the generative model in the showcase!",
    badges: [b.python, b.pytorch, b.huggingface, b.jupyter],
    link: createLink('/ai-projects', 'Explore Showcase', false),
    actions: [
      defaultActions.github('https://github.com/sethbr11/DiffusionModel'),
      createAction(
        'Model',
        '#FF9D00',
        huggingfaceIcon,
        'https://huggingface.co/docs/diffusers/en/api/models/unet2d'
      ),
    ],
  },
  {
    title: 'CDK App',
    description:
      'An example serverless web application built with the AWS Cloud Development Kit for a BYU IS Masters-level class. Configured for serverless static hosting and compute APIs. Explore the interactive CDK orchestration in the showcase!',
    badges: [b.cs, b.javascript, b.vue, b.typescript],
    link: createLink('/cloud-infrastructure', 'Explore Showcase', false),
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
    title: 'Translation Transformer',
    description:
      'A transformer made in PyTorch to handle language translation. This project was for a BYU IS Masters-level class I took and was meant to be more educational than practical. Experience the interactive translation workflow in the showcase!',
    badges: [b.python, b.pytorch],
    link: createLink('/ai-projects', 'Explore Showcase', false),
    actions: [
      defaultActions.github('https://github.com/sethbr11/PyTorch-Transformer'),
      defaultActions.youtube(
        'https://www.youtube.com/watch?v=ISNdQcPhsts',
        'Tutorial'
      ),
    ],
  },
  {
    title: 'Backstage UptimeRobot',
    description:
      'The frontend component of the UptimeRobot Backstage plugin. Displays monitor health, uptime trends, and response times on catalog entities. Explore the suite in the showcase!',
    badges: [b.typescript, b.react],
    link: createLink('/uptimerobot', 'Suite Page', false),
    actions: [
      defaultActions.github(
        'https://github.com/sethbr11/uptimerobot-backstage-plugin'
      ),
      createAction(
        'NPM',
        '#cb3837',
        nodejsIcon,
        'https://www.npmjs.com/package/@sethbr11/plugin-uptimerobot'
      ),
    ],
  },
  {
    title: 'UpSkrift',
    description:
      'Inspired by the Icelandic word uppskrift ("recipe"), Upskrift is a SwiftUI recipe management application for iOS that allows users to organize, filter, and manage their favorite recipes (preloaded with Icelandic recipes).',
    badges: [b.swift, b.swiftui],
    link: createLink('https://github.com/sethbr11/UpSkrift'),
    actions: [defaultActions.github('https://github.com/sethbr11/UpSkrift')],
  },
  {
    title: 'Terraform App',
    description:
      'An example project demonstrating serverless container deployment in AWS Fargate for a .NET application using multi-stage Terraform deployment. Created for a BYU IS Masters-level class. Explore the interactive Terraform orchestration in the showcase!',
    badges: [b.terraform, b.docker, b.cs, b.bash, b.html],
    link: createLink('/cloud-infrastructure', 'Explore Showcase', false),
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
    title: 'Vision Transformer',
    description:
      'A project to learn building transformers for image classification. The model was improved from 10% (random) accuracy to over 80%. This was created for a BYU IS Masters-level class as an educational exercise. Explore the vision transformer model in the showcase!',
    badges: [b.python, b.pytorch],
    link: createLink('/ai-projects', 'Explore Showcase', false),
    actions: [
      defaultActions.github(
        'https://github.com/sethbr11/PyTorch-ImgClassification'
      ),
      createAction(
        'Model',
        '#434343ff',
        pytorchIcon,
        'https://docs.pytorch.org/vision/main/models/vision_transformer.html'
      ),
    ],
  },
  {
    title: 'Backstage UR Backend',
    description:
      'The backend component for the Backstage plugin. Handles secure API integration, data caching, and permission framework support. Explore the suite in the showcase!',
    badges: [b.typescript, b.nodejs],
    link: createLink('/uptimerobot', 'Suite Page', false),
    actions: [
      defaultActions.github(
        'https://github.com/sethbr11/uptimerobot-backend-backstage-plugin'
      ),
      createAction(
        'NPM',
        '#cb3837',
        nodejsIcon,
        'https://www.npmjs.com/package/@sethbr11/plugin-uptimerobot-backend'
      ),
    ],
  },
  {
    title: 'T5 Bible Styling',
    description:
      'A pre-trained Text-to-Text Transfer Transformer (T5) fine-tuned for the specific task of converting normal text into KJV-style English. This project was for a BYU IS Masters-level class I took and was meant to be more educational than practical. Explore the styling model in the showcase!',
    badges: [b.python, b.pytorch, b.huggingface, b.jupyter],
    link: createLink('/ai-projects', 'Explore Showcase', false),
    actions: [
      defaultActions.github('https://github.com/sethbr11/t5-bible-styling'),
      createAction(
        'Model',
        '#FF9D00',
        huggingfaceIcon,
        'https://huggingface.co/docs/transformers/en/model_doc/t5'
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
    title: 'UptimeRobot REPL',
    description:
      'An interactive Node.js REPL for exploring and testing the Uptime Robot API. Exposes the SDK as a global service for rapid prototyping. Explore the suite in the showcase!',
    badges: [b.typescript, b.nodejs],
    link: createLink('/uptimerobot', 'Suite Page', false),
    actions: [
      defaultActions.github('https://github.com/sethbr11/uptime-robot-v3-repl'),
      createAction(
        'NPM',
        '#cb3837',
        nodejsIcon,
        'https://www.npmjs.com/package/uptime-robot-v3-repl'
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
    title: 'Z-Skelheim',
    description:
      'From the Icelandic words skel (“shell”) and heim (“home”), meaning “Shell Home.” This was built to help me personally in my development projects. I published this to demonstrate proficiency in shell scripting and in hopes that others could benefit from it.',
    badges: [b.zsh],
    link: createLink('https://github.com/sethbr11/Z-Skelheim'),
    actions: [defaultActions.github('https://github.com/sethbr11/Z-Skelheim')],
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
    title: 'Brockefni',
    description:
      'This site! A project to help me improve my frontend web development skills, advertise any freelance work, and show off some portfolio projects. All of the code is public on GitHub!',
    badges: [b.nuxt, b.typescript],
    link: createLink('https://github.com/sethbr11/brockefni'),
    actions: [defaultActions.github('https://github.com/sethbr11/brockefni')],
  },
]

export default cardData
