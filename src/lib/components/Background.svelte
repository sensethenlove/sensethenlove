<script lang="ts">
  import { theme } from '$lib/util/store'
  import getImageUrl from '$lib/file/getImageUrl'
  import { CF_BACKGROUND_1, CF_BACKGROUND_2, CF_BACKGROUND_3, CF_BACKGROUND_4, CF_BACKGROUND_DARK_1, CF_BACKGROUND_DARK_2, CF_BACKGROUND_DARK_3, CF_BACKGROUND_DARK_4 } from '$lib/util/cloudflareImages'
</script>


{ #if $theme === 'light' }
  <div class="background" aria-hidden="true">
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_1) } alt="Group meditating by tree & water" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_2) } alt="Love meditation" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_3) } loading="lazy" alt="Kids meditating" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_4) } loading="lazy" alt="Glowing group meditating by forest" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_1) } loading="lazy" alt="Group meditating by tree & water" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_2) } loading="lazy" alt="Love meditation" /></div>
  </div>
{ :else }
  <div class="background" aria-hidden="true">
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_DARK_1) } alt="Group meditating by tree & water" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_DARK_4) } alt="Glowing group meditating by forest" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_DARK_2) } loading="lazy" alt="Love meditation" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_DARK_3) } loading="lazy" alt="Kids meditating" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_DARK_1) } loading="lazy" alt="Group meditating by tree & water" /></div>
    <div class="img-wrapper"><img src={ getImageUrl(CF_BACKGROUND_DARK_2) } loading="lazy" alt="Love meditation" /></div>
  </div>
{ /if }


<style lang="scss">
  @import '$lib/scss/variables.scss';

  .background {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    position: fixed; // so it's not scrollable
    
    @media only screen and (min-width: $bg-img-swap-window-width) { // big screen
      flex-direction: row;
    }

    .img-wrapper {
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
