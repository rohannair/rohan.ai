import type { LinksFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import styles from 'highlight.js/styles/night-owl.css'

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
  ]
}

export default function Blog() {
  return <Outlet />
}
