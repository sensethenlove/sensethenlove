import schema from '$lib/schema/signIn'
import type { Action } from '@sveltejs/kit'
import actionCatch from '$lib/catch/actionCatch'
import validateFields from '$lib/form/validateFields'
import findFirstUser from '$lib/prisma/findFirstUser'
import sendSignInEmailAndSetCookie from '$lib/security/sendSignInEmailAndSetCookie'


export default (async ({ request, cookies }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)
    let user = await findFirstUser({ email: fields.email.toString() })

    if (user) {
      return {
        $localHref: await sendSignInEmailAndSetCookie(fields, cookies, user) // $localHref is only returned if PUBLIC_ENVIRONMENT is local, so we may click the link w/in the email locally, b/c emails do not work outside of cloudflare workers (aka locally)
      }
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
