export default (content: string | Uint8Array) => {
  return Buffer.from(content).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/g, '')
}
