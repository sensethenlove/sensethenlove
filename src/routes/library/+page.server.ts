import search from '$lib/actions/search'
import routeCatch from '$lib/catch/routeCatch'
import type { Actions, PageServerLoad } from './$types'
import findManySources from '$lib/prisma/findManySources'
import type { Source, SourceType, Quote, Author, Category } from '$lib/types/all'


export const load = (async ({ url }) => {
  try {
    return sourcesToResponse({
      sources: await findManySources(),
      urlParamType: getUrlParamType(url),
      urlParamAuthor: url.searchParams.get('author'),
      urlParamCategory: url.searchParams.get('category'),
    })
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  search,
} satisfies Actions


function getUrlParamType (url: URL) {
  const type = url.searchParams.get('type')
  return (type === 'science' || type === 'product' || type === 'culture') ? type : undefined
}


function sourcesToResponse ({ sources, urlParamType, urlParamAuthor, urlParamCategory }: { sources: Source[], urlParamType: SourceType, urlParamCategory?: string | null, urlParamAuthor: string | null }) {
  let responseAuthor // the author we will place in the response
  let responseCategory // the category we will place in the response
  const authors: Map<string, Author> = new Map() // use map so duplicates are removed
  const categories: Map<string, Category> = new Map() // use map so duplicates are removed
  const SOURCES_LENGTH_MINUS_ONE = sources.length - 1 // indexes (sourceIndex) in for loop below go to 1 minus the length

  for (let sourceIndex = SOURCES_LENGTH_MINUS_ONE; sourceIndex >= 0; sourceIndex--) { // loop sources backwards b/c we may remove some sources
    let spliceSource = false
    let source = sources[sourceIndex]
    let urlAuthorWroteSource = false

    if (source.authors) {
      for (const author of source.authors) {
        authors.set(author.id, author) // place each author in map

        if (urlParamAuthor && author.slug === urlParamAuthor) { // if an author param is requested in the URL AND the author in the loop matches the urlParamAuthor
          responseAuthor = author
          urlAuthorWroteSource = true
        }
      }
    }

    if (source.type === 'SCIENCE') {
      if (source.favoriteQuotes) {
        let sourceCategories: Map<string, Category> = new Map() // use map so duplicates are removed
        const QUOTE_LENGTH_MINUS_ONE = source.favoriteQuotes.length - 1 // indexes (quoteIndex) in for loop below go to 1 minus the length

        for (let quoteIndex = QUOTE_LENGTH_MINUS_ONE; quoteIndex >= 0; quoteIndex--) { // loop favoriteQuotes backwards b/c we may remove some quotes
          let quoteHasUrlCategory = false
          let quote = source.favoriteQuotes[quoteIndex]

          if (quote.categories) {
            for (const category of quote.categories) {
              categories.set(category.id, category) // place each category in map of all categories

              if (!urlParamCategory) addCategoriesToSourceCategories(quote, sourceCategories) // if no category is requested in the url => place categories from quote into source categories
              else if (category.slug === urlParamCategory) { // if a category param is requested in the URL AND the category in the loop matches the urlParamCategory
                responseCategory = category // save this full varialbe representing the url param
                quoteHasUrlCategory = true // tip flag indicating quote from url found
                addCategoriesToSourceCategories(quote, sourceCategories) // place categories from quote into source categories
              }
            }
          }

          if (urlParamCategory && !quoteHasUrlCategory) source.favoriteQuotes.splice(quoteIndex, 1) // if a category param is requested in the URL AND this quote does not in the requested category => remove quote from source
          else source.categories = [...sourceCategories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // source is valid => set source categories AND sort them by name
        }
      }
    } else { // CULTURE || PRODUCT
      if (source.categories) {
        for (const category of source.categories) {
          categories.set(category.id, category) // place each category in map of all categories
        }

        if (urlParamCategory && !source.categories.find(c => c.slug === urlParamCategory)) spliceSource = true // if a category param is requested in the URL AND category in url is not in this source => tip remove source flag
        else source.categories.sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // sort categories by name
      } else if (urlParamCategory) { // if a category param is requested in the URL AND source has no categories => tip remove source flag
        spliceSource = true
      }
    }
    

    if (spliceSource) sources.splice(sourceIndex, 1) // if splice source requested => remove source
    else if (urlParamType && urlParamType.toUpperCase() !== source.type) sources.splice(sourceIndex, 1) // if source type is requested in the URL AND this source is not in that type => remove source
    else if (urlParamAuthor && !urlAuthorWroteSource) sources.splice(sourceIndex, 1) // if an author param is requested in the URL AND this source was not written by this author => remove source
    else if (source.type === 'SCIENCE' && !source.favoriteQuotes?.length) sources.splice(sourceIndex, 1) // if science source has no quotes => remove source
    else if (source.type === 'SCIENCE') source.favoriteQuotes?.sort((a, b) => a.displayOrder - b.displayOrder) // sorce is valid AND it is a science source => sort quotes by displayOrder
  }

  return { // response
    sources,
    type: urlParamType,
    author: responseAuthor,
    category: responseCategory,
    authors: [...authors.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)), // sort authors by name
    categories: [...categories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // sort categories by name
  }
}


function addCategoriesToSourceCategories (quote: Quote, sourceCategories: Map<string, Category>) {
  if (quote.categories) {
    for (const category of quote.categories) {
      sourceCategories.set(category.id, category)
    }
  }
}
