import search from '$lib/actions/search'
import type { Actions, PageServerLoad } from './$types'


export const load = (async ({ locals }) => {
  return locals
}) satisfies PageServerLoad


export const actions = {
  search,
} satisfies Actions
