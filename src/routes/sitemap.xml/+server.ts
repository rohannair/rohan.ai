import { getPosts } from '$lib/posts'

async function getPostXml() {
  const { posts } = await getPosts()
  return posts.map(
    ({ path }) => `
  <url>
    <loc>https://rohan.ai${path}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.64</priority>
  </url>`,
  )
}

export async function GET() {
  const posts = await getPostXml()
  return new Response(
    `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
			<url>
        <loc>https://rohan.ai/</loc>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://rohan.ai/posts</loc>
        <changefreq>daily</changefreq>
        <priority>0.80</priority>
      </url>
      ${posts.join('')}
		</urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    },
  )
}
