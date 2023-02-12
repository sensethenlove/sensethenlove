import getJWK from '$lib/security/getJWK'
import generateKeys from '$lib/security/generateKeys'

export default async (): Promise<void> => {
  const response = await generateKeys()
  console.log('privateJWK', JSON.stringify(await getJWK(response.privateKey)))
  console.log('publicJWK', JSON.stringify(await getJWK(response.publicKey)))
}
