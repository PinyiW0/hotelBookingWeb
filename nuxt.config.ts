// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head:{
      meta:[
        { property: 'og:title', content: import.meta.env.NUXT_TITLE}
      ]
    },
    pageTransition: {
      name: 'fade', mode: 'out-in'
    },
    layoutTransition: {
      name: 'fade', mode: 'out-in'
    },
  },
  css: [
    '@unocss/reset/eric-meyer.css',
    '/assets/stylesheets/reset.css',
    '/assets/stylesheets/transition.css'
  ],
  imports: {
    "dirs": ['store']
  },
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt',
    '@element-plus/nuxt'
  ],
  runtimeConfig: {
    "public": {
      "title": import.meta.env.NUXT_TITLE
    }
  },
  compatibilityDate: '2024-04-03',
})