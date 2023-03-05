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
    <div class="description">{ culture.description }</div>
  </div>

  { #if culture?.url }
    <YoutubeEmbed url={ culture.url } />
  { /if }

  { #if culture?.categories?.length }
    <CultureCategoryChips categories={ culture.categories } author={ undefined } location="culture" />
  { /if }
</section>


<style lang="scss">
  section {
    width: calc(100vw - 1.8rem);
    transition: all 0.9s;

    @media only screen and (min-width: 54rem) { // big screen
      width: 82rem;
    }
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    align-items: center;
    margin-bottom: 1rem;
    justify-content: center;

    .title {
      font-weight: 500;
      font-size: 2.1rem;
      margin-right: 1rem;
      line-height: 1.4;
      display: inline-block;
    }
  }
</style>
