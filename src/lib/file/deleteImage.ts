import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_IMAGES_API_TOKEN } from '$env/static/private'


export default async (imageId: string): Promise<Response> => {
  return await fetch(`https://api.cloudflare.com/client/v4/accounts/${ CLOUDFLARE_ACCOUNT_ID }/images/v1/${ imageId }`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${ CLOUDFLARE_IMAGES_API_TOKEN }` }
  })
}
