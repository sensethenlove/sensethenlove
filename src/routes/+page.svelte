<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import AboutUs from '$lib/components/AboutUs.svelte'
  import { CF_OG_HOME } from '$lib/util/cloudflareImages'
  import Science from '$lib/components/source/Science.svelte'
  import Culture from '$lib/components/source/Culture.svelte'
  import Product from '$lib/components/source/Product.svelte'
  import OurSocials from '$lib/components/OurSocials.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import NewsletterSignUp from '$lib/components/forms/NewsletterSignUp.svelte'

  export let data: PageData
</script>


<Head title="Home" ogImageId={ CF_OG_HOME } description="Welcome to Sense Then Love!" />
<Title text="Home" size="one" />
<Title text="Welcome to Sense Then Love!" />
<AboutUs />
<OurSocials />
<NewsletterSignUp />

{ #if data.science }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingLink href="/library?type=science" label="science" loadWidth="big" /> addition to our <LoadingLink href="/library" label="library" loadWidth="big" />!
  </Title>
  <Science source={ data.science } location="home" />
{ /if }

{ #if data.culture }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingLink href="/library?type=culture" label="culture" loadWidth="big" /> addition to our <LoadingLink href="/library" label="library" loadWidth="big" />!
  </Title>
  <Culture source={ data.culture } location="home" />
{ /if }

{ #if data.product }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingLink href="/library?type=product" label="product" loadWidth="big" /> addition to our <LoadingLink href="/library" label="library" loadWidth="big" />!
  </Title>
  <Product source={ data.product } location="home" />
{ /if }
