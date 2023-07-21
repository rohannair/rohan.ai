/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*'],
  mdx: async (_filename) => {
    const [rehypeHighlight] = Promise.all([
      import('rehype-highlight').then((mod) => mod.default),
    ])
    return {
      rehypePlugins: [rehypeHighlight],
    }
  },
}
