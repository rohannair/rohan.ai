import { json, LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
// @ts-ignore
import relativeDate from 'tiny-relative-date'
import { getArticle } from '~/lib/article'

type LoaderData = {
  frontmatter: any
  code: string
}

export const loader: LoaderFunction = async ({ request, params }) => {
  if (!params.slug) {
    throw new Error('No slug provided')
  }
  if (params.slug === 'rss.xml') return json({})

  const article = await getArticle(params.slug)
  if (article) {
    const { frontmatter, code } = article
    return { frontmatter, code }
  } else {
    throw new Response('Not found', { status: 404 })
  }
}

export default function Post() {
  const {
    code,
    frontmatter: { title, description, date, categories },
  } = useLoaderData<LoaderData>()

  const Component = useMemo(() => getMDXComponent(code), [code])
  return (
    <>
      <h1 className="mb-0">{title}</h1>
      <h3 className="pb-0 mt-0">{description}</h3>
      <p className="text-sm font-light tracking-wide">
        Published:{' '}
        <span className="italic">
          {relativeDate(new Date(date), new Date())}
        </span>
      </p>
      <Component />
    </>
  )
}
