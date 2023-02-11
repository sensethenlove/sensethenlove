import prisma from '$lib/prisma/prisma'
import type { PrimaryImage } from '$lib/util/types'


export default (id: string): Promise<PrimaryImage> => {
  console.log('id', id)
  return prisma.primaryImage.delete({
    where: {
      id
    }
  })
}
