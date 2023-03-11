import search from '$lib/actions/search'
import routeCatch from '$lib/catch/routeCatch'
import loopBackwards from '$lib/util/loopBackwards'
import type { Actions, PageServerLoad } from './$types'
import findManySources from '$lib/prisma/findManySources'
import type { Source, SourceType, Quote, Author, Category } from '$lib/types/all'


export const load = (async ({ request }) => {
  try {
    return sourcesToResponse({ request, sources: await findManySources() })
  } catch (e) {
    return routeCatch(e)
  }
}) satisfies PageServerLoad


export const actions = {
  search,
} satisfies Actions


function getUrlParamType (url: URL): SourceType {
  const type = url.searchParams.get('type')
  return (type === 'science' || type === 'product' || type === 'culture') ? type : undefined
}


function sourcesToResponse ({ request, sources }: { request: Request, sources: Source[] }) {
  let responseAuthor // the author we will place in the response
  let responseCategory // the category we will place in the response

  const url = new URL(request.url) // get current url this way to avoid this bug https://github.com/sveltejs/kit/issues/9390
  const urlType = getUrlParamType(url) // get source type from url
  const urlAuthorSlug = url.searchParams.get('author') // get author slug in url
  const urlCategorySlug = url.searchParams.get('category') // get category slug in url
  const authors: Map<string, Author> = new Map() // use map so duplicates are removed
  const categories: Map<string, Category> = new Map() // use map so duplicates are removed

  loopBackwards(sources, (source, spliceSource) => {
    let sourceIsValid = true
    let urlAuthorWroteSource = false

    if (source.authors) {
      for (const author of source.authors) {
        authors.set(author.id, author) // place each author in map

        if (urlAuthorSlug && author.slug === urlAuthorSlug) { // if an author param is requested in the URL AND the author in the loop matches the urlAuthorSlug
          responseAuthor = author
          urlAuthorWroteSource = true
        }
      }
    }

    if (source.type === 'SCIENCE') {
      if (source.favoriteQuotes) {
        let sourceCategories: Map<string, Category> = new Map() // use map so duplicates are removed

        loopBackwards(source.favoriteQuotes, (quote, spliceQuote) => {          
          let quoteHasUrlCategory = false

          if (quote.categories) {
            for (const category of quote.categories) {
              categories.set(category.id, category) // place each category in map of all categories

              if (!urlCategorySlug) addCategoriesToSourceCategories(quote, sourceCategories) // if no category is requested in the url => place categories from quote into source categories
              else if (category.slug === urlCategorySlug) { // if a category param is requested in the URL AND the category in the loop matches the urlCategorySlug
                responseCategory = category // save this full variable representing the url slug as an object filled w/ properties
                quoteHasUrlCategory = true // tip flag indicating quote from url found
                addCategoriesToSourceCategories(quote, sourceCategories) // place categories from quote into source categories
              }
            }
          }

          if (urlCategorySlug && !quoteHasUrlCategory) spliceQuote() // if a category param is requested in the URL AND this quote does not in the requested category => remove quote from source
          else source.categories = [...sourceCategories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // source is valid => set source categories AND sort them by name
        })
      }
    } else { // CULTURE || PRODUCT
      let sourceHasUrlCategory = false

      if (source.categories) {
        for (const category of source.categories) {
          categories.set(category.id, category) // place each category in map of all categories

          if (category.slug === urlCategorySlug) { // category in source matches category in URL
            sourceHasUrlCategory = true // tip flag
            responseCategory = category // save this full variable representing the url slug as an object filled w/ properties
          }
        }

        if (urlCategorySlug && !sourceHasUrlCategory) sourceIsValid = false // if a category param is requested in the URL AND category in url is not in this source => tip remove source flag
        else source.categories.sort((a: Category, b: Category) => Number(a.name > b.name) - Number(a.name < b.name)) // sort categories by name
      } else if (urlCategorySlug) { // if a category param is requested in the URL AND source has no categories => tip remove source flag
        sourceIsValid = false
      }
    }
    

    if (!sourceIsValid) spliceSource() // if splice source requested => remove source
    else if (urlType && urlType.toUpperCase() !== source.type) spliceSource() // if source type is requested in the URL AND this source is not in that type => remove source
    else if (urlAuthorSlug && !urlAuthorWroteSource) spliceSource() // if an author param is requested in the URL AND this source was not written by this author => remove source
    else if (source.type === 'SCIENCE' && !source.favoriteQuotes?.length) spliceSource() // if science source has no quotes => remove source
    else if (source.type === 'SCIENCE') source.favoriteQuotes?.sort((a: Quote, b: Quote) => a.displayOrder - b.displayOrder) // sorce is valid AND it is a science source => sort quotes by displayOrder
  })

  return { // response
    sources,
    type: urlType,
    author: responseAuthor,
    category: responseCategory,
    count: Number(url.searchParams.get('count')) || 3,
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
