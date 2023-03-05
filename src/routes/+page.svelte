<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Culture from '$lib/components/Culture.svelte'
  import AboutUs from '$lib/components/AboutUs.svelte'
  import { CF_OG_HOME } from '$lib/util/cloudflareImages'
  import Source from '$lib/components/source/Source.svelte'
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

{ #if data.source }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingLink href="/science" label="science addition" loadWidth="big" /> to our <LoadingLink href="/library" label="library" loadWidth="big" />!
  </Title>
  <Source source={ data.source } location="home" />
{ /if }

{ #if data.culture }
  <Title noBottom={ true }>
    <span class="pr-5">The most recent</span> <LoadingLink href="/library" label="culture addition" loadWidth="big" /> to our <LoadingLink href="/library" label="library" loadWidth="big" />!
  </Title>
  <Culture culture={ data.culture } />
{ /if }
