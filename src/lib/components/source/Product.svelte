<script lang="ts">
  import getImageUrl from '$lib/file/getImageUrl'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import CategoryChips from '$lib/components/chips/CategoryChips.svelte'
  import type { Source, Author, Category, SourceType } from '$lib/util/types'

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
    <a href={ source.url } class="title" target="_blank" rel="noreferrer">{ source.title }</a>
    { #if source?.authors?.length }
      <AuthorChips { type } { category } { author } authors={ source.authors } location="product" />
    { /if }
    <div class="description">{ source.description }</div>
  </div>

  <div class="images">
    { #each images as image }
      <img src={ image } alt="Product" />
    { /each }
  </div>

  { #if source?.categories?.length }
    <CategoryChips { type } { category } { author } categories={ source.categories } location="product" />
  { /if }
</section>


<style lang="scss">
  .images {
    display: flex;
    justify-content: space-between;

    img {
      width: 49%;
    }
  }
</style>
