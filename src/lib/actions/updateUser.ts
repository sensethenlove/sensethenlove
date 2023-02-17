import type { Action } from '@sveltejs/kit'
import schema from '$lib/schema/updateUser'
import updateUser from '$lib/prisma/updateUser'
import actionCatch from '$lib/catch/actionCatch'
import isFileAnImage from '$lib/file/isFileAnImage'
import validateFields from '$lib/form/validateFields'
import writePrimaryImage from '$lib/file/writePrimaryImage'
import deletePrimaryImage from '$lib/file/deletePrimaryImage'


export default (async ({ request, locals }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)

    if (fields.file instanceof Blob && fields.file.size) { // if uploaded file provided https://nodejs.org/api/all.html#all_buffer_class-blob
      isFileAnImage(fields.file)

      let newPrimaryImageId

      if (fields.primaryImageId.toString()) { // IF user already has a primaryImageId
        const cloudflareResponse = await Promise.all([ // to cloudflare images
          writePrimaryImage(fields.file), // write new primary image file
          deletePrimaryImage(fields.primaryImageId.toString()) // remove previous primary image file
        ])
        console.log('cloudflareResponse', cloudflareResponse)
        newPrimaryImageId = cloudflareResponse[0]
      } else {
        newPrimaryImageId = await writePrimaryImage(fields.file)
      }

      await updateUser({ id: locals.userId }, {
        firstName: fields.firstName.toString(),
        lastName: fields.lastName.toString(),
        email: fields.email.toString(),
        primaryImageId: newPrimaryImageId,
        isNewsletterSubscriber: fields.isNewsletterSubscriber === 'on',
      })
    } else { // new image file not provided
      await updateUser({ id: locals.userId }, { // update user in db
        firstName: fields.firstName.toString(),
        lastName: fields.lastName.toString(),
        email: fields.email.toString(),
        isNewsletterSubscriber: fields.isNewsletterSubscriber === 'on',
      })
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
