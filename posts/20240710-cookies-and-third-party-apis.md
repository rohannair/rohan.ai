---
title: Cookies, Third-Party APIs and Sanity
description: Handling cookies and third-party APIs involves secure cookie settings and CSRF protection. The post covers configuring cookies with Hono and Next.js, and workin around nuances with server functions and client routes.
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
* My backend API is written in [Hono](https://hono.dev/)
* My frontend is written in [Next.js](https://nextjs.org/)
* You _can_ use [Hono as Next's API routes](https://hono.dev/docs/getting-started/vercel), I found this especially painful to debug as assumes nuances around the edge, and Vercel.
* Using [Lucia](https://lucia-auth.com/) to handle my core AuthN/Sessions

## The problems
### Problem 1: Setting the secure cookie
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
'use client'

import { useEffect } from 'react'

export default function Route() {
  const testCall = async () => {
    const res = await fetch(`${API_URL}/`)
    console.log(res.headers) // Log out headers
  }

  useEffect(() => {
    testCall()
  })

  return (
    <div>hello</div>
  )
}

```

You can run this and check the `applications` part of devtools, or attempt to log out the response headers.

#### The issue
`fetch` has a [`credentials` property](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#including_credentials) to set to include cookies. However, Hono (and likely all API layers) has some requirements around security.

#### The solution
Step 1 was adding specific `cors` and `csrf` protection to my Hono app, as `cors: '*'` would not work for setting secure cookies.

```ts
// ...setup
const app = new Hono()
app
  .use(csrf())
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

We aren't sweating the `sameSite` settings here as we have cors allowlisting done, and csrf on -- only specific origins can hit this API.

Step 3 was changing my API client:
```typescript
export default wrappedFetch(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')
  return fetch(input, {
    ...init,
    credentials: 'include',
    headers
  })
}
```

These steps allows me to have the proper security setup to automatically set cookies, and also to attach cookies to API requests. Using [the middleware Lucia specifies](https://lucia-auth.com/guides/validate-session-cookies/hono), requests will be properly authenticated.

## Problem 2: Making this work server-side
The astute will have noticed that my Next.js functions, thus far, used the `use client` directive. This means that the fetch calls are executed on the client side, and the `cookie` being attached comes from access to `document.cookie`. If we tried to do the same thing in a server function, it would fail epically because the server does not have access to `document`; we don't get to rely on browser magic to set cookies. Luckily we can use Next's [`cookie` utils](https://nextjs.org/docs/app/api-reference/functions/cookies) to work around this, letting us create a server-side version of the API client while setting the cookie in code.

### The initial implementation
We need a `fetch` call with the Auth Cookie set in configuration:
```ts
'use server' // this is now a server function and can use `cookies`

import { cookies } from 'next/headers'

function getAuthCookie() {
  return cookies().get('auth_session')?.value
}
```

There is a bug here waiting to happen -- the `token` value is retrieved once, when this function is created. This doesn't work as we need tokens set per request, of we'll make all calls as a single user. To do this, let's use a [factory function](https://www.patterns.dev/vanilla/factory-pattern), which will recreate the client on the server before all calls.

Next.js also expects an `async` function to be exported from these files. So let's make these changes.

```ts
'use server' // this is now a server function and can use `cookies`

import { cookies } from 'next/headers'

function getAuthCookie() {
  return cookies().get('auth_session')?.value
}

export async function createServerApiClient() {
  const token = getAuthCookie()
  return function wrappedFetch(
    input: RequestInfo | URL,
    init?: RequestInit
  ) {
    const headers = new Headers(init?.headers)
    if (token) {
      headers.set('Cookie', `auth_session=${token}`)
    }
    headers.set('Content-Type', 'application/json')

    return fetch(input, {
      ...init,
      credentials: 'include',
      headers
    })
  }
}
```
Token is now retrieved on all requests from client to Next.js server, and when we use this in a regular route, it will properly use the cookie set per-requesting user, preventing data leak between requests.

```ts
// src/app/page.tsx
import { createServerApiClient } from '.'

export async function Page() {
  const fetch = await createServerApiClient()
  const res = await fetch('/route')
  const data = await res.json()

  return (
    <div>
      <div>
        { JSON.stringify(data) }
      </div>
      <div>
        <h1>Hello world</h1>
      </div>
    </div>
  )
}
```

This will render out data properly from the server side.