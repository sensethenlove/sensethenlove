<script lang="ts">
  import { theme } from '$lib/util/store'
  import sun from '$lib/images/nav/home.svg'
  import moon from '$lib/images/moon.svg'


  function setTheme () {
    const desiredTheme = ($theme === 'light') ? 'dark' : 'light'

    if (desiredTheme === 'light') {
      document.body.classList.add('theme--light')
      document.body.classList.remove('theme--dark')
    } else {
      document.body.classList.add('theme--dark')
      document.body.classList.remove('theme--light')
    }

    theme.set(desiredTheme)
    fetch(`/set-theme?to=${ desiredTheme }`)
  }
</script>


<button class="theme-toggle cyan-to-blue" on:click={ () => { setTheme() }}>
{ #if $theme === 'light' }
  { @html sun }
{ :else }
  { @html moon }
{ /if }
</button>


<style lang="scss">
  @import '$lib/scss/zindex.scss';
  @import '$lib/scss/variables.scss';

  :global(.theme--light) .theme-toggle :global(svg) {
    fill: gold;
  }

  :global(.theme--dark) .theme-toggle :global(svg) {
    fill: white;
  }

  .theme-toggle {
    position: fixed;
    top: 8.1rem;
    left: 3.5rem;
    padding: 0.36rem;
    display: flex;
    transition: all 0.9s;
    align-items: center;
    justify-content: center;
    z-index: $zindex-theme-toggle;

    @media only screen and (min-width: $move-nav-window-width) { // big screen
      top: 2rem;
      left: calc(100vw - 26rem);
    }

    :global(svg) {
      width: 2.7rem;
      height: 2.7rem;
    }
  }
</style>
