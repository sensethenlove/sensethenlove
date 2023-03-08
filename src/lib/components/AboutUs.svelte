<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
</script>


<Title text="About Us!" noBottom={ true } />
<section class="us">
  <div class="papyrus three">Our Goals</div>
  <div class="item list-below">
    <div class="emoji">💖</div>
    <div>Think lovely thoughts!</div>
  </div>
  <ul>
    <li class="indent-dot">Sing a lovely song &rarr; Feel lovely</li>
    <li class="indent-dot">Tell a scary story &rarr; Feel scared</li>
    <li class="indent-dot">Think lovely &rarr; Feel lovely</li>
  </ul>
  <div class="item list-below">
    <div class="emoji">🕉</div>
    <div>Share our <LoadingLink href="/social/" label="social network" /> that may help us all:</div>
  </div>
  <ul>
    <li class="indent-dot">Share our lovely thoughts, goals & achievements!</li>
    <li class="indent-dot">Aim high together!</li>
    <li class="indent-dot">Collaborate with, encourage & love each other!</li>
  </ul>
  <div class="item">
    <div class="emoji" style="font-size: 2.3rem">📚</div>
    <div>Share our <LoadingLink href="/library" label="library" /> of our favorite <LoadingLink href="/library?type=science" label="scientific evidence," /> <LoadingLink href="/library?type=product" label="products," /> & <LoadingLink href="/library?type=culture" label="culture" />!</div>
  </div>

  <div class="papyrus three content-above">Sense Then Love means?</div>
  <div class="item list-below">
    <div class="emoji">🙏</div>
    <div>Sense Then Love is our guide to <LoadingLink href="/library?category=coherence" label="coherence" /> (bliss)!</div>
  </div>

  <div class="papyrus three content-above">How?</div>
  <div class="item list-below">
    <div class="emoji" style="font-size: 2.4rem;">🌬️</div>
    <div>Focus on a sensation happening now</div>
  </div>
  <ul>
    <li class="indent-dot">Example: Feel breath flow in & out of nose</li>
  </ul>
  <div class="item">
    <div class="emoji">🌟</div>
    <div>To guide mind, externally or internally sing the word <strong>'Love'</strong>, on inhale & exhale</div>
  </div>
  <div class="item">
    <div class="emoji">🥰</div>
    <div>Feel love for this sensation</div>
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
