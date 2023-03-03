import prisma from '@prisma/client'
import type { Source } from '$lib/util/types'


export default async (): Promise<Source | null> => {
  const client = new prisma.PrismaClient()
  const response = await client.source.findFirst({
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
  client.$disconnect()
  return response
}
