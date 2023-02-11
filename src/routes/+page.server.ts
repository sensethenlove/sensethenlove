import type { Actions } from './$types'
// import newsletterSignUp from '$lib/actions/newsletterSignUp'


export const actions = {
  async newsletterSignUp ({ request }) {
    // try {
    //   const { fields, error } = await validate(request, schema)

    //   if (error) throw error
    //   else {
    //     const user = await findFirstUser({ email: fields.email.toString() })

    //     if (!user) await createUser({ ...fields, isNewsletterSubscriber: 'on' })
    //     else if (!user.isNewsletterSubscriber) await updateUser({ email: fields.email.toString() }, { isNewsletterSubscriber: true })
    //   }
    // } catch (e) {
    //   return actionCatch(e)
    // }
  }
} satisfies Actions
