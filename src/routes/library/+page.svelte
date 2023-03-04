<script lang="ts">
  import type { PageData } from './$types'
  import SourcesPage from '$lib/components/source/SourcesPage.svelte'

  export let data: PageData
</script>

<SourcesPage
  author={ data.author }
  authors={ data.authors }
  sources={ data.sources }
  categories={ data.categories } />
