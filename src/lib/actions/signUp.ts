import schema from '$lib/schema/signUp'
import type { Action } from '@sveltejs/kit'
import writeImage from '$lib/file/writeImage'
import updateUser from '$lib/prisma/updateUser'
import createUser from '$lib/prisma/createUser'
import actionCatch from '$lib/catch/actionCatch'
import getImageName from '$lib/file/getImageName'
import isFileAnImage from '$lib/file/isFileAnImage'
import validateFields from '$lib/form/validateFields'
import findFirstUser from '$lib/prisma/findFirstUser'
import sendSignInEmailAndSetCookie from '$lib/security/sendSignInEmailAndSetCookie'


export default (async ({ request, cookies }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)

    let user = await findFirstUser({ email: fields.email.toString() }) // see if user already has an email in our system

    if (!user) { // if they are an existing user skip over altering their account and just send them a sign in email
      if (fields.profileImage instanceof Blob && fields.profileImage.size) { // if uploaded file provided https://nodejs.org/api/all.html#all_buffer_class-blob
        isFileAnImage(fields.profileImage) // will throw an error if not an image
        user = await createUser(fields) // create user w/o profileImageId
        const profileImageId = await writeImage(fields.profileImage, getImageName('profile', user.id)) // save image in cloudflare images and get it's id
        await updateUser({ id: user.id }, { profileImageId }) // update user with profileImageId
      } else { // profile image file not provided
        user = await createUser(fields)
      }
    }

    return {
      user,
      $localHref: await sendSignInEmailAndSetCookie(fields, cookies, user) // $localHref is only returned if PUBLIC_ENVIRONMENT is local, so we may click the link w/in the email locally, b/c emails do not work outside of cloudflare workers (aka locally)
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
