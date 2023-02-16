import type { Action } from 'svelte/action'
import env from '$lib/security/env'
import { PUBLIC_KEY, PUBLIC_KEY_ALWAYS_PASSES } from '$lib/turnstile/variables'


export default ((node) => {
  if (window.turnstile) {
    let id: string

    env.get('ENVIRONMENT').then(ENVIRONMENT => {
      const sitekey = ENVIRONMENT === 'production' ? PUBLIC_KEY : PUBLIC_KEY_ALWAYS_PASSES
      id = window.turnstile.render(node, { sitekey })
    })

    return {
      destroy () {
        window.turnstile.remove(id)
      }
    }
  }
}) satisfies Action
