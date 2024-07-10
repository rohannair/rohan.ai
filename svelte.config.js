import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import {
  createShikiHighlighter,
  runTwoSlash,
  renderCodeToHTML,
} from "shiki-twoslash";
import rehypeExternalLinks from "rehype-external-links";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

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
    }),
  ],
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await createShikiHighlighter();

      let twoslashResults = null;
      if (meta?.includes("twoslash")) {
        twoslashResults = runTwoSlash(code, lang, {});
      }

      const html = renderCodeToHTML(
        code,
        lang,
        meta || [],
        {},
        highlighter,
        twoslashResults
      );

      return `{@html \`${html}\` }`;
    },
  },
  kit: {
    adapter: adapter(),
  },
};

export default config;
