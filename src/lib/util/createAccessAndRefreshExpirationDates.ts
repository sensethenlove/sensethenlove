import { ACCESS_COOKIE_MAX_AGE_IN_SECONDS, REFRESH_COOKIE_MAX_AGE_IN_SECONDS } from '$lib/auth/variables'


export default (): { accessExpiration: Date, refreshExpiration: Date } => {
  const MS_SINCE_EPOCH = Date.now()
  const accessExpiration = new Date(1970, 0, 1)
  const refreshExpiration = new Date(1970, 0, 1)

  accessExpiration.setMilliseconds(MS_SINCE_EPOCH + (ACCESS_COOKIE_MAX_AGE_IN_SECONDS * 1000))
  refreshExpiration.setMilliseconds(MS_SINCE_EPOCH + (REFRESH_COOKIE_MAX_AGE_IN_SECONDS * 1000))

  return {
    accessExpiration,
    refreshExpiration,
  }
}
