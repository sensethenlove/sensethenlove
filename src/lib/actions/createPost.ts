import type { Action } from '@sveltejs/kit'
import schema from '$lib/schema/createPost'
import writeImage from '$lib/file/writeImage'
import createPost from '$lib/prisma/createPost'
import updatePost from '$lib/prisma/updatePost'
import actionCatch from '$lib/catch/actionCatch'
import getImageName from '$lib/file/getImageName'
import htmlSanitize from '$lib/util/htmlSanitize'
import isFileAnImage from '$lib/file/isFileAnImage'
import validateFields from '$lib/form/validateFields'
import { BASE_CONTENT_EDITABLE_ELEMENT } from '$lib/form/variables'


export default (async ({ request, locals }) => {
  try {
    let fields = Object.fromEntries((await request.formData()).entries())

    fields = {
      ...fields,
      creatorId: locals.userId, // necessary for createPost
      content: htmlSanitize(fields.content.toString().replace(BASE_CONTENT_EDITABLE_ELEMENT, '')) // remove base b4 validating and sanitize b4 validating
    }

    await validateFields(fields, schema) // validate form fits requirements

    if (fields.image instanceof Blob && fields.image.size) { // if uploaded file provided https://nodejs.org/api/all.html#all_buffer_class-blob
      isFileAnImage(fields.image) // will throw an error if not an image
      const post = await createPost(fields) // create the post
      const imageId = await writeImage(fields.image, getImageName('post', post.id)) // send image to cloudflare
      await updatePost(post.id, { imageId }) // update post with cloudflare image id
    } else { // no file provided in the form
      await createPost(fields) // create post w/o image considerations
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
