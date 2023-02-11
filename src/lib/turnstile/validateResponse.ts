import type { TurnstileTokenValidateResponse } from '$lib/util/types'
import { CLOUDFLARE_TURNSTILE_PRIVATE_KEY } from '$env/static/private'
import { CHALLENGE_URL, CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES } from '$lib/turnstile/variables'


export async function validateResponse (turnstileResponse: FormDataEntryValue | null) {
  const secret = (process.env.NODE_ENV === 'production') ? CLOUDFLARE_TURNSTILE_PRIVATE_KEY : CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES

  const response = await fetch(CHALLENGE_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ secret, response: turnstileResponse }),
  })

  const data: TurnstileTokenValidateResponse = await response.json()
  return { success: data.success }
}
