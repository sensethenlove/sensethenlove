<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import tiktok from '$lib/images/logo/tiktok.svg'
  import twitter from '$lib/images/logo/twitter.svg'
  import youtube from '$lib/images/logo/youtube.svg'
  import facebook from '$lib/images/logo/facebook.svg'
  import instagram from '$lib/images/logo/instagram.svg'
</script>

<Title h3="Our Socials" noBottom={ true } />
<section>
  <div class="logos">
    { @html youtube }
    { @html tiktok }
    { @html instagram }
    { @html twitter }
    { @html facebook }
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
