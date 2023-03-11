<script lang="ts">
  import getImageUrl from '$lib/file/getImageUrl'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import CategoryChips from '$lib/components/chips/CategoryChips.svelte'
  import type { Source, Author, Category, SourceType } from '$lib/types/all'

  export let source: Source
  export let location: string
  export let type: SourceType = undefined
  export let author: Author | undefined = undefined
  export let category: Category | undefined = undefined

  let images: string[] = []

  $: if (source?.images) {
    images = source.images.map(({ id }) => getImageUrl(id))
  }
</script>


<section class="source type--product location--{ location }">
  <div class="header">
    <div class="top">
      { #if location === 'source-page' }
        <a href={ source.url } class="title" target="_blank" rel="noreferrer">{ source.title }</a>
      { :else }
        <LoadingLink href={ `/library/${ source.slug }` } css="title" label={ source.title } />
      { /if }
      { #if source?.authors?.length }
        <AuthorChips { author } authors={ source.authors } />
      { /if }
    </div>
    <div class="description">{ source.description }</div>
  </div>

  <div class="images">
    { #each images as image }
      <a href={ source.url } target="_blank" rel="noreferrer">
        <img src={ image } alt="Product" />
      </a>
    { /each }
  </div>

  
  { #if source?.categories?.length }
    <CategoryChips { type } { category } categories={ source.categories } location="product" />
  { /if }
</section>


<style lang="scss">
  .images {
    display: flex;
    justify-content: space-between;

    a {
      width: 49%;
      min-width: 49%;

      img {
        width: 100%;
      }
    }
  }
</style>
