import { ZodError } from 'zod'
import { fail, redirect } from '@sveltejs/kit'
import { RedirectError } from '$lib/util/errors'


export default (e: any) => {
  let response: any = { _errors: [] }
  const DEFAULT_ERROR = 'We apologize, a server error occurred, please try again and/or contact us'

  if (!e) response._errors.push(DEFAULT_ERROR)
  else {
    if (typeof e === 'string') response._errors.push(e)
    else if (e instanceof ZodError) response = e.format()
    else if (e instanceof RedirectError) throw redirect(303, e.message) // redirects are the smoothest w/ a throw b4 hand
    else if (typeof e === 'object') response = e
    else response._errors.push(DEFAULT_ERROR)
  }

  console.log('actionCatch', e)
  return fail(400, response)
}
