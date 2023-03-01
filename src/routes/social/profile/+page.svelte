<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Views from '$lib/components/social/Views.svelte'
  import CreatePost from '$lib/components/forms/CreatePost.svelte'

  export let data: PageData
</script>


<Head title="Profile" url="social/profile" description="Profile page" />
<Title text="Profile" size="one" />
<Views userId={ data?.userId } />
<CreatePost />
