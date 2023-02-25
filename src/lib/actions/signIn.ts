import schema from '$lib/schema/signIn'
import email from '$lib/sendgrid/signIn'
import validateFields from '$lib/form/validateFields'
import type { Action } from '@sveltejs/kit'
import actionCatch from '$lib/catch/actionCatch'
import createToken from '$lib/security/createToken'
import findFirstUser from '$lib/prisma/findFirstUser'


export default (async ({ request, getClientAddress }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)
    console.log('signin action: getClientAddress()', getClientAddress())
    let user = await findFirstUser({ email: fields.email.toString() })
    if (user) await email(await createToken('signIn', { userId: user.id, ipAddress: getClientAddress() }), fields.email.toString(), user.firstName)
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
