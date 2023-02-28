import prisma from '$lib/prisma/prisma'
import type { Source } from '$lib/util/types'


export default async (query: string): Promise<Source[]> => {
  return (await prisma()).source.findMany({
    where: {
      title: {
        search: query,
      },
    },
  })
}