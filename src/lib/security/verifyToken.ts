import { Buffer } from 'buffer/'
import type { TokenPayload } from '$lib/util/types'
import getNowInSeconds from '$lib/util/getNowInSeconds'
import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'
import { VerifyTokenError, VerifyTokenExpiredError } from '$lib/util/errors'
import { JWK_FOR_ACCESS_TOKEN_PUBLIC, JWK_FOR_REFRESH_TOKEN_PUBLIC, JWK_FOR_SIGN_IN_PUBLIC } from '$env/static/private'


export default async (type: 'access' | 'refresh' | 'signIn', token: string): Promise<TokenPayload> => {
  switch (type) {
    case 'access': return await verifyToken(token, await crypto.subtle.importKey('jwk', JSON.parse(JWK_FOR_ACCESS_TOKEN_PUBLIC), getAlgorithmOptions('import'), true, ['verify']))
    case 'refresh': return await verifyToken(token, await crypto.subtle.importKey('jwk', JSON.parse(JWK_FOR_REFRESH_TOKEN_PUBLIC), getAlgorithmOptions('import'), true, ['verify']))
    case 'signIn': return await verifyToken(token, await crypto.subtle.importKey('jwk', JSON.parse(JWK_FOR_SIGN_IN_PUBLIC), getAlgorithmOptions('import'), true, ['verify']))
  }
}


async function verifyToken (token: string, publicKey: CryptoKey): Promise<TokenPayload> {
  const tokenParts = token.split('.')

  if (tokenParts.length !== 3) throw new VerifyTokenError('Invalid token')
  else {
    const headerAsString = Buffer.from(tokenParts[0], 'base64').toString() // base64 to string
    const expiresInAsSeconds = JSON.parse(headerAsString).exp

    if (expiresInAsSeconds <= getNowInSeconds()) throw new VerifyTokenExpiredError('Token has expired')
    else {
      const signatureInUInt8 = Buffer.from(tokenParts[2], 'base64') // base46 to uInt8
      const headerPayloadAsArrayBuffer = new TextEncoder().encode(`${headerAsString}.${Buffer.from(tokenParts[1], 'base64').toString()}`)
      const isValid = await crypto.subtle.verify(getAlgorithmOptions('verify'), publicKey, signatureInUInt8, headerPayloadAsArrayBuffer)

      if (!isValid) throw new VerifyTokenError('Invalid token')
      else return JSON.parse(Buffer.from(tokenParts[1], 'base64').toString()) // base64 to string to json
    }
  }
}
