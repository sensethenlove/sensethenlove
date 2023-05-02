<script lang="ts">
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'
  import YoutubeEmbed from '$lib/components/YoutubeEmbed.svelte'
  import AuthorChips from '$lib/components/chips/AuthorChips.svelte'
  import CategoryChips from '$lib/components/chips/CategoryChips.svelte'
  import type { Source, SourceType, Author, Category } from '$lib/types/all'

  export let source: Source
  export let location: string
  export let type: SourceType = undefined
  export let author: Author | undefined = undefined
  export let category: Category | undefined = undefined
</script>


<section class="source type--culture location--{ location }">
  <div class="header">
    <div class="top">
      { #if location === 'source-page' }
        <a href={ source.url } class="title" target="_blank" rel="noreferrer">{ source.title }</a>
      { :else }
        <LoadingAnchor href={ `/library/${ source.slug }` } css="title" label={ source.title } />
      { /if }
      { #if source?.authors?.length }
        <AuthorChips { author } authors={ source.authors } />
      { /if }
    </div>
    <div class="description">{ source.description }</div>
  </div>

  { #if source?.url }
    <YoutubeEmbed url={ source.url } />
  { /if }

  { #if source?.categories?.length }
    <CategoryChips { type } { category } categories={ source.categories } location="culture" />
  { /if }
</section>
