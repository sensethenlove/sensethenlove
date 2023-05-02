<script lang="ts">
  import schema from '$lib/schema/createPost'
  import Title from '$lib/components/Title.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormToastOnSuccess } from '$lib/types/all'

  const inputs: FormInputs = [
    { name: 'image', label: 'Image', type: 'image', multiple: true },
    { name: 'content', label: 'Content', type: 'content-editable' },
  ]

  const toastOnSuccess = (() => 'Posted!') satisfies FormToastOnSuccess
</script>


<Title text="Share lovely thoughts, goals & achievements!" noBottom={ true } />
<Form css="stl--create-post" { inputs } { schema } { toastOnSuccess } action="createPost" buttonText="Post" />
