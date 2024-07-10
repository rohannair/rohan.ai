import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex, escapeSvelte } from "mdsvex";
import { createHighlighter } from "shiki";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
    }),
  ],
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await createHighlighter({
        theme: ["nord"],
        langs: ["typescript", "javascript"],
      });
      await highlighter.loadLanguage("typescript");

      const html = escapeSvelte(
        highlighter.codeToHtml(code, { lang, theme: "nord" })
      );
      return `{@html \`${html}\` }`;
    },
  },
  kit: {
    adapter: adapter(),
  },
};

export default config;
