<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Views from '$lib/components/social/Views.svelte'
  import PostCreator from '$lib/components/PostCreator.svelte'

  export let data: PageData
</script>


<Head title="Profile" url="social/profile" description="Profile page" />
<Title h1="Profile" />
<Views userId={ data?.userId } />
<PostCreator />
