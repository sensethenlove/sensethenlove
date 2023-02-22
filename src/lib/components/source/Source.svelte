<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import pubmed from '$lib/images/logo/pubmed.svg'
  import academia from '$lib/images/logo/academia.svg'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import type { Source, Author, QuoteCategory } from '$lib/util/types'
  import QuoteCategoryChips from '$lib/components/chips/QuoteCategoryChips.svelte'

  export let source: Source
  export let location = 'sources'
  export let author: Author | undefined = undefined
  export let category: QuoteCategory = { id: '', name: '', slug: '' }

  let displayCategory: QuoteCategory = { ...category }
  afterNavigate(() => displayCategory = { ...category })
</script>


<section class="source location--{ location }">
  <div class="head">
    { #if source.urlType === 'ACADEMIA' }
      <a class="publisher" href={ source.url } target="_blank" rel="noreferrer" aria-hidden="true">
      { @html academia }
      </a>
    { /if }
    { #if source.urlType === 'PUBMED' }
      <a class="publisher" href={ source.url } target="_blank" rel="noreferrer" aria-hidden="true">
        { @html pubmed }
      </a>
    { /if }
    <div class="flex">
      <h3><a href={ source.url } target="_blank" rel="noreferrer">{ source.title }</a></h3>
      <p>
        { #if source.publicationLocation }
          <a href={ source.url } target="_blank" rel="noreferrer">{ source.publicationLocation }{ #if source.publicationYear }, { source.publicationYear }{ /if }</a>
          <span>⋅</span>
        { /if }
        { #each source.authors as a, i }
          <LoadingLink href="/sources{ category?.slug ? '/' + category.slug : '' }?author={ a.slug }" css="{ author?.id === a.id ? 'active': '' }" label="{ a.name }" />
          { #if i+1 !== source.authors.length }
            <span>⋅</span>
          { /if }
        { /each }
      </p>
    </div>
  </div>
  <div class="fav-head">{ displayCategory?.name ? `Favorite ${ displayCategory.name } Quotes:` : 'Favorite Quotes:' }</div>
  <ol>
    { #if source.favoriteQuotes?.length }
      { #each source.favoriteQuotes as quote }
        <li>{ @html quote.text }</li>
      { /each }
    { /if }
  </ol>
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

        h3 {
          margin: 0 0 0.75rem 0;
          line-height: 1.4;
          font-weight: 500;
          font-family: $font-family;

          @media only screen and (min-width: $move-nav-window-width) { // big screen
            text-align: left;
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
