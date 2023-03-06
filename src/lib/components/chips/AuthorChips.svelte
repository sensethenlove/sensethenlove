<script lang="ts">
  import { page } from '$app/stores'
  import Title from '$lib/components/Title.svelte'
  import type { Author, QuoteCategory } from '$lib/util/types'
  import LoadingLink from '$lib/components/LoadingLink.svelte'

  export let location = ''
  export let authors: Author[]
  export let category: QuoteCategory | undefined

  let urlAuthorSlug: string | null | undefined

  setUrlAuthorSlug()
  $: if ($page) setUrlAuthorSlug()

  function setUrlAuthorSlug () {
    urlAuthorSlug = $page.url.searchParams.get('author')
  }
</script>

{ #if location === 'nav' }
  <Title text="Select an Author!" noBottom={ true } />
{ /if }
<div class="chips location--{ location }">
  { #if location === 'nav' }
    <LoadingLink label="All" href="/library{ category?.slug ? `/${ category.slug }` : '' }"  css="chip { !urlAuthorSlug ? 'active' : '' }"/>
  { /if }
  { #each authors as author }
    <LoadingLink label={ author?.name } href="/library{ category?.slug ? `/${ category.slug }` : '' }?author={ author.slug }"  css="chip { urlAuthorSlug === author.slug ? 'active' : '' }"/>
  { /each }
</div>
