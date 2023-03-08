import prisma from '$lib/prisma/prisma'
import type { User } from '$lib/types/all'


export default async ({ id, email }: { id?: string, email?: string }, data: any): Promise<User> => {
  return (await prisma()).user.update(
    { where: { id, email },
    data
  })
}
