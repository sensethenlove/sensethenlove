import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/util/types'


export default (userId: string): Promise<Session[]> => {
  return prisma.session.findMany({
    where: { userId }
  })
}
