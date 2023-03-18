import { z } from 'zod'
import isContentEditableEmpty from '$lib/form/isContentEditableEmpty'


export default z
  .object({
    content: z.string().optional(), // allow .superRefine() to do the validation
  })
  .superRefine(({ content }, ctx) => {
    debugger
    if (!content || isContentEditableEmpty(content)) {
      ctx.addIssue({
        code: 'custom',
        path: [ 'content' ],
        message: 'Add content to post please',
      })
    }
  })
