import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import { createHighlighter } from "shiki";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

const highlighter = await createHighlighter({
  themes: ["github-dark"],
  langs: ["javascript", "typescript", "svelte", "html", "css", "json", "bash", "shell", "markdown"],
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      smartypants: {
        dashes: "oldschool",
      },
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeExternalLinks,
          {
            target: "_blank",
            rel: ["noopener", "noreferrer"],
          },
        ],
      ],
      remarkPlugins: [remarkGfm],
      highlight: {
        highlighter: (code, lang = "text") => {
          const html = highlighter.codeToHtml(code, { lang, theme: "github-dark" });
          return `{@html \`${html.replace(/`/g, "\\`")}\` }`;
        },
      },
    }),
  ],
  kit: {
    adapter: adapter(),
  },
};

export default config;
