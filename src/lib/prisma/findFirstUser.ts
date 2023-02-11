import prisma from '$lib/prisma/prisma'
import type { User } from '$lib/util/types'


export default ({ id, email }: { id?: string, email?: string }): Promise<User | null> => {
  return prisma.user.findFirst({ where: { id, email } })
}
