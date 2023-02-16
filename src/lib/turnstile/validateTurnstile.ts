import env from '$lib/security/environmentVariables'
import type { TurnstileTokenValidateResponse } from '$lib/util/types'
import { CHALLENGE_URL, ERROR_MESSAGE, CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES } from '$lib/turnstile/variables'


export default async (turnstileResponse: FormDataEntryValue) => {
  const secret = (await env.get('ENVIRONMENT') === 'production') ? await env.get('CLOUDFLARE_TURNSTILE_PRIVATE_KEY') : CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES

  const response = await fetch(CHALLENGE_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret, response: turnstileResponse }),
  })

  const { success }: TurnstileTokenValidateResponse = await response.json()

  if (!success) throw new Error(ERROR_MESSAGE)
}
