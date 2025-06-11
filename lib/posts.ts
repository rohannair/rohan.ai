import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogMeta {
  title: string
  createdAt: string
  description: string
  tags: string[]
}

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPosts() {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.md'))
  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return { slug, meta: data as BlogMeta }
  })
  posts.sort(
    (a, b) =>
      new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime(),
  )
  return posts
}

export function getPost(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  return { slug, meta: data as BlogMeta, content }
}
