import { ZodError } from 'zod'
import { fail } from '@sveltejs/kit'


export default (e: any) => {
  let response: any = { _errors: [] }
  const DEFAULT_ERROR = 'We apologize, a server error occurred, please try again and/or contact us'

  if (!e) response._errors.push(DEFAULT_ERROR)
  else {
    if (typeof e === 'string') response._errors.push(e)
    else if (e instanceof ZodError) response = e.format()
    else if (typeof e !== 'object') response._errors.push(DEFAULT_ERROR)
    else if (typeof e.toString === 'function') response._errors.push(e.toString())
    else response._errors.push(DEFAULT_ERROR)
  }

  console.log(e)
  return fail(400, response)
}
