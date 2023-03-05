export default (url: string) => {
  const split = url.split('=')

  if (split.length !== 2) throw new Error('Please provide a valid url, eg: https://www.youtube.com/watch?v=3G4kCi_ldr8')
  else return split[1]
}
