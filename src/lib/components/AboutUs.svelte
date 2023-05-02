<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'
</script>


<Title text="About Us!" noBottom={ true } />
<section class="us">
  <div class="papyrus three">Sense Then Love means?</div>
  <div class="item list-below">
    <div class="emoji">🙏</div>
    <div>It's a map!</div>
  </div>

  <div class="papyrus three content-above">Example:</div>
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

  <div class="papyrus three content-above">Our goal is to cultivate:</div>
  <div class="item list-below">
    <div class="emoji">💖</div>
    <div>Lovely thoughts!</div>
  </div>
  <ul>
    <li class="indent-dot">Sing a lovely song &rarr; Feel lovely</li>
    <li class="indent-dot">Tell a scary story &rarr; Feel scared</li>
    <li class="indent-dot">Think lovely &rarr; Feel lovely</li>
  </ul>
  <div class="item list-below">
    <div class="emoji">🕉</div>
    <div>An <LoadingAnchor href="/social/" label="online community" /> to help us all:</div>
  </div>
  <ul>
    <li class="indent-dot">Share our lovely thoughts, goals & achievements!</li>
    <li class="indent-dot">Aim high together!</li>
    <li class="indent-dot">Collaborate with, encourage & love each other!</li>
  </ul>
  <div class="item">
    <div class="emoji" style="font-size: 2.3rem">📚</div>
    <div>A <LoadingAnchor href="/library" label="library" /> of lovely <LoadingAnchor href="/library?type=science" label="scientific evidence," /> <LoadingAnchor href="/library?type=product" label="products," /> & <LoadingAnchor href="/library?type=culture" label="culture" />!</div>
  </div>
</section>


<style lang="scss">
  .us {
    max-width: 50rem;

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
