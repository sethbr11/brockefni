import javascriptIcon from '@/assets/icons/javascript.png'
import htmlIcon from '@/assets/icons/html.png'
import cssIcon from '@/assets/icons/css.png'
import pythonIcon from '@/assets/icons/python.png'
import cppIcon from '@/assets/icons/cpp.png'
import csIcon from '@/assets/icons/cs.png'
import vueIcon from '@/assets/icons/vue.png'
import typescriptIcon from '@/assets/icons/typescript.png'
import swiftIcon from '@/assets/icons/swift.png'
import swiftUIIcon from '@/assets/icons/swiftui.png'
import markdownIcon from '@/assets/icons/markdown.png'
import bashIcon from '@/assets/icons/bash.png'
import dockerIcon from '@/assets/icons/docker.png'
import terraformIcon from '@/assets/icons/terraform.png'
import pytorchIcon from '@/assets/icons/pytorch.png'
import reactIcon from '@/assets/icons/react.png'
import nuxtIcon from '@/assets/icons/nuxt.png'
import zshIcon from '@/assets/icons/zsh.png'
import nodejsIcon from '@/assets/icons/nodejs.svg'
import huggingfaceIcon from '@/assets/icons/huggingface.svg'
import jupyternotebookIcon from '@/assets/icons/jupyter.png'

export interface Badge {
  name: string
  icon?: string
  title?: string
}

// Language badge dictionary
export const b = {
  javascript: {
    name: 'JavaScript',
    icon: javascriptIcon,
    title: 'JavaScript',
  },
  html: {
    name: 'HTML',
    icon: htmlIcon,
    title: 'HTML',
  },
  css: {
    name: 'CSS',
    icon: cssIcon,
    title: 'CSS',
  },
  python: {
    name: 'Python',
    icon: pythonIcon,
    title: 'Python',
  },
  cpp: {
    name: 'C++',
    icon: cppIcon,
    title: 'C++',
  },
  cs: {
    name: 'C#',
    icon: csIcon,
    title: 'C#',
  },
  vue: {
    name: 'Vue.js',
    icon: vueIcon,
    title: 'Vue.js',
  },
  typescript: {
    name: 'TypeScript',
    icon: typescriptIcon,
    title: 'TypeScript',
  },
  swift: {
    name: 'Swift',
    icon: swiftIcon,
    title: 'Swift',
  },
  swiftui: {
    name: 'SwiftUI',
    icon: swiftUIIcon,
    title: 'SwiftUI',
  },
  markdown: {
    name: 'Markdown',
    icon: markdownIcon,
    title: 'Markdown',
  },
  bash: {
    name: 'Bash',
    icon: bashIcon,
    title: 'Bash',
  },
  docker: {
    name: 'Docker',
    icon: dockerIcon,
    title: 'Docker',
  },
  terraform: {
    name: 'Terraform',
    icon: terraformIcon,
    title: 'Terraform',
  },
  pytorch: {
    name: 'PyTorch',
    icon: pytorchIcon,
    title: 'PyTorch',
  },
  react: {
    name: 'React',
    icon: reactIcon,
    title: 'React',
  },
  nuxt: {
    name: 'Nuxt.js',
    icon: nuxtIcon,
    title: 'Nuxt.js',
  },
  zsh: {
    name: 'Zshell',
    icon: zshIcon,
    title: 'Zshell',
  },
  nodejs: {
    name: 'Node.js',
    icon: nodejsIcon,
    title: 'Node.js',
  },
  huggingface: {
    name: 'Hugging Face',
    icon: huggingfaceIcon,
    title: 'Hugging Face',
  },
  jupyter: {
    name: 'Jupyter Notebook',
    icon: jupyternotebookIcon,
    title: 'Jupyter Notebook',
  },
}
