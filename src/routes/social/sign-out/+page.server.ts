import routeCatch from '$lib/catch/routeCatch'
import type { PageServerLoad } from './$types'
import { RedirectError } from '$lib/util/errors'
import deleteAccessAndRefreshCookies from '$lib/cookies/deleteAccessAndRefreshCookies'
import viaCookiesOrRefreshTokenDeleteSession from '$lib/cookies/viaCookiesOrRefreshTokenDeleteSession'


export const load = (async ({ cookies }) => {
  try {
    await viaCookiesOrRefreshTokenDeleteSession({ cookies })
    deleteAccessAndRefreshCookies(cookies)
    throw new RedirectError('/social/sign-in')
  } catch (e) {
    routeCatch(e)
  }
}) satisfies PageServerLoad
