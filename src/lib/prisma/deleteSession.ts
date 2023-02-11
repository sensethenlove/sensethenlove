import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/util/types'


export default (sessionId: string): Promise<Session> => {
  return prisma.session.delete({
    where: { id: sessionId }
  })
}
