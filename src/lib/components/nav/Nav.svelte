<script lang="ts">
  import '$lib/components/nav/Nav.scss'
  import { page, navigating } from '$app/stores'
  import getImageUrl from '$lib/file/getImageUrl'
  import SVG_HOME from '$lib/svg/nav/SVG_HOME.svg'
  import SVG_SOCIAL from '$lib/svg/nav/SVG_SOCIAL.svg'
  import { CF_LOGO } from '$lib/util/cloudflareImages'
  import SVG_CONTACT from '$lib/svg/nav/SVG_CONTACT.svg'
  import SVG_LIBRARY from '$lib/svg/nav/SVG_LIBRARY.svg'
  import SVG_SUPPORT from '$lib/svg/nav/SVG_SUPPORT.svg'
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'

  let activeRoute: string | null | undefined
  $: if ($navigating) setActiveRoute(true)

  setActiveRoute()

  function setActiveRoute (isNavigating?: boolean) {
    activeRoute = (isNavigating) ? $navigating?.to?.route.id : $page.route.id
  }

  function smoothToTop () {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' })
  }
</script>


<div class="nav">
  <div class="logo">
    <LoadingAnchor loadWidth="huge">
      <img src={ getImageUrl(CF_LOGO) } alt="The logo for Sense Then Love"/>
    </LoadingAnchor>
  </div>

  <div class="name-wrapper">
    <button on:click={ () => { smoothToTop() } } class="name">Sense Then Love</button>
  </div>

  <nav>
    <LoadingAnchor label="Home" loadWidth="big" css="item { activeRoute === '/' ? 'active' : '' }">{ @html SVG_HOME }</LoadingAnchor>
    <LoadingAnchor label="Social" href="/social" loadWidth="big" css="item { activeRoute?.includes('/social') ? 'active' : '' }">{ @html SVG_SOCIAL }</LoadingAnchor>
    <LoadingAnchor label="Library" href="/library" loadWidth="big" css="item { activeRoute?.includes('/library') ? 'active' : '' }">{ @html SVG_LIBRARY }</LoadingAnchor>
    <LoadingAnchor label="Contact" href="/contact" loadWidth="big" css="item { activeRoute === '/contact' ? 'active' : '' }">{ @html SVG_CONTACT }</LoadingAnchor>
    <LoadingAnchor label="Support" href="/support" loadWidth="big" css="item { activeRoute === '/support' ? 'active' : '' }">{ @html SVG_SUPPORT }</LoadingAnchor>
  </nav>
</div>
