import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

// @ts-ignore
import { getArticles, Post } from '~/lib/article'

export const loader: LoaderFunction = async () => {
  try {
    const posts = await getArticles()
    return { posts }
  } catch (e) {
    console.error(e)
    return { posts: [] }
  }
}

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
