<script lang="ts">
  import { page } from '$app/stores'
  import Title from "$lib/components/Title.svelte"
  import LoadingLink from '$lib/components/LoadingLink.svelte'

  export let userId: string = ''
</script>


<Title h3="Select a View" noBottom={ true } />
<div class="chips location--nav">
  <LoadingLink label="Public" href="/social" css="chip { $page.route.id === '/social' ? 'active' : '' }" />

  { #if userId }
    <LoadingLink label="Friends" href="/social/friends" css="chip { $page.route.id === '/social/friends' ? 'active' : '' }" />
    <LoadingLink label="Notifications" href="/social/notifications" css="chip { $page.route.id === '/social/notifications' ? 'active' : '' }" />
    <LoadingLink label="Profile" href="/social/profile" css="chip { $page.route.id === '/social/profile' ? 'active' : '' }" />
    <LoadingLink label="Messages" href="/social/messages" css="chip { $page.route.id === '/social/messages' ? 'active' : '' }" />
    <LoadingLink label="Settings" href="/social/settings" css="chip { $page.route.id === '/social/settings' ? 'active' : '' }" />
    <LoadingLink label="Sign Out" href="/social/sign-out" css="chip { $page.route.id === '/social/sign-out' ? 'active' : '' }" />
  { :else }
    <LoadingLink label="Sign In" href="/social/sign-in" css="chip { $page.route.id === '/social/sign-in' ? 'active' : '' }" />
    <LoadingLink label="Sign Up" href="/social/sign-up" css="chip { $page.route.id === '/social/sign-up' ? 'active' : '' }" />
  { /if }
</div>
