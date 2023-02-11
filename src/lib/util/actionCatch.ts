import { fail } from '@sveltejs/kit'


export default (e: any) => {
  let response: { _errors: string[] } = { _errors: [] }
  const DEFAULT_ERROR = 'We apologize, a server error occurred, please try again and/or contact us'

  if (!e) response._errors.push(DEFAULT_ERROR)
  else {
    if (typeof e === 'string') response._errors.push(e)
    else if (typeof e !== 'object') response._errors.push(DEFAULT_ERROR)
    else {
      if (e._errors) response = e
      else if (e.toString()) response._errors.push(e.toString())
      else response._errors.push(DEFAULT_ERROR)
    }
  }

  return fail(400, response)
}
