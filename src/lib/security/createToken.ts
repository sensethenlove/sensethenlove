import { Buffer } from 'buffer/'
import type { TokenPayload } from '$lib/types/all'
import { createJWT, CreateTokenError } from '@sensethenlove/jwt'
import { JWK_FOR_ACCESS_TOKEN_PRIVATE, JWK_FOR_REFRESH_TOKEN_PRIVATE, JWK_FOR_SIGN_IN_PRIVATE } from '$env/static/private'
import { ACCESS_COOKIE_MAX_AGE_IN_SECONDS, REFRESH_COOKIE_MAX_AGE_IN_SECONDS, SIGN_IN_TOKEN_MAX_AGE_IN_SECONDS } from '$lib/security/variables'


export default async (type: 'access' | 'refresh' | 'signIn', data: TokenPayload): Promise<string> => {
  switch (type) {
    case 'access': return await createToken(data, JWK_FOR_ACCESS_TOKEN_PRIVATE, ACCESS_COOKIE_MAX_AGE_IN_SECONDS, (data) => Boolean(data.userId && data.sessionId), `Please pass userId and sessionId w/in data`)
    case 'refresh': return await createToken(data, JWK_FOR_REFRESH_TOKEN_PRIVATE, REFRESH_COOKIE_MAX_AGE_IN_SECONDS, (data) => Boolean(data.userId && data.sessionId), `Please pass userId and sessionId w/in data`)
    case 'signIn': return await createToken(data, JWK_FOR_SIGN_IN_PRIVATE, SIGN_IN_TOKEN_MAX_AGE_IN_SECONDS, (data) => Boolean(data.userId && data.signInId), `Please pass userId and signInId w/in data`)
  }
}


async function createToken (data: TokenPayload, jwk: string, expiresInAsSeconds: number, isValid: (data: TokenPayload) => boolean, isInvalidErrorMessage: string): Promise<string> {
  console.log('Buffer.from', Buffer.from)
  if (!isValid(data)) throw new CreateTokenError(isInvalidErrorMessage)
  else return await createJWT(data, expiresInAsSeconds, jwk, Buffer)
}
