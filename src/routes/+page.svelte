<script lang="ts">
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import AboutUs from '$lib/components/AboutUs.svelte'
  import { OG_HOME } from '$lib/images/cloudflareImages'
  import OurSocials from '$lib/components/OurSocials.svelte'
  import NewsletterSignUp from '$lib/components/forms/NewsletterSignUp.svelte'
</script>


<Head title="Home" ogImageId={ OG_HOME } description="Welcome to Sense Then Love!" />
<Title h1="Home" />
<Title h3="Welcome to Sense Then Love!" />
<AboutUs />
<OurSocials />
<NewsletterSignUp />
