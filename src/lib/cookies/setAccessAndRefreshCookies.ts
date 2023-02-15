import type { Cookies } from '@sveltejs/kit'
import setAccessCookie from '$lib/cookies/setAccessCookie'
import setRefreshCookie from '$lib/cookies/setRefreshCookie'


export default (cookies: Cookies, accessToken: string, refreshToken: string): void => {
  setAccessCookie(cookies, accessToken)
  setRefreshCookie(cookies, refreshToken)
}
