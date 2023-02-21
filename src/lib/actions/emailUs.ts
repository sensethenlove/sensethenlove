import schema from '$lib/schema/emailUs'
import type { Action } from '@sveltejs/kit'
import createUser from '$lib/prisma/createUser'
import updateUser from '$lib/prisma/updateUser'
import actionCatch from '$lib/catch/actionCatch'
import validateFields from '$lib/form/validateFields'
import createSiteComment from '$lib/prisma/createSiteComment'


export default (async ({ request, locals }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries()) 
    await validateFields(fields, schema)

    if (!fields?.isNewsletterSubscriber) await createSiteComment(fields) // don't wanna sign up for newsletter => just create the comment in db
    else { // wanna sign up for newsletter
      if (locals.userId) { // are they signed in
        await Promise.all([ // set user in db to newslettersubscriber & add the comment @ same time
          updateUser({ id: locals.userId }, { isNewsletterSubscriber: true }),
          createSiteComment(fields)
        ])
      } else { // not signed in
        await Promise.all([ // add user in db and add site comment @ same time
          createUser(fields), 
          createSiteComment(fields)
        ])
      }
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
