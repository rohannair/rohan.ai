import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { Footer, Header } from '~/components/global'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Rohan Nair',
  description: 'Toronto-based software leader',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: '/tailwindcss' },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@800&display=swap',
      rel: 'stylesheet',
    },
  ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@800&display=swap"
          />
        </noscript>
      </head>
      <body>
        <Header />
        <div className="w-full">
          <div className="m-auto prose lg:prose-xl mt-14 prose-invert">
            <Outlet />
          </div>
        </div>
        <Footer />
        <ScrollRestoration />

        <script
          defer
          data-domain="rohan.ai"
          src="https://plausible.io/js/script.js"
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
