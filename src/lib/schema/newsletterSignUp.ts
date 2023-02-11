import { z } from 'zod'


export default z.object({
  firstName: z.string().min(3, 'First Name is at least 3 characters please'),
  lastName: z.string().min(3, 'Last Name is at least 3 characters please'),
  email: z.string().email('Provide a valid email please'),
})
