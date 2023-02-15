import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'


export default async (): Promise<void> => {
  const { privateKey, publicKey } = await crypto.subtle.generateKey(getAlgorithmOptions('generate'), true, ['sign', 'verify']) as CryptoKeyPair
  console.log('privateJWK', JSON.stringify(await crypto.subtle.exportKey('jwk', privateKey)))
  console.log('publicJWK', JSON.stringify(await crypto.subtle.exportKey('jwk', publicKey)))
}
