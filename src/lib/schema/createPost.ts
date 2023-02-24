import { z } from 'zod'
import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'


export default z.object({
  content: z
    .string()
    .refine(content => !isContentEditableEmpty(content), {
      message: 'Add content to post please'
    })
})
