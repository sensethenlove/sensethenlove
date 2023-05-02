<script lang="ts">
  import  { page } from '$app/stores'
  import { afterNavigate } from '$app/navigation'
  import Title from '$lib/components/Title.svelte'
  import getLibraryHref from '$lib/util/getLibraryHref'
  import type { Category, SourceType } from '$lib/types/all'
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'

  export let location = ''
  export let categories: Category[]
  export let type: SourceType = undefined
  export let category: Category | undefined = undefined

  let ssr: boolean
  let query: string
  let allHref: string
  let cultureHref: string
  let scienceHref: string
  let productHref: string
  let isAllVisible: boolean = true
  let filterdCategories: Category[]

  afterNavigate(() => query = '')

  $: if (query || categories) {
    if (!query) {
      isAllVisible = true
      filterdCategories = [ ...categories ]
    } else {
      filterdCategories.length = 0
      const lowQuery = query.toLowerCase()
      isAllVisible = 'all'.includes(lowQuery)

      for (const c of categories) {
        if (c.lowName && c.lowName.includes(lowQuery)) filterdCategories.push(c)
      }

      filterdCategories = filterdCategories
    }
  }

  $: if (filterdCategories) {
    if (filterdCategories.length && !filterdCategories[0].href) {
      for (const category of categories) {
        category.lowName = category.name.toLowerCase()
        category.href = getLibraryHref($page.url, [ [ 'category', category.slug ], [ 'count', '' ] ])
      }
    }
  }

  $: if ($page.url) {
    ssr = $page.route.id === '/library'
    allHref = getLibraryHref($page.url, [ [ 'category', '' ], [ 'count', '' ] ])
    if (location === 'culture') cultureHref = getLibraryHref($page.url, [ [ 'type', 'culture' ], [ 'count', '' ] ])
    if (location === 'science') scienceHref = getLibraryHref($page.url, [ [ 'type', 'science' ], [ 'count', '' ] ])
    if (location === 'product') productHref = getLibraryHref($page.url, [ [ 'type', 'product' ], [ 'count', '' ] ])
  }
</script>
{ #if location === 'nav' }
  <Title text="Select a Category!" noBottom={ true } />
{ /if }

<div class="chips location--{ location }">
  { #if location === 'nav' }
    <div class="form-item">
      <input bind:value={ query } type="text" placeholder="Search" />
    </div>
  { /if }
  { #if location === 'product' }
    <LoadingAnchor { ssr } href={ productHref } label="Product" css="chip { type === 'product' ? 'active' : '' }" />
  { :else if location === 'culture' }
    <LoadingAnchor { ssr } href={ cultureHref } label="Culture" css="chip { type === 'culture' ? 'active' : '' }" />
  { :else if location === 'science' }
    <LoadingAnchor { ssr } href={ scienceHref } label="Science" css="chip { type === 'science' ? 'active' : '' }" />
  { :else if location === 'nav' && isAllVisible }
    <LoadingAnchor { ssr } href={ allHref } label="All" css="chip { !category ? 'active' : '' }" />
  { /if }
  {#each filterdCategories as c}
    <LoadingAnchor { ssr } label={ c.name } href={ c.href } css="chip { c.slug === category?.slug ? 'active' : '' }"/>
  {/each}
</div>
