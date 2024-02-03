import { unstable_vitePlugin as remix } from '@remix-run/dev'
import UnoCSS from 'unocss/vite'
import million from 'million/compiler'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { installGlobals } from '@remix-run/node'

installGlobals()

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    million.vite({ auto: true }),
    remix({ ignoredRouteFiles: ['**/.*'] }),
    UnoCSS(),
    tsconfigPaths(),
  ],
})
