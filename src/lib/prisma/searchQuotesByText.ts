

import prisma from '$lib/prisma/prisma'
import type { SearchQuotesByTextResponse } from '$lib/util/types'


export default async (query: string): Promise<SearchQuotesByTextResponse> => {
  return (await prisma()).quote.findMany({
    where: {
      text: {
        search: query,
      },
    },
    include: {
      Source: true,
      categories: true,
    }
  })
}
