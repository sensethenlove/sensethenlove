import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/types/all'
import createAccessAndRefreshExpirationDates from '$lib/security/createAccessAndRefreshExpirationDates'


export default async (sessionId: string, ipAddress: string): Promise<Session> => {
  const { accessExpiration, refreshExpiration } = createAccessAndRefreshExpirationDates()

  return (await prisma()).session.update({
    where: { id: sessionId },
    data: {
      ipAddress,
      accessExpiration,
      refreshExpiration,
    }
  })
}
