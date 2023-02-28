<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import schema from '$lib/schema/newsletterSignUp'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormToastOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
    ],
    { name: 'email', label: 'Email', type: 'email' },
  ]

  const toastOnSuccess = (({ fields }) => `Thank you for signing up ${ fields.firstName.toString() }!`) satisfies FormToastOnSuccess
</script>


<Title h3="Subscribe to our Weekly Newsletter?!" noBottom={ true } />
<Form { inputs } { schema } { toastOnSuccess } action="newsletterSignUp" buttonText="Subscribe" />
