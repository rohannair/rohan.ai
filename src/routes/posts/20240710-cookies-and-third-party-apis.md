---
title: Cookies, Third-Party APIs and Sanity
createdAt: 2024-07-10
tags:
  - development
  - api
  - frontend
  - hono
  - lucia
  - nextjs
---

I recently found myself in a position having to re-learn how cookies work, and after struggling through some headaches related to my auth I finally got it working properly.

## The context
1. My backend API is written in [Hono](https://hono.dev/)
2. My frontend is written in Nextjs
3. While you can use Hono as Next's API routes, I found this especially painful to debug and moved Hono as a standalone API.
4. Using [Lucia](https://lucia-auth.com/) to handle my core AuthN/Sessions

## The problem
Lucia works nicely with cookies, and Hono is happy to accommodate. In theory, a route like this should set a `hello` cookie, with a value of `world`:
```ts
const app = new Hono()
app.get('/', c => {
  c.header('Set-Cookie', 'hello', 'world', {
    append: true
  })
  return c.ok()
})
```

However, if I were to make a plain `fetch` call from my Next.js app, it would not set a cookie.
```ts
'use client' // using state so we need to set this as a client-route

const MyRoute = () => {

  const testCall = async () => {
    const res = await fetch(`${API_URL}/`)
    console.log(res.headers) // Log out headers
  }

  useEffect(() => {
    testCall()
  })

  return (
    <div>
      hello
    </div>
  )

}

export default MyRoute
```

You can run this and check the `applications` part of devtools, or attempt to log out the response headers.

### The issue
`fetch` has a [`credentials` property](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials) to set to include cookies. However, Hono (and likely all API layers) has some requirements around security.

### The solution
Step 1 was adding specific `cors` and `csrf` protection to my Hono app, as cores `'*'` would not work while setting secure cookies.

```ts
// ...setup
const app = new Hono()
app.use(csrf())
  .use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:3001'],
      allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
      allowHeaders: [
        'Content-Type',
        'Authorization',
        'Upgrade-Insecure-Requests',
      ],
      credentials: true,
      maxAge: 600,
    }),
  )
// ...rest
```

Step 2 was properly setting my cookie:
```ts
// lib/cookie.ts
import type { Context } from 'hono'
import { setCookie } from 'hono/cookie'

export function setAuthCookie(c: Context, name: string, value: string) {
  return setCookie(c, name, value, {
    httpOnly: true,
    sameSite: 'Lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}
```

We disabled the `sameSite` settings here as we have cors allowlisting done, and csrf on.

Step 3 was changing my api client:
```typescript
export default wrappedFetch(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  return fetch(input, {
    ...init,
    credentials: 'include' as RequestCredentials
  })
}

```

These steps allows me to have the proper security setup to automatically set cookies, and also to attach cookies to API requests. Using [the middleware Lucia specifies](https://lucia-auth.com/guides/validate-session-cookies/hono), requests will be properly authenticated.