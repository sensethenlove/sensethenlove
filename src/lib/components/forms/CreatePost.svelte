<script lang="ts">
  import schema from '$lib/schema/createPost'
  import Title from '$lib/components/Title.svelte'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    { name: 'image', type: 'image' },
    { name: 'content', type: 'jodit' },
  ]

  const onSuccess = (() => 'Posted!') satisfies FormOnSuccess
</script>


<Title h3="Share a lovely goal, achievement or goal progress!" noBottom={ true } />
<Form css="stl--create-post" { inputs } { schema } { onSuccess } action="createPost" buttonText="Post" />


<style>
  :global(.stl--create-post) {
    width: 100%;
    max-width: 75rem;
  }
</style>
