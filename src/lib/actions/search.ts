import schema from '$lib/schema/search'
import type { Action } from '@sveltejs/kit'
import actionCatch from '$lib/catch/actionCatch'
import validateFields from '$lib/form/validateFields'
import searchQuotesByText from '$lib/prisma/searchQuotesByText'
import searchSourcesByTitle from '$lib/prisma/searchSourcesByTitle'
import type { Source, SearchQuotesByTextResponse } from '$lib/types/all'
import searchSourcesByDescription from '$lib/prisma/searchSourcesByDescription'


export default (async ({ request }) => {
  try {
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)

    const searchOptions = new Map([
      [ 'quotesByText', { db: searchQuotesByText, isChecked: fields.quotesByText?.toString() === 'on' } ],
      [ 'sourcesByTitle', { db: searchSourcesByTitle, isChecked: fields.sourcesByTitle?.toString() === 'on' } ],
      [ 'sourcesByDescription', { db: searchSourcesByDescription, isChecked: fields.sourcesByDescription?.toString() === 'on' } ]
    ])

    let anyChecked = false

    for (const value of searchOptions.values()) {
      if (value.isChecked) anyChecked = true
    }

    if (!anyChecked) throw new Error('Select atleast one checkbox please')
    else {
      const [ quotesByText, sourcesByTitle, sourcesByDescription ] = await Promise.all(Array.from(searchOptions, ([ key, value ]) => {
        if (value.isChecked) return value.db(fields.query.toString())
        else return Promise.resolve(null)
      }))

      return {
        sourcesByTitle,
        sourcesByDescription,
        quotesByText: quotesByTextToResponse(quotesByText as SearchQuotesByTextResponse | null),
      }
    }
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action


function quotesByTextToResponse(quotesByText: SearchQuotesByTextResponse | null): Source[] | null {
  let response = null

  if (quotesByText) {
    response = quotesByText.map(r => {
      return {
        id: r.Source.id,
        title: r.Source.title,
        type: r.Source.type,
        description: r.Source.description,
        slug: r.Source.slug,
        url: r.Source.url,
        urlType: r.Source.urlType,
        publicationLocation: r.Source.publicationLocation,
        publicationYear: r.Source.publicationYear,
        updatedAt: r.Source.updatedAt,
        createdAt: r.Source.createdAt,
        favoriteQuotes: [
          {
            id: r.id,
            text: r.text,
            sourceId: r.sourceId,
            displayOrder: r.displayOrder,
            categories: r.categories
          }
        ]
      }
    })
  }

  return response
}
