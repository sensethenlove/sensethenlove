<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import schema from '$lib/schema/newsletterSignUp'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
    ],
    { name: 'email', label: 'Email', type: 'email' },
  ]

  const onSuccess = (fields => `Thank you for signing up ${ fields.firstName.toString() }!`) satisfies FormOnSuccess
</script>


<Title h3="Subscribe to our Weekly Newsletter?!" noBottom={ true } />
<Form { inputs } { schema } { onSuccess } action="newsletterSignUp" buttonText="Subscribe" />
