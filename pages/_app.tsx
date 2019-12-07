import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'

import GlobalStyle, { theme, typography } from '../styles/Global'
import { GlobalTypeStyles } from 'styled-typography'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={{ ...theme, typography }}>
        <Reset />
        <GlobalStyle />
        <GlobalTypeStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
