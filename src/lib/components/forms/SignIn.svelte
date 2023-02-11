<script lang="ts">
  import schema from '$lib/schema/signIn'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    { name: 'email', label: 'Email', type: 'email' },
  ]

  const onSuccess = (fields => `Please check the email inbox of ${ fields.email.toString() } for a link to sign in!`) satisfies FormOnSuccess
</script>


<Form { inputs } { schema } { onSuccess } css="full-width-form" action="signIn" buttonText="Send email link to sign in" />
