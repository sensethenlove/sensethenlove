import prisma from '$lib/prisma/prisma'
import type { PrimaryImage } from '$lib/util/types'


export default async (id: string): Promise<PrimaryImage> => {
  return (await prisma()).primaryImage.delete({
    where: {
      id
    }
  })
}
