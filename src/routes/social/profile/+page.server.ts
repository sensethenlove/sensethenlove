import createPost from '$lib/actions/createPost'
import type { Actions, PageServerLoad } from './$types'


export const load = (async ({ locals }) => {
  return {
    userId: locals.userId,
  }
}) satisfies PageServerLoad


export const actions = {
  createPost
} satisfies Actions
