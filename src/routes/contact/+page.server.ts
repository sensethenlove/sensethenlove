import type { Actions } from './$types'
import emailUs from '$lib/actions/emailUs'
import newsletterSignUp from '$lib/actions/newsletterSignUp'


export const actions = {
  emailUs,
  newsletterSignUp,
} satisfies Actions
