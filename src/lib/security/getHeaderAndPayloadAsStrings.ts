import type { TokenPayload } from '$lib/types/all'
import getNowInSeconds from '$lib/util/getNowInSeconds'


export default (payloadAsObject: TokenPayload, expiresInAsSeconds: number) => {
  const header = JSON.stringify({ alg: 'ES512', typ: 'JWT', exp: expiresInAsSeconds + getNowInSeconds() })
  const payloadAsString = JSON.stringify(payloadAsObject)
  return { payload: payloadAsString, header, united: `${header}.${payloadAsString}` }
}
