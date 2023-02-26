import type { Cookies } from '@sveltejs/kit'
import email from '$lib/mailchannels/signIn'
import createToken from '$lib/security/createToken'
import type { FormFields, User } from '$lib/util/types'
import setSignInCookie from '$lib/cookies/setSignInCookie'


export default async (fields: FormFields, cookies: Cookies, user: User): Promise<string | undefined> => {
  const signInId = crypto.randomUUID() // sign in id will be in the token & in the cookie
  const token = await createToken('signIn', { userId: user.id, signInId }) // create token to place in sign in email
  const $localHref = await email(token, fields.email.toString(), user.firstName) // send sign in email
  setSignInCookie(signInId, cookies)
  return $localHref // $localHref is only returned if PUBLIC_ENVIRONMENT is local, so we may click the link w/in the email locally, b/c emails do not work outside of cloudflare workers (aka locally)
}
