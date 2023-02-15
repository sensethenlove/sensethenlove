<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import SignIn from '$lib/components/forms/SignIn.svelte'

  export let data: PageData

  let heading = 'Invalid sign in link'

  if (typeof data.error === 'string') {
    if (data.error.includes('VerifyTokenExpired')) heading = 'Sign in link expired'
    else if (data.error.includes('IPNotSame')) heading = 'IP Address that started sign in process must match the IP Address that clicks the email link'
    else heading = 'Email link is invalid'
  }
</script>

<Head title="Verify Sign In" />
{ #if data.error }
  <Title h1={ heading } />
  <Title h4="Please sign in again" noBottom={ true } />
  <SignIn />
{ /if }
