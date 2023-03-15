<script lang="ts">
  import { page } from '$app/stores'
  import { afterNavigate } from '$app/navigation'
  import SVG_LOADING from '$lib/svg/SVG_LOADING.svg'

  export let label: string = ''
  export let css: string = ''
  export let href: string = '/'
  export let loadWidth: 'standard' | 'big' | 'huge' = 'standard'

  let isLoading: boolean
  afterNavigate(() => isLoading = false)

  function onAnchorlick (e: Event) {
    // if href is current url do not show loading indicator
    // https://github.com/sveltejs/kit/issues/9390
    if ($page.url.href.endsWith(href)) {}
    else if ($page.route.id === '/library' && href.includes('/library') && !href.includes('/library/')) {
      e.preventDefault()
      isLoading = true
      window.location.href = href
    } else {
      isLoading = true
    }
  }
</script>


<a { href } class="{ css } loading-link { isLoading ? 'is-loading' : '' } loading-link--loading-size-{ loadWidth }" on:click={ onAnchorlick }>
  <slot/>
  <span>{ label }</span>
  { @html SVG_LOADING }
</a>


<style lang="scss">
  @import '$lib/scss/variables';

  .loading-link {
    position: relative;
    display: inline-block;
    &.active {
      text-decoration: underline;
    }
    &.is-loading {
      cursor: default;
      pointer-events: none;

      span,
      :global(img) {
        opacity: 0;
      }

      :global(.loading-icon) {
        opacity: 1;
        z-index: 0;
      }
    }
    &--loading-size-standard {
      :global(.loading-icon) {
        width: 1.8rem;
        margin-top: -0.9rem;
        margin-left: -0.9rem;
      }
    }
    &--loading-size-big {
      :global(.loading-icon) {
        width: 2.7rem;
        margin-top: -1.35rem;
        margin-left: -1.35rem;
      }
    }
    &--loading-size-huge {
      :global(.loading-icon) {
        width: 3.6rem;
        margin-top: -1.8rem;
        margin-left: -1.8rem;
      }
    }

    span,
    :global(img),
    :global(.loading-icon) {
      transition: all 0.3s;
    }

    :global(.loading-icon) {
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      opacity: 0;
      color: var(--anchor-color);
    }
  }
</style>
