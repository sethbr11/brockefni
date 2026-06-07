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
      include: ['@vue/devtools-core', '@vue/devtools-kit'],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/icon'],
  icon: {
    mode: 'svg',
    provider: 'server',
    serverBundle: {
      collections: ['lucide'],
    },
  },
  runtimeConfig: {
    public: {
      BOTPOISON_PUBLIC_KEY: process.env.BOTPOISON_PUBLIC_KEY || '',
    },
  },
})
