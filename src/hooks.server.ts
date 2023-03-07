import type { Handle } from '@sveltejs/kit'
import themeHook from '$lib/theme/themeHook'
import authHook from '$lib/security/authHook'


export const handle = (async ({ event, resolve }) => {
  console.log('hooks.server.ts', '💖 START 💖')
  console.time('fast')
  event = await authHook(event) // do auth stuff
  console.timeLog('fast', 'hooks.server.ts', 'authhook done')
  const transformPageChunk = await themeHook(event) // do theme stuff AND give back html rewrite function (transformPageChunk) to add theme to body class to be used @ app.html
  console.timeLog('fast', 'hooks.server.ts', 'theme hook done')
  const response = resolve(event, { transformPageChunk  }) // continue to down stream server code
  console.timeLog('fast', 'hooks.server.ts', 'resolve done')
  return response
}) satisfies Handle
