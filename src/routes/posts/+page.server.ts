import type { PageServerLoad } from './$types'

interface BlogPost {
  metadata: {
    title: string
    createdAt: string
    tags: string[]
  }
}

export const load = (async () => {
  const allPostFiles = import.meta.glob('/src/routes/posts/*.md')
  const postFilesArr = Object.entries(allPostFiles)

  const posts = await Promise.all(
    postFilesArr.map(async ([path, resolve]) => {
      // Get the metadata from the blog post
      const { metadata } = (await resolve()) as BlogPost

      return {
        meta: metadata,
        // Remove the /src/routes and .md from the path
        // e.g. /src/routes/blog/first.md -> /blog/first
        path: path.slice(11, -3),
      }
    }),
  )

  // Sort the posts (in place) by the date they were created
  posts.sort(
    (a, b) =>
      new Date(b.meta.createdAt).getTime() -
      new Date(a.meta.createdAt).getTime(),
  )

  return { posts }
}) satisfies PageServerLoad
