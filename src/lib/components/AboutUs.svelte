<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'
</script>


<Title text="This site is a?" noBottom={ true } />
<section class="us">
  <div class="item">
    <div class="emoji" style="font-size: 2.3rem">📚</div>
    <div><LoadingAnchor href="/library" label="Library" /> of lovely <LoadingAnchor href="/library?type=science" label="scientific evidence" />, <LoadingAnchor href="/library?type=product" label="products" /> & <LoadingAnchor href="/library?type=culture" label="culture" />, created by <LoadingAnchor href="/links" label="Chris Carrington" />!</div>
  </div>
</section>


<style lang="scss">
  .us {

    .item {
      display: flex;
      margin-bottom: 0.9rem;

      .emoji {
        width: 3rem;
        min-width: 3rem;
        font-size: 2.1rem;
        transform: translateY(-0.3rem);
      }
    }
  }
</style>
