import type { Actions } from './$types'
import signIn from '$lib/actions/signIn'
import type { PageServerLoad } from './$types'
import routeCatch from '$lib/catch/routeCatch'
import createToken from '$lib/security/createToken'
import verifyToken from '$lib/security/verifyToken'
import createSession from '$lib/prisma/createSession'
import userIsUnauthenticated from '$lib/security/userIsUnauthenticated'
import { RedirectError, VerifyTokenIDMismatchError } from '$lib/util/errors'
import setAccessAndRefreshCookies from '$lib/cookies/setAccessAndRefreshCookies'


export const load = (async ({ url, cookies, locals, getClientAddress }) => {
  try {
    userIsUnauthenticated(locals, '/social/')
    const { userId, signInId } = await verifyToken('signIn', url.searchParams.get('token') || '')
    const cookieSignInId = cookies.get('signInId')

    if (signInId !== cookieSignInId) throw new VerifyTokenIDMismatchError()
    else {
      const session = await createSession(userId, getClientAddress())
      const payload = { userId, sessionId: session.id }
      const [ accessToken, refreshToken ] = await Promise.all([createToken('access', payload), createToken('refresh', payload)])
      await setAccessAndRefreshCookies(cookies, accessToken, refreshToken)
      throw new RedirectError('/social')
    } 
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  signIn
} satisfies Actions
