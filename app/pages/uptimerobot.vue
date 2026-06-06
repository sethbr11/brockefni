<template>
  <div class="uptimerobot-page">
    <ScrollProgress />
    <HeroSection />
    <SDKSection />
    <REPLSection />
    <BackstageSection />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '#app'
import ScrollProgress from '@/components/UptimeRobotPage/ScrollProgress.vue'
import HeroSection from '@/components/UptimeRobotPage/HeroSection.vue'
import SDKSection from '@/components/UptimeRobotPage/SDKSection.vue'
import REPLSection from '@/components/UptimeRobotPage/REPLSection.vue'
import BackstageSection from '@/components/UptimeRobotPage/BackstageSection.vue'

export default defineComponent({
  name: 'UptimeRobotPage',
  components: {
    ScrollProgress,
    HeroSection,
    SDKSection,
    REPLSection,
    BackstageSection,
  },
  setup() {
    useHead({
      title: 'UptimeRobot SDK, CLI, & Backstage Plugins - UptimeRobot Suite',
      link: [
        {
          rel: 'canonical',
          href: 'https://brockefni.com/uptimerobot',
        },
      ],
      meta: [
        {
          name: 'description',
          content:
            'The complete open-source UptimeRobot Suite: featuring the uptime-robot-v3 TypeScript SDK, interactive command-line REPL (CLI), and Spotify Backstage frontend & backend plugins.',
        },
        {
          name: 'keywords',
          content:
            'uptimerobot sdk, uptimerobot cli, uptimerobot backstage, uptimerobot backstage plugin, uptime-robot-v3, uptime-robot-v3-repl, @sethbr11/plugin-uptimerobot, @sethbr11/plugin-uptimerobot-backend, UptimeRobot, TypeScript SDK, command-line interface, Spotify Backstage, developer portal, IDP, open source monitoring, API v3 client',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
        {
          property: 'og:title',
          content:
            'UptimeRobot SDK, CLI, & Backstage Plugins - UptimeRobot Suite',
        },
        {
          property: 'og:description',
          content:
            'A comprehensive collection of open-source developer tools for UptimeRobot, including a TypeScript SDK (uptime-robot-v3), interactive CLI REPL, and production-ready Backstage plugins.',
        },
        {
          property: 'og:image',
          content: 'https://brockefni.com/og_image.png',
        },
        {
          property: 'og:url',
          content: 'https://brockefni.com/uptimerobot',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content:
            'UptimeRobot SDK, CLI, & Backstage Plugins - UptimeRobot Suite',
        },
        {
          name: 'twitter:description',
          content:
            'Open-source UptimeRobot tools: TypeScript SDK, command-line REPL (CLI), and Spotify Backstage plugins.',
        },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'UptimeRobot Suite',
            description:
              'A comprehensive collection of open-source developer tools, SDKs, CLIs, and plugins for interacting with and integrating UptimeRobot.',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Node.js, Browser',
            author: {
              '@type': 'Person',
              name: 'Seth Brock',
              url: 'https://brockefni.com',
            },
            softwareAddOn: [
              {
                '@type': 'SoftwareApplication',
                name: 'uptime-robot-v3',
                alternateName: 'UptimeRobot SDK',
                description:
                  'TypeScript SDK and client library for UptimeRobot API v3',
              },
              {
                '@type': 'SoftwareApplication',
                name: 'uptime-robot-v3-repl',
                alternateName: 'UptimeRobot CLI / REPL',
                description:
                  'Interactive command-line interface (CLI) and REPL tool for UptimeRobot API v3',
              },
              {
                '@type': 'SoftwareApplication',
                name: '@sethbr11/plugin-uptimerobot',
                alternateName: 'UptimeRobot Backstage Frontend Plugin',
                description:
                  'Spotify Backstage frontend integration for UptimeRobot',
              },
              {
                '@type': 'SoftwareApplication',
                name: '@sethbr11/plugin-uptimerobot-backend',
                alternateName: 'UptimeRobot Backstage Backend Plugin',
                description:
                  'Spotify Backstage backend integration for UptimeRobot',
              },
            ],
          }),
        },
      ],
    })

    return {}
  },
})
</script>

<style scoped>
.uptimerobot-page {
  min-height: auto;
  background: var(--background-color);
  overflow-x: hidden;
  display: block; /* Ensure it's block-level */
  position: relative;
}

/* Force parents to not add extra height on this page */
:deep(html),
:deep(body),
:deep(#__nuxt) {
  height: auto !important;
  min-height: auto !important;
  overflow-x: hidden;
}

/* Ensure smooth scrolling between sections */
.uptimerobot-page > * {
  scroll-margin-top: 2rem;
}

/* Global page animations */
.uptimerobot-page {
  animation: fadeIn 0.5s ease-out;
}

/* Eliminate any footer gap */
:deep(footer) {
  display: none; /* Hide footer on this specific landing page for a cleaner stop */
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
