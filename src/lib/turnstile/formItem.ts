import type { Action } from 'svelte/action'
import env from '$lib/security/environmentVariables'
import { PUBLIC_KEY, PUBLIC_KEY_ALWAYS_PASSES } from '$lib/turnstile/variables'


export default ((node) => {
  if (window.turnstile) {
    let id: string

    env.get('PUBLIC_ENVIRONMENT').then(PUBLIC_ENVIRONMENT => {
      const sitekey = PUBLIC_ENVIRONMENT === 'production' ? PUBLIC_KEY : PUBLIC_KEY_ALWAYS_PASSES
      id = window.turnstile.render(node, { sitekey })
    })

    return {
      destroy () {
        window.turnstile.remove(id)
      }
    }
  }
}) satisfies Action
