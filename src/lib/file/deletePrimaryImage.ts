import env from '$lib/security/env'


export default async (imageId: string): Promise<Response> => {
  const url = `https://api.cloudflare.com/client/v4/accounts/${ await env.get('CLOUDFLARE_ACCOUNT_ID') }/images/v1/${ imageId }`
  const init = {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${ await env.get('CLOUDFLARE_IMAGES_API_TOKEN') }` }
  }

  return await fetch(url, init)
}
