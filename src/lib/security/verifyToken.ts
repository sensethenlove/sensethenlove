import { Buffer } from 'buffer/'
import type { TokenPayload } from '$lib/types/all'
import verifyJWT from '@sensethenlove/jwt/lib/verifyJWT'
import { JWK_FOR_ACCESS_TOKEN_PUBLIC, JWK_FOR_REFRESH_TOKEN_PUBLIC, JWK_FOR_SIGN_IN_PUBLIC } from '$env/static/private'


export default async (type: 'access' | 'refresh' | 'signIn', jwt: string): Promise<TokenPayload> => {
  switch (type) {
    case 'access': return await verifyJWT(jwt, JWK_FOR_ACCESS_TOKEN_PUBLIC, Buffer)
    case 'refresh': return await verifyJWT(jwt, JWK_FOR_REFRESH_TOKEN_PUBLIC, Buffer)
    case 'signIn': return await verifyJWT(jwt, JWK_FOR_SIGN_IN_PUBLIC, Buffer)
  }
}
