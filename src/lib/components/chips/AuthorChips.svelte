<script lang="ts">
  import { page } from '$app/stores'
  import type { Author } from '$lib/types/all'
  import { afterNavigate } from '$app/navigation'
  import Title from '$lib/components/Title.svelte'
  import getLibraryHref from '$lib/util/getLibraryHref'
  import LoadingLink from '$lib/components/LoadingLink.svelte'

  export let location = ''
  export let authors: Author[]
  export let author: Author | undefined = undefined

  let query: string
  let allHref: string
  let filterdAuthors: Author[]
  let isAllVisible: boolean = true

  afterNavigate(() => query = '')

  $: if (query || authors) {
    if (!query) {
      isAllVisible = true
      filterdAuthors = [ ...authors ]
    } else {
      filterdAuthors.length = 0
      const lowQuery = query.toLowerCase()
      isAllVisible = 'all'.includes(lowQuery)

      for (const a of authors) {
        console.log(a.lowName)
        if (a.lowName && a.lowName.includes(lowQuery)) filterdAuthors.push(a)
      }

      filterdAuthors = filterdAuthors
    }
  }

  $: if (filterdAuthors) {
    if (filterdAuthors.length && !filterdAuthors[0].href) {
      for (const author of authors) {
        author.lowName = author.name.toLowerCase()
        author.href = getLibraryHref($page.url, [ [ 'author', author.slug ], [ 'count', '' ] ])
      }
    }
  }

  $: if ($page.url) {
    allHref = getLibraryHref($page.url, [ [ 'author', '' ], [ 'count', '' ] ])
  }
</script>

{ #if location === 'nav' }
  <Title text="Select an Author!" noBottom={ true } />
{ /if }
<div class="chips location--{ location }">
  { #if location === 'nav' }
    <div class="form-item">
      <input bind:value={ query } type="text" placeholder="Search" />
    </div>
  { /if }
  { #if location === 'nav' && isAllVisible }
    <LoadingLink label="All" href={ allHref }  css="chip { !author ? 'active' : '' }"/>
  { /if }
  { #each filterdAuthors as a }
    <LoadingLink label={ a.name } href={ a.href }  css="chip { author?.slug === a.slug ? 'active' : '' }"/>
  { /each }
</div>
