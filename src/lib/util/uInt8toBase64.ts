import { PUBLIC_ENVIRONMENT } from '$env/static/public'


export default (uInt8Array: Uint8Array): string => {
  let base64

  if (PUBLIC_ENVIRONMENT === 'development') base64 = Buffer.from(uInt8Array).toString('base64')
  else {
    const textDecoder = new TextDecoder('utf8')
    base64 = btoa(textDecoder.decode(uInt8Array))
  }

  return base64
}
