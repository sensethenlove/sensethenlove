<script lang="ts">
  import { theme } from '$lib/util/store'
  import SVG_HOME from '$lib/svg/nav/SVG_HOME.svg'
  import SVG_MOON from '$lib/svg/nav/SVG_MOON.svg'


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


<button class="theme-toggle brand" on:click={ () => { setTheme() }} aria-hidden="true">
{ #if $theme === 'light' }
  { @html SVG_HOME }
{ :else }
  { @html SVG_MOON }
{ /if }
</button>


<style lang="scss">
  @import '$lib/scss/variables.scss';

  :global(.theme--light) .theme-toggle {
    color: gold;
  }

  .theme-toggle {
    position: fixed;
    top: calc(100vh - 12rem);
    right: 2.2rem;
    padding: 0.36rem;
    display: flex;
    transition: all 0.9s;
    align-items: center;
    justify-content: center;
    z-index: $zindex-theme-toggle;

    @media only screen and (min-width: $move-nav-window-width) { // big screen
      top: $theme-search-top;
      right: 23rem;
    }

    :global(svg) {
      width: 2.7rem;
      height: 2.7rem;
    }
  }
</style>
