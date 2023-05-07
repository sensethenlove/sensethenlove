<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Views from '$lib/components/social/Views.svelte'

  export let data: PageData
</script>


<Head title="Friends" url="social/friends" description="Friends page" />
<Title text="Friends" size="one" />
<Views userId={ data.locals?.userId } />
<Title text="Coming soon!" />
