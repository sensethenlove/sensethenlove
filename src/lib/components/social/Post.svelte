<script lang="ts">
  import type { Post } from '$lib/types/all'
  import getImageUrl from '$lib/file/getImageUrl'
  import { getRelativeTime } from '@sensethenlove/get-relative-time'

  export let post: Post
  console.log(getRelativeTime(new Date('2023-05-05')))
</script>


<div class="post">
  <img src={ getImageUrl(post.creator.profileImageId || '') } alt="{ post.creator.firstName } Profile picture" />
  <div>{ post.creator.firstName }</div>
  <div>{ post.creator.lastName }</div>
  <div>{ getRelativeTime(post.createdAt) }</div>
  <div>{ @html post.content }</div>
  { #if post.images.length }
    { #each post.images as image }
      <img src={ getImageUrl(image.id) } alt="Post pic" />
    {/each}
  { /if }
</div>


<style lang="scss">

</style>
