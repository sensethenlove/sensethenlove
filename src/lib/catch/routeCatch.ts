import { redirect } from '@sveltejs/kit'
import { RedirectError } from '$lib/util/errors'


export default (e: any) => {
  let _errors = [ 'We apologize, there was an error creating the page' ]

  if (e instanceof RedirectError) throw redirect(303, e.message) // redirects are the smoothest w/ a throw b4 hand
  else if (e._errors) _errors = e._errors
  else if (typeof e?.toString === 'function') _errors = [ e?.toString() ]

  console.log('routeCatch', e)
  return { _errors }
}
