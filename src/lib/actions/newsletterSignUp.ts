import type { Action } from '@sveltejs/kit'
import createUser from '$lib/prisma/createUser'
import updateUser from '$lib/prisma/updateUser'
import actionCatch from '$lib/catch/actionCatch'
import schema from '$lib/schema/newsletterSignUp'
import findFirstUser from '$lib/prisma/findFirstUser'
import validateFields from '$lib/form/validateFields'


export default (async ({ request }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries()) 
    await validateFields(fields, schema)

    const user = await findFirstUser({ email: fields.email.toString() })

    if (!user) await createUser({ ...fields, isNewsletterSubscriber: 'on' })
    else if (!user.isNewsletterSubscriber) await updateUser({ email: fields.email.toString() }, { isNewsletterSubscriber: true })
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
