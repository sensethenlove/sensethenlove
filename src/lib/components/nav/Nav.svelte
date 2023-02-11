<script lang="ts">
  import '$lib/components/nav/Nav.scss'
  import { page, navigating } from '$app/stores'
  import LoadingLink from '../LoadingLink.svelte'
  import IconHome from '$lib/images/svg/nav/Home.svg'
  import IconSocial from '$lib/images/svg/nav/Social.svg'
  import srcLogo from '$lib/images/logo/transparent-bg.png'
  import IconContact from '$lib/images/svg/nav/Contact.svg'
  import IconSources from '$lib/images/svg/nav/Sources.svg'
  import IconSupport from '$lib/images/svg/nav/Support.svg'
  
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
      <img src={ srcLogo } alt="The logo for Sense Then Love"/>
    </LoadingLink>
  </div>

  <div class="name-wrapper">
    <button on:click={ () => { smoothToTop() } } class="name">Sense Then Love</button>
  </div>

  <nav>
    <LoadingLink label="Home" loadWidth="big" css="item { activeRoute === '/' ? 'active' : '' }">{ @html IconHome }</LoadingLink>
    <LoadingLink label="Social" href="/social" loadWidth="big" css="item { activeRoute?.includes('/social') ? 'active' : '' }">{ @html IconSocial }</LoadingLink>
    <LoadingLink label="Sources" href="/sources" loadWidth="big" css="item { activeRoute?.includes('/sources') ? 'active' : '' }">{ @html IconSources }</LoadingLink>
    <LoadingLink label="Contact" href="/contact" loadWidth="big" css="item { activeRoute === '/contact' ? 'active' : '' }">{ @html IconContact }</LoadingLink>
    <LoadingLink label="Support" href="/support" loadWidth="big" css="item { activeRoute === '/support' ? 'active' : '' }">{ @html IconSupport }</LoadingLink>
  </nav>
</div>
