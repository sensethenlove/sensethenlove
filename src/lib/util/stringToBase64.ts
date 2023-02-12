import { PUBLIC_ENVIRONMENT } from '$env/static/public'


export default (str: string) => {
  return (PUBLIC_ENVIRONMENT === 'development') ? Buffer.from(str).toString('base64') : btoa(str)
}
