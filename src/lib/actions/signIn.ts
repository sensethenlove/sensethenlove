import schema from '$lib/schema/signIn'
import email from '$lib/sendgrid/signIn'
import validateFields from '$lib/form/validateFields'
import type { Action } from '@sveltejs/kit'
import actionCatch from '$lib/catch/actionCatch'
import createToken from '$lib/security/createToken'
import findFirstUser from '$lib/prisma/findFirstUser'
import setSignInCookie from '$lib/cookies/setSignInCookie'


export default (async ({ request, cookies }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)
    let user = await findFirstUser({ email: fields.email.toString() })

    if (user) {
      const signInId = crypto.randomUUID()
      await email(await createToken('signIn', { userId: user.id, signInId }), fields.email.toString(), user.firstName)
      setSignInCookie(signInId, cookies)
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
