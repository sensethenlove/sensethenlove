<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import SVG_TIKTOK from '$lib/svg/logo/SVG_TIKTOK.svg'
  import SVG_TWITTER from '$lib/svg/logo/SVG_TWITTER.svg'
  import SVG_YOUTUBE from '$lib/svg/logo/SVG_YOUTUBE.svg'
  import SVG_FACEBOOK from '$lib/svg/logo/SVG_FACEBOOK.svg'
  import SVG_INSTAGRAM from '$lib/svg/logo/SVG_INSTAGRAM.svg'
</script>

<Title text="Our Socials" noBottom={ true } />
<section>
  <div class="logos">
    { @html SVG_YOUTUBE }
    { @html SVG_TIKTOK }
    { @html SVG_INSTAGRAM }
    { @html SVG_TWITTER }
    { @html SVG_FACEBOOK }
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
