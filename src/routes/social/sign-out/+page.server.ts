import type { PageServerLoad } from './$types'
import routeCatch from '$lib/catch/routeCatch'
import { RedirectError } from '$lib/errors/all'
import userIsAuthenticated from '$lib/security/userIsAuthenticated'
import deleteAccessAndRefreshCookies from '$lib/cookies/deleteAccessAndRefreshCookies'
import viaCookiesOrRefreshTokenDeleteSession from '$lib/cookies/viaCookiesOrRefreshTokenDeleteSession'


export const load = (async ({ locals, cookies }) => {
  try {
    userIsAuthenticated(locals, '/social/sign-in')
    await viaCookiesOrRefreshTokenDeleteSession({ cookies })
    deleteAccessAndRefreshCookies(cookies)
    throw new RedirectError('/social/sign-in')
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad
