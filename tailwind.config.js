const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/routes/**/*.tsx',
    './app/components/**/*.tsx',
    './app/lib/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      headings: ['Roboto Flex', 'Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
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
  plugins: [require('@tailwindcss/typography')],
}
