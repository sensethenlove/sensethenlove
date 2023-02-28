<script lang="ts">
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import { CF_OG_CONTACT } from '$lib/util/cloudflareImages'
  import OurSocials from '$lib/components/OurSocials.svelte'
  import EmailUs from '$lib/components/forms/EmailUs.svelte'
  import NewsletterSignUp from '$lib/components/forms/NewsletterSignUp.svelte'
</script>


<Head title="Contact" url="contact" ogImageId={ CF_OG_CONTACT } description="Please feel free to contat us!" />
<Title h1="Contact" />
<EmailUs />
<OurSocials />
<NewsletterSignUp />
