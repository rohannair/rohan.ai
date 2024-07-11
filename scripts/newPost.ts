import * as fs from 'fs'
import * as path from 'path'
import slugify from 'slugify'

function createNewPost(title: string) {
  console.log('Creating new post...', title)
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const slug = slugify(title, { lower: true, strict: true, trim: true })
  const fileName = `${date}-${slug}.md`
  const filePath = path.join(
    __dirname,
    '..',
    'src',
    'routes',
    'posts',
    fileName,
  )
  const fileContent = `---
title: ${title}
description:
createdAt: ${date}
tags:
---
`

  fs.writeFileSync(filePath, fileContent)

  console.log(`New post created: ${fileName}`)
}

const title = process.argv.slice(2).join(' ')

if (!title) {
  console.error('Please provide a title for the new post.')
  process.exit(1)
}

createNewPost(title)
