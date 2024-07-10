import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";
import {
  createShikiHighlighter,
  runTwoSlash,
  renderCodeToHTML,
} from "shiki-twoslash";

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
