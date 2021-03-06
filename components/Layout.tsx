import * as React from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

type LayoutProps = {
  title?: string,
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`
const Body = styled.div``

const Layout: React.FC<LayoutProps> = ({ children, title }) => (
  <Container>
    <Head>
      <title>{title ? `${title} | Rohan Nair` : 'Rohan Nair'}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        href="https://fonts.googleapis.com/css?family=Exo|Lora+2&display=swap"
        rel="stylesheet"
      />
    </Head>
    <Header />
    <Body>{children}</Body>
    <Footer />
  </Container>
)

export default Layout
