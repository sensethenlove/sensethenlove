import prisma from '$lib/prisma/prisma'
import type { User, FormFields } from '$lib/util/types'


export default (fields: FormFields): Promise<User> => {
  return prisma.user.create({
    data: {
      firstName: fields.firstName.toString(),
      lastName: fields.lastName.toString(),
      email: fields.email.toString(),
      isNewsletterSubscriber: fields.isNewsletterSubscriber === 'on'
    }
  })
}
