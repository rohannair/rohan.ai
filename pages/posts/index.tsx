import Layout from '../../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { getPosts } from '../../lib/posts'

export async function getStaticProps() {
  const posts = getPosts()
  return { props: { posts } }
}

interface PostProps {
  posts: { slug: string; meta: any }[]
}

export default function PostsPage({ posts }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>Posts</title>
      </Head>
      <h1 className="text-4xl mb-5">Posts</h1>
      <ul className="grid gap-6 list-none p-0 m-0 w-full not-prose">
        {posts.map(({ slug, meta }) => (
          <li key={slug} className="grid gap-2 p-0 m-0">
            <h2 className="mb-0">
              <Link href={`/posts/${slug}`} className="text-xl font-semibold no-underline">
                {meta.title}
              </Link>
            </h2>
            <p className="text-gray-500">Posted {meta.createdAt}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
