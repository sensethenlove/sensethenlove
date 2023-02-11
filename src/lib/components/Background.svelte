<script lang="ts">
  import img1Src from '$lib/images/background/1.webp'
  import img2Src from '$lib/images/background/2.webp'
  import img3Src from '$lib/images/background/3.webp'
  import img4Src from '$lib/images/background/4.webp'
</script>


<div class="background" aria-hidden="true">
  <div class="img-wrapper"><img src={ img1Src } loading="lazy" alt="Group meditating by tree & water" /></div>
  <div class="img-wrapper"><img src={ img2Src } loading="lazy" alt="Love meditation" /></div>
  <div class="img-wrapper"><img src={ img3Src } loading="lazy" alt="Kids meditating" /></div>
  <div class="img-wrapper"><img src={ img4Src } loading="lazy" alt="Glowing group meditating by forest" /></div>
  <div class="img-wrapper"><img src={ img1Src } loading="lazy" alt="Group meditating by tree & water" /></div>
  <div class="img-wrapper"><img src={ img2Src } loading="lazy" alt="Love meditation" /></div>
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
