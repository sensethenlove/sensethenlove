<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import LogoTikTok from '$lib/images/svg/logo/TikTok.svg'
  import LogoTwitter from '$lib/images/svg/logo/Twitter.svg'
  import LogoYoutube from '$lib/images/svg/logo/Youtube.svg'
  import LogoFacebook from '$lib/images/svg/logo/Facebook.svg'
  import LogoInstagram from '$lib/images/svg/logo/Instagram.svg'
</script>

<Title h3="Our Socials" noBottom={ true } />
<section>
  <div class="logos">
    { @html LogoYoutube }
    { @html LogoTikTok }
    { @html LogoInstagram }
    { @html LogoTwitter }
    { @html LogoFacebook }
  </div>
</section>


<style lang="scss">
  section {
    width: 100%;
    max-width: 38rem;

    .logos {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
