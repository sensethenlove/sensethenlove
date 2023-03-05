<script lang="ts">
  import type { Culture } from '$lib/util/types'
  import YoutubeEmbed from './YoutubeEmbed.svelte'
  import CultureAuthorChips from '$lib/components/chips/CultureAuthorChips.svelte'
  import CultureCategoryChips from '$lib/components/chips/CultureCategoryChips.svelte'

  export let culture: Culture
</script>


<section>
  <div class="header">
    <a href={ culture.url } class="title" target="_blank" rel="noreferrer">{ culture.title }</a>
    { #if culture?.authors?.length }
      <CultureAuthorChips authors={ culture.authors } category={ undefined } />
    { /if }
  </div>

  { #if culture?.url }
    <YoutubeEmbed url={ culture.url } />
  { /if }

  { #if culture?.categories?.length }
    <CultureCategoryChips categories={ culture.categories } author={ undefined } location="culture" />
  { /if }
</section>


<style lang="scss">
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 1rem;
    justify-content: center;

    @media only screen and (min-width: 50rem) { // big screen
      justify-content: start;
    }

    .title {
      font-weight: 500;
      font-size: 2.1rem;
      margin-right: 1rem;
      line-height: 1.4;
      display: inline-block;
    }
  }
</style>
