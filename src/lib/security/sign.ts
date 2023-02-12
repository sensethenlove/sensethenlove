import uInt8toBase64 from '$lib/util/uInt8toBase64'
import type { TokenPayload } from '$lib/util/types'
import stringToBase64 from '$lib/util/stringToBase64'
import stringToArrayBuffer from '$lib/util/stringToArrayBuffer'
import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'
import getHeaderAndPayloadAsStrings from '$lib/security/getHeaderAndPayloadAsStrings'


export default async (privateKey: CryptoKey, payloadAsObject: TokenPayload, expiresInAsSeconds: number): Promise<string> => {
  if (expiresInAsSeconds <= 0) throw 'TokenExpiredError: Please provide a positive number of seconds'
  else {
    const { header, payload, united } = getHeaderAndPayloadAsStrings(payloadAsObject, expiresInAsSeconds)

    const signatureAsArrayBuffer = await crypto.subtle.sign(
      getAlgorithmOptions('sign'),
      privateKey,
      stringToArrayBuffer(united)
    )

    const signatureAsBase64 = uInt8toBase64(new Uint8Array(signatureAsArrayBuffer))
    return `${ stringToBase64(header) }.${ stringToBase64(payload) }.${ signatureAsBase64 }`
  }
}
