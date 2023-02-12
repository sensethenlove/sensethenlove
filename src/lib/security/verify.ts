import getNowInSeconds from '$lib/util/getNowInSeconds'
import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'


export default async (publicKey: CryptoKey, token: string): Promise<{ isValid: boolean, error?: string }> => {
  const tokenParts = token.split('.')
  const headerAsString = Buffer.from(tokenParts[0], 'base64').toString() // base64 to string
  const expiresInAsSeconds = JSON.parse(headerAsString).exp

  if (expiresInAsSeconds <= getNowInSeconds()) return { isValid: false, error: 'TokenExpiredError: Token has expired' }
  else {
    const signatureInUInt8 = Buffer.from(tokenParts[2], 'base64') // base46 to uInt8

    try {
      const isValid = await crypto.subtle.verify(
        getAlgorithmOptions('verify'),
        publicKey,
        signatureInUInt8,
        new TextEncoder().encode(`${headerAsString}.${Buffer.from(tokenParts[1], 'base64').toString()}`) // string to ArrayBuffer
      )

      return isValid ? { isValid } : { isValid, error: 'TokenError: Invalid token' }
    } catch (e) {
      return { isValid: false, error: 'TokenError: Invalid token' }
    }
  }
}