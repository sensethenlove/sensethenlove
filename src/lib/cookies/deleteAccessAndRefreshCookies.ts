import type { Cookies } from '@sveltejs/kit'
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, commonCookieDeleteSettings } from '$lib/security/variables'


export default (cookies: Cookies): void => {
  cookies.delete(ACCESS_COOKIE_NAME, commonCookieDeleteSettings)
  cookies.delete(REFRESH_COOKIE_NAME, commonCookieDeleteSettings)
}
