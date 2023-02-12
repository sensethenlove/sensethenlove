import { PUBLIC_ENVIRONMENT } from '$env/static/public'


export default (base64: string): Uint8Array => {
  let uInt8

  if (PUBLIC_ENVIRONMENT === 'development') uInt8 = Buffer.from(base64, 'base64')
  else {
    uInt8 = new Uint8Array(atob(base64).split('').map(c => {
      return c.charCodeAt(0)
    }))
  }

  return uInt8
}
