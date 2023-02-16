import type { Handle } from '@sveltejs/kit'
import authHook from '$lib/security/authHook'
import env from '$lib/security/environmentVariables'


export const handle = (async ({ event, resolve }) => {
  if (event.platform && typeof event.platform === 'object') env.set(event.platform.env)
  event = await authHook(event) // process event AND return event
  return resolve(event) // continue to down stream server code
}) satisfies Handle
