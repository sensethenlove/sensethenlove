import { PUBLIC_HOST } from '$env/static/public'


export default (currentUrl: URL, parameters?: string[][]) => {
  let url = new URL(currentUrl)

  if (url.pathname !== '/library') url = new URL(`${ PUBLIC_HOST }/library`)

  if (parameters) {
    for (const [ key, value ] of parameters) {
      if (value) url.searchParams.set(key, value)
      else url.searchParams.delete(key)
    }
  }

  return url.href
}
