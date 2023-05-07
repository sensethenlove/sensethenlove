<script lang="ts">
  import { onMount } from 'svelte'
  import getId from '$lib/youtube/getId'
  import getiFrame from '$lib/youtube/getiFrame'
  import getImageUrl from '$lib/youtube/getImageUrl'
  import SVG_YOUTUBE_EMBED from '$lib/svg/SVG_YOUTUBE_EMBED.svg'

  export let url: string

  let id: string
  let iframe: string
  let youtubeImageUrl: string
  let showIframe: boolean = false
  let playButton: HTMLButtonElement

  $: if (url) {
    id = getId(url)

    if (id) {
      iframe = getiFrame(id)
      youtubeImageUrl = getImageUrl(id)
    }
  }

  onMount(() => {
    if (playButton) playButton.classList.add('visible')
  })
</script>


{ #if youtubeImageUrl }
  <button on:click={ () => { showIframe = true } } class="wrapper" aria-label="Play video">
    { #if !showIframe }
      <img src={ youtubeImageUrl } alt="Youtube thumbnail" />
      <button bind:this={ playButton } style="position:absolute; visibility:hidden;" aria-label="Play video">
        { @html SVG_YOUTUBE_EMBED }
      </button> 
    { :else }
      { @html iframe }
    { /if }
  </button>
{ /if }


<style lang="scss">
  @import '$lib/scss/variables.scss';

  .wrapper {
    width: 100%;
    margin-bottom: 0.9rem;
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
      top: 50%;
      left: 50%;
      width: 6.8rem;
      height: 4.8rem;
      margin-left: -3.4rem;
      margin-top: -2.4rem;
      animation-duration: 0.9s;
      border: none;
      cursor: pointer;
      background-color: transparent;
      z-index: $zindex-youtube-embed-button;
      color: rgb(238, 238, 238);
      &:global(.visible) {
        visibility: visible !important;
        animation-name: subtle-fade-in-from-above;
      }

      :global(.play--out) {
        transition: fill .1s cubic-bezier(.4,0,1,1),fill-opacity .1s cubic-bezier(.4,0,1,1);
        fill: #212121;
        fill-opacity: 0.8;
      }

      :global(.play--in) {
        fill: white;
      }
    }

    img  {
      width: 100%;
    }

    :global(iframe) {
      width: 100%;
      transition: all 0.9s;
      aspect-ratio: 16 / 9;
    }
  }
</style>
