import type { LayoutServerLoad } from './$types'


export const load = (({ locals }) => {
  console.log('fast', '+layout.server.ts', 'start')
  return {
    theme: locals.theme
  }
}) satisfies LayoutServerLoad
