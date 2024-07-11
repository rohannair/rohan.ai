import type { PageServerLoad } from './$types'
import { getPosts } from '$lib/posts'

export const load = (async () => {
  const { posts } = await getPosts()
  return { posts }
}) satisfies PageServerLoad
