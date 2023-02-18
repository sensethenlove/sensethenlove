<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
</script>


<Title h3="About Us!" noBottom={ true } />
<section class="us">
  <h3>Our Goals</h3>
  <ol>
    <li>Think lovely thoughts!</li>
    <li class="indent-dot">Sing a lovely song &rarr; Feel lovely</li>
    <li class="indent-dot">Tell a scary story &rarr; Feel scared</li>
    <li class="indent-dot">Think lovely &rarr; Feel lovely</li>
    <li>Share <LoadingLink href="/sources/" label="scientific evidence" /> that shows the benefits of:</li>
    <li class="indent-dot big-screen"><LoadingLink href="/sources/love" label="Loving" /> &sdot; <LoadingLink href="/sources/goals" label="Goal Setting" /> &sdot; <LoadingLink href="/sources/health" label="Healthy Living" /></li>
    <li class="indent-dot big-screen"><LoadingLink href="/sources/meditation" label="Mind Setting" /> &sdot; <LoadingLink href="/sources/432hz" label="432hz Listening" /> &sdot; <LoadingLink href="/sources/stretching" label="Stretching" /></li>
    <li class="indent-dot big-screen"><LoadingLink href="/sources/diet" label="Optimal Dieting" /> &sdot; <LoadingLink href="/sources/exercising" label="Exercising" /> &sdot; <LoadingLink href="/sources/natural-building" label="Natural Building" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/love" label="Loving" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/goals" label="Goal Setting" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/health" label="Healthy Living" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/meditation" label="Mind Setting" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/432hz" label="432hz Listening" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/stretching" label="Stretching" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/diet" label="Optimal Dieting" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/exercising" label="Exercising" /></li>
    <li class="indent-dot small-screen"><LoadingLink href="/sources/natural-building" label="Natural Building" /></li>
    <li>Create a <a href="/social">social network</a> that allows us all to:</li>
    <li class="indent-dot">Share our goals, progress & achievements!</li>
    <li class="indent-dot">Collaborate with, encourage & love each other!</li>
    <li class="indent-dot">Aim higher together!</li>
  </ol>

  <h3>Our Name</h3>
  <ol>
    <li>Focus on a sensation happening now</li>
    <li class="indent-dot">Example: Feel breath travel in & out of nose</li>
    <li>Internally sing the word <strong>'Love'</strong> on inhale & exhale, to direct mind</li>
    <li>Feel love for the sensation we are focusing on</li>
  </ol>
</section>


<style lang="scss">
  $small-big-swap-window-width: 31rem;

  .us {
    h3 {
      text-align: left;
      margin-bottom: 0;
    }

    ol {
      margin-top: 0;
    }

    .small-screen {
      display: list-item;

      @media only screen and (min-width: $small-big-swap-window-width) { // big screen
        display: none;
      }
    }

    .big-screen {
      display: none;

      @media only screen and (min-width: $small-big-swap-window-width) { // big screen
        display: list-item;
      }
    }
  }
</style>
