<script lang="ts">
  import getCloudflareImageUrl from '$lib/file/getCloudflareImageUrl'
  import { BACKGROUND_1, BACKGROUND_2, BACKGROUND_3, BACKGROUND_4 } from '$lib/images/cloudflareImages'
</script>


<div class="background" aria-hidden="true">
  <div class="img-wrapper"><img src={ getCloudflareImageUrl(BACKGROUND_1) } loading="lazy" alt="Group meditating by tree & water" /></div>
  <div class="img-wrapper"><img src={ getCloudflareImageUrl(BACKGROUND_2) } loading="lazy" alt="Love meditation" /></div>
  <div class="img-wrapper"><img src={ getCloudflareImageUrl(BACKGROUND_3) } loading="lazy" alt="Kids meditating" /></div>
  <div class="img-wrapper"><img src={ getCloudflareImageUrl(BACKGROUND_4) } loading="lazy" alt="Glowing group meditating by forest" /></div>
  <div class="img-wrapper"><img src={ getCloudflareImageUrl(BACKGROUND_1) } loading="lazy" alt="Group meditating by tree & water" /></div>
  <div class="img-wrapper"><img src={ getCloudflareImageUrl(BACKGROUND_2) } loading="lazy" alt="Love meditation" /></div>
</div>


<style lang="scss">
  @import '$lib/scss/zindex.scss';
  @import '$lib/scss/variables.scss';

  .background {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    position: fixed; // so it's not scrollable
    
    @media only screen and (min-width: $bg-img-swap-window-width) { // big screen
      flex-direction: row;
    }

    .img-wrapper {
      width: 100%;
      z-index: $zindex-background-images;
      margin: 0;
      aspect-ratio: 1 / 1; // height equal to width so images load in in their done loading location
      
      @media only screen and (min-width: $bg-img-swap-window-width) { // big screen
        width: 50%;
      }

      img {
        width: 100%;
      }
    }
  }
</style>
