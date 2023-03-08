<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Source from '$lib/components/source/Source.svelte'
  import Product from '$lib/components/source/Product.svelte'
  import Culture from '$lib/components/source/Culture.svelte'

  export let data: PageData
</script>


<Head title={ data?.source?.title || '' } description={ data?.source?.title || '' } url={ `/source/${ data?.source?.id }` } />
<Title text="Library" size="one" />
<Title text={ data?.source?.title || '' } />

{ #if data.source }
  { #if data.source.type === 'SCIENCE' }
    <Source source={ data.source } location="source-page" />
  { :else if data.source.type === 'CULTURE' }
    <Culture source={ data.source } location="source-page" />
  { :else if data.source.type === 'PRODUCT' }
    <Product source={ data.source } location="source-page" />
  { /if }
{ /if }
