import { Buffer } from 'buffer/'
import type { Cookies } from '@sveltejs/kit'
import type { Session } from '$lib/types/all'
import deleteSession from '$lib/prisma/deleteSession'
import { REFRESH_COOKIE_NAME } from '$lib/security/variables'


export default async ({ cookies, refreshToken }: { cookies?: Cookies, refreshToken?: string }): Promise<Session | undefined> => {
  let session

  if (cookies) refreshToken = cookies.get(REFRESH_COOKIE_NAME)

  if (refreshToken) {
    const base64Payload = refreshToken.split('.')[1]
    const { sessionId } = JSON.parse((Buffer.from(base64Payload, 'base64')).toString('utf-8'))
    if (sessionId) session = await deleteSession(sessionId)
  }

  return session
}
