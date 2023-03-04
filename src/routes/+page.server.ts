import search from '$lib/actions/search'
import routeCatch from '$lib/catch/routeCatch'
import type { Source, Culture } from '$lib/util/types'
import type { Actions, PageServerLoad } from './$types'
import newsletterSignUp from '$lib/actions/newsletterSignUp'
import findFirstSource from '$lib/prisma/findFirstSource'
import findFirstCulture from '$lib/prisma/findFirstCulture'


export const load = (async () => {
  try {
    const [ source, culture ] = await Promise.all([
      findFirstSource(),
      findFirstCulture()
    ])

    return {
      source: formatSource(source),
      culture: formatCulture(culture),
    }
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  search,
  newsletterSignUp
} satisfies Actions


function formatSource (source: Source | null) {
  if (source?.favoriteQuotes) {
    let sourceCategories = new Map() // use map so duplicates are removed

    for (const quote of source.favoriteQuotes) {
      if (quote.categories) {
        for (const category of quote.categories) {
          sourceCategories.set(category.id, category) // place each category in map
        }
      }
    }

    source.categories = [...sourceCategories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // set source categories AND sort them by name
  }

  return source
}

function formatCulture (culture: Culture | null) {
  console.log(culture)
  return culture
}
