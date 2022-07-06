import type { LoaderFunction } from '@remix-run/node'
import { serveTailwindCss } from 'remix-tailwind'

export const loader: LoaderFunction = () => serveTailwindCss('app/base.css')
