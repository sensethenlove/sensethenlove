<script lang="ts">
  export let title: string
  export let ogSrc: string = ''
  export let url: string = ''
  export let description: string = ''

  let imageSrc: string
  let fullTitle: string

  $: if (ogSrc) setImageSrc()
  $: if (title) setFullTitle()

  function setImageSrc () {
    imageSrc = `https://www.sensethenlove.com${ ogSrc }`
  }

  function setFullTitle () {
    fullTitle = title + ' ⋅ Sense Then Love'
  }
</script>

<svelte:head>
  <title>{ fullTitle }</title>
  <meta name="description" content={ description || fullTitle } />
  { #if imageSrc }
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.sensethenlove.com/{ url }" />
    <meta property="og:image" content={ imageSrc } />
    <meta property="og:image:secure_url" content={ imageSrc } />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:alt" content={ fullTitle } />
  {/if}
</svelte:head>
