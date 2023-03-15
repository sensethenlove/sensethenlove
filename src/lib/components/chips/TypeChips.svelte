<script lang="ts">
  import  { page } from '$app/stores'
  import type { SourceType } from '$lib/types/all'
  import Title from '$lib/components/Title.svelte'
  import getLibraryHref from '$lib/util/getLibraryHref'
  import LoadingLink from '$lib/components/LoadingLink.svelte'

  export let type: SourceType = undefined

  let allHref: string
  let cultureHref: string
  let scienceHref: string
  let productHref: string

  $: if ($page.url) {
    allHref = getLibraryHref($page.url, [ [ 'type', '' ] ])
    cultureHref = getLibraryHref($page.url, [ [ 'type', 'culture' ] ])
    scienceHref = getLibraryHref($page.url, [ [ 'type', 'science' ] ])
    productHref = getLibraryHref($page.url, [ [ 'type', 'product' ] ])
  }
</script>

<Title text="Select an Type!" noBottom={ true } />
<div class="chips location--nav">
  <LoadingLink label="All" href={ allHref } css="chip { !type ? 'active' : '' }"/>
  <LoadingLink label="Culture" href={ cultureHref } css="chip { type === 'culture' ? 'active' : '' }"/>
  <LoadingLink label="Science" href={ scienceHref } css="chip { type === 'science' ? 'active' : '' }"/>
  <LoadingLink label="Product" href={ productHref } css="chip { type === 'product' ? 'active' : '' }"/>
</div>
