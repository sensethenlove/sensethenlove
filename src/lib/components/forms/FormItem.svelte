<script lang="ts">
  import { onMount } from 'svelte'
  import initImageFormItem from '$lib/form/initImageFormItem'
  import EditableDiv from '$lib/components/EditableDiv.svelte'
  import type { ImageVariableFormItemResponse } from '$lib/types/all';

  export let errors: any
  export let name: string
  export let css: string = ''
  export let label: string = ''
  export let resetCounter: number
  export let maxWidth: string = ''
  export let type: string = 'text'
  export let multiple: boolean = false
  export let autocomplete: string = ''
  export let value: string | null = ''
  export let serverImages: string[] = []
  export let focusOnInit: boolean = false
  export let checkboxValue: boolean | null = false

  let itemErrors: any
  let input: HTMLInputElement

  $: if (errors) itemErrors = errors?.[ name ]?._errors

  function clearErrors() {
    if (itemErrors?.length) itemErrors.length = 0
  }

  function bindImageVariables (response: ImageVariableFormItemResponse) {
    imageVariables = response
  }

  const id: string = crypto.randomUUID()
  let imageVariables = initImageFormItem(type, bindImageVariables, serverImages)

  $: if (type === 'image' && imageVariables.fileInput && resetCounter) {
    imageVariables.fileInput.value = ''
  }

  if (focusOnInit) {
    onMount(() => {
      input.focus()
    })
  }
</script>

{ #if imageVariables.previewImages.length }
  <div class="images { imageVariables.previewImages.length % 2 ? 'odd' : 'even' }">
    { #each imageVariables.previewImages as src }
      <div class="image">
        <img { src } style="max-width:{ maxWidth };" alt="Preview" /> 
      </div>
    { /each }
  </div>
{ :else if imageVariables.serverImages?.length }
  <div class="images { imageVariables.serverImages.length % 2 ? 'odd' : 'even' }">
    { #each imageVariables.serverImages as src }
      <div class="image">
        <img { src } style="max-width:{ maxWidth };" alt="Uploaded" /> 
      </div>
    { /each }
  </div>
{ /if }

<div class="form-item form-item--{ type } { css }">
  { #if type === 'textarea' }
    <label for={ id }>{ label }</label>
    <textarea class={ itemErrors?.length ? 'error': '' } { value } on:input={ () => { clearErrors() } } { name } { id } />
  { :else if type === 'checkbox' }
    <label style="max-width:{ maxWidth };" for={ id } class="checkbox { itemErrors?.length ? 'error': '' }" on:input={ () => { clearErrors() } }>
      <div class="checkbox-input-wrapper">
        <input { id } { name } checked={ checkboxValue } type="checkbox" />
      </div>
      { @html label }
    </label>
  { :else if type === 'content-editable'}
    <EditableDiv { id } { label } { name } { clearErrors } { resetCounter } />
  { :else if type === 'image' }
    <label for={ id }>{ label }</label>
    <input class={ itemErrors?.length ? 'error': '' } on:input={ () => { clearErrors() } } { name } { id } type="file" accept=".jpg, .jpeg, .png" { multiple } on:change={ imageVariables.onChange } bind:this={ imageVariables.fileInput } />
  { :else }
    <label for={ id }>{ label }</label>
    <input bind:this={ input } { value } { autocomplete } class={ itemErrors?.length ? 'error': '' } on:input={ () => { clearErrors() } } { name } { id } { type } />
  { /if }
  { #if itemErrors?.length }
    { #each itemErrors as error }
      <div class="error">{ error }</div>
    { /each }
  { /if }
</div>


<style lang="scss">
  .images {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &.odd {
      .image:last-child {
        width: 100%;
      }
    }
    
    .image {
      width: 49.5%;
      max-height: 39rem;
      overflow: hidden;
      margin-bottom: 0.9rem;

      img { // https://stackoverflow.com/a/36530632/1549471
        height: 100%;
        margin-left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  
</style>
