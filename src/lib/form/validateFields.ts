import type { FormFields } from '$lib/types/all'
import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import { CLOUDFLARE_TURNSTILE_PRIVATE_KEY } from '$env/static/private'
import { validate, CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile'


export default async function (fields: FormFields, schema: any) {
  schema.parse(fields)
  await validate(fields['cf-turnstile-response'], (PUBLIC_ENVIRONMENT === 'local') ? CLOUDFLARE_TURNSTILE_PRIVATE_KEY_ALWAYS_PASSES : CLOUDFLARE_TURNSTILE_PRIVATE_KEY)
}
