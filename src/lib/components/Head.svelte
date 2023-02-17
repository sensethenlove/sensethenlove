<script lang="ts">
  import getCloudflareImageUrl from '$lib/file/getCloudflareImageUrl'

  export let title: string
  export let ogImageId: string = ''
  export let url: string = ''
  export let description: string = ''

  let imageSrc: string
  let fullTitle: string

  $: if (ogImageId) setImageSrc()
  $: if (title) setFullTitle()

  function setImageSrc () {
    imageSrc = getCloudflareImageUrl(ogImageId)
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
