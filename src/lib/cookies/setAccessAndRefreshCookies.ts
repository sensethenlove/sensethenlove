import type { Cookies } from '@sveltejs/kit'
import { ACCESS_COOKIE_NAME, ACCESS_COOKIE_MAX_AGE_IN_SECONDS, REFRESH_COOKIE_MAX_AGE_IN_SECONDS, REFRESH_COOKIE_NAME, getCommonCookieSetSettings } from '$lib/security/variables'


export default async (cookies: Cookies, accessToken: string, refreshToken: string): Promise<void> => {
  const commonCookieSetSettings = getCommonCookieSetSettings()
  cookies.set(ACCESS_COOKIE_NAME, accessToken, { ...commonCookieSetSettings, maxAge: ACCESS_COOKIE_MAX_AGE_IN_SECONDS })
  cookies.set(REFRESH_COOKIE_NAME, refreshToken, { ...commonCookieSetSettings, maxAge: REFRESH_COOKIE_MAX_AGE_IN_SECONDS })
}
