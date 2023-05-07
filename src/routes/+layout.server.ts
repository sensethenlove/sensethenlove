import type { LayoutServerLoad } from './$types'


export const load = (({ locals }) => {
  return { locals }
}) satisfies LayoutServerLoad
