<script lang="ts">
  import { onMount } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import Title from '$lib/components/Title.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
  import type { Author, Category, SourceType } from '$lib/types/all'

  export let location = ''
  export let categories: Category[]
  export let type: SourceType = undefined
  export let author: Author | undefined = undefined
  export let category: Category | undefined = undefined

  let allHref: string
  let cultureHref: string
  let scienceHref: string
  let productHref: string

  function bindHrefs () {
    const params: any = {}
    if (type) params.type = type
    if (author) params.author = author.slug
    const urlParams = (new URLSearchParams(params)).toString()
    allHref = urlParams ? '/library?' + urlParams : '/library'

    if (location === 'culture') {
      const cultureParams: any = { type: 'culture' }
      if (category?.slug) cultureParams.category = category.slug
      if (author?.slug) cultureParams.author = author.slug
      const cultureUrlParams = (new URLSearchParams(cultureParams)).toString()
      cultureHref = '/library?' + cultureUrlParams
    }

    if (location === 'product') {
      const productParams: any = { type: 'product' }
      if (category?.slug) productParams.category = category.slug
      if (author?.slug) productParams.author = author.slug
      const productUrlParams = (new URLSearchParams(productParams)).toString()
      productHref = '/library?' + productUrlParams
    }

    if (location === 'science') {
      const scienceParams: any = { type: 'science' }
      if (category?.slug) scienceParams.category = category.slug
      if (author?.slug) scienceParams.author = author.slug
      const scienceUrlParams = (new URLSearchParams(scienceParams)).toString()
      scienceHref = '/library?' + scienceUrlParams
    }
  }

  onMount(bindHrefs)
  afterNavigate(bindHrefs)

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
  { #if location === 'product' }
    <LoadingLink href={ productHref } label="Product" css="chip { type === 'product' ? 'active' : '' }" />
  { :else if location === 'culture' }
    <LoadingLink href={ cultureHref } label="Culture" css="chip { type === 'culture' ? 'active' : '' }" />
  { :else if location === 'science' }
    <LoadingLink href={ scienceHref } label="Science" css="chip { type === 'science' ? 'active' : '' }" />
  { :else if location === 'nav' }
    <LoadingLink href={ allHref } label="All" css="chip { !category ? 'active' : '' }" />
  { /if }
  {#each categories as c}
    <LoadingLink label={ c.name } href={ c.href } css="chip { c.slug === category?.slug ? 'active' : '' }"/>
  {/each}
</div>
