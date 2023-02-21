import adapter from '@sveltejs/adapter-cloudflare-workers'
import { vitePreprocess } from '@sveltejs/kit/vite'

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    version: {
      pollInterval: 180000 // send request to server for current app version every 3 minutes, helps w/ +layout.svelte > $app/stores > updated
    },
    csp: {
      mode: 'auto',
      directives: {
        'frame-src': [ 'https://challenges.cloudflare.com' ],
        'object-src': [ 'none' ],
        'script-src': [ 'strict-dynamic' ],
        'base-uri': [ 'self' ],
        'require-trusted-types-for': [ 'script' ],
      }
    }
  }
}
