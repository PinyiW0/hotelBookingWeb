export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head:{
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
      titleTemplate: `${import.meta.env.NUXT_TITLE || '享樂酒店'} | %s`,
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
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['swiper-container', 'swiper-slide'].includes(tag)
    }
  },
  plugins: [
    { src: '~/plugins/swiper.client.ts', mode: 'client' }
  ],
  css: [
    '@unocss/reset/eric-meyer.css',
    '/assets/stylesheets/reset.css',
    '/assets/stylesheets/transition.css',
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    'swiper/css/autoplay',
  ],
  build: {
    transpile: ['swiper']
  },
  imports: {
    "dirs": ['stores']
  },
  modules: ['@pinia/nuxt', '@unocss/nuxt', '@element-plus/nuxt'],
  runtimeConfig: {
    "public": {
      "title": import.meta.env.NUXT_TITLE,
      "apiBaseUrl": import.meta.env.NUXT_BASE_API,
    }
  },
  compatibilityDate: '2024-04-03',
})