import prisma from '$lib/prisma/prisma'
import type { PrimaryImage } from '$lib/util/types'


export default async (userId: string): Promise<PrimaryImage> => {
  return (await prisma()).primaryImage.create({
    data: {
      userId
    }
  })
}
