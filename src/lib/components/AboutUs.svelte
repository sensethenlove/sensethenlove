<script lang="ts">
  import Title from '$lib/components/Title.svelte'
  import LoadingLink from '$lib/components/LoadingLink.svelte'
</script>


<Title h3="About Us!" noBottom={ true } />
<section class="us">
  <h3>Our Goals</h3>
  <ol>
    <li>Think lovely thoughts!</li>
    <ul class="indent">
      <li>The songs we sing, the words we share & the thoughts we think, guide how we feel</li>
      <ul class="indent">
        <li>Sing a lovely song &rarr; Feel lovely</li>
        <li>Tell a scary story &rarr; Feel scared</li>
        <li>Think lovely &rarr; Feel lovely</li>
      </ul>
    </ul>
    <li>Share <LoadingLink href="/sources/" label="scientific evidence" /> that shows the benefits of:</li>
    <ul class="indent big-screen">
      <li><LoadingLink href="/sources/love" label="Loving" /> &sdot; <LoadingLink href="/sources/goals" label="Goal Setting" /> &sdot; <LoadingLink href="/sources/health" label="Healthy Living" /></li>
      <li><LoadingLink href="/sources/meditation" label="Mind Setting" /> &sdot; <LoadingLink href="/sources/432hz" label="432hz Listening" /> &sdot; <LoadingLink href="/sources/stretching" label="Stretching" /></li>
      <li><LoadingLink href="/sources/diet" label="Optimal Dieting" /> &sdot; <LoadingLink href="/sources/exercising" label="Exercising" /> &sdot; <LoadingLink href="/sources/natural-building" label="Natural Building" /></li>
      </ul>
    <ul class="indent small-screen">
      <li><LoadingLink href="/sources/love" label="Loving" /></li>
      <li><LoadingLink href="/sources/goals" label="Goal Setting" /></li>
      <li><LoadingLink href="/sources/health" label="Healthy Living" /></li>
      <li><LoadingLink href="/sources/meditation" label="Mind Setting" /></li>
      <li><LoadingLink href="/sources/432hz" label="432hz Listening" /></li>
      <li><LoadingLink href="/sources/stretching" label="Stretching" /></li>
      <li><LoadingLink href="/sources/diet" label="Optimal Dieting" /></li>
      <li><LoadingLink href="/sources/exercising" label="Exercising" /></li>
      <li><LoadingLink href="/sources/natural-building" label="Natural Building" /></li>
      </ul>
    <li>Create a social network that allows us all to:</li>
    <ul class="indent">
        <li>Share our goals</li>
        <li>Share goal progress</li>
        <li>Collaborate with, encourage & love each other</li>
      </ul>
  </ol>

  <h3>Our Name</h3>
  <ol>
    <li>Focus on a sensation happening now</li>
    <ul class="indent">
      <li>Example: Feel breath travel in & out of nose</li>
    </ul>
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

    ul,
    ol {
      margin-top: 0;
    }

    .small-screen {
      display: block;

      @media only screen and (min-width: $small-big-swap-window-width) { // big screen
        display: none;
      }
    }

    .big-screen {
      display: none;

      @media only screen and (min-width: $small-big-swap-window-width) { // big screen
        display: block;
      }
    }
  }
</style>
