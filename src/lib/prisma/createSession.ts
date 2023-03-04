import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/util/types'
import createAccessAndRefreshExpirationDates from '$lib/security/createAccessAndRefreshExpirationDates'


export default async (userId: string, ipAddress: string): Promise<Session> => {
  const { accessExpiration, refreshExpiration } = createAccessAndRefreshExpirationDates()

  return (await prisma()).session.create({
    data: {
      userId,
      ipAddress,
      accessExpiration,
      refreshExpiration,
    }
  })
}
