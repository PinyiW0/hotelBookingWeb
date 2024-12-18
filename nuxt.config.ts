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
    'swiper/css', // 基本樣式
    'swiper/css/navigation', // 導航樣式
    'swiper/css/pagination', // 分頁樣式
    'swiper/css/autoplay',
  ],
  build: {
    transpile: ['swiper']
  },
  imports: {
    "dirs": ['stores']
  },
  modules: ['@pinia/nuxt', '@unocss/nuxt', '@element-plus/nuxt'],
  // swiper:{
  //   modules:['navigation', 'pagination', 'autoplay', 'scrollbar']
  // },
  runtimeConfig: {
    "public": {
      "title": import.meta.env.NUXT_TITLE,
      "apiBaseUrl": '',
    }
  },
  compatibilityDate: '2024-04-03',
})