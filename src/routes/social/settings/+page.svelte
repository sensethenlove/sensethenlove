<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Views from '$lib/components/social/Views.svelte'
  import Sessions from '$lib/components/forms/Sessions.svelte'
  import UpdateUser from '$lib/components/forms/UpdateUser.svelte'

  export let data: PageData
</script>


<Head title="Settings" url="social/settings" description="Settings page" />
<Title h1="Settings" />
<Views userId={ data?.user?.id } />
{ #if data.user } <UpdateUser user={ data.user } /> { /if }
{ #if data.sessions } <Sessions sessions={ data.sessions } /> { /if }
