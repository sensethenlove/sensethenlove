<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
</script>


<Title text="About Us!" noBottom={ true } />
<section class="us">
  <div class="papyrus three">Our Goals</div>
  <ol>
    <li>Think lovely thoughts!</li>
    <li class="indent-dot">Sing a lovely song &rarr; Feel lovely</li>
    <li class="indent-dot">Tell a scary story &rarr; Feel scared</li>
    <li class="indent-dot">Think lovely &rarr; Feel lovely</li>
    <li value="2">Share our <LoadingLink href="/social/" label="social network" /> that may help us all:</li>
    <li class="indent-dot">Share our lovely thoughts, goals & achievements!</li>
    <li class="indent-dot">Aim high together!</li>
    <li class="indent-dot">Collaborate with, encourage & love each other!</li>
    <li value="3">Share our <LoadingLink href="/library/" label="library" /> of lovely <LoadingLink href="/library/" label="scientific evidence," /> <LoadingLink href="/library/" label="products," /> & <LoadingLink href="/library/" label="culture" /></li>
  </ol>

  <div class="papyrus three">Our Name</div>
  <ol>
    <li>Focus on a sensation happening now</li>
    <li class="indent-dot">Example: Feel breath flow in & out of nose</li>
    <li value="2">Feel love for this sensation happening now</li>
    <li value="3">If love guidance is desired, externally or internally sing the word <strong>'Love'</strong>, on inhale & exhale, to guide mind</li>
  </ol>
</section>


<style lang="scss">
  .us {
    max-width: 51rem;

    ol {
      margin-top: 0;
    }
  }
</style>
