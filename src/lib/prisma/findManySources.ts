import prisma from '$lib/prisma/prisma'
import type { Source } from '$lib/util/types'


export default (): Promise<Source[]> => {
  return prisma.source.findMany({
    include: {
      authors: true,
      favoriteQuotes: {
        include: {
          categories: true
        }
      },
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
