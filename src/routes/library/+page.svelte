<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Source from '$lib/components/source/Source.svelte'
  import { CF_OG_SOURCES } from '$lib/util/cloudflareImages'
  import Product from '$lib/components/source/Product.svelte'
  import Culture from '$lib/components/source/Culture.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import TypeChips from '$lib/components/chips/TypeChips.svelte'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import CategoryChips from '$lib/components/chips/CategoryChips.svelte'

  export let data: PageData

  let title: string
  const titleParts: string[] = []

  $: if (data) {
    titleParts.length = 0
    if (data.type) titleParts.push(data.type.charAt(0).toUpperCase() + data.type.slice(1))
    if (data.category) titleParts.push(data.category.name)
    if (data.author) titleParts.push(data.author.name)
    title = titleParts.length ? titleParts.join(' ⋅ ') : 'Welcome to our Library!'
  }
</script>


<Head { title } ogImageId={ CF_OG_SOURCES } description="Welcome to our library!" url="sources" />
<Title text="Library" size="one" />
<Title text={ title } />

<div>
  <div class="left">
    <TypeChips type={ data.type } category={ data.category } author={ data.author } />
    { #if data.categories }
      <CategoryChips type={ data.type } category={ data.category } author={ data.author } categories={ data.categories } location="nav" />
    { /if }
    { #if data.authors }
      <AuthorChips type={ data.type } category={ data.category } author={ data.author } authors={ data.authors } location="nav" />
    { /if }
  </div>

  { #if data.sources?.length }
    { #each data.sources as source }
      { #if source.type === 'SCIENCE' }
        <Source { source } type={ data.type } category={ data.category } author={ data.author } location="library" />
      { :else if source.type === 'CULTURE' }
        <Culture { source } type={ data.type } category={ data.category } author={ data.author } location="library" />
      { :else if source.type === 'PRODUCT' }
        <Product { source } type={ data.type } category={ data.category } author={ data.author } location="library" />
      { /if }
    { /each }
  { :else }
    <Title>
      <span>No library items found. Would you love to <LoadingLink href="/library" label="view all" loadWidth="big" />?!</span>
    </Title>
  { /if }
  <div class="clear-both"></div>
</div>


<style lang="scss">
  $view-width-swap: 900px;

  .left,
  :global(.no-results),
  :global(.source) {
    display: flex;
    flex-direction: column;
  }

  .left {
    float: left;
    max-width: none;
    transition: all 0.25s;
    margin: 0;

    @media only screen and (min-width: $view-width-swap) { // big screen
      max-width: 36rem;
      margin: 0 1.8rem 0 0;
    }
  }

  :global(.source) {
    margin-bottom: 1.8rem;
  }
</style>

