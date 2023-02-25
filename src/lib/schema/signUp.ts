import { z } from 'zod'


const TERMS_ERROR_MESSAGE = 'Ackowledge our promise please'


export default z.object({
  firstName: z.string().min(3, 'First Name is at least 3 characters please'),
  lastName: z.string().min(3, 'Last Name is at least 3 characters please'),
  email: z.string().email('Provide a valid email please'),
  terms: z
    .string({ // if a string is not provided
      errorMap () { return { message: TERMS_ERROR_MESSAGE } }
    })
    .refine(terms => terms === 'on', { // if the string is "on" (valid), else show error message
      message: TERMS_ERROR_MESSAGE
    })
})
