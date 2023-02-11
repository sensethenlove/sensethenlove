import prisma from '$lib/prisma/prisma'


export default async (sessionIds: string[]): Promise<{ count: number }> => {
  return (await prisma()).session.deleteMany({
    where: {
      id: {
        in: sessionIds
      }
    }
  })
}
