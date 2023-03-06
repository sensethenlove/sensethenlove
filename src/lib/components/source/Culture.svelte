<script lang="ts">
  import type { Source } from '$lib/util/types'
  import YoutubeEmbed from '../YoutubeEmbed.svelte'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import CategoryChips from '$lib/components/chips/CategoryChips.svelte'

  export let culture: Source
</script>


<section>
  <div class="header">
    <a href={ culture.url } class="title" target="_blank" rel="noreferrer">{ culture.title }</a>
    { #if culture?.authors?.length }
      <AuthorChips authors={ culture.authors } category={ undefined } location="culture" />
    { /if }
    <div class="description">{ culture.description }</div>
  </div>

  { #if culture?.url }
    <YoutubeEmbed url={ culture.url } />
  { /if }

  { #if culture?.categories?.length }
    <CategoryChips categories={ culture.categories } author={ undefined } location="culture" />
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
