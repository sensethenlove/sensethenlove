import search from '$lib/actions/search'
import type { Actions, PageServerLoad } from './$types'


export const load = (async ({ locals }) => {
  return { userId: locals?.userId }
}) satisfies PageServerLoad


export const actions = {
  search,
} satisfies Actions
