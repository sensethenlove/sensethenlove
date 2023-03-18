import { z } from 'zod'


export default z
  .object({
    firstName: z.string().min(3, 'First Name is at least 3 characters please'),
    lastName: z.string().min(3, 'Last Name is at least 3 characters please'),
    email: z.string().email('Provide a valid email please'),
    terms: z.string().optional() // allow .superRefine() to do the validation
  })
  .superRefine(({ terms }, ctx) => {
    if (terms !== 'on') {
      ctx.addIssue({
        code: 'custom',
        path: [ 'terms' ],
        message: 'Ackowledge our promise please',
      })
    }
  })
