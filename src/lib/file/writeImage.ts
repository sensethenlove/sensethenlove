import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_IMAGES_API_TOKEN } from '$env/static/private'


export default async (file: Blob, name: string): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file, name)

  const fetchResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`, {
    body: formData,
    method: 'POST',
    headers: { 'Authorization': `Bearer ${CLOUDFLARE_IMAGES_API_TOKEN}` }
  })

  return (await fetchResponse.json())?.result?.id
}
