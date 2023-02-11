import prisma from '$lib/prisma/prisma'
import type { Session } from '$lib/util/types'
import createAccessAndRefreshExpirationDates from '$lib/util/createAccessAndRefreshExpirationDates'


export default (userId: string, ipAddress: string): Promise<Session> => {
  const { accessExpiration, refreshExpiration } = createAccessAndRefreshExpirationDates()

  return prisma.session.create({
    data: {
      userId,
      ipAddress,
      accessExpiration,
      refreshExpiration,
    }
  })
}
