import type { Actions } from './$types'
import type { Source } from '$lib/util/types'
import type { PageServerLoad } from './$types'
import routeCatch from '$lib/catch/routeCatch'
import findFirstSource from '$lib/prisma/findFirstSource'
import newsletterSignUp from '$lib/actions/newsletterSignUp'


export const load = (async () => {
  try {
    return sourceToResponse(await findFirstSource())
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  newsletterSignUp
} satisfies Actions


function sourceToResponse(source: Source | null) {
  if (source) {
    let sourceCategories = new Map() // use map so duplicates are removed

    for (const quote of source.favoriteQuotes) {
      for (const category of quote.categories) {
        sourceCategories.set(category.id, category) // place each category in map
      }
    }

    source.categories = [...sourceCategories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // set source categories AND sort them by name
  }

  return { source } // response
}
