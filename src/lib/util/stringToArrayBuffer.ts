export default (str: string): ArrayBuffer => {
  return new TextEncoder().encode(str)
}
