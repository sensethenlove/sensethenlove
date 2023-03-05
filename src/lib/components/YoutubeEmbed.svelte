<script lang="ts">
  import getId from '$lib/youtube/getId'
  import getiFrame from '$lib/youtube/getiFrame'
  import getImageUrl from '$lib/youtube/getImageUrl'
  import SVG_YOUTUBE_EMBED from '$lib/svg/SVG_YOUTUBE_EMBED.svg'

  export let url: string

  let id: string
  let iframe: string
  let youtubeImageUrl: string
  let showIframe: boolean = false

  $: if (url) {
    id = getId(url)

    if (id) {
      iframe = getiFrame(id)
      youtubeImageUrl = getImageUrl(id)
    }
  }
</script>

{ #if youtubeImageUrl }
  <button on:click={ () => { showIframe = true } } class="wrapper" aria-label="Play video">
    { #if !showIframe }
      <div class="img-wrapper">
        <img src={ youtubeImageUrl } alt="YouTube" />
      </div>
      <button aria-label="Play video" style="position: absolute;">
        { @html SVG_YOUTUBE_EMBED }
      </button> 
    { :else }
      { @html iframe }
    { /if }
  </button>
{ /if }


<style lang="scss">
  .wrapper {
    cursor: pointer;
    position: relative;
    border: transparent;
    background-color: transparent;
    &:hover {
      :global(.play--out) {
        fill: #f00 !important;
        fill-opacity: 1 !important;
      }
    }

    button {
      animation-name: fade-in-from-above;
      animation-duration: 0.9s;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6.8rem;
      height: 4.8rem;
      margin-left: -3.4rem;
      margin-top: -2.4rem;
      border: none;
      cursor: pointer;
      background-color: transparent;
      z-index: 5000;
      color: rgb(238, 238, 238);

      :global(.play--out) {
        transition: fill .1s cubic-bezier(.4,0,1,1),fill-opacity .1s cubic-bezier(.4,0,1,1);
        fill: #212121;
        fill-opacity: 0.8;
      }

      :global(.play--in) {
        fill: white;
      }
    }

    .img-wrapper,
    :global(iframe) {
      width: 87vw;
      transition: all 0.9s;

      @media only screen and (min-width: 50rem) { // big screen
        width: 78rem;
      }
    }

    img {
      width: 100%;
    }

    :global(iframe) {
      aspect-ratio: 16 / 9;
    }
  }
</style>