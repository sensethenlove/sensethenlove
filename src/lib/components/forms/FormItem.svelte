<script lang="ts">
  import { theme } from '$lib/util/store'
  import loading from '$lib/images/loading.svg'
  import initFormItemJodit from '$lib/form/initFormItemJodit'
  import initFormItemImage from '$lib/form/initFormItemImage'

  export let errors: any
  export let name: string
  export let css: string = ''
  export let label: string = ''
  export let type: string = 'text'
  export let value: string | null = ''
  export let serverImageId: string = ''
  export let checkboxValue: boolean | null = false

  let itemErrors: any

  $: if (errors) itemErrors = errors?.[ name ]?._errors

  function clearErrors() {
    if (itemErrors?.length) itemErrors.length = 0
  }

  const id: string = crypto.randomUUID()
  const imageVariables = initFormItemImage(type, serverImageId)
  const joditVariables = initFormItemJodit(type, $theme, clearErrors)
</script>


{ #if type === 'image' }
  <img bind:this={ imageVariables.serverImage } alt="Primary" />
  <img bind:this={ imageVariables.previewImage } alt="Preview" /> 
{/if}

<div class="form-item form-item--{ type } { css }">
  { #if type === 'textarea' }
    <label for={ id }>{ label }</label>
    <textarea class={ itemErrors?.length ? 'error': '' } { value } on:input={ () => { clearErrors() } } { name } { id } />
  { :else if type === 'checkbox' }
    <label for={ id } class="checkbox { itemErrors?.length ? 'error': '' }" on:input={ () => { clearErrors() } }>
      <div class="checkbox-input-wrapper">
        <input { id } { name } checked={ checkboxValue } type="checkbox" />
      </div>
      { @html label }
    </label>
  { :else if type === 'jodit'}
    <div class="stl--jodit { joditVariables.isLoading ? 'is-loading' : '' }">
      <div class="stl--jodit__loading-wrapper">
        { @html loading }
      </div>
      <textarea bind:this={ joditVariables.initTextarea }></textarea>
      <textarea bind:this={ joditVariables.sanitizedTextarea } { name }></textarea>
    </div>
  { :else if type === 'image' }
    <label for={ id }>{ label }</label>
    <input class={ itemErrors?.length ? 'error': '' } on:input={ () => { clearErrors() } } { name } { id } type="file" accept=".jpg, .jpeg, .png" on:change={ imageVariables.onFileSelected  } bind:this={ imageVariables.fileElement } />
  { :else }
    <label for={ id }>{ label }</label>
    <input { value } class={ itemErrors?.length ? 'error': '' } on:input={ () => { clearErrors() } } { name } { id } { type } />
  { /if }
  { #if itemErrors?.length }
    { #each itemErrors as error }
      <div class="error">{ error }</div>
    { /each }
  { /if }
</div>


<style>
  img {
    display: none;
    width: 56rem;
    max-width: 100%;
    margin-bottom: 1rem;
  }
</style>
