import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import setThemeCookie from '$lib/cookies/setThemeCookie'

export const GET = (async ({ url, cookies }) => {
  const theme = url.searchParams.get('to')

  if (theme !== 'dark' && theme !== 'light') throw error(400, 'The only supported themes are "dark" and "light"')
  else setThemeCookie(cookies, theme)

  return new Response('success')
}) satisfies RequestHandler
