import prisma from '$lib/prisma/prisma'
import type { Source } from '$lib/types/all'


export default async (): Promise<Source | null> => {
  return (await prisma()).source.findFirst({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      type: 'CULTURE'
    },
    include: {
      authors: true,
      categories: true,
    },
  })
}
