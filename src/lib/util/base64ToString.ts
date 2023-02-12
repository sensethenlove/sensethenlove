import { PUBLIC_ENVIRONMENT } from '$env/static/public'


export default (base64: string) => {
  return (PUBLIC_ENVIRONMENT === 'development') ? Buffer.from(base64, 'base64').toString() : atob(base64)
}
