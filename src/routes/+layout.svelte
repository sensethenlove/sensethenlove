<script lang="ts">
  import '$lib/scss/global.scss'
  import { updated } from '$app/stores'
  import Nav from '$lib/components/nav/Nav.svelte'
  import Background from '$lib/components/Background.svelte'
</script>

<main data-sveltekit-reload={ $updated ? '' : 'off' }> <!-- if app has been updated (svelte.config.js), set links w/in this wrapper to do a full page reload (no client side routing) (so latest app is displayed post reload) -->
  <slot />
  <Nav />
</main>
<Background />
<div id="toast-wrapper"></div>
