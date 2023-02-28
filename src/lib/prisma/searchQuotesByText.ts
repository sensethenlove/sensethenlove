

import prisma from '$lib/prisma/prisma'
import type { Quote } from '$lib/util/types'


export default async (query: string)/*: Promise<Quote[]>*/ => {
  return (await prisma()).quote.findMany({
    where: {
      text: {
        search: query,
      },
    },
    include: {
      Source: true
    }
  })
}
