import search from '$lib/actions/search'
import routeCatch from '$lib/catch/routeCatch'
import type { Actions, PageServerLoad } from './$types'
import findFirstSource from '$lib/prisma/findFirstSource'


export const load = (async ({ params }) => {
  try {
    return {
      source: await findFirstSource(params.slug)
    }
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  search,
} satisfies Actions
