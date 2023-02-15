import type { Cookies } from '@sveltejs/kit'
import { REFRESH_COOKIE_NAME, REFRESH_COOKIE_MAX_AGE_IN_SECONDS, commonCookieSetSettings } from '$lib/security/variables'


export default (cookies: Cookies, token: string): void => {
  cookies.set(REFRESH_COOKIE_NAME, token, {
    ...commonCookieSetSettings,
    maxAge: REFRESH_COOKIE_MAX_AGE_IN_SECONDS,
  })
}
