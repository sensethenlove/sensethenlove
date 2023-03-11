export default (currentUrl: URL, parameters?: string[][]) => {
  const url = new URL(currentUrl)

  if (parameters) {
    for (const [ key, value ] of parameters) {
      if (value) url.searchParams.set(key, value)
      else url.searchParams.delete(key)
    }
  }

  return url.href
}
