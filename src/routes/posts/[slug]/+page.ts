import type { BlogPost } from '$lib/types'
import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = (async ({ params }) => {
  try {
    // Import the blog post from the directory above using the slug
    const post = await import(`../${params.slug}.md`)

    return {
      // Mdsvex returns a Svelte component as the default export
      component: post.default,
      meta: post.metadata as BlogPost['metadata'],
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
      throw error(404, 'Not found')
    }
    throw error(404, 'Not found')
  }
}) satisfies PageLoad
