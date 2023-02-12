import base64ToUInt8 from '$lib/util/base64ToUInt8'
import base64ToString from '$lib/util/base64ToString'
import getNowInSeconds from '$lib/util/getNowInSeconds'
import stringToArrayBuffer from '$lib/util/stringToArrayBuffer'
import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'


export default async (publicKey: CryptoKey, token: string): Promise<{ isValid: boolean, error?: string }> => {
  const tokenParts = token.split('.')
  const headerAsString = base64ToString(tokenParts[0])
  const expiresInAsSeconds = JSON.parse(headerAsString).exp

  if (expiresInAsSeconds <= getNowInSeconds()) return { isValid: false, error: 'TokenExpiredError: Token has expired' }
  else {
    const signatureInUInt8 = base64ToUInt8(tokenParts[2])

    try {
      const isValid = await crypto.subtle.verify(
        getAlgorithmOptions('verify'),
        publicKey,
        signatureInUInt8,
        stringToArrayBuffer(`${headerAsString}.${base64ToString(tokenParts[1])}`)
      )

      return isValid ? { isValid } : { isValid, error: 'TokenError: Invalid token' }
    } catch (e) {
      return { isValid: false, error: 'TokenError: Invalid token' }
    }
  }
}