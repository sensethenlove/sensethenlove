import { redirect } from '@sveltejs/kit'
import { ServerError, RedirectError } from '$lib/errors/all'


export default (e: any) => {
  let _errors = [ 'We apologize, there was an error creating the page' ]

  if (e instanceof RedirectError) throw redirect(303, e.message) // redirects are the smoothest w/ a throw b4 hand
  else if (e instanceof ServerError) _errors = e.format()._errors
  else if (e._errors) _errors = e._errors
  else if (typeof e?.toString === 'function') _errors = [ e?.toString() ]

  console.log('routeCatch', e)
  return { _errors }
}
