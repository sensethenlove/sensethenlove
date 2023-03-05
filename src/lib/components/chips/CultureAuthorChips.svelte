<script lang="ts">
  import { page } from '$app/stores'
  import Title from '$lib/components/Title.svelte'
  import type { CultureAuthor, CultureCategory } from '$lib/util/types'
  import LoadingLink from '$lib/components/LoadingLink.svelte'

  // export let location = ''
  export let authors: CultureAuthor[]
  export let category: CultureCategory | undefined

  let urlAuthorSlug: string | null | undefined

  setUrlAuthorSlug()
  $: if ($page) setUrlAuthorSlug()

  function setUrlAuthorSlug () {
    urlAuthorSlug = $page.url.searchParams.get('author')
  }
</script>


<!-- <Title text="Select an Author!" noBottom={ true } /> -->
<div class="chips">
  <!-- { #if location !== 'source' }
    <LoadingLink label="All" href="/library{ category?.slug ? `/${ category.slug }` : '' }"  css="chip { !urlAuthorSlug ? 'active' : '' }"/>
  { /if } -->
  {#each authors as author}
    <LoadingLink label={ author?.name } href="/library{ category?.slug ? `/${ category.slug }` : '' }?author={ author.slug }"  css="chip { urlAuthorSlug === author.slug ? 'active' : '' }"/>
  {/each}
</div>
