import prisma from '$lib/prisma/prisma'
import type { Source } from '$lib/types/all'


export default async (): Promise<Source[]> => {
  return (await prisma()).source.findMany({
    include: {
      images: true,
      authors: true,
      categories: true,
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
