import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig, presetUno, presetIcons } from 'unocss';
import presetWebFonts from '@unocss/preset-web-fonts';
import type { IconifyJSON } from '@iconify/types';

export default defineConfig({
  shortcuts: {},
  rules: [],
  theme: {
    colors: {
      primary: {
        120: '#7B6651',
        DEFAULT: '#BF9D7D',
        80: '#D0B79F',
        60: '#E1D1C2',
        40: '#F1EAE4',
        10: '#FAF7F5',
      },
      success: {
        120: '#299F65',
        DEFAULT: '#52DD7E',
        20: '#BCFBBD',
        10: '#E8FEE7',
      },
      info: {
        120: '#1D66AC',
        DEFAULT: '#3BADEF',
        20: '#B1EFFD',
        10: '#E6FBFE',
      },
      error: {
        120: '#C22538',
        DEFAULT: '#DA3E51',
        20: '#F5CCD1',
        10: '#FDECEF',
      },
      gray: {
        120: '#140F0A',
        DEFAULT: '#000000',
        80: '#4B4B4B',
        60: '#909090',
        40: '#ECECEC',
        10: '#F9F9F9',
      },
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
  },
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        noto: [
          {
            name: 'Noto Serif TC',
            weights: [200, 300, 400, 500, 700, 900],
            italic: false,
          },
        ],
      },
      timeouts: { warning: 5000 }
    }),
    presetIcons({
      collections: {
        bi: () => import('@iconify-json/bi/icons.json').then(i => i.default),
        'material-symbols': () => import('@iconify-json/material-symbols/icons.json').then(i => i.default as IconifyJSON),
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
        fluent: () => import('@iconify-json/fluent/icons.json').then(i => i.default as IconifyJSON),
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})