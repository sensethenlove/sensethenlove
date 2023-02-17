import type { Source } from '$lib/util/types'


export default function (sources: Source[], urlParamAuthor: string | null, urlParamCategory?: string) {
  let responseAuthor // the author we will place in the response
  let responseCategory // the category we will place in the response
  const authors = new Map() // use map so duplicates are removed
  const categories = new Map() // use map so duplicates are removed
  const SOURCES_LENGTH_MINUS_ONE = sources.length - 1 // indexes (sourceIndex) in for loop below go to 1 minus the length

  for (let sourceIndex = SOURCES_LENGTH_MINUS_ONE; sourceIndex >= 0; sourceIndex--) { // loop sources backwards b/c we may remove some sources
    let source = sources[sourceIndex]
    let urlAuthorWroteSource = false
    let sourceCategories = new Map() // use map so duplicates are removed

    for (const author of source.authors) {
      authors.set(author.id, author) // place each author in map

      if (urlParamAuthor && author.slug === urlParamAuthor) { // if an author param is requested in the URL AND the author in the loop matches the urlParamAuthor
        responseAuthor = author
        urlAuthorWroteSource = true
      }
    }

    const QUOTE_LENGTH_MINUS_ONE = source.favoriteQuotes.length - 1 // indexes (quoteIndex) in for loop below go to 1 minus the length

    for (let quoteIndex = QUOTE_LENGTH_MINUS_ONE; quoteIndex >= 0; quoteIndex--) { // loop favoriteQuotes backwards b/c we may remove some quotes
      let quoteHasUrlCategory = false
      let quote = source.favoriteQuotes[quoteIndex]

      for (const category of quote.categories) {
        categories.set(category.id, category) // place each category in map of all categories
        sourceCategories.set(category.id, category) // place each category in map of source categories

        if (urlParamCategory && category.slug === urlParamCategory) { // if a category param is requested in the URL AND the category in the loop matches the urlParamCategory
          responseCategory = category
          quoteHasUrlCategory = true
        }
      }

      if (urlParamCategory && !quoteHasUrlCategory) source.favoriteQuotes.splice(quoteIndex, 1) // if a category param is requested in the URL AND this quote does not in the requested category => remove quote from source
      else source.categories = [...sourceCategories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // source is valid => set source categories AND sort them by name
    }

    if (urlParamAuthor && !urlAuthorWroteSource) sources.splice(sourceIndex, 1) // if an author param is requested in the URL AND this source was not written by this author => remove source
    else if (!source.favoriteQuotes?.length) sources.splice(sourceIndex, 1) // if source has no quotes => remove source
    else source.favoriteQuotes?.sort((a, b) => a.displayOrder - b.displayOrder) // sorce is valid => sort quotes by displayOrder
  }

  return { // response
    sources,
    author: responseAuthor,
    category: responseCategory,
    authors: [...authors.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)), // sort authors by name
    categories: [...categories.values()].sort((a, b) => Number(a.name > b.name) - Number(a.name < b.name)) // sort categories by name
  }
}
