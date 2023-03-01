<script lang="ts">
  import schema from '$lib/schema/signUp'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormToastOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    { name: 'profileImage', label: 'Profile Image', type: 'image', maxWidth: '56rem' },
    [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
    ],
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'terms', label: '<span>We will never ask you for a password, we will never sell data about you & we will always be <a href="https://github.com/sensethenlove/sensethenlove/" target="_blank">open source</a>! 🙏💖🙌</span>', type: 'checkbox', checkboxValue: true, maxWidth: '56rem' },
    { name: 'isNewsletterSubscriber', label: 'Sign me up for the weekly newsletter!', type: 'checkbox' },
  ]

  const toastOnSuccess = (({ data }) => `Welcome ${ data.user.firstName }! Please check the email inbox of ${ data.user.email } for a link to sign in!`) satisfies FormToastOnSuccess
</script>


<Form { inputs } { schema } { toastOnSuccess } action="signUp" buttonText="Send email link to sign in" />
