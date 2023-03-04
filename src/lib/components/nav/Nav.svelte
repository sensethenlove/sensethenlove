<script lang="ts">
  import '$lib/components/nav/Nav.scss'
  import { page, navigating } from '$app/stores'
  import LoadingLink from '../LoadingLink.svelte'
  import getImageUrl from '$lib/file/getImageUrl'
  import SVG_HOME from '$lib/svg/nav/SVG_HOME.svg'
  import SVG_SOCIAL from '$lib/svg/nav/SVG_SOCIAL.svg'
  import { CF_LOGO } from '$lib/util/cloudflareImages'
  import SVG_CONTACT from '$lib/svg/nav/SVG_CONTACT.svg'
  import SVG_LIBRARY from '$lib/svg/nav/SVG_LIBRARY.svg'
  import SVG_SUPPORT from '$lib/svg/nav/SVG_SUPPORT.svg'
  
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
    <LoadingLink loadWidth="huge">
      <img src={ getImageUrl(CF_LOGO) } alt="The logo for Sense Then Love"/>
    </LoadingLink>
  </div>

  <div class="name-wrapper">
    <button on:click={ () => { smoothToTop() } } class="name">Sense Then Love</button>
  </div>

  <nav>
    <LoadingLink label="Home" loadWidth="big" css="item { activeRoute === '/' ? 'active' : '' }">{ @html SVG_HOME }</LoadingLink>
    <LoadingLink label="Social" href="/social" loadWidth="big" css="item { activeRoute?.includes('/social') ? 'active' : '' }">{ @html SVG_SOCIAL }</LoadingLink>
    <LoadingLink label="Library" href="/library" loadWidth="big" css="item { activeRoute?.includes('/library') ? 'active' : '' }">{ @html SVG_LIBRARY }</LoadingLink>
    <LoadingLink label="Contact" href="/contact" loadWidth="big" css="item { activeRoute === '/contact' ? 'active' : '' }">{ @html SVG_CONTACT }</LoadingLink>
    <LoadingLink label="Support" href="/support" loadWidth="big" css="item { activeRoute === '/support' ? 'active' : '' }">{ @html SVG_SUPPORT }</LoadingLink>
  </nav>
</div>
