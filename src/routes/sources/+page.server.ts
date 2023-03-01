import search from '$lib/actions/search'
import routeCatch from '$lib/catch/routeCatch'
import type { Actions, PageServerLoad } from './$types'
import findManySources from '$lib/prisma/findManySources'
import sourcesToResponse from '$lib/util/sourcesToResponse'


export const load = (async ({ url }) => {
  try {
    return sourcesToResponse(await findManySources(), url.searchParams.get('author'))
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  search,
} satisfies Actions
