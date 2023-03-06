<script lang="ts">
  import type { Source } from '$lib/util/types'
  import getImageUrl from '$lib/file/getImageUrl'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import CategoryChips from '$lib/components/chips/CategoryChips.svelte'

  export let product: Source

  let images: string[] = []

  $: if (product?.images) {
    images = product.images.map(({ id }) => getImageUrl(id))
  }
</script>


<section>
  <div class="header">
    <a href={ product.url } class="title" target="_blank" rel="noreferrer">{ product.title }</a>
    { #if product?.authors?.length }
      <AuthorChips authors={ product.authors } category={ undefined } location="product" />
    { /if }
    <div class="description">{ product.description }</div>
  </div>

  <div class="images">
    { #each images as image }
      <img src={ image } alt="Product" />
    { /each }
  </div>

  { #if product?.categories?.length }
    <CategoryChips categories={ product.categories } author={ undefined } location="product" />
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

  .images {
    display: flex;
    justify-content: space-between;

    img {
      width: 49%;
    }
  }
</style>
