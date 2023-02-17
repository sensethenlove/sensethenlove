import routeCatch from '$lib/catch/routeCatch'
import updateUser from '$lib/actions/updateUser'
import findFirstUser from '$lib/prisma/findFirstUser'
import type { Actions, PageServerLoad } from './$types'
import deleteSessions from '$lib/actions/deleteSessions'
import findManySessions from '$lib/prisma/findManySessions'


export const load = (async ({ locals }) => {
  try {
    const [ user, sessions ] = await Promise.all([ findFirstUser({ id: locals.userId }), findManySessions(locals.userId) ])
    return { user, sessions }
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  updateUser,
  deleteSessions,
} satisfies Actions
