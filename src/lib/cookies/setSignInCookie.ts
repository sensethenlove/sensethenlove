import type { Cookies } from '@sveltejs/kit'
import { SIGN_IN_TOKEN_MAX_AGE_IN_SECONDS } from '$lib/security/variables'


export default (signInId: string, cookies: Cookies) => {
  cookies.set('signInId', signInId, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: false,
    maxAge: SIGN_IN_TOKEN_MAX_AGE_IN_SECONDS,
  })
}
