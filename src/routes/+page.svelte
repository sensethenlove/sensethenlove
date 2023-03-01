<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Source from '$lib/components/source/Source.svelte'
  import AboutUs from '$lib/components/AboutUs.svelte'
  import { CF_OG_HOME } from '$lib/util/cloudflareImages'
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

<Title noBottom={ true }>
  <span class="pr-5">Our most recent</span><LoadingLink href="/sources" label="Source" loadWidth="big" />!
</Title>
{ #if data.source }
  <Source source={ data.source } location="home" />
{ /if }
