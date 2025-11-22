# Agents Guide

**Stack**: SvelteKit, TypeScript, mdsvex (Markdown), TailwindCSS, UnoCSS, Node Adapter.

**Commands**:
- `pnpm dev`: Start dev server.
- `pnpm build`: Build for production.
- `pnpm check`: Run SvelteKit sync and TypeScript check.
- `bun run scripts/newPost.ts`: Create a new blog post.
- *Note*: No test suite exists.

**Conventions**:
- **Style**: Strict TypeScript. Use `$lib` for imports.
- **UI**: Tailwind/UnoCSS utility classes. Use `cn()` helper from `$lib/utils/cn`.
- **Routing**: Standard SvelteKit file-based routing in `src/routes`.
- **Blog**: Markdown files in `src/routes/posts/*.md` with frontmatter.
  - Data loading logic in `src/lib/posts.ts` using `import.meta.glob`.
- **Components**: Located in `src/lib/components`.

**Architecture**:
- Server-side rendering with Node adapter.
- Content-driven by local Markdown files.
- Shared layout in `src/routes/+layout.svelte`.
