import Layout from '../../components/Layout'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getPosts, getPost } from '../../lib/posts'
import { mdToHtml } from '../../lib/markdown'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts()
  return {
    paths: posts.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = getPost(slug)
  const html = mdToHtml(post.content)
  return { props: { post: { ...post, html } } }
}

interface PostPageProps {
  post: ReturnType<typeof getPost> & { html: string }
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <Layout>
      <Head>
        <title>{post.meta.title}</title>
        <meta name="description" content={post.meta.description} />
      </Head>
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold">{post.meta.title}</h1>
          <p className="mt-0 text-sm text-gray-400">Published {post.meta.createdAt}</p>
        </div>
        <article className="article mt-8 max-w-4xl" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
