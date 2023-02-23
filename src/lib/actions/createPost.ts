import type { Action } from '@sveltejs/kit'
import schema from '$lib/schema/createPost'
import createPost from '$lib/prisma/createPost'
import actionCatch from '$lib/catch/actionCatch'
import htmlSanitize from '$lib/util/htmlSanitize'
import validateFields from '$lib/form/validateFields'


export default (async ({ request, locals }) => {
  try {
    let fields = Object.fromEntries((await request.formData()).entries())

    fields = {
      ...fields,
      creatorId: locals.userId,
      content: htmlSanitize(fields.content.toString())
    }

    await validateFields(fields, schema)
    await createPost(fields)
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
