import env from '$lib/security/env'


export default async (file: Blob, name: string): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file, name)

  const url = `https://api.cloudflare.com/client/v4/accounts/${ await env.get('CLOUDFLARE_ACCOUNT_ID') }/images/v1`
  const init = {
    body: formData,
    method: 'POST',
    headers: { 'Authorization': `Bearer ${ await env.get('CLOUDFLARE_IMAGES_API_TOKEN') }` }
  }

  return fetch(url, init)
    .then(r => r.json())
    .then(r => r?.result?.id)
}
