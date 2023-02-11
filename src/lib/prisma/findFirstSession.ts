import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/util/types'


export default async (id: string): Promise<Session | null> => {
  return (await prisma()).session.findFirst({
    where: { id },
    include: { user: true },
  })
}
