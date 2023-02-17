import type { PageServerLoad } from './$types'
import routeCatch from '$lib/catch/routeCatch'
import findManySources from '$lib/prisma/findManySources'
import sourcesToResponse from '$lib/util/sourcesToResponse'


export const load = (async ({ url, params }) => {
  try {
    return sourcesToResponse(await findManySources(), url.searchParams.get('author'), params.slug)
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad
