import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/util/types'


export default (id: string): Promise<Session | null> => {
  return prisma.session.findFirst({
    where: { id },
    include: { user: true },
  })
}
