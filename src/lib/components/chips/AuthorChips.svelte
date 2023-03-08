<script lang="ts">
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import Title from '$lib/components/Title.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import type { Author, Category, SourceType } from '$lib/types/all'

  export let location = ''
  export let authors: Author[]
  export let type: SourceType = undefined
  export let author: Author | undefined = undefined
  export let category: Category | undefined = undefined

  let allHref: string

  function bindAllHref () {
    const params: any = {}
    if (type) params.type = type
    if (category) params.category = category.slug
    const urlParams = (new URLSearchParams(params)).toString()
    allHref = urlParams ? '/library?' + urlParams : '/library'
  }

  onMount(bindAllHref)
  afterNavigate(bindAllHref)

  $: if (authors) {
    for (const author of authors) {
      const params: any = { }
      if (type) params.type = type
      if (category) params.category = category.slug
      params.author = author.slug
      const urlParams = (new URLSearchParams(params)).toString()
      author.href = '/library?' + urlParams
    }
  }
</script>

{ #if location === 'nav' }
  <Title text="Select an Author!" noBottom={ true } />
{ /if }
<div class="chips location--{ location }">
  { #if location === 'nav' }
    <LoadingLink label="All" href={ allHref }  css="chip { !author ? 'active' : '' }"/>
  { /if }
  { #each authors as a }
    <LoadingLink label={ a.name } href={ a.href }  css="chip { author?.slug === a.slug ? 'active' : '' }"/>
  { /each }
</div>
