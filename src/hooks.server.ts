import type { Handle } from '@sveltejs/kit'
import themeHook from '$lib/theme/themeHook'
import authHook from '$lib/security/authHook'


export const handle = (async ({ event, resolve }) => {
  event = await authHook(event) // do auth stuff
  const transformPageChunk = await themeHook(event) // do theme stuff AND give back html rewrite function (transformPageChunk) to add theme to body class to be used @ app.html
  return resolve(event, { transformPageChunk  }) // continue to down stream server code
}) satisfies Handle
