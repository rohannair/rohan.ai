import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Reset } from 'styled-reset'

import GlobalStyle from '../styles/Global'

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Reset />
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
