<script lang="ts">
  import schema from '$lib/schema/updateUser'
  import Title from '$lib/components/Title.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess, User } from '$lib/util/types'

  export let user: User

  let inputs: FormInputs

  $: if (user) {
    inputs = [
      { name: 'file', label: 'Image', type: 'image', serverBase64: user.primaryImageBase64 },
      [
        { name: 'firstName', label: 'First Name', value: user.firstName },
        { name: 'lastName', label: 'Last Name', value: user.lastName },
      ],
      { name: 'email', label: 'Email', type: 'email', value: user?.email },
      { name: 'primaryImageId', value: user.primaryImageId, hidden: true },
      { name: 'isNewsletterSubscriber', label: 'Weekly newsletter subscriber', type: 'checkbox', checkboxValue: user.isNewsletterSubscriber },
    ]
  }

  const onSuccess = (() => { return 'Information Saved!' }) satisfies FormOnSuccess
</script>


<Title h3="Update your information" noBottom={ true } />
<Form { inputs } { schema } { onSuccess } reset={ false } action="updateUser" buttonText="Save" />
