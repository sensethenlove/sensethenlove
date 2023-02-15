import type { PageServerLoad } from './$types'


export const load = (async ({ locals }) => {
  return locals
}) satisfies PageServerLoad
