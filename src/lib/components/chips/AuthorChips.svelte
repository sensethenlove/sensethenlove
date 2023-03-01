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


<Title text="Select an Author!" noBottom={ true } />
<div id="author-chips" class="chips location--nav">
  { #if location !== 'source' }
    <LoadingLink label="All" href="/sources{ category?.slug ? `/${ category.slug }` : '' }"  css="chip { !urlAuthorSlug ? 'active' : '' }"/>
  { /if }
  {#each authors as author}
    <LoadingLink label={ author?.name } href="/sources{ category?.slug ? `/${ category.slug }` : '' }?author={ author.slug }"  css="chip { urlAuthorSlug === author.slug ? 'active' : '' }"/>
  {/each}
</div>
