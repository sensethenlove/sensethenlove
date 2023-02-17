<script lang="ts">
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import { OG_SOURCES } from '$lib/images/cloudflareImages'
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


<Head { title } ogImageId={ OG_SOURCES } description="Scientific evidence that aligns with our goal!" url="sources" />
<Title h1="Sources" />

{ #if author || category }
  <Title>
    { #if !author }{ category?.name }
    { :else if !category }{ author.name }
    { :else }{ category.name } by { author.name }
    { /if }
  </Title>
{ /if }

<section class="title">
  <h3>Scientific evidence that aligns with our <LoadingLink label='goals' loadWidth="big" />!</h3>
</section>
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
    <section class="no-results">
      { #if category?.name && author?.name }
        <h4>There are no sources for { category?.name } by { author?.name }, <LoadingLink href="/sources" label="view all sources" loadWidth="big" />?!</h4>
      { :else if category?.name }
        <h4>There are no sources for { category?.name }, <LoadingLink href="/sources" label="view all sources" loadWidth="big" />?!</h4>
      { :else if author?.name }
        <h4>There are no sources for { author?.name }, <LoadingLink href="/sources" label="view all sources" loadWidth="big" />?!</h4>
      { :else }
        <h4>There are no sources for this query yet, <LoadingLink href="/sources" label="view all sources" loadWidth="big" />?!</h4>
      { /if }
    </section>
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
    .no-results,
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
