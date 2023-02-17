<script lang="ts">
  import schema from '$lib/schema/signUp'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    { name: 'primaryImage', label: 'Primay Image', type: 'image' },
    [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
    ],
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'terms', label: 'We will never sell data about you! 🙌 We will never read, store or sell your location information! 🙏 We will never ask you for a password! 💖', type: 'checkbox', checkboxValue: true },
    { name: 'isNewsletterSubscriber', label: 'Simultaneously sign me up for our weekly newsletter!', type: 'checkbox' },
  ]

  const onSuccess = (({ data }) => `Welcome ${ data.user.firstName }! Please check the email inbox of ${ data.user.email } for a link to sign in!`) satisfies FormOnSuccess
</script>


<Form { inputs } { schema } { onSuccess } action="signUp" buttonText="Send email link to sign in" />
