<script lang="ts">
  import schema from '$lib/schema/updateUser'
  import Title from '$lib/components/Title.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormToastOnSuccess, User } from '$lib/types/all'

  export let user: User

  let inputs: FormInputs

  $: if (user) {
    inputs = [
      { name: 'profileImage', label: 'Profile Image', type: 'image', serverImageId: user.profileImageId, maxWidth: '56rem', },
      [
        { name: 'firstName', label: 'First Name', value: user.firstName },
        { name: 'lastName', label: 'Last Name', value: user.lastName },
      ],
      { name: 'email', label: 'Email', type: 'email', value: user?.email },
      { name: 'profileImageId', value: user.profileImageId, hidden: true },
      { name: 'isNewsletterSubscriber', label: 'Weekly newsletter subscriber', type: 'checkbox', checkboxValue: user.isNewsletterSubscriber },
    ]
  }

  const toastOnSuccess = (() => { return 'Information Saved!' }) satisfies FormToastOnSuccess
</script>


<Title text="Update your information" noBottom={ true } />
<Form { inputs } { schema } { toastOnSuccess } reset={ false } action="updateUser" buttonText="Save" />
