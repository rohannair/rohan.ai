import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{html,md,js,svelte,ts}'],
  theme: {
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
      fontFamily: {
        headings: ['Roboto Flex', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto',
      },
    },
  },
} satisfies Config
