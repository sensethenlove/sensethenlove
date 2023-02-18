import env from '$lib/security/env'
import type { Cookies } from '@sveltejs/kit'


export default async (cookies: Cookies, theme: string) => {
  cookies.set('theme', theme, {
    path: '/',
    httpOnly: true,
    sameSite: false,
    secure: (await env.get('ENVIRONMENT') === 'production'),
  })
}
