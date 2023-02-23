<script lang="ts">
  import schema from '$lib/schema/createPost'
  import Form from '$lib/components/forms/Form.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  const inputs: FormInputs = [
    { name: 'content', type: 'jodit' },
  ]

  const onSuccess = (() => 'Posted!') satisfies FormOnSuccess
</script>


<Form { inputs } { schema } { onSuccess } action="createPost" buttonText="Post" />
