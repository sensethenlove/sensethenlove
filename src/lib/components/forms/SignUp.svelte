<script lang="ts">
  import schema from '$lib/schema/signUp'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
    ],
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'terms', label: 'We will never sell data about you! 😘 We will never get or store your location information! 🙏 We will never ask you for a password! 💖', type: 'checkbox', checkboxValue: true },
    { name: 'isNewsletterSubscriber', label: 'Simultaneously sign me up for our weekly newsletter!', type: 'checkbox' },
  ]

  const onSuccess = (fields => `Welcome ${ fields.firstName.toString() }! Please check the email inbox of ${ fields.email.toString() } for a link to sign in!`) satisfies FormOnSuccess
</script>


<Form { inputs } { schema } { onSuccess } action="signUp" buttonText="Send email link to sign in" />
