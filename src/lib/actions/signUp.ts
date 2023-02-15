import schema from '$lib/schema/signUp'
import email from '$lib/sendgrid/signIn'
import type { Action } from '@sveltejs/kit'
import createUser from '$lib/prisma/createUser'
import actionCatch from '$lib/catch/actionCatch'
import createToken from '$lib/security/createToken'
import validateFields from '$lib/form/validateFields'
import findFirstUser from '$lib/prisma/findFirstUser'


export default (async ({ request, getClientAddress }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries()) 
    await validateFields(fields, schema)

    const user = await findFirstUser({ email: fields.email.toString() }) || await createUser(fields)
    await email(await createToken('signIn', { userId: user.id, ipAddress: getClientAddress() }), fields.email.toString(), fields.firstName.toString())
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
