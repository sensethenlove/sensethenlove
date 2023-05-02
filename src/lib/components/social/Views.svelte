<script lang="ts">
  import { page } from '$app/stores'
  import Title from "$lib/components/Title.svelte"
  import { LoadingAnchor } from '@sensethenlove/svelte-loading-anchor'

  export let userId: string = ''
</script>


<Title text="Select a View" noBottom={ true } />
<div class="chips location--nav">
  <LoadingAnchor label="Public" href="/social" css="chip { $page.route.id === '/social' ? 'active' : '' }" />

  { #if userId }
    <LoadingAnchor label="Friends" href="/social/friends" css="chip { $page.route.id === '/social/friends' ? 'active' : '' }" />
    <LoadingAnchor label="Notifications" href="/social/notifications" css="chip { $page.route.id === '/social/notifications' ? 'active' : '' }" />
    <LoadingAnchor label="Profile" href="/social/profile" css="chip { $page.route.id === '/social/profile' ? 'active' : '' }" />
    <LoadingAnchor label="Messages" href="/social/messages" css="chip { $page.route.id === '/social/messages' ? 'active' : '' }" />
    <LoadingAnchor label="Settings" href="/social/settings" css="chip { $page.route.id === '/social/settings' ? 'active' : '' }" />
    <LoadingAnchor label="Sign Out" href="/social/sign-out" css="chip { $page.route.id === '/social/sign-out' ? 'active' : '' }" />
  { :else }
    <LoadingAnchor label="Sign In" href="/social/sign-in" css="chip { $page.route.id === '/social/sign-in' ? 'active' : '' }" />
    <LoadingAnchor label="Sign Up" href="/social/sign-up" css="chip { $page.route.id === '/social/sign-up' ? 'active' : '' }" />
  { /if }
</div>
