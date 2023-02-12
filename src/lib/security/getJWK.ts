export default async (key: CryptoKey): Promise<JsonWebKey> => {
  return crypto.subtle.exportKey('jwk', key)
}