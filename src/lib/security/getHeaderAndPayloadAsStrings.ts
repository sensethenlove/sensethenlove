import type { TokenPayload } from '$lib/util/types'
import getNowInSeconds from '$lib/util/getNowInSeconds'


export default (payloadAsObject: TokenPayload, expiresInAsSeconds: number) => {
  const header = JSON.stringify({ alg: 'ECDSA', typ: 'JWT', exp: expiresInAsSeconds + getNowInSeconds() })
  const payloadAsString = JSON.stringify(payloadAsObject)
  return { payload: payloadAsString, header, united: `${header}.${payloadAsString}` }
}
