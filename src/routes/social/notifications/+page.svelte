<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Views from '$lib/components/social/Views.svelte'

  export let data: PageData
</script>


<Head title="Notifications" url="social/notifications" description="Notifications page" />
<Title text="Notifications" size="one" />
<Views userId={ data?.userId } />
<Title text="Coming soon!" />
