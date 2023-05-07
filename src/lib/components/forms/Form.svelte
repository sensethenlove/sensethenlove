<script lang="ts">
  import { enhance } from '$app/forms'
  import showToast from '@sensethenlove/toast'
  import type { SubmitFunction } from '@sveltejs/kit'
  import { PUBLIC_ENVIRONMENT } from '$env/static/public'
  import Button from '$lib/components/forms/Button.svelte'
  import FormItem from '$lib/components/forms/FormItem.svelte'
  import { getFormEntries } from '@sensethenlove/get-form-entries'
  import { Turnstile, PUBLIC_KEY_ALWAYS_PASSES } from '@sensethenlove/svelte-turnstile'
  import type { FormInputs, FormOnError, FormOnSuccess, FormToastOnSuccess, FormOnSubmitValidate } from '$lib/types/all'

  export let schema: any
  export let action: string
  export let css: string = ''
  export let inputs: FormInputs
  export let reset: boolean = true
  export let buttonText: string = 'Send'
  export let onError: FormOnError = () => {}
  export let onSuccess: FormOnSuccess = () => {}
  export let toastOnSuccess: FormToastOnSuccess = () => ''
  export let onSubmitValidate: FormOnSubmitValidate = () => true

  let errors: any
  let resetCounter = 0
  let isLoading = false
  const PUBLIC_KEY = '0x4AAAAAAACd5Awen-i8HImo'

  const onSubmit = (({ data, cancel }) => {
    let doCancel = false
    const fields = getFormEntries(data)
    const validationResponse = schema.safeParse(fields)

    if (!validationResponse.success) {
      doCancel = true
      errors = validationResponse.error.format()
    }

    if (!onSubmitValidate(fields)) doCancel = true

    if (doCancel) cancel()
    else {
      isLoading = true

      return async ({ update, result }: { update: any, result: any }) => {
        isLoading = false

        switch (result.type) {
          case 'error':
            if (typeof result.error?.message === 'string') showToast({ type: 'info', items: [ result.error.message ] }) // form errors (not field specific)
            setTimeout(() => {
              onError({ fields, data: result?.data })
            })
            break
          case 'failure':
            if (result.data?._errors?.length) showToast({ type: 'info', items: result.data._errors }) // form errors (not field specific)
            errors = result.data
            setTimeout(() => {
              onError({ fields, data: result?.data })
            })
            break
          case 'success':
            const successMessage = toastOnSuccess({ fields, data: result?.data })

            if (successMessage) showToast({ type: 'success', items: [ successMessage ] })
            if (result?.data?.$localHref) showToast({ type: 'success', items: [ `<a href="${ result?.data?.$localHref }">Local Link</a>` ] }) // if a $localHref has been returned by the action (something to click locally that we wouldn't click in qa or main)
            if (reset !== false) resetCounter++

            setTimeout(() => {
              onSuccess({ fields, data: result?.data })
            })
            break
        }

        update({ reset }) // continue form flow
      }
    }
  }) satisfies SubmitFunction
</script>


<section class={ css }>
  <form novalidate method="POST" action="?/{ action }" use:enhance={ onSubmit }>
    { #if inputs?.length }
      { #each inputs as input }
        { #if Array.isArray(input) }
          <div class="two-form-items">
            { #each input as subInput }
              <FormItem { resetCounter } name={ subInput.name } label={ subInput.label } value={ subInput.value } checkboxValue={ subInput.checkboxValue } type={ subInput.type || 'text' } { errors } />
            { /each }
          </div>
        { :else }
          <FormItem { resetCounter } name={ input.name } label={ input.label } value={ input.value } checkboxValue={ input.checkboxValue } type={ input.type || 'text' } { errors } css={ input.hidden ? 'hidden' : '' } serverImages={ input.serverImages || [] } maxWidth={ input.maxWidth } focusOnInit={ input.focusOnInit } autocomplete={ input.autocomplete } multiple={ input.multiple } />
        { /if}
      {/each }
    { /if }
    <Turnstile sitekey={ PUBLIC_ENVIRONMENT === 'local' ? PUBLIC_KEY_ALWAYS_PASSES : PUBLIC_KEY } />
    <Button text={ buttonText } { isLoading } />
  </form>
</section>


<style lang="scss">
  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    :global(iframe) {
      display: none;
    }

    :global(button) {
      margin-top: 0.6rem;
    }
  }
</style>
