<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'
</script>


<Title text="About Us!" noBottom={ true } />
<section class="us">
  <div class="papyrus three">Sense Then Love?</div>
  <div class="item list-below">
    <div class="emoji">🙏</div>
    <div>Is a map!</div>
  </div>

  <div class="papyrus three content-above">How?</div>
  <div class="item list-below">
    <div class="emoji" style="font-size: 2.4rem;">🌬️</div>
    <div>Feeling breath (sense)</div>
  </div>
  <div class="item">
    <div class="emoji">✨</div>
    <div>Loving this feeling</div>
  </div>
  <div class="item">
    <div class="emoji">🥰</div>
    <div>Feeling love!</div>
  </div>

  <div class="papyrus three content-above">This site is a?</div>
  <div class="item">
    <div class="emoji" style="font-size: 2.3rem">📚</div>
    <div><LoadingAnchor href="/library" label="Library" /> of lovely <LoadingAnchor href="/library?type=science" label="scientific evidence," /> <LoadingAnchor href="/library?type=product" label="products," /> & <LoadingAnchor href="/library?type=culture" label="culture" />!</div>
  </div>
</section>


<style lang="scss">
  .us {
    max-width: 52.2rem;

    .content-above {
      margin-top: 1.5rem;
    }

    .item {
      display: flex;
      margin-bottom: 0.9rem;
      &.list-below {
        margin-bottom: 0rem;
      }

      .emoji {
        width: 3rem;
        min-width: 3rem;
        font-size: 2.1rem;
        transform: translateY(-0.3rem);
      }
    }
  }
</style>
