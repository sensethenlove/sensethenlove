<script lang="ts">
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import Title from '$lib/components/Title.svelte'
  import type { Author, Category, SourceType } from '$lib/util/types'
  import LoadingLink from '$lib/components/LoadingLink.svelte'

  export let type: SourceType = undefined
  export let author: Author | undefined = undefined
  export let category: Category | undefined = undefined

  let allHref: string

  function bindAllHref () {
    const params: any = {}
    if (category) params.category = category.slug
    if (author) params.author = author.slug
    const urlParams = (new URLSearchParams(params)).toString()
    allHref = urlParams ? '/library?' + urlParams : '/library'
  }

  onMount(bindAllHref)
  afterNavigate(bindAllHref)
</script>

<Title text="Select an Type!" noBottom={ true } />
<div class="chips location--nav">
  <LoadingLink label="All" href={ allHref }  css="chip { !type ? 'active' : '' }"/>
  <LoadingLink label="Culture" href={ `/library?type=culture${ author ? '&author=' + author.slug : '' }${ category ? '&category=' + category.slug : '' }` }  css="chip { type === 'culture' ? 'active' : '' }"/>
  <LoadingLink label="Science" href={ `/library?type=science${ author ? '&author=' + author.slug : '' }${ category ? '&category=' + category.slug : '' }` }  css="chip { type === 'science' ? 'active' : '' }"/>
  <LoadingLink label="Product" href={ `/library?type=product${ author ? '&author=' + author.slug : '' }${ category ? '&category=' + category.slug : '' }` }  css="chip { type === 'product' ? 'active' : '' }"/>
</div>
