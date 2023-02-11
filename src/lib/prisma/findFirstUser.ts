import prisma from '$lib/prisma/prisma'
import type { User } from '$lib/util/types'


export default async ({ id, email }: { id?: string, email?: string }): Promise<User | null> => {
  return (await prisma()).user.findFirst({ where: { id, email } })
}
