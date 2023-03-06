<script lang="ts">
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import Title from '$lib/components/Title.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import type { Author, Category, SourceType } from '$lib/util/types'

  export let location = ''
  export let categories: Category[]
  export let type: SourceType = undefined
  export let author: Author | undefined = undefined
  export let category: Category | undefined = undefined

  let allHref: string

  function bindAllHref () {
    const params: any = {}
    if (type) params.type = type
    if (author) params.author = author.slug
    const urlParams = (new URLSearchParams(params)).toString()
    allHref = urlParams ? '/library?' + urlParams : '/library'
  }

  onMount(bindAllHref)
  afterNavigate(bindAllHref)

  $: if (categories) {
    for (const category of categories) {
      const params: any = { }
      if (type) params.type = type
      params.category = category.slug
      if (author) params.author = author.slug
      const urlParams = (new URLSearchParams(params)).toString()
      category.href = '/library?' + urlParams
    }
  }
</script>

{ #if location === 'nav' }
  <Title text="Select a Category!" noBottom={ true } />
{ /if }

<div class="chips location--{ location }">
  { #if location === 'nav' }
    <LoadingLink href={ allHref } label="All" css="chip { !category ? 'active' : '' }" />
  { /if }
  {#each categories as c}
    <LoadingLink label={ c.name } href={ c.href } css="chip { c.slug === category?.slug ? 'active' : '' }"/>
  {/each}
</div>
