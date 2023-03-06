import search from '$lib/actions/search'
import type { Source } from '$lib/util/types'
import routeCatch from '$lib/catch/routeCatch'
import type { Actions, PageServerLoad } from './$types'
import findFirstScience from '$lib/prisma/findFirstScience'
import newsletterSignUp from '$lib/actions/newsletterSignUp'
import findFirstCulture from '$lib/prisma/findFirstCulture'
import findFirstProduct from '$lib/prisma/findFirstProduct'


export const load = (async () => {
  try {
    const [ science, culture, product ] = await Promise.all([
      findFirstScience(),
      findFirstCulture(),
      findFirstProduct(),
    ])

    return {
      culture,
      product,
      science: formatSource(science),
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
