import schema from '$lib/schema/search'
import type { Action } from '@sveltejs/kit'
import actionCatch from '$lib/catch/actionCatch'
import validateFields from '$lib/form/validateFields'
import searchQuotesByText from '$lib/prisma/searchQuotesByText'
import searchSourcesByTitle from '$lib/prisma/searchSourcesByTitle'


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

      response = { quotesByText, sourcesByTitle }
    }
    else if (fields.quotesByText?.toString() === 'on') {
      response = { quotesByText: await searchQuotesByText(fields.query.toString()) }
    } else {
      response = { sourcesByTitle: await searchSourcesByTitle(fields.query.toString()) }
    }

    return response
  } catch (e) {
    return actionCatch(e)
  }
}) satisfies Action
