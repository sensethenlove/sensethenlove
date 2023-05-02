<script lang="ts">
  import '$lib/scss/global.scss'
  import { updated } from '$app/stores'
  import { theme } from '$lib/util/store'
  import type { PageData } from './$types'
  import '@sensethenlove/toast/lib/index.css'
  import Nav from '$lib/components/nav/Nav.svelte'
  import '@sensethenlove/global-style/lib/index.css'
  import Search from '$lib/components/nav/Search.svelte'
  import Background from '$lib/components/Background.svelte'
  import ThemeToggle from '$lib/components/nav/ThemeToggle.svelte'

  export let data: PageData

  theme.set(data.theme)
</script>


<svelte:head>
  <style>
    :root {
      --black-text-color: #273142;
      --light-black-text-color: #515357;
      --green-text-color: green;
      --blue-text-color: #2196F3;
      --red-text-color: #FE544B;
      --gold-text-color: #eac603;
      --light-opacity-bg: rgba(255, 255, 255, 0.95);
    }
  </style>

  { #if $theme === 'dark' }
    <meta name="theme-color" content="#111111"/>
    <style>
      :root {
        --text-color:  #eceaea;
        --opacity-bg: rgba(0, 0, 0, 0.9);
        --anchor-color: #8bdd10;
        --papyrus-text-color: var(--gold-text-color);
        --bg-color: #111111;
        --input-bg-color: rgb(55, 65, 81, 0.6);
        --input-border-color: rgb(75, 85, 99);
        --bottom-nav-bg: #111111;
        --focus-box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgb(63, 131, 248) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
        --focus-error-box-shadow: rgb(255, 255, 255) 0px 0px 0px 0px, rgb(240, 82, 82) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
      }
    </style>
  { :else }
    <meta name="theme-color" content="#fefefe"/>
    <style>
      :root {
        --text-color: var(--black-text-color);
        --opacity-bg: var(--light-opacity-bg);
        --anchor-color: var(--green-text-color);
        --papyrus-text-color: var(--blue-text-color);
        --bg-color: #fefefe;
        --input-bg-color: rgb(255, 255, 255, 0.6);
        --input-border-color: #ced3d6;
        --bottom-nav-bg: #fefefe;
        --focus-box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);
        --focus-error-box-shadow: 0 0 0 0.2rem rgba(254, 84, 75, 0.25);
      }
    </style>
  { /if }
</svelte:head>


<main data-sveltekit-reload={ $updated ? '' : 'off' }> <!-- if app has been updated (svelte.config.js), set links w/in this wrapper to do a full page reload (no client side routing) (so latest app is displayed post reload) -->
  <slot />
  <Nav />
</main>
<Background />
<Search />
<ThemeToggle />
<div id="stl--toast-wrapper"></div>
