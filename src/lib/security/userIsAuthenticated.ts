import { RedirectError } from '$lib/util/errors'


export default (locals: App.Locals, redirectTo: string): boolean => {
  if (locals.userId) return true
  else throw new RedirectError(redirectTo)
}
