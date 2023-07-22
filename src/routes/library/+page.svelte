<script lang="ts">
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import { CF_OG_LIBRARY } from '$lib/util/cloudflareImages'
  import type { Source as SourceType } from '$lib/types/all'
  import Science from '$lib/components/source/Science.svelte'
  import Product from '$lib/components/source/Product.svelte'
  import Culture from '$lib/components/source/Culture.svelte'
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'
  import TypeChips from '$lib/components/chips/TypeChips.svelte'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import CategoryChips from '$lib/components/chips/CategoryChips.svelte'

  export let data: PageData

  const titleParts: string[] = []
  let visibleSources: SourceType[] = []
  let showMoreSourcesButton: HTMLButtonElement
  let title: string = 'Welcome to our Library!'

  $: if (showMoreSourcesButton) { // add observer to infinite scroll button
    (new IntersectionObserver(showMoreSources, { rootMargin: '270px' })).observe(showMoreSourcesButton)
  }

  $: if (data.sources && data.count) { // bind visible sources
    visibleSources = data.sources.slice(0, data.count)
  }

  $: if (data.type || data.category || data.author) { // bind title
    titleParts.length = 0
    if (data.type) titleParts.push(data.type.charAt(0).toUpperCase() + data.type.slice(1))
    if (data.category) titleParts.push(data.category.name)
    if (data.author) titleParts.push(data.author.name)
    if (titleParts.length) title = titleParts.join(' ⋅ ')
  }

  function showMoreSources (entries: IntersectionObserverEntry[]) { // show 9 more sources AND update the url
    if (entries[0].isIntersecting && data.sources) {
      const visibleCount = visibleSources.length + 6
      const url = new URL($page.url)
      url.searchParams.set('count', String(visibleCount))
      visibleSources = data.sources.slice(0, visibleCount)
      goto(url, { replaceState: true, noScroll: true, keepFocus: true, invalidateAll: false })
    }
  }
</script>


<Head { title } ogImageId={ CF_OG_LIBRARY } description="Welcome to our library!" url="sources" />
<Title text="Library" size="one" />
<Title text={ title } size="two" />

<div>
  <div class="left">
    <TypeChips type={ data.type } />
    { #if data.categories }
      <CategoryChips type={ data.type } category={ data.category } categories={ data.categories } location="nav" />
    { /if }
    { #if data.authors }
      <AuthorChips author={ data.author } authors={ data.authors } location="nav" />
    { /if }
  </div>

  { #if visibleSources?.length }
    { #each visibleSources as source }
      { #if source.type === 'SCIENCE' }
        <Science { source } type={ data.type } category={ data.category } author={ data.author } location="library" />
      { :else if source.type === 'CULTURE' }
        <Culture { source } type={ data.type } category={ data.category } author={ data.author } location="library" />
      { :else if source.type === 'PRODUCT' }
        <Product { source } type={ data.type } category={ data.category } author={ data.author } location="library" />
      { /if }
    { /each }
  { :else }
    <Title>
      <span>No library items found. Would you love to <LoadingAnchor ssr={ true } href="/library" label="view all" loadWidth="big" />?!</span>
    </Title>
  { /if }

  { #if visibleSources?.length !== data.sources?.length}
    <div class="more-wrapper">
      <button bind:this={ showMoreSourcesButton } class="brand">Show more sources</button>
    </div>
  { /if }
  <div class="clear-both"></div>
</div>


<style lang="scss">
  $view-width-swap: 900px;

  .left,
  :global(.no-results),
  :global(.source),
  .more-wrapper {
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

  .more-wrapper {
    display: flex;
    justify-content: center;
  }
</style>
