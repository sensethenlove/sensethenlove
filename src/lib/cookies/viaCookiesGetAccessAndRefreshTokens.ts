import type { Cookies } from "@sveltejs/kit"
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from "$lib/security/variables"


export default (cookies: Cookies): { accessToken: string | undefined, refreshToken: string | undefined } => {
  return {
    accessToken: cookies.get(ACCESS_COOKIE_NAME),
    refreshToken: cookies.get(REFRESH_COOKIE_NAME),
  }
}
