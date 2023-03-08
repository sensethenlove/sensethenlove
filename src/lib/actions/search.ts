import schema from '$lib/schema/search'
import type { Action } from '@sveltejs/kit'
import actionCatch from '$lib/catch/actionCatch'
import validateFields from '$lib/form/validateFields'
import searchQuotesByText from '$lib/prisma/searchQuotesByText'
import searchSourcesByTitle from '$lib/prisma/searchSourcesByTitle'
import type { Source, SearchQuotesByTextResponse } from '$lib/types/all'


export default (async ({ request }) => {
  try {
    let response
    const fields = Object.fromEntries((await request.formData()).entries())
    await validateFields(fields, schema)

    if (fields.quotesByText?.toString() !== 'on' && fields.sourcesByTitle?.toString() !== 'on') throw new Error('Select atleast one checkbox please')
    else if (fields.quotesByText?.toString() === 'on' && fields.sourcesByTitle?.toString() === 'on') {
      const [ quotesByText, sourcesByTitle ] = await Promise.all([
        searchQuotesByText(fields.query.toString()),
        searchSourcesByTitle(fields.query.toString()),
      ])

      response = {
        quotesByText: quotesByTextToResponse(quotesByText),
        sourcesByTitle: sourcesByTitle,
      }
    }
    else if (fields.quotesByText?.toString() === 'on') {
      response = {
        quotesByText: quotesByTextToResponse(await searchQuotesByText(fields.query.toString()))
      }
    } else {
      response = {
        sourcesByTitle: await searchSourcesByTitle(fields.query.toString())
      }
    }

    return response
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action


function quotesByTextToResponse(quotesByText: SearchQuotesByTextResponse): Source[] {
  return quotesByText.map(r => {
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
