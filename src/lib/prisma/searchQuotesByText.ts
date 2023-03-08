

import prisma from '$lib/prisma/prisma'
import type { SearchQuotesByTextResponse } from '$lib/types/all'


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
