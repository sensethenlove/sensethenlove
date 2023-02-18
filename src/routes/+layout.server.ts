import type { LayoutServerLoad } from './$types'


export const load = (({ locals }) => {
  return {
    theme: locals.theme
  }
}) satisfies LayoutServerLoad
