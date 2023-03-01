<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import SVG_PUBMED from '$lib/svg/logo/SVG_PUBMED.svg'
  import SVG_ACADEMIA from '$lib/svg/logo/SVG_ACADEMIA.svg'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import type { Source, Author, QuoteCategory } from '$lib/util/types'
  import QuoteCategoryChips from '$lib/components/chips/QuoteCategoryChips.svelte'

  export let source: Source
  export let location = 'sources'
  export let author: Author | undefined = undefined
  export let category: QuoteCategory = { id: '', name: '', slug: '' }

  let displayCategory: QuoteCategory

  if (location !== 'search') {
    displayCategory = { ...category }
    afterNavigate(() => displayCategory = { ...category })
  }
</script>


<section class="source location--{ location }">
  <div class="head">
    { #if source.urlType === 'ACADEMIA' }
      <a class="publisher" href={ source.url } target="_blank" rel="noreferrer" aria-hidden="true">
      { @html SVG_ACADEMIA }
      </a>
    { /if }
    { #if source.urlType === 'PUBMED' }
      <a class="publisher" href={ source.url } target="_blank" rel="noreferrer" aria-hidden="true">
        { @html SVG_PUBMED }
      </a>
    { /if }
    <div class="flex">
      <a href={ source.url } class="title" target="_blank" rel="noreferrer">{ source.title }</a>
      <p>
        { #if source.publicationLocation }
          <a href={ source.url } target="_blank" rel="noreferrer">{ source.publicationLocation }{ #if source.publicationYear }, { source.publicationYear }{ /if }</a>
        { /if }
        { #if source.authors }
          <span>⋅</span>
          { #each source.authors as a, i }
            <LoadingLink href="/sources{ category?.slug ? '/' + category.slug : '' }?author={ a.slug }" css="{ author?.id === a.id ? 'active': '' }" label="{ a.name }" />
            { #if i+1 !== source.authors.length }
              <span>⋅</span>
            { /if }
          { /each }
        { /if }
      </p>
    </div>
  </div>
  { #if location === 'search--with-quote' }
    <div class="fav-head">Quote:</div>
    { :else if location !== 'search--source-titles' }
      <div class="fav-head">{ displayCategory?.name ? `Favorite ${ displayCategory.name } Quotes:` : 'Favorite Quotes:' }</div>
  { /if }

  { #if source.favoriteQuotes?.length }
    <ol>
      { #each source.favoriteQuotes as quote }
        <li>{ @html quote.text }</li>
      { /each }
    </ol>
  { /if }

  { #if source.categories?.length }
    <QuoteCategoryChips categories={ source.categories } { author } location="source" />
  { /if }
</section>


<style lang="scss">
  @import '$lib/scss/variables.scss';

  .source {
    &.location--home {
      max-width: 82.565rem;
    }
    &.location--search--with-quote,
    &.location--search--source-titles {
      border-bottom: 1px solid gold;
      margin-bottom: 1.5rem;
    }
    &.location--search--with-quote {

      ol {
        list-style-type: circle;
      }
    }
    &.location--search--source-titles {
      .head {
        flex-direction: column;

        .flex,
        .title {
          text-align: center !important;
        }
      }
    }

    .head {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 1.5rem;

      @media only screen and (min-width: $move-nav-window-width) { // big screen
        flex-direction: row;
      }

      .publisher {
        padding: 1rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1rem;
        background-color: var(--light-opacity-bg);

        @media only screen and (min-width: $move-nav-window-width) { // big screen
          margin-bottom: 0;
        }

        :global(.academia-logo),
        :global(.pub-med-logo) {
          height: 3rem;
        }
      }

      .flex {
        flex: auto;
        width: 100%;
        text-align: center;

        @media only screen and (min-width: $move-nav-window-width) { // big screen
          margin-left: 1rem;
          text-align: left;
        }

        .title {
          font-size: 2.1rem;
          margin: 0 0 0.9rem 0;
          line-height: 1.4;
          font-weight: 500;
          display: inline-block;

          @media only screen and (min-width: $move-nav-window-width) { // big screen
            text-align: left;
            margin: 0 0 0.6rem 0;
          }
        }
        
        p {
          margin: 0;
        }
      }
    }

    .fav-head {
      font-weight: 500;
    }
  }
</style>
