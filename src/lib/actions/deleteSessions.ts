import type { Action } from '@sveltejs/kit'
import actionCatch from '$lib/catch/actionCatch'
import deleteManySessions from '$lib/prisma/deleteManySessions'


export default (async ({ request }) => {
  try {
    const sessionIds = []
    const fields = Object.fromEntries((await request.formData()).entries())

    for (const key of Object.keys(fields)) {
      sessionIds.push(key)
    }

    await deleteManySessions(sessionIds)
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
