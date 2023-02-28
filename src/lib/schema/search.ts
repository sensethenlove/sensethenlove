import { z } from 'zod'


export default z.object({
  query: z.string().min(3, 'Query is at least 3 characters please'),
})
