import search from '$lib/actions/search'
import routeCatch from '$lib/catch/routeCatch'
import updateUser from '$lib/actions/updateUser'
import findFirstUser from '$lib/prisma/findFirstUser'
import type { Actions, PageServerLoad } from './$types'
import deleteSessions from '$lib/actions/deleteSessions'
import findManySessions from '$lib/prisma/findManySessions'
import userIsAuthenticated from '$lib/security/userIsAuthenticated'


export const load = (async ({ locals }) => {
  try {
    userIsAuthenticated(locals, '/social/sign-in')

    const [ user, sessions ] = await Promise.all([
      findFirstUser({ id: locals.userId }),
      findManySessions(locals.userId)
    ])

    return { user, sessions }
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  search,
  updateUser,
  deleteSessions,
} satisfies Actions
