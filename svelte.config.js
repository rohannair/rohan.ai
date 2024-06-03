import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { mdsvex } from 'mdsvex'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.mdx'],
  preprocess: [
    mdsvex({
      extensions: ['.svx', '.mdx'],
    }),
    vitePreprocess(),
  ],
  kit: {
    adapter: adapter(),
  },
}

export default config
