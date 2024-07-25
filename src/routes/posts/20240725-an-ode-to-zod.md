---
title: An ode to Zod
description: I love Zod. I use it for all sorts of validation in my TS apps. This post contains some great examples of how I use it.
createdAt: 2024-07-25
tags:
  - development
  - api
  - frontend
  - zod
---

I absolutely love [Zod](https://zod.dev/), have been accused of overusing it, and have been vindicated after that. Yesterday I was explaining Zod to a friend of mine who didn't quite `grok` it, and that explanation was successful enough that I want to talk about it a bit.

I am going to use [Svelte](https://svelte.dev/) syntax here as it lets me (1) avoid quibbling about nuances in React etc, (2) render Svelte components, as this blog is written in Svelte and Markdown!

## Why do we need Zod?
Let's assume we have a form, that takes in an email and a URL to POST to a backend. As the backend expects specific values, and we also want to save a round trip to the API for better performance, let's add some validation to this.

```svelte
<script>
  let email = '';
  let url = '';
  let errors = {};

  function handleSubmit() {
    errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!email.includes('@')) {
      errors.email = 'Invalid email address';
    }

    if (!url) {
      errors.url = 'Url is required';
    }

    if (Object.keys(errors).length === 0) {
      // form is valid, submit it
      fetch('https://our.backend:1337/submit', {
        method: 'post',
        body: JSON.stringify({ email, url })
      })
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Email:
    <input type="email" bind:value={email} />
    {#if errors.email}
      <div style="color: red">{errors.email}</div>
    {/if}
  </label>

  <label>
    Url:
    <input type="url" bind:value={url} />
    {#if errors.url}
      <div style="color: red">{errors.url}</div>
    {/if}
  </label>

  <button type="submit">Submit</button>
</form>

```

So I've written out the very basics of a validation library. Thing is, I have to make it a lot more robust for all the various rules my app will accumulate. Another thing is, this doesn't really give me a whole lot in terms of Typescript safety.

Zod fills this gap, and does so with a nice API.

## Let's rewrite our component with Zod
```svelte
<script>
  import { z } from 'zod';

  const schema = z.object({
    email: z.string().email(),
    url: z.string().url(),
  });

  let email = '';
  let url = '';
  let errors = {};

  function handleSubmit() {
    try {
      const result = schema.parse({ email, url });
      fetch('https://our.backend:1337/submit', {
        method: 'post',
        body: JSON.stringify(result)
      })
    } catch (error) {
      // Converting from an array into a object { [field_name]: error }
      errors = error.issues.reduce((acc, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      }, {});
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <label>
    Email:
    <input type="email" bind:value={email} />
    {#if errors.email}
      <div style="color: red">{errors.email}</div>
    {/if}
  </label>

  <label>
    Url:
    <input type="url" bind:value={url} />
    {#if errors.url}
      <div style="color: red">{errors.url}</div>
    {/if}
  </label>

  <button type="submit">Submit</button>
</form>
```

Zod fills in the gaps for the future features we may need, as it can validate any type that exists within the JS/TS world, and gives you a few other utility functions. Another big thing is that Zod actually lets us generate types:

```typescript
type InputProps = z.infer<typeof schema>
/**
 * type InputProps = {
 *    url: string
 *    email: string
 * }
 */
```

There's a ton more stuff that you can do. Another favourite of mine is coercion:

```typescript
// Before zod
const x: string = "3"
const y: number = parseInt(3)

// With zod
import { z } from 'zod'
const z = z.coerce.number().parse(x)
```

While the example above is a bit of a toy example, this patterns works quite well for nicely decoding and validating, especially inside API controllers. For example:

```typescript
const schema = z.object({
  query: z.string().min(1).max(255),
  pagination: z.object({
    offset: z.coerce.number().positive()
    limit: z.coerce.number().min(5).max(100)
  })
})

yourapp.get('/', async (req: Request, rep: Reply) => {
  // const { limit, offset, query } = req.query
  const data = schema.parse(req.query)
  /**
   * Now types as:
   *
   * const schema: {
   *    query: string;
   *    offset: number;
   *    limit: number;
   * }
   *
   * Which helps ensure types are proper for DB queries:
   *
   **/
  return await db.get().from('data').where({
    data: 'like(%{$1}%),
    offset: $2, // expects integer
    limit: $3 // expects integer
  }, [data.query, data.offset, data.limit])
})
```

Basically, you can keep composing things together. I've managed to use extend this for [input validation for controllers](https://github.com/rohannair/readitlater/blob/main/apps/api/src/modules/api/handlers/getLink.ts#L11), [validating env vars](https://github.com/rohannair/readitlater/blob/main/apps/api/src/env.ts), and [documenting APIs](https://github.com/rohannair/readitlater/blob/main/apps/api/src/app.ts#L53).