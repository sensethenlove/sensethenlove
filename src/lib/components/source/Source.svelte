<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import PubMed from '$lib/images/svg/logo/PubMed.svg'
  import Academia from '$lib/images/svg/logo/Academia.svg'
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
      <a href={ source.url } target="_blank" rel="noreferrer">
      { @html Academia }
      </a>
    { /if }
    { #if source.urlType === 'PUBMED' }
      <a href={ source.url } target="_blank" rel="noreferrer">
        { @html PubMed }
      </a>
    { /if }
    <div class="flex">
      <h3><a href={ source.url } target="_blank" rel="noreferrer">{ source.title }</a></h3>
      <p>
        { #each source.authors as a, i }<LoadingLink href="/sources{ category?.slug ? '/' + category.slug : '' }?author={ a.slug }" css="pr-5 { author?.id === a.id ? 'active': '' }" label="{ a.name }" />{ #if i+1 !== source.authors.length }<span class="pr-5">⋅</span>{ /if }{ /each }{ #if source.publicationLocation }<span class="pr-5">⋅</span><span class="pr-5">{ source.publicationLocation }</span>{ /if }{ #if source.publicationYear }<span class="pr-5">⋅</span><span>{ source.publicationYear }</span>{ /if }
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

      :global(.academia-logo),
      :global(.pub-med-logo) {
        height: 3rem;
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
