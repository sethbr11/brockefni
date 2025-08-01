import type { Badge } from "./languages";
import { languages } from "./languages";
import chromeWebStoreIcon from "@/assets/icons/chrome-web-store.png";
import githubIcon from "@/assets/icons/github.png";
import youtubeIcon from "@/assets/icons/youtube.png";
import downloadIcon from "@/assets/icons/download.png";
import colabIcon from "@/assets/icons/colab.png";

export interface CardData {
  title: string;
  description?: string;
  link?: {
    url: string;
    text?: string;
    external: boolean;
  };
  actions?: Array<{
    text: string;
    color: string;
    icon: string;
    link: string;
  }>;
  badges?: Badge[];
}

const cardData: CardData[] = [
  {
    title: "LCR Tools",
    description:
      "A Google Chrome extension for enhancing the functionality and user experience of LCR (Leader and Clerk Resources) for The Church of Jesus Christ of Latter-day Saints.",
    badges: [languages.javascript, languages.html, languages.css],
    link: {
      url: "https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn",
      external: true,
    },
    actions: [
      {
        text: "Store",
        color: "#2dafed",
        icon: chromeWebStoreIcon,
        link: "https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn",
      },
      {
        text: "GitHub",
        color: "#C06EFF",
        icon: githubIcon,
        link: "https://github.com/sethbr11/lcr-tools",
      },
      {
        text: "Tutorials",
        color: "#FF3B3B",
        icon: youtubeIcon,
        link: "https://www.youtube.com/playlist?list=PL2PIa0u5jTtY6uQYHQRhOdwP2yTdmyNUS",
      },
    ],
  },
  {
    title: "Rodun",
    description:
      "A fast, simple desktop app to help optimize the use of materials by planning cuts based on user-provided specifications. Features clean PDF exports. This app was commissioned as in now free to use.",
    badges: [languages.cpp, languages.bash],
    link: {
      url: "/rodun",
      text: "Info and Installation",
      external: false,
    },
    actions: [
      {
        text: "Download (MacOS)",
        color: "#3d8f42",
        icon: downloadIcon,
        link: "https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/Rodun-v.1.0.0-Installer-MacOS.dmg",
      },
    ],
  },
  {
    title: "Docs Site",
    description:
      "Boilerplate code for quick implementation of a documentation site with automatic scaffolding based on folder structure—all built on markdown files.",
    badges: [languages.html, languages.javascript, languages.css],
    link: {
      url: "https://docsite.brockefni.com/",
      text: "View Example Site",
      external: true,
    },
    actions: [
      {
        text: "GitHub",
        color: "#C06EFF",
        icon: githubIcon,
        link: "https://github.com/sethbr11/doc-site",
      },
    ],
  },
  {
    title: "Intro to Data Wrangling",
    description:
      "A brief course intended to introduce non-programmers to the Python programming language and data wrangling. Also, a demonstration of network optimization, PDF creation in Python, and a simple Monte Carlo simulation.",
    badges: [languages.python],
    link: {
      url: "https://github.com/sethbr11/IntroToDataWrangling",
      external: true,
    },
    actions: [
      {
        text: "GitHub",
        color: "#C06EFF",
        icon: githubIcon,
        link: "https://github.com/sethbr11/IntroToDataWrangling",
      },
      {
        text: "Installation",
        color: "#FF3B3B",
        icon: youtubeIcon,
        link: "https://www.youtube.com/watch?v=xZO1j_-wS4A",
      },
      {
        text: "Colab",
        color: "#EDB50E",
        icon: colabIcon,
        link: "https://colab.research.google.com/drive/1a308I1W1GfFaXNNXBBTtR2sBYEyME0Ey",
      },
    ],
  },
  {
    title: "Brockefni",
    description:
      "This site! A project to help me improve my frontend web development skills, advertise any freelance work, and show off some portfolio projects. All of the code is public on GitHub!",
    badges: [languages.nuxt, languages.typescript],
    link: {
      url: "https://github.com/sethbr11/brockefni",
      external: true,
    },
    actions: [
      {
        text: "GitHub",
        color: "#C06EFF",
        icon: githubIcon,
        link: "https://github.com/sethbr11/brockefni",
      },
    ],
  },
];

export default cardData;
