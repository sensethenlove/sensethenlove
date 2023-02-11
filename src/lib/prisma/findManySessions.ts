import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/util/types'


export default async (userId: string): Promise<Session[]> => {
  return (await prisma()).session.findMany({
    where: { userId }
  })
}
