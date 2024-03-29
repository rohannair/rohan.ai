import parseFrontMatter from 'front-matter'
import { join, readdir, readFile } from './fs.server'
import { bundleMDX } from './mdx.server'
import path from 'node:path'

const __dirname = path.dirname(process.cwd())

export type Post = {
  slug: string
  title: string
}

export type PostMarkdownAttributes = {
  title: string
}

export async function getArticle(slug: string) {
  const source = await readFile(
    `${__dirname}/../content/articles/${slug}.mdx`,
    'utf8',
  )

  return await bundleMDX({
    source,
  }).catch((e) => {
    console.error(e)
    throw e
  })
}

export async function getArticles(): Promise<Post[]> {
  const postPath = await readdir(`${__dirname}/../content/articles`, {
    withFileTypes: true,
  })

  return await Promise.all(
    postPath.map(async (dirent: any) => {
      const file = await readFile(
        join(`${__dirname}/../content/articles`, dirent.name),
        'utf8',
      )
      const { attributes } = parseFrontMatter(file.toString())
      return {
        slug: dirent.name.replace(/\.mdx/, ''),
        //@ts-ignore
        title: attributes.title,
      }
    }),
  )
}
