import { redirect } from '@sveltejs/kit'
import { RedirectError } from '$lib/util/errors'


export default (e: any) => {
  let error = 'We apologize, there was an error creating this page'

  if (e instanceof RedirectError) throw redirect(303, e.message) // redirects are the smoothest w/ a throw b4 hand
  else if (typeof e?.toString === 'function') error = e?.toString()

  console.log(e)
  return { error }
}
