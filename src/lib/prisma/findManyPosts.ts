import prisma from '$lib/prisma/prisma'
import type { Post } from '$lib/types/all'


export default async (): Promise<Post[]> => {
  return (await prisma()).post.findMany({
    include: {
      images: true,
      creator: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}
