import validate from '$lib/form/validate'
import type { Action } from '@sveltejs/kit'
import createUser from '$lib/prisma/createUser'
import updateUser from '$lib/prisma/updateUser'
import actionCatch from '$lib/util/actionCatch'
import schema from '$lib/schema/newsletterSignUp'
import findFirstUser from '$lib/prisma/findFirstUser'


export default (async ({ request }) => {
  try {
    const { fields, error } = await validate(request, schema)

    if (error) throw error
    else {
      const user = await findFirstUser({ email: fields.email.toString() })

      if (!user) await createUser({ ...fields, isNewsletterSubscriber: 'on' })
      else if (!user.isNewsletterSubscriber) await updateUser({ email: fields.email.toString() }, { isNewsletterSubscriber: true })
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
