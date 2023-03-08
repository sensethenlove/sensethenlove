import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/types/all'


export default async (sessionId: string): Promise<Session> => {
  return (await prisma()).session.delete({
    where: { id: sessionId }
  })
}
