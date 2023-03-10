import prisma from '$lib/prisma/prisma'
import type { User, FormFields } from '$lib/types/all'


export default async (fields: FormFields): Promise<User> => {
  return (await prisma()).user.create({
    data: {
      firstName: fields.firstName.toString(),
      lastName: fields.lastName.toString(),
      email: fields.email.toString(),
      isNewsletterSubscriber: fields.isNewsletterSubscriber === 'on',
      profileImageId: fields.profileImageId ? fields.profileImageId.toString() : ''
    }
  })
}
