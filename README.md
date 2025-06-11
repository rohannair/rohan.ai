# Welcome

This is my personal website rebuilt with **Next.js** and **React**. It uses server-side rendering for great SEO and is styled with **Tailwind CSS** and **shadcn/ui** components.

The original SvelteKit version lives in the commit history but this branch now contains the React implementation.

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

If you encounter `ERR_PNPM_FETCH_403` errors during install, it's due to
registry access restrictions in your environment. The packages are public and
do **not** require `pnpm login`.

Build the production version with:

```bash
pnpm build
```

This project is [MIT licensed](https://github.com/rohannair/rohan.ai/blob/master/LICENSE).
