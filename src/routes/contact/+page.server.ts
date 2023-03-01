import type { Actions } from './$types'
import search from '$lib/actions/search'
import emailUs from '$lib/actions/emailUs'
import newsletterSignUp from '$lib/actions/newsletterSignUp'


export const actions = {
  search,
  emailUs,
  newsletterSignUp,
} satisfies Actions
