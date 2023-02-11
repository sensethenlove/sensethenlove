import prisma from '$lib/prisma/prisma'
import type { Source } from '$lib/util/types'


export default (): Promise<Source | null> => {
  return prisma.source.findFirst({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      authors: true,
      favoriteQuotes: {
        include: {
          categories: true
        }
      }
    },
  })
}
