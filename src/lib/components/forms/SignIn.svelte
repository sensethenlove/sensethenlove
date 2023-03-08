<script lang="ts">
  import schema from '$lib/schema/signIn'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormToastOnSuccess } from '$lib/types/all'

  const inputs: FormInputs = [
    { name: 'email', label: 'Email', type: 'email' },
  ]

  const toastOnSuccess = (({ fields }) => `Please check the email inbox of ${ fields.email.toString() } for a link to sign in!`) satisfies FormToastOnSuccess
</script>


<Form { inputs } { schema } { toastOnSuccess } css="full-width-form" action="signIn" buttonText="Send email link to sign in" />
