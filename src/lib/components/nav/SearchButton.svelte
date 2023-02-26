<script lang="ts">
  import search from '$lib/images/nav/search.svg'
</script>


<button class="search-button__button brand" on:click={ () => { alert('Coming soon!') } } title="Click to search">
  { @html search }
</button>


<style lang="scss">
  @import '$lib/scss/variables.scss';

  :global(.theme--light) .search-button__button :global(svg) {
    fill: white;
  }

  :global(.theme--dark) .search-button__button :global(svg) {
    fill: rgb(17, 24, 39);
  }

  .search-button {
    &__button {
      position: fixed;
      top: calc(100vh - 12rem);
      right: calc(100vw - 5rem);
      padding: 0.36rem;
      display: flex;
      transition: all 0.9s;
      align-items: center;
      justify-content: center;
      z-index: $zindex-search-button;

      @media only screen and (min-width: $move-nav-window-width) { // big screen
        top: 1.75rem;
        right: 28rem;
      }

      :global(svg) {
        width: 2.7rem;
        height: 2.7rem;
      }
    }
  }
</style>
