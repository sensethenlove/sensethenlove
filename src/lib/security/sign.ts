import { Buffer } from 'buffer'
import type { TokenPayload } from '$lib/util/types'
import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'
import getHeaderAndPayloadAsStrings from '$lib/security/getHeaderAndPayloadAsStrings'


export default async (privateKey: CryptoKey, payloadAsObject: TokenPayload, expiresInAsSeconds: number): Promise<string> => {
  if (expiresInAsSeconds <= 0) throw 'TokenExpiredError: Please provide a positive number of seconds'
  else {
    const { header, payload, united } = getHeaderAndPayloadAsStrings(payloadAsObject, expiresInAsSeconds)

    const signatureAsArrayBuffer = await crypto.subtle.sign(
      getAlgorithmOptions('sign'),
      privateKey,
      new TextEncoder().encode(united) // string to ArrayBuffer
    )

    const signatureAsBase64 = Buffer.from(new Uint8Array(signatureAsArrayBuffer)).toString('base64')
    return `${ Buffer.from(header).toString('base64') }.${ Buffer.from(payload).toString('base64') }.${ signatureAsBase64 }`
  }
}
