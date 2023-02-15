import schema from '$lib/schema/emailUs'
import type { Action } from '@sveltejs/kit'
import createUser from '$lib/prisma/createUser'
import actionCatch from '$lib/catch/actionCatch'
import validateFields from '$lib/form/validateFields'
import createSiteComment from '$lib/prisma/createSiteComment'


export default (async ({ request }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries()) 
    await validateFields(fields, schema)

    if (fields?.isNewsletterSubscriber) await createSiteComment(fields)
    else await Promise.all([ createUser(fields), createSiteComment(fields) ])
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
