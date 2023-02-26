<script lang="ts">
  import '$lib/components/nav/Nav.scss'
  import { page, navigating } from '$app/stores'
  import LoadingLink from '../LoadingLink.svelte'
  import { LOGO } from '$lib/images/cloudflareImages'
  import home from '$lib/images/nav/home.svg'
  import social from '$lib/images/nav/social.svg'
  import contact from '$lib/images/nav/contact.svg'
  import sources from '$lib/images/nav/sources.svg'
  import support from '$lib/images/nav/support.svg'
  import getImageUrl from '$lib/file/getImageUrl'
  
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
      <img src={ getImageUrl(LOGO) } alt="The logo for Sense Then Love"/>
    </LoadingLink>
  </div>

  <div class="name-wrapper">
    <button on:click={ () => { smoothToTop() } } class="name">Sense Then Love</button>
  </div>

  <nav>
    <LoadingLink label="Home" loadWidth="big" css="item { activeRoute === '/' ? 'active' : '' }">{ @html home }</LoadingLink>
    <LoadingLink label="Social" href="/social" loadWidth="big" css="item { activeRoute?.includes('/social') ? 'active' : '' }">{ @html social }</LoadingLink>
    <LoadingLink label="Sources" href="/sources" loadWidth="big" css="item { activeRoute?.includes('/sources') ? 'active' : '' }">{ @html sources }</LoadingLink>
    <LoadingLink label="Contact" href="/contact" loadWidth="big" css="item { activeRoute === '/contact' ? 'active' : '' }">{ @html contact }</LoadingLink>
    <LoadingLink label="Support" href="/support" loadWidth="big" css="item { activeRoute === '/support' ? 'active' : '' }">{ @html support }</LoadingLink>
  </nav>
</div>
