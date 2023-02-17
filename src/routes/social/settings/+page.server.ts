import updateUser from '$lib/actions/updateUser'
import findFirstUser from '$lib/prisma/findFirstUser'
import type { Actions, PageServerLoad } from './$types'
import deleteSessions from '$lib/actions/deleteSessions'
import findManySessions from '$lib/prisma/findManySessions'


export const load = (async ({ locals }) => {
  const response = await Promise.all([ findManySessions(locals.userId), findFirstUser({ id: locals.userId }) ])

  return {
    user: response[1],
    sessions: response[0],
  }
}) satisfies PageServerLoad


export const actions = {
  updateUser,
  deleteSessions,
} satisfies Actions
