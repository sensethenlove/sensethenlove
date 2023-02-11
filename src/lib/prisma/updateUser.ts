import prisma from '$lib/prisma/prisma'
import type { User } from '$lib/util/types'


export default ({ id, email }: { id?: string, email?: string }, data: any): Promise<User> => {
  return prisma.user.update(
    { where: { id, email },
    data
  })
}
