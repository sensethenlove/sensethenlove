import signIn from '$lib/actions/signIn'
import routeCatch from '$lib/catch/routeCatch'
import type { Actions, PageServerLoad } from './$types'
import userIsUnauthenticated from '$lib/security/userIsUnauthenticated'


export const load = (async ({ locals }) => {
  try {
    userIsUnauthenticated(locals, '/social/')
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  signIn
} satisfies Actions
