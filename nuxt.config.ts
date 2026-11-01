// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Brockefni',
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      charset: 'utf-16',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'gsap'],
    },
  },
  nitro: {
    prerender: {
      // dev-only scene preview (404s in production), not part of the static site
      ignore: ['/commonplace/_scenes'],
    },
  },
  features: {
    // link CSS files rather than inlining styles into server-rendered HTML:
    // the static 404/200 fallback pages aren't server-rendered, and with
    // inlining they shipped no styles at all
    inlineStyles: false,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  runtimeConfig: {
    public: {
      BOTPOISON_PUBLIC_KEY: process.env.BOTPOISON_PUBLIC_KEY || '',
    },
  },
})
