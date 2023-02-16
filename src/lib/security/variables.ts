import env from '$lib/security/environmentVariables'

export const SIGN_IN_TOKEN_MAX_AGE_IN_SECONDS = 540 // 9 minutes

export const ACCESS_COOKIE_NAME = 'access-token'
export const ACCESS_COOKIE_MAX_AGE_IN_SECONDS = 32400 // 9 hours

export const REFRESH_COOKIE_NAME = 'refresh-token'
export const REFRESH_COOKIE_MAX_AGE_IN_SECONDS = 777600 // 9 days

export const commonCookieDeleteSettings = { path: '/' }
export async function getCommonCookieSetSettings () {
  return {
    path: '/',
    httpOnly: true,
    sameSite: false,
    secure: await env.get('PUBLIC_ENVIRONMENT') === 'production',
  }
}
