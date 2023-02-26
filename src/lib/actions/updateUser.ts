import type { Action } from '@sveltejs/kit'
import schema from '$lib/schema/updateUser'
import writeImage from '$lib/file/writeImage'
import updateUser from '$lib/prisma/updateUser'
import actionCatch from '$lib/catch/actionCatch'
import getImageName from '$lib/file/getImageName'
import isFileAnImage from '$lib/file/isFileAnImage'
import validateFields from '$lib/form/validateFields'
import deleteImage from '$lib/file/deleteImage'


export default (async ({ request, locals }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)

    if (fields.profileImage instanceof Blob && fields.profileImage.size) { // if uploaded file provided https://nodejs.org/api/all.html#all_buffer_class-blob
      isFileAnImage(fields.profileImage)

      let newProfileImageId

      if (fields.profileImageId.toString()) { // IF user already has a profileImageId
        const cloudflareResponse = await Promise.all([ // to cloudflare images
          writeImage(fields.profileImage, getImageName('profile', locals.userId)), // write new profile image file
          deleteImage(fields.profileImageId.toString()) // remove previous profile image file
        ])

        newProfileImageId = cloudflareResponse[0]
      } else {
        newProfileImageId = await writeImage(fields.profileImage, getImageName('profile', locals.userId))
      }

      await updateUser({ id: locals.userId }, {
        firstName: fields.firstName.toString(),
        lastName: fields.lastName.toString(),
        email: fields.email.toString(),
        profileImageId: newProfileImageId,
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
