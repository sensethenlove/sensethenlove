import schema from '$lib/schema/emailUs'
import validate from '$lib/form/validate'
import type { Action } from '@sveltejs/kit'
import createUser from '$lib/prisma/createUser'
import actionCatch from '$lib/util/actionCatch'
import createSiteComment from '$lib/prisma/createSiteComment'


export default (async ({ request }) => {
  try {
    const { fields, error } = await validate(request, schema)

    if (error) throw error
    else if (!fields.isNewsletterSubscriber) await createSiteComment(fields)
    else {
      await Promise.all([
        createUser(fields),
        createSiteComment(fields),
      ])
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
