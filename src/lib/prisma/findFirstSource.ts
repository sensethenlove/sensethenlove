import prisma from '$lib/prisma/prisma'
import type { Source } from '$lib/types/all'


export default async (slug: string): Promise<Source | null> => {
  return (await prisma()).source.findFirst({
    where: {
      slug
    },
    include: {
      images: true,
      authors: true,
      categories: true,
      favoriteQuotes: {
        include: {
          categories: true
        }
      }
    },
  })
}
