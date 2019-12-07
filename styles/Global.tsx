import { createGlobalStyle } from 'styled-components'
import { darken } from 'polished'

export const theme = {
  colors: {
    primary: '#0070f3',
    primaryFont: '#343838',
  },
}

export const typography = {
  fontSizes: ['2.369rem', '1.777rem', '1.333rem', '1rem', '0.75rem', '10px'],
  bodyFontFamily: 'Source Sans Pro, sans-serif',
  headingFontFamily: 'Lato, sans-serif',
  bodyLineHeight: 1.7,
  extra: { heading: 'margin-bottom: 20px;' },
}

type ThemeType = typeof theme

const GlobalStyle =
  createGlobalStyle <
  { theme: ThemeType } >
  `
  html, body, #__next {
    box-sizing: border-box;
    height: 100%;
    font-size: 18px;
  }

  body {
    overflow-y: scroll;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${props => props.theme.colors.primaryFont};
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  a {
    text-decoration: none;

    &:link,
    &:visited {
      color: ${props => props.theme.colors.primary};
    }

    &:hover {
      color: ${props => darken(0.1, props.theme.colors.primary)};
    }
  }
`

export default GlobalStyle
