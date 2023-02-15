import type { Cookies } from '@sveltejs/kit'
import { ACCESS_COOKIE_NAME, ACCESS_COOKIE_MAX_AGE_IN_SECONDS, commonCookieSetSettings } from '$lib/security/variables'


export default (cookies: Cookies, token: string): void => {
  cookies.set(ACCESS_COOKIE_NAME, token, {
    ...commonCookieSetSettings,
    maxAge: ACCESS_COOKIE_MAX_AGE_IN_SECONDS,
  })
}
