import prisma from '$lib/prisma/prisma'
import type { Post } from '$lib/util/types'


export default async (id: string, data: any): Promise<Post> => {
  return (await prisma()).post.update(
    { where: { id },
    data
  })
}
