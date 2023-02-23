import { z } from 'zod'
import isJoditEmpty from '$lib/form/isJoditEmpty'


export default z.object({
  content: z
    .string()
    .refine(content => !isJoditEmpty(content), {
      message: 'Add content to post please'
    })
})
