import prisma from '$lib/prisma/prisma'
import type { Source } from '$lib/util/types'


export default async (): Promise<Source | null> => {
  try {
    console.log(await (await prisma()).source.findMany({
      where: {
        title: {
          search: 'heart',
        },
      },
    }))
  } catch (e) {
    console.log(e)
  }
  
  return (await prisma()).source.findFirst({
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
