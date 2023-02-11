import prisma from '$lib/prisma/prisma'
import type { SiteComment, FormFields } from '$lib/util/types'


export default async (fields: FormFields): Promise<SiteComment> => {
  return (await prisma()).siteComment.create({
    data: {
      firstName: fields.firstName.toString(),
      lastName: fields.lastName.toString(),
      email: fields.email.toString(),
      comment: fields.comment.toString(),
    }
  })
}
