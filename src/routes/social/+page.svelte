<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Views from '$lib/components/social/Views.svelte'

  export let data: PageData
</script>


<Head title="All of Us" url="social" description="Welcome to our Social Network" />
<Title h1="All of Us" />
<Views userId={ data?.userId } />
<Title h3="Coming soon!" />
