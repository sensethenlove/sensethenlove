<script lang="ts">
  import { enhance } from '$app/forms'
  import { showToast } from '$lib/util/toast'
  import type { SubmitFunction } from '@sveltejs/kit'
  import turnstileFormItem from '$lib/turnstile/formItem'
  import Button from '$lib/components/forms/Button.svelte'
  import FormItem from '$lib/components/forms/FormItem.svelte'
  import type { FormInputs, FormOnSuccess } from '$lib/util/types'

  export let schema: any
  export let action: string
  export let css: string = ''
  export let inputs: FormInputs
  export let reset: boolean = true
  export let onSuccess: FormOnSuccess
  export let buttonText: string = 'Send'

  let errors: any
  let resetCounter = 0
  let isLoading = false

  const onSubmit = (({ data, cancel }) => {
    const fields = Object.fromEntries(data.entries())
    const validationResponse = schema.safeParse(fields)

    if (validationResponse.success) {
      isLoading = true

      return async ({ update, result }: { update: any, result: any }) => {
        isLoading = false

        switch (result.type) {
          case 'error':
            if (typeof result.error?.message === 'string') showToast({ type: 'error', items: [ result.error.message ] }) // form errors (not field specific)
            break
          case 'failure':
            if (result.data?._errors?.length) showToast({ type: 'error', items: result.data._errors }) // form errors (not field specific)
            errors = result.data
            break
          case 'success':
            showToast({ type: 'success', items: [ onSuccess({ fields, data: result?.data }) ] }) // successful submission
            if (reset !== false) resetCounter++
            break
        }

        update({ reset }) // continue form flow
      }
    } else {
      errors = validationResponse.error.format()
      cancel()
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
          <FormItem { resetCounter } name={ input.name } label={ input.label } value={ input.value } checkboxValue={ input.checkboxValue } type={ input.type || 'text' } { errors } css={ input.hidden ? 'hidden' : '' } serverImageId={ input.serverImageId || '' } />
        { /if}
      {/each }
    { /if }
    <div use:turnstileFormItem />
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
