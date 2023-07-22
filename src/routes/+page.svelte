<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import AboutUs from '$lib/components/AboutUs.svelte'
  import { CF_OG_HOME } from '$lib/util/cloudflareImages'
  import Science from '$lib/components/source/Science.svelte'
  import Culture from '$lib/components/source/Culture.svelte'
  import Product from '$lib/components/source/Product.svelte'
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'

  export let data: PageData
</script>


<Head title="Home" ogImageId={ CF_OG_HOME } description="Welcome to Sense Then Love!" />
<Title text="Home" size="one" />
<div class="welcome">
  <Title text="Welcome to Sense Then Love!" size="two" />
</div>
<AboutUs />

{ #if data.culture }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingAnchor href="/library?type=culture" label="culture" loadWidth="big" /> addition to our <LoadingAnchor href="/library" label="library" loadWidth="big" />!
  </Title>
  <Culture source={ data.culture } location="home" />
{ /if }

{ #if data.science }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingAnchor href="/library?type=science" label="science" loadWidth="big" /> addition to our <LoadingAnchor href="/library" label="library" loadWidth="big" />!
  </Title>
  <Science source={ data.science } location="home" />
{ /if }

{ #if data.product }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingAnchor href="/library?type=product" label="product" loadWidth="big" /> addition to our <LoadingAnchor href="/library" label="library" loadWidth="big" />!
  </Title>
  <Product source={ data.product } location="home" />
{ /if }


<style lang="scss">
  .welcome {
    :global(.papyrus) {
      white-space: nowrap;
      margin: 0.9rem 0rem;
      font-size: 1.8rem;
      transition: all 0.9s;

      @media only screen and (min-width: 333px) { // big screen
        font-size: 2.31rem;
        margin: 0.9rem 0.3rem;
      }
    }
  }
</style>
