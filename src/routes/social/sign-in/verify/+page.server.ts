import type { Actions } from './$types'
import signIn from '$lib/actions/signIn'
import type { PageServerLoad } from './$types'
import routeCatch from '$lib/catch/routeCatch'
import { RedirectError } from '$lib/util/errors'
import createToken from '$lib/security/createToken'
import verifyToken from '$lib/security/verifyToken'
import createSession from '$lib/prisma/createSession'
import setAccessAndRefreshCookies from '$lib/cookies/setAccessAndRefreshCookies'


export const load = (async ({ url, cookies, getClientAddress }) => {
  try {
    const { userId, ipAddress } = await verifyToken('signIn', url.searchParams.get('token') || '')
    const currentIpAddress = getClientAddress()

    if (ipAddress !== currentIpAddress) throw new Error('IPNotSame: IP Address that started sign in process must match the IP Address that clicks the email link')
    else {
      const session = await createSession(userId, ipAddress)
      const payload = { userId, sessionId: session.id }
      const [ accessResponse, refreshResponse ] = await Promise.all([createToken('access', payload), createToken('refresh', payload)])
      setAccessAndRefreshCookies(cookies, accessResponse, refreshResponse)
      throw new RedirectError('/social')
    } 
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  signIn
} satisfies Actions
