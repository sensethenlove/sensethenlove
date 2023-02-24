<script lang="ts">
  import schema from '$lib/schema/createPost'
  import Title from '$lib/components/Title.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    { name: 'image', label: 'Image', type: 'image' },
    { name: 'content', label: 'Content', type: 'content-editable' },
  ]

  const onSuccess = (() => 'Posted!') satisfies FormOnSuccess
</script>


<Title h3="Share a lovely goal, achievement or goal progress!" noBottom={ true } />
<Form css="stl--create-post" { inputs } { schema } { onSuccess } action="createPost" buttonText="Post" />
