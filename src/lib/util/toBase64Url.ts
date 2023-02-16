import { Buffer } from 'buffer/'


export default (content: any) => {
  return Buffer.from(content).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+/g, '')
}
