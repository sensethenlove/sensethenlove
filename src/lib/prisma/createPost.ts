import prisma from '$lib/prisma/prisma'
import type { Post, FormFields } from '$lib/util/types'


export default async (fields: FormFields): Promise<Post> => {
  return (await prisma()).post.create({
    data: {
      content: fields.content.toString(),
      creatorId: fields.creatorId.toString(),
    }
  })
}
