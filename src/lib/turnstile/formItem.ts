import type { Action } from 'svelte/action'
import { PUBLIC_KEY, PUBLIC_KEY_ALWAYS_PASSES } from '$lib/turnstile/variables'


export default ((node) => {
  if (window.turnstile) {
    const sitekey = process.env.NODE_ENV === 'production' ? PUBLIC_KEY : PUBLIC_KEY_ALWAYS_PASSES
    const id = window.turnstile.render(node, { sitekey })

    return {
      destroy() {
        window.turnstile.remove(id)
      }
    }
  }
}) satisfies Action
