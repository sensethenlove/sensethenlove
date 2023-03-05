<script lang="ts">
  import { page } from '$app/stores'
  import Title from '$lib/components/Title.svelte'
  import type { CultureAuthor, CultureCategory } from '$lib/util/types'
  import LoadingLink from '$lib/components/LoadingLink.svelte'

  export let location = ''
  export let author: CultureAuthor | undefined
  export let categories: CultureCategory[]
</script>

<!-- { #if location === 'nav' }
  <Title text="Select a Category!" noBottom={ true } />
{ /if } -->

<div class="chips location--{ location }">
  <!-- { #if location !== 'source' }
    <LoadingLink href="/library{ author?.slug ? `?author=${ author.slug }`: '' }" label="All" css="chip { !$page.params.slug ? 'active' : '' }" />
  { /if } -->
  {#each categories as category}
    <LoadingLink label={ category.name } href="/library/{ category.slug }{ author?.slug ? `?author=${ author.slug }`: '' }" css="chip { $page.params?.slug === category.slug ? 'active' : '' }"/>
  {/each}
</div>
