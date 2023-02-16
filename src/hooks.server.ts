import env from '$lib/security/env'
import type { Handle } from '@sveltejs/kit'
import authHook from '$lib/security/authHook'


export const handle = (async ({ event, resolve }) => {
  env.setEnvironmentVariablesByPlatform(event.platform) // if environment variables are preeset (production) => set them so we may get them in other modules down stream
  event = await authHook(event) // process event AND return event
  return resolve(event) // continue to down stream server code
}) satisfies Handle
