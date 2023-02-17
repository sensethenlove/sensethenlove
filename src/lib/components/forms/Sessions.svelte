<script lang="ts">
  import { enhance } from '$app/forms'
  import { showToast } from '$lib/util/toast'
  import type { Session } from '$lib/util/types'
  import Title from '$lib/components/Title.svelte'
  import type { SubmitFunction } from '@sveltejs/kit'
  import Button from '$lib/components/forms/Button.svelte'
  import removeFromArrayByValue from '$lib/util/removeFromArrayByValue'
  
  export let sessions: Session[]

  let isLoading = false
  let buttonText = ''
  let sessionsToDelete: string[] = []

  function updateSessionsToDelete (e: Event, sessionId: string): void {
    const target = e.target as HTMLInputElement

    if (target.checked) sessionsToDelete.push(sessionId)
    else removeFromArrayByValue(sessionsToDelete, sessionId)

    sessionsToDelete = sessionsToDelete // tell svelte our array has been updated
  }

  $: if (sessionsToDelete) {
    buttonText = setButtonText()
  }

  function setButtonText (): string {
    switch (sessionsToDelete.length) {
      case 0: return 'Select above first'
      case 1: return 'Sign out one session'
      case 2: return 'Sign out two sessions'
      case 3: return 'Sign out three sessions'
      default: return `Sign out ${ sessionsToDelete.length } sessions`
    }
  }

  function setSuccessText (): string {
    switch (sessionsToDelete.length) {
      case 1: return 'Successfully signed out one session!'
      case 2: return 'Successfully signed out two sessions!'
      case 3: return 'Successfully signed out three sessions!'
      default: return `Successfully signed out ${ sessionsToDelete.length } sessions!`
    }
  }

  const onSubmit = (({ cancel }) => {
    if (sessionsToDelete.length) {
      isLoading = true

      return async ({ update, result }: { update: any, result: any }) => {
        isLoading = false

        switch (result.type) {
          case 'error':
            if (typeof result.error?.message === 'string') showToast({ type: 'error', items: [ result.error.message ] }) // form errors (not field specific)
            break
          case 'failure':
            if (result.data?._errors?.length) showToast({ type: 'error', items: result.data._errors }) // form errors (not field specific)
            break
          case 'success':
            showToast({ type: 'success', items: [ setSuccessText() ] }) // successful submission
            sessionsToDelete = [] // clear to delete b/c it worked
            break
        }

        update() // continue form flow
      }
    } else {
      showToast({ type: 'error', items: [ 'Please select an IP Address to sign it out' ] })
      cancel()
    }
  }) satisfies SubmitFunction
</script>


<form class="sessions" novalidate method="POST" action="?/deleteSessions" use:enhance={ onSubmit }>
  <Title h3="Select IP's to sign out" noBottom={ true } css="sub-explanation" />
  <Title h4="We will never read, store or sell your location information!" noBottom={ true } css="explanation" />
  <section class="ips">
    <table>
      <tbody>
        { #each sessions as session }
          <tr>
            <td><input name={ session.id } id={ session.id } type="checkbox" on:input={ (e) => { updateSessionsToDelete(e, session.id) } }/></td>
            <td><label for={ session.id }>{ session.ipAddress }</label></td>
            <td><a href={ 'https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test/lookup/' + session.ipAddress } target="_blank" rel="noreferrer"><span class="big">See IP Information</span><span class="small">IP Info</span></a></td>
          </tr>
        { /each }
      </tbody>
    </table>
    <Button text="{ buttonText }" { isLoading } disabled={ !sessionsToDelete.length } />
  </section>
</form>


<style lang="scss">
  $mobile-view-adjust-width: 39rem;
  $mobile-view-transition-duration: 0.9s;

  .sessions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    
    :global(.sub-explanation) {
      max-width: 30rem;
      transition: all $mobile-view-transition-duration;

      @media only screen and (min-width: $mobile-view-adjust-width) { // big screen
        max-width: 45rem;
      }
    }
    
    :global(.explanation) {
      max-width: 33rem;
      transition: all $mobile-view-transition-duration;

      @media only screen and (min-width: $mobile-view-adjust-width) { // big screen
        max-width: 54rem;
      }
    }

    .ips {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 99vw;
      transition: all $mobile-view-transition-duration;
      
      @media only screen and (min-width: $mobile-view-adjust-width) { // big screen
        min-width: 63rem;
      }

      td {
        padding: 0.9rem;
        vertical-align: middle;
        transition: all $mobile-view-transition-duration;

        @media only screen and (min-width: $mobile-view-adjust-width) { // big screen
          padding: 1.8rem;
        }

        .big {
          display: none;

          @media only screen and (min-width: $mobile-view-adjust-width) { // big screen
            display: inline;
          }
        }

        .small {
          display: inline;

          @media only screen and (min-width: $mobile-view-adjust-width) { // big screen
            display: none;
          }
        }
      }

      input {
        scale: 1.3;
        transform: translateY(-0.03rem);
      }

      label,
      input {
        cursor: pointer;
      }

      label {
        user-select: none;
      }
    }
  }
</style>
