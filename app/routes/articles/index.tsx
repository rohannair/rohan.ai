import { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getArticles, Post } from '~/lib/article'

type LoaderData = {
  frontmatter: any
  code: string
}

export const loader: LoaderFunction = async () => {
  return await getArticles().catch(console.error)
}

export default function Post() {
  const posts = useLoaderData<Post[]>()

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
