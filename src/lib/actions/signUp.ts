import schema from '$lib/schema/signUp'
import type { Action } from '@sveltejs/kit'
import email from '$lib/mailchannels/signIn'
import writeImage from '$lib/file/writeImage'
import updateUser from '$lib/prisma/updateUser'
import createUser from '$lib/prisma/createUser'
import actionCatch from '$lib/catch/actionCatch'
import getImageName from '$lib/file/getImageName'
import createToken from '$lib/security/createToken'
import isFileAnImage from '$lib/file/isFileAnImage'
import validateFields from '$lib/form/validateFields'
import findFirstUser from '$lib/prisma/findFirstUser'
import setSignInCookie from '$lib/cookies/setSignInCookie'


export default (async ({ request, cookies }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)

    let user = await findFirstUser({ email: fields.email.toString() }) // see if user already has an email in our system

    if (!user) { // if they are an existing user skip over altering their account and just send them a sign in email
      if (fields.primaryImage instanceof Blob && fields.primaryImage.size) { // if uploaded file provided https://nodejs.org/api/all.html#all_buffer_class-blob
        isFileAnImage(fields.primaryImage) // will throw an error if not an image
        user = await createUser(fields) // create user w/o primaryImageId
        const primaryImageId = await writeImage(fields.primaryImage, getImageName('primary', user.id)) // save image in cloudflare images and get it's id
        await updateUser({ id: user.id }, { primaryImageId }) // update user with primaryImageId
      } else { // primary image file not provided
        user = await createUser(fields)
      }
    }

    const signInId = crypto.randomUUID() // sign in id will be in the token & in the cookie
    const token = await createToken('signIn', { userId: user.id, signInId }) // create token to place in sign in email
    await email(token, fields.email.toString(), user.firstName) // send sign in email
    setSignInCookie(signInId, cookies)
    return { user }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
