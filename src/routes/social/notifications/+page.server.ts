import search from '$lib/actions/search'
import type { Actions, PageServerLoad } from './$types'
import userIsAuthenticated from '$lib/security/userIsAuthenticated'


export const load = (async ({ locals }) => {
  userIsAuthenticated(locals, '/social/sign-in')
  return { userId: locals.userId }
}) satisfies PageServerLoad

export const actions = {
  search,
} satisfies Actions
