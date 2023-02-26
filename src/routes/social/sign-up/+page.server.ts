import signUp from '$lib/actions/signUp'
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
  signUp
} satisfies Actions
