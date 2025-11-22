import presetUno from '@unocss/preset-uno'
import presetWebFonts from '@unocss/preset-web-fonts'

import { defineConfig, presetTypography } from 'unocss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default defineConfig({
  theme: {
    fontFamily: {
      headings: ['Roboto Flex', 'ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
      mono: ['JetBrains Mono', 'IBM Plex Mono', ...defaultTheme.fontFamily.mono],
    },
    extend: {
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
        mono: 'JetBrains Mono:400,500,600',
      },
    }),
  ],
})
