<script lang="ts">
  import { onMount } from 'svelte'
  import initImageFormItem from '$lib/form/initImageFormItem'
  import EditableDiv from '$lib/components/EditableDiv.svelte'

  export let errors: any
  export let name: string
  export let css: string = ''
  export let label: string = ''
  export let resetCounter: number
  export let maxWidth: string = ''
  export let type: string = 'text'
  export let autocomplete: string = ''
  export let value: string | null = ''
  export let serverImageId: string = ''
  export let focusOnInit: boolean = false
  export let checkboxValue: boolean | null = false

  let itemErrors: any
  let input: HTMLInputElement

  $: if (errors) itemErrors = errors?.[ name ]?._errors

  function clearErrors() {
    if (itemErrors?.length) itemErrors.length = 0
  }

  const id: string = crypto.randomUUID()
  const imageVariables = initImageFormItem(type, serverImageId)

  $: if (type === 'image' && imageVariables.serverImage && imageVariables.previewImage && imageVariables.fileElement && resetCounter) {
    imageVariables.fileElement.value = ''
    imageVariables.serverImage.removeAttribute('src') // if we set src to an empty string some browsers will set src to the url of the page
    imageVariables.previewImage.removeAttribute('src') // if we set src to an empty string some browsers will set src to the url of the page
  }

  if (focusOnInit) {
    onMount(() => {
      input.focus()
    })
  }
</script>


{ #if type === 'image' }
  <img bind:this={ imageVariables.serverImage } style="max-width:{ maxWidth }; display:{ imageVariables.serverImage?.src ? 'block' : 'none' }" alt="Profile" />
  <img bind:this={ imageVariables.previewImage } style="max-width:{ maxWidth }; display:{ imageVariables.previewImage?.src ? 'block' : 'none' }" alt="Preview" /> 
{ /if }

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
  { :else if type === 'content-editable'}
    <EditableDiv { id } { label } { name } { clearErrors } { resetCounter } />
  { :else if type === 'image' }
    <label for={ id }>{ label }</label>
    <input class={ itemErrors?.length ? 'error': '' } on:input={ () => { clearErrors() } } { name } { id } type="file" accept=".jpg, .jpeg, .png" on:change={ imageVariables.onFileSelected  } bind:this={ imageVariables.fileElement } />
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


<style>
  img {
    display: none;
    width: 100%;
    margin-bottom: 1rem;
  }
</style>
