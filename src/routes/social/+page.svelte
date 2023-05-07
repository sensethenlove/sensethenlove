<script lang="ts">
  import type { PageData } from './$types'
  import Head from '$lib/components/Head.svelte'
  import Title from '$lib/components/Title.svelte'
  import Post from '$lib/components/social/Post.svelte'
  import Views from '$lib/components/social/Views.svelte'

  export let data: PageData
  // console.log('data', data)
</script>


<Head title="Public" url="social" description="Welcome to our Social Network" />
<Title text="Public" size="one" />
<Views userId={ data.locals?.userId } />

{ #if data.posts }
  { #each data.posts as post }
    <Post { post } />
  {/each}
{ /if }
