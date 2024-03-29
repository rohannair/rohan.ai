import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import { Footer, Header } from '~/components/global'

export const meta: MetaFunction = () => [{ title: 'Rohan Nair' }]

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

export default function App() {
  return (
    <html lang="en" className="h-full min-h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Toronto-based software leader" />
        <Meta />
        <Links />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@800&display=swap"
          />
        </noscript>
      </head>
      <body className="flex h-full min-h-full flex-col overflow-y-scroll bg-gray-900 text-white">
        <Header />
        <div className="w-full">
          <div className="prose lg:prose-xl prose-invert m-auto mt-14">
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
      </body>
    </html>
  )
}
