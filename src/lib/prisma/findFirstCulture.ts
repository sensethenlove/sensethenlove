import prisma from '$lib/prisma/prisma'
import type { Culture } from '$lib/util/types'


export default async (): Promise<Culture | null> => {
  return (await prisma()).culture.findFirst({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      authors: true,
      categories: true,
    },
  })
}
