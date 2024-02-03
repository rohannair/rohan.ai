import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'

import { defineConfig, presetTypography } from 'unocss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default defineConfig({
  theme: {
    fontFamily: {
      headings: ['Roboto Flex', 'Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          50: '#fff2f2',
          100: '#febbc0',
          200: '#f78090',
          300: '#e44664',
          400: '#bf113d',
          500: '#990633',
          600: '#73012b',
          700: '#4d0021',
          800: '#260012',
        },
      },
    },
  },
  presets: [
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter:100,400,500,600,700'],
      },
    }),
  ],
})
