import type { Action } from 'svelte/action'
import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import { PUBLIC_KEY, PUBLIC_KEY_ALWAYS_PASSES } from '$lib/turnstile/variables'


export default ((node) => {
  if (window.turnstile) {
    const sitekey = PUBLIC_ENVIRONMENT === 'local' ? PUBLIC_KEY_ALWAYS_PASSES : PUBLIC_KEY
    const id = window.turnstile.render(node, { sitekey })

    return {
      destroy () {
        window.turnstile.remove(id)
      }
    }
  }
}) satisfies Action
