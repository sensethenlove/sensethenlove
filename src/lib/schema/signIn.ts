import { z } from 'zod'


export default z.object({
  email: z.string().email('Provide a valid email please'),
})
