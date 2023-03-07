import type { LayoutServerLoad } from './$types'


export const load = (({ locals }) => {
  console.timeLog('fast', '+layout.server.ts', 'start')
  return {
    theme: locals.theme
  }
}) satisfies LayoutServerLoad
