<script lang="ts">
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import { CF_OG_SOURCES } from '$lib/util/cloudflareImages'
  import Source from '$lib/components/source/Source.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import QuoteCategoryChips from '$lib/components/chips/QuoteCategoryChips.svelte'
  import type { Source as SourceType, Author, QuoteCategory } from '$lib/util/types'

  export let author: Author | undefined
  export let authors: Author[] | undefined
  export let sources: SourceType[] | undefined
  export let category: QuoteCategory | undefined = undefined
  export let categories: QuoteCategory[] | undefined

  let title: string
  $: if (category || author) setTitle()
  setTitle()

  function setTitle () {
    title = `${ category ? category.name + ' ⋅ ' : ''}${ author ? author.name + ' ⋅ ' : ''}Sources`
  }
</script>


<Head { title } ogImageId={ CF_OG_SOURCES } description="Scientific evidence that aligns with our goal!" url="sources" />
<Title text="Library" size="one" />

{ #if sources?.length }
  { #if author || category }
    <Title>
      { #if !author }{ category?.name }
      { :else if !category }{ author.name }
      { :else }{ category.name } by { author.name }
      { /if }
    </Title>
  { /if }


  <Title>
    <span>Scientific evidence that aligns with our <LoadingLink label='goals' loadWidth="big" />!</span>
  </Title>
{ /if }

<div class="sources-page">
  <div class="left">
    { #if categories }
      <QuoteCategoryChips categories={ categories } author={ author } location="nav" />
    { /if }

    { #if authors }
      <AuthorChips authors={ authors } category={ category } />
    { /if }
  </div>

  { #if sources?.length }
    { #each sources as source }
      <Source { source } { author } { category } />
    { /each }
  { :else }
    { #if category?.name && author?.name }
      <Title css="no-results">
        <span>There are no sources for { category?.name } by { author?.name }, <LoadingLink href="/library" label="view all sources" loadWidth="big" />?!</span>
      </Title>
    { :else if category?.name }
      <Title css="no-results">
        <span>There are no sources for { category?.name }, <LoadingLink href="/library" label="view all sources" loadWidth="big" />?!</span>
      </Title>
    { :else if author?.name }
      <Title css="no-results">
        <span>There are no sources for { author?.name }, <LoadingLink href="/library" label="view all sources" loadWidth="big" />?!</span>
      </Title>
    { :else }
      <Title css="no-results">
        <span>There are no sources for this query yet, <LoadingLink href="/library" label="view all sources" loadWidth="big" />?!</span>
      </Title>
    { /if }
  { /if }
  <div class="clear-both"></div>
</div>


<style lang="scss">
  $view-width-swap: 900px;

  .sources-page {

    @media only screen and (min-width: $view-width-swap) { // big screen
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
    }

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
  }
</style>
