import type { RequestEvent } from '@sveltejs/kit'
import setThemeCookie from '$lib/cookies/setThemeCookie'


export default async (event: RequestEvent): Promise<({ html }: { html: string }) => string> => {
  const DEFAULT_THEME = 'dark'
  const COOKIE_THEME = event.cookies.get('theme')
  let theme = COOKIE_THEME || DEFAULT_THEME

  if (!COOKIE_THEME) setThemeCookie(event.cookies, theme)
  event.locals.theme = theme

  return ({ html }: { html: string }) => html.replace('%theme%', event.locals.theme) // set theme on body class via app.html
}

