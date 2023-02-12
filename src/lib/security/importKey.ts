import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'


export default async (key: JsonWebKey, isPrivate: boolean): Promise<CryptoKey> => {
  return crypto.subtle.importKey(
    "jwk",
    key,
    getAlgorithmOptions('import'),
    true,
    [isPrivate ? 'sign' : 'verify']
  )
}
