import type { Cookies } from '@sveltejs/kit'


export default (signInId: string, cookies: Cookies) => {
  cookies.set('signInId', signInId, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: false,
  })
  console.log('sign in action: signInId: ', signInId)
}
