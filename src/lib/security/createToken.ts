import toBase64Url from '$lib/util/toBase64Url'
import type { TokenPayload } from '$lib/types/all'
import { CreateTokenError } from '$lib/util/errors'
import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'
import getHeaderAndPayloadAsStrings from '$lib/security/getHeaderAndPayloadAsStrings'
import { JWK_FOR_ACCESS_TOKEN_PRIVATE, JWK_FOR_REFRESH_TOKEN_PRIVATE, JWK_FOR_SIGN_IN_PRIVATE } from '$env/static/private'
import { ACCESS_COOKIE_MAX_AGE_IN_SECONDS, REFRESH_COOKIE_MAX_AGE_IN_SECONDS, SIGN_IN_TOKEN_MAX_AGE_IN_SECONDS } from '$lib/security/variables'


export default async (type: 'access' | 'refresh' | 'signIn', data: TokenPayload): Promise<string> => {
  switch (type) {
    case 'access': return await getToken(data, JWK_FOR_ACCESS_TOKEN_PRIVATE, ACCESS_COOKIE_MAX_AGE_IN_SECONDS, (data) => Boolean(data.userId && data.sessionId), `Please pass userId and sessionId w/in data`)
    case 'refresh': return await getToken(data, JWK_FOR_REFRESH_TOKEN_PRIVATE, REFRESH_COOKIE_MAX_AGE_IN_SECONDS, (data) => Boolean(data.userId && data.sessionId), `Please pass userId and sessionId w/in data`)
    case 'signIn': return await getToken(data, JWK_FOR_SIGN_IN_PRIVATE, SIGN_IN_TOKEN_MAX_AGE_IN_SECONDS, (data) => Boolean(data.userId && data.signInId), `Please pass userId and signInId w/in data`)
  }
}


async function getToken (data: TokenPayload, jwk: string, expiresInAsSeconds: number, isValid: (data: TokenPayload) => boolean, isInvalidErrorMessage: string): Promise<string> {
  if (!isValid(data)) throw new CreateTokenError(isInvalidErrorMessage)
  else return await createToken(await crypto.subtle.importKey('jwk', JSON.parse(jwk), getAlgorithmOptions('import'), true, ['sign']), data, expiresInAsSeconds)
}


async function createToken (privateKey: CryptoKey, payloadAsObject: TokenPayload, expiresInAsSeconds: number): Promise<string> {
  if (expiresInAsSeconds <= 0) throw new CreateTokenError('Please provide a positive number of seconds for "expiresInAsSeconds"')
  else {
    const { header, payload, united } = getHeaderAndPayloadAsStrings(payloadAsObject, expiresInAsSeconds)
    const unitedAsArrayBuffer = new TextEncoder().encode(united)
    const signatureAsArrayBuffer = await crypto.subtle.sign(getAlgorithmOptions('sign'), privateKey, unitedAsArrayBuffer)

    const signatureAsBase64 = toBase64Url(new Uint8Array(signatureAsArrayBuffer))
    const headerAsBase64 = toBase64Url(header)
    const payloadAsBase64 = toBase64Url(payload)

    return `${headerAsBase64}.${payloadAsBase64}.${signatureAsBase64}`
  }
}
