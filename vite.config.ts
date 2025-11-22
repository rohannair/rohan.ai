import {
  presetTypography,
  presetUno,
  presetIcons,
  presetWebFonts,
} from 'unocss'
import UnoCSS from 'unocss/vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import extractorSvelte from '@unocss/extractor-svelte'
import TailwindCSS from '@tailwindcss/postcss'
// @ts-expect-error ts(7016)
import LightningCSS from 'postcss-lightningcss'

export default defineConfig({
  css: {
    postcss: {
      plugins: [TailwindCSS(), LightningCSS()],
    },
  },
  plugins: [
    UnoCSS({
      content: { pipeline: { include: [/\.svelte$/, /\.md?$/, /\.ts$/] } },
      extractors: [extractorSvelte()],
      presets: [
        presetUno(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
          provider: 'google',
          fonts: {
            sans: ['Inter:100,400,500,600,700'],
          },
        }),
      ],
    }),
    sveltekit(),
  ],
})
