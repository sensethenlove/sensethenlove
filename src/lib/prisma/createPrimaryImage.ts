import prisma from '$lib/prisma/prisma'
import type { PrimaryImage } from '$lib/util/types'


export default (userId: string): Promise<PrimaryImage> => {
  return prisma.primaryImage.create({
    data: {
      userId
    }
  })
}
