import getAlgorithmOptions from '$lib/security/getAlgorithmOptions'


export default async (): Promise<any> => {
  return crypto.subtle.generateKey(
    getAlgorithmOptions('generate'),
    true,
    ['sign', 'verify']
  )
}
