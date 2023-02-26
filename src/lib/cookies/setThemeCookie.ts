import type { Cookies } from '@sveltejs/kit'
import { PUBLIC_ENVIRONMENT } from '$env/static/public'


export default (cookies: Cookies, theme: string) => {
  cookies.set('theme', theme, {
    path: '/',
    httpOnly: true,
    sameSite: false,
    secure: PUBLIC_ENVIRONMENT !== 'local'
  })
}
