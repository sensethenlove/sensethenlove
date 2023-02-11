import prisma from '$lib/prisma/prisma'


export default (sessionIds: string[]): Promise<{ count: number }> => {
  return prisma.session.deleteMany({
    where: {
      id: {
        in: sessionIds
      }
    }
  })
}
