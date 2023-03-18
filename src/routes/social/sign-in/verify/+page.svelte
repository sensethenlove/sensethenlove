<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import SignIn from '$lib/components/forms/SignIn.svelte'

  export let data: PageData

  let heading: string

  if (data._errors.find(e => e.includes('VerifyTokenExpiredError'))) heading = 'Sign in link expired'
  else if (data._errors.find(e => e.includes('VerifyTokenIDMismatchError'))) heading = 'Computer & browser that starts the sign in process must match the computer & browser that clicks the email link'
  else heading = 'Email link is invalid'
</script>

<Head title="Verify Sign In" />
{ #if heading }
  <Title text={ heading } size="one" />
  <Title text="Please sign in again" size="four" noBottom={ true } />
  <SignIn />
{ /if }
