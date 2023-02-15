import type { Handle } from '@sveltejs/kit'
import authHook from '$lib/security/authHook'


export const handle = (async ({ event, resolve }) => {
  event = await authHook(event) // process event AND return event
  return resolve(event) // continue to down stream server code
}) satisfies Handle
